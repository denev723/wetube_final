import "./models/Video";
import "./db";
import express from "express";
import morgan from "morgan";
import session from "express-session";
import mongoStore from "connect-mongo";
import flash from "express-flash";
import favicon from "serve-favicon";
import path from "path";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";
import apiRouter from "./routers/apiRouter";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(favicon(path.join(__dirname, "public/images", "favicon.ico")));
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
    store: mongoStore.create({ mongoUrl: process.env.DB_URL }),
  }),
);
app.use(flash());
app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);
app.use("/api", apiRouter);

export default app;
