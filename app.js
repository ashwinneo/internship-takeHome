const express = require("express");
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var cors = require('cors')
app.use(cors())

const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db/DB.sqlite', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the MY database.');
});

app.get('/getImages', (request, response) => {
  db.all("SELECT * FROM USERS", function (err, rows, fields) {
    response.setHeader('Content-Type', 'application/json')
    response.status(200).send(JSON.stringify(rows));
  });
})

app.post('/createImage', (req, res) => {
  for (var i = 0; i < req.body.length; i++) {
      const file_name = req.body[i].fileName;
      const annotation_name = req.body[i].annotation_text;
      var inputData = [file_name, annotation_name];
      db.run(`INSERT INTO USERS(file_name,annotation_name) VALUES(?,?)`, inputData, function (err, rows) {
        if (err) {
          console.log(err.message);
        }
      });
  }

  res.json({
    success: 'Success',
  })
});

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});
