import { ScrollView,Image, Text, View, ImageBackground, TextInput, ActivityIndicator, FlatList } from 'react-native'
import React from 'react'
import SearchBar from '@/components/SearchBar';
import { useRouter } from 'expo-router';
import { useFetch } from '@/hooks/useFetch';
import { fetchMovies } from '@/services/api';
import { MovieType } from '@/interfaces';
import MovieCards from '@/components/MovieCards';

// Banner
const BANNER = require('../../assets/flixhubimages/john-wick.jpeg');

const index = () => {
  const router = useRouter();

  const { data: movies, isLoading, error } = useFetch<MovieType[]>(() => fetchMovies({
    query: ""
  }))
  console.log('Movies', movies);

  if (isLoading) {
    return <ActivityIndicator size="large" color="blue" className='mt-10 self-center' />
  }

  if (error) {
    return <Text>Error: {error.message}</Text>
  }

  return (
    <View className='flex-1 bg-darkBg'>
      <ScrollView className='flex-1'
        showsVerticalScrollIndicator={false}
      >
        <View className='w-full h-[450px]'>
          <ImageBackground source={BANNER} className='w-full h-full' />
            <SearchBar
              onPress={() => router.push('/search')}
              placeholder='Search for a movie'
            />
        </View>

        {/* Recent movies */}
        <View className=''>
          <Text className='text-textDark text-2xl font-bold ml-2 mt-5 mb-2.5'>Recent view</Text>
          <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          // contentContainerStyle={{ paddingHorizontal:  }}
          >
            {(movies ?? []).map(movie => (
              <MovieCards {...movie} key={movie.id} />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  )
}

export default index