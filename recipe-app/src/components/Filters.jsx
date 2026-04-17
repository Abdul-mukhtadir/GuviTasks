
export default function Filters({
  categories, ingredients, areas,
  setCategory, setIngredient, setArea
}){
  return (
    <div className="flex gap-2 flex-wrap mt-2">
      <select onChange={e=>setCategory(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map(c=>(
          <option key={c.idCategory}>{c.strCategory}</option>
        ))}
      </select>

      <select onChange={e=>setIngredient(e.target.value)}>
        <option value="">All Ingredients</option>
        {ingredients.slice(0,50).map(i=>(
          <option key={i.idIngredient}>{i.strIngredient}</option>
        ))}
      </select>

      <select onChange={e=>setArea(e.target.value)}>
        <option value="">All Meal Types</option>
        {areas.map((a,i)=>(
          <option key={i}>{a.strArea}</option>
        ))}
      </select>
    </div>
  );
}
