import express from "express";
import bodyParser from "body-parser";
import connect from "./config/db.js";
const app = express();
const PORT = 5000;

import userRoutes from "./routers/users.js";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use("/users", userRoutes);

app.listen(PORT, async (err) => {
  if (err) console.log(err);
  else console.log(`server listening to port ${PORT}`);
  await connect();
});
