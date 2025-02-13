import { post } from "../utils/api";

export const initiatePayment = async (body) => {
  try {
    const data = await post("/payment/initiate", body);

    return { data, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};
