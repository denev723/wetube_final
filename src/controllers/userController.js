import User from "../models/User";
import bcrypt from "bcrypt";

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
  return res.redirect("/");
};

export const signOut = (req, res) => res.send("Sign Out");
export const profile = (req, res) => res.send("Profile");
export const editProfile = (req, res) => res.send("Edit Profile");
export const removeUser = (req, res) => res.send("Remove User");
