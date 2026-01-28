import { ScrollView,Image, Text, View, ImageBackground, TextInput, ActivityIndicator, FlatList } from 'react-native'
import React from 'react'
import SearchBar from '@/components/SearchBar';
import { useRouter } from 'expo-router';
import { useFetch } from '@/hooks/useFetch';
import { fetchMovies, fetchSeries } from '@/services/api';
import { MovieType, SeriesType } from '@/interfaces';
import MovieCards from '@/components/MovieCards';
import { getTrendingMovies } from '@/services/appwrite';
import TrendingMovieCards from '@/components/TrendingMovies';
import SeriesCards from '@/components/SeriesCards';

// Banner
const BANNER = require('../../assets/flixhubimages/john-wick.jpeg');

const index = () => {
  const router = useRouter();

  const { data: trendingMovies, isLoading: trendingLoadind, error: trendingError } = useFetch(getTrendingMovies);

  const { data: movies, isLoading: moviesLoading, error: moviesError } = useFetch<MovieType[]>(() => fetchMovies({
    query: ""
  }))

  const { data: series, isLoading: seriesLoading, error: seriesError } = useFetch<SeriesType[]>(() => fetchSeries({
    query: ""
  }))
  console.log('Series: ', series)

  if (moviesLoading) {
    return <ActivityIndicator size="large" color="blue" className='mt-10 self-center' />
  }

  if (moviesError) {
    return <Text>Error: {moviesError.message}</Text>
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

        {trendingMovies && (
          <>
            <Text className='text-textDark text-2xl font-bold ml-2 mt-5 mb-2.5'>Trending Movies</Text>
            <FlatList 
              data={trendingMovies}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.movie_id.toString()}
              renderItem={({item, index}) => (
                <TrendingMovieCards {...item} index={index} />
              )}
            />
          </>
        )}

        {/* Recent movies */}
        <View className=''>
          <Text className='text-textDark text-2xl font-bold ml-2 mt-5 mb-2.5'>Movies</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {(movies ?? []).map(movie => (
              <MovieCards {...movie} key={movie.id} />
            ))}
          </ScrollView>
        </View>

        {/* Recent movies */}
        <View className='mb-28'>
          <Text className='text-textDark text-2xl font-bold ml-2 mt-5 mb-2.5'>Series</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {(series ?? []).map(serie => (
              <SeriesCards {...serie} key={serie.id} />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  )
}

export default index