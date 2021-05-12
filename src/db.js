import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/wetube", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleOpen = () => console.log("✅ DB에 연결되었습니다. ✈️");
const handleError = (err) => console.log("DB 에러: ", err);

db.on("error", handleError);
db.once("open", handleOpen);
