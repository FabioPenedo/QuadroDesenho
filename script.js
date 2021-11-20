let currentColor = 'black'
let screen = document.querySelector('#tela');
let canDraw = false;
let mouseX = 0;
let mouseY = 0;
let size = 1;
let ctx = screen.getContext('2d')

document.querySelectorAll('.color').forEach((item)=>{
    item.addEventListener('click', colorClickEvent)
});
screen.addEventListener('mousedown', mouseDownEvent);
screen.addEventListener('mousemove', mouseMoveEvent);
screen.addEventListener('mouseup', mouseUpEvent);
document.querySelector('.tamanho .mais').addEventListener('click', increaseSize)
document.querySelector('.tamanho .menos').addEventListener('click', decreaseSize)
document.querySelector('.clear').addEventListener('click', clearScreen);

function colorClickEvent(e){
    let color = e.target.getAttribute('data-color');
    if(color === '#fff'){
        document.querySelector('.borracha').style.color = '#ff006e'
    }else {
        document.querySelector('.borracha').style.color = '#fff'
    }
    currentColor = color
    document.querySelector('.color.active').classList.remove('active');
    e.target.classList.add('active');
}

function mouseDownEvent(e){
    canDraw = true;
    mouseX = e.pageX - screen.offsetLeft;
    mouseY = e.pageY - screen.offsetTop;
}

function mouseMoveEvent(e){
    if(canDraw){
        draw(e.pageX, e.pageY)
    }
}

function mouseUpEvent(){
    canDraw = false;
}

function increaseSize() {
    size++
    ctx.lineWidth = size
}

function decreaseSize(){
    if(size > 1){
        ctx.lineWidth = size--
    }
}

function draw(x, y){
    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop;
    ctx.beginPath();
    ctx.lineWidth = size;
    ctx.lineJoin = 'round';
    ctx.moveTo(mouseX, mouseY);
    ctx.lineTo(pointX, pointY);
    ctx.closePath();
    ctx.strokeStyle = currentColor;
    ctx.stroke()
    mouseX = pointX;
    mouseY = pointY;
}

function clearScreen(){
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function abrirCores(){
    let areaCores = document.querySelector('.cores')
    if(areaCores.style.display == 'grid') {
        areaCores.style.opacity = 0
        setTimeout(() => {
            areaCores.style.display = 'none'
        }, 350);
    }else {
        areaCores.style.opacity = 0
        areaCores.style.display = 'grid'
        setTimeout(() => {
            areaCores.style.opacity = 1
        }, 200);
    }
}