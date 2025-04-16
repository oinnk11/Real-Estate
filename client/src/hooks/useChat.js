import { get, post } from "../utils/api";

export const createChat = async (body) => {
  try {
    const data = await post("/chat", body);

    return { data, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

export const getChatById = async (id) => {
  try {
    const data = await get(`/chat/${id}`);

    return { data, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

export const getUserChats = async (userId) => {
  try {
    const data = await get(`/chat/user/${userId}`);

    return { data, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};
