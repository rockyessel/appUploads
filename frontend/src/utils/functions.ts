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
export const hasNoValue = (obj: Record<string, any>): boolean => {
  for (const prop in obj) {
    if (Array.isArray(obj[prop]) && obj[prop].length > 0) {
      return false; // Array is not empty
    }

    if (typeof obj[prop] === 'string' && obj[prop].trim() !== '') {
      return false; // String is not empty
    }
  }
  return true; // Object has no values
};

export const downloadFile = async (url: string, name: string): Promise<void> => {
  try {
    // Fetch the file from the URL
    const response = await fetch(url);
    const data = await response.blob();

    // Create a URL object with the downloaded data
    const blob = new Blob([data], { type: response.headers.get('Content-Type') || undefined });
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
