import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import LessonProvider from '../../context/LessonProvider'

const SkillLayout = () => {
  return (
    <LessonProvider>
      <Stack>
        <Stack.Screen name="congrats" options={{ headerShown: false }} />
        <Stack.Screen name="chaptersMap" options={{ headerShown: false}} />
        <Stack.Screen name="lesson" options={{ headerShown: false}} />
      </Stack>
    </LessonProvider>

  )
}

export default SkillLayout