import express, { Express } from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./routes/routes";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const app: Express = express();
const server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("PORT", 3000);
app.set("BASE_URL", "localhost");

// define the routes
app.use("/api/ver1", router);

// mongo connection
const mongoURI = process.env.MONGO_DB_URI;

if (!mongoURI) {
  console.log("URI not defined");
  process.exit(1);
}

mongoose
  .connect(mongoURI, {})
  .then(() => {
    console.log("Mongodb is connected");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });

// start the server
const port: number = app.get("PORT");
const baseUrl: string = app.get("BASE_URL");

server.listen(port, () => {
  console.log(`Server is listening at ${baseUrl}:${port}`);
});
