import 'reflect-metadata';
import { TYPES } from '../types/types';
import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../controllers/base.controller';
import { inject, injectable } from 'inversify';
import { ILogger } from '../interfaces/common/logger.interface';
import { IConfigService } from '../interfaces/common/config.service.interface';
import { ISequelize } from '../interfaces/db/sequelize.interface';
import { Filter } from '../types/filter.type';
import { validationResult } from 'express-validator';
import { IMedicineController } from '../interfaces/medicines/medicine.controller.interface';

type SortOrder = 'ASC' | 'DESC';
type QueryParameter =
  | string
  | number
  | boolean
  | string[]
  | number[]
  | boolean[];
type CategoryId = number[] | undefined;

@injectable()
export class MedicineController
  extends BaseController
  implements IMedicineController
{
  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.SequelizeService) private sequalizeService: ISequelize,
    @inject(TYPES.ILogger) private loggerService: ILogger,
  ) {
    super(loggerService);
    this.bindRoutes([
      { path: '/', method: 'get', func: this.getMedicinesByProps },
    ]);
  }

  private readonly validFields = [
    'id',
    'categoryId',
    'name',
    'price',
    'medicinalForm',
    'contraindications',
    'sort',
    'sortBy',
    'limit',
    'offset',
  ];

  
  private validateSort(sort: SortOrder): SortOrder {
    if (sort !== 'ASC' && sort !== 'DESC') {
      throw new Error(
        'Parameter "sort" should be a string with value "ASC" or "DESC".',
      );
    }
    return sort;
  }

  private validateSortBy(sortBy: unknown): string | undefined {
    if (typeof sortBy === 'string' && sortBy.trim()) {
      return sortBy;
    }
  }

  private validateQueryParameters(query: Record<string, QueryParameter>): void {
    Object.keys(query).forEach((key) => {
      if (!this.validFields.includes(key)) {
        throw new Error(`Invalid query parameter: ${key}`);
      }
    });
  }

  async getMedicinesByProps(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const {
        categoryId,
        name,
        id,
        price,
        medicinalForm,
        contraindications,
        sort = 'ASC',
        sortBy = '',
        limit = 1000,
        offset = '0',
      } = req.query;

      const filter: Filter = {
        categoryId: categoryId ? +categoryId : undefined,
        name: name as string,
        medicinalForm: medicinalForm as string
      };

      this.validateQueryParameters(req.query as Record<string, QueryParameter>);
      const validatedSort = this.validateSort(sort as SortOrder);
      const validatedSortBy = this.validateSortBy(sortBy);

      const medicines = await this.sequalizeService.getMedicinesByProps(
        filter,
        +limit,
        +offset,
        validatedSort,
        validatedSortBy,
      );

      console.log(filter.categoryId);

      if (!medicines) {
        throw new Error('No medicines found with the given parameters.');
      }

      res.json(medicines);
    } catch (err) {
      next(err);
    }
  }
}