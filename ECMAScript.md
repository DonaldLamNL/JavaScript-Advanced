# ECMAScript
1. ECMA (European Computer Manufacturers Association) 歐洲計算機機制造商協會
    - 目標是評估、開發和認可電信和計算機標準


2. ECMAScript
    - 是 ECMA 國際通過 ECMA-262 標準化的腳本程序設計語言
    - https://www.ecma-international.org/publications-and-standards/standards/ecma-262/
    - 每一年6月份發布新的版本，而ES6就是2015年以後的版本
    - 每一次標準的誕生表示語言的完善和功能的加強


3. 為什麼學習ES6
    - ES6 的版本變動內容最多，具有意義
    - ES6 加入很多新的語法特性，編程實現更簡單、高效
    - ES6 是前端開發趨勢



# ES6

## 數據聲明

### let關鍵字
1. 簡介：
    - ES6 中新增用於聲明變量的關鍵字


2. 特性：
    1. 變量不能重複聲明

    2. 具有模塊作用域
        - `let`聲明的變量只在所處於的塊級有效
        - 防止循環變量變成全局變量
        - 例子：
            ```js
            if(true){
                let a = 10
                var b = 20
            }
            console.log(a)      // err: a is not defined
            console.log(b)      // b = 20
            
            for(let i = 0; i < 2; i++){}
            for(var j = 0; j < 2; j++){}
            console.log(i)      // err: i is not defined
            console.log(j)      // j = 2
            ```
        - 注意：使用`let`關鍵字聲明的變量才具有塊級作用域，使用`var`關鍵字聲明的變量不具備塊級作用域的特性

    3. 不存在變量提升
        - `var`關鍵字聲明的變量存在變量提升，因此存在先使用後聲明的處境
        - `let`關鍵字聲明的變量不存在變量提升
            ```js
            console.log(a)      // a = undefined
            var a = 20
            
            console.log(a)      // err: a is not defined
            let a = 20
            ```

    4. 存有暫時性死區特性
        - 在塊級區域使用`let`聲明的變量會被整體綁定在該塊級區域，不受外部代碼影響
            ```js
            var num = 10
            if(true){
                console.log(num);   // err: num is not defined
                let num = 20
            }
            /*
                如果塊級中使用了 let 關鍵字聲明重名變量變量
                就會和塊級區域整體進行綁定，在當前區域中的變量與外部是沒有關係
            */
            ```


3. 面試題：
    1. 全局變量與函數執行
        ```js
        var arr = []
        for(var i = 0; i < 2; i++){
            arr[i] = function(){
                console.log(i)
            }
        }
        arr[0]()    // 2
        arr[1]()    // 2
        /*
            由於變量 i 是全局的，函數執行時輸出的都是全局作用域下的 i 值
        */
        ```

    2. 全局變量與函數執行
        ```js
        var arr = []
        for(var i = 0; i < 2; i++){
            arr[i] = function(){
                console.log(i)
            }
        }
        arr[0]()    // 0
        arr[1]()    // 1
        /*
            由於變量`i`具有塊級作用域，循環結束後產生兩個塊級作用域，兩個塊級作用域中存有兩個變量`i`
            數組執行時，數組儲存兩個函數，而函數中並沒有變量`i`，所以向上一級作用域（塊級作用域）查找
        */
        ```



### const關鍵字
1. 簡介：
    - ES6 新增用於聲明常量的關鍵字
    - 常量就是值<font color="#f54747">（內存地址）</font>不能變化的量


2. 特性：
    1. 聲明常量時必須賦值

    2. 具有模塊作用域
        - `const`聲明的變量只在所處於的塊級有效
            ```js
            if(true){
                const a = 10
            }
            console.log(a)      // err: a is not defined
            ```

    3. 常量賦值後值不能修改
        - 基本數據類型中，常量的值不可更改
            ```js
            const PI = 3.14
            PI = 100    // Assignment to constant variable
            ```

    4. 數組與對象的元素修改，不算做對常量的修改
        - 複雜數據類型中，數據結構內部的值可更改，但常量的地址不可更改
            ```js
            const arr = [100, 200]
            arr[0] = 'a'
            arr[1] = 'b'
            console.log(arr)    // ['a','b']
            arr = ['a', 'b']    // Assignment to constant variable
            ```



### 聲明方法的區別
1. 使用<font color="#f54747">`var`</font>聲明的變量，其作用域為<font color="#f54747">該語句所在的函數內，且存在變量提升現象</font>

2. 使用<font color="#f54747">`let`</font>聲明的變量，其作用域為<font color="#f54747">該語句所在的代碼塊內，不存在變量提升</font>

3. 使用<font color="#f54747">`const`</font>聲明的是常量，在後面出現的代碼中<font color="#f54747">不能再修改該常量的值</font>

| `var` | `let` | `const` | 
| :---: | :---: | :---: | 
| 函數級作用域 | 塊級作用域 | 塊級作用域 | 
| 變量提升 | 不存在變量提升 | 不存在變量提升 | 
| 值可更改 | 值可更改 | 值不可更改 | 



## 解構賦值
1. 簡介：
    - ES6 允許按照一定模式從數組和對象中提取值，對變量進行賦值


2. 數組解構
    - 數組解構允許我們按照一一對應的關係從數組中提取值，然後賦值給變量
        ```js
        let arr = [1, 2, 3]
        let [a, b, c] = arr         // a = 1, b = 2, c = 3
        
        // 如果解構不成功，變量的值為 undefined
        let [a, b, c, d] = arr      // d = undefined
        ```


3. 對象解構
    1. 變量名與屬性名相同
        - 對象解構允許我們使用變量的名字匹配對象的屬性，匹配成功將對象屬性賦值給變量
            ```js
            let person = {name:'Donald', age:20}
            let {age, name} = person    // name = 'Donald', age = 20
            
            // 如果解構不成功，變量的值為 undefined   
            let {name, age, gender} = person    // gender = undefined
            ```

    2. 變量名與屬性名不同
        - 這種寫法將左側用於進行屬性匹配，匹配成功後將對象屬性賦值給右側的別名
            ```js
            let person = {name:'Donald', age:20}
            let {name: myName, age: myAge}      // myName = 'Donald', myAge = 20
            ```



## 模板字符串
1. 簡介：
    - ES6 引入新的聲明字符串的方式
    - 語法：
        ```js
        let str = `Hello World`
        ```


2. 特性：
    1. 內容中可以直接出現換行符
        ```js
        let str = `<ul>
                <li>Hello World 1</li>
                <li>Hello World 2</li>
                <li>Hello World 3</li>
            </ul>`
        ```
    
    2. 變量拼接
        ```js
        let str1 = 'Hello '
        let str2 = `${str1}World`
        console.log(str2)       // Hello World
        ```



## 對象簡化寫法
1. 簡介：
    - ES6 允許在`{}`裡，直接寫入變量和函數，作為對象的屬性和方法


2. 具體編碼：
    ```js
    let name = 'Donald'
    let eat = function(){}
    const person = {
        // 簡化變量寫入：name: name
        name,
        // 簡化函數寫入：eat: eat
        change,
        // 簡化函數創建：say: function(){}
        say(){}
    }
    ```



## 箭頭函數
1. 簡介：
    - ES6 允許使用箭頭來定義函數
    - 語法：
        ```js
        let fn = (args) => {
            // 函數體
        }
        ```


2. 特性：
    1. `this`是靜態的
        - 在傳統函數中，`this`指向的是函數的<font color="#f54747">調用者</font>
            ```js
            window.name = 'Window'
            const person = {
                name: 'Object'
            }
            
            function getName(){
                console.log(this.name)
            }
            
            getName()  // Window
            getName.call(person)   // Object
            ```

        - 在箭頭函數中，`this`指向的是<font color="#f54747">函數聲明時所在作用域下的`this`指向</font>
            箭頭函數沒有自己的`this`，如果在函數中調用`this`則指向箭頭函數定義位置的`this`
            ```js
            window.name = 'Window'
            const person = {
                name: 'Object'
            }
            
            let getName = () => {
                console.log(this.name)
            }
            
            getName()   // Window
            getName.call(person)    // Window （函數永遠指向聲明時，函數所在作用域的 this 指向）
            ```
    
    2. 不能作為構造函數實例化對象
        - 具體編碼：
            ```js
            let Person = (name, age) => {
                this.name = name
                this.age = age
            }
            let donald = new Person('Donald', 18)
            console.log(donald)     // Person is not a constructor
            ```
    
    3. 不能使用`arguments`變量
        - 具體編碼：
            ```js
            let fn = () => {
                console.log(arguments)
            }
            fn(1,2,3)   // arguments is not defined
            ```
    
    4. 箭頭函數的簡寫
        1. 省略`()`，當形參有且只有一個的時候
            ```js
            let double = n => {
                return n + n
            }
            ```
        
        2. 省略`{}`，當代碼體只有一條語句時（如果語句的執行結果就是函數的返回值，`return`必須省略）
            ```js
            let square = n => n * n
            ```


3. 箭頭函數的應用場景
    - 箭頭函數適用於：與`this`無關的回調，例如：定時器、數組的方法回調
    - 箭頭函數不適用於：與`this`有關的回調，例如：DOM的事件回調、對象的方法


4. 箭頭函數面試題
    1. 對象中箭頭函數的`this`指向問題
        ```js
        var obj = {
            age:20,
            say: () => {
                console.log(this.age)
            }
        }
        obj.say()   // undefined
        
        /*
            由於箭頭函數並沒有自己的 this 指向，而對象 obj 並不能產生作用域，因此箭頭函數實則被定義在全局作用域下
            所以在調用 say() 方法時，this 指向的是 Window，而 Window 並未聲明 age 屬性，因此返回 undefined
        */
        ```



## 函數參數的默認設置
1. 簡介：
    - ES6 允許給函數參數賦予初始值


2. 形參初始值
    - 能給形參設置初始化值
    - 注：具有默認值的參數位置一半靠後
    - 具體編碼：
        ```js
        function add(a, b, c = 10){
            return a + b + c
        }
        console.log(add(1,2))   // 13
        ```


3. 與解構賦值結合
    - 能在傳遞參數的時候同時使用解構賦值，節省使用`this`重新賦值
    - 具體編碼：
        ```js
        function connect({host='127.0.0.1', username, password, port}){
            // let host = this.host
            console.log(host)
            console.log(username)
        }
        connect({
            // host:'localhost',
            username: 'admin',
            password: 'root',
            port: 3306
        })
        ```



## rest 參數
1. 簡介：
    - ES6 引入`rest`參數，用於獲取函數的實參，用來代替`arguments`


2. ES5獲取實參的方法：
    - 利用`arguments`獲取實參
    - 注：`arguments`並不是數組，是一個<font color="#f54747">對象</font>
    - 具體編碼：
        ```js
        function students(){
            console.log(arguments)      
        }
        students('Donald', 'John', 'May')
        ```


3. `rest`參數獲取實參：
    - 語法：`...args`
    - `args`是一個<font color="#f54747">數組</font>，因此可以使用數組的API方法，例如`filter()`、`map()`、`some()`
    - 具體編碼：
        ```js
        function students(...args){
            console.log(args)
        }
        students('Donald', 'John', 'May')   // ['Donald', 'John', 'May']
        ```
    - 注意：<font color="#f54747">`rest`參數必須放到參數的最後</font>


4. `rest`參數配合解構使用：
    - 解構變量寫法也可以寫成剩餘參數的形式
        ```js
        let arr = [1, 2, 3, 4]
        let [a1, ...args] = arr     // a1 = 1, args = [2, 3, 4]
        ```



## 擴展運算符 spread
1. 簡介：
    - 將數組轉換為都好分隔的「參數序列」
    - 具體編碼：
        ```js
        const students = ['Donald', 'John', 'May']  // => 'Donald', 'John', 'May'
        function getName(){
            console.log(arguments)
        }
        getName(students)       // === getName(['Donald', 'John', 'May'])
        getName(...students)    // === getName('Donald', 'John', 'May')        
        ```


2. 應用：
    1. 合併數組
        ```js
        const boys = ['Donald', 'John']
        const girls = ['May', 'Lily']
        const students = boys.concat(girls)     // ES5 的數組API方法
        const students = [...boys, ...girls]    // === ['Donald', 'John', 'May', 'Lily']
        ```

    2. 複製數組
        ```js
        const boys = ['Donald', 'John']
        const men = [...boys]
        ```
        - 注意：如果數組裡面的元素有引用類型數據，是<font color="#f54747">淺拷貝</font>

    3. 將偽數組轉為真數組
        ```js
        const divs = document.querySelectorAll('div')
        console.log(divs)       // NodeList
        console.log([...divs])  // Array
        ```
        - 轉換之後，就可以使用數組的API方法



## Symbol 數據類型
1. 簡介：
    - ES6 引入一種新的原始數據類型 Symbol ，表示獨一無二值
    - 它是 JavaScript 的第七種數據類型，是一種類似於字符串的數據類型
    - 用於給對象添加屬性和方法


2. 特點：
    1. Symbol 的值是唯一的，用來解決命名衝突問題
    2. Symbol 的值不能與其他數據進行運算
    3. Symbol 定義的對象屬性不能使用`for in`循環遍歷，但是可以使用`Reflect.ownKeys`來獲取對象的所有`key`



### Symbol基本使用
1. 創建：
    1. 方式一：使用`Symbol()`創建
        - 語法：
            ```js
            let s = Symbol()
            ```
        - 可傳遞一個字符串作為描述字符串，通過字面意思來理解值（注釋）
        - 描述字符串只是一個標誌，返回的值並不相同
            ```js
            let s1 = Symbol('Hello')
            let s2 = Symbol('Hello')
            console.log(s1 === s2)      // false
            ```

    2. 方式二、使用`Symbol.for()`創建
        - 語法：
            ```js
                let s = Symbol.for()
            ```
        - 一樣可以傳遞描述字符串
        - 而這種方式可以通過此描述字符串來得出唯一`Symbol`值
            ```js
            let s1 = Symbol.for('Hello')
            let s2 = Symbol.for('Hello')
            console.log(s1 === s2)      // true
            ```


2. 給對象添加方法
    1. 在對象外添加方法
        ```js
        let game = {}
        
        let left = Symbol('left')
        let methods = {
            right: Symbol('right'),
        }
        
        game[left] = function(){ ... }
        game[methods.right] = function(){ ... }
        ```
    
    2. 在對象內添加方法
        ```js
        let game = {
            [Symbol('left')]: function(){ ... },
            [Symbol('right')]: function(){ ... },
        }
        ```



### Symbol內置值
除了定義自己使用的`Symbol`值以外，ES6 提供了11個內置Symbol值，指向語言內部使用的方法
| 方法 | 說明 |
| ----- | ----- |
| `Symbol.hasInstance` | 當其他對象使用`instanceof`運算符，判斷是否為該對象的實例時，會調用這個方法 |
| `Symbol.isConcatSpreadable` | 是一個布爾值，表示該對象用於`Array.prototype.concat()`時，是否可以展開 |
| `Symbol.unscopables` | 該對象指定了使用`with`關鍵字時，哪些屬性會被`with`環境排除 |
| `Symbol.match` | 執行`str.match(obj)`時，如果該屬性存在，會調用它，返回該方法的返回值 |
| `Symbol.replace` | 當該對象被`str.replace(obj)`方法調用時，會返回該方法的返回值 |
| `Symbol.search` | 當該對象被`str.search(obj)`方法調用時，會返回該方法的返回值 |
| `Symbol.split` | 當該對象被`str.split(obj)`方法調用時，會返回該方法的返回值 |
| `Symbol.interator` | 對象進行`for...of`循環時，會調用這個方法，返回該對象的默認遍歷器 |
| `Symbol.toPrimitive` | 該對象被轉為原始類型的值時，會調用這個方法，返回該對象對應的原始類型值 |
| `Symbol.toStringTag` | 在該對象上面調用`toString`方法時，返回該方法的返回值 |
| `Symbol.species` | 創建衍生對象時，會使用該方法 |



## 迭代器 Iterator
1. 簡介：
    - 迭代器是一種接口，為各種不同的數據類型提供統一的訪問機制
    - 任何數據結構只要部署迭代器接口，就可以完成遍歷操作
    - ES6 創造了一種新的遍歷命令`for...of`循環，迭代器接口主要供`for...of`消費
    - 原生具備迭代器接口的數據（即可用`for...of`遍歷）
        `Array`, `Arguments`, `Set`, `Map`, `String`, `TypedArray`, `NodeList`


2. 工作原理：
    1. 創建一個指針對象，指向當前數據結構的起始位置
    2. 第一次調用對象的`next`方法（返回對象身上的`next`方法），指針會自動指向數據結構的第一個成員
    3. 接下來不斷調用`next`方法，指針一直往後移動，直到指向最後一個成員
    4. 每調用`next`方法返回一個包含`value`和`done`屬性的對象
    - <font color="#f54747">注：需要自定義遍歷數據時，要想到迭代器</font>


3. 實際應用：
    - 自定義迭代器，能給對象自定義一套`for...of`的遍歷規則
    - 具體代碼：
        ```js
        const school = {
            name:'CUHK',
            students:['Donald', 'John', 'May', 'Lily'],
            // 1. 為對象配置迭代器
            [Symbol.iterator](){
                let index = 0
                // 2. 迭代器返回值是一個包含 next 方法的對象
                return {
                    // 3. 配置對象的 next 方法
                    next: () => {
                        if(index < this.students.length){
                            // 4. next 方法返回值為一個包含 value 和 done 值的對象
                            const result = {value: this.students[index++], done: false}
                            return result
                        }else{
                            return {value: undefined, done: true}
                        }
                    }
                }
            }
        }
        ```
    - 這種遍歷形式符合面向對象概念，不直接調用對象身上的數組進行遍歷，而是透過聯繫對象自身方法遍歷數組



## 生成器 Generator
1. 簡介：
    - 生成器函數是 ES6 提供的一種異步編程解決方案
    - 語法行為與傳統函數完全不同


2. 使用方法：
    1. 聲明生成器函數
        - 使用`function *`方式聲明生成器函數
        - 使用`yield`語句作為分割符
        - 具體編碼：
            ```js
            function * gen(){
                // Area 1
                yield 111
                // Area 2
                yield 222
                // Area 3
            }
            ```
    
    2. 調用函數
        - 與普通函數不同，必須使用`next`方法調用
        - 每次調用`next()`方法，就會執行分割符`yield`及以上的代碼
        - 具體編碼：
            ```js
            let iterator = gen()
            iterator.next()
            ```
    
    3. 參數傳遞
        - `next`方法是可以傳入實參，而實參就是`yield`語句的返回結果
        - 而<font color="#f54747">第二次</font>調用`next`方法傳入的參數，將作為<font color="#f54747">第一個</font>`yield`語句的返回結果，以此類推
        - 如果要在第一個`yield`語句之前傳遞參數，則可以通過調用生成器`gen()`的時候傳入參數
        - 具體代碼：
            ```js
            function * gen(arg){
                console.log(arg)    // AAA
            
                let one = yield 111
                console.log(one)    // BBB
                
                let two = yield 222
                console.log(two)    // CCC
            }
            
            let iterator = gen('AAA')
            iterator.next()     // 第一次無法接收參數
            iterator.next('BBB')   // 第一個 yield 語句的返回結果
            iterator.next('CCC')   // 第二個 yield 語句的返回結果
            ```


3. 實際應用：
    1. 案例：一秒後輸出`111`，然後兩秒後輸出`222`
        1. 錯誤方式：平行處理異步任務
            ```js
            firstTask()
            secondTask()
            /*
                因為異步任務之間有關聯度：先得到用戶數據，才可以獲取訂單數據
            */
            ```

        2. 傳統方式：函數中嵌套後續函數
            ```js
            setTimeout(() => {
                firstTask()
                setTimeout(() => {
                    secondTask()
                    // ...
                }, 2000)
            }, 1000)
            /*
                陷入回調地獄，不方便插入新的異步任務，也不方便維護
            */
            ```

        3. 生成器方式（<font color="#f54747">避免回調地獄</font>）
            ```js
            // 第一個異步任務
            function firstTask(){
                setTimeout(() => {
                    console.log(111)
                    iterator.next()     // 第一個異步任務處理完調用 next 函數轉跳至下一個異步任務
                }, 1000);
            }
            
            // 第二個異步任務
            function secondTask(){
                setTimeout(() => {
                    console.log(222)
                    iterator.next()     // 直到所有異步任務處理完畢
                }, 2000);
            }
            
            function * gen(){
                // 使用 yield 語句分割異步任務
                yield firstTask()
                yield secondTask()
            }
            
            let iterator = gen()
            iterator.next()
            ```



## Promise
1. 簡介：
    - `Promise`是 ES6 引入新的異步編程解決方案（主要解決回調地獄的問題）
    - 語法上`Promise`是一個構造函數，用來封裝異步操作並可以獲取其成功或失敗的結果

### Promise基本使用
1. 實例化對象：
    - `Promise`是一個構造函數，因此可以實例化對象
    - 具體編碼：
        ```js
        const p = new Promise(function(resolve, reject){
            // 異步操作 - 成功
            let data = 'Data'
            resolve(data)
        
            // 異步操作 - 錯誤
            let err = 'Error'
            reject(err)
        })
        ```

2. `then`方法
    - 可以對異步操作成功與失敗進行後續操作
    - 具體編碼：
        ```js
        p.then(
            // 異步操作成功執行
            (value) => {    // value 就是 resolve 傳入的參數
                console.log(value)
            },
            // 異步操作錯誤執行
            (reason) => {   // reason 就是 reject 傳入的參數
                throw new Error(reason)
            }
        )
        ```
        - 成功與失敗的回調可以編寫在異步操作的外面，避免回調地獄


3. `catch`方法
    - 一個異步操作錯誤執行函數的「語法糖」
    - 具體編碼：
        ```js
        // 異步操作錯誤執行
        p.catch((reason) => {
            throw new Error(reason)
        })
        ```



### Promise異步操作
1. `Promise`原型
    - `Promise`實例對象`then`方法的返回結果實際上也是一個`Promise`對象
        ```js
        const result = p.then(value => {
            // 異步操作執行成功
        }, reason => {
            // 異步操作執行失敗
        })
        
        console.log(result)     
        /* 
            Promise{
                [[Prototype]]: Promise
                [[PromiseState]]: "fulfilled"
                [[PromiseResult]]: undefined 
            }
        */ 
        ```
    - 注：<font color="#f54747">`PromiseState`的狀態是取決於回調函數的執行結果，並不是異步的操作結果</font>


2. 四種回調函數的執行結果：
    1. 第一種：沒有指定返回值
        - `PromiseState`為`fulfilled`
        - `PromiseResult`為`undefined`
            ```js
            Promise{
                [[Prototype]]: Promise
                [[PromiseState]]: "fulfilled"
                [[PromiseResult]]: undefined
            }
            ```
    
    2. 第二種：返回非`Promise`對象的屬性
        - `PromiseState`為`fulfilled`
        - `PromiseResult`為返回值
            ```js
            // 非 Promise 對象的屬性
            return 123
            
            Promise{
                [[Prototype]]: Promise
                [[PromiseState]]: "fulfilled"
                [[PromiseResult]]: 123
            }
            ```

    3. 第三種：返回`Promise`對象
        - `PromiseState`為返回`Promise`對象的狀態
        - `PromiseResult`為返回`Promise`對象的結果
            ```js
            // 是 Promise 對象的屬性
            return new Promise((resolve, reject) => {
                resolve('ok')   // [[PromiseState]]: "fulfilled"
                                // [[PromiseResult]]: "ok"
            
                reject('error') // [[PromiseState]]: "rejected"
                                // [[PromiseResult]]: "error"
            }
            ```

    4. 第四種：拋出錯誤
        - `PromiseState`為`rejected`
        - `PromiseResult`為拋出的錯誤結果
            ```js
            // 拋出錯誤
            throw 'ERROR!'
            
            Promise{
                [[Prototype]]: Promise
                [[PromiseState]]: "rejected"
                [[PromiseResult]]: "ERROR!"
            }
            ```


3. 鏈式調用：
    - 由於`then`是可以返回`Promise`對象，所以`then`方法是可以鏈式調用
    - 可以解決回調地獄問題
    - 具體編碼：
        ```js
        p
            .then(value => {
                // 第二個異步操作
                return new Promise()
            }, reason => {})
            .then(value => {
                // 第三個異步操作
                return new Promise()
            }, reason => {})
            .then()
        ```


4. 實際案例：讀取多個文件
    ```js
    const p = new Promise((resolve, reject) => {
        // 第一個異步任務
        fs.readFile('./test.md', (err, data) => {
            resolve(data)   // 傳入數據
        })
    })
    
    p
    .then(value => {
        // 返回新的 Promise 實例對象
        return new Promise((resolve, reject) => {
            // 第二個異步任務
            fs.readFile('./test1.md', (err, data) => {
                resolve([value, data])  // 將兩個異步任務數據寫入成一個數組並傳入
            })
        })
    }).then(value => {
        // 返回新的 Promise 實例對象
        return new Promise((resolve, reject) => {
            // 第三個異步任務
            fs.readFile('./test2.md', (err, data) => {
                value.push(data)    // 將新數據壓入傳入的數組中
                resolve(value)      // 將三個異步任務數據的數組傳入
            })
        })
    }).then(value => {
        // 完成所有異步操作之後的執行代碼
        console.log(value.join('\r\n'))
    })
    ```



## Set
1. 簡介：
    - ES6 提供的新數據結構，類似於數組，但成員的值都是<font color="#f54747">唯一</font>的
    - `Set`實現了迭代器 (`Iterator`) 接口，所以可以使用「擴展運算符」(`for...of`)進行遍歷


2. 基本使用：
    1. 聲明`Set`：
        ```js
        const s = new Set(['Donald', 'John', 'May', 'Lily', 'Donald'])  // 自動去除重複的元素
        ```

    2. 遍歷`Set`：
        ```js
        for(let v of s){
            console.log(v)  // Set 裡面的元素
        }
        ```


3. 屬性和方法：
    1. `size`屬性 - 返回集合的元素個數
        ```js
        s.size
        ```

    2. `add`方法 - 添加一個新元素，返回當前集合
        ```js
        s.add('Tom')
        ```

    3. `delete`方法 - 刪除元素，返回`boolean`值
        ```js
        s.delete('John')
        ```

    4. `has`方法 - 檢測集合中是否包含某個元素，返回`boolean`值
        ```js
        s.has('May')
        ```

    5. `clear`方法 - 清空集合，返回`undefined`
        ```js
        s.clear()
        ```


4. 數學應用：
    1. 去重
        ```js
        [...new Set(arr)]   // 將數組轉為集合，自動去重後再使用擴展運算符展開
        ```

    2. 交集
        ```js
        [...new Set(arr)].filter(item => new Set(arr2).has(item))
        // 將一個數組去重後，使用 filter 過濾另一個數組，過濾出相同的元素
        ```

    3. 並集
        ```js
        [...new Set([...arr, ...arr2])]     // 將兩個數組合併再去重
        ```
    
    4. 差集
        ```js
        [...new Set(arr)].filter(item => !(new Set(arr2).has(item)))    // 交集的相反
        ```



## Map
1. 簡介：
    - ES6 提供的新數據類型，類似於對象，也是鍵值`key value`對的集合，但鍵`key`的返回不限於字符串，各種類型的值（包括對象）都可以當作鍵`key`
    - `Map`也實現了迭代器 (`Iterator`) 接口，所以可以使用「擴展運算符」(`for...of`)進行遍歷
    
2. 基本使用：
    1. 聲明`Map`：
        ```js
        let m = new Map()
        ```
    
    2. 遍歷`Map`：
        ```js
        for(let v of m){
            console.log(v)  // v 是一個數組包含兩個元素：第一個是 key，第二個是 value
        }
        ```


3. 屬性和方法：
    1. `size`屬性 - 返回`Map`的元素個數
        ```js
        m.size
        ```

    2. `set`方法 - 添加一個新的元素，返回當前`Map`
        - `key`可以是各種類型
        ```js
        // key - 字符串  value - 字符串
        m.set('name', 'Donald')
        
        // key - 字符串  value - function
        m.set('say', function(){
            console.log('Hello World');
        })
        
        // key - 對象  value - 數組
        let key = {
            school: 'CUHK'
        }
        m.set(key, ['CSCI', 'CENG', 'AIST'])
        ```

    3. `get`方法 - 返回鍵名`key`對象的鍵值`key value`
        ```js
        m.get('name')
        ```
    
    4. `has`方法 - 檢測`Map`中是否包含某個元素，返回`boolean`值
        ```js
        m.get(key)
        ```

    5. `delete`方法 - 刪除一個元素，返回`boolean`值
        ```js
        m.delete('name')
        ```

    6. `clear`方法 - 清空集合，返回`undefined`
        ```js
        m.clear()
        ```



## Class 類
1. 簡介：
    - ES6 提供了更接近傳統語言的寫法，引入了`Class`的概念，作為對象的模板
    - 通過`class`關鍵字定義類
    - 基本上，ES6 的`class`可以看作是一個語法糖，絕大部分功能，ES5 的構造函數也可以做到，新的`class`寫法只是讓對象原型的寫法變得更加清晰、更像面向對象編程語法

### Class基本使用
1. 基本使用：
    ```js
    // 創建類
    class Person{
        // 構造器
        constructor(name){
            this.name = name
        }
        // 方法 - 必須使用該語法，不能使用 ES5 的對象完整式
        eat(){
            console.log('I am eating')
        }
    }
    ```


2. 靜態屬性與方法：
    - ES5 中，實例對象和函數對象之間的屬性與方法不相通，實例對象只與函數的原型對象上的屬性和方法相通
    - 而 ES6 的`class`裡所定義的屬性與方法和實例對象是相通
    - 如果要兩者不相通，則需要加上`static`關鍵字，讓屬性與方法變成靜態
    - 具體編碼：
        ```js
        class Person{
            static name = 'Donald'
            static eat(){
                console.log('I am eating')
            }
        }
        ```


3. `getter`與`setter`
    - 用於獲取與修改屬性時執行
    - 具體編碼：
        ```js
        class Person{
            get name(){
                console.log('Get name')
            }
            // setter必須接收參數
            set name(params){
                console.log('Name has been changed');
            }
        }
        ```



### 繼承
1. 構造函數實現：
    ```js
    // 父構造函數
    function Phone(brand, price){
        this.brand = brand
        this.price = price
    }
    // 聲明父構造函數的方法
    Phone.prototype.call = function(){
        console.log('I am calling')
    }
    
    // 子構造函數
    function SmartPhone(brand, price, color, size){
        Phone.call(this, brand, price)
        this.color = color
        this.size = size
    }
    
    // 設置子級別構造函數的原型
    SmartPhone.prototype = new Phone()
    SmartPhone.prototype.constructor = SmartPhone
    
    // 聲明子構造函數的方法
    SmartPhone.prototype.change = function(){
        console.log('I can change the time')
    }
    ```


2. `class`實現：
    ```js
    // 父類
    class Phone{
        constructor(brand, price){
            this.brand = brand
            this.price = price
        }
        // 聲明父類的方法
        call(){
            console.log('I am calling')
        }
    }
    
    // 子類
    class SmartPhone extends Phone{
        constructor(brand, price, color, size){
            super(brand, price)     // Phone.call(this, brand, price)
            this.color = color
            this.size = size
        }
        // 聲明子類的方法
        change(){
            console.log('I can change the time')
        }
    }
    ```



## 






<font color="#f54747"></font>

# 