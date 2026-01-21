import { ScrollView,Image, Text, View, ImageBackground, TextInput } from 'react-native'
import React from 'react'

// icon
const search = require('../constants/icons/search.png');

type SearchBarPropsType = {
  onPress: () => void;
  placeholder: string;
}

const SearchBar = ({ onPress, placeholder }: SearchBarPropsType) => {
  return (
    <View className='w-full absolute left-0 top-16'>
      <View className='bg-white/10 w-[95%] mx-auto border border-gray-400 flex-row items-center pl-3 rounded-xl overflow-hidden'>
        <Image source={search} className='' />
        <TextInput
          className='flex-1 h-full px-3 text-greyText text-lg'
          placeholder={placeholder}
          placeholderTextColor="#9ca3af"
          onPress={onPress}
          value=''
          onChange={() => {}}
        />
      </View>
    </View>

  )
}

export default SearchBar

