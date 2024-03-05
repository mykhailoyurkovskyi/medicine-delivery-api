import { injectable } from 'inversify/lib/annotation/injectable';
import { UserLoginDto } from '../dto/user-login.dto';
import { UserRegisterDto } from '../dto/user-register.dto';
import { User } from '../entities/user.entity';
import { IUserService } from '../interfaces/users/user.service.interface';
import { TYPES } from '../types/types';
import { IConfigService } from '../interfaces/common/config.service.interface';
import { inject } from 'inversify';
import { IUsersRepository } from '../interfaces/users/users.repository.interface';
import { UserModel, UsersRolesModel } from '../models/users/users.roles.model';
import 'reflect-metadata';

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.UsersRepository) private usersRepository: IUsersRepository,
  ) {}

  async createUser({
    email,
    firstName,
    lastName,
    password,
  }: UserRegisterDto): Promise<UserModel | null> {
    console.log(email, firstName, lastName);
    const newUser = new User(email, firstName, lastName);
    const salt = this.configService.get('SALT') || process.env.SALT;
    await newUser.setPassword(password, Number(salt));
    const existedUser = await this.usersRepository.find(email);

    if (existedUser) {
      return null;
    }
    return this.usersRepository.create(newUser);
  }

  async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
    const existedUser = await this.usersRepository.find(email);
    if (!existedUser) {
      return false;
    }
    const newUser = new User(
      existedUser.email,
      'first name',
      'last name',
      existedUser.password,
    );

    return newUser.comparePassword(password);
  }

  async getUserInfo(email: string): Promise<UserModel | null> {
    return this.usersRepository.find(email);
  }

  async isUserAdmin(email: string): Promise<boolean> {
    try {
      const user = await UserModel.findOne({
        where: {
          email: email,
        },
        attributes: ['id'],
      });

      if (!user) {
        return false;
      }

      const userRoles = await UsersRolesModel.findOne({
        where: {
          userId: user.id,
          roleId: 1,
        },
      });

      return !!userRoles;
    } catch (error) {
      console.error('Error checking if user is admin:', error);
      return false;
    }
  }
}