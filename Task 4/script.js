const form = document.getElementById("transactionForm");
const list = document.getElementById("transactionList");
const resetBtn = document.getElementById("resetBtn");

const incomeEl = document.getElementById("totalIncome");
const expenseEl = document.getElementById("totalExpense");
const balanceEl = document.getElementById("balance");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let editId = null;

// Add / Update
form.addEventListener("submit", e => {
  e.preventDefault();

  const description = document.getElementById("description").value;
  const amount = Number(document.getElementById("amount").value);
  const type = document.getElementById("type").value;

  if (editId) {
    transactions = transactions.map(t =>
      t.id === editId ? { ...t, description, amount, type } : t
    );
    editId = null;
  } else {
    transactions.push({
      id: Date.now(),
      description,
      amount,
      type
    });
  }

  saveAndRender();
  form.reset();
});

// Reset form
resetBtn.addEventListener("click", () => {
  form.reset();
  editId = null;
});

// Filter
document.querySelectorAll("input[name='filter']").forEach(radio => {
  radio.addEventListener("change", renderTransactions);
});

// Render
function renderTransactions() {
  list.innerHTML = "";
  const filter = document.querySelector("input[name='filter']:checked").value;

  let income = 0, expense = 0;

  transactions.forEach(txn => {
    if (filter !== "all" && txn.type !== filter) return;

    const li = document.createElement("li");
    li.className = txn.type;

    li.innerHTML = `
      <span>${txn.description} - ₹${txn.amount}</span>
      <div class="actions">
        <button class="edit" onclick="editTransaction(${txn.id})">Edit</button>
        <button class="delete" onclick="deleteTransaction(${txn.id})">X</button>
      </div>
    `;

    list.appendChild(li);
  });

  transactions.forEach(txn => {
    txn.type === "income" ? income += txn.amount : expense += txn.amount;
  });

  incomeEl.textContent = `₹${income}`;
  expenseEl.textContent = `₹${expense}`;
  balanceEl.textContent = `₹${income - expense}`;
}

// Delete
function deleteTransaction(id) {
  transactions = transactions.filter(txn => txn.id !== id);
  saveAndRender();
}

// Edit
function editTransaction(id) {
  const txn = transactions.find(txn => txn.id === id);
  document.getElementById("description").value = txn.description;
  document.getElementById("amount").value = txn.amount;
  document.getElementById("type").value = txn.type;
  editId = id;
}

// Save
function saveAndRender() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
  renderTransactions();
}

renderTransactions();
