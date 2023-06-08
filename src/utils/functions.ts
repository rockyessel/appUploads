import { Metadata, UserDocumentProps } from '../interface';
import * as jsmediatags from 'jsmediatags';
import { jsmediatagsError } from 'jsmediatags/types';
import {
  startOfDay,
  startOfWeek,
  startOfMonth,
  startOfYear,
  addDays,
  addWeeks,
  addMonths,
  addYears,
  format,
} from 'date-fns';
import { assignedMimeTypes, mimeTypes } from './constant';

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

export const filteredData = (
  data: UserDocumentProps[],
  types: string[]
): UserDocumentProps[] => {
  console.log('original data', data);

  const filtered = data?.filter((obj) => {
    const mimeType = obj.mimeType.toLowerCase();
    return types.some((type) => mimeType.startsWith(`${type}`));
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

export const fetchAudioData = async (
  audioURL: string,
  setMetadata: React.Dispatch<React.SetStateAction<Metadata | undefined>>
) => {
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

export const fileMimeTypeSetter = (file: File): File => {
  // @desc Some files don't have mimeType
  if (file && file.type === '') {
    const extension = file.name.toLowerCase().split('.').pop();
    const isMimeTypePresentInArr = mimeTypes?.includes(`${extension}`);
    if (isMimeTypePresentInArr) {
      const updatedFile = new File([file], file.name, {
        type: assignedMimeTypes[`${extension}`],
      });
      return updatedFile;
    }
  }
  return file;
};

export const groupDocumentDataByInterval = (
  documentData: UserDocumentProps[],
  interval: string
) => {
  const groups: { [intervalKey: string]: UserDocumentProps[] } = {};

  const getStartOfInterval = (date: Date) => {
    switch (interval) {
      case 'day':
        return startOfDay(date);
      case 'week':
        return startOfWeek(date);
      case 'month':
        return startOfMonth(date);
      case 'year':
        return startOfYear(date);
      default:
        return date;
    }
  };

  const addInterval = (date: Date) => {
    switch (interval) {
      case 'day':
        return addDays(date, 1);
      case 'week':
        return addWeeks(date, 1);
      case 'month':
        return addMonths(date, 1);
      case 'year':
        return addYears(date, 1);
      default:
        return date;
    }
  };

  documentData.forEach((file) => {
    const createdAt = new Date(file.createdAt);
    let currentDate = getStartOfInterval(createdAt);
    const intervalKey = format(currentDate, 'yyyy-MM-dd');

    if (groups[intervalKey]) {
      groups[intervalKey].push(file);
    } else {
      groups[intervalKey] = [file];
    }

    // Increment the current date by the specified interval
    currentDate = addInterval(currentDate);
  });

  return groups;
};
