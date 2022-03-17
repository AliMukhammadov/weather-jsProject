const api_link = `https://api.openweathermap.org/data/2.5/weather`
const api_key = '6418ecd85f6a4a0f998a03c1ca0d8cbc'

const cityNameEl = document.querySelector('.city-name')
const searchForm = document.querySelector('.search-form')
const searchInput = document.querySelector('.search-input')
const info = document.querySelector('.info')
const max = document.querySelector('.max')
const min = document.querySelector('.min')
const statusEl = document.querySelector('.weather-status')

// event
searchForm.addEventListener('submit' , function(e) {
    e.preventDefault()
    const nameOfCity = searchInput.value
    sendReq(nameOfCity)
})


// functions
function sendReq (cityName) {
    fetch(`${api_link}?q=${cityName}&units=metric&appid=${api_key}`)
    .then((data) => {
        return data.json()
    })
    .then(getData)


    function getData(data) {
        const weather = data
        console.log(data);
        cityNameEl.innerHTML = `<span>${weather.name}, <span>${weather.sys.country}</span></span>`
        info.textContent = `${weather.main.temp.toFixed(0)}℃`
        max.textContent = `${Math.ceil(weather.main.temp_max)}`
        min.textContent = `${Math.ceil(weather.main.temp_min)}`
        statusEl.textContent = `${weather.weather[0].main}`
    }
}


