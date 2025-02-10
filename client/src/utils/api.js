import axios from "axios";
import { BASE_API_URL } from "./constants";

const api = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Utility function to handle errors
const handleError = (error) => {
  if (error.response) {
    const status = error.response.status;
    const message = error.response.data?.message || "An unknown error occurred";
    return { status, message };
  } else if (error.request) {
    // The request was made but no response was received
    return { status: null, message: "No response from server" };
  } else {
    return { status: null, message: error.message };
  }
};

// Function to handle GET requests
export const get = async (url, params = {}) => {
  try {
    const response = await api.get(url, { params });
    return response.data; // Return only the response data
  } catch (error) {
    // Handle error, could be network error, API error, etc.
    console.error("API error:", error);
    const { message } = handleError(error);
    throw new Error(message); // Throw the error with a descriptive message
  }
};

// Function to handle POST requests
export const post = async (url, data = {}, headers = {}) => {
  try {
    const response = await api.post(url, data, { headers });
    return response.data; // Return only the response data
  } catch (error) {
    console.error("API error:", error);
    const { message } = handleError(error);
    throw new Error(message); // Throw the error with a descriptive message
  }
};

// Function to handle PATCH requests
export const patch = async (url, data = {}) => {
  try {
    const response = await api.patch(url, data);
    return response.data;
  } catch (error) {
    console.error("API error:", error);
    const { message } = handleError(error);
    throw new Error(message); // Throw the error with a descriptive message
  }
};

// Function to handle DELETE requests
export const del = async (url) => {
  try {
    const response = await api.delete(url);
    return response.data;
  } catch (error) {
    console.error("API error:", error);
    const { message } = handleError(error);
    throw new Error(message); // Throw the error with a descriptive message
  }
};
