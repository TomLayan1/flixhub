import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
const BANNER = require('../assets/flixhubimages/john-wick.jpeg')


export interface MovieCardsType {
  id: number;
  title: string;
  poster_path?: string
  vote_average: number
  release_date: string
}

const MovieCards: React.FC<MovieCardsType> = ({ id, title, poster_path, vote_average, release_date }) => {
  // console.log(poster_path)
  return (
    <Link href={`/movie/${id}`} asChild>
      <TouchableOpacity  className='w-[140px] flex-col'>
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
            className='text-textDark text-lg mb-1'
            numberOfLines={1}
          >{title}</Text>
          <View className='flex-row'>
            <Ionicons name='star' size={14} color='#0077B6' />
            <Text className='text-blueColor'>{Math.round(vote_average / 2)}</Text>
          </View>
          <Text className='text-grayText'>{release_date?.split('-')[0]}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  )
}

export default MovieCards