'use client'

import {useShoppingCartStore} from '@/stores/shoppingcart'
import { currencyFormat } from '@/helpers/utils'
import Link from 'next/link'

export default function CartItems () {

  const {
    items,
    removeProduct,
    removeAll,
    increaseQuantity,
    decreaseQuantity
  } = useShoppingCartStore()

  const handleRemoveAll = () => {
    const confirmRemove = confirm('Remove all items in the cart?')
    if(confirmRemove) removeAll()
  }

  const handleRemoveProduct = (productId:number) => {
    const confirmRemove = confirm('Remove product from the cart?')
    if(confirmRemove) removeProduct(productId)
  }

  const handleDecreaseQuantity = (productId:number) => {
    const itemToDecrease = items.find(
      (item) => item.product.id === productId
    )!;

    if(itemToDecrease.quantity === 1) {
      const confirmRemove = confirm('This will remove the item from the cart')
      if(confirmRemove) {
        removeProduct(productId)
      }
      return
    }

    decreaseQuantity(productId)
  }

  if(!items.length) return (
    <p>
      No items to checkout.
      View our list of <Link href="/" className='text-blue-400 hover:text-blue-300'>products</Link>
    </p>
  )

  return (
    <>
      {items.map((item, index) => (
        <div key={index} className='flex gap-10 mb-12'>
          <div className='shrink-0 w-56'>
            <img src={item.product.image} alt={item.product.image} />
          </div>
          <div className='grow basis-3/5'>
            <h4>{item.product.name}</h4>
            <p className='text-opacity-50 text-gray-400 text-sm'>{item.product.description}</p>
            <p>{currencyFormat(item.product.price)}</p>
          </div>
          <div className='text-center'>
            <div className='flex'>
              <button
                onClick={() => handleDecreaseQuantity(item.product.id)}
                type='button'
                className='px-2 border-2 border-gray-400'
                >-
              </button>
              <label className='w-12 text-center'>
                {item.quantity}
                <input type='text' className='w-12 text-center hidden' max={999} maxLength={3} defaultValue={item.quantity} />
              </label>
              <button
                onClick={() => increaseQuantity(item.product.id)}
                type='button'
                className='px-2 border-2 border-gray-400'
                >+
              </button>
            </div>
            <button
              onClick={() => handleRemoveProduct(item.product.id)}
              type='button'
              className='btn mt-4'
              >Remove
            </button>
          </div>
          <div className='basis-1/5 text-right'>
            {currencyFormat(item.quantity * item.product.price)}
          </div>
        </div>
      ))}
      <hr className='border-gray-600' />
      <div className='text-right text-lg text-white mt-8'>
        Total: {currencyFormat(items.reduce((acc, { product, quantity }) => acc + product.price * quantity, 0))}
      </div>
      <div className='flex gap-4 mt-8 justify-end'>
        <button
          onClick={() => handleRemoveAll()}
          disabled={!items.length}
          type="button"
          className='btn bg-red-600 hover:bg-red-700 text-white'
          >Remove All
        </button>
        <button
          disabled={!items.length}
          type="button"
          className='btn bg-green-700 hover:bg-green-900 text-white'
          >Continue to Checkout
        </button>
      </div>
    </>
  )
}