import { Sequelize } from 'sequelize-typescript';
import { ExpressReturnType } from '../common/route.interface';
import { MedicineResult } from '../medicines/medicine.result.interface';

export interface ISequelize {
  sequelize: Sequelize;
  getMedicinesByProps(
    filter?: any,
    limit?: number,
    offset?: number,
    sort?: string,
    sortBy?: string,
  ): Promise<MedicineResult[]>;
}