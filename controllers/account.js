import HttpStatusCode from "../exception/HttpStatusCode.js";
import { accountRepositories } from "../repositories/index.js";
import { body, param, validationResult } from "express-validator";
import Exception from "../exception/exception.js";
async function login(req, res) {
  try {
    debugger;
    const error = validationResult(req); // check xem req co loi hay khong
    if (!error.isEmpty()) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ errors: error.array() });
    }
    debugger;
    let existingAccount = await accountRepositories.login(req.body);
    res.status(HttpStatusCode.OK).json({
      message: "Login sucessfully",
      data: existingAccount,
    });
    debugger;
  } catch (Exception) {
    debugger;
    res.status(HttpStatusCode.INTERNAL_SEVER_EROR).json({
      message: "Login fail " + Exception.toString(),
    });
  }
}
async function register(req, res) {
  try {
    const account = await accountRepositories.register(req.body);
    res.status(HttpStatusCode.INSERT_OK).json({
      message: "Register account sucessfully",
      data: account,
    });
  } catch (Exception) {
    res.status(HttpStatusCode.INTERNAL_SEVER_EROR).json({
      message: "Cannot register account",
      validatorErrors: Exception.validatorErrors,
    });
  }
}
export default { login, register };
