// const fileData = require('./dir/file1');
// require('./folder');
// //console.log(fileData);
//
// fileData.greeting('Vasya');
//
// console.log(__dirname);
// console.log(__filename);


// fs - бібліотека для роботи з файловою с-мою
const fs = require('fs');
const path = require('path');

const textPath = path.join(__dirname, 'dir', 'text.txt');
//const textPath2 = path.join(__dirname, 'dir', 'text2.txt');
const dirToReadPath = path.join(__dirname, 'dir');

// створює файл по вказаному path і записує в нього інфу data (кожен раз перезаписує повністю файл)
// fs.writeFile(textPath, 'hello 2222', err => {
//     console.log(err)
// });

//додає нову інфу в файл не стирає стару
// fs.appendFile(textPath, 'new hello \n', err => {
//     if (err) {
//         console.log(err);
//         return
//     }
//     console.log('DONE')
// })


// const mkdirPath = path.join(__dirname, 'dir','folder2', 'innerFolder', 'Hellxxx');
// //створення папок - mkdir, опція recursive: true - дозволяє починати створення папок з кінця path (htrehcbdyj)
// fs.mkdir(mkdirPath, {recursive: true}, err => {
//     console.log(err)
// })

//  зчитування даних з файлу, і потрібно використати toString()щоб  buffer (data) перетворити в читабельну стрічку
fs.readFile(textPath, (err, data) => {
    if(err) {
        console.log(err);
        return
    }

    // приклад як переписати інфу, якщо н-д фото чи відео потрібно зчитати і передати
    // fs.appendFile(textPath2, data, err1 => {
    // })

    console.log(data.toString());
});

fs.readdir(dirToReadPath, ((err, files) => {

}))

