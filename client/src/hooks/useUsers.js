import { patch } from "../utils/api";

export const editProfile = async ({ name, phone }) => {
  try {
    const data = await patch("/user/edit", {
      name,
      phone,
    });
    console.log("🚀 ~ data:", data);

    return { data, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};
