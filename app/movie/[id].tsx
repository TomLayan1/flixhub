import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import useFetch from '@/hooks/useFetch';
import { fetchMovieDetails } from '@/services/api';
import { DetailsType } from '@/interfaces';
import { Ionicons } from '@expo/vector-icons';

const MovieDetails = () => {
  const { id } = useLocalSearchParams<{ id: string}>();
  const { data: details, isLoading: detailLoading } = useFetch(() => fetchMovieDetails(id as string))
  console.log(details)

  return (
    <ScrollView className='flex-1 bg-darkBg'>
      {detailLoading ? (
        <ActivityIndicator size="large" color="blue" className='mt-10 self-center' />
      ):(
        <View className='flex-1'>
          <View className='w-full h-[550px] mb-4 relative'>
            <Image  
              source={{
                uri: `https://image.tmdb.org/t/p/w500${details?.poster_path}`
              }}
              // resizeMode='contain'
              className='w-full h-full mb-8'
            />
              <TouchableOpacity className='w-[50px] h-[50px] border-4 border-white flex-row items-center justify-center rounded-full  absolute bottom-5 right-5'>
                <Ionicons name='play' size={30} color='white' />
              </TouchableOpacity>
          </View>
          <View className='w-full px-3'>
            <Text className='text-textDark text-2xl font-bold mb-3'>{details?.title}</Text>
              <View className='flex-row gap-1 mb-3'>
                <Ionicons name='star' size={16} color='#0077B6' />
                <Text className='text-textDark text-xl'>{details?.vote_average}</Text>
              </View>
            <View className='flex-row gap-5 mb-5'>
              <Text className='text-textDark bg-blueColor/15 border border-blueColor p-3 rounded-full'>{details?.origin_country}</Text>
              <Text className='text-textDark bg-blueColor/15 border border-blueColor p-3 rounded-full'>{details?.release_date.split('-')[0]}</Text>
              <View className='flex-row gap-5'>
                {details?.genres?.map((genre: any) => (
                  <Text key={genre.id} className='text-textDark bg-blueColor/15 border border-blueColor p-3 rounded-full'>{genre.name}</Text>
                ))}
              </View>
            </View>
            <View className='mb-5'>
              <Text className='text-blueColor text-2xl mb-3'>Overview</Text>
              <Text className='text-textDark text-lg'>{details?.overview}</Text>
            </View>
            <View className='flex-row gap-14 mb-3'>
                {details?.budget > 0 && <View className=''>
                <Text className='text-blueColor text-lg mb-1'>Budget</Text>
                <Text className='text-textDark text-lg'>{`${details?.budget / 1_000_000} million`}</Text>
              </View>}
                {details?.revunue > 0 && <View className=''>
                  <Text className='text-blueColor text-lg mb-1'>Revenue</Text>
                  <Text className='text-textDark text-lg'>{`${details?.revunue / 1_000_000} million`}</Text>
              </View>}
            </View>
            <View>
              <Text className='text-blueColor text-lg mb-2'>Production Companies</Text>
              <View className='flex-row flex-wrap gap-5'>
                {details?.production_companies?.map((companies: any) => (
                  <Text key={companies.id} className='text-textDark bg-blueColor/15 border border-blueColor p-3 rounded-full'>{companies.name}</Text>
                ))}
              </View>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  )
}

export default MovieDetails