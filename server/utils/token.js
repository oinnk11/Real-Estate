import jwt from "jsonwebtoken"; // For generating JWT tokens

export const generateToken = (payload, expiresIn) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  });

  return token;
};

export const setCookieToken = (res, token, days) => {
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: days * 24 * 60 * 60 * 1000, // x days
  });
};
