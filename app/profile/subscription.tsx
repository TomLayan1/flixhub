import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Plan from './Plan'

const crown = require('@/assets/flixhubimages/crown.png')

const SUB_BENEFIT: string[] = [
  'Watch in 4K on all devices',
  'Ad-free. No one Ad',
  'Quality in all watching movies'
]


const subscription = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className='flex-1 bg-darkBg pt-28 px-5'
    >
      <View className='mx-auto p-6 bg-blueColor/10 rounded-full mb-6'>
        <View className='w-[140px] h-[140px] bg-blueColor/20 items-center justify-center rounded-full'>
          <Image 
            source={crown}
          />
        </View>
      </View>
      <Text className='text-blueColor text-3xl text-center font-bold mb-14'>Subscribe to Premium</Text>

      <View className='mb-7'>
        {SUB_BENEFIT?.map((item, i) => (
          <View key={i} className='flex-row items-center gap-3 mb-7'>
            <View className='bg-blueColor/15 items-center justify-center p-2 rounded-full'>
              <Ionicons name='checkmark' color='#0077B6' size={20} />
            </View>
            <Text className='text-lightText text-xl'>{item} </Text>
          </View>
        ))}
      </View>

      {/* Subscription plans */}
      <Plan />
    </ScrollView>
  )
}

export default subscription