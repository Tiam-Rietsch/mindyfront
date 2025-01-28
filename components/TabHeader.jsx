import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { FontAwesome6, Ionicons } from '@expo/vector-icons'
import icons from '../constants/icons'
import { useGlobalContext } from '../context/GlobalProvider'

const TabHeader = () => {
  const { isTablet } = useGlobalContext()

  return (
    <View className={`w-full ${isTablet ? 'h-[120px]' : 'h-[80px]'} bg-white ${isTablet ? 'justify-end items-center' : 'justify-between items-end pb-2'} flex-row px-10`} style={{ gap: 20 }}>
      <TouchableOpacity className="mx-[20px] flex-row items-center justify-center" style={{ gap: 10 }}>
        <Image
          source={icons.france}
          className={`${isTablet ? 'h-[50px] w-[50px]': 'h-[30px] w-[30px]'}`}
        />
      </TouchableOpacity>
      <TouchableOpacity className="mx-[20px] flex-row items-center justify-center" style={{ gap: 10 }}>
        <Ionicons name="diamond" size={isTablet ? 44 : 24} color={"#4d0da8"} />
        <Text className={`${isTablet ? 'text-3xl' : 'text-xl'} font-dBold text-thickViolet`}>500</Text>
      </TouchableOpacity>
      <TouchableOpacity className="mx-[20px] flex-row items-center justify-center" style={{ gap: 10 }}>
        <FontAwesome6 name="fire" size={isTablet ? 40 : 20} color="#ea580c" />
        <Text className={`${isTablet ? 'text-3xl' : 'text-xl'} font-dBold text-orange-600`}>5 days</Text>
      </TouchableOpacity>
    </View>
  )
}

export default TabHeader