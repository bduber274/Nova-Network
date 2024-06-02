const port = "8080"
const Corrosion = require('./lib/server')
const express = require('express')
const firebase = require('firebase/app');
require('firebase/auth'); 

const app = express()

const proxy = new Corrosion({
    prefix: "/service/",
    codec: "xor",
    title: "Nova Network",
    forceHttps: true,
    requestMiddleware: [
        Corrosion.middleware.blacklist([
            "accounts.google.com", "pornhub.com", "xvideos.com", "https://google.com/search?q=porn", "https://rule34.xxx"
        ], "The page has been blocked by Nova Network"),
    ]

})

app.use('/', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/public/index.html")
});

app.use('/', function (req, res) {
  proxy.request(req,res)
});

app.listen(process.env.PORT || port, () => {
  console.log(`Nova is successfully running at localhost:${port}`)
})
