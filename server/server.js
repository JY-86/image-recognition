const http = require('http');
var https = require('https');
const express = require('express');

const mockDb = {
    users: [
        {
            id: 1,
            name: "Bob",
            email: "bob@gmail.com",
            entries: 0,
            password: "abc",
            joined: new Date()
        },
        {
            id: 2,
            name: "Jane",
            email: "jane@gmail.com",
            entries: 5,
            password: "abcde",
            joined: new Date()
        }
    ]
}

function findUser(id) {
    
}

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("server running");
});

app.post("/signin", (req, res) => {
    let { email, password } = req.body;
    mockDb.users.forEach(x => {
        if (x.email === email && x.password === password) {
            res.send("true");
            return;
        }
    })
    res.status(400).send("false");
});

app.post("/register", (req, res) => {
    // check if email already in db
    let {name, email, password} = req.body;
    let resObj = {
        valid: false,
        user: {}
    }
    if (mockDb.users.filter(x => x.email === email).length === 0) { // valid
        // register a new user
        mockDb.users.push({
            name: name,
            email: email,
            password: password,
            entries: 0,
            id: 3,
            joined: new Date()
        });

        // update response
        resObj.valid = true;
        resObj.user = mockDb.users[mockDb.users.length - 1];
    }
    res.json(resObj);

});

app.get("/profile/:id", (req, res) => {
    let id = req.params.id;
    let user = mockDb.users.find(x => x.id === id);
    if (typeof user !== 'undefined') {
        res.json(user);
    }
    else {
        res.status(404).send("no such profile");
    }
});

app.put("/image", (req, res) => {
    let {id} = req.body;

});

http.createServer(app).listen(80, () => console.log("app running on port 80"));
https.createServer(app).listen(443, () => console.log("app running on port 443"));

// / --> server running DONE
// /signin --> success/fail DONE
// /register --> {valid:t/f user:user} DONE
// /profile/:id --> user
// /image --> image count