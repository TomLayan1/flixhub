export const TMDB_CONFIG = {
  BASE_URL: process.env.EXPO_PUBLIC_TMDB_BASEURL,
  API_KEY: process.env.EXPO_PUBLIC_FLIXHUB_API_KEY,
  headers: {
    accept: 'application/json',
    authorization: `Bearer ${process.env.EXPO_PUBLIC_FLIXHUB_API_KEY}`
  }
}

export const fetchMovies = async({ query }: { query: any}) => {
  const endpoint = query 
  ? `/search/movie?query=${encodeURIComponent(query)}`
  : '/discover/movie?sort_by=popularity.desc'

  const response = await fetch(`${endpoint}`, {
    method: 'GET',
    headers: TMDB_CONFIG?.headers
  })

  if (!response.ok) {
    // @ts-ignore
    throw new Error('Failed to fetch movies', response.statusText)
  }

  const data = await response.json();
  return data
}