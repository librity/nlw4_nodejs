import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import * as yup from "yup";

import AppError from "../errors/AppError";
import UsersRepository from "../repositories/UsersRepository";

export default class UsersController {
  async create(request: Request, response: Response) {
    const validationSchema = yup.object().shape({
      name: yup.string().required("Name is requiered"),
      email: yup.string().email("Bad email").required("Email is requiered"),
    });

    try {
      await validationSchema.validate(request.body, { abortEarly: false });
    } catch (error) {
      return response.status(400).json({ error });
    }

    const { name, email } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);

    const emailTaken = await usersRepository.findOne({ email });
    if (emailTaken) throw new AppError("Email taken!");

    const newUser = usersRepository.create({ name, email });
    await usersRepository.save(newUser);

    return response.status(201).json(newUser);
  }
}
