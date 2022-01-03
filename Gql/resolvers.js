import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler, newError } from "../MiddleWare/errorHandler.js";
import userConstants from "../constants/UserConstants.js";
import quoteConstants from "../constants/QuoteConstants.js";

const JWT_SECRET = process.env.JWT_SECRET;
const User = mongoose.model("User");
const Quote = mongoose.model("Quote");

const resolvers = {
  Query: {
    users: async () => await User.find({}),
    user: async (parent, { _id }) => await User.findOne({ _id }), // users.find((user) => user._id == _id),
    quotes: async () => await Quote.find({}).populate("by", "_id firstName"),
    iquote: async (parent, { by }) => await Quote.find({ by }), //quotes.filter((quote) => quote.by == by),
    myprofile: async (parent, args, { userId }) => {
      errorHandler(userId, userConstants.unAuthorized);
      return await User.findOne({ _id: userId });
    },
  },
  User: {
    quotes: async (ur) => await Quote.find({ by: ur._id }), //quotes.filter((quote) => quote.by == ur._id),
  },
  Mutation: {
    //Create a new user
    signupUser: async (parent, { UserNew }) => {
      const user = await User.findOne({ email: UserNew.email });
      if (user) {
        newError(userConstants.userAlreadyExists);
      }
      const hashedPassword = await bcrypt.hash(UserNew.password, 12);

      const newUser = new User({
        ...UserNew,
        password: hashedPassword,
      });

      return await newUser.save();
    },
    // Login a user and return a JWT token
    signinUser: async (parent, { userSignin }) => {
      const user = await User.findOne({ email: userSignin.email });
      if (!user) {
        newError(userConstants.invalidEmailPassword);
      }
      const domatch = await bcrypt.compare(userSignin.password, user.password);
      if (!domatch) {
        newError(userConstants.invalidEmailPassword);
      }
      const token = jwt.sign({ userId: user._id }, JWT_SECRET);
      return { token };
    },
    //update user info
    updateUser: async (parent, { UpdateUser }, { userId }) => {
      errorHandler(userId, userConstants.unAuthorized);
      const user = await User.findOne({ _id: userId });
      if (!user) {
        newError(userConstants.userNotExist);
      }
      user.firstName = UpdateUser.firstName || user.firstName;
      user.lastName = UpdateUser.lastName || user.lastName;
      await user.save();
      return userConstants.userUpdatedSuccess;
    },
    //Create a Quote with verifying a JWT token
    createQuote: async (parent, { name }, { userId }) => {
      errorHandler(userId, userConstants.unAuthorized);
      const newQuote = new Quote({ name, by: userId });
      await newQuote.save();
      return quoteConstants.quotecreatedSucces;
    },
    //Update a quote with verifying Jwt token and belong to same user
    updateQuote: async (parent, { _id, name }, { userId }) => {
      errorHandler(userId, userConstants.unAuthorized);
      const getQuote = await Quote.findOne({ _id });
      if (!getQuote) {
        newError(quoteConstants.quoteNotFound);
      }
      if (getQuote.by == userId) {
        getQuote.name = name || getQuote.name;
        await getQuote.save();
      } else {
        newError(quoteConstants.quoteNotbelongToUser);
      }
      return quoteConstants.quoteUpdateSuccess;
    },
    //Delete a Quote that belong to same user
    deleteQuote: async (parent, { _id }, { userId }) => {
      errorHandler(userId, userConstants.unAuthorized);
      const getQuote = await Quote.findOne({ _id: _id });
      if (!getQuote) {
        newError(quoteConstants.quoteNotFound);
      }
      if (getQuote.by == userId) {
        await Quote.deleteOne({ _id: _id });
      } else {
        newError(quoteConstants.quoteNotbelongToUser);
      }
      return quoteConstants.quoteDeleteSuccess;
    },
  },
};

export default resolvers;
