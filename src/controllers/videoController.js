import Video from "../models/Video";

export const home = async (req, res) => {
  const videos = await Video.find({});
  return res.render("home", { pageTitle: "Home", videos });
};

export const watchVideo = (req, res) => {};

export const getEditVideo = (req, res) => {
  const {
    params: { id },
  } = req;
  return res.render("editVideo", {
    pageTitle: `Editing`,
  });
};
export const postEditVideo = (req, res) => {
  const {
    params: { id },
    body: { title },
  } = req;
  res.redirect(`/videos/${id}`);
};

export const getUploadVideo = (req, res) =>
  res.render("uploadVideo", { pageTitle: "Upload Video" });
export const postUploadVideo = async (req, res) => {
  const {
    body: { title, description, hashtags },
  } = req;
  const video = new Video({
    title,
    description,
    createdAt: Date.now(),
    hashtags: hashtags.split(",").map((word) => `#${word}`),
    meta: {
      views: 0,
      rating: 0,
    },
  });
  await video.save();
  return res.redirect("/");
};

export const deleteVideo = (req, res) => res.send("Delete Video");
export const search = (req, rs) => res.send("Search");
