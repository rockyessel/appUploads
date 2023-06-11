import { Client, Account, Storage, Databases } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(`${import.meta.env.VITE_APPWRITE_PROJECT_ID}`);

export const account = new Account(client);
export const storage = new Storage(client);
export const db = new Databases(client);
