let drawerSize = 16;
let drawerSizePx = 960;
let squareSizePx = drawerSizePx/drawerSize;

let container = document.createElement('div');
container = document.body.appendChild(container);

let squares = new Array(drawerSize);

container.style.cssText=`
    background-color: white;
    height: ${drawerSizePx}px;width: ${drawerSizePx}px;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    display: flex;
    flex-wrap: wrap;
`
for (let i = 0; i<drawerSize; i++) {
    squares[i] = new Array(drawerSize);
    for (let j = 0; j<drawerSize; j++) {
        let div = squares[i][j];
        
        div = document.createElement('div');
        div.addEventListener('mouseover', function () {mouseOver(div)});
        squares[i][j] = container.appendChild(div);
        div = squares[i][j];
    
        div.style.cssText =`
            height: ${squareSizePx}px;
            width: ${squareSizePx}px;
            flex: 0 0 auto;
        `
    }
}

function mouseOver (div) {
    div.style.backgroundColor = 'black';
}

