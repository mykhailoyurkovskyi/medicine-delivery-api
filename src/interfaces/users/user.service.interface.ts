import { UserLoginDto } from '../../dto/user-login.dto';
import { UserRegisterDto } from '../../dto/user-register.dto';
import { UserModel } from '../../models/users/users.roles.model';

export interface IUserService {
  createUser: (dto: UserRegisterDto) => Promise<UserModel | null>;
  validateUser: (dto: UserLoginDto) => Promise<boolean>;
  getUserInfo: (email: string) => Promise<UserModel | null>;
  isUserAdmin: (email: string) => Promise<boolean>;
}