import { Router } from "express";
import Paths from "../common/config/Paths";
import AuthController from "./AuthController";
import { ExpressValidator } from "express-validator";
import { User } from "../user/User";
import { RouteError } from "@src/other/classes";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import { Errors } from "../base-router";

// **** Routes **** //

// Validators
const { body } = new ExpressValidator({
  isEmailNotInUse: async (email: string) => {
    const user = await User.findByEmail(email);
    if (user) {
      return false;
    }
    return true;
  },
});

export const authRouter = Router();

// Register user
authRouter.post(
  Paths.Auth.Register,
  /* body("email").isEmailNotInUse().isEmail(),
  body('password').isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    returnScore: false,
    pointsPerUnique: 1,
    pointsPerRepeat: 0.5,
    pointsForContainingLower: 10,
    pointsForContainingUpper: 10,
    pointsForContainingNumber: 10,
    pointsForContainingSymbol: 10,
  }), */
  AuthController.register
);

// Login user
authRouter.post(
  Paths.Auth.Login,
  //validate('email', 'password'),
  body("email").isEmail(),
  body("password").isString(),
  AuthController.login,
);

// Get current user
authRouter.get(
  Paths.Auth.Me,
  AuthController.me,
);

// Logout user
authRouter.get(
  Paths.Auth.Logout,
  AuthController.logout,
);