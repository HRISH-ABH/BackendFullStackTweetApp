"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes/routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.set("PORT", 3000);
app.set("BASE_URL", "localhost");
// define the routes
app.use("/api/ver1", routes_1.default);
// mongo connection
const mongoURI = process.env.MONGO_DB_URI;
if (!mongoURI) {
    console.log("URI not defined");
    process.exit(1);
}
mongoose_1.default
    .connect(mongoURI, {})
    .then(() => {
    console.log("Mongodb is connected");
})
    .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
});
// start the server
const port = app.get("PORT");
const baseUrl = app.get("BASE_URL");
server.listen(port, () => {
    console.log(`Server is listening at ${baseUrl}:${port}`);
});
