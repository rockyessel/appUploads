import { Client, Account, Storage, Databases } from 'appwrite';

// Create a new instance of the Appwrite Client
const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Set the API endpoint
  .setProject(`${import.meta.env.VITE_APPWRITE_PROJECT_ID}`); // Set the project ID from environment variables

// Create instances of Appwrite services using the client
export const account = new Account(client); // Account service for authentication and user management
export const storage = new Storage(client); // Storage service for file uploads and downloads
export const db = new Databases(client); // Database service for CRUD operations on collections and documents
