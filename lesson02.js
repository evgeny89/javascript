"use strict";
// задание №1
//пример 1
let a = 1, b = 1, c, d; // инициализируем переменные a и b присваиваем значения, c и d будут неопределены (undefined)
c = ++a; // префиксный инкремент переменной a (сначала увеличиваем, потом присваиваем), (c=2 a=2)
alert(c); // ответ: 2

//пример 2
d = b++; // постсуфиксный инкремент (сначала присваиваем, потом инкрементируем переменную), (d=1 b=2)
alert(d); //ответ: 1

//пример 3
c = 2 + ++a; // префиксный инкремент, (c=5 a=3)
alert(c); //ответ: 5

//пример 4
d = 2 + b++; //постсуфиксный инкремент, (d=4 b=3)
alert(d); //ответ: 4
alert(a); //3
alert(b); //3

// задание №2
let g = 2; // присваиваем переменной g значение 2 (заменил имя переменной, чтобы не было конфликта с первым примером)
let x = 1 + (g *= 2); // сначала выполнится код в скобках, т.е. присвоим переменной g значение g*2, потом к результату прибавим 1 и присвоим переменной x
// g=4 x=5

// задание №3
let num1 = -800;
let num2 = -400;
if (num1 >= 0 && num2 >= 0) {
    console.log(num1 - num2);
} else if (num1 < 0 && num2 < 0) {
    console.log(num1 * num2);
} else {
    console.log(num1 + num2);
} // есть условие когда оба положительные, есть условие когда оба числа отрицательные, значит в else мы попадем когда у чисел разные знаки.

// задание №4
/**
 * функция возвращает сумму
 * @param a {number} слагаемое
 * @param b {number} слагаемое
 * @returns {number} сумма
 */
function getSum(a, b) {
    return a + b;
}

/**
 * функция возвращает разность
 * @param a {number} уменьшаемое
 * @param b {number} вычитаемое
 * @returns {number} разность
 */
function getSub(a, b) {
    return a - b;
}

/**
 * функция возвращает результат деления
 * @param a {number} делимое
 * @param b {number} делитель
 * @returns {number} результат
 */
function getDiv(a, b) {
    return a / b;
}

/**
 * функция возвращает произведение
 * @param a {number} множимое
 * @param b {number} множитель
 * @returns {number} произведение
 */
function getInc(a, b) {
    return a * b;
}

// задание №5
/**
 * функция принимает 2 числа и строку с типом операции
 * @param arg1 {number} первый аргумент
 * @param arg2 {number} второй аргумент
 * @param operation {string} производимое математическое действие
 * @returns {number} результат вычисления.
 */
function mathOperation(arg1, arg2, operation) {
    if (typeof arg1 !== "number" || typeof arg2 !== "number") throw new Error("Ошибка аргументов, необходимо передавать числа");
    switch (operation) {
        case "+":
            return getSum(arg1, arg2);
        case "-":
            return  getSub(arg1, arg2);
        case "*":
            return getInc(arg1, arg2);
        case "/":
            return getDiv(arg1, arg2);
        default:
            throw new Error("Неизвестный оператор");
    }
}

try {
    let mess = mathOperation(25, 10, "$");
    console.log(mess);
} catch (e) {
    console.log(e.message);
}

// задание №6
/**
 * функция получает от пользователя сумму и выводит уведомление
 * @returns {string} готова строка для показа уведомления пользователю
 */
function getMess() {
    let sum = prompt("Введите сумму:");
    let sumInt = +sum;

    if (sum == null) {
        alert("Вы нажали отмену.");
        return "Была нажата кнопка Отмена.";
    }
    if (isNaN(sumInt)) throw new Error("В сумме должны быть только числа");

    let rur = getEndString(sum);

    return `Ваша сумма в ${sumInt} ${rur} успешно зачислена.`;
}

/**
 * функция принимает сумму и генерирует окончание на основе последних символов
 * @param num {string} строка суммы введеной пользователем
 * @returns {string} возвтращает слово рубль в правильном падеже.
 */
function getEndString(num) {
    let index = num.length - 1;
    let lastSymbol = num[index];
    let rur = "рубл";

    if (index > 0 && num[index - 1] === "1") {
        rur += "ей";
        return rur;
    }

    switch (lastSymbol) {
        case "1":
            rur += "ь";
            break;
        case "2":
        case "3":
        case "4":
            rur += "я";
            break;
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":
            rur += "ей";
            break;
    }

    return rur;
}

try {
    console.log(getMess());
} catch (e) {
    alert(e.message);
}