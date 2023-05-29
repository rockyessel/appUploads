import { Metadata, UserDocumentProps } from '../interface';
import { screenState } from './state';
import * as jsmediatags from 'jsmediatags';
import { jsmediatagsError } from 'jsmediatags/types';

type FileCategory =
  | 'image'
  | 'video'
  | 'audio'
  | 'application'
  | 'document'
  | 'unknown';

export const getFileCategory = async (
  fileUrl: string
): Promise<FileCategory> => {
  try {
    const response = await fetch(fileUrl);
    if (response.ok) {
      const contentType = response.headers.get('content-type');
      if (contentType) {
        if (contentType.startsWith('image/')) {
          return 'image';
        } else if (contentType.startsWith('video/')) {
          return 'video';
        } else if (contentType.startsWith('audio/')) {
          return 'audio';
        } else if (
          contentType === 'application/pdf' ||
          contentType === 'text/html'
        ) {
          return 'document';
        } else if (contentType.startsWith('application/')) {
          return 'application';
        }
      }
    }
    return 'unknown';
  } catch (error) {
    console.error('Error fetching file:', error);
    return 'unknown';
  }
};

export const formatFileSize = (size: number): string => {
  const units = ['B', 'KB', 'MB', 'GB'];
  let formattedSize = size;
  let unitIndex = 0;

  while (formattedSize >= 1024 && unitIndex < units.length - 1) {
    formattedSize /= 1024;
    unitIndex++;
  }

  return `${formattedSize?.toFixed(2)}${units[unitIndex]}`;
};

const shuffleString = (input: string): string => {
  const shuffleRatio = Math.random() * 0.8;
  let characters = input.split('');
  characters = characters.sort(() => Math.random() - shuffleRatio);
  return characters.join('');
};

// Generate a random string
export const generateString = (): string => {
  const characters = shuffleString(
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  );
  const length = Math.floor(Math.random() * 6) + 5;
  const usedChars: string[] = [];
  let result = '';

  for (let i = 0; i < length; i++) {
    let index: number;

    do {
      index = Math.floor(Math.random() * characters.length);
    } while (usedChars.includes(characters[index]));

    result += characters[index];
    usedChars.push(characters[index]);
  }

  return result;
};

// Check if the object has no value
export const hasNoValue = (obj: any): boolean => {
  if (Array.isArray(obj)) {
    return obj.length === 0; // Check if the array is empty
  }

  if (typeof obj === 'object' && obj !== null) {
    for (const prop in obj) {
      if (!hasNoValue(obj[prop])) {
        return false; // Object property has a value
      }
    }
    return true; // All object properties have no values
  }

  if (typeof obj === 'string' && obj.trim() !== '') {
    return false; // String is not empty
  }

  return true; // Other types (number, boolean, null, undefined) have no values
};

export const downloadFile = async (
  url: string,
  name: string
): Promise<void> => {
  try {
    // Fetch the file from the URL
    const response = await fetch(url);
    const data = await response.blob();

    // Create a URL object with the downloaded data
    const blob = new Blob([data], {
      type: response.headers.get('Content-Type') || undefined,
    });
    const blobUrl = URL.createObjectURL(blob);

    // Create a temporary anchor element with the URL and trigger the download
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = name;
    link.click();

    // Release the URL object and remove the anchor element
    URL.revokeObjectURL(blobUrl);
    link.remove();
  } catch (error) {
    console.error('Failed to download file:', error);
  }
};

export const handleScreenChange = (screen: string) => {
  switch (screen) {
    case 'music':
      screenState.dashboardScreen.music = true;
      screenState.dashboardScreen.application = false;
      screenState.dashboardScreen.document = false;
      screenState.dashboardScreen.generative = false;
      screenState.dashboardScreen.image = false;
      screenState.dashboardScreen.settings = false;
      screenState.dashboardScreen.video = false;
      break;
    case 'image':
      screenState.dashboardScreen.image = true;
      screenState.dashboardScreen.music = false;
      screenState.dashboardScreen.application = false;
      screenState.dashboardScreen.document = false;
      screenState.dashboardScreen.generative = false;
      screenState.dashboardScreen.settings = false;
      screenState.dashboardScreen.video = false;
      break;
    case 'video':
      screenState.dashboardScreen.video = true;
      screenState.dashboardScreen.music = false;
      screenState.dashboardScreen.application = false;
      screenState.dashboardScreen.document = false;
      screenState.dashboardScreen.generative = false;
      screenState.dashboardScreen.image = false;
      screenState.dashboardScreen.settings = false;
      break;
    case 'application':
      screenState.dashboardScreen.application = true;
      screenState.dashboardScreen.music = false;
      screenState.dashboardScreen.document = false;
      screenState.dashboardScreen.generative = false;
      screenState.dashboardScreen.image = false;
      screenState.dashboardScreen.settings = false;
      screenState.dashboardScreen.video = false;
      break;
    case 'document':
      screenState.dashboardScreen.document = true;
      screenState.dashboardScreen.music = false;
      screenState.dashboardScreen.application = false;
      screenState.dashboardScreen.generative = false;
      screenState.dashboardScreen.image = false;
      screenState.dashboardScreen.settings = false;
      screenState.dashboardScreen.video = false;
      break;
    case 'generative':
      screenState.dashboardScreen.generative = true;
      screenState.dashboardScreen.music = false;
      screenState.dashboardScreen.application = false;
      screenState.dashboardScreen.document = false;
      screenState.dashboardScreen.image = false;
      screenState.dashboardScreen.settings = false;
      screenState.dashboardScreen.video = false;
      break;
    case 'settings':
      screenState.dashboardScreen.settings = true;
      screenState.dashboardScreen.music = false;
      screenState.dashboardScreen.application = false;
      screenState.dashboardScreen.document = false;
      screenState.dashboardScreen.generative = false;
      screenState.dashboardScreen.image = false;
      screenState.dashboardScreen.video = false;
      break;
    default:
      screenState.dashboardScreen.settings = false;
      screenState.dashboardScreen.music = false;
      screenState.dashboardScreen.application = false;
      screenState.dashboardScreen.document = false;
      screenState.dashboardScreen.generative = false;
      screenState.dashboardScreen.image = false;
      screenState.dashboardScreen.video = false;
      break;
  }
};

export const filteredData = (
  data: UserDocumentProps[],
  type: string
): UserDocumentProps[] => {
  const filtered = data?.filter((obj) => {
    const mimeType = obj.mimeType.toLowerCase();
    return mimeType.startsWith(`${type}`);
  });
  console.log('filtered data', filtered);

  return filtered;
};

export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${minutes}:${formattedSeconds}`;
};


export const fetchAudioData = async (audioURL: string, setMetadata: React.Dispatch<React.SetStateAction<Metadata | undefined>>) => {
  try {
    const response = await fetch(`${audioURL}`);
    const data = await response.blob();

    jsmediatags.read(data, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onSuccess: (tags: { type: string; tags: any }) => {
        setMetadata(tags.tags);
      },
      onError: (error: jsmediatagsError) => {
        console.log(error);
      },
    });
  } catch (error) {
    console.log(error);
  }
};