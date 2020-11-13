import jwt from "jsonwebtoken";

export const generateToken: (id: string) => string = (id: string) => jwt.sign({id}, process.env.JWT_SECRET_KEY);