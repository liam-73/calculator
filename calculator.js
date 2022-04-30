let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if(isNaN(value)) {
        handleSymbol(value);
    }
    else {
        handleNumber(value);
    }
    screen.innerText = buffer;
};

function handleSymbol(symbol) {
    switch(symbol){
        case 'C':
            buffer = '0';
            runningTotal = 0;
            break;

        case '=':
            if(previousOperator === null ) return;
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;

        case '←':
        case '÷':
        case '×':
        case '-':
        case '+':
            handleMath(symbol);
            break;

    };
};

function handleMath(symbol) {
    if(buffer === '0') return;

    const intBuffer = +buffer;

    if( runningTotal === 0 ) {
        runningTotal += intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
};

function flushOperation(intBuffer) {
    if( previousOperator === '+') runningTotal += intBuffer;
    else if( previousOperator === '-') runningTotal -= intBuffer;
    else if( previousOperator === '×') runningTotal *= intBuffer;
    else if( previousOperator === '÷') runningTotal /= intBuffer;
    // else 

};

function handleNumber(numberStr) {
    if(buffer === '0'){
        buffer = numberStr;
    }
    else {
        buffer += numberStr;
    }
};

function init() {
    document.querySelector('.calc-buttons').addEventListener('click', function(event) {
        buttonClick(event.target.innerHTML)
    })
};

init();