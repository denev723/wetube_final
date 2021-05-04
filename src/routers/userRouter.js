import express from "express";
import {
  editProfile,
  profile,
  removeUser,
  signOut,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/edit", editProfile);
userRouter.get("/remove", removeUser);
userRouter.get("/sign-out", signOut);
userRouter.get("/:id(\\d+)", profile);

export default userRouter;
