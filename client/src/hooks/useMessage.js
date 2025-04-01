import { get, patch, post } from "../utils/api";

export const sendMessage = async (chatId, content, receiverId) => {
  try {
    const data = await post("/message", { chatId, content, receiverId });

    return { data, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

export const markMessageAsSeen = async (chatId) => {
  try {
    const data = await patch(`/message/seen/${chatId}`);
    return { data, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

export const getMessagesByChat = async (chatId) => {
  try {
    const data = await get(`/message/chat/${chatId}`);

    return { data, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};
