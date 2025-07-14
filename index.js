import app from "./app.js";
import { createServer } from "http";
import dotenv from "dotenv"

dotenv.config();

const server = createServer(app);
const PORT = 9300;

server.listen(PORT,() => {
    console.log(`Server running on port: ${PORT}`);
})