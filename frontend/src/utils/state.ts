import { proxy } from 'valtio';

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
