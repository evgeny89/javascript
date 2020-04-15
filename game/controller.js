'use strict';

// слушатель нажатия клавиш навигации, меняет положение активного блока
document.addEventListener('keydown', function (event) {
    newGame.setDeactivate();

    switch (event.code) {
        case 'Numpad8':
        case 'ArrowUp':
            newGame.changeUserY += -1;
            break;
        case 'Numpad2':
        case 'ArrowDown':
            newGame.changeUserY += 1;
            break;
        case 'Numpad6':
        case 'ArrowRight':
            newGame.changeUserX += 1;
            break;
        case 'Numpad4':
        case 'ArrowLeft':
            newGame.changeUserX += -1;
            break;
    }

    newGame.setActive();
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

    console.log(endY);

    newGame.setDeactivate();

    if (Math.abs(endX - startX) > Math.abs(endY - startY)) {
        startX > endX ? (newGame.changeUserX += -1) : (newGame.changeUserX += 1);
    }

    if (Math.abs(endX - startX) < Math.abs(endY - startY)) {
        startY > endY ? (newGame.changeUserX += -1) : (newGame.changeUserX += 1);
    }

    newGame.setActive();
});
