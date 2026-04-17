
import { useState, useEffect } from "react";

export default function SearchBar({ setQuery }){
  const [input, setInput] = useState("");

  useEffect(()=>{
    const t = setTimeout(()=> setQuery(input), 500);
    return ()=> clearTimeout(t);
  }, [input]);

  return (
    <input
      value={input}
      onChange={e=>setInput(e.target.value)}
      placeholder="Search recipes..."
      className="p-2 border rounded w-full"
    />
  );
}
