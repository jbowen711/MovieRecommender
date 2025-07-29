import React from 'react'
import { db } from '../config/firebase'
import { getDocs, collection } from 'firebase/firestore'
import SaveMovieButton from '../components/SaveMovieButton';
import { useState, useEffect } from 'react';

export default function List() {
    const [movieList, setMovieList] = useState([]);

    const moviesCollectionRef = collection(db, "watchedList")
    useEffect (() => {
        const getMovieList = async () => {
            // READ THE DATA FROM DB
            // SET THE MOVIE LIST
            try{
                const data = await getDocs(moviesCollectionRef)
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id}));
                setMovieList(filteredData);
            } catch (err) {
                console.error(err);
            }
        }
        getMovieList();
    }, [])

  return (
    <>
    <div className=''>Movie List</div>
    <div>
        {movieList.map((movie) => (
            <div>
                <h1> {movie.title} </h1>
            </div>
        ))}
    </div>
    <SaveMovieButton/>
    </>
  )
}
