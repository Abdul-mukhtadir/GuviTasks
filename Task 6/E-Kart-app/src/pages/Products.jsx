import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

function Products() {
  const [products, setProducts] = useState([]);
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const isInCart = (id) => {
    return cart.find((item) => item.id === id);
  };

  return (
    <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-6 py-20 ">
      {products.map((product) => (
        <div key={product.id} className="border p-4 rounded shadow">
          <img
            src={product.image}
            className="h-40 mx-auto"
          />
          <h2 className="font-bold mt-2">{product.title}</h2>
          <p className="text-green-600">${product.price}</p>
          <p className="text-sm">{product.description.slice(0, 80)}</p>

          {isInCart(product.id) ? (
            <div class="flex justify-center">
                <button
              onClick={() => removeFromCart(product.id)}
              className="bg-red-500 text-white px-3 py-1 mt-2"
            >
              Remove from Cart
            </button>
            </div>
          ) : (
            <div class="flex justify-center">
                <button
              onClick={() => addToCart(product)}
              className="bg-blue-500 text-white px-3 py-1 mt-2 "
            >
              Add to Cart
            </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Products;