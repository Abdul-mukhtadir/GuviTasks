import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart, increaseQty, decreaseQty } =
    useContext(CartContext);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const discount = totalPrice * 0.1;
  const finalPrice = totalPrice - discount;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>

      {cart.map((item) => (
        <div
          key={item.id}
          className="border p-4 mb-2 flex justify-between"
        >
          <div>
            <h2>{item.title}</h2>
            <p>${item.price}</p>
            <p>Total: ${item.price * item.qty}</p>
          </div>

          <div>
            <button
              onClick={() => decreaseQty(item.id)}
              className="bg-gray-300 px-2"
            >
              -
            </button>
            <span className="mx-2">{item.qty}</span>
            <button
              onClick={() => increaseQty(item.id)}
              className="bg-gray-300 px-2"
            >
              +
            </button>

            <button
              onClick={() => removeFromCart(item.id)}
              className="bg-red-500 text-white px-3 py-1 ml-4"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="mt-6 border p-4">
        <p>Total Price: ${totalPrice.toFixed(2)}</p>
        <p>Discount (10%): ${discount.toFixed(2)}</p>
        <h2 className="font-bold">
          Final Price: ${finalPrice.toFixed(2)}
        </h2>
      </div>
    </div>
  );
}

export default Cart;