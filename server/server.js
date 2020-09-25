require("dotenv").config();
const express = require("express"),
  PORT = process.env.PORT || 4000,
  cors = require("cors"),
  db = require("./db"),
  app = express();

app.use(cors());
app.use(express.json());

//ROUTES//

//GET ALL TODOS
app.get("/api/v1/todo/", async (req, res) => {
  try {
    const allTodos = await db.query("SELECT * FROM todo");
    res.json({
      status: "success",
      data: {
        todos: allTodos.rows,
      },
    });
  } catch {
    console.error(err.message);
  }
});

//GET A TODO
app.get("/api/v1/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await db.query("SELECT * FROM todo WHERE id = $1", [id]);
    res.json({
      status: "success",
      data: {
        todo: todo.rows[0],
      },
    });
  } catch {
    console.error(err.message);
  }
});

//CREATE A TODO
app.post("/api/v1/todo", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await db.query(
      "INSERT INTO todo (description) VALUES ($1) RETURNING *",
      [description]
    );
    res.json({
      status: "success",
      data: {
        todo: newTodo.rows[0],
      },
    });
  } catch (err) {
    console.error(err.message);
  }
});
//UPDATE A TODO
app.put("/api/v1/todo/:id", async (req, res) => {
  try {
    const { description } = req.body;
    const { id } = req.params;
    const updatedTodo = await db.query(
      "UPDATE todo SET description = $1 WHERE id = $2 RETURNING *",
      [description, id]
    );
    res.json({
      status: "success",
      data: {
        todo: updatedTodo.rows[0],
      },
    });
  } catch (err) {
    console.error(err.message);
  }
});

//DELETE A TODO
app.delete("/api/v1/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await db.query("DELETE FROM todo WHERE id = $1", [id]);
    res.json({
      status: "Todo deleted!",
    });
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`API SERVER RUNNING AT http://localhost:${PORT}`);
});
