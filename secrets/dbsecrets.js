const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const secretsManager = new AWS.SecretsManager();

async function storeSecrets(username, password, secretName) {
  const secretValue = JSON.stringify({ username, password });

  const params = {
    Name: secretName,
    SecretString: secretValue,
  };

  try {
    await secretsManager.createSecret(params).promise();
    console.log(`Secret ${secretName} stored successfully.`);
  } catch (error) {
    console.error(`Error storing secret: ${error.message}`);
  }
}

async function retrieveSecrets(secretName) {
  const params = {
    SecretId: secretName,
  };

  try {
    const secret = await secretsManager.getSecretValue(params).promise();
    const { username, password } = JSON.parse(secret.SecretString);
    console.log(`Username: ${username}, Password: ${password}`);
    return { username, password };
  } catch (error) {
    console.error(`Error retrieving secret: ${error.message}`);
    return null;
  }
}

module.exports = { storeSecrets, retrieveSecrets };
