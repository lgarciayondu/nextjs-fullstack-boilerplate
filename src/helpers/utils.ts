// 'use client'

export const currencyFormat = (value:number) => {
  return new Intl.NumberFormat(
    'en-PH', {
      style: 'currency',
      currency: 'PHP'
    }).format(
    value,
  )
}