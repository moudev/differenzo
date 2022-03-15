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
    <div className="border border-dashed border-purple-400 p-4 pb-6 rounded-lg grid lg:(grid-cols-2 gap-x-12 pb-6)">
      <div className="grid gap-4 lg:content-start">
        <h3 className="text-$color-secondary text-center">Original</h3>
        <textarea
          className="p-2 rounded-lg min-h-60 md:min-h-40 focus:outline-dotted-purple-400 outline-2 outline-offset-4 lg:text-lg"
          onChange={handleInput}
          ref={originalRef}
        />
        <h3 className="text-$color-secondary text-center">Modified</h3>
        <textarea
          className="p-2 rounded-lg min-h-60 md:min-h-40 focus:outline-dotted-purple-400 outline-2 outline-offset-4 lg:text-lg"
          onChange={handleInput}
          ref={modifiedRef}
        />
      </div>
      {results.length === 2 && (
        <div className="grid gap-y-4 mt-12 pb-2 md:pb-0 lg:(content-start mt-0)">
          <h3 className="text-$color-secondary text-center hidden lg:inline-block ">
            Differences
          </h3>
          <div className="bg-red-200 p-2 rounded-lg flex flex-wrap content-start gap-y-3 md:p-3">
            {results[0]._parts.map((m, index) => (
              <span
                key={`${m.text}-${m.pos}`}
                className={`mr-2 p-1 rounded-md ${
                  results[0]._modified[`${index}`] ? 'bg-red-300' : ''
                }`}
              >
                {m.text}
              </span>
            ))}
          </div>
          <div className="bg-green-200 p-2 rounded-lg flex flex-wrap content-start gap-y-3 md:p-3">
            {results[1]._parts.map((m, index) => (
              <span
                key={`${m.text}-${m.pos}`}
                className={`mr-2 p-1 rounded-md ${
                  results[1]._modified[`${index}`] ? 'bg-green-300' : ''
                }`}
              >
                {m.text}
              </span>
            ))}
          </div>

          <p />
        </div>
      )}
    </div>
  )
}

export default Card
