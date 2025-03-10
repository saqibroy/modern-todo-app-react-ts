import React from 'react'
import { FilterButtonProps} from '../types/types'
import { useActions } from '../store/todo'

const FilterButton = React.memo(({ label, isActive, filter }: FilterButtonProps) => {
  const {setFilter} = useActions()
  return (
    <button
      type='button'
      aria-label={`Select ${label} filter`}
      onClick={() => setFilter(filter)}
      aria-pressed={isActive}
      className={`flex-1 p-4 ${
        isActive
          ? 'border-b-2 border-purple-600 text-purple-600 dark:border-purple-400 dark:text-purple-400'
          : 'hover:bg-gray-50 dark:hover:bg-gray-700'
      } transition-colors`}
    >
      {label}
    </button>
  )
})

export default FilterButton
