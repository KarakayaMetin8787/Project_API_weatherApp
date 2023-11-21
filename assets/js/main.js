
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

let backupAPI = {};

const weatherAPI = function getAPI() {
    fetch ("https://api.openweathermap.org/data/2.5/weather?lat=53.57532&lon=10.01534&appid=ed11ffb018b65eebe703586e0546e5cc&units=metric")
    .then(res => {
        if (res.ok === false){
            throw new Error ("res error, ok is not true.")
        } else {
            return res.json()
        }
    })
    .then(json => {
        
    backupAPI = {...json}
    console.log(backupAPI)

    const options = {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    };
    
    const localDate = new Date();
    const formattedDate = localDate.toLocaleString('de-DE', options);

    document.body.querySelector("#localTime").textContent = `${formattedDate} Uhr`

    document.body.querySelector("#wind").textContent = `${json.wind.speed} m/s`
    if(json.wind.deg >= 30 && json.wind.deg <= 60) {
        document.body.querySelector("#wind").textContent += ` NE (${json.wind.deg} deg)`
    } else if(json.wind.deg >= 70 && json.wind.deg <= 110) {
        document.body.querySelector("#wind").textContent += ` E (${json.wind.deg} deg)`
    } else if(json.wind.deg >= 120 && json.wind.deg <= 150) {
        document.body.querySelector("#wind").textContent += ` SE (${json.wind.deg} deg)`
    } else if(json.wind.deg >= 160 && json.wind.deg <= 200) {
        document.body.querySelector("#wind").textContent += ` S (${json.wind.deg} deg)`
    } else if(json.wind.deg >= 210 && json.wind.deg <= 240) {
        document.body.querySelector("#wind").textContent += ` SW (${json.wind.deg} deg)`
    } else if(json.wind.deg >= 250 && json.wind.deg <= 290) {
        document.body.querySelector("#wind").textContent += ` W (${json.wind.deg} deg)`
    } else if(json.wind.deg >= 300 && json.wind.deg <= 330) {
        document.body.querySelector("#wind").textContent += ` NW (${json.wind.deg} deg)`
    } else {
        document.body.querySelector("#wind").textContent += ` N (${json.wind.deg} deg)`
    };

    if (json.clouds.all <= 10) {
        document.body.querySelector("#cloud").textContent = `${json.clouds.all} % mostly clear`
    } else if (json.clouds.all > 10 && json.clouds.all <= 30) {
        document.body.querySelector("#cloud").textContent = `${json.clouds.all} %  few clouds`
    } else if (json.clouds.all > 30 && json.clouds.all <= 70) {
        document.body.querySelector("#cloud").textContent = `${json.clouds.all} %  partly cloudy`
    } else if (json.clouds.all > 70 && json.clouds.all <= 90) {
        document.body.querySelector("#cloud").textContent = `${json.clouds.all} %  mostly cloudy`
    } else {
        document.body.querySelector("#cloud").textContent = `${json.clouds.all} %  cloudy`
    }

    document.body.querySelector("#pressure").textContent = `${json.main.pressure} hpa`
    document.body.querySelector("#humidity").textContent = `${json.main.humidity} %`

    const dateSunrise = new Date(json.sys.sunrise * 1000); 
    document.getElementById("sunrise").textContent = `${formatTime(dateSunrise)} Uhr`;

    const dateSunset = new Date(json.sys.sunset * 1000); 
    document.getElementById("sunset").textContent = `${formatTime(dateSunset)} Uhr`;

    document.getElementById("coordinates").textContent = `${(json.coord.lat).toFixed(2)} lat, ${(json.coord.lon).toFixed(2)} lon`;
})
.catch(error => console.log(error));
};

function formatTime(date) {
const optionsSun = {hour: "numeric", minute: "numeric"};
return date.toLocaleTimeString(undefined, optionsSun);
}

weatherAPI();
