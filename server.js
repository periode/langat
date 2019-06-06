const express = require('express')
const fs = require('fs')
const http = require('http');
const https = require('https');
const osc = require('osc')
const WebSocket = require('ws')

let cert = '/etc/letsencrypt/live/computer.enframed.net/fullchain.pem'
let key = '/etc/letsencrypt/live/computer.enframed.net/privkey.pem'
const privateKey  = fs.readFileSync(key, 'utf8');
const certificate = fs.readFileSync(cert, 'utf8');

const credentials = {key: privateKey, cert: certificate};
const app = express();

app.all('*', ensureSecure); // for redirect
app.use(express.static('public'))

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

function ensureSecure(req, res, next){
  if(req.secure || req.hostname.indexOf('localhost') > -1)
    return next()
  // handle port numbers if you need non defaults
  // res.redirect('https://' + req.host + req.url); // express 3.x
  res.redirect('https://' + req.hostname + req.url); // express 4.x
}

//-- websocket server for OSC
var wss = new WebSocket.Server({
    server: httpsServer
});

let oscUDP = new osc.UDPPort({
  remoteAddress: "192.168.1.3",
  remotePort: 53000
});

oscUDP.open()

// Listen for Web Socket connections.
wss.on("connection", function (socket) {
    console.log('OSC - socket connected')

    var socketPort = new osc.WebSocketPort({
        socket: socket,
        metadata: true
    });

    socketPort.on("message", function (oscMsg) {
        console.log("OSC - ", oscMsg.address);

        oscUDP.send({
          address: oscMsg.address,
          args: ''
        });
    });


});
