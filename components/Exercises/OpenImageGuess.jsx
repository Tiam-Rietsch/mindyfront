import { View, Text, Image, SafeAreaView, ActivityIndicator, Keyboard } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import * as Progress from 'react-native-progress'
import { FontAwesome } from '@expo/vector-icons'
import Input from '../Input'
import PrimaryButton from '../Buttons/PrimaryButton'
import ReturnHeader from '../ReturnHeader'
import { useGlobalContext } from '../../context/GlobalProvider'
import { fetchImage, getCorrection } from '../../app/api/fetch'
import { useLessonContext } from '../../context/LessonProvider'

const OpenImageGuess = ({ handleCorrectExercise, exercise }) => {

  console.log("\n\nThe exercicse is : \n"+exercise)
  const [answer, setAnswer] = useState('')
  const [questionPassed, setQuestionPassed] = useState(true)
  const [correction, setCorrection] = useState({
    analysis: "",
    response: "",
    correct: false
  })
  const [isCorrecting, setIsCorrecting] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const { isTablet } = useGlobalContext()
  const { exercises } = useLessonContext()
  const [imageUri, setImageUri] = useState(null)
  const [imageLoading, setImageLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleAnswerChange = (text) => {
    setAnswer(text)
  }

  const correctAnswer =  async () => {
    try {
      setIsCorrecting(true)
      console.log(exercise.id)
      let loadedCorrection = await getCorrection(exercise.id, answer)
      if (!loadedCorrection) throw Error("The corrections could not be loaded")

      setCorrection({...correction, analysis: loadedCorrection.analysis, response: loadedCorrection.response, correct: loadedCorrection.isCorrect})        

      setQuestionPassed(loadedCorrection.isCorrect)
    } catch(error) {
      console.error(error)
    } finally {
      setIsCorrecting(false)
    }
  }

  const handleSubmit = useCallback(async () => {
    Keyboard.dismiss()
    await correctAnswer()
    setShowResult(true)
  })

  const setImage = async () => {
    try {
      setImageLoading(true)
      console.log("started loading image")
      const blob = await fetchImage(exercise.scenarioScene.pathToScene)

      const reader = new FileReader()
      reader.onload = () => {
        const base64data = reader.result
        setImageUri(base64data)
      }

      reader.readAsDataURL(blob)
    } catch (error) {
      console.log(error)
    } finally {
      console.log("stopped loading image")
      setImageLoading(false)
    }
  }

  useEffect(() => {
    setImage()
  }, [])


  return (
    <SafeAreaView className="h-full w-full">
      {/* ======================================= header */}
      <View className={`h-[20%] w-full`}>
        <ReturnHeader title={"This is the title of the exercise"} />
        <View className="flex-1 items-center justify-around px-10 flex-row">
          <Progress.Bar
            width={isTablet ? 750 : 300}
            height={isTablet ? 25 : 10}
            strokeCap={'rounded'}
            progress={progress}
            borderRadius={50}
            unfilledColor='#CECECE'
            color="#8A46EA"
            borderWidth={0}
          />
          <FontAwesome name="heart" size={isTablet ? 60 : 30} color={"red"} />
        </View>
      </View>

      {/* ==================================== image section */}

      <View className={`${isTablet ? 'h-[45%]' : 'h-[35%]'} w-full items-center justify-center`}>
        {imageLoading ? (
          <ActivityIndicator size={"large"} color={"black"} />
        ) : (
          <>
            <Text className={`${isTablet ? 'text-4xl' : 'text-2xl'} mb-3 font-dBold text-center`}>{exercise.aiQuestion}</Text>
            <Image
              className={`w-[95%] h-[80%]`}
              source={{ uri: imageUri }}
              resizeMode='contain'
            />
          </>
        )}
      </View>

      {/* ==================================== form field and submit button */}
      <View className={`${isTablet ? 'h-[35%]' : 'h-[45%]'} w-full items-center justify-around`}>
        <Input
          value={answer}
          labelText={"Votre reponse"}
          containerStyles={`w-[90%]`}
          handleChangeText={handleAnswerChange}
          inputStyles={`border-[2px] border-regularGray`}
        />
        <PrimaryButton
          containerStyles={`w-[80%]`}
          text={'SUBMIT'}
          handlePress={handleSubmit}
          loading={isCorrecting}
        />

        {/* =================================== result section for passed questions */}
        {(showResult && questionPassed) && (
          <View className={`bg-green-100 justify-between items-center h-full w-full absolute top-0 left-0 ${isTablet ? 'p-5 pl-10' : 'p-3'}`}>
            <View className="w-full items-center flex-row justify-start">
              <View className={`bg-white ${isTablet ? 'h-[80px]' : 'h-[40px]'} aspect-square rounded-full items-center justify-center mr-4`}>
                <FontAwesome name="check" size={isTablet ? 50 : 25} color={"#16a341"} />
              </View>
              <Text className={`${isTablet ? 'text-5xl' : 'text-2xl'} font-dBold text-green-600`}>Bien Joue</Text>
            </View>
            <View className="w-full my-3">
              <Text className={`${isTablet ? 'text-4xl' : 'text-xl'} text-green-600 font-dBold`}>Reponse:</Text>
              <Text className={`${isTablet ? 'text-2xl' : 'text-[14px]'} font-dBold`}>{correction.response}</Text>
            </View>
            <View className="w-full my-3">
              <Text className={`${isTablet ? 'text-4xl' : 'text-xl'} text-green-600 font-dBold`}>Analyse:</Text>
              <Text className={`${isTablet ? 'text-2xl' : 'text-[14px]'} font-dBold`}>{correction.analysis}</Text>
            </View>
            <PrimaryButton
              containerStyles={`w-[70%] ${!isTablet ? 'h-[50px] rounded-2xl' : ''} border-green-600`}
              textStyles={`text-green-600 ${!isTablet ? 'text-xl' : ''}`}
              text={"CONTINUE"}
              handlePress={() => {
                setShowResult(!showResult)
                handleCorrectExercise(true)
                setProgress((exercise.exerciseId) / exercises.length)
              }}

            />
          </View>
        )}

        {/* ===================================== result section for failed questions */}
        {(showResult && !questionPassed) && (
          <View className={`bg-red-100 h-full w-full absolute top-0 left-0 ${isTablet ? 'p-5 pl-10' : 'p-3'} items-center justify-around`}>
            <View className="w-full items-center flex-row justify-start">
              <View className={`bg-white ${isTablet ? 'h-[80px]' : 'h-[40px]'} aspect-square rounded-full items-center justify-center mr-4`}>
                <FontAwesome name="times" size={isTablet ? 50 : 25} color={"#dc2626"} />
              </View>
              <Text className={`${isTablet ? 'text-5xl' : 'text-2xl'} font-dBold text-red-600`}>Incorrect</Text>
            </View>
            <View className="w-full my-3">
              <Text className={`${isTablet ? 'text-4xl' : 'text-xl'} text-red-600 font-dBold`}>Reponse:</Text>
              <Text className={`${isTablet ? 'text-2xl' : 'text-[14px]'} font-dBold`}>{correction.response}</Text>
            </View>
            <View className="w-full my-3">
              <Text className={`${isTablet ? 'text-4xl' : 'text-xl'} text-red-600 font-dBold`}>Analyse:</Text>
              <Text className={`${isTablet ? 'text-2xl' : 'text-[14px]'} font-dBold`}>{correction.analysis}</Text>
            </View>
            <PrimaryButton
              containerStyles={`w-[70%] ${!isTablet ? 'h-[50px] rounded-2xl' : ''} border-red-600`}
              textStyles={`text-red-600 ${!isTablet ? 'text-xl' : ''}`}
              text={"COMPRIS"}
              handlePress={() => {
                setShowResult(!showResult)
                handleCorrectExercise(false)
                setProgress((exercise.exerciseId) / exercises.length)
              }}
            />
          </View>
        )}

      </View>

    </SafeAreaView>
  )
}

export default OpenImageGuess