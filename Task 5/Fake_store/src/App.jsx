import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

// -----------------------------
// Navbar Component
// -----------------------------
function Navbar({ cartCount, onOpenCart }) {
  return (
    <nav className="w-full bg-slate-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">FakeStore</h1>
      <button
        onClick={onOpenCart}
        className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-lg font-medium"
      >
        Cart ({cartCount})
      </button>
    </nav>
  );
}

// -----------------------------
// Product Card
// -----------------------------
function ProductCard({ product, onAdd }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col">
      <img
        src={product.image}
        alt={product.title}
        className="h-40 object-contain mb-3"
      />
      <h2 className="font-semibold text-sm mb-2 line-clamp-2">
        {product.title}
      </h2>
      <p className="text-lg font-bold mb-3">${product.price}</p>
      <button
        onClick={() => onAdd(product)}
        className="mt-auto bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg"
      >
        Add to Cart
      </button>
    </div>
  );
}

// -----------------------------
// Cart Modal
// -----------------------------
function CartModal({ isOpen, onClose, cartItems, onRemove }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button onClick={onClose} className="text-gray-500">✕</button>
        </div>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">Cart is empty</p>
        ) : (
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border-b pb-3"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-14 h-14 object-contain"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium line-clamp-2">
                    {item.title}
                  </p>
                  <p className="text-sm font-bold">${item.price}</p>
                </div>
                <button
                  onClick={() => onRemove(item.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

// -----------------------------
// Main App
// -----------------------------
export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Fetch products
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  // Add to cart
  const handleAddToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      alert("Item already added to the cart");
      return;
    }
    setCart([...cart, product]);
  };

  // Remove from cart
  const handleRemoveFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar cartCount={cart.length} onOpenCart={() => setIsCartOpen(true)} />

      <div className="p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAdd={handleAddToCart}
          />
        ))}
      </div>

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onRemove={handleRemoveFromCart}
      />
    </div>
  );
}


