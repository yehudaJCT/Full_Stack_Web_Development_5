import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../hooks/userProvider'; 
import { getAll } from '../../../utils/dbUtil';
import TodoList from './todoList';
import { filterTodos } from '../../../utils/searchUtils';

const Todos = ({ todos, setTodos, searchTerm }) => {
  const { currentUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

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
  }, [currentUser, setTodos]);

  if (loading) return <div>Loading todos...</div>;
  if (todos.length === 0) return <div>No todos found for this user.</div>;

  return (
    <TodoList
      todos={filteredTodos}
      setTodos={setTodos}
    />
  );
};

export default Todos;