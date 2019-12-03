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

function appendMaker(){
    switch(lifetimeMatchaCounter){
        case 10:
            //console.log('I made it mom')
            let cursorContainer = document.createElement('div')
            cursorContainer.classList.add('maker-container')
            cursorContainer.innerHTML = `
            <div class="maker-image">
                <img src="images/matcha-maker-logo.png" id="maker-image" data-type="cursor-btn">
            </div>
            <div style="flex-grow: 8" class="maker-content" data-type="cursor-btn">
                <div>Cursors: <span id="cursorCount">0</span></div>
                <div>Cursor Cost: <span id="cursorCost">15</span></div>
            </div>
            `
            cursorContainer.dataset.type = 'cursor-btn'
            cursorDiv.append(cursorContainer)
            break;
            // let cursorImg = document.createElement('img')
            // let cursorCount = document.createElement('p')
            // let cursorCost = document.createElement('p')
            // cursorCount.innerHTML = `Cursors: <span id="cursorCount">0</span><br>`
            // cursorCost.innerHTML = `Cursor Cost: <span id="cursorCost">15</span><br>`
            // cursorImg.src = "images/placeholder-01.png"
            // cursorImg.dataset.type = 'cursor-btn'
            // cursorImg.classList.add("image")
            // cursorDiv.append(cursorImg)
            // cursorDiv.append(cursorCount)
            // cursorDiv.append(cursorCost)
            // break;
        case 15:
            console.log('er?')
            let kenImg = document.createElement('img')
            kenImg.src = "images/placeholder-01.png"
            kenImg.classList.add("image")
            kenDiv.append(kenImg)
            break;
    }
}

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
    appendMaker()
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
            cursorIconAppender()
            matchaCup.dataset.userMatchas = matchaCount
            persistMatchaCount(matchaCup.dataset.userId, matchaCup.dataset.userMatchas)
        }
    }
})

let cursorIconHolder = document.createElement("div")
cursorIconHolder.className = "icon-container"
let middleColumn = document.querySelector("body > div > div.column.middle")

function cursorIconAppender(){
    let cursorCounter = document.querySelector("#cursorCount")
    cursorCounter = parseInt(cursorCounter.innerText)
    if(cursorCounter === 1){
        middleColumn.append(cursorIconHolder)
        console.log("I got here!")
    }
}
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
