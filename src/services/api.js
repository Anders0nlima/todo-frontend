import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/todos',
  withCredentials: true,
});

export const getTodos = () => api.get('');
export const createTodo = (todo) => api.post('', todo);
export const updateTodo = (id, todo) => api.put(`/${id}`, todo);
export const deleteTodo = (id) => api.delete(`/${id}`);

export default api;