import jwt from "jsonwebtoken";
import User from "../database/models/users.js";

export const authenticateToken = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized. Token missing." });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decodedToken.id);

    if (!user) {
      return res.status(403).json({ message: "Unauthorized. Invalid token." });
    }

    req.user = decodedToken; // Attach the decoded token to req.user
    next(); // Proceed
  } catch (error) {
    return res.status(403).json({ message: "Unauthorized. Invalid token." });
  }
};

export const authenticateAdmin = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized. Token missing." });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decodedToken.id);

    if (!user) {
      return res.status(403).json({ message: "Unauthorized. Invalid token." });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized. Invalid token." });
    }

    req.user = decodedToken; // Attach the decoded token to req.user
    next(); // Proceed
  } catch (error) {
    return res.status(403).json({ message: "Unauthorized. Invalid token." });
  }
};
