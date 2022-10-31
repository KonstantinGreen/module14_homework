/*Задание 3.
Напишите код приложения, интерфейс которого представляет собой input и кнопку. В input можно ввести любое число. При клике на кнопку происходит следующее:
Если число не попадает в диапазон от 1 до 10 — выводить ниже текст «число вне диапазона от 1 до 10».
Если число попадает в диапазон от 1 до 10 — сделать запрос c помощью XHR по URL https://picsum.photos/v2/list?limit=10, где get-параметр limit — это введённое число.
Пример: если пользователь ввёл 5, то запрос будет вида https://picsum.photos/v2/list?limit=5.
После получения данных вывести ниже картинки на экран.
Подсказка: получение данных из input.
const value = document.querySelector('input').value;*/

const numForm = document.forms["form"];
const alert = document.querySelector(".alert");
const imageDiv = document.querySelector("#imageDiv");
console.log(imageDiv);

const numFormHandler = (event) => {
    event.preventDefault();
    const inputValue = event.target["inputNum"].value;
    alert.classList.add("isHidden");
    imageDiv.innerHTML = "";
    if (inputValue > 0 && inputValue <= 10) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            imageDiv.classList.remove("isHidden");
            if (xhr.status == 200 && xhr.readyState == 4) {
                const result = JSON.parse(xhr.response);
                imageDiv.innerHTML = "";
                result.map((entry) => {
                    imageDiv.innerHTML += `<img src="${entry.download_url}" alt="server error" class="form__img"></img>`;
                    imageDiv.innerHTML += `<h4 class="form__title">${entry.author} </h4>`;
                });
            }
        };
        xhr.onerror = () => {
            console.log("Request error: ", xhr.status);
        };
        xhr.open(
            "GET",
            `https://picsum.photos/v2/list?limit=${inputValue}`,
            true
        );
        xhr.send();
    } else {
        alert.classList.remove("isHidden");
    }
};

numForm.addEventListener("submit", numFormHandler);