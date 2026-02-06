import { useState } from "react";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import ClassLifecycle from "./components/ClassLifecycle";
import "./index.css";

function App() {
  const [theme, setTheme] = useState("dark");
  const [movies, _setMovies] = useState([
    {
      id: 1,
      title: "Inception",
      year: 2010,
      poster: "https://images.unsplash.com/photo-1540655037529-dec987208707?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmlkZW9zfGVufDB8fDB8fHww"
    },
    {
      id: 2,
      title: "Interstellar",
      year: 2014,
      poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dmlkZW9zfGVufDB8fDB8fHww"
    }
  ]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className={theme === "light" ? "light" : ""}>
      <Header title="Movio" onToggleTheme={toggleTheme} />

      <main style={{ padding: "20px" }}>
        <MovieList movies={movies} />
        <ClassLifecycle />
      </main>
    </div>
  );
}

export default App;
