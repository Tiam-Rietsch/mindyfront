import { View, Text, SafeAreaView, Image } from 'react-native'
import React from 'react'
import images from '../../constants/images'
import BonusCard from '../../components/BonusCard'
import { FontAwesome, Feather } from '@expo/vector-icons'
import PrimaryButton from '../../components/Buttons/PrimaryButton'
import { useGlobalContext } from '../../context/GlobalProvider'
import { router } from 'expo-router'

const congrats = () => {
  const { isTablet } = useGlobalContext()
  return (
    <SafeAreaView className="flex-col">
      <View className="h-[80%] justify-center items-center" style={{ gap: isTablet ? 50 : 30}}>
        <Image
          source={images.congrats}
          className={`${!isTablet ? 'w-[95%] h-[50%]' : ''}`}
          resizeMode='contain'
        />
        
        <Text className={`${isTablet ? 'text-4xl' : 'text-2xl'} font-dBold text-thickViolet`}>Module Complete !</Text>
        <View className="flex-row items-center justify-center" style={{ gap: 20}}>
          <BonusCard 
            bonusTitle={"TOTAL XP"}
            icon={() => <FontAwesome name="diamond" size={isTablet ? 35 : 20} color={"#4D0DA8"}/>}
            magnitude={156}
          />
          <BonusCard 
            textStyles={'text-[#1ac21a]'}
            containerStyles={'bg-[#1ac21a] border-[#1ac21a]'}
            bonusTitle={"AMAZING"}
            icon={() => <Feather name="target" size={isTablet ? 45 : 25} color={"#1ac21a"}/>}
            magnitude={156}
          />
        </View>
      </View>
      <View className="h-[20%] border-transparent border-regularGray border-t-[2px] justify-around flex-row items-center">
      <PrimaryButton 
          containerStyles={`border-thickGray bg-lightGray rounded-2xl  ${isTablet ? 'w-[300px]' : 'w-[170px]'}`}
          text="REVIEW LESSONS"
          textStyles={`text-thickGray ${isTablet ? 'text-3xl' : 'text-[14px]'}`}
        />
        <PrimaryButton 
          containerStyles={`border-regulartViolet rounded-2xl bg-thickViolet ${isTablet ? 'w-[300px]' : 'w-[170px]'}`}
          text="NEXT MODULE"
          textStyles={`text-white ${isTablet ? 'text-3xl' : 'text-[14px]'}`}
          handlePress={() => router.replace('/chaptersMap')}
        />
      </View>
    </SafeAreaView>
  )
}

export default congrats