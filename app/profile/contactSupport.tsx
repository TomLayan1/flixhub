import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'
import React from 'react'
import { Pressable, Text, View } from 'react-native'

const CONTACTSUPPORTS = [
  {
    id: 1,
    name: 'Customer Service',
    icon: <Ionicons name='headset' color='#0077B6' size={25} />
  },
  {
    id: 1,
    name: 'Contact Form',
    icon: <Ionicons name='document-text' color='#0077B6' size={25} />
  },
  {
    id: 3,
    name: 'Feedback',
    icon: <Ionicons name='logo-facebook' color='#0077B6' size={25} />
  },
]


const contactSupport = () => {
  const router = useRouter();
  return (
    <View className='flex-1 bg-darkBg pt-14 px-6'>
      <View className='flex-row mb-10'>
        <Pressable onPress={() => router.back()}>
          <Ionicons name='chevron-back' size={25} color='#FFFFFF' />
        </Pressable>
        <View className='flex-1'>
          <Text className='text-lightText text-2xl text-center font-bold'>Contact Support</Text>
        </View>
      </View>

      <View className='flex-col gap-6'>
        {CONTACTSUPPORTS?.map(item => (
          <View className='flex-row items-center gap-4 py-4 px-3 bg-grayBg border-t border-lightBorder rounded-xl'>
            {item.icon}
            <Text className='text-lightText text-lg font-bold'>{item.name}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

export default contactSupport

