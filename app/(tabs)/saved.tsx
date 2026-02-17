import { FlatList, Pressable, View, Text } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { useFetch } from '@/hooks/useFetch';
import { Ionicons } from '@expo/vector-icons';
import { getSavedMovies, getTrendingMovies } from '@/services/appwrite';
import SavedCard from '@/components/saved/savedCard';

const saved = () => {
  const router = useRouter();

    const { data: trendingMovies, isLoading: trendingLoadind, error: trendingError } = useFetch(getSavedMovies);
    console.log(trendingMovies);
  
  return (
    <View 
      // showsVerticalScrollIndicator={false}
      className='flex-1 bg-darkBg pt-14 px-6'
    >
      <View className='flex-row mb-7'>
        <Pressable onPress={() => router.back()}>
          <Ionicons name='chevron-back' size={25} color='#FFFFFF' />
        </Pressable>
        <View className='flex-1'>
          <Text className='text-lightText text-2xl text-center font-bold'>Saved</Text>
        </View>
      </View>

      <FlatList
        data={trendingMovies}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.movie_id.toString()}
        renderItem={({ item, index }) => {
          return (
            <SavedCard {...item} index={index}  />
          );
        }}
      />
    </View>
  )
}

export default saved