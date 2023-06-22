import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";
import isEmail from "validator/lib/isEmail.js";
export default mongoose.model(
  "Account",
  new Schema({
    id: { type: ObjectId },
    fullName: {
      type: String,
    },
    userName: {
      type: String,
      require: true,
      validate: {
        validator: (value) => value.length > 3,
        message: "Username must be at least 3 charators",
      },
    },
    password: {
      type: String,
      require: true,
    },
    gender: {
      type: String,
      enum: {
        values: ["Male", "Female"], // co 2 gia tri male va female
        message: "{VALUE} is not supported",
      },
      require: true,
    },
    email: {
      type: String,
      require: true,
      validate: {
        validator: (value) => isEmail,
        message: "Email is incorrect format",
      },
    },
    phoneNumber: {
      type: String,
      require: false,
      validate: {
        validator: (value) => value.length <= 10,
        message: "Invalid phone number",
      },
    },
    address: {
      type: String,
      require: false,
    },
  })
);
