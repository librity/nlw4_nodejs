import { Request, Response, NextFunction } from "express";

import AppError from "../errors/AppError";

const appErrorsHandler = (
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
  if (error instanceof AppError)
    return response.status(error.statusCode).json({
      message: error.message,
    });

  return response.status(500).json({
    status: "Error",
    message: `Internal server error ${error.message}`,
  });
};

export default appErrorsHandler;
