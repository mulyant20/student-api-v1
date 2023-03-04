const mysql = require('mysql')
const express = require('express')
const bodyparser = require('body-parser')

const app = express()
// using body parser in express
app.use(bodyparser.json())
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'student',
})

db.connect((err) => {
  if (!err) {
    console.log('success')
  } else {
    console.log('error')
  }
})

app.listen(3000, () => {
  console.log('server running in port 3000')
})

app.get('/student', (req, res) => {
  db.query('SELECT * from data', (err, results, fields) => {
    if (err) throw err

    res.send({
      data: results,
    })
  })
})

app.get('/student/:id', (req, res) => {
  let { id } = req.params
  if (!id) {
    return res.status(400).send({
      error: true,
      message: 'where id?',
    })
  }
  db.query(`SELECT * FROM data WHERE id = ${id}`, (err, results, fields) => {
    if (err) throw error
    return res.send({ data: results[0], message: 'success' })
  })
})
