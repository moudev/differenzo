import React, { useEffect, useState } from 'react'
import short from 'short-uuid'

import './App.css'

import Card from './components/Card'

function App() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const tasksFromLocalStorage = localStorage.getItem('items')
      ? localStorage.getItem('items')
      : '[]'

    setTasks(JSON.parse(tasksFromLocalStorage))
  }, [])

  const handleTask = (data, task) => {
    if (!task) {
      const item = {
        id: short.uuid(),
        original: {
          ...data.original,
        },
        modified: {
          ...data.modified,
        },
      }
      setTasks((prevTasks) => {
        const newTasks = [item, ...prevTasks]
        localStorage.setItem('items', JSON.stringify(newTasks))
        return newTasks
      })
    } else if (task && task.id) {
      setTasks((prevTasks) => {
        const index = prevTasks.findIndex((element) => element.id === task.id)

        const item = {
          ...prevTasks[index],
          original: data.original,
          modified: data.modified,
        }

        prevTasks.splice(index, 1, item)

        const newTasks = [...prevTasks]
        localStorage.setItem('items', JSON.stringify(newTasks))
        return newTasks
      })
    }
  }

  return (
    <div className="bg-$bg-primary text-$color-primary font-semibold min-h-screen">
      <div className="container mx-auto">
        <div className="px-6 py-8 grid gap-y-16 md:px-8 lg:py-12">
          <Card handleTask={handleTask} />
          {tasks.map((task) => (
            <Card task={task} key={task.id} handleTask={handleTask} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
