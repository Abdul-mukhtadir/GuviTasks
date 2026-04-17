
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getMealById } from "../services/api";
import { FavoritesContext } from "../context/FavoritesContext";

export default function RecipeDetails(){
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const { toggleFavorite } = useContext(FavoritesContext);

  useEffect(()=>{ getMealById(id).then(setMeal); }, [id]);

  const getIngredients = (meal)=>{
    let list = [];
    for(let i=1;i<=20;i++){
      const ing = meal[`strIngredient${i}`];
      if(ing) list.push(ing);
    }
    return list;
  };

  if(!meal) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <button onClick={()=>window.history.back()}>Back</button>
      <h1 className="text-xl font-bold">{meal.strMeal}</h1>
      <img
  src={meal.strMealThumb}
  alt={meal.strMeal}
  className="w-full-md max-w-md h-54 object-cover rounded mx-auto"
/>

      <button
        className="bg-red-500 text-white p-2 mt-2"
        onClick={()=>toggleFavorite(meal)}
      >
        Add to Favorites
      </button>

      <h3>Ingredients:</h3>
      <ul>
        {getIngredients(meal).map((i,idx)=><li key={idx}>{i}</li>)}
      </ul>

      <p>{meal.strInstructions}</p>

      {meal.strYoutube && (
        <a href={meal.strYoutube} target="_blank"><span class="text-red-400">Watch Video</span></a>
      )}
    </div>
  );
}
