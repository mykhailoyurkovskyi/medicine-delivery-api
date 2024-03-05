import { inject, injectable } from 'inversify';
import { IUsersRepository } from '../interfaces/users/users.repository.interface';
import { RoleModel, UserModel } from '../models/users/user.model';
import { User } from '../entities/user.entity';
import { TYPES } from '../types/types';
import { SequelizeService } from '../services/sequelize.service';
import { Role } from '../models/users/role.model';
import { UsersRolesModel } from '../models/users/users.roles.model';

@injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @inject(TYPES.SequelizeService) private sequelizeService: SequelizeService,
  ) {}

  async create({
    email,
    password,
    firstName,
    lastName,
  }: User): Promise<UserModel> {
    console.log(email, password, firstName, lastName);

    const user = await UserModel.create({
      email,
      password,
      firstName: firstName,
      lastName: lastName,
    });

    const userRole = await RoleModel.findOrCreate({
      where: { name: Role.USER },
    });

    await UsersRolesModel.create({
      userId: user.id,
      roleId: userRole[0].id,
    });

    return user;
  }

  async find(email: string): Promise<UserModel | null> {
    return UserModel.findOne({
      where: {
        email,
      },
    });
  }

  async getRoleId(userId: number): Promise<number | null> {
    try {
      const userRole = await UsersRolesModel.findOne({
        where: {
          userId: userId,
        },
      });

      return userRole ? userRole.roleId : null;
    } catch (error) {
      console.error('Error on getting role ID by user ID:', error);
      throw error;
    }
  }

  async getRole(roleId: number): Promise<string | null> {
    try {
      const role = await RoleModel.findOne({
        where: {
          id: roleId,
        },
      });

      return role ? role.name : null;
    } catch (error) {
      console.error('Error on getting role name by role ID:', error);
      throw error;
    }
  }
}