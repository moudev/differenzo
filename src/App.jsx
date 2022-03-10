/* eslint-disable no-underscore-dangle */
import React, { useState, useRef } from 'react'
import { Myers, Encoder } from '@moudev/myers-diff'
import _debounce from 'lodash/debounce'

import './App.css'

function App() {
  const originalRef = useRef()
  const modifiedRef = useRef()
  const [results, setResults] = useState([])
  const encoder = new Encoder()

  const compareTexts = () => {
    const { getLongestCommonSubsequence } = Myers
    const original = originalRef.current.value.trim()
    const modified = modifiedRef.current.value.trim()

    if (original === '' || modified === '') {
      return
    }

    // https://github.com/wickedest/myers-diff#myersdifflhs-rhs-options
    const settings = {
      compare: 'words',
      ignoreWhitespace: false,
      ignoreCase: false,
      ignoreAccents: false,
    }

    const originalEncoded = encoder.encode(original, settings)
    const modifiedEncoded = encoder.encode(modified, settings)

    getLongestCommonSubsequence(
      originalEncoded,
      0,
      originalEncoded.length,
      modifiedEncoded,
      0,
      modifiedEncoded.length
    )

    setResults([originalEncoded, modifiedEncoded])
  }

  // https://medium.com/nerd-for-tech/debounce-your-search-react-input-optimization-fd270a8042b
  const handleInput = _debounce(compareTexts, 500)

  return (
    <div className="App">
      <div className="container mx-auto border grid grid-cols-2">
        <div className="border grid gap-4 p-8">
          <h3>Original</h3>
          <textarea
            className="border p-2"
            onChange={handleInput}
            ref={originalRef}
          />
          <h3>Modified</h3>
          <textarea
            className="border p-2"
            onChange={handleInput}
            ref={modifiedRef}
          />
          <button type="button" className="bg-blue-400" onClick={compareTexts}>
            Check
          </button>
        </div>
        <div className="border grid p-8">
          <h3>Results</h3>
          <div className="mb-8 text-left">
            <div className="bg-red-100 p-2 rounded-lg flex flex-wrap mb-1">
              {results.length === 2 &&
                results[0]._parts.map((m, index) => (
                  <span
                    key={`${m.text}-${m.pos}`}
                    className={`mr-2 p-1 rounded-md ${
                      results[0]._modified[`${index}`] ? 'bg-red-200' : 'no'
                    }`}
                  >
                    {m.text}
                  </span>
                ))}
            </div>
            <div className="bg-green-100 p-2 rounded-lg flex flex-wrap ">
              {results.length === 2 &&
                results[1]._parts.map((m, index) => (
                  <span
                    key={`${m.text}-${m.pos}`}
                    className={`mr-2 p-1 rounded-md ${
                      results[1]._modified[`${index}`] ? 'bg-green-200' : 'no'
                    }`}
                  >
                    {m.text}
                  </span>
                ))}
            </div>
          </div>
          <p />
        </div>
      </div>
    </div>
  )
}

export default App
