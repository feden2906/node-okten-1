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
//
const util = require('util');

const textPath = path.join(__dirname, 'dir', 'text.txt');
const textPath2 = path.join(__dirname, 'dir', 'text2.txt');
const folderWithDeletedData = path.join(__dirname, 'folder', 'deleted.txt');
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
// fs.readFile(textPath, (err, data) => {
//     if(err) {
//         console.log(err);
//         return
//     }
//
//     // приклад як переписати інфу, якщо н-д фото чи відео потрібно зчитати і передати
//     // fs.appendFile(textPath2, data, err1 => {
//     // })
//     console.log(data.toString());
//
// });

// зчитати всі файли, повертає масив назв файлів з вказаного маршрута або окремо кожний файл за допомогою цикла .forEach і статистики stat()
// fs.readdir(dirToReadPath, ((err, files) => {
//     if (err) {
//         console.log(err);
//         return
//     }
//     //console.log(files);
//     files.forEach(file => {
//         const filePath = path.join(dirToReadPath, file);
//         fs.stat(filePath, (err1, stats) => {
//             console.log('----------');
//             console.log('isFile', stats.isFile());
//             console.log('isDirectory', stats.isDirectory());
//             console.log('size', stats.size);
//             console.log('----------');
//         });
//     });
// }));

//видалення папок rmdir, видаляє тільки пусті папки, Директорії з файлами стерти не можливо, спочатку потрібно видалити всі файли!
// fs.rmdir(path.join(dirToReadPath, 'thisIsDir'), err => {
//     console.log(err);
// });

// Видалення файлів unlink
// fs.unlink(textPath2, err => {
//     console.log(err);
// });

// Переміщення (або перейменування) файлів rename
// зараз переміщуємо дані з файлу text.txt  в 'folder' => 'deleted.txt'
// fs.rename(textPath, folderWithDeletedData, err => {
//     console.log(err);
// } )


// функція util.promisify - дозволяє промісифікувати будь-яку колбек ф-цію
// const appendPromise = util.promisify(fs.appendFile);
//
// appendPromise(folderWithDeletedData, 'test data with promise \n').catch( reason => {
//     console.log(reason);
// })

// Stream - розділення на шматки (chunk)

const readStream = fs.createReadStream(folderWithDeletedData);
const writeStream = fs.createWriteStream(textPath);

console.time('STREAM')
readStream.on('data', chunk => {
    writeStream.write(chunk);
    //console.log(chunk);
});

// зчитати дані та переписати їх в інший файл можна за допомогою ф-ції pipe, але то довше відпрацьовує
// readStream.pipe(writeStream);
console.timeEnd('STREAM')


