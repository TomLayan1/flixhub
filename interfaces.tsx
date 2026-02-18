
export interface TrendingMoviesType {
  movie_id: number;
  poster_url: string;
  title: string
}
export interface MovieType {
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
export interface SeriesType {
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
interface companies {
  id: number;
  name: string;
}
export interface DetailsType {
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;

  origin_country: string;
  genres: string[];
  budget: number;
  revenue: number;
  production_companies: companies[]
}
export interface PlanType {
  id: number;
  name: string;
  trialPeriod: number;
  amount: number
}