 import formatCurrency from "../../scripts/utils/money.js";

console.log('test suite: formatCurrency');

// Basic test case

console.log('converts cents into dollars');

if (formatCurrency(2095) === '20.95') {
    console.log('passed');
    document.querySelector('.js-test-section')
        .innerHTML = '<p>1) Test passed.</p>';
}
else {
    console.log('failed');
    document.querySelector('.js-test-section')
        .innerHTML = '<p>1) Test failed.</p>';
}

// Edge cases

console.log('works with 0');

if (formatCurrency(0) === '0.00') {
    console.log('passed');
    document.querySelector('.js-test-section')
        .innerHTML += '<p>2) Test passed.</p>';
}
else {
    console.log('failed');
    document.querySelector('.js-test-section')
        .innerHTML += '<p>2) Test failed.</p>';
}

console.log('rounds up to nearest cent');

if (formatCurrency(2000.5) === '20.01') {
    console.log('passed');
    document.querySelector('.js-test-section')
        .innerHTML += '<p>3) Test passed.</p>';
}
else {
    console.log('failed');
    document.querySelector('.js-test-section')
        .innerHTML += '<p>3) Test failed.</p>';
}

console.log('rounds down to nearest cent');

if (formatCurrency(2000.4) === '20.00') {
    console.log('passed');
    document.querySelector('.js-test-section')
        .innerHTML += '<p>4) Test passed.</p>';
}
else {
    console.log('failed');
    document.querySelector('.js-test-section')
        .innerHTML += '<p>4) Test failed.</p>';
}

console.log('handles negative numbers');

if (formatCurrency(-1000) === '-10.00') {
    console.log('passed');
    document.querySelector('.js-test-section')
        .innerHTML += '<p>5) Test passed.</p>';
}
else {
    console.log('failed');
    document.querySelector('.js-test-section')
        .innerHTML += '<p>5) Test failed.</p>';
}