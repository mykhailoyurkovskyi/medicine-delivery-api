import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
  DataType,
  AllowNull,
  Unique,
  BelongsToMany,
} from 'sequelize-typescript';
import { RoleModel } from './role.model';
import { UsersRolesModel } from './users.roles.model';

@Table({
  tableName: 'users',
})
class UserModel extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  email!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  firstName!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  lastName!: string;

  @BelongsToMany(() => RoleModel, () => UsersRolesModel, 'userId', 'roleId')
  roles!: RoleModel[];
}

export { UserModel, RoleModel };