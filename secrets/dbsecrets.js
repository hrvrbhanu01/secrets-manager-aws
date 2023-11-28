require('dotenv').config();

const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const secretsManager = new AWS.SecretsManager();

const storeSecrets = async(req, res) => {
  const {username, password, secretName} = req.body;
  const secretValue = JSON.stringify({ username, password });

  const params = {
    Name: secretName,
    SecretString: secretValue,
  };

  try {
    await secretsManager.createSecret(params).promise();
    console.log(`Secret ${secretName} stored successfully.`);
    res.status(200).json({message:`Secret ${secretName} stored successfully.`})
  } catch (error) {
    console.error(`Error storing secret: ${error.message}`);
    res.status(500).json({error: "Internal server error"})

  }
}

const retrieveSecrets = async(req, res) => {
  const secretName = req.params.secretName;
  const params = {
    SecretId: secretName,
  };

  try {
    const secret = await secretsManager.getSecretValue(params).promise();
    const { username, password } = JSON.parse(secret.SecretString);
    console.log(`Username: ${username}, Password: ${password}`);
  
    res.status(200).json({ username, password })

  } catch (error) {
    console.error(`Error retrieving secret: ${error.message}`);
    res.status(500).json({error: "Internal server error"})
  }
}

module.exports = { storeSecrets, retrieveSecrets };
