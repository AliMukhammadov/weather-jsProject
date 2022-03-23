const api_link = `https://api.openweathermap.org/data/2.5/weather`
const api_key = '6418ecd85f6a4a0f998a03c1ca0d8cbc'

const cityNameEl = document.querySelector('.city-name')
const searchForm = document.querySelector('.search-form')
const searchInput = document.querySelector('.search-input')
const info = document.querySelector('.info')
const max = document.querySelector('.max')
const min = document.querySelector('.min')
const statusEl = document.querySelector('.weather-status')
const overlay = document.querySelector(".overlay")

// event
searchForm.addEventListener('submit' , function(e) {
    e.preventDefault()
    const nameOfCity = searchInput.value
    sendReq(nameOfCity)
})

overlay.addEventListener('click', function() {
    overlay.classList.add('hidden')
    overlay.textContent = `Loading...`
    searchInput.value = ''
    console.clear();
})

// functions
async function sendReq(cityName) {
    overlay.classList.remove('hidden')
    try {
        const req = await fetch(`${api_link}?q=${cityName}&units=metric&appid=${api_key}`,)
        console.log(req);

        if(req.statusText == 'Unauthorized') {
            throw new Error('There is a problem with request')
        } else if (!req.ok) {
            throw new Error('Invalid name of city')
        }
        const data = await req.json()
        getData(data)
    } catch(err) {
        console.log('Problem with try')
        console.log(err.message);
        overlay.textContent = `${err.message}`
    }

    function getData(data) {
        overlay.classList.add('hidden')
        const weather = data
        console.log(data);
        cityNameEl.innerHTML = `<span>${weather.name}, <span>${weather.sys.country}</span></span>`
        info.textContent = `${weather.main.temp.toFixed(0)}℃`
        max.textContent = `${Math.ceil(weather.main.temp_max)}℃ /`
        min.textContent = `${Math.ceil(weather.main.temp_min)}℃`
        statusEl.textContent = `${weather.weather[0].main}`
        searchInput.value = ''
    }
}


