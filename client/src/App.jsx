import React from "react";
import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";
import { TodoContextProvider } from "./context/TodoContext";

function App() {
  return (
    <TodoContextProvider>
      <div className="App container">
        <InputTodo />
        <ListTodos />
      </div>
    </TodoContextProvider>
  );
}

export default App;
