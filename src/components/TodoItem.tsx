import { lazy, Suspense, useState } from 'react'
import { useActions, useIsUpdating } from '../store/todo'
import { TodoItemProps } from '../types/types'
import LoadingSpinner from './LoadingSpinner';
const ConfirmationDialog = lazy(() => import('./ConfirmationDialog'));

function TodoItem({ todo }: TodoItemProps) {
  const [todoToDelete, setTodoToDelete] = useState<string | null>(null)

  const isUpdating = useIsUpdating()
  const { toggleTodo, deleteTodo } = useActions()

  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <ConfirmationDialog
          isOpen={!!todoToDelete}
          onConfirm={() => deleteTodo(todoToDelete!)}
          onCancel={() => setTodoToDelete(null)}
          title="Delete Todo?"
          message="Are you sure you want to delete this todo?"
        />
      </Suspense>
      <li
        className={`flex items-center gap-4 p-4 ${todo.completed
          ? 'bg-green-50 dark:bg-green-900'
          : 'group hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'}`}
      >
        <input
          type="checkbox"
          aria-checked={todo.completed}
          tabIndex={0}
          aria-label={`Toggle status of ${todo.title}. Currently ${todo.completed ? 'completed' : 'incomplete'}`}
          checked={todo.completed}
          className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-purple-600 focus:ring-purple-500"
          disabled={isUpdating}
          onChange={() => toggleTodo(todo.id, todo.completed)}
        />
        <span className={`flex-1 text-gray-800 dark:text-gray-200 ${todo.completed ? 'line-through' : ''}`}>
          {todo.title}
        </span>
        <button
          aria-describedby={`todo-${todo.id}-title`}
          aria-label={`Delete ${todo.title}`}
          className={`${todo.completed
            ? 'text-red-500 hover:text-red-600'
            : 'opacity-0 group-hover:opacity-100 focus:opacity-100 text-red-500 hover:text-red-600 transition-opacity'}`}
          onClick={() => setTodoToDelete(todo.id)}
        >
          🗑️
        </button>
        <span id={`todo-${todo.id}-title`} className="sr-only">
          {todo.title}
        </span>
      </li>
    </>
  )
}

export default TodoItem
