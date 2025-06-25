var express = require('express');
var cors = require('cors');
var mysql = require('mysql2');
app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Vamsi#2004",
  database: "todo_list"
});

db.connect((err) => {
  if (err) {
    console.log("There is a some error");
  } else {
    console.log("Successfully connected");
  }
});

app.get("/", (req, res) => {
  db.query('SELECT * FROM toitems', (err, results) => {
    if (err) {
      console.log("Some error is there");
      return;
    }
    console.log("fetched data", results);
    res.json(results);
  });
});

app.post("/", (req, res) => {
  console.log(req.body);

  db.query(`INSERT INTO toitems(item_description) VALUES('${req.body.text}')`, (err, results) => {
    if (err) {
      console.log("Something went wrong", err);
      res.status(500).json({ error: "Insert failed" });
    } else {
      console.log("Pushed successfully");
      res.json({ id: results.insertId, item_description: req.body.text });
    }
  });
});


// app.delete("/",(req,res)=>{
    
//     db.query(`delete from toitems where `)


// })

app.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.query(`DELETE FROM toitems WHERE id = ?`, [id], (err, results) => {
    if (err) {
      console.log("Delete error", err);
      res.status(500).json({ error: "Delete failed" });
      return;
    }
    res.json({ message: "Deleted successfully" });
  });
});

app.put("/:id", (req, res) => {
  const id = req.params.id;
  const newText = req.body.text;
  db.query(
    "UPDATE toitems SET item_description = ? WHERE id = ?",
    [newText, id],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ message: "Todo updated" });
    }
  );
});


app.listen(3000, () => {
  console.log("Server running...");
});
