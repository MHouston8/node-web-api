

const weatherForm = document.querySelector('form')
const weatherFormInput = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


//each time this form is submitted the callback function will fire
weatherForm.addEventListener('submit', (e) => {
    //event.preventDefault will prevent the default implementation of forms which is to refresh the browser after pressing submit.
    e.preventDefault()
    const location = weatherFormInput.value
    
    messageOne.textContent = "Loading..."

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.location
            messageTwo.textContent = data.error
            console.log(data.error)
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})

    console.log(location)
})