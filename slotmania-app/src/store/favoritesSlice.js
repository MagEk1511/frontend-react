import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    favoriteMovies: [], // Stores movie IDs
};

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        toggleFavorite: (state, action) => {
            const movieId = action.payload;
            const index = state.favoriteMovies.indexOf(movieId);
            if (index >= 0) {
                // Remove if already favorite
                state.favoriteMovies.splice(index, 1);
            } else {
                // Add if not favorite
                state.favoriteMovies.push(movieId);
            }
        },
    },
});

export const { toggleFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
