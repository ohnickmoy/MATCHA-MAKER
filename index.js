let matchaCup = document.querySelector("body > div > div.column.left > img")
let matchaElement = document.querySelector("body > div > div.column.left > span")
let matchaCount = 0
let shopName = document.querySelector("#userShop")


let lifetimeMatchaCounter = 0

let cursorDiv = document.querySelector("body > div > div.column.right > div.cursor")
let kenDiv = document.querySelector("body > div > div.column.right > div.kens")
let rightColumn = document.querySelector("body > div > div.column.right")
let cursorCost = 0
let mps = 0.0

function increaseMatchaCount(){
    //console.log(matchaCount)
    matchaCount = matchaCount + 1
    matchaElement.innerText = Math.round(matchaCount)
    matchaCup.dataset.userMatchas = matchaCount
    lifetimeMatchaCounter += 1
    //console.log(lifetimeMatchaCounter)
}


//this is the function for the adding shop buttons
let cursorButton = document.querySelector("#cursor")
cursorButton.style.display = "none";

function shopButtons(){
    if(lifetimeMatchaCounter >= 10){
        cursorButton.style.display = "flex"
    }
    
}


//these are the functions for adding the icon holders
let cursorIconHolder = document.querySelector("body > div > div.column.middle > div")
cursorIconHolder.style.display = "none"
let middleColumn = document.querySelector("body > div > div.column.middle")

function iconHolders(){
    let cursorCounter = document.querySelector("#cursorCount")
    cursorCounter = parseInt(cursorCounter.innerText)
    if(cursorCounter === 1){
        cursorIconHolder.style.display = ""
    }
}

// function appendMaker(){
//     switch(lifetimeMatchaCounter){
//         case 15:
//             console.log('er?')
//             let kenImg = document.createElement('img')
//             kenImg.src = "images/placeholder-01.png"
//             kenImg.classList.add("image")
//             kenDiv.append(kenImg)
//             break;
//     }
// }

function persistMatchaCount(id, matchas){
    fetch(`http://localhost:3000/api/v1/users/${id}`, {method: "PATCH", 
        headers: {
        "Content-Type": "application/json",
        accept: "application/json"
        },
        body: JSON.stringify({matchas: matchas})
    })
}

matchaCup.addEventListener('click', function(e){
    increaseMatchaCount()
    persistMatchaCount(e.target.dataset.userId, e.target.dataset.userMatchas)
    shopButtons()
})

setInterval(function(){
    console.log(matchaCount)
    Math.round(matchaCount += mps)
    matchaElement.innerText = Math.round(matchaCount)
    matchaCup.dataset.userMatchas = Math.round(matchaCount)
}, 1000)


rightColumn.addEventListener('click', function(e){
    let cursorCounter = document.querySelector("#cursorCount")
    let mpsCounter = document.querySelector("#mps")
    let cursorCostCounter = document.querySelector("#cursorCost")

    if(e.target.dataset.type === 'cursor-btn'){
        cursorCost = parseInt(document.querySelector("#cursorCost").innerText)
        if (matchaCount >= cursorCost){
            matchaCount -= cursorCost;
            matchaElement.innerText = Math.round(matchaCount)
            cursorCounter.innerText = parseInt(cursorCounter.innerText) + 1
            mps = mps + 0.2;
            mpsCounter.innerText = mps.toPrecision(2)
            cursorCostCounter.innerText = Math.round(15 * Math.pow(1.1, parseInt(cursorCounter.innerText)))
            matchaCup.dataset.userMatchas = matchaCount
            persistMatchaCount(matchaCup.dataset.userId, matchaCup.dataset.userMatchas)
            iconHolders()
        }
    }
})


//fetch get request for user info, hard coded to nick
function loadUserInfo(json){
    shopName.innerText = `${json.data.attributes.name}'s Matcha Shop!`
    matchaCount = json.data.attributes.matchas
    matchaElement.innerText = json.data.attributes.matchas
    matchaCup.dataset.userId = json.data.attributes.id
    matchaCup.dataset.userMatchas = json.data.attributes.matchas
}

function fetchUserInfo(){
    fetch('http://localhost:3000/api/v1/users/3')
        .then(function(resp){
            return resp.json()
        })
        .then(function(json){
            console.log(json)
            loadUserInfo(json)
        })
}

document.addEventListener('DOMContentLoaded', function(e){
    fetchUserInfo()
})
