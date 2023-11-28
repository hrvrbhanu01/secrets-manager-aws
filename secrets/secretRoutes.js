const express = require("express");
const router = express.Router();
const {retrieveSecrets,storeSecrets} = require("./dbsecrets")
router.route("/retrieveSecrets/:secretName").get(retrieveSecrets);
router.post("/storeSecrets", storeSecrets)

module.exports = router;