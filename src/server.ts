import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const port = process.env.APP_PORT;
const baseUrl = process.env.APP_URL;

app.listen(port, () => console.log(`Server running on ${baseUrl}`));
