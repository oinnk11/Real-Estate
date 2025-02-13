import { del, get, post } from "../utils/api";

export const getBookings = async (query) => {
  try {
    const data = await get("/booking", query);

    return { data, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

export const createBooking = async (body) => {
  try {
    const data = await post("/booking", body);

    return { data, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

export const deleteBooking = async (id) => {
  try {
    const data = await del(`/booking/${id}`);

    return { data, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};
