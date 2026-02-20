import React from "react";
import { getTodos, createTodo, updateTodo, deleteTodo } from "./api/todoApi";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    getTodos().then(data => {
      setTodos(data);
      setLoading(false);
      
    });
  }, []);

  const addTodo = async (title) => {
      const newTodo = {
        title,
        completed: false,
        userId: 1,
      };

      const created = await createTodo(newTodo);
      setTodos(prev => [{ ...created }, ...prev]);
  }; 

  const toggleTodo = async (todo) => {
    const _updated = await updateTodo(todo.id, { completed: !todo.completed });
    setTodos(prev =>
      prev.map(t =>
        t.id === todo.id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const removeTodo = async (id) => {
    await deleteTodo(id);
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  return (
    <div className="app">
      <h1>Todo App</h1>
      <TodoForm onAdd={addTodo} />

      {loading ? (
        <p>Loading todos...</p>
      ) : (
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={removeTodo}
        />
      )}
    </div>
  );
}

export default App;
