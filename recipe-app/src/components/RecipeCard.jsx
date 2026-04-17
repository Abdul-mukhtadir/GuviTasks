import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";

function RecipeCard({ meal, showRemove }) {
  const { toggleFavorite } = useContext(FavoritesContext);

  return (
    <div
      className="bg-white rounded-xl overflow-hidden shadow-sm 
                 hover:shadow-lg hover:scale-[1.03] 
                 transition duration-300 
                 w-full h-[280px] flex flex-col"
    >
      {/* Image + Details */}
      <Link to={`/recipe/${meal.idMeal}`} className="flex-1">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-36 object-cover"
        />

        <div className="flex flex-col justify-between mt-2 px-2 pb-2">
          <h3 className="font-semibold text-sm text-gray-800 line-clamp-2">
            {meal.strMeal}
          </h3>

          <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full w-fit mt-1">
            {meal.strCategory}
          </span>
        </div>
      </Link>

      {/* Remove Button */}
      {showRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(meal);
          }}
          className="mx-2 mb-2 bg-red-500 hover:bg-red-600 
                     text-white text-xs py-1 rounded-md transition"
        >
          Remove
        </button>
      )}
    </div>
  );
}

export default React.memo(RecipeCard);