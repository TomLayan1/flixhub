import React from 'react';
import { Image, View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type SearchBarPropsType = {
  onPress: () => void;
  placeholder: string;
}

const SearchBar = ({ onPress, placeholder }: SearchBarPropsType) => {
  return (
    <View className='w-full absolute left-0 top-16'>
      <View className='bg-white/10 w-[95%] mx-auto border border-textDark flex-row items-center pl-3 rounded-xl overflow-hidden'>
        <Ionicons name="search" size={20} color='#FFFFFF' />
        <TextInput
          className='flex-1 h-full px-3 text-textDark text-lg'
          placeholder={placeholder}
          placeholderTextColor="#FFFFFF"
          onPress={onPress}
          value=''
          onChange={() => {}}
        />
      </View>
    </View>

  )
}

export default SearchBar

