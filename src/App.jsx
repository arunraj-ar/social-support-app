import { useEffect, useState } from 'react'
import { requestWriteSuggestion } from './api/openai'
import './App.css'
import { useTheme } from './hooks/useTheme';

function App() {
  const [count, setCount] = useState(0);
  const { theme, mode } = useTheme()

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await requestWriteSuggestion("Write a tagline for an ice cream shop")
        console.log(data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    if(count > 0){
      fetchData();
    }
  }, [count])

  return (
    <>
      <p className={`${theme.colors.info}`}>
        Hello, World!
      </p>
      <button onClick={() => {setCount(count+1)}} className={`${theme.buttons.base} ${theme.buttons.danger}`}>
        Button
      </button>
    </>
  )
}

export default App