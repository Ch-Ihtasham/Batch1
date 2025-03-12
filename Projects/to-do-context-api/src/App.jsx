import { useState, useEffect } from 'react'
import './App.css'
import { TodoForm } from './components/TodoForm'
import { TodoItems } from './components/TodoItems'
import { TodoProvider } from './contexts/TodoContext'

function App() {


  const [todos, setTodos] = useState([])
  const [copyTodo, setCopyTodo] = useState([])
  const [filter, setFilter] = useState('all')

  function addTodo(todo) {
    setTodos((preV) => [todo, ...preV])
  }
  function updateTodo(id, todo) {
    setTodos((prev) => prev.map((Todo) => Todo.id === id ? { ...Todo, todo: todo } : Todo))
  }
  function deleteTodo(id) {
    setTodos((preV) => preV.filter((Todo) => Todo.id !== id))
  }
  function toggleComplete(id) {
    setTodos((preV) => preV.map((Todo) => Todo.id === id ? { ...Todo, completed: !Todo.completed } : Todo))
    setCopyTodo((preV) => preV.map((Todo) => Todo.id === id ? { ...Todo, completed: !Todo.completed } : Todo))

  }
  useEffect(() => {
    const todo = JSON.parse(localStorage.getItem("todos"))

    if (todo && todo.length > 0) {
      setTodos(todo)
      setCopyTodo(todo)
    }

  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))

  }, [todos])

  useEffect(() => {
    if (filter === 'all') {
      setCopyTodo(todos)
    }
    else if (filter === 'pending') {
      setCopyTodo(todos.filter((todo) => !todo.completed))
    }
    else if (filter === 'completed') {
      setCopyTodo(todos.filter((todo) => todo.completed))
    }
  }, [todos, filter])


  function all() {
    setFilter('all')
  }

  function pendingTodos() {
    setFilter('pending')
  }
  function completedTodos() {
    setFilter('completed')
  }

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className='flex items-center justify-evenly my-3'>
            <button className='rounded px-3 py-1 bg-green-600 text-white' onClick={all}>All</button>
            <button className='rounded px-3 py-1 bg-green-600 text-white' onClick={pendingTodos}>Pending</button>
            <button className='rounded px-3 py-1 bg-green-600 text-white' onClick={completedTodos}>Completed</button>
          </div>
          <div className="flex flex-wrap gap-y-3">

            {/*Loop and Add TodoItem here */}
            {copyTodo.map((todo) => (
              <div className='w-full' key={todo.id}>
                <TodoItems todo={todo} />
              </div>
            ))}


          </div>

        </div>
      </div>
    </TodoProvider>
  )
}

export default App
