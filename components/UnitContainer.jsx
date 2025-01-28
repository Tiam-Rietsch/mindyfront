import { View, Text, FlatList, Image } from 'react-native'
import React, { createContext, memo, useCallback, useState } from 'react'
import PrimaryButton from './Buttons/PrimaryButton'
import LevelButton from './Buttons/LevelButton'
import { useLessonContext } from '../context/LessonProvider'
import DetailPopupProvider from '../context/DetailPopupProvider'
import { useGlobalContext } from '../context/GlobalProvider'
import getPet from '../constants/pet'
import { FontAwesome } from '@expo/vector-icons'



const UnitHeader = ({ unitId, title, isCurrent, isCompleted }) => {
  const { isTablet } = useGlobalContext()

  if (!isCurrent && !isCompleted) {
    return (
      <View className={`w-full ${!isTablet ? 'h-[80px] mb-10 mt-10' : 'h-[100px] mb-20'} flex-row justify-center items-center overflow-hidden`}>
        <View className="flex-row jusity-center items-center w-[95%]" style={{ gap: 5 }}>
          <View className="flex-1 border-b-[2px] border-regularGray"></View>
          <Text className={`font-dBold text-regularViolet text-center ${isTablet ? '' : 'w-[50%] text-[18px]'}`}>{title}</Text>
          <View className="flex-1 border-b-[2px] border-regularGray"></View>
        </View>

      </View>
    )
  }

  return (
    <View className={`w-full ${!isTablet ? 'h-[120px] mb-2 mt-5' : 'h-[200px] mb-10'} bg-thickViolet  flex-row justify-between items-center overflow-hidden`}>
      <View className={`h-full ${!isTablet ? 'w-[60%] px-5' : 'w-[50%] px-10'} justify-around items-start py-5`}>
        <Text className={`text-white font-dBold ${!isTablet ? 'text-3xl' : 'text-4xl'}`}>Unit {unitId}</Text>
        <Text className={`text-white font-dBold ${!isTablet ? 'text-[16px] w-full' : 'text-4xl'}`}>{title}</Text>
      </View>
      <View className={`h-full flex-1 justify-center items-end pr-5`}>
        <PrimaryButton
          containerStyles={`${isTablet ? 'w-[70%]' : 'w-[90%] h-[50px] rounded-xl'}`}
          textStyles={`${isTablet ? '' : 'text-[18px]'}`}
          text={"DETAILS..."}
        />
      </View>
    </View>
  )
}

const LessonsContainer = ({ lesson, isCurrent, unitId, lessonCount }) => {
  const { isTablet } = useGlobalContext()

  const shiftRatio = (index, unitId) => {
    let orientation = unitId % 2 == 0 ? 1 : -1
    let value = index % 6
    const step = isTablet ? 100 * orientation : 38 * orientation

    switch (value) {
      case 0: return step * 0
      case 1: return step * -1
      case 2: return step * -2
      case 3: return step * -2
      case 4: return step * -1.15
      case 5: return step * -0.5
    }
  }

  return (
    <DetailPopupProvider>
      <LevelButton
        containerStyles={`${lesson.active && isCurrent ? (isTablet ? 'w-[150px] my-[50px]' : 'w-[80px] my-5') : (isTablet ? 'w-[150px] mb-10' : 'w-[70px] mb-2')}`}
        shift={shiftRatio(lesson.lessonId - 1, unitId)}
        lesson={lesson}
        current={lesson.active && isCurrent}
        lessonCount={lessonCount}
      />
    </DetailPopupProvider>
  )
}

const LockedLessonsContainer = ({ unitDescription, unitId }) => {
  const { isTablet } = useGlobalContext()

  return (
    <View className="w-full justify-center items-center mb-5">
      <View
        className={`flex-col items-center justify-start w-[95%] border-regularGray border-[2px] px-5 rounded-xl ${isTablet ? '' : 'py-5'} `}
        style={{ gap: 15 }}
      >
        <Text className={`text-thickGray font-dBold ${isTablet ? '' : 'text-xl'}`}>UP NEXT</Text>
        <View className="flex-row items-center justify-center" style={{ gap: 5 }}>
          <FontAwesome name="lock" size={isTablet ? 30 : 20} color={"#777777"} />
          <Text className={`text-thickGray font-dBold ${isTablet ? '' : 'text-[18px]'}`}>Section {unitId}</Text>
        </View>
        <Text className={`font-dBold text-thickGray text-center ${isTablet ? '' : 'text-[14px]'}`}>{unitDescription}</Text>
        <View className={`border-[1px] border-regularViolet rounded-[8px] items-center justify-center border-b-[5px] ${isTablet ? '' : 'p-4'}`}>
          <Text className={`font-dBold text-regularViolet ${isTablet ? '' : 'text-[16px]'}`}>pass the previous section to unlock</Text>
        </View>
      </View>

    </View>
  )
}


const UnitContainer = memo(
  function ({ unit: { unitId, name, description, objective, isCurrent, lessons, isCompleted } }) {
    const { isTablet } = useGlobalContext()

    const renderItem = useCallback(({ item }) => (
      <LessonsContainer
        lesson={item}
        isCurrent={isCurrent}
        unitId={unitId}
        lessonCount={lessons.length}
      />
    ), [])

    const renderEmptyComponent = useCallback(() => (
      <LockedLessonsContainer
        unitDescription={description}
        unitId={unitId}
      />
    ), [])

    const petUrl = getPet(unitId - 1)

    return (
      <View className="w-full flex items-center">
        <View className="w-full">
          <UnitHeader
            unitId={unitId}
            title={name}
            isCurrent={isCurrent}
            isCompleted={isCompleted}
          />
          <View className="relative w-full items-center justify-start">
            {(isCurrent || isCompleted) && (
              <View className={`${isTablet ? 'h-[400px]' : 'h-[180px]'} aspect-square absolute top-[40%] ${unitId % 2 == 0 ? 'right-[5%]' : 'left-[5%]'}`}>
                <Image
                  source={petUrl}
                  className="h-full w-full"
                  resizeMode="contain"
                />
              </View>
            )}

            <FlatList
              maxToRenderPerBatch={2}
              className="w-full"
              data={isCurrent || isCompleted ? lessons : []}
              keyExtractor={(lesson) => lesson.lessonId}
              renderItem={renderItem}
              ListEmptyComponent={renderEmptyComponent}
            />
          </View>
        </View>
      </View>
    )
  },
  function (preProps, nexProps) {
    return true
  }
)

export default UnitContainer