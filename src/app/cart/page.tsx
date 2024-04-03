import CartItems from "../Components/CartItems";

export default function CartPage () {

  return (
    <div className="max-w-[800px] mx-auto">
      <h1 className="text-3xl mb-8 mt-12">Shopping Cart</h1>
      <CartItems />
    </div>
  )
}