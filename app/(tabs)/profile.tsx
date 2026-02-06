import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router'
import Settings from '@/components/profileComponents/Settings';

// Profile pic
const profilePic = require('../../assets/flixhubimages/profile_img.jpg')

const profile = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className='flex-1 bg-darkBg px-5'
    >
      <View className='flex-col items-center justify-center py-14'>
        <Text className='text-lightText text-3xl font-bold mb-7'>Profile</Text>
        <Image 
          source={profilePic}
          className='w-[200px] h-[200px] rounded-full mb-5'
        />
        <Text className='text-lightText text-2xl font-bold text-center mb-1'>Username</Text>
        <Text className='text-lightText text-lg text-center mb-5'>example@gmail.com</Text>
        <Link href={'/profile/subscription'} className='bg-blueColor/15 w-[230px] border border-blueColor text-blueColor text-2xl font-bold text-center py-3 rounded-full'>
          Subscribe Now
        </Link>
      </View>
      <Settings />
    </ScrollView>
  )
}

export default profile

const styles = StyleSheet.create({})