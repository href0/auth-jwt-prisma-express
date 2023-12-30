import { ResponseError } from "../error/response.error.js";

export const notFound = async(req, res, next) => {
  const error = new ResponseError(404, 'Not Found');
  next(error);
}