/*Задание 1.

Вам дана заготовка и результат, который вы должны получить. Ваша задача — написать код, который будет преобразовывать XML в JS-объект и выводить его в консоль.*/

const parser = new DOMParser();

const xmlString = `
        <list>
        <student>
            <name lang="en">
            <first>Ivan</first>
            <second>Ivanov</second>
            </name>
            <age>35</age>
            <prof>teacher</prof>
        </student>
        <student>
            <name lang="ru">
            <first>Петр</first>
            <second>Петров</second>
            </name>
            <age>58</age>
            <prof>driver</prof>
        </student>
        </list>
    `;

const xmlDOM = parser.parseFromString(xmlString, "text/xml");

const studentNode = xmlDOM.querySelectorAll("student");

let nameNode = '';
let firstNode = '';
let secondNode = '';
let ageNode = '';
let profNode = '';
let langAttr = '';

const list = [];

studentNode.forEach(student => {
  nameNode = student.querySelector("name");
  firstNode = nameNode.querySelector("first");
  secondNode = nameNode.querySelector("second");
  ageNode = student.querySelector("age");
  profNode = student.querySelector("prof");
  langAttr = nameNode.getAttribute('lang');
  list.push({
    name: firstNode.textContent + " " + secondNode.textContent,
    age: Number(ageNode.textContent),
    prof: profNode.textContent,
    lang: langAttr
  })
});

console.log('студенты', list);