import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import NavBar from "../components/NavBar";

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/movies")
      .then((res) => res.json())
      .then(setMovies);
  }, []);

  return (
    <>
      <NavBar />
      <h1>Home Page</h1>
      {movies.map((movie) => (
  <MovieCard key={movie.id} movie={movie} />
))}

    </>
  );
}

export default Home;

