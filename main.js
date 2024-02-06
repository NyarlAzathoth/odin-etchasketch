const defaultNumSquares = 16;
const defaultWindowSize = 960;
const defaultOpacityInc = 0.1;
const defaultDrawingColor = 'black'
const defaultWindowColor = 'white';
const maxNumSquares = 16;
const maxWindowSize = 960;

let numSquares = defaultNumSquares;
let windowSize = defaultWindowSize;
let opacityInc = defaultOpacityInc;
let random = false;
let drawingColor = defaultDrawingColor;
let windowColor = defaultWindowColor;

function buildDrawingWindow (windowSize, numSquares) {
    const pastContainer = document.querySelector('.drawingWindow');

    if (pastContainer !== null) {pastContainer.remove()};
    
    if (numSquares > maxNumSquares || numSquares < 0) {numSquares = maxNumSquares};
    if (windowSize > maxWindowSize || windowSize < 0) {windowSize = maxWindowSize};
    let squareSize = windowSize/numSquares;

    let container = document.createElement('div');
    container.classList.add('drawingWindow');

    container.style.cssText=`
        background-color: white;
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
            squares[i][j] = container.appendChild(div);
            div = squares[i][j];
        
            div.style.cssText =`
                height: ${squareSize}px;
                width: ${squareSize}px;
                flex: 0 0 auto;
            `
            div.style.backgroundColor = windowColor;
        }
        
    }

    container = document.body.appendChild(container);
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
    if (e.type == 'mouseover' && e.buttons == 1) {
        let divColor = getColor();
        let newOpacity = getOpacity(div.style.opacity);
        div.style.opacity = newOpacity;
        div.style.backgroundColor = divColor;
    } else if (e.type == 'click') {
        let divColor = getColor();
        let newOpacity = getOpacity(div.style.opacity);
        div.style.opacity = newOpacity;
        div.style.backgroundColor = divColor;
    }
}

function changeNumSquares () {
    numSquares = prompt('How many squares ? (max:100)', '16')
    buildDrawingWindow(windowSize, numSquares);
}

function changeWindowSize () {
    drawingWindowSize = prompt('How many pixels ? (max:960px)', '960')
    buildDrawingWindow(windowSize, numSquares);
}

function changeWindowColor () {
    let newColor = prompt('Enter new color (must be valid css color, default is '+defaultWindowColor+')', defaultWindowColor);
    if (!CSS.supports('color', newColor)) {newColor = defaultWindowColor};
    windowColor = newColor;
    buildDrawingWindow(windowSize, numSquares);
    colorButton.innerText = `Change color: ${newColor}`;
    return newColor;
}

function changeRandom (button) {
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

randomButton.addEventListener('click', function () {changeRandom(randomButton)});

// Sets up color button

const colorButton = document.querySelector('#color');

colorButton.addEventListener('click', function () {changeColor(colorButton)});

// Sets up color button

const opacityButton = document.querySelector('#opacity');

opacityButton.addEventListener('click', function () {changeOpacity(opacityButton)});

