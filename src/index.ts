import express from "express";
import cors from "cors";
import { userRouter } from "./user/user.router";
import { balikpapanRouter } from "./balikpapan/balikpapan.router";
import { createServer } from "http";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const server = createServer(app);

app.use("/user", userRouter);
app.use("/balikpapan", balikpapanRouter);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});