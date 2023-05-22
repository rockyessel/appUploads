import { proxy } from 'valtio';
import { Document } from '../interface';

export const screenState = proxy({
  defaultScreen: true,
  loadingScreen: false,
  filesScreen: false,
  authenticationScreen: {
    register: true,
    login: false,
  },
  dashboardScreen: {
    user: true,
    image: false,
  },
});

export const defaultDocument: Document = {
  $collectionId: '',
  $createdAt: '',
  $databaseId: '',
  $id: '',
  $permissions: [],
  $updatedAt: '',
  createdAt: '',
  extension: '',
  filename: '',
  mimeType: '',
  preview: '',
  size: '',
  updatedAt: '',
  view: '',
};

export const registerForm = {
  name: '',
  email: '',
  password:''
}


export const loginForm = {
  email: '',
  password:''
}
