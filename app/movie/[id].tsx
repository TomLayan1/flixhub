import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useMemo, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import useFetch from '@/hooks/useFetch';
import { fetchMovieDetails } from '@/services/api';
import { toggleSavedMovies } from '@/services/appwrite';
import { Ionicons } from '@expo/vector-icons';
import { DetailsType } from '@/interfaces';

const MovieDetails = () => {
  const { id } = useLocalSearchParams<{ id: string}>();
  const { data: details, isLoading: detailLoading } = useFetch<DetailsType>(() => fetchMovieDetails(id as string))

  const [saving, setSaving] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean | null>(null);

  const movieForSaved = useMemo(() => {
    if (!details) return null;

    return {
      id: details.id,
      title: details.title,
      poster_path: details.poster_path,
    }
  }, [details]);

  const onPressSaved = async() => {
    if (!details) return;
    console.log('Testing: ', movieForSaved?.id)
    try{
      setSaving(true);
      if (movieForSaved) {
        const response = await toggleSavedMovies({
          id: details.id,
          title: details.title,
          poster_path: details.poster_path
        })
        setSaved(response?.saved)
      }
    }
    catch(err) {
      throw err
    }
    finally {
      setSaving(false)
    }
  }

  return (
    <ScrollView className='flex-1 bg-darkBg'>
      {detailLoading ? (
        <ActivityIndicator size="large" color="blue" className='mt-10 self-center' />
      ):(
        <View className='flex-1 pb-14'>
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
            <Text className='text-lightText text-2xl font-bold mb-3'>{details?.title}</Text>
              <View className='flex-row gap-1 mb-3'>
                <Ionicons name='star' size={16} color='#0077B6' />
                <Text className='text-lightText text-xl'>{details?.vote_average}</Text>
              </View>
            <View className='flex-row gap-5 mb-5'>
              <Text className='text-lightText bg-blueColor/15 border border-blueColor p-3 rounded-full'>{details?.origin_country}</Text>
              <Text className='text-lightText bg-blueColor/15 border border-blueColor p-3 rounded-full'>{details?.release_date.split('-')[0]}</Text>
              <View className='flex-row gap-5'>
                {details?.genres?.map((genre: any) => (
                  <Text key={genre.id} className='text-lightText bg-blueColor/15 border border-blueColor p-3 rounded-full'>{genre.name}</Text>
                ))}
              </View>
            </View>
            <TouchableOpacity
              onPress={onPressSaved}
              disabled={saving}
              className='w-[80px] flex-row items-center gap-2 bg-blueColor/15 border border-blueColor rounded-full p-3 mb-6'>
              <Ionicons name='bookmark-outline' color='#0077B6' size={19} />
              <Text className='text-lightText'>{saving ? 'Saving...' : saved ? 'Saved' : 'Save'}</Text>
            </TouchableOpacity>
            <View className='mb-5'>
              <Text className='text-blueColor text-2xl mb-3'>Overview</Text>
              <Text className='text-lightText text-lg'>{details?.overview}</Text>
            </View>
            <View className='flex-row gap-14 mb-3'>
              {details?.budget && details.budget > 0 && 
              <View className=''>
                <Text className='text-blueColor text-lg mb-1'>Budget</Text>
                <Text className='text-lightText text-lg'>{`${details.budget / 1_000_000} million`}</Text>
              </View>}
              {details?.revenue && details.revenue > 0 && <View className=''>
              <Text className='text-blueColor text-lg mb-1'>Revenue</Text>
              <Text className='text-lightText text-lg'>{`${details.revenue / 1_000_000} million`}</Text>
            </View>}
            </View>
            <View>
              <Text className='text-blueColor text-lg mb-2'>Production Companies</Text>
              <View className='flex-row flex-wrap gap-5'>
                {details?.production_companies?.map((companies: any) => (
                  <Text key={companies.id} className='text-lightText bg-blueColor/15 border border-blueColor p-3 rounded-full'>{companies.name}</Text>
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