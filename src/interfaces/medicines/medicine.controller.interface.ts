import { Request, Response, NextFunction } from 'express';

export interface IMedicineController {
  getMedicinesByProps: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<void>;
}