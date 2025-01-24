'use client'
import Todos from '@/components/Todos'
import { Todo } from '@/model/Todo'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
const Home = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [todoState, setTodoState] = useState<string>("")

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // setTodos()
    e.preventDefault()
    setTodos([...todos, { id: Date.now(), Name: todoState, isValid: false }])
    setTodoState('')

  }

  return (
    <>
      <div className='flex justify-center items-center h-40'>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input className='mr-3 text-black' type="text" placeholder={"Enter Todos"} value={todoState} onChange={(e) => setTodoState(e.target.value)} />
          <button type='submit'>Add todos</button>
          <Link href={{
            pathname: '/dashboard',
            query: { data: todoState }
          }} > Go to dashBoard</Link>
        </form>
      </div>
      <Todos todos={todos} setTodos={setTodos} />
    </>
  )
}
export default Home
