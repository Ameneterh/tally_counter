import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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

export const login = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password || username === " || password === ") {
    next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ username });

    if (!validUser) {
      return next(errorHandler(404, "User not found!"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid Credentials!"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY);

    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
