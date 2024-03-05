import {
  Model,
  Column,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { MedicineModel } from './medicine';
import { ContraindicationModel } from './contraindication';

@Table({
  tableName: 'medicine_contraindications',
  createdAt: false,
  updatedAt: false,
})
export class MedicineContraindication extends Model {
  @ForeignKey(() => MedicineModel)
  @Column
  medicineId: number;

  @ForeignKey(() => ContraindicationModel)
  @Column
  contraindicationId: number;

  @BelongsTo(() => MedicineModel)
  medicine: MedicineModel;

  @BelongsTo(() => ContraindicationModel)
  contraindication: ContraindicationModel;
}
