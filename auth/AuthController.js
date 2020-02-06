const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors')
const VerifyToken = require('../middleware/VerifyToken');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


require('dotenv').config()
const User = require('../user/User'); // Getting Schema similar to creating class

/**
 * Configure JWT
 */
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const bcrypt = require('bcryptjs');
const secretKey = process.env.SECRET // get secret key
const message = process.env.Loginmessage




/*router.use(function(request, response, next){
  var token = request.body.token || request.query.token || request.headers['x-access-token'];

  if(token){
    jwt.verify(token, secret, function(error, decoded){
      if(error){
        return response.json({
          success: false,
          message: 'Failed to authenticate token'
        });
      }
      else{
        request.decoded = decoded;
        next();
      }
    });
  }
  else{
    return response.status(403).send({
      success: false,
      message: 'No token provided'
    });
  }

});*/

router.post('/register', async (req, res) => {

  console.log(req.body.password)
  const hashedPassword = bcrypt.hashSync(req.body.password, 8); // Hashing password 8 times
  
  let user = new User({email : req.body.email , password : hashedPassword}) // Creating new User
  try{
    await user.save()
    jwt.sign({user},secretKey,{   // Creating a token by user
      expiresIn:84600 // 24 HOURS
    },(err,token)=>{
      if(err){
        res.send(err)
      }
      else{
      res.json({
        message : "Kayıtlanma başarılı",
        token : token
      })
    }
    })
    
  }
  catch(e){
     res.send(e)
  }
});

router.post('/verify', VerifyToken, function(req, res, next) {

 if(req.verify){
   res.status(200).send('Verify done successfully')
 }

});

router.post('/login',VerifyToken,(req,res)=>{
   if(req.verify){ // if token is verified go on
    User.findOne({ email: req.body.email }, function (err, user) {
      if (err) return res.status(500).send('Error on the server.');
      if (!user) return res.status(404).send('No user found.');
      
      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password); // Checking password is correct or not
      if (!passwordIsValid) return res.status(404).send({ auth: false, token: 'Valid' }); // if password is wrong 
      
      
      res.status(200).send({ auth: true, message: message });
    });


   }
    
})

module.exports = router;