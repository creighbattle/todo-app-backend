const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const PORT = process.env.PORT || 5000;

//process.env.PORT
//process.env.NODE_ENV => production or undefined

//Middleware
app.use(cors());
app.use(express.json()); //req.body

// if (process.env.NODE_ENV === "production") {
//   //server static content
//   //npm run build
//   app.use(express.static(path.join(__dirname, "client/build")));
// }

//Routes

//create a todo

app.post("/todos", async (req, res) => {
  try {
    // const { description } = req.body;

    // const newTodo = await pool.query(
    //   "INSERT INTO todo (description) VALUES($1) RETURNING *",
    //   [description]
    // );

    //res.json(newTodo.rows[0]);

    res.send("<h1>Hello</h1>");
  } catch (error) {
    console.log(error);
  }
});

//get all todos

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    //res.json(allTodos.rows);
    res.send("<h1>Working</h1>");
    console.log(`no erros + ${allTodos}`);
    pool.end();
  } catch (error) {
    console.log(error);
  }
  //res.send("<h1>Hello</h1>");
});

//get a todo

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

//update a todo

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );

    res.json("update");
  } catch (error) {
    console.log(error);
  }
});

//delete a todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json("Todo was deleted");
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`server has started`);
});
