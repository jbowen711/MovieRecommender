import React from 'react';
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useUser } from '../context/UserContext';

export default function SaveMovieButton() {

    const { user } = useUser();
    const handleSave = async () => {
        if (!user){
            alert("Login Before Saving A Movie!")
            return;
        }
        try {
            const movieRef = doc(db, "users", user.uid, "savedMovies", "testMovie123");
            await setDoc(movieRef, {
                title: "Test Movie",
                genre: "Action",
                addedAt: Date.now(),
            });
            alert("Movie saved!")
        } catch (err){
            console.error("Failed to save movie: ", err);
            alert("Error saving movie.")
        }
    }
  return (
    <div>
        <button onClick={handleSave}>Save Test Movie</button>
    </div>
  )
}
