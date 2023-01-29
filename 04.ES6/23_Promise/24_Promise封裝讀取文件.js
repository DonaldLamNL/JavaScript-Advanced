// // 1. 引入 fs 模塊
const { log } = require('console')
const fs = require('fs')

// 2. 調用方法讀取文件
fs.readFile('./test.md', (err, data) => {
    // 如果失敗，拋出錯誤
    if(err) throw err
    // 如果成功，輸出內容
    // console.log(data.toString())
})

// 3. 使用 Promise 封裝
const p = new Promise(function(resolve, reject){
    fs.readFile('./test.mda', (err, data) => {
        // 如果失敗，拋出錯誤
        if(err){
            reject(err)
        }
        // 如果成功，輸出內容
        resolve(data)
    })
})

p.then(function(value){
    console.log(value.toString())
}, function(reason){
    console.log('Error')

})