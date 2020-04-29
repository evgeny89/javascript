'use strict';

// слушатель нажатия клавиш навигации, меняет положение активного блока
document.addEventListener('keydown', function (event) {

    switch (event.code) {
        case 'Numpad8':
        case 'ArrowUp':
            newGame.lastTouchY = '-1';
            break;
        case 'Numpad2':
        case 'ArrowDown':
            newGame.lastTouchY = '1';
            break;
        case 'Numpad6':
        case 'ArrowRight':
            newGame.lastTouchX = '1';
            break;
        case 'Numpad4':
        case 'ArrowLeft':
            newGame.lastTouchX = '-1';
            break;
    }
}, false);

// touch управление
let startX = 0,
    startY = 0,
    endX = 0,
    endY = 0;
const touchArea = document.getElementById("squared-area");

touchArea.addEventListener("touchstart", function (e) {
    startX = Math.round(e.changedTouches[0].clientX);
    startY = Math.round(e.changedTouches[0].clientY);
});

touchArea.addEventListener("touchend", function (e) {
    endX = Math.round(e.changedTouches[0].clientX);
    endY = Math.round(e.changedTouches[0].clientY);

    if (Math.abs(endX - startX) > Math.abs(endY - startY)) {
        if (startX > endX) {
            newGame.lastTouchX = '-1';
        } else {
            newGame.lastTouchX = '1';
        }
    }

    if (Math.abs(endX - startX) < Math.abs(endY - startY)) {
        if (startY > endY) {
            newGame.lastTouchY = '-1';
        } else {
            newGame.lastTouchY = '1';
        }
    }
});
