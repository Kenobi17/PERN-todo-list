import React, { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import TodoAPI from "../apis/TodoAPI";

const InputTodo = () => {
  const { addTodo } = useContext(TodoContext);
  const [description, setDescription] = useState("");
  const handleChange = (e) => {
    const { value } = e.currentTarget;
    setDescription(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await TodoAPI.post("/", {
        description: description,
      });
      addTodo(response.data.data.todo);
      setDescription("");
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div className="InputTodo">
      <h1 className="text-center my-5">Input Todo</h1>
      <form onSubmit={handleSubmit} className="d-flex">
        <input
          onChange={handleChange}
          value={description}
          name="description"
          type="text"
          placeholder="add to do"
          className="form-control"></input>
        <button type="submit" className="btn btn-success">
          Add
        </button>
      </form>
    </div>
  );
};

export default InputTodo;
