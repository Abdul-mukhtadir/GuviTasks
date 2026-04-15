import React, { useEffect, useState } from "react";
import Chart from "./components/Chart";

const categories = ["Food", "Travel", "Bills", "Others"];

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [dark, setDark] = useState(false);
  const [chartType, setChartType] = useState("pie");
  const [activeTab, setActiveTab] = useState("dashboard");

  const [filters, setFilters] = useState({
    category: "",
    search: "",
    min: "",
    max: "",
    from: "",
    to: "",
    sort: "latest",
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(data);
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());

    const expense = {
      ...data,
      amount: Number(data.amount),
      id: Date.now(),
    };

    setExpenses([expense, ...expenses]);
    e.target.reset();
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  let filtered = expenses.filter((e) => {
    if (filters.category && e.category !== filters.category) return false;
    if (filters.search && !e.note.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.min && e.amount < filters.min) return false;
    if (filters.max && e.amount > filters.max) return false;
    if (filters.from && e.date < filters.from) return false;
    if (filters.to && e.date > filters.to) return false;
    return true;
  });

  if (filters.sort === "high") {
    filtered.sort((a, b) => b.amount - a.amount);
  } else {
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  const total = filtered.reduce((sum, e) => sum + e.amount, 0);

  const categoryTotals = Object.values(
    filtered.reduce((acc, e) => {
      acc[e.category] = acc[e.category] || { name: e.category, value: 0 };
      acc[e.category].value += e.amount;
      return acc;
    }, {})
  );

  const topCategory =
    categoryTotals.sort((a, b) => b.value - a.value)[0]?.name || "N/A";

  return (
    <div
      className={
        dark
          ? "dark min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex"
          : "min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex"
      }
    >
      {/* SIDEBAR */}
      <div className="w-64 min-h-screen backdrop-blur-lg bg-white/70 dark:bg-gray-800/60 border-r border-white/20 rounded-2xl p-4 mt-6 ">
        

        <div className="flex flex-col gap-2">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`p-2 rounded-lg text-left ${
              activeTab === "dashboard"
                ? "bg-indigo-500 text-white"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            📊 Dashboard
          </button>

          <button
            onClick={() => setActiveTab("add")}
            className={`p-2 rounded-lg text-left ${
              activeTab === "add"
                ? "bg-indigo-500 text-white"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            ➕ Add Expense
          </button>

          <button
            onClick={() => setActiveTab("analytics")}
            className={`p-2 rounded-lg text-left ${
              activeTab === "analytics"
                ? "bg-indigo-500 text-white"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            📈 Analytics
          </button>

         
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6">
        <div className="max-w-5xl mx-auto">

          {/* 🔥 TITLE CARD */}
          <div className="flex justify-center mb-6">
            <div className="backdrop-blur-lg bg-white/70 dark:bg-gray-800/60 border border-white/20 px-8 py-4 rounded-2xl shadow-xl text-center hover:scale-105 transition  w-full">
              
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                Smart Expense Tracker
              </h1>

              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Track • Analyze • Save 💰
              </p>

            </div>
          </div>

          {/* DASHBOARD */}
          {activeTab === "dashboard" && (
            <>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="backdrop-blur-lg bg-white/70 dark:bg-gray-800/60 p-4 rounded-xl shadow">
                  Total ₹{total}
                </div>
                <div className="backdrop-blur-lg bg-white/70 dark:bg-gray-800/60 p-4 rounded-xl shadow">
                  Top: {topCategory}
                </div>
                <div className="backdrop-blur-lg bg-white/70 dark:bg-gray-800/60 p-4 rounded-xl shadow">
                  Entries: {filtered.length}
                </div>
              </div>

              <div className="backdrop-blur-lg bg-white/70 dark:bg-gray-800/60 p-4 rounded-xl shadow">
                <Chart data={filtered} type={chartType} />
              </div>
            </>
          )}

          {/* ADD EXPENSE */}
          {activeTab === "add" && (
            <form
              onSubmit={addExpense}
              className="backdrop-blur-lg bg-white/70 dark:bg-gray-800/60 p-4 rounded-xl shadow grid gap-2"
            >
              <input name="amount" placeholder="Amount" required className="p-2 border rounded" />

              <select name="category" className="p-2 border rounded">
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>

              <input name="date" type="date" required className="p-2 border rounded" />
              <input name="note" placeholder="Note" className="p-2 border rounded" />

              <button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-2 rounded">
                Add Expense
              </button>
            </form>
          )}

          {/* ANALYTICS */}
          {activeTab === "analytics" && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                <select onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}>
                  <option value="">All Categories</option>
                  {categories.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>

                <input placeholder="Search" onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))} />
                <input type="number" placeholder="Min" onChange={(e) => setFilters((f) => ({ ...f, min: e.target.value }))} />
                <input type="number" placeholder="Max" onChange={(e) => setFilters((f) => ({ ...f, max: e.target.value }))} />

                <input type="date" onChange={(e) => setFilters((f) => ({ ...f, from: e.target.value }))} />
                <input type="date" onChange={(e) => setFilters((f) => ({ ...f, to: e.target.value }))} />

                <select onChange={(e) => setFilters((f) => ({ ...f, sort: e.target.value }))}>
                  <option value="latest">Latest</option>
                  <option value="high">Highest</option>
                </select>

                <select onChange={(e) => setChartType(e.target.value)}>
                  <option value="pie">Pie</option>
                  <option value="bar">Bar</option>
                  <option value="line">Line</option>
                </select>
              </div>

              <div className="backdrop-blur-lg bg-white/70 dark:bg-gray-800/60 p-4 rounded-xl shadow mb-4">
                <Chart data={filtered} type={chartType} />
              </div>

              <div className="backdrop-blur-lg bg-white/70 dark:bg-gray-800/60 p-4 rounded-xl shadow">
                {filtered.map((e) => (
                  <div key={e.id} className="flex justify-between border-b py-2">
                    <div>
                      {e.category} - ₹{e.amount} ({e.date})
                    </div>
                    <button onClick={() => deleteExpense(e.id)}>❌</button>
                  </div>
                ))}
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}