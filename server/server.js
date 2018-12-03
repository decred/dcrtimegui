const express = require("express");
const https = require("https");
var fs = require('fs')
const bodyParser = require("body-parser");

const app = express();
const port = 8080;

// process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const testnetHost = "time-testnet.decred.org";
const testnetPort = "59152";
// const mainnetHost = "https://time.decred.org";


const timestampRoute = "/v1/timestamp/";
const verifyRoute = "/v1/verify/";

const proxyRequest = path => (req, res) => {
    // console.log(req.body);
    console.log("ihaa");
    // const data = JSON.stringify(req.body);
    const options = {
        host: testnetHost,
        port: testnetPort,
        path: path,
        method: "POST",
        headers: req.headers,
        rejectUnauthorized: false
    };

    var creq = https.request(options, function(cres) {
        console.log('heeey');
        // set encoding
        cres.setEncoding('utf8');
    
        // wait for data
        cres.on('data', function(chunk){
          console.log("got some data");
          // res.writeHead(cres.statusCode);
          res.write(chunk);
        });
    
        cres.on('close', function(){
          console.log("got close");
          // closed, let's end client request as well 
          res.writeHead(cres.statusCode);
          res.end();
        });
    
        cres.on('end', function(){
          console.log('got end');
          // finished, let's finish client request as well 
          res.writeHead(cres.statusCode);
          res.end();
        });
    
      }).on('error', function(e) {
        // we got an error, return 500 error to client and log error
        console.log(e.message);
        res.writeHead(500);
        res.end();
      });

    
      creq.end();
}

app.get('/', function (req, res) {
  res.send('hello world')
})


app.use(bodyParser.json()); // for parsing application/json

app.post(timestampRoute, proxyRequest(timestampRoute));

app.post(verifyRoute, proxyRequest(verifyRoute));

https.createServer({
  key: fs.readFileSync('server/server.key'),
  cert: fs.readFileSync('server/server.cert')
}, app)
.listen(8080, function () {
  console.log(`Serve listening on port ${port}!`)
})

// app.listen(port, () => console.log(`Example app listening .on port ${port}!`));