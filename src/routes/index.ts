import { Router } from "express";

import UsersController from "../controllers/UsersController";
import SurveysController from "../controllers/SurveysController";

const router = Router();

const usersController = new UsersController();
const surveysController = new SurveysController();

router.post("/users", usersController.create);

router.get("/surveys", surveysController.show);
router.post("/surveys", surveysController.create);

export default router;
