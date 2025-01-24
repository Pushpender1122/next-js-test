import { Todo } from '@/model/Todo'
import React, { useEffect } from 'react'

interface TodoProps {
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}
const Todos = ({ todos, setTodos }: TodoProps) => {
    function removeTodo(id: Number) {
        const filterList = todos.filter((e) => e.id !== id)
        setTodos(filterList);
    }
    useEffect(() => {
        function test() {
            console.log("hlo")
        }
        window.addEventListener('load', test)
        return () => {
            console.log("remov")
            window.removeEventListener('load', test)
        }
    }, [])
    return (
        <div>
            {todos.map((e) => {
                return <h1 key={e.id.toString()}>
                    {e.Name}
                    <button className='ml-5' onClick={() => removeTodo(e.id)}>Delete</button>
                </h1>
            })}

        </div>
    )
}

export default Todos
