import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import RecipeCard from "../components/RecipeCard";

export default function Favorites() {
  const { favorites } = useContext(FavoritesContext);

  if (favorites.length === 0) {
    return (
      <p className="p-4 text-center text-gray-500">
        No favorites yet 🍽️
      </p>
    );
  }

  return (
    <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {favorites.map((meal) => (
        <RecipeCard
          key={meal.idMeal}
          meal={meal}
          showRemove={true}   // ✅ important
        />
      ))}
    </div>
  );
}