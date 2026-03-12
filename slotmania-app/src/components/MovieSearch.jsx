import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../store/favoritesSlice';
import Input from './Input';
import styles from './MovieSearch.module.css';

const API_KEY = '69fff89e-6594-40fb-88a9-55c91e4528a2';
const API_URL = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword';

const GENRES = [
    { value: 'all', label: 'All Genres' },
    { value: 'драма', label: 'Drama' },
    { value: 'комедия', label: 'Comedy' },
    { value: 'боевик', label: 'Action' },
    { value: 'триллер', label: 'Thriller' },
    { value: 'фантастика', label: 'Sci-Fi' },
];

const MovieSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('all');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const favoriteMovies = useSelector((state) => state.favorites.favoriteMovies);


    useEffect(() => {
        handleSearch('Кино');
    }, []);

    const handleSearch = async (query) => {
        if (!query) return;
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}?keyword=${encodeURIComponent(query)}`, {
                headers: {
                    'X-API-KEY': API_KEY,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                if (response.status === 401) throw new Error('Unauthorized: Invalid API Key');
                throw new Error('Failed to fetch movies');
            }
            const data = await response.json();
            setMovies(data.films || []);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchTerm.length >= 2) {
                handleSearch(searchTerm);
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    const filteredMovies = movies.filter(movie => {
        if (selectedGenre === 'all') return true;
        return movie.genres && movie.genres.some(g => g.genre.toLowerCase() === selectedGenre.toLowerCase());
    });

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Kinopoisk Movie Search</h2>

            <div className={styles.controls}>
                <Input
                    label="Search Movies"
                    placeholder="Type movie title..."
                    value={searchTerm}
                    onChange={setSearchTerm}
                />
                <Input
                    label="Filter by Genre"
                    value={selectedGenre}
                    onChange={setSelectedGenre}
                    options={GENRES}
                />
            </div>

            {loading && <div style={{ textAlign: 'center' }}>Searching...</div>}
            {error && <div className={styles.error}>{error}</div>}

            <div className={styles.grid}>
                {filteredMovies.length > 0 ? (
                    filteredMovies.map((movie) => {
                        const isFavorite = favoriteMovies.includes(movie.filmId);
                        return (
                            <div key={movie.filmId} className={styles.movieCard}>
                                <div className={styles.posterContainer}>
                                    <img src={movie.posterUrlPreview} alt={movie.nameRu} className={styles.poster} />
                                    <button
                                        className={`${styles.favoriteBtn} ${isFavorite ? styles.isFavorite : ''}`}
                                        onClick={() => dispatch(toggleFavorite(movie.filmId))}
                                        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                                    >
                                        {isFavorite ? '❤️' : '🤍'}
                                    </button>
                                </div>
                                <div className={styles.info}>
                                    <h3 className={styles.movieTitle}>{movie.nameRu || movie.nameEn}</h3>
                                    <div className={styles.movieMeta}>
                                        <span>{movie.year}</span>
                                        {movie.rating && movie.rating !== 'null' && (
                                            <div className={styles.rating}>{movie.rating}</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    !loading && <div className={styles.noResults}>No movies found for your criteria.</div>
                )}
            </div>
        </div>
    );
};

export default MovieSearch;
