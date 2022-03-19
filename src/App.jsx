import React, { useEffect, useState } from 'react'
import short from 'short-uuid'

import './App.css'

import Card from './components/Card'

function App() {
  const [quotes, setQuotes] = useState([])
  const defaultQuote = {
    original: {
      fullText: '',
      _parts: [],
      _modified: [],
    },
    modified: {
      fullText: '',
      _parts: [],
      _modified: [],
    },
  }

  useEffect(() => {
    const quotesFromLocalStorage = localStorage.getItem('quotes')
      ? localStorage.getItem('quotes')
      : '[]'

    const newQuotes = JSON.parse(quotesFromLocalStorage)
    newQuotes.unshift({ id: short.uuid(), ...defaultQuote })

    setQuotes(newQuotes)
  }, [])

  const handleQuote = (data, quote) => {
    const index = quotes.findIndex((element) => element.id === quote.id)

    setQuotes((prevQuotes) => {
      const item = {
        ...prevQuotes[index],
        original: data.original,
        modified: data.modified,
      }

      prevQuotes.splice(index, 1, item)
      localStorage.setItem('quotes', JSON.stringify(prevQuotes))

      const newQuotes = [...prevQuotes]
      if (index === 0) {
        newQuotes.unshift({ id: short.uuid(), ...defaultQuote })

        // scroll to recently created quote
        const tag = document.createElement('a')
        tag.setAttribute('href', `#${quote.id}`)
        tag.click()
      }

      return newQuotes
    })
  }

  const deleteQuote = (quote) => {
    const index = quotes.findIndex((element) => element.id === quote.id)

    setQuotes((prevQuotes) => {
      prevQuotes.splice(index, 1)

      const quotesFromLocalStorage = localStorage.getItem('quotes')
        ? localStorage.getItem('quotes')
        : '[]'

      const convertedQuotes = JSON.parse(quotesFromLocalStorage)
      convertedQuotes.splice(index - 1, 1)
      localStorage.setItem('quotes', JSON.stringify(convertedQuotes))

      const newQuotes = [...prevQuotes]
      return newQuotes
    })
  }

  return (
    <div className="bg-$bg-primary text-$color-primary font-semibold min-h-screen">
      <div className="container mx-auto">
        <div className="px-6 py-8 grid gap-y-16 md:px-8 lg:py-12">
          {quotes.map((quote, index) => (
            <Card
              open={index === 0 || index === 1}
              quote={quote}
              key={quote.id}
              handleQuote={handleQuote}
              deleteQuote={deleteQuote}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
