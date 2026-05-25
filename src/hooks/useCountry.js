import { useState, useEffect } from 'react';

// Custom hook to fetch a single country by code
function useCountry(code) {
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If no code, do nothing
    if (!code) return;
    // Reset loading and error before each fetch
    setLoading(true);
    setError(null);
    // Fetch country by code from RestCountries API
    fetch(`https://restcountries.com/v3.1/alpha/${code}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => {
        // The API returns an array, take the first item
        setCountry(data[0]);
        setError(null);
      })
      .catch(() => {
        setCountry(null);
        setError('Country not found.');
      })
      .finally(() => setLoading(false));
  }, [code]);

  // Return country data, loading state, and error
  return { country, loading, error };
}

export default useCountry;
