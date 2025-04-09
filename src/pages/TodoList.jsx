import { useState, useEffect } from 'react';
import { getTodos, createTodo, deleteTodo, updateTodo } from '../services/api';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import styles from './TodoList.module.css';



export default function TodoList() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
  
    useEffect(() => {
      fetchTodos();
    }, []);
  
    const fetchTodos = async () => {
      const response = await getTodos();
      setTodos(response.data);
    };
  
    const handleAddTodo = async () => {
      if (!newTodo.trim()) return;
      await createTodo({ title: newTodo, completed: false });
      setNewTodo('');
      fetchTodos();
    };

    const handleDeleteTodo = async (id) => {
      try {
        await deleteTodo(id);
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      } catch (error) {
        console.error('Erro ao deletar a tarefa:', error);
      }
    };
  
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>To-Do List</h1>
        <div className={styles.inputContainer}>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Nova tarefa"
            className={styles.input}
          />
          <button onClick={handleAddTodo} className={styles.button}>
            Adicionar
          </button>
        </div>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className={styles.todoItem}>
              {todo.title}
              <button 
                onClick={() => handleDeleteTodo(todo.id)} 
                className={styles.deleteButton}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }