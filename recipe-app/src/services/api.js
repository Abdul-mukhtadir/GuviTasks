
import axios from "axios";

const BASE = "https://www.themealdb.com/api/json/v1/1";

export const searchMeals = async (q) => {
  const res = await axios.get(`${BASE}/search.php?s=${q}`);
  return res.data.meals || [];
};

export const getMealById = async (id) => {
  const res = await axios.get(`${BASE}/lookup.php?i=${id}`);
  return res.data.meals[0];
};

export const getCategories = async () => {
  const res = await axios.get(`${BASE}/categories.php`);
  return res.data.categories;
};

export const getIngredients = async () => {
  const res = await axios.get(`${BASE}/list.php?i=list`);
  return res.data.meals;
};

export const getAreas = async () => {
  const res = await axios.get(`${BASE}/list.php?a=list`);
  return res.data.meals;
};
export const getAllMeals = async () => {
  const letters = ["a", "b", "c", "d", "e"]; // limit for speed

  const requests = letters.map((letter) =>
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
      .then((res) => res.json())
  );

  const results = await Promise.all(requests);

  return results.flatMap((r) => r.meals || []);
};