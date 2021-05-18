import express from "express";
import {
  finishGihubSignOut,
  getEditProfile,
  postEditProfile,
  profile,
  signOut,
  startGithubSignIn,
} from "../controllers/userController";
import { protectMiddleware, publicOnlyMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/sign-out", protectMiddleware, signOut);
userRouter
  .route("/edit")
  .all(protectMiddleware)
  .get(getEditProfile)
  .post(postEditProfile);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubSignIn);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGihubSignOut);
userRouter.get("/:id(\\d+)", profile);

export default userRouter;
