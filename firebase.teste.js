const { runWith } = require('firebase-functions');
exports.teste = runWith({ memory: '1GB' }).https.onRequest((req, res) => {
    console.log("Aeeee maluco!!!")
});