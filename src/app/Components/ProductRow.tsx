'use client'

import { IProduct } from '@/app/Models/ProductModel'
import { BiInfoCircle, BiSolidTrash, BiCartAdd } from 'react-icons/bi'
import { deleteProduct } from '@/app/Helpers/Products'
import { useRouter } from 'next/navigation'
import React from 'react'
import {useShoppingCartStore} from '@/stores/shoppingcart'

interface ProductRowProps {
  product: IProduct
  removeOptimisticProduct: (productId: number) => void
}

const ProductRow: React.FC<ProductRowProps> = ({
  product,
  removeOptimisticProduct,
}) => {
  const router = useRouter()
  const handleViewProduct = (product_id:number) => {
    router.push(`/products/${product_id}`)
  }

  const handleDeleteProduct = async (product_id:number) => {
    removeOptimisticProduct(product_id)

    // Directus: Product Delete
    await deleteProduct(product_id)
  }

  const {addProduct:handleAddToCart} = useShoppingCartStore()

  return (
    <tr key={product.id}>
      <td></td>
      <td>
        <div className='avatar'>
          <div className='w-24 rounded-xl'>
            <img src={product.image} alt={product.image} />
          </div>
        </div>
      </td>
      <td>{product.name}</td>
      <td>{product.description}</td>
      <td>{product.price}</td>
      <td>
        <div className='flex space-x-2'>
          <button
            className='btn btn-outline btn-info'
            onClick={() => handleViewProduct(product.id)}
            >
            <BiInfoCircle size='2rem' />
          </button>
          <button
            className='btn btn-outline btn-info'
            onClick={() => handleAddToCart(product)}
            >
            <BiCartAdd size='2rem' />
          </button>
        </div>
      </td>
    </tr>
  )
}

export default ProductRow
