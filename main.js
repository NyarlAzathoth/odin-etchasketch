const defaultNumSquares = 16;
const defaultWindowSize = 960;
const defaultWindowColor = 'white';
const defaultDrawingColor = 'black'
const defaultOpacityInc = 0.1;
const maxNumSquares = 100;
const maxWindowSize = 960;

let numSquares = defaultNumSquares;
let windowSize = defaultWindowSize;
let windowColor = defaultWindowColor;
let random = false;
let drawingColor = defaultDrawingColor;
let opacityInc = defaultOpacityInc;
let eraser = false;

function buildDrawingWindow (windowSize, numSquares) {
    const pastWindow = document.querySelector('.drawingWindow');

    if (pastWindow !== null) {pastWindow.remove()};
    
    if (numSquares > maxNumSquares || numSquares < 0) {numSquares = maxNumSquares};
    if (windowSize > maxWindowSize || windowSize < 0) {windowSize = maxWindowSize};
    let squareSize = windowSize/numSquares;

    let drawingWindow = document.createElement('div');
    drawingWindow.classList.add('drawingWindow');

    drawingWindow.style.cssText=`
        background-color: ${windowColor};
        height: ${windowSize}px;width: ${windowSize}px;
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

function getOpacity (opacity) {
    if (opacity == '') {opacity = '0'};
    if (opacity == '1.0') {return opacity};
    return (Number(opacity)+opacityInc).toString();
}

function draw (div, e) {
    if (e.type == 'mouseover' && e.buttons == 1 || e.type == 'click') {
        let divColor = getColor();
        let newOpacity = (eraser) ? 0 : getOpacity(div.style.opacity);
        div.style.opacity = newOpacity;
        div.style.backgroundColor = divColor;
    }
}

function changeNumSquares (button) {
    numSquares = parseInt(prompt('How many squares ? (max:100)', '16'));
    if (isNaN(numSquares)) {numSquares = defaultNumSquares};
    button.innerText = `Change the number of squares for the drawing area: ${numSquares}`;
    buildDrawingWindow(windowSize, numSquares);
}

function changeWindowSize (button) {
    windowSize = parseInt(prompt('How many pixels ? (max:960px)', '960'));
    if (isNaN(windowSize)) {windowSize = defaultWindowSize};
    button.innerText = `Change the size of the drawing area: ${windowSize}px`;
    buildDrawingWindow(windowSize, numSquares);
}

function changeWindowColor (button) {
    let newColor = prompt('Enter new color (must be valid css color, default is '+defaultWindowColor+')', defaultWindowColor);
    if (!CSS.supports('color', newColor)) {newColor = defaultWindowColor};
    windowColor = newColor;
    buildDrawingWindow(windowSize, numSquares);
    button.innerText = `Change windows background color: ${newColor}`;
    return newColor;
}

function toggleRandom (button) {
    random = !random;
    button.innerText = `Random: ${random}`;
    return random;
}

function changeColor (button) {
    let newColor = prompt('Enter new color (must be valid css color, default is '+defaultDrawingColor+')', defaultDrawingColor);
    if (!CSS.supports('color', newColor)) {newColor = defaultDrawingColor};
    drawingColor = newColor;
    button.innerText = `Change drawing color: ${newColor}`;
    return newColor;
}

function changeOpacity (button) {
    let newOpacityInc = prompt('Enter new opacity rate (must be number between 0 and 1, default is '+defaultOpacityInc+')', defaultOpacityInc);
    if (!CSS.supports('opacity', newOpacityInc)) {newOpacityInc = defaultOpacityInc};
    opacityInc = Number(newOpacityInc);
    button.innerText = `Change drawing color: ${newOpacityInc}`;
    return newOpacityInc;
}

function toggleEraser (button) {
    eraser = !eraser;
    button.innerText = `Eraser: ${eraser}`;
    return eraser;
}


// Building of the default drawing window

buildDrawingWindow(windowSize, numSquares);

// Sets up the button for changing number of squares

const numSquaresButton = document.querySelector('#numSquares');

numSquaresButton.addEventListener('click', function () {changeNumSquares(numSquaresButton)});

// Sets up button for changing size of drawing window

const windowSizeButton = document.querySelector('#windowSize');

windowSizeButton.addEventListener('click', function () {changeWindowSize(windowSizeButton)});

// Sets up the button for background color of drawing window

const windowColorButton = document.querySelector('#windowColor');

windowColorButton.addEventListener('click', function () {changeWindowColor(windowColorButton)});

// Sets up random color button

const randomButton = document.querySelector('#random');

randomButton.addEventListener('click', function () {toggleRandom(randomButton)});

// Sets up color button

const colorButton = document.querySelector('#color');

colorButton.addEventListener('click', function () {changeColor(colorButton)});

// Sets up opacity button

const opacityButton = document.querySelector('#opacity');

opacityButton.addEventListener('click', function () {changeOpacity(opacityButton)});

// Sets up eraser utton

const eraserButton = document.querySelector('#eraser');

eraserButton.addEventListener('click', function () {toggleEraser(eraserButton)});

