const AWS = require('aws-sdk');

const secretsManager = new AWS.SecretsManager();

const secretName = 'your-secret-name';

secretsManager.getSecretValue({ SecretId: secretName }, (err, data) => {
    if (err) {
        console.error(`Error retrieving secret: ${err}`);
    } else {
        const secret = JSON.parse(data.SecretString);
        const dbUsername = secret.username;
        const dbPassword = secret.password;

        console.log('Retrieved credentials:', { dbUsername, dbPassword });
    }
});
