import { Request, Response, NextFunction } from 'express';

export interface IShoppingCartController {
  createCart(req: Request, res: Response, next: NextFunction): Promise<void>;
  addToCart(req: Request, res: Response): Promise<void>;
  getCart(req: Request, res: Response): Promise<void>;
}