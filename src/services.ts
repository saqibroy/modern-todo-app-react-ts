import { ZodError } from "zod";
import { ApiError, ApiResponse, Todo, TodoCreateDTO, TodoCreateSchema, TodoSchema } from "./schemas/todo";

const API_BASE = 'https://todo-app-api-4r8q.onrender.com/';

export const handleResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
  if(!response.ok) {
    const error: ApiError = {
      message: response.statusText,
      statusCode: response.status
    }
    return {data: null, error}
  }
  const data = await response.json()

  return {data: data, error: null}
}

export const fetchTodosFromApi = async (): Promise<ApiResponse<Todo[]>> => {
  try {
    const response = await fetch(`${API_BASE}/todos`)
    const { data, error } = await handleResponse(response)
    if(data) {
      const validatedData = TodoSchema.array().parse(data)
      return { data: validatedData, error: null }
    }
    return {data: null, error}
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        data: null,
        error: { message:error.errors[0].message, statusCode: 400 }
      }
    }
    return { data: null, error: {statusCode: 500, message: 'network error'} }
  }
  
}

export const addNewTodo = async (todo: TodoCreateDTO): Promise<ApiResponse<Todo>> => {
  try {
    const validatedTitle = TodoCreateSchema.parse(todo)
    const response = await fetch(`${API_BASE}/todos`, {
      method: 'POST',
      headers: {'content-Type': 'application/json'},
      body: JSON.stringify({
        ...validatedTitle,
        completed: false,
        createdAt: new Date().toISOString()
      })
    })
    const {data, error} = await handleResponse(response)
    if(data) {
      const validatedData = TodoSchema.parse(data)
      return {data: validatedData, error: null}
    }
    return {data:null, error}
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        data: null,
        error: { message:error.errors[0].message, statusCode: 400 }
      }
    }
    return {data: null, error: {message: 'Network Error', statusCode: 500}}
  }
}

export const toggleTodoById = async (id: string, completed: boolean): Promise<ApiResponse<Todo>> => {
  try {
    const response = await fetch(`${API_BASE}/todos/${id}`, {
      method: 'PATCH',
      headers: {'content-Type': 'application/json'},
      body: JSON.stringify({
        completed: !completed
      })
    })
    const {data, error} = await handleResponse(response)
    if(data) {
      const validatedData = TodoSchema.parse(data)
      return { data: validatedData, error: null }
    }
    return {data: null, error}
  } catch (error) {
    return {data: null, error: {message: "Network error", statusCode: 500}}
  }
}

export const deleteTodoById = async (id: string): Promise<ApiResponse<null>> => {
  try {
    const deleteResponse = await fetch(`${API_BASE}/todos/${id}`, {
      method: 'DELETE'
    })
    const {data, error} = await handleResponse(deleteResponse)
    if(data) {
      return { data: null, error: null }
    }
    return {data: null, error}
  } catch (error) {
    return {data: null, error: {message: "Network error", statusCode: 500}}
  }
}
