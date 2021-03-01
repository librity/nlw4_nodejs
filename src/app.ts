import "reflect-metadata";
import express, { json } from "express";

import setupDatabaseConnection from "./database";
import routes from "./routes";

setupDatabaseConnection();

const app = express();

app.use(json());
app.use(routes);

export default app;
