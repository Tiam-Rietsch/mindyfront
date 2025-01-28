import { SafeAreaView, FlatList, View, Text, Dimensions, Image, Animated, NativeEventEmitter } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import SkillCard from '../../components/SkillCard'
import images from '../../constants/images'
import TabHeader from '../../components/TabHeader'
import { useGlobalContext } from '../../context/GlobalProvider'
import { getCompetences } from '../api/fetch'

const skillsList = [
  {
    skillId: 1,
    name: "VERBAL COMMUNICATION",
    description: "this is the description of the skill"
  },
  {
    skillId: 2,
    name: "VERBAL COMMUNICATION",
    description: "this is the description of the skill"
  },
  {
    skillId: 3,
    name: "VERBAL COMMUNICATION",
    description: "this is the description of the skill"
  },
]

const skillsImagesColors = [
  {
    image: images.handShake,
    cardBgColor: "bg-skillViolet",
    btnBorderColor: "border-lightSkillViolet",
    textColor: "text-skillViolet",
    bgColor: "bg-lightSkillViolet" 
  },
  {
    image: images.lecturing,
    cardBgColor: "bg-skillBlue",
    btnBorderColor: "border-lightSkillBlue",
    textColor: "text-skillBlue",
    bgColor: "bg-lightSkillBlue"
  },
  {
    image: images.reading,
    bgColor: "bg-lightSkillYellow",
    btnBorderColor: "border-lightSkillYellow",
    textColor: "text-skillYellow",
    cardBgColor: "bg-skillYellow"
  }
]

const study = () => {
  const { isTablet, setSkills, skills, selectedSkil, setSelectedSkill, units, setUnits, uiDevel } = useGlobalContext()
  const { width, height } = Dimensions.get('screen')
  const scrollX = React.useRef(new Animated.Value(0)).current

  const loadSkills = async () => {
    if (uiDevel) return
    try {
      let userSkills = await getCompetences()
      if (!userSkills) throw Error("user skills could not be found")

      // add skill Id
      setSkills([...userSkills].map((skill, index) => ({ ...skill, skillId: index+1 })))
      console.log("The skills are: \n\n" + JSON.stringify(skills))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadSkills()
  }, [])

  const renderItem = useCallback(({ item }) => (
    <View className={`h-full items-center justify-end pb-[20px]`} style={{ width }}>
      <SkillCard
        skill={item}
        bgColor={skillsImagesColors[item.skillId-1].cardBgColor}
        btnBorderColor={skillsImagesColors[item.skillId-1].btnBorderColor}
        textColor={skillsImagesColors[item.skillId-1].textColor}
      />
    </View>
  ), [skills, setSkills])

  return (
    <SafeAreaView className="bg-lightGray h-full flex-1">
      <TabHeader />
      <View
        style={{
          position: 'absolute',
          top: 80,
          left: 0,
          height: '100%',
          width: '100%'
        }}
      >
        {[...(uiDevel ? skillsList : skills)].map((_, index) => {
          const inputRange = [
            (index -1) * width,
            index * width,
            (index + 1) * width
          ]
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0]
          })
          return (
            <Animated.View 
              key={index} 
              style={{
                opacity,
                height: '100%',
                width: '100%',
                position: 'absolute',
                top: 0,
                left: 0
              }} 
              className={`justify-start items-center pt-[50px] ${skillsImagesColors[index].bgColor}`}
            >
              <Animated.Image
                style={{
                  opacity
                }}
                source={skillsImagesColors[index].image}
                className={`h-[250px] aspect-square`}
                resizeMode='contain'
              />
            </Animated.View>
          )
        })}
      </View>
      <Animated.FlatList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        horizontal={true}
        pagingEnabled
        data={[...(uiDevel ? skillsList : skills)]}
        keyExtractor={(skill) => skill.skillId}
        renderItem={renderItem}
      />
    </SafeAreaView>
  )
}

export default study