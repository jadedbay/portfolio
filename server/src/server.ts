import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

import github from "./routes/github";
app.use("/api/github", github);

app.listen(8737, () => {
    console.log("Server is running on port 8737");
});