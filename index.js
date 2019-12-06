let shopName = document.querySelector("#userShop")
let matchaCup = document.querySelector("body > div > div.column.left > img")
let matchaCounterElement = document.querySelector("body > div > div.column.left > span")
let mpsCounterElement = document.querySelector("#mps")
let resetBtn = document.querySelector('#reset')

let cursorCounterElement = document.querySelector("#cursorCount")
let cursorCostElement = document.querySelector("#cursorCost")
let baberistaCounterElement = document.querySelector("#baberistaCount")
let baberistaCostElement = document.querySelector("#baberistaCost")


let cursorCounter = 0
let baberistaCounter = 0
let matchaCount = 0
let lifetimeMatchaCounter = 0
let mps = 0.0
let cursorCost = 15
let baberistaCost = 100


let cursorDiv = document.querySelector("body > div > div.column.right > div.cursor")
let rightColumn = document.querySelector("body > div > div.column.right")

function increaseMatchaCount(){
    matchaCount = matchaCount + 1
    matchaCounterElement.innerText = Math.round(matchaCount)
    lifetimeMatchaCounter += 1
}

//does math to find to cost of next cursor
function costOfCursor(){
    return Math.round(15 * Math.pow(1.1, cursorCounter))
}

function costOfBaberista(){
    return Math.round(100 * Math.pow(1.1, baberistaCounter))
}

//buys cursor, updates dom
function buyCursor(){
    matchaCount -= cursorCost;
    matchaCounterElement.innerText = Math.round(matchaCount)

    cursorCounter += 1
    cursorCounterElement.innerText = cursorCounter

    mps = mps + 0.2;
    
    mpsCounterElement.innerText = mps.toPrecision(2)
    
    cursorCost = costOfCursor()
    cursorCostElement.innerText = cursorCost
}

function buyBaberista(){
    matchaCount -= baberistaCost
    matchaCounterElement.innerText = Math.round(matchaCount)

    baberistaCounter += 1
    baberistaCounterElement.innerText = baberistaCounter

    mps = mps + 0.8;
    
    mpsCounterElement.innerText = mps.toPrecision(2)
    
    baberistaCost = costOfBaberista()
    baberistaCostElement.innerText = baberistaCost
}

//this is the function for the adding shop buttons
let cursorButton = document.querySelector("#cursor")
let baberistaButton = document.querySelector("#baberistas")
cursorButton.style.display = "none";
baberistaButton.style.display = "none";

function shopButtons(){
    if(lifetimeMatchaCounter >= 10){
        cursorButton.style.display = "flex"
    }

    if(lifetimeMatchaCounter >= 100){
        baberistaButton.style.display = "flex"
    }
}

function appendCursorToHolder(){
    let cursorIcon = document.createElement("img")
    cursorIcon.src = "images/cursor.png"
    cursorIcon.classList.add("icon")
    cursorIconHolder.append(cursorIcon);   
}

function appendBaberistaToHolder(){
    let baberistaIcon = document.createElement('img')
    baberistaIcon.src = "images/baberista-02.png"
    baberistaIcon.classList.add("icon")
    baberistaIconHolder.append(baberistaIcon);   
}

//these are the functions for adding the icon holders
let cursorIconHolder = document.querySelector("body > div > div.column.middle > div")
let baberistaIconHolder = document.querySelector("#baberistaHolder")
cursorIconHolder.style.display = "none"
baberistaIconHolder.style.display = "none"
let middleColumn = document.querySelector("body > div > div.column.middle")

function iconHolders(){
    if(cursorCounter > 0){
        cursorIconHolder.style.display = ""
        for (i = 0; i < cursorCounter; i++) {
            appendCursorToHolder()
          }
    }
    if(baberistaCounter > 0){
        baberistaIconHolder.style.display = ""
        for(i = 0; i < baberistaCounter; i++){
            appendBaberistaToHolder()
        }
    }
}

function persistMatchaCount(id, matchas){
    fetch(`http://localhost:3000/api/v1/users/${id}`, {method: "PATCH", 
        headers: {
        "Content-Type": "application/json",
        accept: "application/json"
        },
        body: JSON.stringify({matchas: matchas, lifeTimeMatchas: lifetimeMatchaCounter, mps: mps, cursors: cursorCounter, baberistas: baberistaCounter})
    })
}

matchaCup.addEventListener('click', function(e){
    increaseMatchaCount()
    persistMatchaCount(e.target.dataset.userId, matchaCount)
    shopButtons()
})

setInterval(function(){
    Math.round(matchaCount += mps)
    Math.round(lifetimeMatchaCounter += mps)
    matchaCounterElement.innerText = Math.round(matchaCount)
}, 1000)


rightColumn.addEventListener('click', function(e){
    if(e.target.dataset.type === 'cursor-btn'){
        if (matchaCount >= cursorCost){
            if(cursorCounter === 0){
                cursorIconHolder.style.display = ""
            }

            buyCursor()
            persistMatchaCount(matchaCup.dataset.userId, matchaCount)
            appendCursorToHolder()
        }
    }

    if(e.target.dataset.type === 'baberistas-btn'){
        if (matchaCount >= baberistaCost){
            if(baberistaCounter === 0){
                baberistaIconHolder.style.display = ""
            }

            buyBaberista()
            persistMatchaCount(matchaCup.dataset.userId, matchaCount)
            appendBaberistaToHolder()
        }
    }
})

//fetch get request for user info, hard coded to nick
function loadUserInfo(attributes){
    shopName.innerText = `${attributes.name}'s Matcha Shop!`
    matchaCounterElement.innerText = attributes.matchas
    cursorCounterElement.innerText = attributes.cursors
    mpsCounterElement.innerText = attributes.mps
    
    matchaCup.dataset.userId = attributes.id
    
    matchaCount = attributes.matchas
    lifetimeMatchaCounter = attributes.lifeTimeMatchas
    mps = attributes.mps

    mpsCounterElement.innerText = mps.toPrecision(2)

    cursorCounter = attributes.cursors
    cursorCost = costOfCursor()

    baberistaCounter = attributes.baberistas
    baberistaCost = costOfBaberista()

    cursorCostElement.innerText = cursorCost
    baberistaCostElement.innerText = baberistaCost
    
    iconHolders()
    shopButtons()
}

function fetchUserInfo(){
    fetch('http://localhost:3000/api/v1/users/3')
        .then(function(resp){
            return resp.json()
        })
        .then(function(json){
            loadUserInfo(json.data.attributes)
            new User(json.data.attributes)
        })
}

function resetDom(){
    matchaCounterElement.innerText = '0'
    matchaCount = 0
    mpsCounterElement.innerText = '0.0'
    lifetimeMatchaCounter = 0
    mps = 0.0
    cursorButton.style.display = "none";
    baberistaButton.style.display = "none";
    cursorIconHolder.style.display = "none";
    baberistaIconHolder.style.display = "none";
    cursorIconHolder.innerHTML = ''
    baberistaIconHolder.innerHTML = ''

    cursorCostElement.innerText =  '15'
    cursorCost = 15
    baberistaCostElement.innerText = '100'
    baberistaCost = 100

    cursorCounterElement.innerText = '0'
    cursorCounter = 0   
    baberistaCounterElement.innerText = '0'
    baberistaCounter = 0
}

function resetUserAttributes(id){
    fetch(`http://localhost:3000/api/v1/users/${id}`, {method: "PATCH", 
        headers: {
        "Content-Type": "application/json",
        accept: "application/json"
        },
    body: JSON.stringify({type: 'reset' , matchas: 0, lifeTimeMatchas: 0, mps: 0, cursors: 0, baberistas: 0})
})
}



resetBtn.addEventListener('click', function(e){
    resetDom()
    resetUserAttributes(matchaCup.dataset.userId)
})

document.addEventListener('DOMContentLoaded', function(e){
    fetchUserInfo()
})
