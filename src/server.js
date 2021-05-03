import express from "express";
import morgan from "morgan";

const PORT = 4000;

const app = express();
const logger = morgan("dev");

const home = (req, res) => res.send("Hello");

app.use(logger);
app.get("/", home);

const handleListen = () =>
  console.log(`✅ localhost:${PORT} 서버에 연결되었습니다. ✈️`);

app.listen(PORT, handleListen);
