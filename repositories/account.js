import Exception from "../exception/exception.js";
import { account } from "../model/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
async function register({
  fullName,
  userName,
  password,
  email,
  gender,
  phoneNumber,
  address,
}) {
  const existingAccount = await account.findOne({ userName: userName }).exec(); // tim email vua nhap trong db

  if (!!existingAccount) {
    //neu co roi thi quang ra loi tai khoan da ton tai
    //check not null
    throw new Exception("", Exception.USER_EXIST);
  } else {
    //ma hoa password send tu req
    try {
      const hashedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.SALT_ROUNDS)
      );
      // insert to db
      const newAcccount = await account.create({
        fullName,
        userName,
        password: hashedPassword,
        email,
        gender,
        email,
        phoneNumber,
        address,
      });
      return {
        ...newAcccount._doc,
        password: "Not show",
      };
    } catch (exception) {
      if (!!exception.errors) {
        throw new Exception("Input error ", exception.errors);
      }
    }
  }
}

async function login({ userName, password }) {
  let existingAccount = await account.findOne({ userName }).exec(); // lay du lieu nguoi dung theo username
  if (existingAccount) {
    let isMatched = await bcrypt.compare(password, existingAccount.password); // so sanh password truyen vao va password ma hoa
    if (isMatched) {
      let token = jwt.sign({ data: existingAccount }, process.env.JWT_SECRET, {
        expiresIn: "30 days",
      }); // cap quyen su dung cho doi tuong dang nhap + hsd 10 ngay
      return {
        ...existingAccount.toObject,
        password: "Not show",
        token: token,
      };
    } else {
      throw new Exception(Exception.WRONG_USERNAME_AND_PASSWORD);
    }
  } else {
    throw new Exception(Exception.WRONG_USERNAME_AND_PASSWORD);
  }
}

export default {
  login,
  register,
};
