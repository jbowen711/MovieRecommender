import React from 'react'
import { useState } from 'react';
import MovieDetails from './movieDetails';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const MovieSearch = ({ onSelect }) => {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false);
    const [selectMovie, setSelectedMovie] = useState(null);


    const searchMovies = async () => {
        if (!query.trim()) return;
        setLoading(true);
        try {
            const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
            const data = await res.json();
            setResults(data.results || []);
        } catch (error) {
            console.error("Error fetching movies:", error);
            return;
        } finally {
            setLoading(false);
        }
    }

    const fetchMovieDetails = async (id) => {
        try {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
            const movieData = await res.json();
            setSelectedMovie(movieData);
        } catch (error) {
            console.error("Error fetching movie details:", error);
        }
    }

    // TODO: Handle movie selection

    return (
        <div className="p-4 max-w-3xl mx-auto">
            {/* Input and Button for Search */}
            <form onSubmit={(e) => {
                e.preventDefault(), searchMovies();
            }} className="flex gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Search movies..."
                    values={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 text-black border border-gray-300 rounded px-4 py-2" />
                <button
                    onClick={searchMovies}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
                    {loading ? "Loading..." : "Search"}
                </button>
            </form>


            {/* Display Results */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {results
                    .filter(movie => movie.poster_path)
                    .map((movie) => {
                        const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/150";
                        return (
                            <div
                                key={movie.id}
                                className="relative bg-white rounded shadow hover:shadow-lg transition cursor-pointer"
                                onClick={() => fetchMovieDetails(movie.id)}
                            >
                                <img
                                    src={posterUrl}
                                    alt={movie.title}
                                    className="w-full h-auto rounded-t"
                                />
                                <div className="absolute bottom-0 bg-gray-900 bg-opacity-95 p-1 w-full">
                                    <p className="text-white text-xs text-center">{movie.title}: {movie.release_date ? movie.release_date.split("-")[0] : "Unknown"}</p>
                                </div>
                            </div>

                        );
                    })}
            </div>
            {selectMovie && (<MovieDetails movie={selectMovie} onClose={() => setSelectedMovie(null)} />)}
        </div>
    );
};

export default MovieSearch;
