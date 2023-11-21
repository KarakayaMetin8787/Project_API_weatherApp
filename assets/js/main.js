let copyAPI = {}
const header = document.body.querySelector('header')

const date = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

fetch ("https://api.openweathermap.org/data/2.5/weather?lat=53.57532&lon=10.01534&units=metric&appid=fca3353fe4f05c026efd359de8542b93")

.then(res => {
    if(res.ok === false){
        throw new Error("ok is not true")
    } return res.json()
})
.then(weathArr=>{
    const obtDate = new Date(weathArr.dt*1000)
    header.innerHTML = `<h1>Weather in ${weathArr.name}, ${weathArr.sys.country}</h1>
    <p><img src="http://openweathermap.org/img/w/${weathArr.weather[0].icon}.png" alt="weather icon">${weathArr.main.temp.toFixed(0)}°C</p>
    <p>${weathArr.weather[0].description}</p>

    <p>Obtained at ${obtDate.getHours()}:${obtDate.getMinutes()}, ${obtDate.getDate()} ${date[obtDate.getMonth()]} ${obtDate.getFullYear()}</p>`
    console.log();
    console.log(copyAPI);
})

console.log()

// fca3353fe4f05c026efd359de8542b93