const express = require("express");
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var cors = require('cors')
app.use(cors())

const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db/user.sqlite', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the MY database.');
});

app.get('/getUsers', (request, response) => {
    db.all("SELECT * FROM USER", function(err,rows,fields) {
        response.setHeader('Content-Type','application/json')
        console.log(rows);
        response.status(200).send(JSON.stringify(rows));
    });
  })

app.post('/createImage', (req, res) => {
    const id = Math.floor(Math.random() * 100);
    const file_name = req.body.file_name;
    const annotation_name = req.body.annotation_name;
    var inputData = [id,file_name,annotation_name];
    db.run(`INSERT INTO USER(id,file_name,annotation_name) VALUES(?,?,?)`, inputData, function(err,rows) {
        if (err) {
          return console.log(err.message);
        }
        // get the last insert id
      });
    return res.status(200).send({
        succes: "Success"
    })
});

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});
