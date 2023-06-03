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
    default: true,
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
  $id: '',
  $createdAt: '',
  $updatedAt: '',
  name: '',
  registration: '',
  status: false,
  passwordUpdate: '',
  email: '',
  phone: '',
  emailVerification: false,
  phoneVerification: false,
  prefs: {},
};

export const registerForm = {
  name: '',
  email: '',
  password: '',
};

export const loginForm = {
  email: '',
  password: '',
};

export const sidebarList = {};

export const styles = {
  backgroundImage: "url('/bg.jpg')",
  backgroundColor: 'rgba(255,255,255, 0.5)',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backdropFilter: 'blur(10px)',
  width: '100%',
  height: '100vh',
};
