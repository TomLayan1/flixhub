import { Client, Databases, ID, Query } from 'react-native-appwrite';
import { MovieType, TrendingMoviesType } from "@/interfaces";

const ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!;
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_METRIX_ID!;
const SAVED_ID = process.env.EXPO_PUBLIC_APPWRITE_SAVED_ID!;

const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID)

const database = new Databases(client);

type SavedInputsType = {
  movie_id: number;
  title: string;
  poster_path: string
}
type SavedMovieDocType = {
  $id: string;
  movie_id: number;
  title: string;
  poster_url: string;
}

type GetSavedMoviesType = {
  limit?: number; //How many to fetch per page
  cursorId: string;
  order: "newest" | "oldest"
}

// Track user search
export const updateSearchQuery = async(query: string, movies: MovieType ) => {
  const result = await database.listDocuments({
    databaseId: DATABASE_ID,
    collectionId: COLLECTION_ID,
    queries: [
      Query.equal('movie_id', movies.id),
      Query.limit(1)
    ],
  });

  console.log(result);

  
  try{
    if (result.documents.length > 0 && movies) {
      // Check if a record of the search is stored in appwrite database
      // If record is found, increase search count
      const existingMovies = result.documents[0];
  
      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovies.$id,
        {
          count: existingMovies.count + 1
        }
      )
    } else {
      // If not found, add search to database
      await database.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          search_term: query,
          count: 1,
          poster_url: `https://image.tmdb.org/t/p/w500${movies.poster_path}`,
          movie_id: movies.id,
          title: movies.title
        }
      )
    }
  }
  catch(err) {
    console.log(err);
    throw err;
  }
}



export const getTrendingMovies = async(): Promise<TrendingMoviesType[] | undefined> => {
  try {
    const result = await database.listDocuments({
      databaseId: DATABASE_ID,
      collectionId: COLLECTION_ID,
      queries: [
        Query.limit(5),
        Query.orderDesc('count')
      ],
    });

    return result?.documents as unknown as TrendingMoviesType[];
  }
  catch(err) {
    console.log(err);
    return undefined
  }
}

export const toggleSavedMovies = async (movie: SavedInputsType) => {
  try {
    const movieId = Number(movie.movie_id);

    if(!Number.isFinite(movieId)) {
      throw new Error(`toggleSavedMovies: invalid movie_id: ${movie.movie_id}`);
    }

    const result = await database.listDocuments(
      DATABASE_ID,
      SAVED_ID,
      [
        Query.equal("movie_id", movieId),
        Query.limit(1),
        Query.select(["$id", "movie_id", "title", "poster_url"])
      ]
    );

    const existing = result.documents?.[0];

    if (existing) {
      await database.deleteDocument(DATABASE_ID, SAVED_ID, existing.$id);
      return { saved: false, movie: null };
    }

    const created = await database.createDocument(
      DATABASE_ID,
      SAVED_ID,
      ID.unique(),
      {
        poster_url: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "",
        movie_id: movie.movie_id,
        title: movie.title,
      }
    );

    // Return only the fields you want (no $createdAt, etc.)
    return {
      saved: true,
      movie: {
        id: created.movie_id,
        title: created.title,
        poster_path: created.poster_url
          ? created.poster_url.replace("https://image.tmdb.org/t/p/w500", "")
          : "",
      },
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getSavedMovies = async () => {
  try {
    const result = await database.listDocuments(
      DATABASE_ID,
      SAVED_ID,
      [
        Query.limit(100), // adjust as needed
        Query.select(["movie_id", "title", "poster_url"]),
      ]
    );

    // Normalize into the same shape used elsewhere in your app
    return (result.documents ?? []).map((doc: any) => ({
      id: Number(doc.movie_id),
      title: doc.title ?? "",
      poster_path: doc.poster_url
        ? String(doc.poster_url).replace("https://image.tmdb.org/t/p/w500", "")
        : "",
    }));
  } catch (err) {
    console.log(err);
    throw err;
  }
};