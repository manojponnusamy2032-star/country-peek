## How it works

1. The Home page uses a debounced search input to fetch country data from the RestCountries API. The fetch only triggers after 400ms of no typing, reducing unnecessary API calls.
2. While loading, animated skeleton cards are shown for better UX.
3. If the API returns an error or is unreachable, a user-friendly error message and a Retry button are displayed.
4. Users can star/unstar countries as favourites, which are saved in localStorage and shown on the Favourites page.
5. All interactive elements are keyboard accessible and use ARIA roles for accessibility.
6. The Country Details page shows more info when a card is clicked.
<<<<<<< HEAD
# Demo PR: This line is added on part-2/api-and-cards branch to demonstrate a pull request.
# country-peek
=======
# Demo PR: This line is added on part-2/api-and-cards branch to demonstrate a pull request.
# React + Vite

## CountryPeek Features

- 🔍 Search for countries by name
- 🌗 Toggle between dark and light themes
- 📱 Responsive design
- ⚡ Fast filtering and instant feedback
- 🚫 "No results found" message for empty searches

## Usage

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Screenshots

![Light Theme](public/screenshot-light.png)
![Dark Theme](public/screenshot-dark.png)

---

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)
## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
>>>>>>> 6a4acad (feat: favourites, clear search, back to top, and accessibility improvements)
