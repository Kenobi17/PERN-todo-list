import React, { useState, createContext } from "react";

export const TodoContext = createContext();

export const TodoContextProvider = (props) => {
  const [todos, setTodos] = useState([]);
  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };
  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        addTodo,
      }}>
      {props.children}
    </TodoContext.Provider>
  );
};
