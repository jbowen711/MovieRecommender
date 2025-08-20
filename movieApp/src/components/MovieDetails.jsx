import SaveMovieButton from "./SaveMovieButton";

export default function MovieDetails({ movie, onClose }) {
    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center px-4" onClick={onClose}>
            <div
                className="bg-white rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-black text-3xl z-10"
                >
                    &times;
                </button>

                <div className="flex flex-col md:flex-row">
                    {/* Poster w/ rating */}
                    <div className="relative md:w-1/2 w-full">
                        <img
                            src={
                                movie.poster_path
                                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                    : "https://via.placeholder.com/300x450"
                            }
                            alt={movie.title}
                            className="w-full h-auto rounded-t md:rounded-l-lg md:rounded-tr-none"
                        />
                        <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded shadow">
                            ⭐ {movie.vote_average?.toFixed(1) || "N/A"} / 10
                        </div>
                    </div>

                    {/* Info Content */}
                    <div className="p-6 text-center md:text-left md:w-1/2 flex flex-col justify-between">
                        <div>
                            <h2 className="text-2xl text-gray-800 font-bold">{movie.title}</h2>
                            <h3 className="text-sm text-gray-600 italic">{movie.tagline}</h3>
                            <p className="text-sm text-gray-600 mt-2">
                                Release Date: {movie.release_date || "Unknown"}
                            </p>
                            {movie.genres && movie.genres.length > 0 && (
                                <p className="text-sm text-gray-600">
                                Genres: {movie.genres?.length > 0 ? movie.genres.map(g => g.name).join(" | ") : "Unknown"}
                                </p>)}
                            <p className="text-gray-900 mt-4">{movie.overview || "No description available."}</p>
                        </div>
                        <SaveMovieButton movie={movie} />
                    </div>
                </div>
            </div>
        </div>
    );
}
