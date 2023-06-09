import React from 'react';
import { uniqueID, account, storage, db } from '../utils/config';
import {
  fileMimeTypeSetter,
  formatFileSize,
  generateString,
} from '../utils/functions';
import {
  defaultDocument,
  defaultUser,
  loginForm,
  registerForm,
} from '../utils/state';
import { Query } from 'appwrite';
import { UserDocumentProps, UserProps } from '../interface';
import { toast } from 'react-toastify';

interface AppWriteContextProps {
  register: (form: typeof registerForm) => Promise<unknown>;
  login: (form: typeof loginForm) => Promise<unknown>;
  logout: () => Promise<void>;
  getUser: () => Promise<UserProps>;
  uploadFile: (file: File) => Promise<UserDocumentProps[] | []>;
  files: File[];
  handleFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveFile: (name: string) => void;
  handleClear: () => void;
  getAllFiles: (bucketId: string) => Promise<unknown>;
  documentsData: (typeof defaultDocument)[] | [];
  deleteFrom_db_bucket: (fileId: string) => Promise<void>;
  getEveryUserDocuments: () => Promise<UserDocumentProps[] | []>;
  getCurrentUserDocuments: (
    userId: string
  ) => Promise<{ total: number; documents: UserDocumentProps[] | [] }>;
  globalDocumentData: UserDocumentProps[] | [];
  setGlobalDocumentData: React.Dispatch<
    React.SetStateAction<UserDocumentProps[] | []>
  >;
  getDocumentById: ($id: string) => Promise<UserDocumentProps | undefined>;
  uploadUserProfile: (file: File) => Promise<string>;
  triggerEffect: boolean;
}

const AppWriteContext = React.createContext<AppWriteContextProps>({
  register: () => Promise.resolve(),
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  getUser: () => Promise.resolve(defaultUser),
  uploadFile: () => Promise.resolve([]),
  files: [],
  handleFile: (event: React.ChangeEvent<HTMLInputElement>) => {
    event;
  },
  handleRemoveFile: (name: string) => {
    name;
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleClear: () => {
    return;
  },
  getAllFiles: () => Promise.resolve(),
  documentsData: [],
  deleteFrom_db_bucket: () => Promise.resolve(),
  getEveryUserDocuments: () => Promise.resolve([]),
  getCurrentUserDocuments: () => Promise.resolve({ total: 0, documents: [] }),
  globalDocumentData: [],
  triggerEffect: false,
  setGlobalDocumentData: () => [],
  getDocumentById: () => Promise.resolve(defaultDocument),
  uploadUserProfile: () => Promise.resolve(''),
});

export const AppWriteContextProvider = (props: {
  children: React.ReactNode;
}) => {
  const [files, setFiles] = React.useState<File[]>([]);
  const [documentsData, setDocumentsData] = React.useState<
    UserDocumentProps[] | []
  >([]);
  const [globalDocumentData, setGlobalDocumentData] = React.useState<
    UserDocumentProps[]
  >([]);
  const [triggerEffect, setTriggerEffect] = React.useState(false);
  const [allDocuments, setAllDocuments] = React.useState<
    UserDocumentProps[] | []
  >([]);

  const register = async (form: typeof registerForm) => {
    await account.create(uniqueID, form.email, form.password, form.name);
    await account.createEmailSession(form.email, form.password);
  };

  const login = async (form: typeof loginForm) => {
    await account.createEmailSession(form.email, form.password);
  };

  const logout = async () => {
    const data = await account.deleteSession('current');
    window.localStorage.removeItem('user');
    console.log('logout', data);
  };

  const verifyUser = React.useCallback(async () => {
    try {
      setTriggerEffect((prev) => !prev);
      // @desc get user from localStorage
      const getUserFromLocalStorage = window.localStorage.getItem('user');
      
      // @desc prse user
      const user: UserProps = JSON.parse(`${getUserFromLocalStorage}`);
      // @desc get user from db
      const currentUser = await account.get();
      // @desc check for null
      if (user === null) {
        // @desc if null, put user from db to localStorage
        window.localStorage.setItem('user', JSON.stringify(currentUser));
        // @desc 
      } else if (currentUser && user !== null) {
        const currentUserId = currentUser.$id;
        const savedUserId = user.$id; //647200b7f40247e76178
        if (savedUserId !== currentUserId) {
          await account.deleteSession('current');
          window.localStorage.removeItem('user');
          window.location.replace('/authenticate');
        } else {
          console.log('verified');
          return
        }
      } else {
        window.localStorage.removeItem('user');
      }
    } catch (error) {
      const location = window.location.pathname;
      if (location === '/dashboard') {
        window.localStorage.removeItem('user');
        window.location.replace('/authenticate');
      }
      console.log('something went wrong');
    }
  }, []);

  const getUser = async (): Promise<UserProps> => {
    const data = await account.get();
    // verifyUser();

    return data;
  };

  // React.useEffect(() => {
  //   const timeout = setInterval(() => {
  //     verifyUser();
  //   }, 10000);

  //   return () => clearInterval(timeout);
  // }, [verifyUser]);

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files;
    if (selectedFile) {
      const arrFiles = [...selectedFile, ...files];
      setFiles(Array.prototype.slice.call(arrFiles));
    }
  };

  const handleRemoveFile = (name: string) => {
    const removed_file = files.filter((file) => file.name !== name);
    toast.error(`File Removed`);
    setFiles(removed_file);
  };

  const handleClear = () => {
    setFiles([]);
    setDocumentsData([]);

    toast.error(`All files removed`);
  };

  const uploadFile = async (file: File): Promise<UserDocumentProps[] | []> => {
    // @desc Generate unique ID
    const documentId = generateString();

    const updatedFile = fileMimeTypeSetter(file);

    const data = await storage.createFile(
      `${import.meta.env.VITE_APPWRITE_BUCKET_ID}`,
      documentId,
      updatedFile
    );

    const currentUser = await getUser();
    console.log('currentUser', currentUser);

    if (data) {
      // @desc Get information from file and data.
      const view = await storage.getFileView(data?.bucketId, data?.$id)?.href;
      const filename = updatedFile?.name?.toLowerCase();
      const extension = updatedFile.name.toLowerCase().split('.').pop();
      const size = formatFileSize(data?.sizeOriginal);
      const preview = await storage.getFilePreview(data?.bucketId, data?.$id)
        ?.href;

      const mimeType = updatedFile.type;
      const createdAt = data?.$createdAt;
      const updatedAt = data?.$updatedAt;
      const userId = currentUser?.$id;
      // const unique_extension = `${updatedFile.type
      //   .split('/')
      //   .shift()} ${extension}`;

      // @desc db model schema
      const dbSchemaData = {
        view,
        preview,
        extension,
        size,
        filename,
        mimeType,
        createdAt,
        updatedAt,
        userId,
        // unique_extension,
      };

      // @desc Creating document.
      const createdDocument: typeof defaultDocument = await db.createDocument(
        `${import.meta.env.VITE_APPWRITE_DATABASE_ID}`,
        `${import.meta.env.VITE_APPWRITE_COLLECTION_ID}`,
        `${documentId}`,
        dbSchemaData
      );
      setDocumentsData((previousDoc) => [...previousDoc, createdDocument]);
    }

    console.log('documentsData', documentsData);
    return documentsData as UserDocumentProps[];
  };

  const getCurrentUserDocuments = async (userId: string) => {
    const data = (await db.listDocuments(
      `${import.meta.env.VITE_APPWRITE_DATABASE_ID}`,
      `${import.meta.env.VITE_APPWRITE_COLLECTION_ID}`,
      [
        Query.equal('userId', [`${userId}`]),
        // Query.equal('unique_extension', [`${unique_extension}`]),
        Query.limit(100),
      ]
    )) as unknown as { total: number; documents: UserDocumentProps[] | [] };
    return data;
  };

  const getDocumentById = async ($id: string) => {
    if ($id) {
      const data = (await db.getDocument(
        `${import.meta.env.VITE_APPWRITE_DATABASE_ID}`,
        `${import.meta.env.VITE_APPWRITE_COLLECTION_ID}`,
        `${$id}`
      )) as unknown as UserDocumentProps;
      return data;
    }
  };

  const getAllFiles = async (bucketId: string) => {
    const data = await storage.listFiles(bucketId);
    return data;
  };

  const deleteFrom_db_bucket = async (fileId: string) => {
    await storage.deleteFile(
      `${import.meta.env.VITE_APPWRITE_BUCKET_ID}`,
      fileId
    );
    await db.deleteDocument(
      `${import.meta.env.VITE_APPWRITE_DATABASE_ID}`,
      `${import.meta.env.VITE_APPWRITE_COLLECTION_ID}`,
      fileId
    );
  };

  const uploadUserProfile = async (file: File): Promise<string> => {
    // @desc Generate unique ID
    const documentId = generateString();

    const data = await storage.createFile(
      `${import.meta.env.VITE_APPWRITE_BUCKET_ID}`,
      documentId,
      file
    );

    const view = await storage.getFileView(data?.bucketId, data?.$id)?.href;

    // const currentUser = await getUser();
    const profile = { profile: view };

    const user = await account.updatePrefs({ profile });
    window.localStorage.setItem('user', JSON.stringify(user));

    return view;
  };

  const getEveryUserDocuments = async (): Promise<UserDocumentProps[]> => {
    const data = await db.listDocuments(
      `${import.meta.env.VITE_APPWRITE_DATABASE_ID}`,
      `${import.meta.env.VITE_APPWRITE_COLLECTION_ID}`
    );
    setAllDocuments(data as unknown as UserDocumentProps[] | []);

    return allDocuments;
  };

  React.useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    register,
    login,
    logout,
    getUser,
    uploadFile,
    files,
    handleFile,
    handleRemoveFile,
    handleClear,
    getAllFiles,
    documentsData,
    deleteFrom_db_bucket,
    getEveryUserDocuments,
    getCurrentUserDocuments,
    globalDocumentData,
    setGlobalDocumentData,
    getDocumentById,
    uploadUserProfile,
    triggerEffect,
  };

  return (
    <AppWriteContext.Provider value={value}>
      {props.children}
    </AppWriteContext.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useAppwriteContext = () => React.useContext(AppWriteContext);
