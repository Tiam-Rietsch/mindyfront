import { useContext, createContext, useState } from 'react'

const DetailContext = createContext()

export const useDetailPopupContext = () => useContext(DetailContext)

export default DetailPopupProvider = ({ children }) => {
  const [focusedDetailId, setFocusedDetailId] = useState(-1)

  return (
    <DetailContext.Provider
      value={{
        focusedDetailId,
        setFocusedDetailId
      }}
    >
      { children }
    </DetailContext.Provider>
  )
}