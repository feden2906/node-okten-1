const fs = require('fs');
const path = require('path');

const folderWithGirls = path.join(__dirname, '1800');
const folderWithBoys = path.join(__dirname, '2000');

// fs.readdir(folderWithGirls, (err, files) => {
//     if (err) {
//         console.log(err);
//         return
//     }
//     files.forEach(file => {
//         const filePathOfGirls = path.join(folderWithGirls, file);
//
//         fs.readFile(filePathOfGirls, (err1, data) => {
//             if (err1) {
//                 console.log(err1);
//                 return
//             }
//             if (JSON.parse(data).gender === 'male') {
//                 const newFileName = path.join(folderWithBoys, `${JSON.parse(data).name}.json`);
//
//                 fs.rename(filePathOfGirls, newFileName.toLowerCase(), err2 => {
//                     console.log(err2);
//                     return
//                 })
//             }
//             return
//         })
//     })
// })

fs.readdir(folderWithBoys, (err, files) => {
    if (err) {
        console.log(err);
        return
    }
    files.forEach(file => {
        const filePathOfBoys = path.join(folderWithBoys, file)

        fs.readFile(filePathOfBoys, (err1, data) => {
            if (err1) {
                console.log(err1);
                return
            }
            if (JSON.parse(data).gender === 'female') {
                const newFileName = path.join(folderWithGirls, `${JSON.parse(data).name}.json`);

                fs.rename(filePathOfBoys, newFileName.toLowerCase(), err2 => {
                    console.log(err2);
                    return
                })
            }
            return
        })
    })
})