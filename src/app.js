const USERNAME = "userName"
const HIDDEN_CLASS = "hidden"
const images = ["snowMountain.jpg", "mountain2.jpg", "mountain3.jpg", "mountain4.jpg", "mountain5.jpg"];
const imageURL = document.querySelector("body");
// background

const randomImage = images[Math.floor(Math.random() * images.length)];
const bgImage = document.createElement("img");
bgImage.src = `../img/${randomImage}`;
imageURL.style.background = `url(${bgImage.src})`;

// Login

const loginButton = document.querySelector(".loginButton");
const loginForm = document.querySelector(".loginForm");
const inputUsername = document.querySelector(".inputName");

const todoListForm = document.querySelector(".todoListForm");
const inputTodo = document.querySelector(".inputTodo");
const addTodoList = document.querySelector(".addTodoList");
let saveTodoList = [];

function loginButtonEvent(event){
    event.preventDefault();
    const userName = inputUsername.value;
    loginForm.classList.add(HIDDEN_CLASS);
    localStorage.setItem(USERNAME, userName);
    todoListForm.classList.remove(HIDDEN_CLASS);
}

const savedUsername = localStorage.getItem(USERNAME);

if ( savedUsername === null){
    loginForm.classList.remove(HIDDEN_CLASS);
    loginForm.addEventListener("submit", loginButtonEvent);
}
else{
    
}

// Todo

const todoList = document.querySelector(".todo-list");

function todoSubmit(event){
    event.preventDefault();
    const newTodo = inputTodo.value;
    inputTodo.value = "";
    const newTodoObject = {
        text: newTodo,
        id: Date.now(),
    };
    appendTodoList(newTodoObject);
    saveTodoList.push(newTodoObject);
    saveTodo();
}

function deleteTodoList(event){
    const deleteTodo = event.target.parentElement;
    saveTodoList = saveTodoList.filter(todo => todo.id != parseInt(deleteTodo.id));
    saveTodo();
    deleteTodo.remove();
}

function appendTodoList(newTodo){
    const todoLi = document.createElement("li");
    todoLi.id = newTodo.id;
    const todoSpan = document.createElement("span");
    todoSpan.innerText = newTodo.text;
    const todoButton = document.createElement("button");
    todoButton.innerText = "❌";
    todoButton.addEventListener("click", deleteTodoList);
    todoLi.appendChild(todoSpan);
    todoLi.appendChild(todoButton); 
    todoList.appendChild(todoLi);
}

function saveTodo(){
    localStorage.setItem("todoList", JSON.stringify(saveTodoList));
}

todoListForm.addEventListener("submit", todoSubmit);

const savedTodos = localStorage.getItem("todoList");
if(savedTodos !== null){
    const parsedTodos = JSON.parse(savedTodos);
    saveTodoList = parsedTodos;
    parsedTodos.forEach(element => {
        appendTodoList(element);
    });
}

// Clock

const clockOutput = document.querySelector(".clock");
const yearOutput = document.querySelector(".year");
const dayOutput = document.querySelector(".day");

function getTime(){
    let clock = new Date();
    yearOutput.innerHTML = `${clock.getFullYear()}년 ${clock.getMonth()+1}월 ${clock.getDate()}일`;
    if ( clock.getDay() == 0 ){
        dayOutput.innerHTML = `일요일`
    }
    else if ( clock.getDay() == 1 ){
        dayOutput.innerHTML = `월요일`
    }
    else if ( clock.getDay() == 2 ){
        dayOutput.innerHTML = `화요일`
    }
    else if ( clock.getDay() == 3 ){
        dayOutput.innerHTML = `수요일`
    }
    else if ( clock.getDay() == 4 ){
        dayOutput.innerHTML = `목요일`
    }
    else if ( clock.getDay() == 5 ){
        dayOutput.innerHTML = `금요일`
    }
    else if ( clock.getDay() == 6 ){
        dayOutput.innerHTML = `토요일`
    }
    clockOutput.innerHTML = `⏰ ${clock.getHours()}시 ${clock.getMinutes()}분 ${clock.getSeconds()}초`;
}
getTime();
setInterval(getTime, 1000);


// Weather Geolocation

navigator.geolocation.getCurrentPosition(getGeo, getGeoError);

const API_KEY = "346393e0e90d005a3ba37017bfeac8cd";
const mygeo = document.querySelector(".geo");
const myweather = document.querySelector(".weather");

function getGeo(position){
    const mylat = position.coords.latitude;
    const mylng = position.coords.longitude;
    const myurl = `https://api.openweathermap.org/data/2.5/weather?lat=${mylat}&lon=${mylng}&appid=${API_KEY}&units=metric`;
    fetch(myurl).then(response => response.json()).then(data => {
        const name = data.name;
        const weather = data.weather[0].main;
        const temp = data.main.temp;
        mygeo.innerHTML = `지역 : ${name}`;
        myweather.innerHTML = `날씨 : ${weather}   온도 : ${temp}℃`;
    });
}

function getGeoError(){
    alert("위치 정보를 찾을 수 없습니다.")
}