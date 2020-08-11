//core modules
const path = require('path') //great for working with file paths

//npm modules
const express = require('express')

//load in geocode function
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//create express application
const application = express()

//load in hbs
const hbs = require('hbs')

//tell handle bars where we are going to put our partial views.
const partialViewsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialViewsPath)


//tell express what templating engine we installed
application.set('view engine', 'hbs') //handlebars is setup.. views have to live in folder called /views

//this will make everything in the public directory available to the web server
const publicDirectoryPath = path.join(__dirname, '../public')
application.use(express.static(publicDirectoryPath))

//point handlebars to views directory so that it knows where the views are located
const viewsPath = path.join(__dirname, '../templates/views')
application.set('views', viewsPath)

//routes
application.get('', (request, response) => {
    response.render('index', {
        title: 'Weather App',
        name: 'Andrew Mead'
    }) //grabbing the hbs file.. //in the second argument we can pass data to the html/hbs file.
})

application.get('/about', (request, response) => {
    response.render('about', {
        title: "About Me",
        name: "Andrew Mead"
    })
})

application.get('/help', (request, response) => { 
    response.render('help', {
        title: "Help",
        name: "Andrew Mead"
    })
})

application.get('/weather', (request, response) => {

    if (!request.query.address) {
        response.send({
            error: 'You must provide an address.'
        })
        return
    }

    geocode(request.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            response.send({
                error: error
            })
            return
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
    
            if (error) {
                response.send({
                    error: error
                })
                return
            }

            response.send({
                forecast: forecastData,
                address: request.query.address,
                location: location
            })
        })
    })
})

application.get('/products', (request, response) => {

    if (!request.query.search) {
        response.send({
            error: 'You must provide a search term.'
        })
        return
    }
    console.log(request.query.search)

    response.send({
        products: []
    })
})

application.get('/help/*', (request, response) => {
    // * is wildcard character.
    response.render('404', {
        title: '404 Help',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found'
    })
})


//handle 404 error / invalid url //needs to be last
application.get('*', (request, response) => {
    response.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page Not Found'
    }) //what view are you rendering and what data are you providing
})

//start the server
application.listen(3000, () => {
    console.log('Server is running on port 3000')
})