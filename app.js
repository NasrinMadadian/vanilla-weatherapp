//showCurrentTime
function formatdate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "saturday",
  ];
  let day = days[date.getDay()];
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return (`${day} ${hour}:${minutes}`);
}
function displaytemperatur(response){
  celciustemp = response.data.main.temp;
  let tempElement= document.querySelector("#temp");
  tempElement.innerHTML = Math.round(celciustemp);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatdate(response.data.dt *1000);
  let iconElement = document.querySelector("#icon");
 iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
 iconElement.setAttribute("alt",response.data.weather[0].description );
 
}
function search(city){
 let apiKey = "f28dce3a676a59d40a5a0ef9c72e8e8d";
 let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
 axios.get(apiUrl).then(displaytemperatur);
 
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}
let celciustemp = null;
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function changetoF(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = Math.round(celciustemp* 1.8 + 32);
  cLink.classList.remove("active");
   fLink.classList.add("active");
  
}
function changetoC(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = Math.round(celciustemp);
  cLink.classList.add("active");
  fLink.classList.remove("active");
}


let fLink = document.querySelector("#f-temp");
fLink.addEventListener("click", changetoF);
let cLink = document.querySelector("#cel-temp");
cLink.addEventListener("click", changetoC);

search("New York");