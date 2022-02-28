import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo mb-4" alt="logo" />
        <p className="mb-16">
          Vite + React.js + WindiCSS + ESLint + Prettier + Husky + Lint-staged
        </p>
        <p className="mb-4">
          <button
            type="button"
            onClick={() => setCount((prevCount) => prevCount + 1)}
            className="border border-white border-2 rounded-lg px-4 py-1 mb-16 bg-[#646CFF]"
          >
            count is: {count}
          </button>
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  )
}

export default App
