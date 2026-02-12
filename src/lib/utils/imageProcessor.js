// Client-side image size validation and compression utility

import imageCompression from "browser-image-compression";

// Maximum allowed image size (in MB) before compression
const MAX_SIZE_MB = 5;

// Compresses image only if it exceeds size limit
export const processImage = async (file) => {
  // Skip compression if file is within size limit
  if (file.size / (1024 * 1024) <= MAX_SIZE_MB) {
    return file;
  }

  // Compression options optimized for mobile-like output
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1080,
    useWebWorker: true,
    initialQuality: 1,
  };
  
  // Perform image compression
  const compressedFile = await imageCompression(file, options);
  return compressedFile;
};
