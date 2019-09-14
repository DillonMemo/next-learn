const express = require("express");
const port = process.env.PORT || 5000;
const db = require("./models");

const devAPIRouter = require("./routes/dev");

const app = express();

// json 사용
app.use(express.json());
// form 으로 넘어온 데이터 req.body로 받아오기
app.use(express.urlencoded({ extended: true }));

app.use("/api/employee", devAPIRouter);

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
