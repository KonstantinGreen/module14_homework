/*
Задание 4.
Напишите код приложения, интерфейс которого представляет собой 2 input и кнопку submit. В input можно ввести любое число. При клике на кнопку происходит следующее:
Если оба числа не попадают в диапазон от 100 до 300 или введено не число — выводить ниже текст «одно из чисел вне диапазона от 100 до 300»;
Если числа попадают в диапазон от 100 до 300 — сделать запрос c помощью fetch по URL https://picsum.photos/200/300, где первое число — ширина картинки, второе — высота.
Пример: если пользователь ввёл 150 и 200, то запрос будет вида https://picsum.photos/150/200.
После получения данных вывести ниже картинку на экран.
Подсказка: получение данных из input.
const value = document.querySelector('input').value;*/

const numForm = document.forms["form"];
const alert = document.querySelector(".alert");
const imageDiv = document.querySelector("#image");

console.log(imageDiv);

const numFormHandler = (event) => {
    event.preventDefault();
    const inputValueWidth = event.target["width"].value;
    const inputValueHeight = event.target["height"].value;
    imageDiv.innerHTML = "";
    alert.classList.add("isHidden");

    if (
        inputValueWidth >= 100 &&
        inputValueWidth <= 300 &&
        inputValueHeight >= 100 &&
        inputValueHeight <= 300
    ) {
        fetch(`https://picsum.photos/${inputValueWidth}/${inputValueHeight}`)
            .then((response) => {
                console.log(response);
                if (response.status == 200) {
                    imageDiv.innerHTML = `<img src="${response.url}" alt="server error" class="img-fluid mt-2 rounded-circle"></img>`;
                    console.log(imageDiv);
                    imageDiv.classList.remove("isHidden");
                }
            })
            .catch((error) => console.log("error: ", error));
    } else {
        alert.classList.remove("isHidden");
    }
};

numForm.addEventListener("submit", numFormHandler);