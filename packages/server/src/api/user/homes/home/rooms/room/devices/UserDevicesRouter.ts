import {Router} from 'express';
import {UserDevicesController} from './UserDevicesController';
import Paths from '@src/api/common/config/Paths';
import { UserDeviceRouter } from './device/UserDeviceRouter';

export const UserDevicesRouter = Router({ mergeParams: true });

UserDevicesRouter.use(Paths.User.Homes.Home.Rooms.Room.Devices.Device.Base, UserDeviceRouter)

UserDevicesRouter.get('/', UserDevicesController.getAll);