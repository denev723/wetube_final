import express from "express";
import { signIn, signUp } from "../controllers/userController";
import { home, search } from "../controllers/videoController";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.get("/sign-up", signUp);
globalRouter.get("/sign-in", signIn);
globalRouter.get("/search", search);

export default globalRouter;
