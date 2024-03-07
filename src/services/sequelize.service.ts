/* eslint-disable */
import { inject, injectable } from 'inversify';
import { Sequelize } from 'sequelize-typescript';
import { ISequelize } from '../interfaces/db/sequelize.interface';
import { IConfigService } from '../interfaces/common/config.service.interface';
import { TYPES } from '../types/types';
import { ILogger } from '../interfaces/common/logger.interface';
import { UserModel } from '../models/users/user.model';
import { RoleModel, UsersRolesModel } from '../models/users/users.roles.model';
import 'reflect-metadata';
import { CategoryModel } from '../models/medicines/category';
import { MedicineModel } from '../models/medicines/medicine';
import { QueryTypes } from 'sequelize';
import { MedicineResult } from '../interfaces/medicines/medicine.result.interface';
import { MedicineContraindication } from '../models/medicines/medicine.contraindication';
import { MedicineImageModel } from '../models/medicines/medicine.image';
import { ContraindicationModel } from '../models/medicines/contraindication';
import { ShoppingCartsModel } from '../models/shoppingCart/shoppingCart';
import { CartItemModel } from '../models/shoppingCart/cartItem';

@injectable()
export class SequelizeService implements ISequelize {
  sequelize: Sequelize;

  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.ILogger) private logger: ILogger,
  ) {
    this.sequelize = new Sequelize({
      dialect: 'postgres',
      host: this.configService.get('DB_HOST') || process.env.DB_HOST,
      username: this.configService.get('DB_USER') || process.env.DB_USER,
      password:
        this.configService.get('DB_PASSWORD') || process.env.DB_PASSWORD,
      database: this.configService.get('DB_NAME') || process.env.DB_NAME,
      dialectOptions: {
        ssl: false,
      },
      define: {
        scopes: {
          excludeCreatedAtUpdateAt: {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          },
        },
        timestamps: false,
      },
    });

    this.sequelize.addModels([
      UserModel,
      UsersRolesModel,
      RoleModel,
      CategoryModel,
      MedicineModel,
      MedicineContraindication,
      MedicineImageModel,
      ContraindicationModel,
      ShoppingCartsModel,
      CartItemModel
    ]);

    this.logger.log('[Sequelize] Connected to db successfully');
  }

  async getMedicinesByProps(
    filter?: any,
    limit?: number,
    offset?: number,
    sort?: string,
    sortBy?: string,
  ): Promise<MedicineResult[]> {
    let query = `
    SELECT
        medicine."id",
        medicine.name,
        medicine."categoryId",
        medicine."medicinalForm",
        medicine.description,
        medicine.price,
        medicine."expirationDate",
        medicine."dosageInstructions",
        contraindications.name AS contraindication,
        photos."imageUrl" AS photo
    FROM
        medicine
    LEFT JOIN
        medicine_contraindications ON medicine.id = medicine_contraindications."medicineId"
    LEFT JOIN
        contraindications ON medicine_contraindications."contraindicationId" = contraindications.id
    LEFT JOIN
        photos ON medicine.id = photos."medicineId"
    WHERE
        1=1
  `;
    Object.keys(filter).forEach((key) => {
      if (filter[key]) {
        if (key === 'name') {
          filter[key] = `%${filter[key]}%`;
        }
        query += this.buildFilterCondition(key, filter[key]);
      }
    });
  
    if (sortBy) {
      query += `
        ORDER BY
            ${this.getSortField(sortBy)} ${sort}
      `;
    } else {
      query += `
        ORDER BY
            medicine."id" ASC
      `;
    }
  
    query += `
      LIMIT :limit OFFSET :offset;
    `;

    const replacements = { ...filter, limit, offset };
    this.validateLimits(replacements);
  
    const [medicines] = await this.sequelize.query(query, {
      replacements,
    });
  
    return medicines as MedicineResult[];
  }

  private validateLimits(replacements: any): void {
    if (!Number.isInteger(replacements.limit) || replacements.limit < 1) {
      throw new Error('Limit must be a positive integer');
    }

    if (!Number.isInteger(replacements.offset) || replacements.offset < 0) {
      throw new Error('Offset must be a non-negative integer');
    }
  }

  private getSortField(field: string | undefined): string {
    switch (field) {
      case 'price':
        return `medicine."${field}"`;
      case 'name':
        return `medicine."${field}"`;
      default:
        throw new Error(`Invalid field: ${field}`);
    }
  }

  private buildFilterCondition(key: string, value: any): string {
    switch (key) {
      case 'id':
        return ` AND medicine."id" = :${key}`;
      case 'name':
        return ` AND medicine.name LIKE :${key}`;
      case 'categoryId':
          return ` AND medicine."categoryId" = :${key}`;
      case 'medicinalForm':
        return ` AND medicine.medicinalForm = :${key}`;
      case 'contraindications':
        return Array.isArray(value)
          ? ` AND contraindication.name IN (:${key})`
          : ` AND contraindication.name = :${key}`;
      default:
        throw new Error(`Invalid filter key: ${key}`);
    }
  }
}