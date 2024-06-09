import express from "express";
import cors from "cors";
import github from "./routes/github";
import crates from "./routes/crates";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());

app.use("/api/github", github);
app.use("/api/crates", crates);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});
