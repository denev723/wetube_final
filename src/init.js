import "regenerator-runtime";
import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import "./models/Comment";
import app from "./server";

const PORT = process.env.PORT;

const handleListen = () =>
  console.log(`✅ localhost:${PORT} 서버에 연결되었습니다. ✈️`);

app.listen(PORT, handleListen);
