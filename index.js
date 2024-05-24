const port = "420"
const Corrosion = require('./lib/server')
const express = require('express')
const firebase = require('firebase/app');
require('firebase/auth'); 

// Firebase initialization
const firebaseConfig = {
  apiKey: "AIzaSyDakr7a_ty2LcrECw0Bo48LlFKN2-tgIVI",
  authDomain: "celestial-network.firebaseapp.com",
  projectId: "celestial-network",
  storageBucket: "celestial-network.appspot.com",
  messagingSenderId: "668361817556",
  appId: "1:668361817556:web:29baa7fba0e76fc1106a41",
  measurementId: "G-CCWF3DG4W3"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const app = express()

const proxy = new Corrosion({
    prefix: "/service/",
    codec: "xor",
    title: "Celestial Network",
    forceHttps: true,
    requestMiddleware: [
        Corrosion.middleware.blacklist([
            "accounts.google.com", "pornhub.com", "xvideos.com", "https://google.com/search?q=porn", "https://rule34.xxx"
        ], "The page has been blocked by Nova Network to protect your security and the innocence of the soul."),
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
  console.log(`Hooray! Nova is running at localhost:${port}`)
})
