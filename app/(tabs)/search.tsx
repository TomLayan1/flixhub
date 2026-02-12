import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router';
import useFetch from '@/hooks/useFetch';
import { fetchMovies } from '@/services/api';
import { MovieType } from '@/interfaces';
import { SafeAreaView } from 'react-native-safe-area-context';
import MovieCards from '@/components/MovieCards';
import SearchBar from '@/components/SearchBar';
import { updateSearchQuery } from '@/services/appwrite';

const search = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("")

  const { data: movies, isLoading, error, refetch, reset } = useFetch<MovieType[]>(() => fetchMovies({
    query: searchQuery
  }), false)

  if (error) {
    return <Text>Error: {error.message}</Text>
  }

  // Refetch movies if there's a search query
  useEffect(() => {
    const timeoutId = setTimeout(async() =>{
      if (searchQuery?.trim()) {
        await refetch();
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId)

  }, [searchQuery])

  useEffect(() => {
    if (movies?.length! > 0 && movies?.[0]) {
      updateSearchQuery(searchQuery, movies[0])
    }
  }, [movies])

  return (
    <SafeAreaView className='flex-1 bg-darkBg px-2 pt-20'>
      <SearchBar
        placeholder='Search for a movie...'
        value={searchQuery ?? ""}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <FlatList 
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'center',
          marginVertical: 6
        }}
        // Render movie card
        renderItem={({item}) => (
          <View>
            <MovieCards {...item} />
          </View>
        )}
        ListHeaderComponent={() => (
          <>
            {isLoading && (<ActivityIndicator size="large" color="#0077B6" className='mt-10 self-center' />)}
            {!isLoading && !error && movies && movies?.length > 0 && (
              <Text className='text-lightText text-2xl font-bold ml-2 mt-4 mb-2'>Search Result for {searchQuery}</Text>
            )}
          </>
        )}
        // If there's not result from search
        ListEmptyComponent={() => (
          <>
            {!isLoading && !error ? (
              <Text className='text-grayText text-lg text-center mt-10'>{searchQuery?.trim() ? "No movie found" : "Search for a movie"}</Text>
            ) : null}
          </>
        )}
      />
    </SafeAreaView>
  )
}

export default search