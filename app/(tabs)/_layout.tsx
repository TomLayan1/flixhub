import React from 'react'
import { Tabs } from 'expo-router'
import { Text, View } from 'react-native'
import { Ionicons } from "@expo/vector-icons"

// icons
const home = require('@/constants/icons/home.png');

const TabIcons = ({ focused, name, icon }: any) => {
  if (focused) {
    return (
      <View
        className='flex-1 w-full min-w-[112px] h-16 items-center justify-center'
      >
        <Ionicons name={icon} color='#0077B6' size={19} />
        <Text className='text-[#0077B6] text-[16px]'>{name}</Text>
      </View>
    )
  }

  return (
    <View
      className='flex-1 w-full min-w-[112px] h-16 items-center justify-center'
    >
      <Ionicons name={icon} color='#7B7B7B' size={19} />
      <Text className='text-[#7B7B7B] text-[16px]'>{name}</Text>
    </View>
    )
}

const TabsLayout = () => {
  const colors = ['#0077B6', '#9ECAE1'] as const
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: "bold",
        },
        tabBarItemStyle: {
          width: '100%',
          height: '100%',
          justifyContent: "center",
          alignItems: "center"
        },
        tabBarStyle: {
          backgroundColor: '#1a1b20',
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 20,
          height: 56,
          position: 'absolute',
          paddingTop: 10,
          borderTopWidth: 0,
          elevation: 0
        },
      }}
    >
      <Tabs.Screen 
        name='index'
        options={{ 
          title: 'Home',
          tabBarIcon: ({focused}) => (
            <TabIcons focused={focused} name='Home' icon='home-outline' />
          )
        }}

      />
      <Tabs.Screen
        name='search'
        options={{
          title: 'Search',
          tabBarIcon: ({focused}) => (
            <TabIcons focused={focused} name='Search' icon='search-outline' />
          )
        }}
      />
      <Tabs.Screen
        name='saved'
        options={{
          title: 'Save',
          tabBarIcon: ({ focused }) => (
            <TabIcons focused={focused} name='Saved' icon='bookmark-outline' />
          )
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabIcons focused={focused} name='Profile' icon='person-outline' />
          )
        }}
      />
    </Tabs>
  )
}

export default TabsLayout