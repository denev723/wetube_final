import express from "express";
import {
  editProfile,
  finishGihubSignOut,
  profile,
  signOut,
  startGithubSignIn,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/sign-out", signOut);
userRouter.get("/edit", editProfile);
userRouter.get("/github/start", startGithubSignIn);
userRouter.get("/github/finish", finishGihubSignOut);
userRouter.get("/:id(\\d+)", profile);

export default userRouter;
