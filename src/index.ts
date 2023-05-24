import express from "express";

const app = express();
app.use(express.json());

import userRoutes from "./routes/userRoutes";
import tweetRoutes from "./routes/tweetRoutes";

app.use("/user", userRoutes);
app.use("/tweet", tweetRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "hello world",
  });
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
