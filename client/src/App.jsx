import React from "react";
import InputTodo from "./components/InputTodo";
import { TodoContextProvider } from "./context/TodoContext";

function App() {
  return (
    <TodoContextProvider>
      <div className="App container">
        <InputTodo />
      </div>
    </TodoContextProvider>
  );
}

export default App;
