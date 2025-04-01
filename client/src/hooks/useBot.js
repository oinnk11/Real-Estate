import { get, post } from "../utils/api";

export const getBotReply = async (message) => {
  try {
    const data = await post("/bot", { message });

    return { data, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

export const getSpaceEstimationQuestions = async () => {
  try {
    const data = await get("/bot/questions/space-estimation");

    return { data, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

export const getColorPaletteQuestions = async () => {
  try {
    const data = await get("/bot/questions/color-palette");

    return { data, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};
