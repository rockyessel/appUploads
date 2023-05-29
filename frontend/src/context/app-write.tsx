import React from 'react';
import { uniqueID, account, storage, db } from '../utils/config';
import { formatFileSize, generateString } from '../utils/functions';
import {
  defaultDocument,
  defaultUser,
  loginForm,
  registerForm,
} from '../utils/state';
import { Query } from 'appwrite';
import { UserDocumentProps, UserProps } from '../interface';
import { FaSlidersH } from 'react-icons/fa';

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
  // getDocumentFrom_db: () => Promise<void>;
  getCurrentUserDocuments: (
    userId: string
  ) => Promise<{ total: number; documents: UserDocumentProps[] | [] }>;
  globalDocumentData: UserDocumentProps[] | [];
  setGlobalDocumentData: React.Dispatch<
    React.SetStateAction<UserDocumentProps[] | []>
  >;
  getDocument: ($id: string) => Promise<UserDocumentProps | undefined>;
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
  // getDocumentFrom_db: () => Promise.resolve(),
  getCurrentUserDocuments: () => Promise.resolve({ total: 0, documents: [] }),
  globalDocumentData: [],
  triggerEffect: false,
  setGlobalDocumentData: () => [],
  getDocument: () => Promise.resolve(defaultDocument),
  uploadUserProfile: () => Promise.resolve(''),
});

export const AppWriteContextProvider = (props: {
  children: React.ReactNode;
}) => {
  const [files, setFiles] = React.useState<File[]>([]);
  const [documentsData, setDocumentsData] = React.useState<UserDocumentProps[]>(
    []
  );
  const [globalDocumentData, setGlobalDocumentData] = React.useState<
    UserDocumentProps[]
  >([]);
  const [triggerEffect, setTriggerEffect] = React.useState(false);

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
    console.log('logout',data)
  };

  const verifyUser = React.useCallback(async () => {
    try {
      setTriggerEffect((prev) => !prev);
      const currentUser = await account.get();
      const getUserFromLocalStorage = window.localStorage.getItem('user');
      const user: UserProps = JSON.parse(`${getUserFromLocalStorage}`);

      if (user === null) {
        window.localStorage.setItem('user', JSON.stringify(currentUser));
      } else if (user !== null) {
        const currentUserId = currentUser.$id;
        const savedUserId = user.$id; //647200b7f40247e76178
        if (savedUserId !== currentUserId) {
          await account.deleteSession('current');
          window.localStorage.removeItem('user');
          window.location.replace('/authenticate');
        } else {
          console.log('verified');
        }
      }
    } catch (error) {
      const location = window.location.pathname;
      if (location === '/dashboard') {
        window.location.replace('/authenticate');
      }
      console.log('something went wrong');
    }
  }, []);

  const getUser = async (): Promise<UserProps> => {
    const data = await account.get();
    verifyUser();

    return data;
  };

  React.useEffect(() => {
    const timeout = setInterval(() => {
      verifyUser();
    }, 10000);

    return () => clearInterval(timeout);
  }, [verifyUser]);

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files;
    if (selectedFile) {
      const arrFiles = [...selectedFile, ...files];
      setFiles(Array.prototype.slice.call(arrFiles));
    }
  };

  const handleRemoveFile = (name: string) => {
    const removed_file = files.filter((file) => file.name !== name);
    setFiles(removed_file);
  };

  const handleClear = () => setFiles([]);

  const uploadFile = async (file: File): Promise<UserDocumentProps[] | []> => {
    // @desc Generate unique ID
    const documentId = generateString();

    const data = await storage.createFile(
      `${import.meta.env.VITE_APPWRITE_BUCKET_ID}`,
      documentId,
      file
    );

    const currentUser = await getUser();
    console.log('currentUser', currentUser);

    if (data) {
      // @desc Get information from file and data.
      const view = await storage.getFileView(data?.bucketId, data?.$id)?.href;
      const filename = file?.name?.toLowerCase();
      const extension = file?.name?.toLowerCase()?.split('.').pop();
      const size = formatFileSize(data?.sizeOriginal);
      const preview = await storage.getFilePreview(data?.bucketId, data?.$id)
        ?.href;
      const mimeType = file?.type;
      const createdAt = data?.$createdAt;
      const updatedAt = data?.$updatedAt;
      const userId = currentUser?.$id;

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
      [Query.equal('userId', [`${userId}`])]
    )) as unknown as { total: number; documents: UserDocumentProps[] | [] };
    return data;
  };

  const getDocument = async ($id: string) => {
    if ($id) {
      const data = (await db.listDocuments(
        `${import.meta.env.VITE_APPWRITE_DATABASE_ID}`,
        `${import.meta.env.VITE_APPWRITE_COLLECTION_ID}`,
        [Query.equal('documentId', [`${$id}`])]
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

  // const getDocumentFrom_db = async () => {
  //   const data = await db.listDocuments(
  //     `${import.meta.env.VITE_APPWRITE_DATABASE_ID}`,
  //     `${import.meta.env.VITE_APPWRITE_COLLECTION_ID}`
  //   );
  //   return data;
  // };

  React.useEffect(() => {
    getUser();
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
    // getDocumentFrom_db,
    getCurrentUserDocuments,
    globalDocumentData,
    setGlobalDocumentData,
    getDocument,
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
