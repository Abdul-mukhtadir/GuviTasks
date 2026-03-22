import { useEffect, useState } from "react";
import './App.css'
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartModal from "./components/CartModal";
import axios from "axios";

function App() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [])

  function openModal(product) {
    setSelectedProduct(product);
  }

  function closeModal() {
    setSelectedProduct(null);
  }

  function addToCart(product) {
    const exists = cart.find(item => item.id === product.id);
    if (exists) {
      alert("Item already added to the cart");
      return;
    }
    setCart([...cart, product]);
    closeModal();
  }

  function removeFromCart(id) {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
  }

  return (
    <div className='app'>
      <Header cartCount={cart.length} openCart={() => setCartOpen(true)} />

      <h1 className='title'>Fake Store Shopping App</h1>

      {loading ? (<p className='message'>Loading products....</p>) : (
        <div className='product-grid'>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} openModal={openModal} />
          ))}
        </div>
      )}

      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          closeModal={closeModal} 
          addToCart={addToCart} 
        />
      )}

      {cartOpen && (
        <CartModal 
          cart={cart}
          closeCart={() => setCartOpen(false)}
          removeFromCart={removeFromCart}
        />
      )}
    </div>
  )
}

export default App;
