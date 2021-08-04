// DOM elements
const start_btn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const time_buttons = document.querySelector('#time-list')
const seconds = document.querySelector('#seconds')
const board = document.querySelector('#board')
const timer = document.querySelector('.timer')

// own variables
let time = 0
let score = 0
const colors = ['#882899', '#b32b73', '#b01e40', '#5527a3']

start_btn.addEventListener('click', event => {
    event.preventDefault()
    screens[0].classList.add('up')
})

time_buttons.addEventListener('click', event => {
    if(event.target.classList.contains('time-btn')){
        time = event.target.getAttribute('date-time')
        screens[1].classList.add('up')
        playGame()
    }  
})

board.addEventListener('click', event => {
    if(event.target.classList.contains('circle')){
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function playGame(){
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime(){
    if(time === 0){
        stopGame()
    } else {
        time = --time 
        setTime()
    }
}

function setTime(){
    if(time > 9){
        seconds.textContent = time
    }
    else if (time || !time){
            seconds.textContent = `0${time}`
    }
}

function stopGame(){
    timer.classList.add('hide')
    board.innerHTML = `<h1>Score: <span class="primary">${score}</span></h1>`
}


function createRandomCircle(){
    const circle = document.createElement('div')
    circle.classList.add('circle')
    board.append(circle)
    
    const size = getRandomNumber(5, 30)
    
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    
    circle.style.background = `${colors[getRandomNumber(0, colors.length)]}`
   
    const {width, height} = board.getBoundingClientRect()
    circle.style.top = `${getRandomNumber(0, height - size)}px`
    circle.style.left = `${getRandomNumber(0, width - size)}px`
}
    
function getRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min) + min)
}

/* hack theS game */
function killCircles(wait){
    setInterval(() => {
        const circle = document.querySelector('.circle')
        if(!circle){
            return
        }
    circle.click()
    }, wait)
}