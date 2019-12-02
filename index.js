let matchaCup = document.querySelector("body > div > div.column.left > img")
let matchaCounter = document.querySelector("body > div > div.column.left > span")
let matchaCount = parseInt(matchaCounter.innerText)
let lifetimeMatchaCounter = 0
let cursorDiv = document.querySelector("body > div > div.column.right > div.cursor")
let kenDiv = document.querySelector("body > div > div.column.right > div.kens")

function increaseMatchaCount(){
    matchaCount = matchaCount + 1
    matchaCounter.innerText = matchaCount
    lifetimeMatchaCounter += 1
    console.log(lifetimeMatchaCounter)
}

function appendMaker(){
    switch(lifetimeMatchaCounter){
        case 10:
            console.log('I made it mom')
            let cursorImg = document.createElement('img')
            cursorImg.src = "images/placeholder-01.png"
            cursorImg.classList.add("image")
            cursorDiv.append(cursorImg)
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
    //console.log("I'm working")
    //let matchaCount = 0
    increaseMatchaCount()
    appendMaker()
})

