const fakeUser = {
  username: "Denev",
  loggedIn: true,
};

let videos = [
  {
    title: "video #1",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 2,
    id: 1,
  },
  {
    title: "video #2",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id: 2,
  },
  {
    title: "video #3",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id: 3,
  },
];

export const home = (req, res) => {
  res.render("home", { pageTitle: "Home", fakeUser, videos });
};
export const watchVideo = (req, res) => {
  const {
    params: { id },
  } = req;
  const video = videos[id - 1];
  return res.render("watchVideo", {
    pageTitle: `Watching: ${video.title}`,
    video,
  });
};

export const getEditVideo = (req, res) => {
  const {
    params: { id },
  } = req;
  const video = videos[id - 1];
  return res.render("editVideo", {
    pageTitle: `Editing: ${video.title}`,
    video,
  });
};
export const postEditVideo = (req, res) => {
  const {
    params: { id },
    body: { title },
  } = req;
  videos[id - 1].title = title;
  res.redirect(`/videos/${id}`);
};

export const deleteVideo = (req, res) => res.send("Delete Video");
export const uploadVideo = (req, res) => res.send("Upload Video");
export const search = (req, rs) => res.send("Search");
