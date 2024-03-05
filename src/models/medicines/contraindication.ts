import {
  Model,
  Column,
  Table,
  AutoIncrement,
  Unique,
  DataType,
} from 'sequelize-typescript';

@Table({
  tableName: 'contraindications',
  createdAt: false,
  updatedAt: false,
})
export class ContraindicationModel extends Model {
  @AutoIncrement
  @Unique
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  id: number;

  @Unique
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
}
