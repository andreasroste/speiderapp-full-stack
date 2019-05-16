const port = process.env.PORT || 3000

const express = require('express')
const path = require('path')
const requireHttps = require('require-https')
const app = express()

const backend = require('./backend/index')

// Force HTTPS
app.use(requireHttps());
app.enable('trust proxy');


app.use('/api', backend)
app.use(express.static(path.join(__dirname, 'frontend/dist')))
app.use('*', (req,res) => {
    res.sendFile(path.join(__dirname, 'frontend/dist/index.html'))
})

app.listen(port, () => {
    console.log('Server serving on port ' + port)
})