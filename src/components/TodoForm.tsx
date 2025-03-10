import { useState } from 'react'
import { useActions, useError } from '../store/todo'
import { TodoCreateSchema } from '../schemas/todo'

function TodoForm() {
  // Local states
  const [newTodoTitle, setNewTodoTitle] = useState<string>('')
  
  // Zustand global state selectors
  const { addTodo } = useActions()
  const error = useError()
  const {setError} = useActions()

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTodoTitle.trim()) {
      setError('Title cannot be empty');
      return;
    }
    addTodo(newTodoTitle)
    setNewTodoTitle('')
  }

  const handleTodoChange = (title: string) => {
    setNewTodoTitle(title);

    const validatedTitle = TodoCreateSchema.safeParse({title})

    // Real-time validation
    if (!validatedTitle.success) {
      setError(validatedTitle.error.errors[0].message)
    } else {
      setError(null)
    }
  }

  return (
    <form onSubmit={handleAddTodo} className="flex flex-col gap-2">
      <div className="flex gap-2">
        <label htmlFor="todo-input" className="sr-only">
          Add a new todo
        </label>
        <input
          id="todo-input"
          aria-invalid={!!error}
          aria-describedby="error-message"
          type="text"
          placeholder="Add a new task..."
          value={newTodoTitle}
          onChange={(e) => {
            handleTodoChange(e.target.value)
          }}
          className={`flex-1 p-4 rounded-lg border ${
            error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          } bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 ${
            error ? 'focus:ring-red-500' : 'focus:ring-purple-500 dark:focus:ring-purple-400'
          } transition-all`}
        />
        <button
          type="submit"
          disabled={!newTodoTitle.trim()}
          className="p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Add new Todo"
        >
          ➕
          <span className="sr-only">Add new Todo</span>
        </button>
      </div>
      {error && (
        <div id="error-message" className="text-red-500 text-sm mt-1">
          {error}
        </div>
      )}
    </form>
  )
}

export default TodoForm