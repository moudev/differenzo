/* eslint-disable no-underscore-dangle */
import React from 'react'

import './App.css'

import Card from './components/Card'

function App() {
  return (
    <div className="App bg-[#27272C] text-[#351d4a] font-semibold">
      <div className="container mx-auto">
        <div className="px-6 py-8 grid gap-y-8">
          <Card />
        </div>
      </div>
    </div>
  )
}

export default App
