import express from "express";
import {
  deleteVideo,
  getEditVideo,
  getUploadVideo,
  postEditVideo,
  postUploadVideo,
  watchVideo,
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.route("/:id(\\d+)").get(watchVideo);
// videoRouter.get("/:id(\\d+)", watchVideo);
videoRouter.route("/:id(\\d+)/edit").get(getEditVideo).post(postEditVideo);
// videoRouter.get("/:id(\\d+)/edit", getEditVideo);
// videoRouter.post("/:id(\\d+)/edit", postEditVideo);

videoRouter.route("/upload").get(getUploadVideo).post(postUploadVideo);

videoRouter.get("/:id(\\d+)/delete", deleteVideo);

export default videoRouter;
