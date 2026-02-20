import { Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

export interface SavedCardType {
  id: number;
  title: string;
  posterUrl: string
}

const SavedCard:React.FC<SavedCardType> = ({ id, title, posterUrl}) => {
  return (
    <Link href={`/movie/${id}`} asChild className='mb-5'>
      <TouchableOpacity className='flex-row items-start gap-4'>
        <Image 
          source={{ uri: `https://image.tmdb.org/t/p/w500${posterUrl}`}}
          className='w-[50px] h-[70px]'
        />
        <Text className='text-lightText text- font-bold'>{title}</Text>
      </TouchableOpacity>
    </Link>
  )
}

export default SavedCard