import React from 'react';
import { uniqueID, account, storage, db } from '../utils/config';
import { formatFileSize, generateString } from '../utils/functions';
import { defaultDocument } from '../utils/state';

interface AppWriteContextProps {
  register: (form: any) => Promise<any>;
  login: (form: any) => Promise<any>;
  logout: () => Promise<void>;
  getUser: () => Promise<any>;
  uploadFile: (file: any) => Promise<void>;
  files: File[];
  handleFile: (event: any) => void;
  handleRemoveFile: (name: string) => void;
  handleClear: () => void;
  getAllFiles: (bucketId: string) => Promise<any>;
  document: typeof defaultDocument;
  deleteFrom_db_bucket: (fileId: string) => Promise<void>;
  downloadFile: (fileId: string) => Promise<void>;
}

const AppWriteContext = React.createContext<AppWriteContextProps>({
  register: (form: any) => Promise.resolve(),
  login: (form: any) => Promise.resolve(),
  logout: () => Promise.resolve(),
  getUser: () => Promise.resolve(),
  uploadFile: (file: any) => Promise.resolve(),
  files: [],
  handleFile: (event: any) => {},
  handleRemoveFile: () => {},
  handleClear: () => {},
  getAllFiles: (bucketId: string) => Promise.resolve(),
  document: defaultDocument,
  deleteFrom_db_bucket: (fileId: string) => Promise.resolve(),
  downloadFile: (fileId: string) => Promise.resolve(),
});

export const AppWriteContextProvider = (props: {
  children: React.ReactNode;
}) => {
  const [files, setFiles] = React.useState<File[]>([]);
  const [document, setDocument] =
    React.useState<typeof defaultDocument>(defaultDocument);

  const register = async (form: any) => {
    await account.create(uniqueID, form.email, form.password, form.name);

    await account.createEmailSession(form.email, form.password);
  };

  const login = async (form: any) => {
    await account.createEmailSession(form.email, form.password);
  };

  const logout = async () => {
    await account.deleteSession('current');
  };

  const getUser = async () => {
    const data = await account.get();

    return data;
  };

  const handleFile = (event: any) => {
    const selectedFile = event.target.files;
    const arrFiles = [...selectedFile, ...files];
    setFiles(Array.prototype.slice.call(arrFiles));
  };

  const handleRemoveFile = (name: string) => {
    const removed_file = files.filter((file) => file.name !== name);
    setFiles(removed_file);
  };

  const handleClear = () => {
    setFiles([]);
  };

  const uploadFile = async (file: File) => {
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
    console.log('clicked')
    const data = await storage.getFileDownload(
      `${import.meta.env.VITE_APPWRITE_BUCKET_ID}`,
      fileId
    );

    console.log('data',data)
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
