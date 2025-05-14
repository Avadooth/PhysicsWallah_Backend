import express from "express";
const router = express.Router();
import { syncDevice } from "../controllers/syncDevice.controller.js";

router.post("/", syncDevice);

export default router;
