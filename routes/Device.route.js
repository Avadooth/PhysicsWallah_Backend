import express from "express"
const router = express.Router()
import { Device } from "../controllers/Device.controller.js"

router.get("/", Device)

export default router;