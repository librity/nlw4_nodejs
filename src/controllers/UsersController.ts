import { Request, Response } from "express";
import { getRepository } from "typeorm";
import User from "../models/User";

export default class UsersController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body;
    const usersRepository = getRepository(User);

    const userAlreadyExists = await usersRepository.findOne({ email });
    if (userAlreadyExists)
      return response.status(400).json({
        error: "Email taken!",
      });

    const newUser = usersRepository.create({ name, email });
    await usersRepository.save(newUser);

    return response.json(newUser);
  }
}
