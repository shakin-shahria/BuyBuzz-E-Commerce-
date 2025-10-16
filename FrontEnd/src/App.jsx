import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter } from 'react-router-dom'
import AppRoute from './routes/AppRoute'



function App() {

  return (
    <>
      <BrowserRouter>
        <AppRoute />
      </BrowserRouter>
    </>
  )
}

export default App
