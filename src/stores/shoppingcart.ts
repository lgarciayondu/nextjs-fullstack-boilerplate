import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IProduct } from '@/app/Models/ProductModel'

export type ShoppingCartItem = {
  product:IProduct,
  quantity:number
}

export type ShoppingCartState = {
  items: ShoppingCartItem[],
}

export type ShoppingCartActions = {
  addProduct: (product:IProduct) => void;
  removeProduct: (productId:number) => void;
  increaseQuantity: (productId:number) => void;
  decreaseQuantity: (productId:number) => void;
  removeAll: () => void;
}

export type ShoppingCartStore = ShoppingCartState & ShoppingCartActions

export const defaultInitState: ShoppingCartState = {items:[]}

export const useShoppingCartStore =  create(
  persist<ShoppingCartStore>(
    (set, get) => ({
      items:[],

      addProduct: (product:IProduct) => {
        const { items } = get();

        const itemExists = items.findIndex((item) => item.product.id === product.id)

        if(itemExists === -1) {
          items.push({
            product,
            quantity: 1
          })
        } else {
          items[itemExists].quantity++
          // items[itemExists].product.price = product.price
        }

        set({ items })
      },

      removeProduct: (productId:number) => {
        const itemExists = get().items.find(
          (item) => item.product.id === productId
        );

        if (itemExists) {
          if (typeof itemExists.quantity === "number") {
            const updatedCartItems = get().items.filter(
              (item) => item.product.id !== productId
            );
            set({ items: updatedCartItems });
          }
        }
      },

      removeAll: () => set({ items: [] }),

      increaseQuantity: (productId:number) => {
        const { items } = get();

        const itemToIncrease = items.find(
          (item) => item.product.id === productId
        )!;

        itemToIncrease.quantity++

        set({items})
      },

      decreaseQuantity: (productId:number) => {
        const { items } = get();

        const itemToDecrease = items.find(
          (item) => item.product.id === productId
        )!;

        itemToDecrease.quantity--

        set({items})
      }
    }),
    {
      name: "cart-items",
    }
  )
)

