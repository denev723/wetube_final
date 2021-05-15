import Video from "../models/Video";

export const home = async (req, res) => {
  const videos = await Video.find({}).sort({ createdAt: "desc" });
  return res.render("home", { pageTitle: "Home", videos });
};

export const watchVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  const video = await Video.findById(id);
  if (!video) {
    return res.render("404", { pageTitle: "Viodeo not found" });
  }
  return res.render("watchVideo", { pageTitle: video.title, video });
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Viodeo not found" });
  }
  return res.render("editVideo", {
    pageTitle: `Edit: ${video.title}`,
    video,
  });
};
export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description, hashtags },
  } = req;
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Viodeo not found" });
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  await video.save();
  res.redirect(`/videos/${id}`);
};

export const getUploadVideo = (req, res) =>
  res.render("uploadVideo", { pageTitle: "Upload Video" });
export const postUploadVideo = async (req, res) => {
  const {
    body: { title, description, hashtags },
  } = req;
  try {
    await Video.create({
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(400).render("uploadVideo", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};

export const search = async (req, res) => {
  const {
    query: { keyword },
  } = req;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(`^${keyword}`, "i"),
      },
    });
  }
  console.log(videos);
  return res.render("search", { pageTitle: "Search", videos });
};
