import { UserModel, UsersRolesModel } from './users/users.roles.model';
import { RoleModel } from './users/user.model';

export const models = [
  RoleModel,
  UserModel,
  UsersRolesModel,
];

module.exports = models;

export { UsersRolesModel, RoleModel };