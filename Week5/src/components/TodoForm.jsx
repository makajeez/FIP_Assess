import { useState, useRef } from "react";

function TodoForm({ onAdd }) {
  const [text, setText] = useState("");
  const inputRef = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(text);
    setText("");
    inputRef.current.focus();
  };

  return (
    <form className="todo-form">
      <input
        type="text"
        placeholder="Add new todo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        ref={inputRef}
      />
      <button onClick={handleSubmit}>Add</button>
    </form>
  );
}

export default TodoForm;
