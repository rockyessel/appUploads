import React from 'react';
import { UserId, account } from '../utils/config';

interface AppWriteContextProps {
  createUser: (form: any) => Promise<any>;
  getUser: () => Promise<any>;
}

const AppWriteContext = React.createContext<AppWriteContextProps>({
  createUser: (form: any) => Promise.resolve(),
  getUser: () => Promise.resolve(),
});

export const AppWriteContextProvider = (props: {
  children: React.ReactNode;
}) => {
  const createUser = async (form: any) => {
    console.log('context', form);
    const user = await account.create(
      UserId,
      form.email,
      form.password,
      form.name
    );
    console.log(user);
    return user;
  };

  const getUser = async () => {
    const data = await account.get();

    return data;
  };

  const value = { createUser, getUser };

  return (
    <AppWriteContext.Provider value={value}>
      {props.children}
    </AppWriteContext.Provider>
  );
};
export const useAppwriteContext = () => React.useContext(AppWriteContext);
