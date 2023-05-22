import React from 'react';
import { uniqueID, account, storage, db } from '../utils/config';
import { formatFileSize, generateString } from '../utils/functions';
import { defaultDocument, loginForm, registerForm } from '../utils/state';

interface AppWriteContextProps {
  register: (form: typeof registerForm) => Promise<unknown>;
  login: (form: typeof loginForm) => Promise<unknown>;
  logout: () => Promise<void>;
  getUser: () => Promise<unknown>;
  uploadFile: (file: File) => Promise<typeof defaultDocument>;
  files: File[];
  handleFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveFile: (name: string) => void;
  handleClear: () => void;
  getAllFiles: (bucketId: string) => Promise<unknown>;
  document: typeof defaultDocument;
  deleteFrom_db_bucket: (fileId: string) => Promise<void>;
  downloadFile: (fileId: string) => Promise<void>;
}

const AppWriteContext = React.createContext<AppWriteContextProps>({
  register: () => Promise.resolve(),
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  getUser: () => Promise.resolve(),
  uploadFile: () => Promise.resolve(defaultDocument),
  files: [],
  handleFile: (event: React.ChangeEvent<HTMLInputElement>) => {
    event;
  },
  handleRemoveFile: (name: string) => {
    name;
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleClear: () => {},
  getAllFiles: () => Promise.resolve(),
  document: defaultDocument,
  deleteFrom_db_bucket: () => Promise.resolve(),
  downloadFile: () => Promise.resolve(),
});

export const AppWriteContextProvider = (props: {
  children: React.ReactNode;
}) => {
  const [files, setFiles] = React.useState<File[]>([]);
  const [document, setDocument] =
    React.useState<typeof defaultDocument>(defaultDocument);

  const register = async (form: typeof registerForm) => {
    await account.create(uniqueID, form.email, form.password, form.name);

    await account.createEmailSession(form.email, form.password);
  };

  const login = async (form: typeof loginForm) => {
    await account.createEmailSession(form.email, form.password);
  };

  const logout = async () => {
    await account.deleteSession('current');
  };

  const getUser = async () => {
    const data = await account.get();

    return data;
  };

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


  const uploadFile = async (file: File): Promise<typeof defaultDocument> => {
    // @desc Generate unique ID
    const documentId = generateString();

    const data = await storage.createFile(
      `${import.meta.env.VITE_APPWRITE_BUCKET_ID}`,
      documentId,
      file
    );

    // @desc Get information from file and data.
    const view = await storage.getFileView(data?.bucketId, data?.$id)?.href;
    const filename = file?.name?.toLowerCase();
    const extension = file?.name?.toLowerCase()?.split('.').pop();
    const size = formatFileSize(data?.sizeOriginal);
    const preview = await storage.getFilePreview(data?.bucketId, data?.$id)
      ?.href;
    const mimeType = data?.mimeType;
    const createdAt = data?.$createdAt;
    const updatedAt = data?.$updatedAt;

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
    };

    // @desc Creating document.
    if (data) {
      const createdDocument: typeof defaultDocument = await db.createDocument(
        `${import.meta.env.VITE_APPWRITE_DATABASE_ID}`,
        `${import.meta.env.VITE_APPWRITE_COLLECTION_ID}`,
        `${documentId}`,
        dbSchemaData
      );
      setDocument(createdDocument);
    }

    return document;
  };

  const getAllFiles = async (bucketId: string) => {
    const data = await storage.listFiles(bucketId);

    return data;
  };

  const downloadFile = async (fileId: string) => {
    console.log('clicked');
    const data = await storage.getFileDownload(
      `${import.meta.env.VITE_APPWRITE_BUCKET_ID}`,
      fileId
    );

    console.log('data', data);
  };

  const deleteFrom_db_bucket = async (fileId: string) => {
    const bucket_ = await storage.deleteFile(
      `${import.meta.env.VITE_APPWRITE_BUCKET_ID}`,
      fileId
    );

    const db_ = await db.deleteDocument(
      `${import.meta.env.VITE_APPWRITE_DATABASE_ID}`,
      `${import.meta.env.VITE_APPWRITE_COLLECTION_ID}`,
      fileId
    );

    console.log('bucket_', bucket_);
    console.log('db_', db_);
  };

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
    document,
    deleteFrom_db_bucket,
    downloadFile,
  };

  return (
    <AppWriteContext.Provider value={value}>
      {props.children}
    </AppWriteContext.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useAppwriteContext = () => React.useContext(AppWriteContext);
