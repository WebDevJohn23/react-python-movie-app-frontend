import React, {useEffect, useState} from "react";
import "./App.css";

function App() {
    const [movies, setMovies] = useState([]);
    const [hideSpecialScreenings, setHideSpecialScreenings] = useState(true);
    const [loading, setLoading] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = () => {
        setLoading(true);
        fetch(`${API_URL}/api/movies`)
            .then(r => r.json())
            .then(data => {
                setMovies(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    const filterMovies = (movie) => {
        if (!hideSpecialScreenings) return true;

        const keywords = [
            "Anniversary",
            "Re-Release",
            "Early Access",
            "Sensory",
            "Double Feature",
            "(Dub)",
            "(Sub)",
            "Rerelease",
            "First Day First Show",
            "Prime Early Access",
        ];

        return !keywords.some((keyword) => {
            const titleUpper = movie.title.toUpperCase();
            const keywordUpper = keyword.toUpperCase();
            return titleUpper.includes(keywordUpper) && titleUpper !== keywordUpper;
        });
    };

    const filteredMovies = movies.filter(filterMovies);

    const handleStatusChange = (code, newStatus) => {
        fetch(`${API_URL}/api/movies/${code}/status`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({status: newStatus})
        })
            .then(r => r.json())
            .then(() => {
                // Remove movie from view after status change
                setMovies(movies.filter(m => m.code !== code));
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="app-container">
            <h1>React Movie App</h1>

            <div className="filter-controls">
                <label>
                    <input
                        type="checkbox"
                        checked={hideSpecialScreenings}
                        onChange={(e) => setHideSpecialScreenings(e.target.checked)}
                    />{" "}
                    Hide special screenings, re-releases, and alternate versions
                </label>
            </div>

            <p className="movie-count">
                Showing {filteredMovies.length} of {movies.length} movies
            </p>

            <div className="wdj-header">
                <h2>In Theaters</h2>
            </div>
            {loading && <p>Loading movies...</p>}
            {!loading && (
                <div className="wdj">
                    {filteredMovies.map((movie, index) => (
                        <div key={movie.code} id={movie.code} className="movie-row">
                            <div className="poster-cell">
                                <div className="flip-box">
                                    <div className="flip-box-inner">
                                        <div className="flip-box-front">
                                            <img
                                                className="wdj-image poster-img shadow"
                                                src={movie.poster}
                                                alt={movie.title}
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="flip-box-back">
                                            <br/>
                                            <div onClick={() => handleStatusChange(movie.code, 2)}>
                                                <h2>Watched</h2>
                                            </div>
                                            <br/>
                                            <div onClick={() => handleStatusChange(movie.code, 1)}>
                                                <h2>Not Interested</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={`details-cell shadow ${index % 2 === 0 ? "even" : "odd"}`}
                            >
                                <h2 className="movie-title">
                                    <a href={movie.url} target="_blank" rel="noopener noreferrer">
                                        {movie.title}
                                    </a>
                                </h2>
                                <div className="details-content">
                                    <div className="movie-date">{movie.dateStarted || "TBA"}</div>
                                    <div className="theater-list">
                                        {movie.theaters.slice(0, 6).map((theater, i) => (
                                            <div key={i} className="theater-item">
                                                {theater}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default App;