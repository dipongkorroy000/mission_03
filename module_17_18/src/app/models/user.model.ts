import { Model, model, Schema } from "mongoose";
import { IAddress, IUser, UserInstanceMethods, UserStaticMethods } from "../interfaces/user.interface";
import validator from "validator";
import bcrypt from "bcryptjs";
import { Note } from "./notes.model";

const addressSchema = new Schema<IAddress>(
  {
    city: { type: String },
    street: { type: String },
    zip: { type: Number },
  },
  {
    _id: false,
  }
);

const userSchema = new Schema<IUser, UserStaticMethods, UserInstanceMethods>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, "First Name must be at least 3 characters"],
      maxLength: 20,
    },
    lastName: { type: String, required: true, trim: true, minLength: [3, "Name must be 3 characters"], maxLength: 20 },
    age: {
      type: Number,
      required: true,
      min: [18, "Age must be at least 18, got {VALUE}"],
      max: 60,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: [true, "This Email Already used"],
      // validate: {
      //   validator: function (value) {
      //     return /^[^\s@]+@[^\s@]+\.[^s@]+$/.test(value);
      //   },
      //   message: function (props) {
      //     return `Email ${props.value} is not valid email`
      //   }
      // },
      validate: [validator.isEmail, "Invalid Email {VALUE}"],
    },
    password: { type: String, required: true },

    role: { type: String, enum: ["USER", "ADMIN", "SUPERADMIN"], default: "USER", uppercase: true },

    address: { type: addressSchema },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.method("hashPassword", async function (plainPassword: string) {
  const password = await bcrypt.hash(plainPassword, 10);
  return password;
});

userSchema.static("hashPassword", async function (plainPassword: string) {
  const password = await bcrypt.hash(plainPassword, 10);
  return password;
});

// pre hooks

// documents middleware

// this middleware work when create a user
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// query middleware
userSchema.pre("find", async function (next) {
  console.log("inside pre find hook");
  next();
});

// document middleware
userSchema.post("save", async function (doc, next) {
  console.log("email has been saved", doc.email);
  next();
});

// query middleware
userSchema.post("findOneAndDelete", async function (doc, next) {
  if (doc) {
    // console.log(doc, "doc");
    await Note.deleteMany({ user: doc._id });
  }

  next();
});

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

export const User = model<IUser, UserStaticMethods>("User", userSchema);
