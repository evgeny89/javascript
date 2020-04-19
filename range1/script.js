'use strict';

const rangeBlock = document.querySelector('.range');
const minItem = document.querySelector('.min-range-item');
const maxItem = document.querySelector('.max-range-item');
const rangeSize = rangeBlock.getBoundingClientRect().width;
const startX = rangeBlock.getBoundingClientRect().x;
let mouseDown = false;
let minPosition = 0;
let maxPosition = rangeSize;


function check(e) {
    if (e.target.className === 'min-range-item') {
        minPosition = e.clientX - minItem.offsetWidth / 2 - startX;
        if (minPosition < 0) minPosition = 0;
        if (minPosition > maxPosition) minPosition = maxPosition - 18;
        e.target.style.left = minPosition + 'px';
    }
    if (e.target.className === 'max-range-item') {
        maxPosition = e.clientX - maxItem.offsetWidth / 2 - startX;
        if (maxPosition < minPosition) maxPosition = minPosition + 18;
        if (maxPosition > rangeSize - 18) maxPosition = rangeSize - 18;
        e.target.style.left = maxPosition + 'px';
    }
}

minItem.addEventListener('touchmove', function (e) {
    check(e.touches[0]);
});

maxItem.addEventListener('touchmove', function (e) {
    check(e.touches[0]);
});

rangeBlock.addEventListener('mousedown', function () {
    mouseDown = true;
});

rangeBlock.addEventListener('mousemove', function (e) {
    e.stopPropagation();
    if (mouseDown) {
        check(e);
    }
});

rangeBlock.addEventListener('mouseup', function (e) {
    e.stopPropagation();
    mouseDown = false;
});

rangeBlock.addEventListener('mouseout', function (e) {
    e.stopPropagation();
    mouseDown = false;
});