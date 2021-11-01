const express = require('express')
const pino = require('express-pino-logger')()
const fetch = require('node-fetch')
const cors = require('cors')
const corsOptions = {
    origin: 'http://localhost:3000'
}

const PORT = 3001;
const app = express()

const secretThingy = process.env.SECRET_THINGY

app.use(pino)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/api/greeting', cors(corsOptions), (req, res) => {
    const name = req.query.name || 'World'
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify({ greeting: `Hello ${name+' '+secretThingy}!` }))
})

app.get('/api/LabelApprovals_GetAllDocuments', cors(corsOptions), (req, res) => {
    fetch("http://localhost:7071/api/LabelApprovals_GetAllDocuments", {
        "method": "GET"
    })
        .then(response => response.json())
        .then(response => {
            res.setHeader('Content-Type', 'application/json')
            res.send(JSON.stringify({ approvals: response }))
        })
        .catch(err => {
            console.error(err)
        });
}) 

app.listen(PORT, () => 
    console.log(`Express server is running on localhost:${PORT}`)
)