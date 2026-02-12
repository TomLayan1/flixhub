import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';

export interface MovieCardsType {
  id: number;
  original_name: string;
  poster_path?: string
  vote_average: number
  first_air_date: string
}

const SeriesCards: React.FC<MovieCardsType> = ({ id, original_name, poster_path, vote_average, first_air_date }) => {
  // console.log(poster_path)
  return (
    <Link href={`/movie/${id}`} asChild>
      <TouchableOpacity className='w-[140px] flex-col'>
        <View className='w-full h-56 mb-2 rounded-lg overflow-hidden'>
          <Image
            // source={BANNER}
            source={{
              uri: poster_path
                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                : 'https://placehold.co/600*400/1a1a1a/ffffff.png'
            }}
            className='w-full h-full'
            resizeMode='contain'
          />
        </View>
        <View className='pl-1'>
          <Text
            className='text-lightText text-lg mb-1'
            numberOfLines={1}
          >{original_name}</Text>
          <View className='flex-row'>
            <Ionicons name='star' size={14} color='#0077B6' />
            <Text className='text-blueColor'>{Math.round(vote_average / 2)}</Text>
          </View>
          <Text className='text-grayText'>{first_air_date?.split('-')[0]}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  )
}

export default SeriesCards