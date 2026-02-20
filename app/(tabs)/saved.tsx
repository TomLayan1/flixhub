import { FlatList, Pressable, View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { useFetch } from '@/hooks/useFetch';
import { Ionicons } from '@expo/vector-icons';
import { getSavedMovies } from '@/services/appwrite';
import SavedCard from '@/components/saved/savedCard';

const saved = () => {
  const router = useRouter();

  const { data: savedMovies, isLoading: savedLoading, error: savedError } = useFetch(getSavedMovies);
  console.log('Saved movies', savedMovies)

  return (
    <View 
      className='flex-1 bg-darkBg pt-14 px-4'
    >
      <View className='flex-row mb-7'>
        <Pressable onPress={() => router.back()}>
          <Ionicons name='chevron-back' size={20} color='#FFFFFF' />
        </Pressable>
        <View className='flex-1'>
          <Text className='text-lightText text-2xl text-center font-bold'>Saved</Text>
        </View>
      </View>

      {/* Loading State */}
      {savedLoading && (
        <ActivityIndicator size="large" color="#FFFFFF" />
      )}

      {/* Error State */}
      {savedError && (
        <Text className="text-red-500 text-center">
          Failed to load saved movies.
        </Text>
      )}

      {/* Empty State */}
      {!savedLoading && !savedError && savedMovies?.length === 0 && (
        <Text className="text-lightText text-center">
          No saved movies yet.
        </Text>
      )}

      {/* List */}
      {!savedLoading && !savedError && (
        <FlatList
          data={savedMovies ?? []}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <SavedCard 
              id={item.id}
              posterUrl={item.poster_path}
              title={item.title}
            />
          )}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      )}
    </View>
  )
}

export default saved