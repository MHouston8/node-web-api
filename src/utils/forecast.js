const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=0970500f1808eded5ad4c02634d6c036&query=' + latitude + ',' + longitude + '&units=f'

    //response.body... shorthand syntax
    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback('Unable to connect to weather service.')
        } else if (body.error) {
            callback('Unable to find location.')
        } else {
            const weatherDescriptions = body.current.weather_descriptions
            callback(undefined, weatherDescriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. There is a ' + body.current.precip + '% chance of chance of rain.' + 'The humidity today is ' + body.current.humidity)
        }
    })
    
}

module.exports = forecast