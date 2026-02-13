import { useState } from "react";

function TodoForm({ onAdd }) {
  const [text, setText] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText("");
  };

  return (
    <form className="todo-form" onSubmit={submit}>
      <input
        type="text"
        placeholder="Add new todo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

export default TodoForm;
