import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'

const App = () => {
  return (
    <div className='mx-4 sm:[10%]'>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default App