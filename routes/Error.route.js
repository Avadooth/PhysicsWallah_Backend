import express from "express";
import ErrorController from "../controllers/Error.controller.js";

const router = express.Router();

router.get("/", ErrorController);

export default router;
