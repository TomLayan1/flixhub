import { Image, ScrollView, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import useFetch from '@/hooks/useFetch';
import { fetchMovieDetails } from '@/services/api';
import { DetailsType } from '@/interfaces';

const MovieDetails = () => {
  const { id } = useLocalSearchParams<{ id: string}>();
  const movieId = Number(id);
  console.log(`Movie id is ${id}`);
  const { data: details, isLoading: detailLoading } = useFetch(() => fetchMovieDetails(id as string))
  console.log(details)

  return (
    <ScrollView className='flex-1 bg-darkBg'>
      <Image  
        source={{
          uri: `https://image.tmdb.org/t/p/w500${details?.poster_path}`
        }}
        // resizeMode='contain'
      className='w-full h-[570px]' />
    </ScrollView>
  )
}

export default MovieDetails