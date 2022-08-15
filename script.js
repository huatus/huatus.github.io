function drawGrid() {
    // Создать вертикальную линию сетки
    for(let i = 0.5 + box; i < canvas.width; i += box){
        ctx.moveTo(i, 0)
        ctx.lineTo(i, canvas.height)
    }
    // Создать горизонтальную линию сетки
    for(let j = 0.5 + box; j < canvas.height; j += box){
        ctx.moveTo(0, j)
        ctx.lineTo(canvas.width, j)
    }

                // Установить цвет рисования
    ctx.strokeStyle = "#ffffff"
                // Устанавливаем ширину нарисованного отрезка линии
    ctx.lineWidth = 0.5
                // рисуем сетку
    ctx.stroke()
                // очистить путь
    ctx.beginPath()
}

function newBlock(e) {
    var x = e.offsetX - (e.offsetX % box), y = e.offsetY - (e.offsetY % box)
    var blockType = "color"
    for (let i = 0; i < paintedBlocks.length; i++) {
        var pb = paintedBlocks[i]
        if (pb.canvasX === x && pb.canvasY === y && pb.type === blockType)
            paintedBlocks.splice(i, 1)
    }
    paintedBlocks.unshift({
        x: x / box,
        y: y / box,
        canvasX: x,
        canvasY: y,
        type: blockType
    })
}

const canvas = document.getElementById("canvas-screen")
const ctx = canvas.getContext("2d")

var box = 32

canvas.width = document.documentElement.clientWidth - document.documentElement.clientWidth % box
canvas.height = document.documentElement.clientHeight - document.documentElement.clientHeight % box

var paintedBlocks = []
var mousePressed = false 

function drawGame() {
    ctx.fillStyle = "rgb(212, 212, 212)"
    ctx.fillRect(0,0, canvas.width, canvas.height)

    paintedBlocks.forEach((pb) => {
        ctx.fillStyle = "#32a852"
        ctx.fillRect(pb.canvasX, pb.canvasY, box,box)
    })

    drawGrid()
}

let game = setInterval(drawGame, 1)
canvas.addEventListener("mousedown", (e) => {
    if (e.button == 0) {
        mousePressed = true
        newBlock(e)
    }
})

canvas.addEventListener("mousemove", (e) => {
    if (mousePressed) {
        newBlock(e)
    }
})

addEventListener("mouseup", () => {
    mousePressed = false
})

// для следующего файла

const button = document.querySelector(".menu-button")
const mainMenu = document.querySelector(".main-menu")
var flagMenu = 0

button.onclick = () => {
    switch (flagMenu) {
        case 0:
            mainMenu.style.display = "none"
            flagMenu = 1
            break
        case 1:
            mainMenu.style.display = ""
            flagMenu = 0
            break
    }
}