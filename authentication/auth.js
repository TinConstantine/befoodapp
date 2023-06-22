import HttpStatusCode from "../exception/HttpStatusCode.js";
import jwt from "jsonwebtoken";

export default function checkToken(req, res, next) {
  // check nểu router là login or register => next()
  if (
    req.url.toLowerCase().trim() == "/user/login".toLowerCase().trim() ||
    req.url.toLowerCase().trim() == "/user/register".toLowerCase().trim()
  ) {
    next();
    return;
  }
  debugger;
  const token = req.headers?.authorization?.split(" ")[1];
  debugger;
  try {
    debugger;
    // lấy đối tượng jwt được truyền vào
    let jwtObject = jwt.verify(token, process.env.JWT_SECRET);
    // check hạn sử dụng
    const isEpired = Date.now() >= jwtObject.exp * 1000;
    debugger;
    if (isEpired) {
      res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ message: "Token is expired" });
      res.end();
    } else {
      next();
    }
  } catch (exception) {
    res.status(HttpStatusCode.BAD_REQUEST).json({ message: exception.message });
  }
  console.log(token);
}
