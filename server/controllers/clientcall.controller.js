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

export const getclients = async (req, res, next) => {
  try {
    const sortDirection = -1;
    const clients = await NextClient.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.clientId && { _id: req.query.clientId }),
    }).sort({
      createdAt: sortDirection,
    });

    const totalClients = await NextClient.countDocuments();
    // const lastClient = await NextClient.find()
    //   .sort({ timestamp: -1 })
    //   .limit(1)
    //   .toArray();

    res.status(200).json({ clients, totalClients });
  } catch (error) {
    next(error);
  }
};
