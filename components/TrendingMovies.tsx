import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'


export interface MovieCardsType {
  movie_id: number;
  title: string;
  poster_url: string
  index: number
}

const TrendingMovieCards: React.FC<MovieCardsType> = ({ movie_id, title, poster_url, index}) => {
  // console.log(poster_path)
  return (
    <Link href={`/movie/${movie_id}`} asChild>
      <TouchableOpacity  className='w-[140px] flex-col relative'>
        <View className='w-full h-56 mb-2 rounded-lg overflow-hidden'>
          <Image 
            source={{uri: poster_url}}
            className='w-full h-full'
            resizeMode='contain'
          />
        </View>
        <Text className='text-blueColor text-8xl font-bold absolute bottom-7'>{index + 1}</Text>
        <Text 
          className='text-lightText text-lg ml-1 mb-1'
          numberOfLines={1}
        >{title}</Text>
      </TouchableOpacity>
    </Link>
  )
}

export default TrendingMovieCards