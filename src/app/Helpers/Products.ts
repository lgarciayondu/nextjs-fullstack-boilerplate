'use server'

import baseApi from './BaseApi'
import { generateAccessToken } from '@/app/Helpers/Directus'
import { IProduct, ProductResponse } from '@/app/Models/ProductModel'
import { revalidatePath } from 'next/cache'

const getProducts = async (): Promise<ProductResponse> => {
  try {
    const token = await generateAccessToken()

    const response = await baseApi.get('/items/products', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const { data } = response.data

    return data
    return [{
      id: 1,
      image: 'https://picsum.photos/id/200/100/100',
      name: 'Product name 1',
      description: 'Product description 1',
      price: 80,
      status: 'active',
      date_created: '',
      date_updated: ''
    },{
      id: 2,
      image: 'https://picsum.photos/id/201/100/100',
      name: 'Product name 2',
      description: 'Product description 2',
      price: 120,
      status: 'active',
      date_created: '',
      date_updated: ''
    },{
      id: 3,
      image: 'https://picsum.photos/id/203/100/100',
      name: 'Product name 3',
      description: 'Product description 3',
      price: 50,
      status: 'active',
      date_created: '',
      date_updated: ''
    }]
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const createProduct = async (data: Partial<IProduct>): Promise<void> => {
  try {
    const token = await generateAccessToken()

    console.log(data)

    await baseApi.post('/items/products', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    revalidatePath('/')
  } catch (e) {
    throw e
  }
}

const getProduct = async (
  product_id: number
): Promise<Partial<ProductResponse>> => {
  try {
    const token = await generateAccessToken()

    const response = await baseApi.get(`/items/products/${product_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const { data } = response.data

    return data
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const deleteProduct = async (product_id: number): Promise<void> => {
  try {
    const token = await generateAccessToken()

    await baseApi.delete(`/items/products/${product_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    revalidatePath('/')
  } catch (e) {
    throw e
  }
}

export { getProducts, createProduct, getProduct, deleteProduct }
