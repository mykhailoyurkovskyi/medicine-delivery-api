import {
  Model,
  Column,
  Table,
  AutoIncrement,
  Unique,
  ForeignKey,
  BelongsTo,
  HasMany,
  PrimaryKey,
} from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { ShoppingCartsModel } from './shoppingCart';
import { MedicineModel } from '../medicines/medicine';

@Table({
  tableName: 'cart_items',
  createdAt: false,
  updatedAt: false,
})
export class CartItemModel extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => ShoppingCartsModel)
  @Column(DataType.INTEGER)
  shopping_cart_id: number;

  @ForeignKey(() => MedicineModel)
  @Column(DataType.INTEGER)
  medicine_id: number;

  @BelongsTo(() => ShoppingCartsModel)
  shopping_cart: ShoppingCartsModel;

  @BelongsTo(() => MedicineModel)
  medicine: MedicineModel;

  @Column(DataType.INTEGER)
  quantity: number;

  @Column(DataType.DOUBLE)
  price: number;
}