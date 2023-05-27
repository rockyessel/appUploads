import { proxy } from 'valtio';
import { UserDocumentProps } from '../interface';

export const screenState = proxy({
  defaultScreen: true,
  loadingScreen: false,
  filesScreen: false,
  authenticationScreen: {
    register: true,
    login: false,
  },
  dashboardScreen: {
    user: false,
    music: false,
    document: false,
    application: false,
    generative: false,
    settings: false,
    video: false,
    image: true,
  },
});

export const defaultDocument: UserDocumentProps = {
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

export const defaultUser = {
  $id:'',
  $createdAt:'',
  $updatedAt:'',
  name:'',
  registration:'',
  status: false,
  passwordUpdate:'',
  email:'',
  phone:'',
  emailVerification: false,
  phoneVerification: false,
  prefs: {},
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
