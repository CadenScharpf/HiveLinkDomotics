import { IUser } from 'hive-link-common';
import { RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { AppDataSource } from '@src/data-source';
import { User } from '../entities/User';
import { DeleteResult } from 'typeorm';

const userRepo = AppDataSource.getRepository(User);

// **** Variables **** //

export const USER_NOT_FOUND_ERR = 'User not found';


// **** Functions **** //

/**
 * Get all users.
 */
function getAll(): Promise<IUser[]> {
  return userRepo.find();
}

/**
 * Add one user.
 */
function addOne(user: IUser): Promise<IUser> {
  return userRepo.save(userRepo.create({...user}));
}

/**
 * Update one user.
 */
async function updateOne(user: IUser): Promise<IUser> {
  const persists = userRepo.findOneBy({id: user.id});
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }
  // Return user
  return userRepo.save(userRepo.create({...user}));
}

/**
 * Delete a user by their id.
 */
async function _delete(id: number): Promise<DeleteResult> {
  const persists = userRepo.findOneBy({id: id});
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }
  // Delete user
  return userRepo.delete(id);
}


// **** Export default **** //

export default {
  getAll,
  addOne,
  updateOne,
  delete: _delete,
} as const;
