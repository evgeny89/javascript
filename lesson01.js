"use strict";
// задание №1
let tempC = +prompt("Введите температуру:");
if (isNaN(tempC)) tempC = 0;
let tempF = (9 / 5) * tempC + 32;
alert(tempF);

// задание №2
let name = "Василий";
let admin = name;
console.log(admin);

// задание №3
console.log(10 + 10 + "10");
/* приоритетов нет, двигаемся по порядку слева направо
* 10 + 10 = 20 //получаем сумму первых двух операндов
* 20 + "10" = "2010" //во второй операции учавствует строка, получаем приведение типов (число приводится к строке) и конкатенацию.
* выводим в консоль результат операции */

console.log(10 + "10" + 10);
/* приоритетов нет, двигаемся по порядку слева направо
* 10 + "10" = "1010" //в операции учавствует строка, значит получаем приведение типов (число приводится к строке) и конкатенацию.
* "1010" + 10 = "101010" //в операции учавствует строка, значит получаем приведение типов (число приводится к строке) и конкатенацию.
* выводим в консоль результат операции */

console.log(10 + 10 + +"10");
/* приоритет у унарного плюса
*  +"10" = 10 //приводим строку к числу
* 10 + 10 = 20 //получаем сумму первых двух операндов
* 20 + 10 = 30 //получаем результат операции
* выводим в консоль результат операции */

console.log(10 / -"");
/* приоритет унарного минуса
* -"" = -0 //приводим пустую строку к числу с отрицательным знаком, получаем минус 0
* 10 / -0 = -infinity // 10 делим на 0 со знаком минус, получаем отрицательную бесконечность
* выводим в консоль результат операции */

console.log(10 / +"2,5");
/* приоритет у унарного плюса
* +"2,5" = NaN // при попытке приведения к числу мы получаем NaN (not a number), т.к. в строке присутствует запятая, которая не может присутсвтовать в числах
* 10 / NaN = NaN // любые действия с NaN вернут результат NaN
* выводим в консоль результат операции */

// задание №4
//let mode = "normal"; - корректно (допускаются имена из латинских букв)
//let my_valu3 = 102; - корректно (допускается в имени переменной знак нижнего подчеркивания и цифры, но не в начале строки)
//let 3my_value3 = "102"; - не корректно (запрещены имена переменных, начинающихся с числа)
//let __hello__ = "world"; - корректно (знак нижнего подчеткивания разрешен в именах перепменных)
//let $$$ = "money"; - корректно (знак доллара является допустимым в именах переменных)
//let !0_world = true; - не корректно (восклицательный знак является спец символом, его применение недопустимо)