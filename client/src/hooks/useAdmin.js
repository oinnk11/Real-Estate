import { del, get, patch, post } from "../utils/api";

export const getDashboardData = async () => {
  try {
    const data = await get("/admin");

    return { data, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

export const changePassword = async (body) => {
  try {
    const data = await patch("/admin/change-password", body);

    return { data, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

export const updateListing = async (body) => {
  try {
    const data = await patch("/admin/listing", body);

    return { data, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

export const deleteListing = async (id) => {
  try {
    const data = await del(`/admin/listing/${id}`);

    return { data, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

export const createUser = async (body) => {
  try {
    const data = await post("/admin/user", body);

    return { data, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

export const getUsers = async () => {
  try {
    const data = await get("/admin/users");

    return { data, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

export const updateUser = async (body) => {
  try {
    const data = await patch("/admin/user", body);

    return { data, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

export const deleteUser = async (id) => {
  try {
    const data = await del(`/admin/user/${id}`);

    return { data, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

export const getBookings = async () => {
  try {
    const data = await get("/admin/bookings");

    return { data, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};
