import React, { useEffect, useState } from 'react'
import short from 'short-uuid'

import './App.css'

import Card from './components/Card'

function App() {
  const [tasks, setTasks] = useState([])
  const defaultTask = {
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
    const tasksFromLocalStorage = localStorage.getItem('quotes')
      ? localStorage.getItem('quotes')
      : '[]'

    const newTasks = JSON.parse(tasksFromLocalStorage)
    newTasks.unshift({ id: short.uuid(), ...defaultTask })

    setTasks(newTasks)
  }, [])

  const handleTask = (data, task) => {
    const index = tasks.findIndex((element) => element.id === task.id)

    setTasks((prevTasks) => {
      const item = {
        ...prevTasks[index],
        original: data.original,
        modified: data.modified,
      }

      prevTasks.splice(index, 1, item)
      localStorage.setItem('quotes', JSON.stringify(prevTasks))

      const newTasks = [...prevTasks]
      if (index === 0) {
        newTasks.unshift({ id: short.uuid(), ...defaultTask })
      }
      return newTasks
    })
  }

  return (
    <div className="bg-$bg-primary text-$color-primary font-semibold min-h-screen">
      <div className="container mx-auto">
        <div className="px-6 py-8 grid gap-y-16 md:px-8 lg:py-12">
          {tasks.map((task) => (
            <Card task={task} key={task.id} handleTask={handleTask} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
