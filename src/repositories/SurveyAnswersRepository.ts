import { Repository, EntityRepository } from "typeorm";
import SurveyAnswer from "../models/SurveyAnswer";

@EntityRepository(SurveyAnswer)
export default class SurveyAnswersRepository extends Repository<SurveyAnswer> {}
