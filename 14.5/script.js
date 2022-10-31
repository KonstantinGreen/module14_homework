/*
Задание 5.
Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.
Заголовок первого input — «номер страницы».
Заголовок второго input — «лимит».
Заголовок кнопки — «запрос».
При клике на кнопку происходит следующее:
Если число в первом input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Номер страницы вне диапазона от 1 до 10»;
Если число во втором input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Лимит вне диапазона от 1 до 10»;
Если и первый, и второй input не в диапазонах или не являются числами — выводить ниже текст «Номер страницы и лимит вне диапазона от 1 до 10»;
Если числа попадают в диапазон от 1 до 10 — сделать запрос по URL https://picsum.photos/v2/list?page=1&limit=10, где GET-параметр page — это число из первого input, а GET-параметр limit — это введённое число второго input.
Пример: если пользователь ввёл 5 и 7, то запрос будет вида https://picsum.photos/v2/list?page=5&limit=7.
После получения данных вывести список картинок на экран.
Если пользователь перезагрузил страницу, то ему должны показываться картинки из последнего успешно выполненного запроса (использовать localStorage). */


const numForm = document.forms["numForm"];
const alert = document.querySelector(".alert");
const imageWrapper = document.querySelector("#imageWrapper");

const rangeChecker = (numLow, numHigh, num) => {
    if (num.isNan) {
        return false;
    } else if (num <= numHigh && num >= numLow) {
        return true;
    } else {
        return false;
    }
};

const submitNumForm = (event) => {
    event.preventDefault();

    const pageNumber = event.target["page_number"];
    const limit = event.target["limit"];

    imageWrapper.innerHTML = "";
    alert.classList.add("isHidden");

    pageNumber.classList = "";
    limit.classList = "";

    if (
        !rangeChecker(1, 10, pageNumber.value) &&
        !rangeChecker(1, 10, limit.value)
    ) {
        alert.innerHTML =
            "Номер страницы и лимит вне диапазона от 1 до 10";
        alert.classList.remove("isHidden");
        pageNumber.classList = "invalid";
        limit.classList = "invalid";
    } else if (!rangeChecker(1, 10, pageNumber.value)) {
        alert.innerHTML =
            "Номер страницы вне диапазона от 1 до 10";
        alert.classList.remove("isHidden");
        pageNumber.classList = "invalid";
    } else if (!rangeChecker(1, 10, limit.value)) {
        alert.innerHTML = "Лимит вне диапазона от 1 до 10";
        alert.classList.remove("isHidden");
        limit.classList = "invalid";
    } else {
        pageNumber.classList = "valid";
        limit.classList = "valid";
        fetch(
            ` https://picsum.photos/v2/list?page=${pageNumber.value}&limit=${limit.value}`
        )
            .then((response) => response.json())
            .then((entries) => {
                entries.map((entry) => {
                    imageWrapper.innerHTML += `<div class="form__wrapper">
                    <div class="form__box">
                        <div class="form__images">
                            <img src="${entry.download_url}" alt="server error" class="form__image">
                            
                        </div>
                        <div class="form__image-title">
                            <span class="form__image-author">
                                ${entry.author}
                            </span>
                        </div>
                    </div>
                </div>`;
                });
                window.localStorage.setItem(
                    "SkillFactoryTest",
                    JSON.stringify(imageWrapper.innerHTML)
                );
            })
            .catch((error) => console.log("error: ", error));
    }
};

imageWrapper.innerHTML = JSON.parse(
    window.localStorage.getItem("SkillFactoryTest")
);

numForm.addEventListener("submit", submitNumForm);