const fakeUser = {
  username: "Denev",
  loggedIn: true,
};

export const home = (req, res) => {
  const videos = [
    {
      title: "video #1",
      rating: 5,
      comments: 2,
      createdAt: "2 minutes ago",
      views: 59,
      id: 1,
    },
    {
      title: "video #2",
      rating: 5,
      comments: 2,
      createdAt: "2 minutes ago",
      views: 59,
      id: 1,
    },
    {
      title: "video #3",
      rating: 5,
      comments: 2,
      createdAt: "2 minutes ago",
      views: 59,
      id: 1,
    },
  ];
  res.render("home", { pageTitle: "Home", fakeUser, videos });
};
export const watchVideo = (req, res) =>
  res.render("watchVideo", { pageTitle: `Watch Videos` });
export const editVideo = (req, res) =>
  res.render("editVideo", { pageTitle: "Edit Video" });
export const deleteVideo = (req, res) => res.send("Delete Video");
export const uploadVideo = (req, res) => res.send("Upload Video");
export const search = (req, rs) => res.send("Search");
