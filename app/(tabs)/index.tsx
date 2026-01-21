import { ScrollView,Image, Text, View, ImageBackground, TextInput } from 'react-native'
import React from 'react'
import SearchBar from '@/components/SearchBar';
import { useRouter } from 'expo-router';

// Banner
const BANNER = require('../../assets/flixhubimages/john-wick.jpeg');

const index = () => {
  const router = useRouter();


  return (
    <View className='flex-1 bg-darkBg'>
      <ScrollView
        className='flex-1'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10
        }}
      >
        <ImageBackground source={BANNER} className='w-full h-1/2'>        
        </ImageBackground>
      </ScrollView>
      <SearchBar
        onPress={() => router.push('/search')}
        placeholder='Search for a movie'
      />
    </View>
  )
}

export default index