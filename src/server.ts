import "reflect-metadata";
import express, { json } from "express";

import "./database";

import routes from "./routes";

const app = express();

app.use(json());
app.use(routes);

const PORT = 3333;

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
