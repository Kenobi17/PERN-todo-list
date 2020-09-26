import React, { useContext, useEffect } from "react";
import { TodoContext } from "../context/TodoContext";
import EditTodo from "./EditTodo";
import TodoAPI from "../apis/TodoAPI";

const ListTodos = () => {
  const { todos, setTodos } = useContext(TodoContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await TodoAPI.get("/");
        setTodos(response.data.data.todos);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, []);
  const handleDelete = async (e, id) => {
    try {
      e.stopPropagation();
      await TodoAPI.delete(`/${id}`);
      setTodos(
        todos.filter((todo) => {
          return todo.id !== id;
        })
      );
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => {
            return (
              <tr key={todo.id}>
                <td>{todo.description}</td>
                <td>
                  <EditTodo todo={todo} allTodos={todos} />
                </td>
                <td>
                  <button
                    onClick={(e) => handleDelete(e, todo.id)}
                    className="btn btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ListTodos;
