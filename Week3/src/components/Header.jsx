import "./Header.css";

function Header({ title, onToggleTheme }) {
  return (
    <header className="app-header">
      <h1>{title}</h1>
      <button onClick={onToggleTheme}>Toggle Theme</button>
    </header>
  );
}

export default Header;
