import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { Redirect, router } from 'expo-router'
import PrimaryButton from '../components/Buttons/PrimaryButton'
import { useGlobalContext } from '../context/GlobalProvider'


const index = () => {
  
  const { isLoggedIn, uiDevel } = useGlobalContext()

  if (isLoggedIn || uiDevel) {
    return <Redirect href="/login" />
  }

  return (
    <View className="h-full w-full flex justify-center items-center font-dBold">
      <PrimaryButton 
        handlePress={() => router.push('/login')}
        containerStyles={'w-[80%] border-black '}
        textStyles={'text-black'}
        text="START"
      />
    </View>
  )
}

export default index