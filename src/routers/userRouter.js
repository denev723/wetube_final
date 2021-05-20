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
  avatarUpload,
  protectMiddleware,
  publicOnlyMiddleware,
} from "../middlewares";

const userRouter = express.Router();

userRouter.get("/sign-out", protectMiddleware, signOut);

userRouter
  .route("/edit")
  .all(protectMiddleware)
  .get(getEditProfile)
  .post(avatarUpload.single("avatar"), postEditProfile);

userRouter.get("/github/start", publicOnlyMiddleware, startGithubSignIn);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGihubSignOut);

userRouter
  .route("/change-password")
  .get(getChangePassword)
  .post(postChangePassword);

userRouter.get("/:id", profile);

export default userRouter;
