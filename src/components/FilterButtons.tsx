import React, { useMemo } from 'react';
import {Filter} from '../types/types'
import FilterButton from './FilterButton'
import { useFilter, useTodos } from '../store/todo';

const FilterButtons = React.memo(() => {
    const todos = useTodos()
    const filter = useFilter()
    const activeCount = useMemo(() => todos.filter((todo) => !todo.completed).length, [todos]);
    const completedCount = useMemo(() => todos.filter((todo) => todo.completed).length, [todos]);
  
    const filterOptions = [
      { label: 'All', value: Filter.All, count: todos.length },
      { label: 'Completed', value: Filter.Completed, count: completedCount },
      { label: 'Active', value: Filter.Active, count: activeCount },
    ]
  
    return (
      <nav aria-label='Todos filters'>
        <div role='group' aria-label='Filter todos' className="flex border-b border-gray-200 dark:border-gray-700">
          {filterOptions.map((filterOption) => (
            <FilterButton
              key={filterOption.value}
              label={`${filterOption.label} (${filterOption.count})`}
              filter={filterOption.value}
              isActive={filter === filterOption.value}
              aria-current={filter === filterOption.value ? 'page' : undefined}
            />
          ))}
        </div>
      </nav>
  )
  })

export default FilterButtons
