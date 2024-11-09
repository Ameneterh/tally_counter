import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { clientCall } from "../controllers/clientcall.controller.js";

const router = express.Router();

router.post("/client-call", verifyToken, clientCall);

export default router;
