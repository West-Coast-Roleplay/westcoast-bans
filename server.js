// * App
const express = require('express');
const app = express();
// * Paths
const path = require('path');
// * Configs
const config = require(path.join(__dirname, '/config.json'))
const bodyParser = require('body-parser');
const cors = require('cors');

// * Uses
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
    origin: '*'
}))

app.listen(config.server_port, () => {
    console.log(`Database started on port ${config.server_port}`);
})


app.post('/auth', (req, res) => {
    const password = req.body.password;
    const auth = require(path.join(__dirname, '/secure/auth.json')).password;
    if (password == auth) {
        res.json({
            success: true
        })
        return;
    }
    res.json({
        success: false
    });
})

app.get('/data', (req, res) => {
    const logs = require(path.join(__dirname, '/secure/data.json'));
    res.json(logs);
})