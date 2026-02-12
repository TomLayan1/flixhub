import { Pressable, Image, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Link, useRouter } from 'expo-router'

// Profile pic
const profilePic = require('../../assets/flixhubimages/profile_img.jpg')


const deleteAccout = () => {
  const router = useRouter();

  return (
    <View className='flex-1 bg-darkBg pt-14 px-6'>
      <View className='flex-row mb-40'>
        <Pressable onPress={() => router.back()}>
          <Ionicons name='chevron-back' size={25} color='#FFFFFF' />
        </Pressable>
        <View className='flex-1'>
          <Text className='text-lightText text-2xl text-center font-bold'>Delete Account</Text>
        </View>
      </View>
      <View className='flex-1 flex-col items-center justify-between pb-9'>
        <View >
          <Image
            source={profilePic}
            className='w-[200px] h-[200px] rounded-full mb-5 mx-auto '
          />
          <View className='w-[90%] mx-auto'>
            <Text className='text-4xl text-lightText text-center font-bold mb-4 leading-[45px]'>Are you sure you want to delete profile?</Text>
            <Text className='text-base text-lightText text-center font-bold'>The entire history of your account will bedeleted forever</Text>
          </View>
        </View>
        <View className='w-full flex-row items-center justify-between'>
          <Link href='/(tabs)/profile' className='w-[48%] text-lightText text-xl text-center bg-grayBg py-4 rounded-full'>Cancel</Link>
          <TouchableOpacity className='w-[48%] bg-blueColor py-4 rounded-full'>
            <Text className='text-lightText text-xl text-center'>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default deleteAccout