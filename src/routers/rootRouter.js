import express from "express";
import {
  getSignIn,
  postSignIn,
  getSignUp,
  postSignUp,
} from "../controllers/userController";
import { home, search } from "../controllers/videoController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/sign-up").get(getSignUp).post(postSignUp);
rootRouter.route("/sign-in").get(getSignIn).post(postSignIn);
rootRouter.get("/search", search);

export default rootRouter;
