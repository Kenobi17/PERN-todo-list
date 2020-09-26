import React, { useState, useContext, useEffect } from "react";
import { TodoContext } from "../context/TodoContext";
import TodoAPI from "../apis/TodoAPI";

const EditTodo = ({ todo, allTodos }) => {
  const [description, setDescription] = useState(todo.description);
  const { todos, setTodos } = useContext(TodoContext);
  useEffect(() => {
    setTodos(allTodos);
  }, []);
  const handleChange = (e) => {
    const { value } = e.currentTarget;
    setDescription(value);
  };
  const handleClick = async (id) => {
    try {
      const response = await TodoAPI.put(`/${id}`, {
        description: description,
      });
      setTodos(
        todos.map((todo) => (todo.id !== id ? todo : response.data.data.todo))
      );
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${todo.id}`}>
        Edit
      </button>

      <div
        className="modal"
        id={`id${todo.id}`}
        onClick={() => setDescription(todo.description)}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => setDescription(todo.description)}>
                &times;
              </button>
            </div>

            <div className="modal-body">
              <input
                onChange={handleChange}
                value={description}
                name="description"
                type="text"
                className="form-control"
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                onClick={() => handleClick(todo.id)}
                className="btn btn-warning"
                data-dismiss="modal">
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTodo;
