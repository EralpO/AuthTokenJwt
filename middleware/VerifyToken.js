const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
require('dotenv').config()
const secretKey = process.env.SECRET // get our secret key

function verifyToken(req, res, next) {

  // check header or url parameters or post parameters for token
  const token = req.headers['authorization'];   
  req.verify = false
  if (!token) 
    return res.status(403).send({ auth: false, message: 'No token provided.' });
   else{
     let BearerToken = token.split(' ')
     BearerToken = BearerToken[1]  // Reduce the token from Bearer tag
     
     jwt.verify(BearerToken,secretKey,(err,decoded)=>{
     if(err){
     return  res.status(406).send({   // if token is not correct
         auth : false,
         message : 'Token is not valid'
       })
     }
     else{
       req.verify = true    // Return true to endpoint
       console.log('true')
       next();
     }
     })
   }
  // verifies secret and checks exp
 
}

module.exports = verifyToken;