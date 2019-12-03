let matchaCup = document.querySelector("body > div > div.column.left > img")
let matchaElement = document.querySelector("body > div > div.column.left > span")
let matchaCount = parseInt(matchaElement.innerText)

let lifetimeMatchaCounter = 0

let cursorDiv = document.querySelector("body > div > div.column.right > div.cursor")
let kenDiv = document.querySelector("body > div > div.column.right > div.kens")
let rightColumn = document.querySelector("body > div > div.column.right")
let cursorCost = 0
let mps = 0.0

function increaseMatchaCount(){
    matchaCount = matchaCount + 1
    matchaElement.innerText = Math.round(matchaCount)
    lifetimeMatchaCounter += 1
    //console.log(lifetimeMatchaCounter)
}

function appendMaker(){
    switch(lifetimeMatchaCounter){
        case 10:
            //console.log('I made it mom')
            let cursorImg = document.createElement('img')
            let cursorCount = document.createElement('p')
            let cursorCost = document.createElement('p')
            cursorCount.innerHTML = `Cursors: <span id="cursorCount">0</span><br>`
            cursorCost.innerHTML = `Cursor Cost: <span id="cursorCost">15</span><br>`
            cursorImg.src = "images/placeholder-01.png"
            cursorImg.dataset.type = 'cursor-btn'
            cursorImg.classList.add("image")
            cursorDiv.append(cursorImg)
            cursorDiv.append(cursorCount)
            cursorDiv.append(cursorCost)
            break;
        case 15:
            console.log('er?')
            let kenImg = document.createElement('img')
            kenImg.src = "images/placeholder-01.png"
            kenImg.classList.add("image")
            kenDiv.append(kenImg)
            break;
    }
}
matchaCup.addEventListener('click', function(e){
    increaseMatchaCount()
    appendMaker()
})

setInterval(function(){
    Math.round(matchaCount += mps)
    matchaElement.innerText = Math.round(matchaCount)
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
        }
    }
})
