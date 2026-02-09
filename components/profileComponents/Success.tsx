import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
const crown = require('@/assets/flixhubimages/crown.png')

type SuccessPropsType = {
  setSuccessful: React.Dispatch<React.SetStateAction<boolean>>;
}

const Success = ({ setSuccessful }:SuccessPropsType ) => {
  return (
    <View className='bg-darkBg/60 absolute w-full h-screen top-0 z-50 items-center justify-center'>
      <View className='w-[70%] bg-darkBg p-8 rounded-3xl'>
        <View className='mx-auto p-6 bg-blueColor/10 rounded-full mb-6'>
          <View className='w-[110px] h-[110px] bg-blueColor/20 items-center justify-center rounded-full'>
            <Image
              source={crown}
            />
          </View>
        </View>

        <Text className='text-blueColor text-2xl text-center font-bold mb-6'>Congratulations!</Text>
        <Text className='text-lightText text-lg text-center mb-8'>You have successfully subscribed 1 month premium. Enjoy the benefits.</Text>
        <TouchableOpacity onPress={() => setSuccessful(false)} className='w-full py-3 bg-blueColor rounded-full'>
          <Text className='text-lightText text-lg text-center'>Ok</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Success