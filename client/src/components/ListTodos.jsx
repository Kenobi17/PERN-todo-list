import React, { useContext, useState, useEffect } from "react";
import { TodoContext } from "../context/TodoContext";
import TodoAPI from "../apis/TodoAPI";

const ListTodos = () => {
  const { todos, setTodos } = useContext(TodoContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await TodoAPI.get("/");
        setTodos(response.data.data.todos);
        console.log(response.data.data.todos);
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
                  <button className="btn btn-warning">Edit</button>
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
