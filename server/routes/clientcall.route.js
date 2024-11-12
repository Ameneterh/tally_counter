import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  clientCall,
  deleteClient,
  dispensed,
  getclients,
} from "../controllers/clientcall.controller.js";

const router = express.Router();

router.post("/client-call", verifyToken, clientCall);
router.get("/get-clients", getclients);
router.delete("/dispensed/:clientId/:userId", verifyToken, deleteClient);
router.put("/dispensed/:clientId/:userId", verifyToken, dispensed);

export default router;
