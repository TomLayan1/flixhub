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

export type savedInputs = {
  id: number;
  title: string;
  poster_path: string | null
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

export const toggleSavedMovies = async( movies: savedInputs ) => {
  try {
    const result = await database.listDocuments(
      DATABASE_ID,
      SAVED_ID,
      [
        Query.equal('movie_id', movies.id),
        Query.limit(1)
      ],
    );
    console.log(result);
    
    if (result.documents.length > 0 && movies) {
      // Check if the movie is already saved
      // If movie is found keep the movie
      const docId = result.documents[0].$id;
  
      await database.deleteDocument(
        DATABASE_ID,
        COLLECTION_ID,
        docId,
      )
  
      return { saved: false }
    }

    // If not found, add search to database
    await database.createDocument(
      DATABASE_ID,
      SAVED_ID,
      ID.unique(),
      {
        poster_url: movies?.poster_path ? `https://image.tmdb.org/t/p/w500${movies.poster_path}` : null,
        movie_id: movies.id,
        title: movies.title
      }
    )

    return { saved: true}
  }
  catch (err) {
    throw err
  }
}

export const getSavedMovies = async (): Promise<TrendingMoviesType[] | undefined> => {
  try {
    const result = await database.listDocuments(
      DATABASE_ID,
      SAVED_ID,
      [Query.limit(5)],
    );

    return result?.documents as unknown as TrendingMoviesType[];
  }
  catch (err) {
    console.log(err);
    return undefined
  }
}
