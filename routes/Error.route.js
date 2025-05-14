import express from "express";
const router = express.Router();
import { ErrorController } from "../controllers/Error.controller.js";

router.get("/", ErrorController)

export default router;