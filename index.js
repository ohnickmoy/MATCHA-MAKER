let matchaCup = document.querySelector("body > div > div.column.left > img")
let matchaCounterElement = document.querySelector("body > div > div.column.left > span")
let shopName = document.querySelector("#userShop")
let resetBtn = document.querySelector('#reset')
let mpsCounterElement = document.querySelector("#mps")
let cursorCounterElement = document.querySelector("#cursorCount")
let cursorCostElement = document.querySelector("#cursorCost")



let cursorCounter = 0
let matchaCount = 0
let lifetimeMatchaCounter = 0
let mps = 0.0
let cursorCost = 15


let cursorDiv = document.querySelector("body > div > div.column.right > div.cursor")
let kenDiv = document.querySelector("body > div > div.column.right > div.kens")
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

//this is the function for the adding shop buttons
let cursorButton = document.querySelector("#cursor")
cursorButton.style.display = "none";

function shopButtons(){
    if(lifetimeMatchaCounter >= 10){
        cursorButton.style.display = "flex"
    }
}

function appendCursorToHolder(){
    let cursorIcon = document.createElement("img")
    cursorIcon.src = "images/cursor.png"
    cursorIcon.classList.add("icon")
    cursorIconHolder.append(cursorIcon);   
}

//these are the functions for adding the icon holders
let cursorIconHolder = document.querySelector("body > div > div.column.middle > div")
cursorIconHolder.style.display = "none"
let middleColumn = document.querySelector("body > div > div.column.middle")

function iconHolders(){
    if(cursorCounter > 0){
        cursorIconHolder.style.display = ""
        for (i = 0; i < cursorCounter; i++) {
            appendCursorToHolder()
          }
    }
}

function persistMatchaCount(id, matchas){
    fetch(`http://localhost:3000/api/v1/users/${id}`, {method: "PATCH", 
        headers: {
        "Content-Type": "application/json",
        accept: "application/json"
        },
        body: JSON.stringify({matchas: matchas, lifeTimeMatchas: lifetimeMatchaCounter, mps: mps, cursors: cursorCounter})
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
            buyCursor()
            persistMatchaCount(matchaCup.dataset.userId, matchaCount)
            //iconHolders()
            appendCursorToHolder()
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

    cursorCostElement.innerText = cursorCost
    
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
    cursorIconHolder.style.display = "none";

    cursorCostElement.innerText =  '15'
    cursorCost = 15

    cursorCounterElement = '0'
}

function resetUserAttributes(id){
    fetch(`http://localhost:3000/api/v1/users/${id}`, {method: "PATCH", 
        headers: {
        "Content-Type": "application/json",
        accept: "application/json"
        },
    body: JSON.stringify({type: 'reset' , matchas: 0, lifeTimeMatchas: 0, mps: 0, cursors: 0})
})
}



resetBtn.addEventListener('click', function(e){
    resetDom()
    resetUserAttributes(matchaCup.dataset.userId)
})

document.addEventListener('DOMContentLoaded', function(e){
    fetchUserInfo()
})
