import React from 'react'

import './App.css'

import Card from './components/Card'

function App() {
  return (
    <div className="bg-$bg-primary text-$color-primary font-semibold min-h-screen">
      <div className="container mx-auto">
        <div className="px-6 py-8 grid gap-y-16 md:px-8 lg:py-12">
          <Card />
        </div>
      </div>
    </div>
  )
}

export default App
