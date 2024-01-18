import { createUser } from './create-user';
import { getAuthors } from './get-authors';
import { getUser } from './get-user';
import { login } from './login';
import { logout } from './logout';

export const users = {
  createUser,
  getUser,
  login,
  logout,
  getAuthors,
};
