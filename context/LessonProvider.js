import { useState, createContext, useContext } from 'react'


const LessonContext = createContext()
export const useLessonContext = () => useContext(LessonContext)

export default LessonProvider = ({ children }) => {
  const [curExerciseIndex, setCurExerciseIndex] = useState(0)
  const [exercises, setExercises] = useState([])

  return (
    <LessonContext.Provider
      value={{
        curExerciseIndex,
        setCurExerciseIndex,
        exercises,
        setExercises
      }}
    >
      { children }
    </LessonContext.Provider>
  )
}