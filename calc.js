let a = '';
let b = '';
let sign = '';
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const action = ['-', '+', 'X', '/'];
const dot = '.';
const plusMinus = '+/-';
const percent = '%';

const out = document.querySelector('.calc-screen p');

// Constants for button classes
const CLASS_AC = 'ac';
const CLASS_PLUS_MINUS = 'plus-minus';
const CLASS_PERCENT = 'percent';
const CLASS_DIVISION = 'division';
const CLASS_MULTIPLY = 'multiply';
const CLASS_MINUS = 'minus';
const CLASS_PLUS = 'plus';
const CLASS_EQUAL = 'equal';
const CLASS_ZERO = 'zero';
const CLASS_ONE = 'one';
const CLASS_TWO = 'two';
const CLASS_THREE = 'three';
const CLASS_FOUR = 'four';
const CLASS_FIVE = 'five';
const CLASS_SIX = 'six';
const CLASS_SEVEN = 'seven';
const CLASS_EIGHT = 'eight';
const CLASS_NINE = 'nine';
const CLASS_DOT = 'dot';

// Function to clear all calculator data
function clearAll() {
    a = '';
    b = '';
    sign = '';
    finish = false;
    out.textContent = '0';
    out.style.fontSize = '4rem'; // Reset font size
}

// Function to handle pressing digit buttons
function digitPress(key) {
    if (finish) {
        a = key;
        finish = false;
    } else {
        a = a === '0' ? key : a + key;
    }
    updateDisplay();
}

// Function to handle pressing action buttons
function actionPress(key) {
    if (a && b && sign) {
        calculate();
    }
    sign = key;
    finish = false;
    b = a;
    a = '';
    updateDisplay();
}

// Function to handle pressing dot button
function dotPress() {
    if (!a.includes(dot)) {
        a = a ? a + dot : '0' + dot;
    }
    updateDisplay();
}

// Function to handle pressing plus/minus button
function plusMinusPress() {
    a = a.startsWith('-') ? a.substring(1) : '-' + a;
    updateDisplay();
}

// Function to handle pressing percent button
function percentPress() {
    a = (parseFloat(a) / 100).toString();
    updateDisplay();
}

// Function to handle pressing equal button
function equalPress() {
    if (!a || !b || !sign) return;
    calculate();
    sign = '';
    finish = true;
    updateDisplay();
}

// Function to perform addition
function add(num1, num2) {
    return num1 + num2;
}

// Function to perform subtraction
function subtract(num1, num2) {
    return num1 - num2;
}

// Function to perform multiplication
function multiply(num1, num2) {
    return num1 * num2;
}

// Function to perform division
function divide(num1, num2) {
    if (num2 === 0) {
        out.textContent = 'Error';
        out.style.fontSize = '3rem'; // Adjust for "Error"
        return;
    }
    return num1 / num2;
}

// Function to perform calculation based on the selected operation
function calculate() {
    const num1 = parseFloat(b);
    const num2 = parseFloat(a);
    let result;
    switch (sign) {
        case '+':
            result = add(num1, num2);
            break;
        case '-':
            result = subtract(num1, num2);
            break;
        case 'X':
            result = multiply(num1, num2);
            break;
        case '/':
            result = divide(num1, num2);
            break;
    }
    a = formatNumber(result.toString());
    b = '';
}

// Function to update the calculator display
function updateDisplay() {
    out.textContent = a || b || '0';
    adjustFontSize();
}

// Function to adjust font size based on the displayed number's length
function adjustFontSize() {
    const maxFontSize = 4; // in rem
    const minFontSize = 1.5; // in rem
    const maxLength = 10;
    let fontSize = maxFontSize;

    if (out.textContent.length > maxLength) {
        fontSize = maxFontSize - (out.textContent.length - maxLength) * 0.3;
        if (fontSize < minFontSize) fontSize = minFontSize;
    }

    out.style.fontSize = `${fontSize}rem`;
}

// Function to format a number with maximum digits and decimal places
function formatNumber(num) {
    const maxDigits = 15;
    const maxDecimalDigits = 8;

    if (num.includes('e')) {
        return parseFloat(num).toPrecision(maxDigits).toString();
    }

    const [integerPart, decimalPart] = num.split('.');
    if (integerPart.length > maxDigits) {
        return parseFloat(num).toPrecision(maxDigits).toString();
    }

    if (decimalPart && decimalPart.length > maxDecimalDigits) {
        return `${integerPart}.${decimalPart.slice(0, maxDecimalDigits)}`;
    }

    return num;
}

// Function to handle mouse click on calculator buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', (event) => {
        const key = event.target.textContent;

        if (event.target.classList.contains(CLASS_AC)) {
            clearAll();
            return;
        }

        if (digit.includes(key)) {
            digitPress(key);
        } else if (action.includes(key)) {
            actionPress(key);
        } else if (key === dot) {
            dotPress();
        } else if (key === plusMinus) {
            plusMinusPress();
        } else if (key === percent) {
            percentPress();
        } else if (key === '=') {
            equalPress();
        }
    });
});

// Function to handle keyboard key press
document.addEventListener('keydown', (event) => {
    const key = event.key;

    switch (key) {
        case 'Escape':
            clearAll();
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            actionPress(key);
            break;
        case 'Enter':
            equalPress();
            break;
        case '.':
            onDotPress();
            break;
        default:
            if (digit.includes(key)) {
                digitPress(key);
            }
            break;
    }
});
