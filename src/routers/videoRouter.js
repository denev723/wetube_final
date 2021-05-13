import express from "express";
import {
  deleteVideo,
  getEditVideo,
  getUploadVideo,
  postEditVideo,
  postUploadVideo,
  watchVideo,
} from "../controllers/videoController";
import Video from "../models/Video";

const videoRouter = express.Router();

videoRouter.route("/:id([0-9a-f]{24})").get(watchVideo);
// videoRouter.get("/:id(\\d+)", watchVideo);
videoRouter
  .route("/:id([0-9a-f]{24})/edit")
  .get(getEditVideo)
  .post(postEditVideo);
// videoRouter.get("/:id(\\d+)/edit", getEditVideo);
// videoRouter.post("/:id(\\d+)/edit", postEditVideo);

videoRouter.route("/:id([0-9a-f]{24})/delete").get(deleteVideo);

videoRouter.route("/upload").get(getUploadVideo).post(postUploadVideo);

export default videoRouter;
