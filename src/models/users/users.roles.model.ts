import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { UserModel } from './user.model';
import { RoleModel } from './role.model';

@Table({
  tableName: 'users_roles',
})
class UsersRolesModel extends Model {
  @ForeignKey(() => UserModel)
  @Column(DataType.INTEGER)
  userId!: number;

  @ForeignKey(() => RoleModel)
  @Column(DataType.INTEGER)
  roleId!: number;
}

export { UserModel, RoleModel, UsersRolesModel };