// API Key: 0e526835a0264be7977173515230104

// url: https://api.weatherapi.com/v1/forecast.json?key=0e526835a0264be7977173515230104&q=${city}&days=7&aqi=no&alerts=no

const DefaultPlace = 'New Delhi'
const CheckCity = /^[A-Za-z]+$/

let api = '0e526835a0264be7977173515230104'

let WeatherContainer = document.querySelector('.Weather_Container')
let CurrentDate = document.getElementById('Date')
let CurrentTime = document.getElementById('Time')
let City = document.getElementById('Place_Name')
let SearchCity = document.getElementById('Search_Place')
let SearchButton = document.getElementById('SearchButton')
let locationBtn = document.getElementById('deviceLocation')
let Temperature = document.getElementById('Temperature')
let Condition = document.getElementById('Condition')
let Humidity = document.getElementById('Humidity')
let WindSpeed = document.getElementById('WindSpeed')
let ErrorMsg = document.getElementById('ErrorMsg')

let Day1 = document.getElementById('Day1')
let Day1Temperature = document.getElementById('Day1Temperature')
let Day1Humidity = document.getElementById('Day1Humidity')
let Day1Wind = document.getElementById('Day1Wind')
let Day1ConditionBox = document.getElementById('Day1ConditionBox')

let Day2 = document.getElementById('Day2')
let Day2Temperature = document.getElementById('Day2Temperature')
let Day2Humidity = document.getElementById('Day2Humidity')
let Day2Wind = document.getElementById('Day2Wind')
let Day2ConditionBox = document.getElementById('Day2ConditionBox')

let Day3 = document.getElementById('Day3')
let Day3ConditionBox = document.getElementById('Day3ConditionBox')
let Day3Temperature = document.getElementById('Day3Temperature')
let Day3Humidity = document.getElementById('Day3Humidity')
let Day3Wind = document.getElementById('Day3Wind')

let Day4 = document.getElementById('Day4')
let Day4ConditionBox = document.getElementById('Day4ConditionBox')
let Day4Temperature = document.getElementById('Day4Temperature')
let Day4Humidity = document.getElementById('Day4Humidity')
let Day4Wind = document.getElementById('Day4Wind')

let Day5 = document.getElementById('Day5')
let Day5ConditionBox = document.getElementById('Day5ConditionBox')
let Day5Temperature = document.getElementById('Day5Temperature')
let Day5Humidity = document.getElementById('Day5Humidity')
let Day5Wind = document.getElementById('Day5Wind')

let Day6 = document.getElementById('Day6')
let Day6ConditionBox = document.getElementById('Day6ConditionBox')
let Day6Temperature = document.getElementById('Day6Temperature')
let Day6Humidity = document.getElementById('Day6Humidity')
let Day6Wind = document.getElementById('Day6Wind')

let ConditionIconBox = document.getElementById('ConditionIcon')

SearchCity.addEventListener('keyup', (e) => {
  if (e.key == 'Enter' && SearchCity.value != '') {
    GetWeather(SearchCity.value)
  }
})

SearchButton.addEventListener('click', (event) => {
  let len = SearchCity.value
  if (SearchCity.value.match(CheckCity) && len.length != 0) {
    GetWeather(SearchCity.value)
  } else {
    ErrorMsg.style.opacity = 1
    ErrorMsg.innerHTML = 'Kindly Enter Valid Place Name !'
    ErrorMsg.style.backgroundColor = 'red'
    HideErrorMsg()
    SearchCity.focus()
    SearchCity.value = ''
  }
})

locationBtn.addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(positionCordinates)
  } else {
    alert('Your browser not support geolocation api')
  }
})
function positionCordinates(position) {
  const latitude = position.coords.latitude
  const longitude = position.coords.longitude
  api = `https://api.weatherapi.com/v1/forecast.json?key=0e526835a0264be7977173515230104&q=${latitude},${longitude}&days=7&aqi=no&alerts=no`
  fetchData()
}
function onError(error) {
  ErrorMsg.innerText = error.message
  ErrorMsg.classList.add('error')
}
function fetchData() {
  ErrorMsg.innerText = 'Getting weather details...'
  ErrorMsg.classList.add('pending')
  fetch(api)
    .then((res) => res.json())
    .then((result) => {
      ErrorMsg.style.opacity = 1
      ErrorMsg.style.backgroundColor = 'green'
      ErrorMsg.innerHTML = `Getting ${result.location.name}'s Weather Details...`
      HideErrorMsg()
      return ShowWeather(result)
    })
    .catch(() => {
      ErrorMsg.style.opacity = 1
      ErrorMsg.style.backgroundColor = 'red'
      ErrorMsg.innerText = 'Something went wrong'
      ErrorMsg.classList.replace('pending', 'error')
    })
}

const GetWeather = (city) => {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=0e526835a0264be7977173515230104&q=${city}&days=7&aqi=no&alerts=no`

  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      ErrorMsg.style.opacity = 1
      ErrorMsg.style.backgroundColor = 'green'
      ErrorMsg.innerHTML = `Getting ${city}'s Weather Details...`
      HideErrorMsg()
      return ShowWeather(data)
    })
    .catch(() => {
      ErrorMsg.style.opacity = 1
      ErrorMsg.style.backgroundColor = 'red'
      ErrorMsg.innerHTML = `${city} not found`
      SearchCity.focus()
      SearchCity.value = ''
      HideErrorMsg()
    })
}

const ShowWeather = (WeatherData) => {
  console.log(WeatherData)

  City.innerHTML = `${WeatherData.location.name}`
  Temperature.innerHTML = `${WeatherData.current.temp_c}`
  Condition.innerHTML = `${WeatherData.current.condition.text}`
  Humidity.innerHTML = `${WeatherData.current.humidity}`
  WindSpeed.innerHTML = `${WeatherData.current.wind_kph}`
  ConditionIconBox.innerHTML = `<img src="${WeatherData.current.condition.icon}" alt="Condition-Icon">`

  Day1.innerHTML = `${WeatherData.forecast.forecastday[1].date}`
  Day1ConditionBox.innerHTML = `<p><span>${WeatherData.forecast.forecastday[1].day.condition.text}</span> </p>
    <img src="${WeatherData.forecast.forecastday[1].day.condition.icon}" alt="Condition-Icon">`
  Day1Temperature.innerHTML =
    `${WeatherData.forecast.forecastday[1].day.avgtemp_c}` + '&deg;C'
  Day1Humidity.innerHTML =
    `${WeatherData.forecast.forecastday[1].day.avghumidity}` + '&percnt;'
  Day1Wind.innerHTML =
    `${WeatherData.forecast.forecastday[1].day.maxtemp_c}` + 'Km/h'

  Day2.innerHTML = `${WeatherData.forecast.forecastday[2].date}`
  Day2ConditionBox.innerHTML = `<p><span>${WeatherData.forecast.forecastday[2].day.condition.text}</span> </p>
    <img src="${WeatherData.forecast.forecastday[2].day.condition.icon}" alt="Condition-Icon">`
  Day2Temperature.innerHTML =
    `${WeatherData.forecast.forecastday[2].day.avgtemp_c}` + '&deg;C'
  Day2Humidity.innerHTML =
    `${WeatherData.forecast.forecastday[2].day.avghumidity}` + '&percnt;'
  Day2Wind.innerHTML =
    `${WeatherData.forecast.forecastday[2].day.maxtemp_c}` + 'Km/h'

  Day3.innerHTML = `${WeatherData.forecast.forecastday[3].date}`
  Day3ConditionBox.innerHTML = `<p><span>${WeatherData.forecast.forecastday[3].day.condition.text}</span> </p>
    <img src="${WeatherData.forecast.forecastday[3].day.condition.icon}" alt="Condition-Icon">`
  Day3Temperature.innerHTML =
    `${WeatherData.forecast.forecastday[3].day.avgtemp_c}` + '&deg;C'
  Day3Humidity.innerHTML =
    `${WeatherData.forecast.forecastday[3].day.avghumidity}` + '&percnt;'
  Day3Wind.innerHTML =
    `${WeatherData.forecast.forecastday[3].day.maxtemp_c}` + 'Km/h'

  Day4.innerHTML = `${WeatherData.forecast.forecastday[4].date}`
  Day4ConditionBox.innerHTML = `<p><span>${WeatherData.forecast.forecastday[4].day.condition.text}</span> </p>
    <img src="${WeatherData.forecast.forecastday[4].day.condition.icon}" alt="Condition-Icon">`
  Day4Temperature.innerHTML =
    `${WeatherData.forecast.forecastday[4].day.avgtemp_c}` + '&deg;C'
  Day4Humidity.innerHTML =
    `${WeatherData.forecast.forecastday[4].day.avghumidity}` + '&percnt;'
  Day4Wind.innerHTML =
    `${WeatherData.forecast.forecastday[4].day.maxtemp_c}` + 'Km/h'

  Day5.innerHTML = `${WeatherData.forecast.forecastday[5].date}`
  Day5ConditionBox.innerHTML = `<p><span>${WeatherData.forecast.forecastday[5].day.condition.text}</span> </p>
    <img src="${WeatherData.forecast.forecastday[5].day.condition.icon}" alt="Condition-Icon">`
  Day5Temperature.innerHTML =
    `${WeatherData.forecast.forecastday[5].day.avgtemp_c}` + '&deg;C'
  Day5Humidity.innerHTML =
    `${WeatherData.forecast.forecastday[5].day.avghumidity}` + '&percnt;'
  Day5Wind.innerHTML =
    `${WeatherData.forecast.forecastday[5].day.maxtemp_c}` + 'Km/h'

  Day6.innerHTML = `${WeatherData.forecast.forecastday[6].date}`
  Day6ConditionBox.innerHTML = `<p><span>${WeatherData.forecast.forecastday[6].day.condition.text}</span> </p>
    <img src="${WeatherData.forecast.forecastday[6].day.condition.icon}" alt="Condition-Icon">`
  Day6Temperature.innerHTML =
    `${WeatherData.forecast.forecastday[6].day.avgtemp_c}` + '&deg;C'
  Day6Humidity.innerHTML =
    `${WeatherData.forecast.forecastday[6].day.avghumidity}` + '&percnt;'
  Day6Wind.innerHTML =
    `${WeatherData.forecast.forecastday[6].day.maxtemp_c}` + 'Km/h'
}

let SystemDate = new Date()
CurrentDate.innerHTML =
  '<i class="fa-solid fa-calendar-day"></i>' +
  SystemDate.getDate() +
  '/' +
  (SystemDate.getMonth() + 1) +
  '/' +
  SystemDate.getFullYear()
function startTime() {
  const today = new Date()
  let h = today.getHours()
  let m = today.getMinutes()
  let s = today.getSeconds()
  m = checkTime(m)
  s = checkTime(s)
  CurrentTime.innerHTML =
    '<i class="fa-solid fa-clock"></i>' + h + ':' + m + ':' + s
  setTimeout(startTime, 1000)
}
function checkTime(i) {
  if (i < 10) {
    i = '0' + i
  }
  return i
}

function HideErrorMsg() {
  setTimeout(() => {
    ErrorMsg.style.opacity = 0
  }, 5000)
}
