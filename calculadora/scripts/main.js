const max_digits_integer = 10;
const max_digits_decimal = 5;

let integer_previous = 0;
let integer_current = 0;
let decimal_previous = 0.0;
let decimal_current = 0.0;

let digits_integer = 0;
let digits_decimal = 0; 

let operator = '';
let action = 0; 
/*
    0: Writing FIRST NUMBER
    1: Writing SECOND (AND NEXT) NUMBER
*/

let dot = 0;
/*
    0: Just INTEGER
    1: Just DECIMAL
*/

let sign = 1;
/*
    1: Positive
    -1: Negative
*/

function setScreen(pNumber) {
    let oScreen = document.querySelector('.screen');
    let nContent = new Number(pNumber);
    oScreen.innerHTML = `<input id = "txtScreen" class = "txtScreen" type = "text" placeholder = ${nContent.toString()} readonly = "true">`;
}

function onNumber(pDigit) {
    if (dot == 0) {
        if (digits_integer < max_digits_integer) {
            integer_current = integer_current * 10 + pDigit * sign;
            digits_integer++;
        }
    } else {
        if (digits_decimal < max_digits_decimal) {
            decimal_current = decimal_current + pDigit * sign / Math.pow(10,digits_decimal + 1);
            digits_decimal++;
        }
    }
    setScreen(integer_current + decimal_current);
};

function onOperator(pOperator) {
    if (action == 0) {
        integer_previous = integer_current;
        decimal_previous = decimal_current;
        integer_current = 0;
        decimal_current = 0.0;
        digits_integer = 0;
        digits_decimal = 0;
        action = 1;         
        dot = 0;
        sign = 1;
    } 
    else 
        ComputeResult();

    operator = pOperator;
};

function onAction(pAction) {
    switch (pAction) {
        case 'C': 
            integer_previous = 0;
            integer_current = 0;
            decimal_previous = 0.0;
            decimal_current = 0.0;
            
            digits_integer = 0;
            digits_decimal = 0; 
            
            operator = '';
            action = 0; 
            dot = 0;
            sign = 1;

            setScreen(0);

            break;
        case 'CE':
            integer_current = 0;
            decimal_current = 0.0;
            
            digits_integer = 0;
            digits_decimal = 0; 
            
            operator = '';
            dot = 0;
            sign = 1;
            
            setScreen(0);

            break;
        case '=':
            if (action == 1) 
                ComputeResult();
            break;
    };
};

function onDot() {
    if (dot == 1) 
        dot = 0;
    else 
        dot = 1;
};

function onSign() {
    sign = sign * -1;
    integer_current = integer_current * -1;
    decimal_current = decimal_current * -1;
    setScreen(integer_current + decimal_current);
}

function ComputeResult() {
    let nResult = 0;

    switch (operator) {
        case '+':
            nResult = integer_previous + decimal_previous + (integer_current + decimal_current) * sign;
            break;
        case '-':
            nResult = integer_previous + decimal_previous - (integer_current + decimal_current) * sign;
            break;
        case '*':
            nResult = Math.round((integer_previous + decimal_previous) * ((integer_current + decimal_current) * sign),max_digits_decimal);
            break;
        case '/':
            if (integer_current + decimal_current != 0)
                nResult = Math.round((integer_previous + decimal_previous) / ((integer_current + decimal_current) * sign),max_digits_decimal);
            else
                nResult = 0;
            break;
    };

    integer_previous = Math.trunc(nResult);
    decimal_previous = nResult - integer_previous;
    integer_current = 0;
    decimal_current = 0.0;
    action = 1;
    dot = 0;
    sign = 1;
    operator = '';

    setScreen(nResult);
};

function main() {
    //Setting invocation of operators
    document.getElementById('btnAdd').addEventListener('click', () => {onOperator('+');});
    document.getElementById('btnSubtract').addEventListener('click', () => {onOperator('-');});
    document.getElementById('btnMultiply').addEventListener('click', () => {onOperator('*');});
    document.getElementById('btnDivide').addEventListener('click', () => {onOperator('/');});

    //Setting invocation of numbers
    document.getElementById('btn00').addEventListener('click', () => {onNumber(0);});
    document.getElementById('btn01').addEventListener('click', () => {onNumber(1);});
    document.getElementById('btn02').addEventListener('click', () => {onNumber(2);});
    document.getElementById('btn03').addEventListener('click', () => {onNumber(3);});
    document.getElementById('btn04').addEventListener('click', () => {onNumber(4);});
    document.getElementById('btn05').addEventListener('click', () => {onNumber(5);});
    document.getElementById('btn06').addEventListener('click', () => {onNumber(6);});
    document.getElementById('btn07').addEventListener('click', () => {onNumber(7);});
    document.getElementById('btn08').addEventListener('click', () => {onNumber(8);});
    document.getElementById('btn09').addEventListener('click', () => {onNumber(9);});

    //Setting invocation of dot
    document.getElementById('btnDot').addEventListener('click', () => {onDot();});

    //Setting invocation of sign
    document.getElementById('btnSign').addEventListener('click', () => {onSign();});

    //Setting invocation of actions
    document.getElementById('btnC').addEventListener('click', () => {onAction('C');});
    document.getElementById('btnCE').addEventListener('click', () => {onAction('CE');});
    document.getElementById('btnIqual').addEventListener('click', () => {onAction('=');});
};

main();