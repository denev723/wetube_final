import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const db = mongoose.connection;

const handleOpen = () => console.log("✅ DB에 연결되었습니다. ✈️");
const handleError = (err) => console.log("DB 에러: ", err);

db.on("error", handleError);
db.once("open", handleOpen);
