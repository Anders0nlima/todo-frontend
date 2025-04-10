import { useState, useEffect } from 'react';
import { getTodos, createTodo, deleteTodo, updateTodo } from '../services/api';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faCheck } from '@fortawesome/free-solid-svg-icons';

import styles from './TodoList.module.css';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editTodoId, setEditTodoId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');

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

  const handleEditClick = (todo) => {
    setEditTodoId(todo.id);
    setEditedTitle(todo.title);
  };

  const handleSaveEdit = async (id) => {
    await updateTodo(id, { title: editedTitle });
    setEditTodoId(null);
    setEditedTitle('');
    fetchTodos();
  };

  const handleToggleCompleted = async (todo) => {
    await updateTodo(todo.id, { ...todo, completed: !todo.completed });
    fetchTodos();
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
            {editTodoId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className={styles.input}
                />
                <button onClick={() => handleSaveEdit(todo.id)} className={styles.saveButton}>
                  Salvar
                </button>
              </>
            ) : (
              <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.title}
              </span>
            )}
            
             <div className={styles.buttonGroup}>
            <button onClick={() => handleEditClick(todo)} className={styles.editButton}>
              <FontAwesomeIcon icon={faPen} />
            </button>
            <button onClick={() => handleToggleCompleted(todo)} className={styles.completeButton}>
              <FontAwesomeIcon icon={faCheck} />
            </button>
            <button onClick={() => handleDeleteTodo(todo.id)} className={styles.deleteButton}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
            </div>
            
          </li>
        ))}
      </ul>
    </div>
  );
}