const debug = require('debug')('app:startup')
const morgan = require('morgan')
const helmet = require('helmet')
const express = require('express')
const mongoose = require('mongoose')
const compression = require('compression')
const app = express()

/**
 * Routers
 */
const genres = require('./routes/genres')
const movies = require('./routes/movies')
const home = require('./routes/home')
const customers = require('./routes/customers')
const rentals = require('./routes/rentals')

const port = process.env.PORT || 3001

// Database connection
mongoose.connect('mongodb://localhost/rintly')
    .then(() => console.log('Connected to MongoDB.'))
    .catch((ex) => console.error('Couldn\'t connect to MongoDB!', ex.message))

// Middleware
app.set('view engine', 'pug')
app.set('views', "./views")

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(helmet())
app.use(compression())
app.use(express.static('public'))

// Logger
if(app.get('env') === 'development') {
    app.use(morgan('tiny'))
    debug('Morgan enable...')
}

// Routes
app.use('/', home)
app.use('/api/genres', genres)
app.use('/api/movies', movies)
app.use('/api/customers', customers)
app.use('/api/rentals', rentals)

app.listen(port, ()=> console.log(`App listening on port http://localhost:${port}`))
