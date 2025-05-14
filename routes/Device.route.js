import express from "express";
import { Device } from "../controllers/Device.controller.js";

const router = express.Router();

router.get("/", Device);


export default router;
