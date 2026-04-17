
import { useEffect, useState } from "react";
import { searchMeals, getCategories, getIngredients, getAreas } from "../services/api";
import RecipeCard from "../components/RecipeCard";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import Loader from "../components/Loader";

export default function Home(){
  const [meals, setMeals] = useState([]);
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [areas, setAreas] = useState([]);

  const [category, setCategory] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [area, setArea] = useState("");

  useEffect(()=>{ searchMeals(query).then(setMeals); }, [query]);
  useEffect(()=>{ getCategories().then(setCategories); }, []);
  useEffect(()=>{ getIngredients().then(setIngredients); }, []);
  useEffect(()=>{ getAreas().then(setAreas); }, []);

  const filtered = meals.filter(m =>
    (!category || m.strCategory === category) &&
    (!area || m.strArea === area) &&
    (!ingredient || Object.values(m).includes(ingredient))
  );

  if (!meals.length) {
  return <Loader />;
}

  return (
    <div className="max-w-7xl mx-auto p-4">
      <SearchBar setQuery={setQuery}/>
      <Filters
        categories={categories}
        ingredients={ingredients}
        areas={areas}
        setCategory={setCategory}
        setIngredient={setIngredient}
        setArea={setArea}
      />

      {filtered.length === 0 && <p>No recipes found</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-4">
        {filtered.map(m=>(
          <RecipeCard key={m.idMeal} meal={m}/>
        ))}
      </div>
    </div>
  );
}
