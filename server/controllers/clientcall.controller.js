import NextClient from "../models/NextClient.model.js";
import { errorHandler } from "../utils/error.js";

export const clientCall = async (req, res, next) => {
  const nextClient = new NextClient({ ...req.body, userId: req.user.id });

  try {
    const savedClient = await nextClient.save();
    res.status(201).json(savedClient);
  } catch (error) {
    next(error);
  }
};

export const getclients = async (req, res, next) => {
  try {
    const sortDirection = 1;
    const clients = await NextClient.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.clientId && { _id: req.query.clientId }),
    }).sort({
      createdAt: sortDirection,
    });

    const totalClients = await NextClient.countDocuments();
    const lastClient = await NextClient.find().sort({ createdAt: -1 }).limit(1);
    const isDispensed = await NextClient.find({
      ...(req.query.isDispensed && { isDispensed: false }),
    }).sort({ createdAt: 1 });

    res.status(200).json({ clients, totalClients, lastClient, isDispensed });
  } catch (error) {
    next(error);
  }
};

export const deleteClient = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You didn't invite this client!"));
  }

  try {
    await NextClient.findByIdAndDelete(req.params.clientId);
    res.status(200).json("Dispensing to client completed!");
  } catch (error) {
    next(error);
  }
};

export const dispensed = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You didn't invite this client!"));
  }

  try {
    const updatedClient = await NextClient.findByIdAndUpdate(
      req.params.clientId,
      {
        $set: {
          isDispensed: req.body.isDispensed,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedClient);
  } catch (error) {
    next(error);
  }
};
