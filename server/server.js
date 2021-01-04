const http = require('http');
var https = require('https');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mysql = require('mysql');

// database connection initialisation
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "sq86",
    database: "imagerecognitiondb",
    multipleStatements: true
});

connection.connect((err) => {
    if (err) {
      console.error('error connecting: ' + err.stack);
    }
});

async function getHash(password) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
}

// change implementation, explicitly return a promise and call resolve() instead
function getUsers(property, value) {
    return new Promise((resolve, reject) => {
        connection.query(`
        SELECT * 
        FROM users
        WHERE 1=1
            AND ${property}='${value}'; 
        `,
        (err, results, fields) => {
            if (err) {
                reject(err);
            }
            else resolve(results);
        });
    });
}

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.text());
app.use(cors());


app.get("/", (req, res) => {
    res.send("server running");
});

app.post("/signin", async (req, res) => {
    let { email, password } = req.body;

    connection.query(`
        SELECT 
            u.*,
            l.p_hash
        FROM Users AS u
        INNER JOIN Login AS l
            ON l.email = u.email
        WHERE 1=1
            AND l.email = '${email}';
        `, async (err, results) => {
        if (err) console.log(err);
        if (results.length > 0) {
            let { p_hash, ...user} = results[0];
            if (await bcrypt.compare(password, p_hash)) {
                return res.json(user)
            }
        }
        res.json("failed");
    });
});

app.post("/register", async (req, res, next) => {
    // check if email already in db
    try {
        let {name, email, password} = req.body;
        let resObj = {
            valid: false,
            user: {}
        }
        let hashedPassword = await getHash(password);

        connection.query(`
        INSERT INTO users (username, email) 
        VALUES ('${name}', '${email}');

        INSERT INTO login (email, p_hash) 
        VALUES ('${email}', '${hashedPassword}');
        `, 
        (err) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY')
                    console.log("Duplicate entry");
                else 
                    console.log("There was an error: " + err);
                return res.status(400).json(resObj);
            }
            
            // update response
            resObj.valid = true;
            getUsers("email", email)
            .then(results => {
                // console.log(results);
                resObj.user = results[0];
                res.json(resObj);
            })
            .catch(console.log);
        });
    }
    catch (err) {
        next(err)
    }
});

app.get("/profile/:id", (req, res) => {
    let id = req.params.id;
    getUsers("id", id)
    .then(results => {
        console.log(results);
        if (results.length === 0) return res.status(400).send("no such profile");
        res.json(results[0]);
    })
    .catch(err => {
        res.status(400).send("error getting user");
    })
});

app.put("/image", (req, res) => {
    let id = parseInt(req.body);
    // update user entries
    connection.query(`
        UPDATE Users 
        SET entries=entries+1 
        WHERE id=${id};

        SELECT entries
        FROM Users
        WHERE id=${id};
    `, (err, results) => {
        if (err) {
            res.send("Update failed");
            console.log(err);
        }
        else {
            console.log(results[1][0]);
            res.send(results[1][0].entries.toString());
        }
    });
});

app.all("*", (req, res) => {
    res.status(404).send("Route not found");
})

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Internal server error')
})

http.createServer(app).listen(80, () => console.log("app running on port 80"));
//https.createServer(app).listen(443, () => console.log("app running on port 443"));