import { del, get } from "../utils/api";

export const getNotifications = async (userId) => {
  try {
    const data = await get("/notification", { userId });

    return { data, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

export const deleteNotification = async (id) => {
  try {
    const data = await del(`/notification/${id}`);

    return { data, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};
