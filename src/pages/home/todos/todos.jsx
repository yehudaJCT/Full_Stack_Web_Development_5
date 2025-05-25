import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../hooks/userProvider'; 
import { getAll, patch, update, remove } from '../../../utils/dbUtil';
import TodoDetail from './todoDetail'; // Assuming you have a separate component for TodoDetail
import TodoList from './todoList';

const Todos = () => {
  const { currentUser } = useContext(UserContext);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState(null);


  useEffect(() => {
    if (currentUser) {
      getAll('todos')
        .then(data => {
          const userTodos = data.filter(todo => String(todo.userId) === String(currentUser));
          setTodos(userTodos);
        })
        .finally(() => setLoading(false));
    } else {
      setTodos([]);
      setLoading(false);
    }
  }, [currentUser]);


  if (loading) return <div>Loading todos...</div>;
  if (todos.length === 0) return <div>No todos found for this user.</div>;

  // Detail view for selected todo
  if (selectedTodo) {
    return (
      <TodoDetail
        selectedTodo={selectedTodo}
        setSelectedTodo={setSelectedTodo}
        setTodos={setTodos}
      />
    );
  }

  return (
    // List view
    < TodoList
      todos={todos}
      setTodos={setTodos}
      setSelectedTodo={setSelectedTodo}
    />
  );
};

export default Todos;