import { createContext, useReducer, useEffect, useContext } from 'react';

// 1. Reducer with duplicate guard
function favouritesReducer(state, action) {
	switch (action.type) {
		case 'ADD_FAVOURITE':
			// Guard against duplicates
			if (state.some((c) => c.cca3 === action.payload.cca3)) {
				return state;
			}
			return [...state, action.payload];
		case 'REMOVE_FAVOURITE':
			return state.filter((c) => c.cca3 !== action.payload);
		default:
			return state;
	}
}

// 2. Context
export const FavouritesContext = createContext();

// 3. Provider
export function FavouritesProvider({ children }) {
	const saved = JSON.parse(localStorage.getItem('favourites') || '[]');
	const [favourites, dispatch] = useReducer(favouritesReducer, saved);

	// 5. useEffect to save to localStorage
	useEffect(() => {
		localStorage.setItem('favourites', JSON.stringify(favourites));
	}, [favourites]);

	return (
		<FavouritesContext.Provider value={{ favourites, dispatch }}>
			{children}
		</FavouritesContext.Provider>
	);
}

// 4. Custom hook useFavourites
export function useFavourites() {
	const context = useContext(FavouritesContext);
	if (!context) {
		throw new Error('useFavourites must be used within a FavouritesProvider');
	}
	return context;
}
