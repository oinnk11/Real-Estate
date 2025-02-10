import { get, post } from "../utils/api";

export const createListing = async (formData) => {
  try {
    const data = await post("/listing/create", formData, {
      "Content-Type": "multipart/form-data",
    });

    return { data, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

export const getListings = async (query) => {
  try {
    const data = await get("/listing", query);

    return { data, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

export const getListingById = async (id) => {
  try {
    const data = await get("/listing", { id });

    return { data, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

export const getTopViewedListings = async ({ limit }) => {
  try {
    const data = await get("/listing/by-views", { limit });

    return { data, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

export const getListingTypes = async () => {
  try {
    const data = await get("/listing/types");

    return { data, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

export const getLocationAutoComplete = async (query) => {
  try {
    const data = await get("/listing/auto-complete", { query });

    return { data: data.predictions, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

export const handleListingClick = async (id) => {
  if (!id) return;
  try {
    const data = await post(`/listing/view/${id}`);

    return { data, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};
