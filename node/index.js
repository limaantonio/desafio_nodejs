const express = require ('express')
const mysql = require('mysql')

const app = express()
const port = 3000

const config = {
  host: 'database',
  user: 'root',
  password: 'root',
  database: 'database-node'
};


let connection = mysql.createConnection(config)

const sql = `CREATE TABLE IF NOT EXISTS people(id int NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, primary key (id));`
connection.query(sql)
connection.end()

var list  = ['Antonio', 'Marcos', 'Lucas']

connection = mysql.createConnection(config)
list.forEach(person => {
  const sql_insert = `INSERT INTO people(name) VALUES ('${person}');`
  connection.query(sql_insert)
});

app.get('/', (req, res) => {
  const sql = 'SELECT * FROM people';
  connection.query(sql, (error, results) => {
    if (error) {
      console.error(error);
    }

    if (results) {
      const person = results.map((person) => `<li>${person.name}</li>`);
      res.send(`<h1>Full Cycle Rocks!</h1><ul>${person.join('')}</ul>`);
    } else {
      res.send(`<h1>Full Cycle Rocks!</h1><br>No data.`)
    }
  });
});

app.listen(port, () => {
  console.log('Rodando na porta: ' + port)
})