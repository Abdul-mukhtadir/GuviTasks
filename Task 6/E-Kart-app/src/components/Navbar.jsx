import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="text-xl font-[cursive] text-3xl">E-Kart</h1>
      <div class="flex space-x-4">
        <Link to="/" >Products</Link> 
        <Link to="/cart">Cart</Link>
      </div>
    </div>
  );
}

export default Navbar;