import { Image, Pressable, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

// flags
const america = require('@/assets/flags/america.jpg');
const spain = require('@/assets/flags/spain.jpg');
const france = require('@/assets/flags/france.jpg');

interface LanguageType {
  id: number;
  flag: any;
  name: string
}

const LANGUAGES: LanguageType[] = [
  {
    id: 1,
    flag: america,
    name: 'English'
  },
  {
    id: 2,
    flag: spain,
    name: 'Espanol'
  },
  {
    id: 3,
    flag: france,
    name: 'French'
  },
]

const language = () => {
  const [autoSelect, setAutoSelect] = useState<number>(1)
  const router = useRouter();

  const handleSelectLanguage = (value: number) => {
    const selectedLanguage = LANGUAGES?.find(language => language.id === value);
    selectedLanguage && setAutoSelect(selectedLanguage?.id)
  }

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
        {LANGUAGES?.map(item => (
          <Pressable onPress={() => handleSelectLanguage(item.id)} className={`flex-row items-center justify-between py-4 px-3 bg-grayBg ${autoSelect === item.id ?'border border-blueColor' : 'border-lightBorder'} rounded-xl`}>
            <View key={item.id} className='flex-row items-center gap-4'>
              <Image source={item.flag} className='w-[40px] h-[30px]' resizeMode='contain' />
              <Text className='text-lightText text-lg font-bold'>{item.name}</Text>
            </View>
            <View className={`w-[22px] h-[22px] items-center justify-center rounded-full ${autoSelect === item.id ? 'border-2 border-blueColor' : 'border border-grayText'}`}>
              {autoSelect === item.id && <View className='bg-blueColor w-[13px] h-[13px] rounded-full'></View>}
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  )
}

export default language