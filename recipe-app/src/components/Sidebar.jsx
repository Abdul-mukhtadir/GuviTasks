import { NavLink } from "react-router-dom";
import { Home, Heart } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="h-screen w-60 bg-white shadow-lg fixed left-0 top-0 p-5 flex flex-col gap-6">

      <h1 className="text-xl font-bold text-orange-500">
        🍽️ Recipes
      </h1>

      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex items-center gap-2 p-2 rounded ${
            isActive ? "bg-orange-100 text-orange-600" : "text-gray-700 hover:bg-gray-100"
          }`
        }
      >
        <Home size={18} />
        Home
      </NavLink>

      <NavLink
        to="/favorites"
        className={({ isActive }) =>
          `flex items-center gap-2 p-2 rounded ${
            isActive ? "bg-orange-100 text-orange-600" : "text-gray-700 hover:bg-gray-100"
          }`
        }
      >
        <Heart size={18} />
        Favorites
      </NavLink>

    </div>
  );
}