import { useFetchError } from "../store/todo"

const ErrorDisplay = () => {
  const fetchError = useFetchError()

  if (!fetchError) return null; // Don't show anything if there's no error

  return (
    <div
      className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg shadow-md flex items-center gap-3 max-w-md w-full"
      role="alert"
      aria-live="assertive"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span className="font-semibold">Error:</span>
      <span className="flex-1">{fetchError}</span>
    </div>
  )
}

export default ErrorDisplay
