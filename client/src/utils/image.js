import { toast } from "react-toastify";
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from "./constants";

export const validateFile = (file) => {
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    toast.warn(`File type not allowed: ${file.name}`);
    return false;
  }

  if (file.size > MAX_FILE_SIZE) {
    toast.warn(`File too large: ${file.name}`);

    return false;
  }

  return true;
};

export const createImageUrl = (file) => {
  // Ensure we're passing a valid File object
  if (Array.isArray(file)) {
    file = file[0]; // Access the first file
  }

  if (!(file instanceof File)) {
    throw new Error("Invalid input: Expected a File object");
  }

  return URL.createObjectURL(file);
};

export const cleanUpImageUrl = (url) => {
  URL.revokeObjectURL(url);
};

// Reset the input so it can be used again
export const resetFileInput = (id) => {
  const input = document.getElementById(id);
  input.value = "";
};
