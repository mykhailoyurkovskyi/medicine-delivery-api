import { User } from '../../entities/user.entity';
import { Role } from '../../models/users/role.model';
import { UserModel } from '../../models/users/user.model';

export interface IUsersRepository {
  create: (user: User) => Promise<UserModel>;
  find: (email: string) => Promise<UserModel | null>;
  getRoleId: (userId: number) => Promise<number | null>;
  getRole: (roleId: number) => Promise<string | null>;
}