import React from 'react'
import { useState } from 'react';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useUser } from '../context/UserContext';

export default function DeleteMovieButton({movieId, movieTitle, onDelete}) {

    const [isDeleting, setIsDeleting] = useState(false);
    const { user } = useUser();
    const handleDelete = async () => {
        if (!user || !movieId) {
            console.error("User not logged in or movie ID is missing.");
            return;
        }

        try {
            setIsDeleting(true);
            const movieRef = doc(db, "users", user.uid, "savedMovies", movieId.toString());
            await deleteDoc(movieRef);
            console.log(`Movie "${movieTitle}" deleted successfully.`);
            if (onDelete) {
                onDelete(movieId);
            }
        } catch (error) {
            console.error("Error deleting movie:", error);
            alert("Failed to delete movie. Please try again.");
        } finally {
            setIsDeleting(false);
        }
    }

    const handleClick = (e) => {
        e.stopPropagation();
        const confirmDelete = window.confirm(`Are you sure you want toe delete "${movieTitle}"?`);
        if (confirmDelete) {
            handleDelete();
        }
    };


    return (
        <button
            onClick={handleClick}
            disabled={isDeleting || !user}
            className={`bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition ${isDeleting ? "opacity-50 cursor-not-allowed" : ""}`}>
            {isDeleting ? "Deleting..." : "Delete Movie"}
        </button>
            
    )
}
