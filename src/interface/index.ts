export interface UserDocumentProps {
  $collectionId: string;
  $createdAt: string;
  $databaseId: string;
  $id: string;
  $permissions: string[];
  $updatedAt: string;
  createdAt: string;
  extension: string;
  filename: string;
  mimeType: string;
  preview: string;
  size: string;
  updatedAt: string;
  view: string;
  public: boolean;
  access_file_code: string;
}

export interface UserProps {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  name: string;
  registration: string;
  status: boolean;
  passwordUpdate: string;
  email: string;
  phone: string;
  emailVerification: boolean;
  phoneVerification: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prefs: {profile:{profile:string}};
}


interface APIC {
  data: {
    format: string;
    type: string;
    description: string;
    data: number[];
  };
  description: string;
  id: string;
  size: number;
}


interface COMM {
  data: {
    language: string;
    short_description: string;
    text: string;
  };
  description: string;
  id: string;
  size: number;
}

interface TALB {
  data: string;
  description: string;
  id: string;
  size: number;
}

interface TCOM {
  data: string;
  description: string;
  id: string;
  size: number;
}

interface TCON {
  data: string;
  description: string;
  id: string;
  size: number;
}

interface TENC {
  data: string;
  description: string;
  id: string;
  size: number;
}

interface TIT2 {
  data: string;
  description: string;
  id: string;
  size: number;
}

interface TOPE {
  data: string;
  description: string;
  id: string;
  size: number;
}

interface TPE1 {
  data: string;
  description: string;
  id: string;
  size: number;
}

interface TYER {
  data: string;
  description: string;
  id: string;
  size: number;
}

interface Comment {
  language?: string;
  short_description?: string;
  text?: string;
}

interface PictureType {
  data: Uint8Array;
  format: string;
}

export interface Metadata {
  album?: string;
  artist?: string;
  comment?: Comment;
  genre?: string;
  title?: string;
  year?: string;
  picture?: PictureType | undefined;
  APIC?: APIC;
  COMM?: COMM;
  TALB?: TALB;
  TCOM?: TCOM;
  TCON?: TCON;
  TENC?: TENC;
  TIT2?: TIT2;
  TOPE?: TOPE;
  TPE1?: TPE1;
  TYER?: TYER;
}
