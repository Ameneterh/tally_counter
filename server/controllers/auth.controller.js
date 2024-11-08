import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const register = async (req, res, next) => {
  const { location, username, password } = req.body;

  if (
    !location ||
    !username ||
    !password ||
    location === "" ||
    username === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required!"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    location,
    username,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json("New User Created Successfully");
  } catch (error) {
    next(error);
  }
};
