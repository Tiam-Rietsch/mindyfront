import { View, Text, TouchableOpacity } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import * as Progress from 'react-native-progress'
import { FontAwesome6, FontAwesome } from '@expo/vector-icons'
import PrimaryButton from './PrimaryButton'
import { DetailContext, useDetailPopupContext } from '../../context/DetailPopupProvider'
import { router } from 'expo-router'
import { useGlobalContext } from '../../context/GlobalProvider'
import { useLessonContext } from '../../context/LessonProvider'

const LevelButton = ({ containerStyles, shift, lesson, current, lessonCount }) => {

  const { isTablet, setCurLesson, curLesson } = useGlobalContext()
  const { active, passed, progress, rating } = lesson
  const [yOffset, setYOffset] = useState(0)
  const [dimenssions, setDimensions] = useState({
    height: 0,
    width: 0
  })
  const {focusedDetailId, setFocusedDetailId} = useDetailPopupContext()

  const canShowDetail = () => focusedDetailId == lesson.lessonId

  const showDetail = () => {
    setFocusedDetailId(focusedDetailId == -1 ? lesson.lessonId : -1)
  }

  const startLesson = useCallback(() => {
    setCurLesson(lesson)
    router.push('/lesson')
  }, [curLesson])

  // handlers
  const handlePressIn = useCallback(() => {
    setYOffset(10)
  }, [])

  const handlePressOut = useCallback(() => {
    setYOffset(-10)
  }, [])

  const handlePress = useCallback(() => {
    showDetail()
  }, [focusedDetailId])

  return (
    <View
      className={`relative items-center justify-center ml-5 my-0 z-0 w-full h-fit`}
      onLayout={(event) => {
        setDimensions({ ...dimenssions, height: event.nativeEvent.layout.height, width: event.nativeEvent.layout.width })
      }}
    >
      {current && (
        <Progress.Circle
          animated={true}
          endAngle={0}
          unfilledColor='#CECECE'
          fill="white"
          progress={progress}
          thickness={15}
          borderWidth={0}
          size={isTablet ? 190 : 120}
          color="#8A46EA"
          strokeCap='round'
          style={{
            position: 'absolute',
            top: isTablet ? 50 : 20,
            transform: [
              {
                translateX: shift - 1 ?? 0
              },
              {
                translateY: yOffset
              }
            ],

          }}

        />

      )}
      <TouchableOpacity
        activeOpacity={1}

        style={{
          top: 20,
          transform: [
            {
              translateX: shift ?? 0
            },
            {
              translateY: yOffset,
            }
          ],
        }}

        className={current || passed ? (
          `aspect-square bg-thickViolet rounded-full ${isTablet ? 'border-[3px] border-b-[13px]' : 'border-[1px] border-b-[10px]'} border-regularViolet flex justify-center items-center ${isTablet ? 'active:border-[2px] active:border-b-[3px]' : 'active:border-[1px] active:border-b-[1px]'} active:translate-y-[15px] ${containerStyles}`
        ) : ( 
          `aspect-square bg-regularGray rounded-full border-[3px] border-b-[13px] border-thickGray flex justify-center items-center active:border-b-[3px] active:border-[2px] active:translate-y-[15px] ${containerStyles}`
        )}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
      >
        {current && (
          <View className={`absolute ${isTablet ? 'w-[180px] p-5 rounded-2xl top-[-60px]' : 'w-[100px] p-3 rounded-xl top-[-25px]'}  bg-white z-10 border-regularViolet border-[3px] items-center justify-center`}>
            <Text className={`${isTablet ? 'text-2xl' : 'text-[12px]'} font-dBold text-thickViolet`}>START HERE</Text>
            <View className={`absolute top-full left-0  border-x-transparent border-t-[15px] border-x-[15px] w-0 h-0 transform ${isTablet ? 'translate-x-[70px] translate-y-[40px]' : 'translate-x-[32px] translate-y-[20px]'}  border-t-white`}>

            </View>
          </View>
        )}
        {passed ? (
          <FontAwesome6
            name="check"
            size={isTablet ? 70 : 30}
            color={current || passed ? 'white' : '#777777'}
          />
        ) : (
          <FontAwesome6
            name="star"
            size={current ? (isTablet ? 90 : 30) : (isTablet ? 70 : 30)}
            color={current || passed ? 'white' : '#777777'}
          />
        )}

      </TouchableOpacity>

      {canShowDetail() && (
        <View
          style={{
            position: 'relative',
            transform: [
              { translateX: shift ?? 0 },
            ]
          }}
          className={`z-50  ${isTablet ? 'w-[60%] h-[200px] p-5' : 'w-[50%] h-[120px] p-2'} bg-lightGray border-[2px] border-thickViolet flex-col items-center justify-between rounded-2xl z-50`}
        >
          <View className={`absolute top-0 transform ${isTablet ? '-translate-y-[60px]' : '-translate-y-[20px]'} h-0 w-0 border-x-transparent border-t-transparent border-b-lightGray ${isTablet ? 'border-[30px]' : 'border-[10px]'}`}>
          </View>
          <Text className={`font-dBold ${isTablet ? 'text-3xl' : 'text-[20px]'} text-thickViolet`}>{lesson.name}</Text>
          <Text className={`font-dBold ${isTablet ? 'text-2xl' : 'text-[16px]'} text-thickViolet`}>lesson {lesson.lessonId} of {lessonCount}</Text>
          <PrimaryButton
            text="START"
            handlePress={startLesson}
            containerStyles={`${isTablet ? '' : 'h-[40px] rounded-xl border-b-[5px]'}`}
            textStyles={`${isTablet ? '' : 'text-[18px]'}`}
          />
        </View>
      )}
    </View>

  )
}

export default LevelButton