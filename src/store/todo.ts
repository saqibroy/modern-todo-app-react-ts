import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { Filter, TodoStore } from '../types/types'
import { addNewTodo, deleteTodoById, fetchTodosFromApi, toggleTodoById } from '../services'
import { toast } from 'react-hot-toast'

export const useTodoStore = create<TodoStore>()(devtools(persist((set) => ({
    todos: [],
    filter: Filter.All,
    isDarkMode: false,
    isLoading: false,
    isUpdating: false,
    error: null,
    fetchError: null,
    actions: {
        fetchTodos: async () => {
            set({isLoading: true, error: null})
            const { data, error} = await fetchTodosFromApi()
            if (data) set({todos: data.slice(0, 20), isLoading: false})
            if (error) set({fetchError: error.message, isLoading: false})
        },
        addTodo: async (title) => {
            const {data, error} = await addNewTodo({title})
            if (data) {
                set((state) => ({todos: [ data, ...state.todos ], filter: Filter.All}))
                toast.success('Todo added successfully!')
            }
            if (error) {
                set({error: error.message})
            }
        },
        toggleTodo: async (id, completed) => {
            set({isUpdating: true})
            const {data, error} = await toggleTodoById(id, completed)
            if(data) {
                set((state) => ({
                    todos: state.todos.map((todo) => 
                    todo.id ===  id ? {...todo, completed: data.completed} : todo
                    )
                }))
                toast.success(`Todo marked as ${data.completed ? 'completed' : 'pending'}!`)
            }
            if (error) {
                toast.error(error.message)
            }
            set({isUpdating: false})
        },
        deleteTodo: async (id) => {
            const {error} = await deleteTodoById(id)
            if (!error) {
                set((state) => ({
                    todos: state.todos.filter((todo) => todo.id !== id)
                }))
                toast.success('Todo deleted successfully!')
            }
            if (error) toast.error(error.message)
        },
        setFilter: (filter) => set({filter}),
        setIsDarkMode: (isDarkMode) => set({isDarkMode}),
        setError: (error) => set({error}),
        toggleTheme: () => {
            set((state) => {
                const isDarkMode = !state.isDarkMode;
                localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
                document.documentElement.classList.toggle('dark', isDarkMode)
                return { isDarkMode }
            })
        },
    }
  }),
  {
    name: 'todo-storage', // Unique name for localStorage
    partialize: (state) => ({ todos: state.todos }), // Only persist todos
  })
))

export const useTodos = () => useTodoStore((state) => state.todos)
export const useFilter = () => useTodoStore((state) => state.filter)
export const useIsDarkMode = () => useTodoStore((state) => state.isDarkMode)
export const useIsLoading = () => useTodoStore((state) => state.isLoading)
export const useIsUpdating = () => useTodoStore((state) => state.isUpdating)
export const useError = () => useTodoStore((state) => state.error)
export const useFetchError = () => useTodoStore((state) => state.fetchError)

export const useActions = () => useTodoStore((state) => state.actions)