import express from "express";
import {
  getSignIn,
  postSignIn,
  getSignUp,
  postSignUp,
} from "../controllers/userController";
import { home, search } from "../controllers/videoController";
import { publicOnlyMiddleware } from "../middlewares";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter
  .route("/sign-up")
  .all(publicOnlyMiddleware)
  .get(getSignUp)
  .post(postSignUp);
rootRouter
  .route("/sign-in")
  .all(publicOnlyMiddleware)
  .get(getSignIn)
  .post(postSignIn);
rootRouter.get("/search", search);

export default rootRouter;
