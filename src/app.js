const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("item-list");

// Load saved tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

// Form Submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  tasks.push({ text, done: false, id: Date.now() });
  saveAndRender();
  input.value = "";
});

// Handle list clicks (toggle / delete)
list.addEventListener("click", (e) => {
  if (e.target.matches(".delete-btn")) {
    tasks = tasks.filter((t) => t.id !== Number(e.target.dataset.id));
  } else if (e.target.matches(".toggle-btn")) {
    const li = e.target.closest("li");
    const task = tasks.find((t) => t.id === Number(li.dataset.id));
    task.done = !task.done;
  }
  saveAndRender();
});

// Helpers
function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}
function renderTasks() {
  list.innerHTML = "";
  tasks.forEach((t) => {
    const li = document.createElement("li");
    li.dataset.id = t.id;

    const left = document.createElement("div");
    left.className = "left";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = t.done;
    checkbox.className = "toggle-btn";

    const span = document.createElement("span");
    span.textContent = t.text;
    if (t.done) span.classList.add("done");

    left.append(checkbox, span);

    const delBtn = document.createElement("button");
    delBtn.textContent = "X";
    delBtn.dataset.id = t.id;
    delBtn.className = "delete-btn";

    li.append(left, delBtn);
    list.appendChild(li);
  });
}

/* ---------- DARK / LIGHT TOGGLE ---------- */
const toggleBtn = document.getElementById("theme-toggle");
const saved = localStorage.getItem("theme");
if (saved === "light") document.body.classList.add("light");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("light") ? "light" : "dark"
  );
});

document
  .getElementById("theme-toggle")
  .addEventListener("click", (e) => e.target.classList.toggle("flipped"));
