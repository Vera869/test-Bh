Дано:
const arr = [10, 12, 15, 21];

for(var i = 0; i < arr.length; i++) {
  setTimeout(function(){
    console.log(arr[i] > 13 ? `Good: ${arr[i]}` : `Bad: ${arr[i]}`);
  }, 3000)
}

Ответ:
Данный скрипт выводит Bad: undefined 4 раза 

Решение:

Вариант 1
  Нужно изменить область видимости i (заменить var на let) и сделать интервал итерабельным, чтобы console.log не вызывались одновременно.

const Interval = 3000;

for(let i = 0; i < arr.length; i++) {
  setTimeout(function(){
    console.log(arr[i] > 13 ? `Good: ${arr[i]}` : `Bad: ${arr[i]}`);
  }, Interval*i)
}

Вариант 2
  Можно заменить setTimeout() на setInterval().
const Interval = 3000;
let i = 0;

setInterval(function() {
   console.log(arr[i] > 13 ? `Good: ${arr[i]}` : `Bad: ${arr[i]}`);
    if(++i>=arr.length) {
        clearInterval(this);
    }
}, Interval);

Вариант 3
 Использовать метод forEach() вместо for()

 arr.forEach((el, i) => {
      setTimeout(() => {
        console.log(el > 13 ? `Good: ${el}` : `Bad: ${el}`);
      }, 3000* i)
    })