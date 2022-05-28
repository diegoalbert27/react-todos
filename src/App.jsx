import React, { Fragment, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid'
import { TodoList } from "./components/TodoList";

const KEY = 'todoApp.todos'

export function App() {
  const [todos, setTodos] = useState([])

  const toggleTodo = (id) => {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.completed = !todo.completed
    setTodos(newTodos)
  }

  const todoTaskRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(KEY))
    if (storedTodos) {
      setTodos(storedTodos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(todos))
  }, [todos])

  const handleTodoAdd = () => {
    const task = todoTaskRef.current.value
    if (task === '') return

    const todo = {
      id: uuidv4(),
      task,
      completed: false
    }

    setTodos((prevTodo => [...prevTodo, todo]))
    todoTaskRef.current.value = null
  }

  const handleClearAll = () => {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }

  return (
    <Fragment>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoTaskRef} type="text" placeholder="Nueva Tarea" />
      <button onClick={handleTodoAdd}>Add</button>
      <button onClick={handleClearAll}>Remove</button>
      <div>
        Te quedan {todos.filter(todo => !todo.completed).length} tareas por terminar
      </div>
    </Fragment>
  )
}