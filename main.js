const defaultNumSquares = 16;
const defaultWindowSize = 960;
const defaultWindowColor = 'white';
const defaultRandom = false;
const defaultDrawingColor = 'black';
const defaultOpacityInc = 0.1;
const defaultEraser = false;

const maxNumSquares = 100;
const maxWindowSize = 960;

let numSquares = defaultNumSquares;
let windowSize = defaultWindowSize;
let windowColor = defaultWindowColor;
let random = defaultRandom;
let drawingColor = defaultDrawingColor;
let opacityInc = defaultOpacityInc;
let eraser = defaultEraser;

function buildDrawingWindow (windowSize, numSquares) {
    const pastWindow = document.querySelector('.drawingWindow');

    if (pastWindow !== null) {pastWindow.remove()};
    
    if (numSquares === undefined || numSquares > maxNumSquares || numSquares < 0) {numSquares = maxNumSquares};
    if (windowSize === undefined || windowSize > maxWindowSize || windowSize < 0) {windowSize = maxWindowSize};
    let squareSize = windowSize/numSquares;

    let drawingWindow = document.createElement('div');
    drawingWindow.classList.add('drawingWindow');

    drawingWindow.style.cssText=`
        background-color: ${windowColor};
        height: ${windowSize}px;width: ${windowSize}px;
        border: 5px solid black;
        margin: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        display: flex;
        flex-wrap: wrap;
    `

    let squares = new Array(numSquares);

    for (let i = 0; i<numSquares; i++) {
        squares[i] = new Array(numSquares);
        for (let j = 0; j<numSquares; j++) {
            let div = squares[i][j];
            
            div = document.createElement('div');
            let events = 'mouseover click'.split(' ');
            events.forEach( event => div.addEventListener(event, function (event) {draw(div, event)}) );
            squares[i][j] = drawingWindow.appendChild(div);
            div = squares[i][j];
        
            div.style.cssText =`
                height: ${squareSize}px;
                width: ${squareSize}px;
                opacity: 0;
                flex: 0 0 auto;
            `
        }
        
    }

    drawingWindow = document.body.appendChild(drawingWindow);
}

function getColor () {
    if (random === true) {
        let randomColor = `hsl(${Math.round(Math.random()*360)}deg 50% 50%)`;
        return randomColor;
    } else {
        return drawingColor;
    }
}

function getNewOpacity (opacity) {
    if (opacity == '') {opacity = '0'};
    if (opacity == '1.0') {return opacity};
    return (Number(opacity)+opacityInc).toString();
}

function draw (div, e) {
    if (e.type == 'mouseover' && e.buttons == 1 || e.type == 'click') {
        let divColor = getColor();
        let newOpacity = (eraser) ? 0 : getNewOpacity(div.style.opacity);
        div.style.opacity = newOpacity;
        div.style.backgroundColor = divColor;
    }
}

function changeNumSquares () {
    newNumSquares = parseInt(prompt('How many squares ? (max:100)', '16'));
    if (isNaN(newNumSquares)) {newNumSquares = defaultNumSquares};
    numSquares = newNumSquares;
    numSquaresButton.innerText = `Change the number of squares for the drawing area: ${numSquares}`;
    buildDrawingWindow(windowSize, numSquares);
}

function changeWindowSize () {
    newWindowSize = parseInt(prompt('How many pixels ? (max:960px)', '960'));
    if (isNaN(newWindowSize)) {newWindowSize = defaultWindowSize};
    windowSize = newWindowSize;
    windowSizeButton.innerText = `Change the size of the drawing area: ${windowSize}px`;
    buildDrawingWindow(windowSize, numSquares);
}

function changeWindowColor () {
    let newColor = prompt('Enter new color (must be valid css color, default is '+defaultWindowColor+')', defaultWindowColor);
    if (!CSS.supports('color', newColor)) {newColor = defaultWindowColor};
    windowColor = newColor;
    buildDrawingWindow(newWindowSize, newNumSquares);
    windowColorButton.innerText = `Change windows background color: ${newColor}`;
    return newColor;
}

function toggleRandom () {
    random = !random;
    randomButton.innerText = `Random: ${random}`;
    return random;
}

function changeColor () {
    let newColor = prompt('Enter new color (must be valid css color, default is '+defaultDrawingColor+')', defaultDrawingColor);
    if (!CSS.supports('color', newColor)) {newColor = defaultDrawingColor};
    drawingColor = newColor;
    colorButton.innerText = `Change drawing color: ${newColor}`;
    return newColor;
}

function changeOpacity () {
    let newOpacityInc = prompt('Enter new opacity rate (must be number between 0 and 1, default is '+defaultOpacityInc+')', defaultOpacityInc);
    if (!CSS.supports('opacity', newOpacityInc)) {newOpacityInc = defaultOpacityInc};
    opacityInc = Number(newOpacityInc);
    opacityButton.innerText = `Change opacity rate: ${newOpacityInc}`;
    return newOpacityInc;
}

function toggleEraser () {
    eraser = !eraser;
    eraserButton.innerText = `Eraser: ${eraser}`;
    return eraser;
}

function resetValues () {
    numSquares = defaultNumSquares;
    windowSize = defaultWindowSize;
    windowColor = defaultWindowColor;
    random = defaultRandom;
    drawingColor = defaultDrawingColor;
    opacityInc = defaultOpacityInc;
    eraser = defaultEraser;
    numSquaresButton.innerText = `Change the number of squares for the drawing area: ${numSquares}`;
    windowSizeButton.innerText = `Change the size of the drawing area: ${windowSize}px`;
    windowColorButton.innerText = `Change windows background color: ${windowColor}`;
    randomButton.innerText = `Random: ${random}`;
    colorButton.innerText = `Change drawing color: ${defaultDrawingColor}`;
    opacityButton.innerText = `Change opacity rate: ${defaultOpacityInc}`;
    eraserButton.innerText = `Eraser: ${defaultEraser}`;
    buildDrawingWindow(windowSize, numSquares);
}


// Building of the default drawing window

buildDrawingWindow(windowSize, numSquares);

// Sets up the button for changing number of squares

const numSquaresButton = document.querySelector('#numSquares');

numSquaresButton.addEventListener('click', function () {changeNumSquares()});

// Sets up button for changing size of drawing window

const windowSizeButton = document.querySelector('#windowSize');

windowSizeButton.addEventListener('click', function () {changeWindowSize()});

// Sets up the button for background color of drawing window

const windowColorButton = document.querySelector('#windowColor');

windowColorButton.addEventListener('click', function () {changeWindowColor()});

// Sets up random color button

const randomButton = document.querySelector('#random');

randomButton.addEventListener('click', function () {toggleRandom()});

// Sets up color button

const colorButton = document.querySelector('#color');

colorButton.addEventListener('click', function () {changeColor()});

// Sets up opacity button

const opacityButton = document.querySelector('#opacity');

opacityButton.addEventListener('click', function () {changeOpacity()});

// Sets up eraser button

const eraserButton = document.querySelector('#eraser');

eraserButton.addEventListener('click', function () {toggleEraser()});

// Sets up start over button

const startoverButton = document.querySelector('#startover');

startoverButton.addEventListener('click', function () {buildDrawingWindow(windowSize, numSquares)});

// Sets up reset button

const resetButton = document.querySelector('#reset');

resetButton.addEventListener('click', function () {resetValues()});

