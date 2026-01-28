export const TMDB_CONFIG = {
  BASE_URL: process.env.EXPO_PUBLIC_TMDB_BASEURL,
  API_KEY: process.env.EXPO_PUBLIC_TMDB_READ_TOKEN,
  headers: {
    accept: 'application/json',
    authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_READ_TOKEN}`
  }
}

// Fetch movies
export const fetchMovies = async({ query }: { query: any}) => {
  const endpoint = query 
  ? `/search/movie?query=${encodeURIComponent(query)}`
  : '/discover/movie?sort_by=popularity.desc'

  const response = await fetch(`${TMDB_CONFIG.BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: TMDB_CONFIG?.headers
  })

  if (!response.ok) {
    // @ts-ignore
    throw new Error(`Failed to fetch movies: ${response.statusText}`)
  }

  const data = await response.json();
  return data.results;
}

// Fetch series
export const fetchSeries = async ({ query }: { query: any }) => {
  const endpoint = query
    ? `/search/tv?query=${encodeURIComponent(query)}`
    : '/discover/tv?sort_by=popularity.desc'

  const response = await fetch(`${TMDB_CONFIG.BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: TMDB_CONFIG?.headers
  })

  if (!response.ok) {
    // @ts-ignore
    throw new Error(`Failed to fetch movies: ${response.statusText}`)
  }

  const data = await response.json();
  return data.results;
}

// Fetch movie details
export const fetchMovieDetails = async({id}: { id: number}) => {
  const endpoint = `/keyword/${encodeURIComponent(id)}`;

  const response = await fetch(`${TMDB_CONFIG.BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: TMDB_CONFIG.headers
  })

  if (!response.ok) {
    throw new Error(`Movie details cannot be found: ${response.statusText}`)
  }

  const data = await response.json();
  return data
}
