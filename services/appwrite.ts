import { Client, Databases, ID, Query } from 'react-native-appwrite';
import { MovieType } from "@/interfaces";
const ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!;
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_METRIX_ID!;

const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID)

const database = new Databases(client);
// Track user search
export const updateSearchQuery = async(query: string, movies: MovieType ) => {
  const result = await database.listDocuments({
    databaseId: DATABASE_ID,
    collectionId: COLLECTION_ID,
    queries: [
      Query.equal('search_term', query)
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