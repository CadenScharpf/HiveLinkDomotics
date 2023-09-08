import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { INewUser, IUser } from 'hive-link-common';
import { IReq, IRes } from '../util/types/express/misc';
import { User } from './User';

// **** Functions **** //

/**
 * Get all users.
 */
async function getAll(_: IReq, res: IRes) {
  const users = await User.getAll();
  return res.status(HttpStatusCodes.OK).json({ users });
}

/**
 * Add one user.
 */
async function add(req: IReq<{user: INewUser}>, res: IRes) {
  const { user } = req.body;
  await User.add(user);
  return res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Update one user.
 */
async function update(req: IReq<{user: IUser}>, res: IRes) {
  const { user } = req.body;
  await User.update(user);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Delete one user.
 */
async function delete_(req: IReq, res: IRes) {
  const id = +req.params.id;
  await User.delete(id);
  return res.status(HttpStatusCodes.OK).end();
}


// **** Export default **** //
export default {
  getAll,
  add,
  update,
  delete: delete_,
} as const;
