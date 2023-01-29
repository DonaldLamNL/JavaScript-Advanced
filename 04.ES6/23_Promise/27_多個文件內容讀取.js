const fs = require('fs')


// 回調地獄方式
// fs.readFile('./test.md', (err, data1) => {
//     fs.readFile('./test1.md', (err, data2) => {
//         fs.readFile('./test2.md', (err, data3) => {
//             // 回調地獄第二個問題：重名，而且不易發現，不好維護
//             let result = data1 + '\r\n' + data2 + '\r\n' + data3
//             console.log(result)
//         })
//     })
// })

// Promise實現
const p = new Promise((resolve, reject) => {
    fs.readFile('./test.md', (err, data) => {
        resolve(data)
    })
})

p
.then(value => {
    return new Promise((resolve, reject) => {
        fs.readFile('./test1.md', (err, data) => {
            resolve([value, data])
        })
    })
}).then(value => {
    return new Promise((resolve, reject) => {
        fs.readFile('./test2.md', (err, data) => {
            // 壓入
            value.push(data)
            resolve(value)
        })
    })
}).then(value => {
    console.log(value.join('\r\n'));
})