import { useActions, useIsDarkMode } from '../store/todo'
import TodoForm from './TodoForm'

function Header() {
  const isDarkMode = useIsDarkMode()
  const { toggleTheme } = useActions()

  return (
    <header role="banner" className="mb-8">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Todo App
        </h1>
        <button
          onClick={toggleTheme}
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          aria-expanded="false"
          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          {isDarkMode ? '🌙' : '☀️'}
          <span className="sr-only">{isDarkMode ? 'Dark mode enabled' : 'Light mode enabled'}</span>
        </button>
      </div>
      <TodoForm />
    </header>
  )
}

export default Header