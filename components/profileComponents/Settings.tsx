import { Platform, Pressable, Switch, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import Theme from './Theme';
import { Link } from 'expo-router';

const Settings = () => {
  const [enableNotification, setEnableNotification] = useState<boolean>(false);
  const [enableAutoplay, setEnableAutoPlay] = useState<boolean>(false);

  const toggleNotification = (value: boolean) => {
    setEnableNotification(value);
  }

  const toggleAutoplay = (value: boolean) => {
    setEnableAutoPlay(value)
  }
  return (
    <View className='mb-9'>
      {/* Notification */}
      <View className='flex-row items-center justify-between mb-6'>
        <View className='flex-row items-center gap-4'>
          <View className='w-[48px] h-[48px] bg-blueColor/15 items-center justify-center p-3 rounded-full'>
            <Ionicons name='notifications' color='#0077B6' size={25} />
          </View>
          <Text className='text-lightText text-xl font-bold'>Notification</Text>
        </View>
        <Switch
          value={enableNotification}
          onValueChange={toggleNotification}
          // track color
          trackColor={{ false: '#ffffff68', true: '#0076b66f' }}
          // thumbColor
          thumbColor={Platform.OS === 'android' ? (enableNotification ? '#0077B6' : '#FFFFFF') : undefined}
        />
      </View>

      {/* Language */}
      <Link href='/profile/language' className='w-full mb-8'>
        <View className='w-full flex-row items-center justify-between'>
          <View className='flex-row items-center gap-4'>
            <View className='w-[48px] h-[48px] bg-blueColor/15 items-center justify-center p-3 rounded-full'>
              <Ionicons name='grid' color='#0077B6' size={25} />
            </View>
            <Text className='text-lightText text-xl font-bold'>Language</Text>
          </View>
          <View className='flex-row items-center gap-4'>
            <Text className='text-grayText text-xl font-bold'>English (US)</Text>
            <Ionicons name='chevron-forward' color='#4B5563' size={20} />
          </View>
        </View>
      </Link>

      {/* Autoplay */}
      <View className='flex-row items-center justify-between mb-8'>
        <View className='flex-row items-center gap-4'>
          <View className='w-[48px] h-[48px] bg-blueColor/15 items-center justify-center p-3 rounded-full'>
            <Ionicons name='videocam' color='#0077B6' size={25} />
          </View>
          <Text className='text-lightText text-xl font-bold'>Autoplay Video</Text>
        </View>
        <Switch
          value={enableAutoplay}
          onValueChange={toggleAutoplay}
          // track color
          trackColor={{ false: '#ffffff68', true: '#0076b66f'}}
          // thumbColor
          thumbColor={Platform.OS === 'android' ? (enableNotification ? '#0077B6' : '#FFFFFF') : undefined}
        />
      </View>

      {/* Theme */}
      <Theme />

      {/* Contact Support */}      
      <Link href='/profile/contactSupport' className='w-full mb-8'>
        <View className='w-full flex-row items-center justify-between'>
          <View className='flex-row items-center gap-4'>
            <View className='w-[48px] h-[48px] bg-blueColor/15 items-center justify-center p-3 rounded-full'>
              <Ionicons name='document' color='#0077B6' size={25} />
            </View>
            <Text className='text-lightText text-xl font-bold'>Contact Support</Text>
          </View>
          <Ionicons name='chevron-forward' color='#4B5563' size={20} />
        </View>
      </Link>

      <Link href='/profile/deleteAccout' className='w-full mb-24'>
        <View className='w-full flex-row items-center justify-between'>
          <View className='flex-row items-center gap-4'>
            <View className='w-[48px] h-[48px] bg-blueColor/15 items-center justify-center p-3 rounded-full'>
              <Ionicons name='trash' color='#0077B6' size={25} />
            </View>
            <Text className='text-lightText text-xl font-bold'>Delete Account</Text>
          </View>
          <Ionicons name='chevron-forward' color='#4B5563' size={20} />
        </View>
      </Link>
    </View>
  )
}

export default Settings