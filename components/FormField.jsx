import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { useGlobalContext } from '../context/GlobalProvider'


const FormField = ({ containerStyles, handleChangeText, placeholder }) => {
  const { isTablet } = useGlobalContext()
  return (
    <TextInput 
      className={`w-[300px]  h-[50px] bg-lightGray rounded-xl border-2 border-regularGray p-3 ${containerStyles}`}
      placeholder={placeholder}
      onChangeText={handleChangeText}
    />
  )
}

export default FormField