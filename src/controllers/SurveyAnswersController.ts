import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";

import AppError from "../errors/AppError";

import UsersRepository from "../repositories/UsersRepository";
import SurveysRepository from "../repositories/SurveysRepository";
import SurveyAnswersRepository from "../repositories/SurveyAnswersRepository";
import SurveyAnswersMailer from "../services/mailers/SurveyAnswersMailer";

export default class SurveyAnswersController {
  async create(request: Request, response: Response) {
    const { user_email, survey_id } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);
    const surveysRepository = getCustomRepository(SurveysRepository);
    const surveyAnswersRepository = getCustomRepository(
      SurveyAnswersRepository
    );

    const userExists = await usersRepository.findOne({ email: user_email });
    if (!userExists) throw new AppError("User not found!");
    const user = userExists;

    const surveyExists = await surveysRepository.findOne({ id: survey_id });
    if (!surveyExists) throw new AppError("Survey not found!");
    const survey = surveyExists;

    const emailData = {
      userName: user.name,
      userEmail: user.email,

      surveyTitle: survey.title,
      surveyDescription: survey.description,
      suveyAnswerId: "",
    };

    const surveyAnswerExists = await surveyAnswersRepository.findOne({
      where: { user_id: user.id, survey_id: survey.id, value: null },
      relations: ["user", "survey"],
    });
    if (surveyAnswerExists) {
      emailData.suveyAnswerId = surveyAnswerExists.id;
      SurveyAnswersMailer.call(emailData);

      return response.json(surveyAnswerExists);
    }

    const emptySurvey = surveyAnswersRepository.create({
      user_id: user.id,
      survey_id,
    });
    await surveyAnswersRepository.save(emptySurvey);

    emailData.suveyAnswerId = emptySurvey.id;
    SurveyAnswersMailer.call(emailData);

    return response.status(201).json(emptySurvey);
  }

  async answer(request: Request, response: Response) {
    const { id, value } = request.params;

    const surveyAnswersRepository = getCustomRepository(
      SurveyAnswersRepository
    );

    const surveyAnswer = await surveyAnswersRepository.findOne({ id });

    if (!surveyAnswer) throw new AppError("Survey Answer not found!");
    if (surveyAnswer.value) throw new AppError("Survey already answered!");

    surveyAnswer.value = Number(value);
    await surveyAnswersRepository.save(surveyAnswer);

    return response.status(201).send(surveyAnswer);
  }
}
