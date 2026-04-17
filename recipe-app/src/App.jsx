import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipeDetails";
import Favorites from "./pages/Favorites";
import Sidebar from "./components/Sidebar"
import { FavoritesProvider } from "./context/FavoritesContext";

export default function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <div className="flex">
          
          <Sidebar/>

          {/* Main Content */}
          <div className="ml-60 w-full min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
    <div className="bg-white/80 min-h-screen p-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  </div>
</div>
      </BrowserRouter>
    </FavoritesProvider>
  );
}