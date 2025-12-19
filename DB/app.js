const express = require('express');
const app = express();

const pool = require("./db"); // connect to db

app.use(express.json());
const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/addasync", async (req, res) => {
  try {
    const name = "ray2";
    const mobile = "321";
    const email = "ray@gmail.com";

    const newCont = await pool.query(
      `INSERT INTO contacts (name,email,mobile) VALUES ('${name}','${email}', '${mobile}') RETURNING *`
    );

    res.json(newCont);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});




app.get("/del", async (req, res) => {
  try {
    const delName = '${name}';
    const delCont = await pool.query(
      `DELETE FROM contacts WHERE name= '${delName}' RETURNING *`
    );

    res.json(delData);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

app.get("/show/:name", async (req, res) => {
  try {
    const name = req.params.name;

    const findCont = await pool.query(
      `SELECT * FROM contacts WHERE name = '${name}'`
    );

    res.json(findCont.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});
