import React, { useReducer, useState } from 'react';
import './TodoApp.css';

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { id: Date.now(), text: action.payload }];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
};

const TodoApp = () => {
  const [todoText, setTodoText] = useState('');
  const [todos, dispatch] = useReducer(todoReducer, []);

  const handleAddTodo = () => {
    if (todoText.trim()) {
      dispatch({ type: 'ADD_TODO', payload: todoText });
      setTodoText('');
    }
  };

  const handleToggleTodo = id => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const handleDeleteTodo = id => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  return (
    <div className="todo-app">
      <h1>Todo App</h1>
      <div className="add-todo">
        <input
          type="text"
          value={todoText}
          onChange={e => setTodoText(e.target.value)}
          placeholder="Enter a new todo"
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li
            key={todo.id}
            className={`todo-item ${todo.completed ? 'completed' : ''}`}
            onClick={() => handleToggleTodo(todo.id)}
          >
            {todo.text}
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
