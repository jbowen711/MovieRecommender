import React from 'react';
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useUser } from '../context/UserContext';
import { useState } from 'react';

export default function SaveMovieButton({ movie }) {

    const { user } = useUser();
    const handleSave = async () => {
        if (!user) {
            alert("Login Before Saving A Movie!")
            return;
        }
        try {
            const movieRef = doc(db, "users", user.uid, "savedMovies", movie.id.toString());
            await setDoc(movieRef, {
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                release_date: movie.release_date,
                overview: movie.overview,
                tagline: movie.tagline,
                vote_average: movie.vote_average,
                genres: movie.genres.map(genre => genre.name),
                addedAt: Date.now()
            });
            alert("Movie saved!")
        } catch (err) {
            console.error("Failed to save movie: ", err);
            alert("Error saving movie.")
        }
    }
    return (
            <button onClick={handleSave} className="mt-6 bg-red-600 text-white border px-4 py-2 rounded shadow hover:bg-red-700 transition">
                Save Movie
            </button>
    )
}
