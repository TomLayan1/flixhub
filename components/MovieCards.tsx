import { Image, Pressable, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
const BANNER = require('../assets/flixhubimages/john-wick.jpeg')


export interface MovieCardsType {
  id: number;
  title: string;
  poster_path?: string
  vote_average: number
  release_date: string
}

const MovieCards:React.FC<MovieCardsType> = ({ id, title, poster_path, vote_average }) => {
  // console.log(poster_path)
  return (
    <Link href={`/movie/${id}`} asChild>
      <Pressable  className='w-[140px] ml-2 flex-col'>
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
        <Text 
          className='text-textDark text-lg'
          numberOfLines={1}
        >{title}</Text>
      </Pressable>
    </Link>
  )
}

export default MovieCards