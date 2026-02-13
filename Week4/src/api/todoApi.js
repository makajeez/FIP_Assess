const BASE_URL = "https://jsonplaceholder.typicode.com/todos";

export const getTodos = async () => {
  const res = await fetch(`${BASE_URL}?_limit=10`);
  console.log("Fetched todos:", res);
  return res.json();
};

export const createTodo = async (todo) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  return res.json();
};

export const updateTodo = async (id, updates) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  return res.json();
};

export const deleteTodo = async (id) => {
  await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
};
