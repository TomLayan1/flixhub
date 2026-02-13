import { Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

export interface SavedCardType {
  movie_id: number;
  title: string;
  poster_url: string
  index: number
}

const SavedCard:React.FC<SavedCardType> = ({ movie_id, title, poster_url, index}) => {
  return (
    <Link href={`/movie/${movie_id}`} asChild className='mb-5'>
      <TouchableOpacity className='flex-row items-start gap-4'>
        <Image 
          source={{ uri: poster_url}}
          className='w-[75px] h-[100px]'
        />
        <Text className='text-lightText text- font-bold'>{title}</Text>
      </TouchableOpacity>
    </Link>
  )
}

export default SavedCard