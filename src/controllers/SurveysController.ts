import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";

import SurveysRepository from "../repositories/SurveysRepository";

export default class SurveysController {
  async create(request: Request, response: Response) {
    const { title, description } = request.body;
    const surveysRepository = getCustomRepository(SurveysRepository);

    const newSurvey = surveysRepository.create({ title, description });
    await surveysRepository.save(newSurvey);

    return response.status(201).json(newSurvey);
  }

  async show(request: Request, response: Response) {
    const surveysRepository = getCustomRepository(SurveysRepository);

    const allSurveys = await surveysRepository.find();

    return response.json(allSurveys);
  }
}
