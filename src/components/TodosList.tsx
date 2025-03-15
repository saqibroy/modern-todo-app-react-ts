import React, { useMemo } from "react"
import TodoItem from "./TodoItem"
import { useFilter, useTodos, useIsLoading } from "../store/todo"
import TodoSkeleton from "./TodoSkeleton"

const TodosList = React.memo(() => {
  const todos = useTodos()
  const filter = useFilter()
  const isLoading = useIsLoading()

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "completed":
        return todos.filter((todo) => todo.completed)
      case "active":
        return todos.filter((todo) => !todo.completed)
      default:
        return todos
    }
  }, [todos, filter])

  return (
    <section>
      <h2 id="todo-list-title" className="sr-only">Todo List</h2>
      {isLoading ? (
        <div aria-busy="true">
          <TodoSkeleton />
        </div>
      ) : (
        <ul className="p-4" role="list" aria-labelledby="todo-list-title">
          {filteredTodos.map((todo) => (
            <TodoItem todo={todo} key={todo.id} />
          ))}
        </ul>
      )}
    </section>
  )
})

export default TodosList
