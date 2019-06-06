const express = require('express')
const fs = require('fs')
const http = require('http');
const https = require('https');
const osc = require('osc')
const WebSocket = require('ws')

let cert = '/etc/letsencrypt/live/computer.enframed.net/fullchain.pem'
let key = '/etc/letsencrypt/live/computer.enframed.net/privkey.pem'
// const privateKey  = fs.readFileSync('selfsigned.key', 'utf8');
// const certificate = fs.readFileSync('selfsigned.crt', 'utf8');
const privateKey  = fs.readFileSync(key, 'utf8');
const certificate = fs.readFileSync(cert, 'utf8');



const credentials = {key: privateKey, cert: certificate};
const app = express();

app.use(express.static('public'))

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

// app.get('/', (req, res, err) => {
//   console.log(req);
//   console.log('---------------------------------------------------------------------');
//   res.redirect('https://computer.enframed.net'+req.url)
// })


// var server = app.listen(53001);

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
