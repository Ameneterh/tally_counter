import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  clientCall,
  getclients,
} from "../controllers/clientcall.controller.js";

const router = express.Router();

router.post("/client-call", verifyToken, clientCall);
router.get("/get-clients", getclients);

export default router;
