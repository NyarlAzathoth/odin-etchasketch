let numSquares = 16;
let drawingWindowSize = 960;

function buildDrawingWindow (drawingWindowSize, numSquares) {
    const pastContainer = document.querySelector('.drawingWindow');

    if (pastContainer !== null) {pastContainer.remove()};
    
    if (numSquares > 100) {numSquares = 100};
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
                height: ${squareSize}px;
                width: ${squareSize}px;
                flex: 0 0 auto;
            `
        }
        
    }

    container = document.body.appendChild(container);
}

function mouseOver (div) {
    div.style.backgroundColor = 'black';
}

function changeNumSquares () {
    numSquares = prompt('How many squares ? (max:100)', '16')
    buildDrawingWindow(drawingWindowSize, numSquares);
}

buildDrawingWindow(drawingWindowSize, numSquares);

const sizeButton = document.querySelector('#size');

sizeButton.addEventListener('click', function () {changeNumSquares()});


