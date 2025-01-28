import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useGlobalContext } from '../context/GlobalProvider'

const ReturnHeader = ({ title }) => {
  const { isTablet } = useGlobalContext()

  return (
    <View className={`flex-1 bg-white ${isTablet ? 'justify-center' : 'justify-end pb-3'} items-center`}>
      <Text className={`${isTablet ? 'text-5xl' : 'text-xl'} font-dBold`}>{ title }</Text>
      <TouchableOpacity
        onPress={() => router.back()}
        activeOpacity={1}
        className={` aspect-square bg-lightGray rounded-full absolute left-5 flex items-center justify-center ${isTablet ? 'h-[80px]' : 'h-[40px] bottom-2'}`}
      >
        <FontAwesome name="chevron-left" size={isTablet ? 40 : 20} color="#4D0DA8" />
      </TouchableOpacity>
    </View>
  )
}

export default ReturnHeader