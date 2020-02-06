var app = require('./app');
var port = process.env.PORT || 3000;
const https = require('https');
const fs = require('fs');



https.createServer({   // Creating Secure Server
  key: fs.readFileSync('cert.key'),
  cert: fs.readFileSync('cert.pem')
}, app)
.listen(3000, function () {
  console.log('Example app listening on port 3000! Go to https://localhost:3000/')
})