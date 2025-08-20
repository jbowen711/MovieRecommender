import React from 'react'
import { db } from '../config/firebase'
import { getDocs, collection, query, where } from 'firebase/firestore'
import SaveMovieButton from '../components/SaveMovieButton';
import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import DeleteMovieButton from '../components/DeleteMovieButton';

export default function List() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useUser();
    const [error, setError] = useState(null);

    const moviesCollectionRef = collection(db, "watchedList")
    useEffect (() => {
        if (!user) {
            setMovie([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        const queryMovies = query(collection(db, "users"), where("uid", "==", user.uid));
        const fetchMovies = async () => {
            try {
                setLoading(true);
                const queryMovies = query(collection(db, "users", user.uid, "savedMovies"));
                const querySnapshot = await getDocs(queryMovies);
                const movies = [];
                querySnapshot.forEach((doc) => {
                    movies.push(doc.data());
                });
                setMovies(movies);
                setLoading(false);
            } catch (err) {
                setError(err);
                console.error("Error fetching movies: ", err);
                setLoading(false);
            }
        };
        fetchMovies();
    }, [user])

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading movies: {error.message}</p>;
    if (!user) return <p>Please log in to see your movie list.</p>;

  return (
    <>
    <div>
        <p>Movies ({movies.length})</p>
        {movies.length === 0 ? (<p>No movies saved yet.</p>) : (
            movies.map((m) => (
                <div key={m.id}>
                    <div className="flex items-center gap-4 p-4 border-b">
                        <img
                            src={m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : "https://via.placeholder.com/300x450"}
                            alt={m.title}
                            className="w-24 h-auto rounded"
                        />
                        <div>
                            <h3 className="text-lg font-bold">{m.title}</h3>
                            <p className="text-sm text-gray-600">{m.release_date || "Unknown"}</p>
                            <p className="text-sm text-gray-600">{m.overview || "No description available."}</p>
                        </div>
                        <DeleteMovieButton
                            movieId={m.id}
                            movieTitle={m.title}
                            onDelete={(id) => setMovies(movies.filter(movie => movie.id !== id))}
                        />
                    </div>
                </div>
                
        ))
    )}
    </div>
    </>
  )
}
