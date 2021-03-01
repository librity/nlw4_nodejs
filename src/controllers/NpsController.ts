import { Request, Response } from "express";
import { getCustomRepository, Not, IsNull } from "typeorm";

import SurveyAnswersRepository from "../repositories/SurveyAnswersRepository";

export default class NpsController {
  async index(request: Request, response: Response) {
    const { survey_id } = request.params;

    const surveyAnswersRepository = getCustomRepository(
      SurveyAnswersRepository
    );
    const surveyAnswers = await surveyAnswersRepository.find({
      survey_id,
      value: Not(IsNull()),
    });

    const detractorCount = surveyAnswers.filter(
      (answer) => answer.value >= 0 && answer.value <= 6
    ).length;
    const neutralCount = surveyAnswers.filter(
      (answer) => answer.value >= 7 && answer.value <= 8
    ).length;
    const promoterCount = surveyAnswers.filter(
      (answer) => answer.value >= 9 && answer.value <= 10
    ).length;
    const totalAnswers = surveyAnswers.length;
    const netPromoterScore = Number(
      (((promoterCount - detractorCount) * 100) / totalAnswers).toFixed(2)
    );

    return response.json({
      detractors: detractorCount,
      neutrals: neutralCount,
      promoters: promoterCount,
      total: totalAnswers,
      score: netPromoterScore,
    });
  }
}
