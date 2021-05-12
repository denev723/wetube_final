import "./db";
import "./models/Video";
import app from "./server";

const PORT = 4000;

const handleListen = () =>
  console.log(`✅ localhost:${PORT} 서버에 연결되었습니다. ✈️`);

app.listen(PORT, handleListen);
