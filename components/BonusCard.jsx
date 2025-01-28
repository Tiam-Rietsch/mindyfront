import { View, Text } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { useGlobalContext } from '../context/GlobalProvider'

const BonusCard = ({ bonusTitle, containerStyles, icon, textStyles, magnitude}) => {
  const { isTablet } = useGlobalContext()
  return (
    <View className={`${isTablet ? 'h-[150px] w-[250px] rounded-3xl' : 'h-[100px] w-[170px] rounded-xl'}  bg-thickViolet  items-center justify-start border-thickViolet border-[3px] ${containerStyles}`}>
      <Text className={`${isTablet ? 'text-xl' : 'text-[14px]'} font-dBold text-white py-1`}>{bonusTitle}</Text>
      <View className={`flex-1 w-full ${isTablet ? 'text-3xl rounded-3xl' : 'text-xl rounded-xl'} bg-white items-center justify-center flex-row`} style={{ gap: 10}}>
        {icon()}
        <Text className={`${isTablet ? 'text-3xl' : 'text-xl'} font-dBold text-thickViolet ${textStyles}`}>{magnitude}</Text>
      </View>
    </View>
  )
}

export default BonusCard