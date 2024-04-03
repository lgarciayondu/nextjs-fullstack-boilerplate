'use client'
import { BiCart, BiSolidCart } from 'react-icons/bi'
import Link from 'next/link'
import {useShoppingCartStore} from '@/stores/shoppingcart'


export function CartIndicator () {
  const {items} = useShoppingCartStore()

  return (
    <Link href="/cart" className='btn btn-outline btn-info flex gap-2'>
      <div className='relative'>
        {items.length ? (
          <BiSolidCart size='2rem' />
        ) : (
          <BiCart size='2rem' />
        )}
      </div>
      <div className='text-xl '>
        {items.reduce((acc, { product, quantity }) => acc + quantity, 0)}
      </div>
    </Link>
  )
}
