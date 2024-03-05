import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
  DataType,
  AllowNull,
  Unique,
} from 'sequelize-typescript';

enum Role {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator',
}

@Table({
  tableName: 'roles',
})
class RoleModel extends Model {
  @AutoIncrement
  @Unique
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Unique
  @Column(DataType.ENUM(...Object.values(Role)))
  name!: Role;
}

export { Role, RoleModel };