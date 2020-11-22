require('dotenv').config()
const mongo = require('mysql');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet')
const cors = require('cors');
const mysql = require('mysql');
let pass = process.env.DB_PASS;
let user = process.env.DB_USER;
let ip = process.env.DB_IP;
let db = process.env.DB_NAME;
const app = express();
app.use(morgan('short'));
app.use(cors());
app.use(express.json());
app.use(helmet());


var con = mysql.createConnection({
    host: ip,
    user: user,
    password: pass,
    database: db
});

app.post('/FindName', (req, res) => {
    console.log(req.body);
    con.connect((err) => {
        con.query(`SELECT * FROM classnames WHERE name LIKE "${req.body["name"]}%";`, (error, result, fields) => {
            if (error)
                res.json(error);
            res.json(result);
        });
    });
})
app.post('/FindMod', (req, res) => {
    console.log(req.body);
    let type = parseInt(req.body["type"]);
    con.connect((err) => {
        con.query(`SELECT * FROM classnames WHERE modifi LIKE "${req.body["Mod"]}%" AND type = ${type};`, (error, result, fields) => {
            if (error)
                res.json(error);
            res.json(result);
        });
    });
})
app.listen(process.env.PORT, () => {
    console.log(`listening on ${process.env.PORT}`);
});