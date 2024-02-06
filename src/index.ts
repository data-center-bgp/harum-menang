import express from "express";
import cors from "cors";
import { balikpapanRouter } from "./balikpapan/balikpapan.router";
import { createServer } from "http";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const server = createServer(app);

app.use("/balikpapan", balikpapanRouter);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});