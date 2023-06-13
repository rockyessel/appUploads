import { proxy } from 'valtio';
import { UserDocumentProps, UserProps } from '../interface';

// state.ts

// Represents the state of the screen
export const screenState = proxy({
  defaultScreen: true, // Indicates if the default screen is active
  loadingScreen: false, // Indicates if the loading screen is active
  filesScreen: false, // Indicates if the files screen is active
  authenticationScreen: {
    register: true, // Indicates if the registration screen is active
    login: false, // Indicates if the login screen is active
  },
  dashboardScreen: {
    default: true, // Indicates if the default dashboard screen is active
    share: false, // Indicates if the share dashboard screen is active
  },
});

// Represents the default user document
export const defaultDocument: UserDocumentProps = {
  $collectionId: '', // Collection ID of the document
  $createdAt: '', // Creation timestamp of the document
  $databaseId: '', // Database ID of the document
  $id: '', // ID of the document
  $permissions: [], // Permissions associated with the document
  $updatedAt: '', // Last update timestamp of the document
  createdAt: '', // Creation timestamp of the document
  extension: '', // File extension of the document
  filename: '', // Filename of the document
  mimeType: '', // MIME type of the document
  preview: '', // URL or data representing the preview of the document
  size: '', // Size of the document
  updatedAt: '', // Last update timestamp of the document
  view: '', // URL or data representing the view of the document
  public: false, // Indicates if the document is public
  access_file_code: '', // Access code for the file
};

// Represents the default user
export const defaultUser:UserProps = {
  $id: '', // ID of the user
  $createdAt: '', // Creation timestamp of the user
  $updatedAt: '', // Last update timestamp of the user
  name: '', // Name of the user
  registration: '', // Registration information of the user
  status: false, // Status of the user
  passwordUpdate: '', // Timestamp of the last password update
  email: '', // Email address of the user
  phone: '', // Phone number of the user
  emailVerification: false, // Indicates if the email is verified
  phoneVerification: false, // Indicates if the phone is verified
  prefs: {
    profile: {
      profile: ''
    }
  }, // User preferences
};

// Represents the form fields for user registration
export const registerForm = {
  name: '', // Name field in the registration form
  email: '', // Email field in the registration form
  password: '', // Password field in the registration form
};

// Represents the form fields for user login
export const loginForm = {
  email: '', // Email field in the login form
  password: '', // Password field in the login form
};

// Represents the list of items for the sidebar navigation
export const sidebarList = {};
