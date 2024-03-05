import { Table, Column, Model, ForeignKey, DataType } from 'sequelize-typescript';
import { MedicineModel } from './medicine';

@Table({
  tableName: 'photos',
  createdAt: false,
  updatedAt: false,
})
export class MedicineImageModel extends Model {
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  imageUrl: string;

  @ForeignKey(() => MedicineModel)
  @Column
  medicineId: number;
}
