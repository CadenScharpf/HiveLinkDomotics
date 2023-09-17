import {Router} from 'express';
import {UserPaymentsController} from './UserPaymentsController';
import Paths from '@src/api/common/config/Paths';
import { UserPaymentRouter } from './payment/UserPaymentRouter';

export const UserPaymentsRouter = Router({ mergeParams: true });

UserPaymentsRouter.use(Paths.User.Payments.Payment.Base, UserPaymentRouter)