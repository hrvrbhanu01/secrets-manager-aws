const { storeSecrets, retrieveSecrets } = require('./dbsecrets');

// Example usage:
// const secretName = 'your-secret-name';
// const username = 'your-username';
// const password = 'your-password';

storeSecrets(username, password, secretName);
retrieveSecrets(secretName);
