/* eslint-disable no-underscore-dangle */
import React, { useState, useRef } from 'react'
import { Myers, Encoder } from '@moudev/myers-diff'
import _debounce from 'lodash/debounce'

function Card() {
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
    <div className="border border-dashed border-purple-400 p-4 rounded-lg grid">
      <div className="grid gap-4 order-1">
        <h3 className="text-[#c5c5ce]">Original</h3>
        <textarea
          className="p-2 rounded-lg h-40 focus:outline-dotted-purple-400 outline-2 outline-offset-4"
          onChange={handleInput}
          ref={originalRef}
        />
        <h3 className="text-[#c5c5ce]">Modified</h3>
        <textarea
          className="p-2 rounded-lg h-40 focus:outline-dotted-purple-400 outline-2 outline-offset-4"
          onChange={handleInput}
          ref={modifiedRef}
        />
      </div>
      {results.length === 2 && (
        <div className="grid pt-0 order-3">
          <h3>Results</h3>
          <div className="mb-8 text-left">
            <div className="bg-red-200 p-2 rounded-lg flex flex-wrap mb-1">
              {results[0]._parts.map((m, index) => (
                <span
                  key={`${m.text}-${m.pos}`}
                  className={`mr-2 p-1 rounded-md ${
                    results[0]._modified[`${index}`] ? 'bg-red-300' : 'no'
                  }`}
                >
                  {m.text}
                </span>
              ))}
            </div>
            <div className="bg-green-200 p-2 rounded-lg flex flex-wrap mt-4 ">
              {results[1]._parts.map((m, index) => (
                <span
                  key={`${m.text}-${m.pos}`}
                  className={`mr-2 p-1 rounded-md ${
                    results[1]._modified[`${index}`] ? 'bg-green-300' : 'no'
                  }`}
                >
                  {m.text}
                </span>
              ))}
            </div>
          </div>
          <p />
        </div>
      )}
      <div className="flex justify-end order-2">
        <button
          type="button"
          className="bg-[#ab79d6]  font-semibold rounded-md mt-4 py-2 px-6 place-self-end hover:bg-purple-400 focus:outline-dotted-purple-400 outline-2 outline-offset-4"
          onClick={compareTexts}
        >
          Check
        </button>
      </div>
    </div>
  )
}

export default Card
