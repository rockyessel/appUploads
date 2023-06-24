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

/**
 * Formats the file size in a human-readable format.
 * @param size - The file size in bytes.
 * @returns The formatted file size with appropriate units (B, KB, MB, GB).
 */
export const formatFileSize = (size: number): string => {
  const units = ['B', 'KB', 'MB', 'GB'];
  let formattedSize = size;
  let unitIndex = 0;

  // Iterate through the units and divide the size by 1024 until it's less than 1024 or we reach the largest unit
  while (formattedSize >= 1024 && unitIndex < units.length - 1) {
    formattedSize /= 1024;
    unitIndex++;
  }

  return `${formattedSize?.toFixed(2)}${units[unitIndex]}`;
};


/**
 * Shuffles the characters in a string randomly.
 * @param input - The input string to shuffle.
 * @returns The shuffled string.
 */
const shuffleString = (input: string): string => {
  const shuffleRatio = Math.random() * 0.8;
  let characters = input.split('');
  characters = characters.sort(() => Math.random() - shuffleRatio);
  return characters.join('');
};

/**
 * Generates a random string of random length.
 * @returns The generated random string.
 */
export const generateString = (): string => {
  // Shuffling the characters to ensure randomness
  const characters = shuffleString(
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  );

  // Determining the length of the random string
  const length = Math.floor(Math.random() * 6) + 5;

  // Array to track used characters
  const usedChars: string[] = [];

  // Building the random string character by character
  let result = '';
  for (let i = 0; i < length; i++) {
    let index: number;

    // Selecting a random character that has not been used before
    do {
      index = Math.floor(Math.random() * characters.length);
    } while (usedChars.includes(characters[index]));

    // Adding the selected character to the result string and tracking it as used
    result += characters[index];
    usedChars.push(characters[index]);
  }

  return result;
};

/**
 * Checks if the provided object has no value.
 * @param obj - The object to check.
 * @returns A boolean indicating whether the object has no value.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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


/**
 * Downloads a file from the specified URL with the provided name.
 * @param url - The URL of the file to download.
 * @param name - The desired name of the downloaded file.
 * @returns A Promise that resolves when the file is successfully downloaded.
 */
export const downloadFile = async (url: string, name: string): Promise<void> => {
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


/**
 * Filters an array of user document objects based on the provided types.
 * @param data - The array of user document objects to filter.
 * @param types - The array of types to filter by.
 * @returns The filtered array of user document objects.
 */
export const filteredData = (data: UserDocumentProps[], types: string[]): UserDocumentProps[] => {
  // Filtering the data array based on the provided types
  const filtered = data?.filter((obj) => {
    const mimeType = obj.mimeType.toLowerCase();
    return types.some((type) => mimeType.startsWith(`${type}`));
  });

  // Logging the filtered data for debugging purposes
  // console.log('filtered data', filtered);

  return filtered;
}



/**
 * Fetches audio metadata from the provided audio URL and updates the metadata state.
 * @param audioURL - The URL of the audio file.
 * @param setMetadata - The state setter function for updating the metadata.
 */
export const fetchAudioData = async (audioURL: string, setMetadata: React.Dispatch<React.SetStateAction<Metadata | undefined>>) => {
  try {
    const response = await fetch(`${audioURL}`);
    const data = await response.blob();

    // Read the audio file tags using jsmediatags library
    jsmediatags.read(data, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onSuccess: (tags: { type: string; tags: any }) => {
        setMetadata(tags.tags); // Update the metadata state with the extracted tags
      },
      onError: (error: jsmediatagsError) => {
        console.log(error); // Log any errors that occur during tag extraction
      },
    });
  } catch (error) {
    console.log(error); // Log any errors that occur during the fetch operation
  }
};


/**
 * Sets the mimeType of a file if it is not provided or empty.
 * @param file - The file object.
 * @returns The updated file object with the mimeType set.
 */
export const fileMimeTypeSetter = (file: File): File => {
  // Check if the file object exists and if its mimeType is empty
  if (file && file.type === '') {
    const extension = file.name.toLowerCase().split('.').pop(); // Get the file extension
    const isMimeTypePresentInArr = mimeTypes?.includes(`${extension}`); // Check if the mimeType is present in the allowed mimeTypes array

    if (isMimeTypePresentInArr) {
      // If the mimeType is present in the allowed mimeTypes array, create a new File object with the updated mimeType
      const updatedFile = new File([file], file.name, {
        type: assignedMimeTypes[`${extension}`], // Assign the appropriate mimeType based on the extension
      });

      return updatedFile;
    }
  }

  return file; // Return the file object as-is if the mimeType is already provided or if it doesn't match the allowed mimeTypes
};


/**
 * Groups an array of UserDocumentProps by a specified time interval.
 * @param documentData - The array of UserDocumentProps to be grouped.
 * @param interval - The time interval for grouping (day, week, month, year).
 * @returns An object with grouped UserDocumentProps arrays, where the keys are the interval periods.
 */
export const groupDocumentDataByInterval = (
  documentData: UserDocumentProps[],
  interval: string
) => {
  const groups: { [intervalKey: string]: UserDocumentProps[] } = {};

  /**
   * Get the start of the interval for a given date.
   * @param date - The input date.
   * @returns The start of the interval for the date.
   */
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

  /**
   * Add an interval to a given date.
   * @param date - The input date.
   * @returns The date incremented by the interval.
   */
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


/**
 * Check if the total size of files or any individual file in the array exceeds 2GB.
 * @param files - An array of files to be checked.
 * @returns A boolean indicating if the file(s) exceed the size limit.
 */
export const checkFileSize = (files: File[]): boolean => {
  const maxSize = 2 * 1024 * 1024 * 1024; // 2GB in bytes
  let totalSize = 0;

  for (const file of files) {
    if (file.size > maxSize) {
      // Single file exceeds 2GB
      return true;
    }
    totalSize += file.size;
    if (totalSize > maxSize) {
      // Total size of files exceeds 2GB
      return true;
    }
  }

  return false; // Files are within the limit
};
