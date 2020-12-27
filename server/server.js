const http = require('http');
var https = require('https');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');

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
    throw Error("Not Implemented");
}

async function getHash(password) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds, callback);
    return hash;
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
    console.log(email, password);

    //compare passwords
    mockDb.users.forEach(x => {
        if (x.email === email && bcrypt.compare(password, x.password)) {
            console.log(x);
            res.json("true");
            return;
        }
    })
    res.json("false");
});

app.post("/register", async (req, res) => {
    // check if email already in db
    let {name, email, password} = req.body;
    let resObj = {
        valid: false,
        user: {}
    }
    let hashedPassword = await getHash(password);
    if (mockDb.users.filter(x => x.email === email).length === 0) { // valid
        // register a new user
        mockDb.users.push({
            name: name,
            email: email,
            password: hashedPassword,
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
    let id = parseInt(req.body);

    if (id === undefined) {
        res.send("Update failed");
        return;
    }
    // find user with id
    let user = mockDb.users.find(x => x.id === id);
    user.entries++;
    res.send(user.entries.toString());
});

app.all("*", (req, res) => {
    res.status(404).send("Route not found");
})
http.createServer(app).listen(80, () => console.log("app running on port 80"));
//https.createServer(app).listen(443, () => console.log("app running on port 443"));