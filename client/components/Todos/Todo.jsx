import React, { useEffect, useState } from 'react'
import './TodosStyle.css'
import TodoEdit from './TodoEdit';

export default function Todo({ todoId, setTodos }) {
  const [todo, setTodo] = useState({});
  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    async function getTodo() {
      const url = `http://localhost:3305/todos/${todoId}`;
      await fetch(url)
        .then(response => response.json())
        .then(json => {
          setTodo(json);
        }).catch(error => {
          console.log(error);
        })
    };
    getTodo();
  }, [showUpdate]);

  async function handleChecked() {
    setTodo(todo => ({ ...todo, completed: !todo.completed }));
    const url = `http://localhost:3305/todos/${todoId}`;
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ completed: !todo.completed })
    }
    await fetch(url, options)
      .then(response => response.json())
      .then(json => {
        console.log(json);
      }).catch(error => {
        console.log(error);
      });
  }

  async function handleDelete() {
    const url = `http://localhost:3305/todos/${todoId}`;
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    }
    await fetch(url, options)
      .then(response => response.json())
      .then(json => {
        console.log(json);
      }).catch(error => {
        console.log(error);
      });
    setTodos(todos => todos.filter(todo => todo.id !== todoId));
  }

  return (
    <div className='todo'>
      <input type="checkbox" checked={todo.completed} onClick={handleChecked} />
      <h6>{todo.id}</h6>
      <p>{todo.title}</p>
      {showUpdate && <TodoEdit todo={todo} setShowEdit={setShowUpdate} />}
      <button onClick={() => setShowUpdate(true)}>✒️</button>
      <button onClick={handleDelete}>🗑️</button>
    </div>
  )
}