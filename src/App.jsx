import React, {useEffect, useState} from "react";
import "./App.css";

function App() {
    const [inTheaters, setInTheaters] = useState([]);
    const [watched, setWatched] = useState([]);
    const [notInterested, setNotInterested] = useState([]);
    const [hideSpecialScreenings, setHideSpecialScreenings] = useState(true);
    const [loading, setLoading] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

    useEffect(() => {
        fetchAllMovies();
    }, []);

    const fetchAllMovies = () => {
        setLoading(true);
        Promise.all([
            fetch(`${API_URL}/api/movies/status/0`).then(r => r.json()),
            fetch(`${API_URL}/api/movies/status/2`).then(r => r.json()),
            fetch(`${API_URL}/api/movies/status/1`).then(r => r.json())
        ])
            .then(([theaters, watchedMovies, notInterestedMovies]) => {
                setInTheaters(theaters);
                setWatched(watchedMovies);
                setNotInterested(notInterestedMovies);
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

    const handleStatusChange = (code, currentStatus, newStatus) => {
        fetch(`${API_URL}/api/movies/${code}/status`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({status: newStatus})
        })
            .then(r => r.json())
            .then(() => {
                // Remove from current list
                if (currentStatus === 0) {
                    setInTheaters(inTheaters.filter(m => m.code !== code));
                } else if (currentStatus === 2) {
                    setWatched(watched.filter(m => m.code !== code));
                } else if (currentStatus === 1) {
                    setNotInterested(notInterested.filter(m => m.code !== code));
                }
                // Refresh all sections to add to new list
                fetchAllMovies();
            })
            .catch(err => console.error(err));
    };

    const renderFlipBackButtons = (movie, currentStatus) => {
        if (currentStatus === 0) {
            return (
                <>
                    <br/>
                    <div onClick={() => handleStatusChange(movie.code, 0, 2)}>
                        <h2>Watched</h2>
                    </div>
                    <br/>
                    <div onClick={() => handleStatusChange(movie.code, 0, 1)}>
                        <h2>Not Interested</h2>
                    </div>
                </>
            );
        } else if (currentStatus === 2) {
            return (
                <>
                    <br/>
                    <div onClick={() => handleStatusChange(movie.code, 2, 0)}>
                        <h2>Not Watched</h2>
                    </div>
                    <br/>
                    <div onClick={() => handleStatusChange(movie.code, 2, 1)}>
                        <h2>Not Interested</h2>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <br/>
                    <div onClick={() => handleStatusChange(movie.code, 1, 2)}>
                        <h2>Watched</h2>
                    </div>
                    <br/>
                    <div onClick={() => handleStatusChange(movie.code, 1, 0)}>
                        <h2>Not Watched</h2>
                    </div>
                </>
            );
        }
    };

    const renderSection = (movieList, heading, status) => {
        const filteredMovies = movieList.filter(filterMovies);

        return (
            <div className="section">
                <div className="wdj-header">
                    <h2>{heading}</h2>
                </div>

                {filteredMovies.length === 0 ? (
                    <p>No movies found.</p>
                ) : (
                    <div className="wdj">
                        <p className="movie-count">
                            Showing {filteredMovies.length} of {movieList.length} movies
                        </p>
                        {filteredMovies.map((movie, index) => (
                            <div key={movie.code} id={movie.code} className="movie-row">
                                <div className="poster-cell">
                                    <div className="flip-box">
                                        <div className="flip-box-inner">
                                            <div className="flip-box-front">
                                                <img
                                                    className="wdj-image poster-img shadow"
                                                    src={movie.poster || "https://www.nyfa.edu/wp-content/uploads/2022/11/Blank-Movie-Poster1.jpg"}
                                                    alt={movie.title}
                                                    loading="lazy"
                                                />
                                            </div>
                                            <div className="flip-box-back">
                                                {renderFlipBackButtons(movie, status)}
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
                                        <div className="movie-date">{movie.date_started || "TBA"}</div>
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
                In Theaters: {inTheaters.filter(filterMovies).length} |
                Watched: {watched.filter(filterMovies).length} |
                Not Interested: {notInterested.filter(filterMovies).length}
            </p>

            {loading && <p>Loading movies...</p>}
            {!loading && (
                <>
                    {renderSection(inTheaters, "In Theaters", 0)}
                    {renderSection(watched, "Watched Movies", 2)}
                    {renderSection(notInterested, "Not Interested", 1)}
                </>
            )}
        </div>
    );
}

export default App;