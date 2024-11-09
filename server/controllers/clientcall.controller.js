import NextClient from "../models/NextClient.model.js";

export const clientCall = async (req, res, next) => {
  const nextClient = new NextClient({ ...req.body, userId: req.user.id });

  try {
    const savedClient = await nextClient.save();
    res.status(201).json(savedClient);
  } catch (error) {
    next(error);
  }
};
