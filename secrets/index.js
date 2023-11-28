const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(express.json());
const secretRoutes = require("./secretRoutes");


//app.use("/api/v1",secretRoutes);
app.use(secretRoutes);

const { storeSecrets, retrieveSecrets } = require('./dbsecrets');

// const secretName = 'secret-1';
// const username = 'bhanu01';
// const password = '7654321';

// storeSecrets(username, password, secretName);
// retrieveSecrets(secretName);
const port = 4000;
app.listen(port ,()=> {
    console.log("SERVER LISTENING ON PORT : 4000")});
