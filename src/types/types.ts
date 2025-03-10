import { Todo } from "../schemas/todo"

export type OnAddTodo = (title: string) => Promise<void>
export type OnToggleTodo = (id: string, completed: boolean) => Promise<void>
export type OnDeleteTodo = (id: string) => Promise<void>

export enum Filter {
    All = 'all',
    Completed = 'completed',
    Active= 'active'
}

export interface TodoItemProps {
    todo: Todo
}

export interface ConfirmationDialogProps {
    isOpen: boolean
    onConfirm: () => void
    onCancel: () => void
    title: string
    message: string
}

export interface FilterButtonProps {
    label: string
    isActive: boolean
    filter: Filter
}


export type TodoStore = {
    todos: Todo[],
    filter: Filter,
    isDarkMode: boolean,
    isLoading: boolean,
    isUpdating: boolean,
    error: string | null,
    fetchError: string | null,
    actions: {
        fetchTodos: () => Promise<void>,
        addTodo: OnAddTodo,
        toggleTodo: OnToggleTodo,
        deleteTodo: OnDeleteTodo,
        setFilter: (filter: Filter) => void,
        setIsDarkMode: (isDarkMode: boolean) => void,
        setError: (error: string | null) => void,
        toggleTheme: () => void
    }
}

