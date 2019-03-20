const express = require('express')
const path = require('path')
const app = express()

const backend = require('./backend/index')


app.use('/api', backend)
app.use(express.static(path.join(__dirname, 'frontend/dist')))
app.use('*', (req,res) => {
    res.sendFile(path.join(__dirname, 'frontend/dist/index.html'))
})

app.listen(8000, () => {
    console.log('All systems operative!')
})