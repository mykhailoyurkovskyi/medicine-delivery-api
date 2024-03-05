import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { inject, injectable } from 'inversify';
import { ILogger } from '../interfaces/common/logger.interface';
import { TYPES } from '../types/types';
import jwt, { JwtPayload, sign } from 'jsonwebtoken';
import { IConfigService } from '../interfaces/common/config.service.interface';
import { IShoppingCartController } from '../interfaces/shoppingCart/shoppingCart.controller.interface';
import { BaseController } from './base.controller';
import { AuthGuard } from '../middlewares/auth.guard';
import { IUserService } from '../interfaces/users/user.service.interface';
import { IShoppingCartService } from '../interfaces/shoppingCart/shoppingCart.service.interface';
import { AdminGuard } from '../middlewares/requireAdmin.middleware';

@injectable()
export class ShoppingCartController
  extends BaseController
  implements IShoppingCartController
{
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.ShoppingCartService)
    private shoppingCartService: IShoppingCartService,
    @inject(TYPES.UserService) private userService: IUserService,
    @inject(TYPES.ConfigService) private configService: IConfigService,
  ) {
    super(loggerService);
    this.bindRoutes([
      {
        path: '/createCart',
        method: 'post',
        func: this.createCart,
        middlewares: [
          new AuthGuard(),
        ],
      },
      {
        path: '/addToCart',
        method: 'post',
        func: this.addToCart,
        middlewares: [
          new AuthGuard(),
        ],
      },
      {
        path: '/getCart',
        method: 'get',
        func: this.getCart,
        middlewares: [
          new AuthGuard(),
        ],
      },
      {
        path: '/removeFromCart',
        method: 'delete',
        func: this.removeFromCart,
        middlewares: [
          new AuthGuard(),
        ],
      },
      {
        path: '/removeAllCarts',
        method: 'delete',
        func: this.removeAllCarts,
        middlewares: [
          new AuthGuard(),
        ],
      },
      {
        path: '/removeCart/:id',
        method: 'delete',
        func: this.deleteCartItem,
        middlewares: [
          new AuthGuard(),
        ],
      },
    ]);
  }

  async createCart(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId: number = this.getUserIdFromToken(req);
      console.log(userId);

      const shoppingCart = await this.shoppingCartService.createCart(userId, 0);

      res.status(201).json(shoppingCart);
    } catch (error) {
      this.loggerService.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async addToCart(req: Request, res: Response): Promise<void> {
    await Promise.all(
      [
        body(
          'medicineId',
          'Medicine ID is required and must be a number',
        ).isNumeric(),
        body(
          'quantity',
          'Quantity is required and must be a number',
        ).isNumeric(),
      ].map((validation) => validation.run(req)),
    );

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    try {
      const userId: number = this.getUserIdFromToken(req);
      console.log(userId);
      const { medicineId, quantity } = req.body;

      await this.shoppingCartService.addToCart(
        userId,
        medicineId,
        quantity,
      );

      const updatedCart = await this.shoppingCartService.getCart(userId);

      res.json({ 'Added to cart!': updatedCart });
    } catch (error) {
      this.loggerService.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async removeFromCart(req: Request, res: Response): Promise<void> {
    try {
      const userId: number = this.getUserIdFromToken(req);
      const { medicineId } = req.body;

      await this.shoppingCartService.removeFromCart(
        userId,
        medicineId,
      );

      res.json('deleted from cart!');
    } catch (error) {
      this.loggerService.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async removeAllCarts(req: Request, res: Response): Promise<void> {
    try {
      const userId: number = this.getUserIdFromToken(req);

      await this.shoppingCartService.removeAllCarts(userId);

      res.json('All carts removed and total set to 0!');
    } catch (error) {
      this.loggerService.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getCart(req: Request, res: Response): Promise<void> {
    try {
      const userId: number = this.getUserIdFromToken(req);

      const shoppingCart = await this.shoppingCartService.getCart(userId);

      if (!shoppingCart) {
        res.status(404).json({ error: 'Shopping cart not found' });
        return;
      }

      res.status(200).json(shoppingCart);
    } catch (error) {
      this.loggerService.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deleteCartItem(req: Request, res: Response): Promise<void> {
    try {
      const cartItemId = Number(req.params.id);
      await this.shoppingCartService.deleteCartItem(cartItemId);
      res.status(200).send({ message: 'Cart item deleted successfully.' });
    } catch (error) {
      console.error('Error in deleteCartItem:', error);
      res
        .status(500)
        .send({ error: 'An error occurred while deleting the cart item.' });
    }
  }

  private getUserIdFromToken(req: Request): number {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new Error('Authorization token not provided');
    }

    const decodedToken: any = jwt.verify(
      token,
      this.configService.get('SECRET'),
    );

    console.log(decodedToken);

    return decodedToken.id;
  }
}