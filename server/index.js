const express = require('express')
const pino = require('express-pino-logger')()
const app = express()

const secretThingy = process.env.SECRET_THINGY

app.use(pino)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api/greeting', (req, res) => {
    const name = req.query.name || 'World'
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify({ greeting: `Hello ${name+' '+secretThingy}!` }))
})

app.get('/api/LabelApprovals_GetAllDocuments', (req, res) => {

}) 

app.listen(3001, () => 
    console.log('Express server is running on localhost:3001')
)