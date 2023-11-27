const { storeSecrets, retrieveSecrets } = require('./dbsecrets');

const secretName = 'secret-1';
const username = 'bhanu01';
const password = '7654321';

storeSecrets(username, password, secretName);
retrieveSecrets(secretName);
