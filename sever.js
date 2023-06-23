import express, { request } from "express";
import * as dotenv from "dotenv";
import { accountRouter, productRouter } from "./routes/index.js";
import connect from "./database/database.js";
import checkToken from "./authentication/auth.js";
import cors from "cors";
dotenv.config(); // must have
const app = express();
app.use(cors());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.set("views", "./views");
// app.use(checkToken);
app.use(express.json());
app.use("/user", accountRouter);
app.use("/product", productRouter);
const port = process.env.PORT ?? 3000;
app.listen(port, async () => {
  await connect();
  console.log("listening on port " + port);
});
