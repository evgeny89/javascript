'use strict';

/*
* список дата атрибутов:
* data-width: задает шиину range в px
* data-type: тип: double - двойной, single - одинарный
* data-units: отображение единиц измерения
* data-value: применяется к max и к min,
* задает максимаьное и минимальное значение диапазона соотетственно
*/

// класс элементов
class Elements {
    constructor() {
        // получаем элементы min, max
        this.min = document.querySelector('.min-range-item');
        this.max = document.querySelector('.max-range-item');

        // сам блок ползунка
        this.rangeBlock = document.querySelector('.range');

        // зарисовка между ползунками
        this.fill = document.querySelector('.range-fill');

        // для вывода информации
        this.infoBox = document.querySelector('.info');

        // блоки для вывода текущих параметров сортировки по цене (min - max)
        this.minInfo = document.querySelector('.min-price');
        this.maxInfo = document.querySelector('.max-price');

        // если 2 ползука берём их ширину для расчетов, чтоб не наезжали друг на друга
        this.shiftMax = this.max.clientWidth;
        this.shiftMin = this.min.clientWidth;
    }
}

// получаем настройки из дата атрибутов подгатавливаем range элемент
class Data {
    constructor(obj) {
        this.width = +obj.rangeBlock.dataset.width;
        this.type = obj.rangeBlock.dataset.type;
        this.units = obj.rangeBlock.dataset.units;
        this.minVal = +obj.min.dataset.value;
        this.maxVal = +obj.max.dataset.value;
        this.setStyleRange();
    }

    /**
     * в зависимости от this.type определяем отображение (1 или 2 ползунка)
     */
    setStyleRange() {
        if (this.type === 'single') {
            elem.min.style.display = 'none';
            document.querySelector('.min-box').style.display = 'none';
            elem.shiftMin = 0;
        }
        if (this.type === 'double') {
            elem.min.style.display = 'block';
            document.querySelector('.min-box').style.display = 'block';
            elem.shiftMin = elem.min.clientWidth;
        }
    }
}

// параметры и настройки стилей
class StyleSet {
    constructor() {
        this.startX = elem.rangeBlock.getBoundingClientRect().x;
        this.minValue = this.startX;
        this.maxValue = this.startX + data.width - elem.shiftMax;
        this.setStyleWidth(data.width, elem.rangeBlock);
        this.setStyleWidth(data.width, elem.infoBox);
        this.addTextBeforeBegin(elem.minInfo, data.units);
        this.addTextBeforeBegin(elem.maxInfo, data.units);
        this.addTextAfterBegin(elem.minInfo, data.minVal);
        this.addTextAfterBegin(elem.maxInfo, data.maxVal);
    }

    /**
     * задаем ширину {val} в пикселях {elem} элементу
     * @param val {Number}
     * @param elem {Element}
     */
    setStyleWidth(val, elem) {
        elem.style.width = val + 'px';
    }

    /**
     * добавляем текст перед элементом
     * @param elem {Element}
     * @param text {String, Number}
     */
    addTextBeforeBegin(elem, text) {
        elem.insertAdjacentHTML('beforebegin', text);
    }

    /**
     * добавляем текст в начало элемента
     * @param elem {Element}
     * @param text {String, Number}
     */
    addTextAfterBegin(elem, text) {
        elem.insertAdjacentHTML('afterbegin', text);
    }
}

/**
 * запускаем функцию при нажатии кнопки мыши
 * @param event {Event} событие
 */
const check = (event) => {

    // чтобы не терять таргет - отслеживаем тот ползунок, на котором было событие mousedown
    let targetMain = event.target;

    // корректные значения допустимые для перемещения ползунка, используются дальше
    let currentMaxValue, currentMinValue;

    /**
     * отслеживаем перемещение мыши и вычисляем координаты ползунка)
     * @param event {Event} событие
     */
    const move = (event) => {

        // у touch события массив эвентов, сводим к одной переменой этим условием
        let e;
        (event.type === 'touchmove') ? e = event.touches[0] : e = event;

        // если таргет максимальное значение
        if (targetMain === elem.max) {
            currentMaxValue = set.maxValue;
            currentMinValue = parseInt(elem.min.style.left) + elem.shiftMin + set.startX;
        }

        // если таргет минимальное значение
        if (targetMain === elem.min) {
            currentMinValue = set.minValue;
            currentMaxValue = parseInt(elem.max.style.left) - elem.shiftMax + set.startX;
        }

        // меняем положение активного ползунка от края и до другого ползунка
        if (e.clientX - (elem.shiftMin / 2) > currentMinValue && e.clientX - (elem.shiftMax / 2) < currentMaxValue) {
            targetMain.style.left = e.clientX - set.startX - (elem.shiftMax / 2) + 'px';
        } else if (e.clientX < currentMinValue && targetMain === elem.min) {
            targetMain.style.left = 0 + 'px';
        } else if (e.clientX > currentMaxValue && targetMain === elem.max) {
            targetMain.style.left = data.width - elem.shiftMax + 'px';
        } else if (e.clientX < currentMinValue && targetMain === elem.max && elem.shiftMin === 0) {
            targetMain.style.left = 0 + 'px';
        }

        // изменяем зарисовку между ползунками
        elem.fill.style.left = elem.min.style.left;
        elem.fill.style.width = parseInt(elem.max.style.left) - parseInt(elem.min.style.left) + elem.shiftMax + 'px';

        // выводим информацию о выбранном диапазоне цен
        let targetPrice;
        (targetMain === elem.max) ? targetPrice = elem.maxInfo : targetPrice = elem.minInfo;
        targetPrice.textContent = parseInt(targetMain.style.left) * (data.maxVal - data.minVal) / (data.width - elem.shiftMax) + data.minVal + '';
    }

    /**
     * если отпустили кнопку - удаляем слушатели на перемещение мыши
     */
    let mouseUpFn = () => {
        document.removeEventListener('mousemove', move);
        document.removeEventListener('touchmove', move);
    }

    // вешаем слушатель на движение мыши по всему документу
    document.addEventListener('mousemove', move);
    document.addEventListener('touchmove', move);

    // ждем отпускания лкм чтобы убить слушатель движения мыши
    document.addEventListener('mouseup', mouseUpFn);
    document.addEventListener('touchend', mouseUpFn);
}


// работа элемента
const elem = new Elements;
const data = new Data(elem);
const set = new StyleSet;

// задаем инлайново стили, чтобы потом были данные
elem.min.style.left = 0 + 'px';
elem.max.style.left = data.width - elem.shiftMax + 'px';

// вешаем слушатели событий
elem.rangeBlock.addEventListener('mousedown', check);
elem.rangeBlock.addEventListener('touchstart', check);