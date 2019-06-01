const express = require('express')
const fs = require('fs')
const http = require('http');
const https = require('https');

let cert = '/etc/letsencrypt/live/computer.enframed.net/fullchain.pem'
let key = '/etc/letsencrypt/live/computer.enframed.net/privkey.pem'
// const privateKey  = fs.readFileSync('selfsigned.key', 'utf8');
// const certificate = fs.readFileSync('selfsigned.crt', 'utf8');
const privateKey  = fs.readFileSync(key, 'utf8');
const certificate = fs.readFileSync(cert, 'utf8');



const credentials = {key: privateKey, cert: certificate};
const app = express();

app.use(express.static('public'))
app.get('/', (req, res, err) => {
  console.log('got visit');
})

// your express configuration here
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, (err) => {
  if(err)
    throw err
  console.log('listening on 80');
});
httpsServer.listen(443, (err) => {
  if(err)
    throw err
  console.log('listening on 443');
});
