const express = require('express')
const pool = require('./config/db')
const app = express()

//Init Middleware
app.use(express.json({ extended: false }))

app.get('/', (req, res) => res.json({ msg: 'API RUNNING WITH POSTGRES DATABASE' }))

// DEFINING OUR ROUTES
app.use('/api/users', require('./routes/api/users'))

// LISTENING PORT
const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log('App listening on port %s', PORT))
