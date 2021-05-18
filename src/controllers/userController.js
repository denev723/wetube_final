import User from "../models/User";
import bcrypt from "bcrypt";
import fetch from "node-fetch";

export const getSignUp = (req, res) =>
  res.render("signUp", { pageTitle: "Sign Up" });
export const postSignUp = async (req, res) => {
  const pageTitle = "Sign up";
  const {
    body: { name, username, email, password, confirmedPassword, location },
  } = req;
  if (password !== confirmedPassword) {
    return res.status(400).render("signUp", {
      pageTitle,
      errorMessage: "Password confirmation does not match.",
    });
  }
  const userExist = await User.exists({ $or: [{ username }, { email }] });
  if (userExist) {
    return res.status(400).render("signUp", {
      pageTitle,
      errorMessage: "This username/email is already taken.",
    });
  }
  try {
    await User.create({
      name,
      username,
      email,
      password,
      location,
    });
    return res.redirect("/sign-in");
  } catch (error) {
    return res
      .status(400)
      .render("signUp", { pageTitle: "Sign up", errorMessage: error._message });
  }
};

export const getSignIn = (req, res) =>
  res.render("signIn", { pageTitle: "Sign in" });
export const postSignIn = async (req, res) => {
  const pageTitle = "Sign in";
  const {
    body: { username, password },
  } = req;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render("signIn", {
      pageTitle,
      errorMessage: "An account with this username dose not exist",
    });
  }
  const confirm = await bcrypt.compare(password, user.password);
  if (!confirm) {
    return res.status(400).render("signIn", {
      pageTitle,
      errorMessage: "Wrong Password",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};

export const startGithubSignIn = (req, res) => {
  const baseUrl = `https://github.com/login/oauth/authorize`;
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};

export const finishGihubSignOut = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiUrl = "https://api.github.com";
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true
    );
    if (!emailObj) {
      return res.redirect("/sign-in");
    }
    let user = await User.findOne({ email: emailObj.email });
    if (!user) {
      user = await User.create({
        avatarUrl: userData.avatar_url,
        name: userData.name,
        username: userData.login,
        email: emailObj.email,
        password: "",
        socialOnly: true,
        location: userData.location,
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    res.redirect("/");
  } else {
    return res.redirect("/sign-in");
  }
};

export const signOut = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};

export const getEditProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });
export const postEditProfile = async (req, res) => {
  const {
    body: { name, email, username, location },
    session: {
      user: { _id },
    },
  } = req;
  const findUsername = await User.findOne({ username });
  const findEmail = await User.findOne({ email });
  if (findUsername._id != _id || findEmail._id != _id) {
    return res.render("editProfile", {
      pageTitle: "Edit  Profile",
      errorMessage: "User is exist",
    });
  }
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      name,
      email,
      username,
      location,
    },
    { new: true }
  );
  req.session.user = updatedUser;
  return res.redirect("/users/edit");
};

export const profile = (req, res) => res.send("Profile");
