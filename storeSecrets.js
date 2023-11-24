const AWS = require('aws-sdk');

const secretsManager = new AWS.SecretsManager();

const secretName = 'secret-name';
const secretValue = JSON.stringify({ username: 'your-username', password: 'your-password' });

secretsManager.createSecret({ Name: secretName, SecretString: secretValue }, (err, data) => {
    if (err) {
        console.error(`Error storing secret: ${err}`);
    } else {
        console.log('Secret stored successfully:', data);
    }
});
