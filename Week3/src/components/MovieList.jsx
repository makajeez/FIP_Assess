import MovieCard from "./MovieCard";

function MovieList({ movies }) {
  return (
    <section className="movie-grid">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </section>
  );
}

export default MovieList;
