import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const context = ({ req }) => {
  const { authorization } = req.headers;
  if (authorization) {
    try {
      const { userId } = jwt.verify(authorization, JWT_SECRET);
      return { userId };
    } catch (error) {
      return error;
    }
  }
};

export default context;
