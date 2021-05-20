import express from "express";
import {
  finishGihubSignOut,
  getChangePassword,
  getEditProfile,
  postChangePassword,
  postEditProfile,
  profile,
  signOut,
  startGithubSignIn,
} from "../controllers/userController";
import {
  protectMiddleware,
  publicOnlyMiddleware,
  uploadFiles,
} from "../middlewares";
import User from "../models/User";

const userRouter = express.Router();

userRouter.get("/sign-out", protectMiddleware, signOut);

userRouter
  .route("/edit")
  .all(protectMiddleware)
  .get(getEditProfile)
  .post(uploadFiles.single("avatar"), postEditProfile);

userRouter.get("/github/start", publicOnlyMiddleware, startGithubSignIn);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGihubSignOut);

userRouter
  .route("/change-password")
  .get(getChangePassword)
  .post(postChangePassword);

userRouter.get("/:id(\\d+)", profile);

export default userRouter;
