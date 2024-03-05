import {
  Model,
  Column,
  Table,
  AutoIncrement,
  Unique,
  DataType,
  BelongsToMany,
  HasMany,
  ForeignKey,
} from 'sequelize-typescript';
import { MedicineContraindication } from './medicine.contraindication';
import { ContraindicationModel } from './contraindication';
import { MedicineImageModel } from './medicine.image';
import { CategoryModel } from './category';

@Table({
  tableName: 'medicine',
  createdAt: false,
  updatedAt: false,
})
export class MedicineModel extends Model {
  @AutoIncrement
  @Unique
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => CategoryModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  categoryId: number;

  @Unique
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  medicinalForm: string

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  expirationDate: Date;

  @Column({
    type: DataType.STRING(150),
    allowNull: true,
  })
  dosageInstructions: string;

  @BelongsToMany(() => ContraindicationModel, () => MedicineContraindication)
  contraindications: ContraindicationModel[];

  @HasMany(() => MedicineImageModel)
  photos: MedicineImageModel[];
}
