import { Request, Response, NextFunction} from "express";
import { HomeSchema } from "hive-link-common";
import * as yup from "yup";


export const yupValidate = (
    schema: yup.ObjectSchema<yup.AnyObject>
  ) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body);
      return next();
    } catch (err) {
      return res.status(400).json({ type: err.name, message: err.message });
    }
  };