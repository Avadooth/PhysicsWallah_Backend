import express from "express";
const router = express.Router();
import {syncDevice} from "../controllers/Sync.controller.js"

router.post("/", syncDevice)

export default router;