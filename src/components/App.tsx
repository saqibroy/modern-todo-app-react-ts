import { useEffect, lazy, Suspense  } from 'react'
import { Toaster } from 'react-hot-toast'
import { onCLS, onINP, onLCP } from 'web-vitals'

import Header from './Header'
import FilterButtons from './FilterButtons'
import LoadingSpinner from './LoadingSpinner'
import { useActions, useFetchError, useIsLoading } from '../store/todo'

const TodosList = lazy(() => import('./TodosList'))
const ErrorDisplay = lazy(() => import('./ErrorDisplay'))

function App() {
  
  // Zustand global states
  const isLoading = useIsLoading()
  const fetchError = useFetchError()
  const { setIsDarkMode, fetchTodos } = useActions()

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initialTheme = savedTheme ? savedTheme === 'dark' : prefersDark
    setIsDarkMode(initialTheme)
    document.documentElement.classList.toggle('dark', initialTheme)
  }, [setIsDarkMode])

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  // Log Web Vitals
  useEffect(() => {
    onCLS(console.log); // Cumulative Layout Shift
    onINP(console.log); // First Input Delay
    onLCP(console.log); // Largest Contentful Paint
  }, []);

  if (isLoading) {
    return (
      <div role='status' aria-live='polite' aria-busy="true" className="flex justify-center items-center h-screen">
        <span className="sr-only">Loading todos...</span>
        <LoadingSpinner />
      </div>
    )
  }

  if (fetchError) {
    return (
      <div role='alert' aria-live='assertive'>
        <Suspense fallback={<LoadingSpinner />}>
          <ErrorDisplay />
        </Suspense>
      </div>
    )
  }

  return (
    <>
      <Toaster
        aria-live="polite"
        position="bottom-right"
        toastOptions={{
          className: 'dark:bg-gray-800 dark:text-white',
        }}
      />
      <a href="#main-content" className="sr-only focus:not-sr-only">
        Skip to main content
      </a>
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-4xl mx-auto p-6">
          <Header />
          <section role="main" className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <section aria-labelledby="filter-section">
              <h2 id="filter-section" className="sr-only">Filter Todos</h2>
              <FilterButtons />
            </section>
            <section aria-labelledby="todo-list-section">
              <h2 id="todo-list-section" className="sr-only">Your Todos</h2>
              <Suspense fallback={<LoadingSpinner />}>
                <TodosList />
              </Suspense>
            </section>
          </section>
          <footer className="text-center text-gray-600 dark:text-gray-400 mt-6">
            <small>© {new Date().getFullYear()} My Todo App. All rights reserved.</small>
          </footer>
        </div>
      </main>
    </>
  )
}

export default App
