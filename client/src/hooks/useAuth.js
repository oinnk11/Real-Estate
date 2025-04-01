import { get, post } from "../utils/api";

export const signup = async ({ name, email, password, phone }) => {
  try {
    const data = await post("/auth/signup", {
      name,
      email,
      phone,
      password,
    });

    return { data, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

export const login = async ({ email, password }) => {
  try {
    const data = await post("/auth/login", {
      email,
      password,
    });

    return { data, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

export const logout = async () => {
  try {
    const data = await post("/auth/logout");

    return { data, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

export const getUser = async () => {
  try {
    const data = await get("/auth/user");

    return { data, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

export const adminLogin = async ({ email, password }) => {
  try {
    const data = await post("/auth/admin/login", {
      email,
      password,
    });

    return { data, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};
