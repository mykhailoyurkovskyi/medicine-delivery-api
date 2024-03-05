import { ShoppingCartsModel } from "../../models/shoppingCart/shoppingCart";


export interface IShoppingCartService {
  createCart(userId: number, total: number): Promise<ShoppingCartsModel>;
  addToCart(
    userId: number,
    medicineId: number,
    quantity: number,
  ): Promise<void>;
  getCart(userId: number): Promise<ShoppingCartsModel | null>;
  removeFromCart(
    userId: number,
    medicineId: number,
  ): Promise<void>;
  deleteCartItem(cartItemId: number): Promise<void>;
  removeAllCarts(userId: number): Promise<void>;
}