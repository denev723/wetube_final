import express from "express";

const PORT = 4000;

const app = express();

const handleListen = () =>
  console.log(`✅ localhost:${PORT} 서버에 연결되었습니다. ✈️`);

app.listen(PORT, handleListen);
