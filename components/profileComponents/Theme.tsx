import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'

const Theme = () => {
  const [theme, setTheme] = useState<string>('dark');

  const changeTheme = (value: string) => {
    setTheme(value)
  }

  return (
    <View className='w-full flex-row items-center gap-1 border-b border-b-grayText pb-9 mb-6'>
      {/* Light mode */}
      <TouchableOpacity
        onPress={() => changeTheme('light')}
        className={`w-1/2 ${theme === 'light' ? 'bg-[#0077B6]' : 'bg-[#1a1b20]'} flex-row items-center justify-center gap-4 py-3 rounded-lg`}
      >
        <Ionicons name='moon' color='#FFFFFF' size={20} />
        <Text className='text-lightText text-xl font-bold'>Light Mode</Text>
      </TouchableOpacity>

      {/* Dark mode */}
      <TouchableOpacity
        onPress={() => changeTheme('dark')}
        className={`w-1/2 ${theme === 'dark' ? 'bg-[#0077B6]' : 'bg-[#1a1b20]'} flex-row items-center justify-center gap-4 py-3 rounded-lg`}
      >
        <Ionicons name='sunny' color='#FFFFFF' size={20} />
        <Text className='text-lightText text-xl font-bold'>Dark Mode</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Theme