# JS面向對象

## 面向對象

### 面向對象編程思想
1. 面向過程編程POP (Process-oriented programming)
    - 分析出解決問題所需的步驟，然後同函數吧這些步驟一步步的實現，使用的時候再一個個的依照次序調用


2. 面向對象編程OOP (Object-oriented programming)
    - 把事務分解成為一個個對象，然後由對象之間分工與合作


3. 面向對象特性：
    - 封裝性 Encapsulation
    - 繼承性 Inheritance
    - 多態性 Polymorphism


4. 優點：
    - 靈活
    - 代碼可復用
    - 容易維護和開發



### 類與對象
1. 面向對象思維特點：
    - 抽取對象共用的屬性和行為組織(方法)，封裝成一個類(模板)
    - 對類進行實例化，獲取類的對象(通過這個類產生不同的對象)
    - 考慮有哪些對象 > 按照面向對象的思維模式創建對象 > 使用對象去做事情


2. JS中的對象(Object)：
    - 一組無序的相關屬性和方法的集合，所有的事物都是對象，例如字符串、數值、數組、函數等
    - 對象是由屬性和方法組成的
        - <font color="#f54747">屬性</font>：事物的特徵，在對象中用 屬性 來表示
        - <font color="#f54747">方法</font>：事物的行為，在對象中用 方法 來表示


3. JS中的類(Class)：
    - 在ES6中信增加的概念，使用<font color="#f54747">class</font>關鍵字聲明一個類，以這個類來實例化對象
        - <font color="#f54747">類</font>抽象了對象的公共部分，<font color="skyblue">泛指</font>某一個 大類
        - <font color="#f54747">對象</font><font color="skyblue">特指</font>某一個通過類實例化的 具體對象



## 類Class

### 類的使用
1. 創建類：
    - 通過`class`關鍵字創建類，類名是習慣性定義的首字母大寫
    - 語法：
        ```js
        class Person{
            // class body
        }
        ```


2. Constructor 構造器：
    - `constructor()`方法是累的結構函數，<font color="#f54747">用於傳遞參數，返回實例對象</font>
    - 通過`new`命令生成對象實例時，自動調用該方法
    - 語法：
        ```js
        constructor(uname){
            this.uname = uname;
        }
        ```


3. 創建實例：
    - 通過`new`關鍵字創建實例
    - 語法：
        ```js
        var xxx = new Person('uname')
        ```


4. 靜態成員：
    - 靜態屬性與方法是類獨有的，實例對象不可調用
    - 通過`static`關鍵字聲明靜態屬性及方法
    - 語法：
        ```js
        // 靜態屬性
        static name = name
        // 靜態方法
        static say(){
        console.log('Hello World')
        }
        ```



### 類的共有方法
1. 創建方法：
    - 直接在對象裡添加方法
    - 可以正常傳遞參數
    - 語法：
        ```js
        class Parent{
          eat(food){
            console.log(this.uname, 'like eating', food);
        	}
        }
        ```


2. 語法規範：
    - 類裡面的所有函數不需要寫`function`關鍵字
    - 多個函數與方法之間不需要添加`,`



### 繼承性
1. `extends`關鍵字：
    - 用於讓子類繼承父類的屬性和方法
    - 語法：
        ```js
        class Parent{
            moeny(){
                console.log(100);
            }
        }
        
        class Child extends Parent{}
        ```


2. `super`關鍵字：
    - 用於訪問和調用對象父類上的<font color="#f54747">構造器</font>
    - <font color="#f54747">注意：子類在構造器中使用super，則必須放到this的前面</font>
    - 語法：
        ```js
        class Parent{
            constructor(x,y){
                this.x = x
                this.y = y
            }
            sum(){
                console.log(this.x + this.y);
            }
        }
        
        class Child extends Parent{
            constructor(x,y){
                super(x,y)  // 調用父類的構造器
        
                // 必須後於super
                this.x = x
                this.y = y
            }
            subtract(){
                console.log(this.x - this.y);
            }
        }
        ```


3. Override問題：
    - 繼承性中屬性和方法的查找原則：
        - 如果實例化子類輸出一個方法，則優先查看子類有沒有此方法，如果有就執行該方法，沒有就去父類中尋找
    - 使用`super`關鍵字訪問和調用對象父類上的<font color="#f54747">普通函數</font>
    - 語法：
        ```js
        class Parent{
            say(){
                return 'Parent'
            }
        }
        
        class Child extends Parent{
            say(){
                // super.say() 就是調用父類中的普通函數 say()
                console.log(super.say());
            }
        }
        ```



### 類與對象的注意點
1. 因為在ES6中，類沒有變量提升，所以必須先安裝義類，才能通過實例化對象

2. 類裡面的共有屬性和方法一定要加`this`關鍵字使用

3. 類中this的指向問題
    - 在constructor中，this指向的是<font color="#f54747">實例對象</font>
    - 在方法中，this指向的是<font color="#f54747">方法的調用者</font>



## 構造函數
1. 簡介：
    - 由於在ES6之前，JS中並沒有引入類的概念，
        因此ES6之前的對象不是基於類創建的，而是用一種稱為構造函數的特殊函數來定義對象和他的特徵


### 構造函數的使用
1. 利用構造函數創建對象：
    - 語法規範：<font color="#f54747">首字母大寫</font>
    - 語法：
        ```js
        function Person(uname, age){
            this.uname = uname
            this.age = age
            this.eat = function(){
                console.log('I am eating');
            }
        }
        ```


2. 創建實例對象：
    - 使用`new`關鍵字創造實例對象
    - 語法：
        ```js
        var donald = new Person('Donald', 19)
        ```
    - 運行模式：
        1. 在內存中創建一個新的空對象
        2. 讓 this 指向這個新對象
        3. 執行構造函數裡面的代碼，給這個新對象添加屬性和方法
        4. 返回這個新對象 (因此構造函數裡面不需要return)



### 構造函數的成員
1. 實例成員：
    - 實例成員就是構造函數內部通過 this 添加的成員
    - 實例成員只能通過<font color="#f54747">實例化的對象</font>來訪問
    - 具體編碼：
        ```js
        function Person(uname, age){
            // 創建實例成員
            this.uname = uname
            this.age = age
        }
        var donald = Person('Donald', 18)
         
        // 訪問實例成員
        donald.uname    // Donald
        // 並不能通過構造函數訪問實例成員
        Person.uname    // undefined
        ```


2. 靜態成員：
    - 靜態成員就是在構造函數身上添加的成員
    - 靜態成員只能通過<font color="#f54747">構造函數</font>來訪問
    - 具體編碼：
        ```js
        // 創建靜態成員
        Person.gender = 'Male'
        
        // 靜態成員只能通過構造函數訪問
        console.log(Person.gender);     // Male
        // 不可以通過實例對象來訪問
        console.log(donald.gender);     // undefined
        ```



### 構造函數的問題
- 浪費內存：例如對象身上的函數，每當創造一個實例對象，都會給每一個實例創建對象身上的函數
    ```js
    // 他們比較的是地址，可見兩個函數是存放在不同的地址
    console.log(donald.eat === john.eat);  // false
    ```



## 原型
1. 簡介：
    - 解決構造函數浪費內存的問題，構造函數通過原型分配的函數是所有對象<font color="#f54747">共享</font>的


### 原型對象
1. 原型對象Prototype
    - JS規定，<font color="#f54747">每一個構造函數都有一個`prototype`屬性</font>，指向另一個對象
        注意：這個`prototype`是一個對象，這個對象的所有方法和屬性，都會被構造函數所擁有
    - 我們可以把不變的方法，直接定義在`prototype`對象上，這樣所有對象的實例就可以共享這些方法
    - 具體編碼：
        ```js
        Person.prototype.eat = function(){
            console.log('I am eating');
        }
        
        // 事例對象共享方法
        console.log('?', donald.eat === john.eat)   // true
        ```
    - <font color="#f54747">一般情況下，公共屬性會定義到構造函數裡，而公共方法則會放在原型對象身上</font>


2. 原型對象中this的指向
    - 原型對象函數裡的this指向的是實例對象



### 對象的原型
1. 對象原型`__proto__`
    - 每個實例對象身上系統都會添加一個`__proto__`指向構造函數的原型對象`prototype`
    - 實例對象上的原型`__proto__`與構造函數身上的原型對象`prototype`是同等的
        ```js
        console.log(donald.__proto__ === Person.prototype);     // true
        ```
    - `__proto__`對象原型的意義在於為對象的查找機制提供一個方向，但他是一個<font color="#f54747">非標準屬性</font>
        因此在實際開發中，不可以使用這個屬性，他只是內部指向原型對象`prototype`


2. 方法的查找規則：
    1. 首先先查找實例對象上是否有對應的方法，如果有則執行對象上的方法
    2. 如果沒有，因為有`__proto__`的存在，就會去構造函數原型對象`prototype`身上去查找該方法



### 原型的構造器
1. 原型構造器`constructor`
    - 對象原型`__proto__`和構造函數的原型對象`prototype`裡面都有一個`constructor`屬性
    - 添加進原型對象中的函數可以用對象的簡寫形式：
        ```js
        Person.prototype = {
            eat:function(){
                console.log('I am eating');
            },
            // 函數的簡寫形式
            say(){
                console.log('Hello')
            }
        }
        ```
    - 但如果給原型對象賦值的是一個對象，則必須手動利用`constructor`指回原來的構造函數
        ```js
        Person.prototype = {
            constructor: Person,    // 手動指回原來的構造函數
            ...
        }
        ```



### 原型鏈
1. 原型鏈：
    - 只要是對象，那麼就有`__proto__`原型，指向原型對象
    - 例如：
        `donald`實例的原型指向`Person`的原型對象，
        `Person`原型對象的原型指向`Object`的原型對象，
        `Object`原型對象的原型最終指向`null`
    - 圖示：
        <img src="https://p.ipic.vip/rnky2v.png" width="800px"/>


2. 對象成員查找規則：
    1. 當訪問一個對象的屬性及方法時，首先查找<font color="#f54747">對象自身</font>有沒有該屬性
    2. 如果沒有，則查找它的原型 (也就是`__proto__`指向的<font color="#f54747">`prototype`原型對象</font>)
    3. 如果沒有，則查找原型對象的原型 (<font color="#f54747">Object的原型對象</font>)
    4. 以此類推直到找到Object為止 (<font color="#f54747">null</font>)
    5. `__proto__`對象原型的意義在於為對象的查找機制提供一個方向



### 原型對象的其他應用
1. 擴展內置的對象
    - 可以通過原型對象，對原來的內置對象進行擴展自定義的方法
        比如給數組增加自定義的功能：
        ```js
        Array.prototype.sum = function(){
            for(int)
        }
        ```

    - <font color="#f54747">注意：數組和字符串內置對象不能給原型對象進行覆蓋操作，只允許追加</font>
        ```js
        // 允許追加操作
        Array.prototype.xxx = function(){ ... }
        
        // 不允許覆蓋操作
        Array.prototype = {
            xxx: function(){ ... }
        }
        ```



## 組合繼承
1. 簡介：
    - 在ES6之前，並沒有`extends`繼承，但可以通過<font color="#f54747">構造函數+原型對象</font>模擬實現繼承，稱為<font color="#f54747">組合繼承</font>


2. `call()`方法
    - 作用：調用函數並且修改`this`的指向
        ```js
        // 參數一、thisAug: this的指向
        // 參數二、args: 傳遞的其他參數
        fn.call(thisAug, args...)
        ```



### 利用構造函數繼承
1. 核心原理：
    1. 通過`call()`把父構造函數的`this`指向子構造函數的`this`
    2. 運行父構造函數的時候，因為父構造函數中`this`指向子構造函數，就會給子構造函數中添加父構造函數的屬性及方法


2. 具體編碼：
    ```js
    // 父構造函數
    function Parent(uname, age){
        this.uname = uname
        this.age = age
    }
    
    // 子構造函數
    function Child(uname, age, gender){
        // 調用父構造函數，並把父構造函數的this指向子構造函數的this
        Parent.call(this, uname, age)
        this.gender = gender
    }
    ```



### 原型對象繼承方法
1. 簡介：
    - 由於父構造函數與子構造函數擁有自己的原型對象，因此子構造函數不能調用父構造函數原型對象上的屬性和方法


2. 核心原理：
    將子構造函數的原型對象指向父構造函數創造的實例對象，由於父構造函數的實例對象能指向父構造函數的原型對象，子構造函數原型對象也能調用父構造函數的原型對象中的屬性和方法


3. 具體編碼：
    ```js
    // 創建父構造函數的實例，因此子構造函數的原型對象就能指向父構造函數的原型對象
    Child.prototype = new Parent()
    // 由於利用對象修改了原型對象，需要使用constructor重新指向原來的構造函數
    Child.prototype.constructor = Child
    ```


4. 圖示：
    <img src="https://p.ipic.vip/totn93.png" width="600px"/>



## 類的本質
- class本質上還是function，可以簡單的理解為是構造函數的另一種形式


- 類與構造函數的共同點：
    1. 有原型對象`prototype`
    2. 原型對象`prototype`裡面有`constructor`指向構造函數本身
    3. 可以通過原型對象添加方法
    4. 創建的實例對象有`__proto__`原型指向構造函數的原型對象


- 所以ES6中類的絕大部分功能，ES5都可以做到，只是新的`class`寫法讓對象原型的寫法更加清晰，更像面向對象編程語法



## ES5新增的方法

### 數組方法
1. `forEach()`方法
    - 作用：遍歷數組
    - 語法：
        ```js
        // 參數一、value: 數組當前的值
        // 參數二、index: 數組當前的索引
        // 參數三、arr: 數組對象本身
        array.forEach(function(currentValue, index, arr))
        ```


2. `filter()`方法
    - 作用：創建一個新的數組，新數組中的元素是通過檢查指定數組中符合條件的所有元素，<font color="#f54747">主要用於篩選數組</font>
        <font color="#f54747">注意：它直接返回一個新的數組</font>
    
    - 語法：
        ```js
        // 參數一、value: 數組當前的值
        // 參數二、index: 數組當前的索引
        // 參數三、arr: 數組對象本身
        var newArr = arr.filter(function(value, index, arr){
            return (value % 2 === 0)    // 篩選條件
        })
        ```


3. `some()`方法
    - 作用：用於檢測數組中的元素是否滿足指定條件，並返回一個 boolean值
    - 備註：如果找到一個滿足條件的元素，則終止循環，不再繼續查找
    - 語法：
        ```js
        // 參數一、value: 數組當前的值
        // 參數二、index: 數組當前的索引
        // 參數三、arr: 數組對象本身
        var flag = arr.some(function(value, index, arr){
            return value >= 20      // 條件
        })
        ```


4. 遍歷問題
    1. 遍歷規則：
        - `forEach()`方法如果遇到`return true`不會終止遍歷
        - `filter()`方法如果遇到`return true`也不會終止遍歷
        - `some()`方法如果遇到`return true`就會終止遍歷

    2. `return`問題：
        - `return true`是為了表示尋找到該元素，就會終止遍歷
        - `return false`則表示沒有找到該元素，因此會繼續遍歷



### 字符串方法
1. `trim()`方法
    - 作用：用於刪除一個字符串兩端的空白字符串
    - 備註：返回的是一個新的字符串，不影響原字符串本身
    - 語法：
        ```js
        str.trim()
        ```



### 對象方法
1. `Object.keys()`方法
    - 作用：用於獲取對象自身所有的屬性名，返回一個由屬性名組成的數組
    - 語法：
        ```js
        Object.keys(obj)
        ```


2. `Object.defineProperty()`方法
    - 作用：定義對象中新屬性 或 修改原有的屬性
    - 語法：
        ```js
        // 參數一、obj: 目標對象
        // 參數二、prop: 需定義或修改的屬性名
        // 參數三、descriptor{}: 目標屬性所擁有的特性
        Object.defineProperty(obj, prop, {
            value: 'xxx',
            writable: false,
            enumerable: false,
            configurable: false,
        })
        ```
    - `descriptor{}`的說明：
        1. `value`
            - 設置屬性的值
            - 默認`undefined`
        2. `writable`
            - 值是否可重寫（對象裡有些屬性是不允許隨便修改，例如`id`）
            - 默認不可被重寫`false`
        3. `enumerable`
            - 目標屬性是否可以被枚舉
            - 默認不可被枚舉`false`
        4. `configurable`
            - 目標屬性是否可以被刪除
            - 是否可以在此修改<font color="#f54747">特性</font>
            - 默認不可被刪除`false`



# 函數Function

## 函數

### 函數定義方式
1. 通過`function`關鍵字聲明函數（命名函數）
    ```js
    function fun(){}
    ```


2. 通過函數表達式（匿名函數）
    ```js
    var fun = function(){}
    ```


3. 通過對象寫法
    - 簡介：由於`Function`是屬於對象，所有函數都是`Function`的實例對象，因此可以用`new Function()`定義
    - 語法：
        ```js
        var fun = new Function('參數', ... , '函數體')
        ```
    - 注意：`Function`裡面的參數與函數體必需是字符串格式



### 函數的種類
| 函數類型 | 調用方法 | this的指向 |
| :--- | :--- | :--- |
| 普通函數調用 | `funct()` / `funct.call()` | `window` |
| 構造函數調用 | `obj.funct()` | 實例對象`obj` |
| 對象方法調用 | `xxx = new Person()` | 該方法所屬對象`xxx` |
| 事件綁定方法 | `btn.onclick = function(){...}` | 綁定事件的對象`btn` |
| 定時器函數 | `setInterval(function(){...}, 1000)` | `window` |
| 立即執行函數 | `(function(){...})()` | `window` |



### 改變函數this指向
1. `call()`方法
    - 作用：
        1. 調用函數
        2. 修改`this`的指向
    - 語法：
        ```js
        // 參數一、thisAug: this的指向
        // 參數二、args: 傳遞的參數
        funct.call(thisAug, args...)
        ```
    - 主要應用：實現繼承


2. `apply()`方法
    - 作用：
        1. 調用函數
        2. 修改`this`的指向
    - 語法：
        ```js
        // 參數一、thisAug: this的指向
        // 參數二、argsArray: 傳遞的參數，必須包含在數組裡
        funct.apply(thisAug, [argsArray])
        ```
    - 主要應用：借用數組以外的內置對象函數
        1. 利用 apply 借助於數學內置對象求最大值
            ```js
            var max = Math.max.apply(Math, arr)
            ```


3. `bind()`方法
    - 作用：
        1. 修改`this`的指向
        2. <font color="#f54747">不會調用函數</font>
        3. 返回值：原函數修改完`this`指向之後的<font color="#f54747">新函數</font>
    - 語法：
        ```js
        // 參數一、thisAug: this的指向
        // 參數二、args: 傳遞的參數
        funct.call(thisAug, args...)
        ```
    - 主要應用：不需要立即調用，但又希望改變函數的內部`this`指向
        1. 有一個按鈕，點擊後禁用按鈕幾秒鐘
            ```js
            btn.onclick = function(){
                this.disabled = true
                setTimeout(function(){
                    this.disabled = false
                }.bind(this), 3000)
            }
            ```
        2. 如果希望保留內部`this`的指向，可以通過參數傳遞其他指向
            ```js
            class Person{
                btn.onclick = funct.bind(btn, this)     // btn指向button對象，this指向實例對象
            }
            
            function funct(that){}    // 接收this(實例對象)
            ```



## 嚴格模式
1. 簡介：
    - ES5提供了嚴格模式(strict mode)
    - 嚴格模式具有限制性，即在嚴格的條件下運行JS代碼


2. 對JS語義的更改：
    1. 消除了JS語法的一些不合理、不嚴謹之處，減少怪異行為
    2. 消除代碼運行的不安全之處，保證代碼運行的安全
    3. 提高編譯器效率，增加運行速度
    4. 禁用了 ECMAScript 的未來版本中可能會定義的一些語法，為未來新版本的 JavaScript 做好鋪墊
        例如：一些保留字 class, enum, export, extends, import, super 不能作為變量名


3. 為腳本開啟嚴格模式：
    - 寫法：<font color="#f54747">在所有語句之前放一個特定語句`'use strict';`</font>
        ```html
        <script>
            'use strict'    // 開啟嚴格模式
        </script>
        ```


4. 為函數開啟嚴格模式：
    - 寫法：<font color="#f54747">把`'use strict';`聲明放在函數體所有語句之前</font>
        ```js
        function funct(){
            'use strict'    // 開啟嚴格模式
        }
        ```



### 嚴格模式的變化
1. 變量規定：
    1. 函數賦值：
        - 正常模式下，如果一個變量沒有聲明就賦值，默認是全局變量
        - 嚴格模式下，這種用法是禁止的，所有變量必須先聲明再使用
            ```js
            num = 10;   // !!!語法錯誤
            ```

    2. 刪除變量
        - 正常模式下，允許刪除已聲明的變量
        - 嚴格模式下，則嚴禁刪除變量
            ```js
            delete num      // !!!語法錯誤
            ```


2. `this`的指向問題：
    1. 全局作用於指向：
        - 正常模式下，全局作用域函數中的`this`指向`window`對象
        - 嚴格模式下，全局作用域函數中的`this`是`undefined`
            ```js
            function f(){
                console.log(this)   // undefined
            }
            ```

    2. 構造函數調用：
        - 正常模式下，構造函數不加`new`關鍵字也能調用，`this`指向全局對象
        - 嚴格模式下，構造函數必須是使用`new`關鍵字調用，否則`this`指向`undefined`
            ```js
            function Person(){
                this.num = 10
            }
            Person()    // !!!語法錯誤，因為this指向undefined
            ```

    3. 定時器的`this`指向仍然是`window`

    4. 事件、對象還是指向調用者


3. 函數的變化：
    1. 函數不能有重名的參數
        ```js
        function f(x, x){}  // !!!語法錯誤
        ```

    2. 函數必須聲明在頂層
        - 新版的JS會引入「塊級作用域」，為了與新版本接軌，不允許在非函數代碼塊內聲明函數
        ```js
        'use strict'
        if(true){
            function f(){}  // !!!語法錯誤
            f()
        }
        
        for(var i = 0; i < 5; i++){
            function f(){}  // !!!語法錯誤
            f()
        }
        
        function bze(){
            function eit(){}    // 合法
        }
        ```



## 高階函數
- 由於函數也是一種數據類型，同樣可以作為參數，傳遞給另一個函數使用（例如回調函數）
- 對其他函數進行操作的函數就稱為<font color="#f54747">高階函數</font>
    1. 接收函數作為參數
        ```js
        function fn(callback){
            callback && callback()
        }
        fn(function(){alert('Hello')})
        ```

    2. 將函數作為返回值操作
        ```js
        function fn(){
            return function(){}
        }
        fn()
        ```



## 閉包Closure
1. 變量作用域：
    - 函數內部可以使用全局變量
    - 函數外部不可以使用局部變量
    - 當函數執行完畢，本作用域內的局部變量就會銷毀


2. 閉包的簡介：
    - 指有權訪問另一個函數作用域中變量的<font color="#f54747">函數</font>。
    - 就是一個作用域可以訪問另一個作用域內部的局部變量，閉包就產生
        ```js
        function fn(){
            var num = 10
            function fun(){
                console.log(num)    // fun函數作用域 訪問了另一個函數fn裡面的局部變量num
            }
            fun()
        }
        fn()
        ```


3. 閉包的作用：
    - <font color="#f54747">延長變量的作用範圍</font>，因為後面有別的函數要調用此變量
        ```js
        function fn(){
            var num = 10
            return function(){
                console.log(num)
            }
        }
        // 實現 fn 外部的作用域訪問 fn 內部的局部變量
        var f = fun()
        f()
        ```


4. 閉包的應用：
    - 案例一、點擊獲取索引號
        ```js
        // 1. 動態添加方式
        for(var i = 0; i < lis.length; i++){
            lis[i].index = i
            lis[i].onclick = function(){
                console.log(this.index);
            }
        }
        
        // 2. 閉包方式
        for(var i = 0; i < lis.length; i++){
            // 立即執行函數也稱為一個小閉包，因為立即執行函數裡面任何一個函數都可以使用它的i變量
            (function(i){
                lis[i].onclick = function(){
                console.log(i);
            }
        })(i)
        ```

    - 案例二、3秒後打印元素內容
        ```js
        for(var i = 0; i < lis.length; i++){
            (function(i){
                setTimeout(function(){
                    console.log(lis[i].innerHTML);
                }, 3000);
            })(i)
        }
        ```

## 遞歸Recursion
1. 簡介：
    - 一個函數在內部可以調用其本身，這個函數就稱為遞歸函數
    - 由於遞歸很容易發生「棧溢出」錯誤(stack overflow)，所以必須要加<font color="#f54747">退出條件return</font>


2. 遞歸應用：
    - 應用一、階乘 Factorial
        ```js
        function factorial(n){
            switch(n){
                case 0:
                case 1:
                    return 1
                default:
                    return factorial(n - 1) * n
            }
        }
        ```

    - 應用二、斐波那契數列 Fibonacci
        ```js
        function fibonacci(n){
            if(n == 1 || n == 2) return 1
            return fibonacci(n-1) + fibonacci(n-2)
        }
        ```



## 對象拷貝
1. 淺拷貝 Shallow Copy
    - 淺拷貝只是拷貝一層，更深層次對象級別只拷貝地址值
    - 圖示：
        <img src="https://p.ipic.vip/v7v66h.png" width="600px"/>
    - ES6實現淺拷貝方法：
        - 語法：
            ```js
            // 參數一、target: 賦予給誰
            // 參數二、source: 要拷貝的對象
            Object.assign(target, source)
            ```


2. 深拷貝 Deep Copy
    - 深拷貝就是拷貝多層，每一層的數據都會拷貝
    - 圖示：
        <img src="https://p.ipic.vip/s72c3s.png" width="600px"/>
    - 實現方式：
        ```js
        function deepCopy(newObj, oldObj){
            for(var k in oldObj){
                var item = oldObj[k]
                // 由於Array也屬於Object，因此需要在Object之前篩選出去
                if(item instanceof Array){
                    newObj[k] = []
                    deepCopy(newObj[k], item)
                }else if(item instanceof Object){
                    newObj[k] = {}
                    deepCopy(newObj[k], item)
                }else{
                    newObj[k] = item
                }
            }
        }
        ```



# 正則表達式

## 正則表達式的概述
1. 簡介：
    - 正則表達式 (Regular Expression) 是用於匹配字符串中自字符組合的模式
    - 在JavaScript中，正則表達式是一個對象


2. 作用：
    - 用於檢索、替換那些符合某個規則的文本
        1. 匹配：
            - 例如用戶名只能輸入英文字、數字或者下劃線（<font color="#f54747">匹配</font>）
        2. 替換：
            - 過濾掉頁面內容中的一些敏感詞
        3. 提取：
            - 從字符串中獲取想要的特定部分


3. 特點：
    1. 靈活性、邏輯性和功能性非常強
    2. 可以迅速地用極簡單的方式達到字符串的複雜控制
    3. 對於剛接觸的人而言比較難懂
    4. 在實際開發中，一般都是直接複製寫好的正則表達式，但是要求會使用正則表達式，並且根據實際情況修改正則表達式
        - 比如用戶名：`/^[a-z0-9_-](3-16)$`



## 正則表達式的使用
1. 創建正則表達式
    1. 通過調用`RegExp`對象的構造函數創建
        ```js
        var 變量名 = new RegExp(/表達式/)
        ```

    2. 利用字面量創建
        ```js
        var 變量名 = /表達式/
        ```


2. 測試正則表達式
    - 用於檢測字符串是否符合該規則
    - 如果符合規則，則返回`true`
    - 語法：
        ```js
        // regexObj - 正則表達式
        // str - 要測試的文本
        regexObj.test(str)
        ```



## 常用特殊字符

### 邊界符
1. `^` - 表示匹配行首的文本（以什麼開始）
    ```js
    /^abc/      // 表示必須以 abc 為開頭
    ```

2. `$` - 表示匹配行尾的文本（以什麼結束）
    ```js
    /abc$/      // 表示必須以 abc 為結尾
    ```



### 字符類
1. `[]` - 表示有一系列字符可供選擇，只要匹配其中一個就可以
    ```js
    /[abc]/     // 表示必須包含 a 或 b 或 c 其中一個
    /^[abc]$/
    ```


2. `[-]` - 表示內部範圍符
    ```js
    /[a-z]/     // 表示必須包含 a-z 的其中一個
    /[a-zA-Z0-9]/
    ```


3. `[^]` - 表示取反，<font color="#f54747">千萬與邊界符混淆</font>
    ```js
    /[^a-z]/    // 表示不能包含 a-z 的其中一個
    ```



### 量詞符
1. `*` - 表示重複<font color="skyblue">零次或更多次 (`>=0`)</font>
    ```js
    /a*/    // 表示允許出現零次或以上
    ```


2. `+` - 表示重複<font color="skyblue">一次或更多次 (`>=1`)</font>
    ```js
    /a+/    // 表示允許出現一次或以上
    ```


3. `?` - 表示重複<font color="skyblue">零次或一次 (`0||1`)</font>
    ```js
    /a?/    // 表示只允許出現零或一次
    ```


4. `{n}` - 表示重複<font color="skyblue">n次 (`=n`)</font>
    ```js
    /a{3}/  // 表示必須包含三個 a
    ```


5. `{n,}` - 表示重複<font color="skyblue">n次或更多次 (`>=n`)</font>
    ```js
    /a{3,}/  // 表示必須包含三個以上 a
    ```


6. `{n,m}` - 表示重複<font color="skyblue">n到m次 (`>=n && <=m>`)</font>
    ```js
    /a{3,6}/  // 表示必須包含三個到六個 a
    ```



### 括號符
1. `[]` - 表示字符合集，匹配方括號中的任意字符
    ```js
    /[abc]/     // 表示必須包含 a 或 b 或 c 其中一個
    ```


2. `{}` - 表示量詞符，裡面表示重複的次數
    ```js
    /^abc{3}$/  // 表示必須重複三次 c
    ```


3. `()` - 表示優先級
    ```js
    /^(abc){3}$/     // 表示必須重複三次 abc
    ```



### 預定義類
1. `\d` - 表示匹配<font color="skyblue"> 0-9 </font>間的任一數字 (`[0-9]`)


2. `\D` - 表示匹配<font color="skyblue"> 0-9 </font><font color="#f54747">以外</font>的字符 (`[^0-9]`)


3. `\w` - 表示匹配<font color="skyblue">任意的字母、數字和下劃線</font> (`[a-zA-Z0-9_]`)


4. `\W` - 表示匹配<font color="skyblue">除字母、數字和下劃線</font><font color="#f54747">以外</font>的字符 (`[^a-zA-Z0-9_]`)


5. `\s` - 表示匹配<font color="skyblue">空格字符（包括換行符、制表符、空格符等）</font> (`[\t\r\n\v\f]`)


6. `\S` - 表示匹配<font color="skyblue">非空格字符</font> (`[^\t\r\n\v\f]`)



## 字符一覽
| 特殊字符 | 說明 | 例子 |
| :---: | :---: | :---: |
| 邊界符 |||
| `^` | 表示匹配行首的文本（以什麼開始） | `/^abc/` |
| `$` | 表示匹配行尾的文本（以什麼結束） | `/abc$/` |
|  |||
| 字符類 |||
| `[ ]` | 表示字符合集，匹配方括號中的任意字符 | `/[abc]/` |
| `[-]` | 表示內部範圍 | `/[0-9]/` |
| `[^]` | 表示取反 | `/[^0-9]/` |
|  |||
| 量詞符 |||
| `*` | 允許重複零次或以上 | `/^a*$/` |
| `+` | 允許重複一次或以上 | `/^a+$/` |
| `?` | 允許重複零次或一次 | `/^a?$/` |
| `{n}` | 允許重複n次 | `/^a{3}$/` |
| `{n,}` | 允許重複n次或以上 | `/^a{3,}$/` |
| `{n,m}` | 允許重複n次到m次 | `/^a{3,6}$/` |
| `()` | 表示優先級別 | `/^(abc){3}$/` |
| |
| 預定義類 |
| `\d` | 匹配 0-9 之間任意數字 | `/\d{3}/` |
| `\D` | 匹配 0-9 以外任意數字 | `/\D{3}/` |
| `\w` | 表示匹配任意的字母、數字和下劃線 | `/\w{3}/` |
| `\W` | 表示匹配字母、數字和下劃線以外的字符 | `/\W{3}/` |
| `\s` | 表示匹配空格字符 | `/\s{3}/` |
| `\S` | 表示匹配非空格字符 | `/\S{3}/` |



## 正則替換
1. `replace`方法
    - 使用`replace()`方法可以實現替換字符串操作，用來替換的參數是一個字符串或是一個正則表達式
    - 語法：
        ```js
        // 參數一、regexp: 要替換的正則表達式
        // 參數二、replacement: 要替換的內容
        stringObject.replace(regexp/substr, replacement)
        ```
    - 問題：
        1. 只能替換內容中第一個字符組合


2. 正則表達式參數
    - 正則表達式中也可以傳遞參數

    - 語法：
        ```js
        // switch: 修飾符
        /regexp/switch
        ```

    - `switch`修飾符的三種值：
        1. `g` - 全局匹配
        2. `i` - 忽略大小寫
        3. `gi` - 全局匹配和忽略大小寫

    - 具體編碼：
        ```js
        text.value.replace('/fuck|bitch/'gi, '**')
        ```