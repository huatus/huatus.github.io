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

function newBlock(e, pixel) {
    var x = e.offsetX - (e.offsetX % box), y = e.offsetY - (e.offsetY % box)
    for (let i = 0; i < paintedBlocks.length; i++) {
        var pb = paintedBlocks[i]
        if (pb.canvasX === x && pb.canvasY === y)
            paintedBlocks.splice(i, 1)
    }
    paintedBlocks.unshift({
        x: x / box,
        y: y / box,
        canvasX: x,
        canvasY: y,
        pixel: pixel
    })
}

const canvas = document.getElementById("canvas-screen")
const ctx = canvas.getContext("2d")

var box = 32

canvas.width = document.documentElement.clientWidth - document.documentElement.clientWidth % box
canvas.height = document.documentElement.clientHeight - document.documentElement.clientHeight % box

var paintedBlocks = []
var mousePressed = false 

const pixels = [
                {name: "metal",color:"#909090"},
                {name: "blue",color:"#5457f7"},
                {name: "green",color:"#32a852"}
]

var pixel = pixels[2]

function drawGame() {
    ctx.fillStyle = "rgb(212, 212, 212)"
    ctx.fillRect(0,0, canvas.width, canvas.height)

    paintedBlocks.forEach((pb) => {
        ctx.fillStyle = pb.pixel.color
        ctx.fillRect(pb.canvasX, pb.canvasY, box,box)
    })

    drawGrid()
}

let game = setInterval(drawGame, 1)
canvas.addEventListener("mousedown", (e) => {
    if (e.button == 0) {
        mousePressed = true
        newBlock(e, pixel)
    }
})

canvas.addEventListener("mousemove", (e) => {
    if (mousePressed) {
        newBlock(e, pixel)
    }
})

addEventListener("mouseup", () => {
    mousePressed = false
})

// для следующего файла

const button = document.querySelector(".menu-button")
const mainMenu = document.querySelector(".main-menu")

const buttons = document.querySelectorAll(".change-pixel BUTTON")

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

for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = (e) => {
        switch (e.currentTarget.textContent) {
            case "металл":
                pixel = pixels[0]
                break
            case "синий":
                pixel = pixels[1]
                break
            case "зелёный":
                pixel = pixels[2]
                break
        }
    }
}