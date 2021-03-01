import "reflect-metadata";
import express, { json } from "express";
import "express-async-errors";

import setupDatabaseConnection from "./database";
import routes from "./routes";
import appErrorsHandler from "./middlewares/appErrorsHandler";

setupDatabaseConnection();

const app = express();

app.use(json());
app.use(routes);

app.use(appErrorsHandler);

export default app;
