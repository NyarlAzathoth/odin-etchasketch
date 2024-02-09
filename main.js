const NUM_SQUARES_DEFAULT = 16;
const WINDOW_SIZE_DEFAULT = 960;
const WINDOW_COLOR_DEFAULT = 'white';
const RANDOM_DEFAULT = false;
const DRAWING_COLOR_DEFAULT = 'black';
const OPACITY_INC_DEFAULT = 0.5;
const ERASER_DEFAULT = false;

const SETTINGS_DEFAULT = [
    NUM_SQUARES_DEFAULT, 
    WINDOW_SIZE_DEFAULT, 
    WINDOW_COLOR_DEFAULT, 
    RANDOM_DEFAULT, 
    DRAWING_COLOR_DEFAULT, 
    OPACITY_INC_DEFAULT, 
    ERASER_DEFAULT
    ];

const NUM_SQUARES_MAX = 100;
const WINDOW_SIZE_MAX = 960;

let numSquares = NUM_SQUARES_DEFAULT;
let windowSize = WINDOW_SIZE_DEFAULT;
let windowColor = WINDOW_COLOR_DEFAULT;
let random = RANDOM_DEFAULT;
let drawingColor = DRAWING_COLOR_DEFAULT;
let opacityInc = OPACITY_INC_DEFAULT;
let eraser = ERASER_DEFAULT;


function buildDrawingWindow (windowSize, numSquares) {
    const pastWindow = document.querySelector('.drawingWindow');

    if (pastWindow !== null) {pastWindow.remove()};
    
    if (numSquares === undefined || numSquares > NUM_SQUARES_MAX || numSquares < 0) {numSquares = NUM_SQUARES_MAX};
    if (windowSize === undefined || windowSize > WINDOW_SIZE_MAX || windowSize < 0) {windowSize = WINDOW_SIZE_MAX};
    let squareSize = windowSize/numSquares;

    let drawingWindow = document.createElement('div');
    drawingWindow.classList.add('drawingWindow');


    // centers window, changes color, add border and sets up flex display ofr the squares
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

    // creates squares in nested lists and add an event listener to each

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

// returns new opacity based on current opacity
function getNewOpacity (opacity) {
    if (opacity == '') {opacity = '0'};
    if (opacity == '1.0') {return opacity};
    return (Number(opacity)+opacityInc).toString();
}

// draws if the mouse hovers over square while mouse click is down or when clicking
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
    if (isNaN(newNumSquares)) {newNumSquares = NUM_SQUARES_DEFAULT};
    numSquares = newNumSquares;
    numSquaresButton.innerText = `Change the number of squares for the drawing area: ${numSquares}`;
    buildDrawingWindow(windowSize, numSquares);
}

function changeWindowSize () {
    newWindowSize = parseInt(prompt('How many pixels ? (max:960px)', '960'));
    if (isNaN(newWindowSize)) {newWindowSize = WINDOW_SIZE_DEFAULT};
    windowSize = newWindowSize;
    windowSizeButton.innerText = `Change the size of the drawing area: ${windowSize}px`;
    buildDrawingWindow(windowSize, numSquares);
}

function changeWindowColor () {
    let newColor = prompt('Enter new color (must be valid css color, default is '+WINDOW_COLOR_DEFAULT+')', WINDOW_COLOR_DEFAULT);
    if (!CSS.supports('color', newColor)) {newColor = WINDOW_COLOR_DEFAULT};
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
    let newColor = prompt('Enter new color (must be valid css color, default is '+DRAWING_COLOR_DEFAULT+')', DRAWING_COLOR_DEFAULT);
    if (!CSS.supports('color', newColor)) {newColor = DRAWING_COLOR_DEFAULT};
    drawingColor = newColor;
    colorButton.innerText = `Change drawing color: ${newColor}`;
    return newColor;
}

function changeOpacity () {
    let newOpacityInc = prompt('Enter new opacity rate (must be number between 0 and 1, default is '+OPACITY_INC_DEFAULT+')', OPACITY_INC_DEFAULT);
    if (!CSS.supports('opacity', newOpacityInc)) {newOpacityInc = OPACITY_INC_DEFAULT};
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
    numSquares = NUM_SQUARES_DEFAULT;
    windowSize = WINDOW_SIZE_DEFAULT;
    windowColor = WINDOW_COLOR_DEFAULT;
    random = RANDOM_DEFAULT;
    drawingColor = DRAWING_COLOR_DEFAULT;
    opacityInc = OPACITY_INC_DEFAULT;
    eraser = ERASER_DEFAULT;
    updateButtonsText();
    buildDrawingWindow(windowSize, numSquares);
}

function updateButtonsText () {
    numSquaresButton.innerText = `Change the number of squares for the drawing area: ${numSquares}`;
    windowSizeButton.innerText = `Change the size of the drawing area: ${windowSize}px`;
    windowColorButton.innerText = `Change windows background color: ${windowColor}`;
    randomButton.innerText = `Random: ${random}`;
    colorButton.innerText = `Change drawing color: ${windowColor}`;
    opacityButton.innerText = `Change opacity rate: ${opacityInc}`;
    eraserButton.innerText = `Eraser: ${eraser}`;
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


const buttons = [
    numSquaresButton,
    windowSizeButton,
    windowColorButton,
    randomButton,
    colorButton,
    opacityButton,
    eraserButton,
    startoverButton,
    resetButton
    ];

