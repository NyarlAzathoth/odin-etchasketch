let numSquares = 16;
let drawingWindowSize = 960;
let opacityInc = 0.1;
let random = false;
let defaultColor = 'black';
let color = defaultColor;

function buildDrawingWindow (drawingWindowSize, numSquares) {
    const pastContainer = document.querySelector('.drawingWindow');

    if (pastContainer !== null) {pastContainer.remove()};
    
    if (numSquares > 100) {numSquares = 100};
    if (drawingWindowSize > 960) {drawingWindowSize = 960};
    let squareSize = drawingWindowSize/numSquares;

    let container = document.createElement('div');
    container.classList.add('drawingWindow');

    container.style.cssText=`
        background-color: white;
        height: ${drawingWindowSize}px;width: ${drawingWindowSize}px;
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
            div.addEventListener('mouseover', function () {mouseOver(div)});
            squares[i][j] = container.appendChild(div);
            div = squares[i][j];
        
            div.style.cssText =`
                color = white;
                height: ${squareSize}px;
                width: ${squareSize}px;
                flex: 0 0 auto;
            `
        }
        
    }

    container = document.body.appendChild(container);
}

function getColor () {
    if (random === true) {
        let randomColor = `hsl(${Math.round(Math.random()*360)}deg 50% 50%)`;
        return randomColor;
    } else {
        return color;
    }
}

function getOpacity (div) {
    opacity = div.style.opacity;
    if (opacity == '') {opacity = '0'};
    return (Number(opacity)+opacityInc).toString();
}

function mouseOver (div) {
    let divColor = getColor();
    let newOpacity = getOpacity(div);
    div.style.opacity = newOpacity;
    div.style.backgroundColor = divColor;
}

function changeNumSquares () {
    numSquares = prompt('How many squares ? (max:100)', '16')
    buildDrawingWindow(drawingWindowSize, numSquares);
}

function changeWindowSize () {
    drawingWindowSize = prompt('How many pixels ? (max:960px)', '960')
    buildDrawingWindow(drawingWindowSize, numSquares);
}

function changeRandom (randomButton) {
    random = !random;
    randomButton.innerText = `Random: ${random}`;
    return random;
}

function changeColor () {
    let newColor = prompt('Enter new color (must be valid css color, default is black)', 'black');
    if (!CSS.supports('color', newColor)) {newColor = defaultColor};
    color = newColor;
    colorButton.innerText = `Change color: ${color}`;
    return newColor;
}


// Building of the default drawing window

buildDrawingWindow(drawingWindowSize, numSquares);

// Sets up the button for changing number of squares

const numSquaresButton = document.querySelector('#numSquares');

numSquaresButton.addEventListener('click', function () {changeNumSquares()});

// Sets up button for changing size of drawing window

const windowSizeButton = document.querySelector('#windowSize');

windowSizeButton.addEventListener('click', function () {changeWindowSize()});

// Sets up random color button

const randomButton = document.querySelector('#random');

randomButton.addEventListener('click', function () {changeRandom(randomButton)});

// Sets up color button

const colorButton = document.querySelector('#color');

colorButton.addEventListener('click', function () {changeColor(colorButton)});

