import { Client, Account, Databases } from 'react-native-appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('6683ffc0003389ad9824'); // Your project ID

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases };
