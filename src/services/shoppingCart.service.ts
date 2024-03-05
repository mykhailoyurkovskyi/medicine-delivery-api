import { injectable, inject } from 'inversify';
import { ILogger } from '../interfaces/common/logger.interface';
import { TYPES } from '../types/types';
import { SequelizeService } from './sequelize.service';
import { Filter } from '../types/filter.type';
import { IShoppingCartService } from '../interfaces/shoppingCart/shoppingCart.service.interface';
import { ShoppingCartsModel } from '../models/shoppingCart/shoppingCart';
import { MedicineModel } from '../models/medicines/medicine';
import { CartItemModel } from '../models/shoppingCart/cartItem';


@injectable()
export class ShoppingCartService implements IShoppingCartService {
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.SequelizeService) private sequelizeService: SequelizeService,
  ) {}

  async createCart(userId: number, total: number): Promise<ShoppingCartsModel> {
    const existingCart = await ShoppingCartsModel.findOne({
      where: { userId },
    });

    if (existingCart) {
      return existingCart;
    }

    this.loggerService.log(userId);

    const newCart = await ShoppingCartsModel.create({
      userId,
      total: 0,
    });

    return newCart;
  }

  async addToCart(
    userId: number,
    medicineId: number,
    quantity: number
  ): Promise<void> {
    let shoppingCart = await ShoppingCartsModel.findOne({
      where: { userId },
    });

    if (!shoppingCart) {
      shoppingCart = await ShoppingCartsModel.create({ userId, total: 0 });
    }

    try {
      const medicine = await MedicineModel.findByPk(medicineId);

      if (!medicine) {
        throw new Error('medicine not found.');
      }

      console.log('medicine found:', medicine);

      const [cartItem, created] = await CartItemModel.findOrCreate({
        where: {
          shopping_cart_id: shoppingCart?.id,
          medicine_id: medicine.id,
          price: medicine.price,
        },
        defaults: {
          quantity,
        },
      });

      if (!created) {
        await cartItem.update({ quantity: cartItem.quantity + quantity });
      }

      const totalPrice = medicine.price * quantity;
      await shoppingCart?.update({
        total: shoppingCart!.total + totalPrice,
      });

      console.log('CartItem created:', cartItem);
    } catch (error) {
      console.error('Error in addToCart:', error);
      throw error;
    }
  }

  async removeFromCart(
    userId: number,
    medicineId: number,
  ): Promise<void> {
    try {
      const shoppingCart = await ShoppingCartsModel.findOne({
        where: { userId },
      });

      if (!shoppingCart) {
        throw new Error('Shopping cart not found.');
      }

      const medicine = await MedicineModel.findByPk(medicineId);

      if (!medicine) {
        throw new Error('medicine not found.');
      }

      const cartItem = await CartItemModel.findOne({
        where: {
          shopping_cart_id: shoppingCart.id,
          medicine_id: medicine.id,
        },
      });

      if (!cartItem) {
        throw new Error('medicine not found in cart.');
      }

      cartItem.quantity -= 1;

      if (cartItem.quantity === 0) {
        await cartItem.destroy();
      } else {
        await cartItem.save();
      }

      if (shoppingCart.total - medicine.price >= 0) {
        shoppingCart.total -= medicine.price;
        await shoppingCart.save();
      }
    } catch (error) {
      console.error('Error in removeFromCart:', error);
      throw error;
    }
  }

  async getCart(userId: number): Promise<ShoppingCartsModel | null> {
    let shoppingCart = await ShoppingCartsModel.findOne({
      where: { userId },
      include: [
        {
          model: CartItemModel,
        },
      ],
    });

    if (!shoppingCart) {
      shoppingCart = await this.createCart(userId, 0);
    }

    return shoppingCart || null;
  }

  async deleteCartItem(cartItemId: number): Promise<void> {
    const cartItem = await CartItemModel.findByPk(cartItemId);

    if (!cartItem) {
      throw new Error('medicine not found in cart.');
    }

    const medicine = await MedicineModel.findByPk(cartItem.medicine_id);
    const totalCost = medicine!.price * cartItem.quantity;

    const shoppingCart = await ShoppingCartsModel.findByPk(
      cartItem.shopping_cart_id,
    );

    shoppingCart!.total -= totalCost;

    await shoppingCart?.save();

    await cartItem.destroy();

    const remainingItemsCount = await CartItemModel.count({
      where: { shopping_cart_id: shoppingCart?.id },
    });

    if (remainingItemsCount === 0) {
      shoppingCart!.total = 0;
      await shoppingCart?.save();
    }
  }

  async removeAllCarts(userId: number): Promise<void> {
    const shoppingCart = await ShoppingCartsModel.findOne({
      where: { userId: userId },
    });

    const cartItems = await CartItemModel.findAll({
      where: { shopping_cart_id: shoppingCart?.id },
    });

    for (const cartItem of cartItems) {
      await cartItem.destroy();
    }

    shoppingCart!.total = 0;
    await shoppingCart?.save();
  }
}