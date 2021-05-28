import express from "express";
import { registerView } from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.route("/videos/:id([0-9a-f]{24})/view").post(registerView);

export default apiRouter;
