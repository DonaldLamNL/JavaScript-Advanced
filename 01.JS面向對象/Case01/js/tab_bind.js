// var that
class Tab{
    constructor(id){
        // 獲取元素
        // that = this
        this.main = document.querySelector(id)
        this.add = this.main.querySelector('.tabadd')
        
        this.ul = this.main.querySelector('.fisrstnav ul')
        this.fsection = this.main.querySelector('.tabscon')
        this.init()
    }

    // 初始化操作
    init(){
        this.updateNode()
        this.add.onclick = this.addTab.bind(this.add, this)
        for(var i = 0; i < this.lis.length; i++){
            this.lis[i].index = i
            this.lis[i].onclick = this.toggleTab.bind(this.lis[i], this)
            this.remove[i].onclick = this.removeTab.bind(this.remove[i], this)
            this.spans[i].ondblclick = this.editTab
            this.sections[i].ondblclick = this.editTab
        }
    }

    // 由於動態添加元素時，需要重新獲取相對應的元素
    updateNode(){
        this.lis = this.main.querySelectorAll('li')
        this.sections = this.main.querySelectorAll('section')
        this.remove = this.main.querySelectorAll('.icon-guanbi')
        this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child')
    }

    // 1. 切換功能
    toggleTab(that){
        that.clearClass()
        this.className = 'liactive'
        that.sections[this.index].className = 'conactive'
    }
    clearClass(){
        for(var i = 0; i < this.lis.length; i++){
            this.lis[i].className = ''
            this.sections[i].className = ''
        }
    }
    // 2. 添加功能
    addTab(that){
        // 清楚所有 li 和 section
        that.clearClass()
        // 創建li元素和section元素
        var li = '<li class="liactive"><span>新增標籤</span><span class="iconfont icon-guanbi"></span></li>'
        var section = '<section class="conactive">新增內容</section>'
        // 把元素追加到對應的父元素裡面
        that.ul.insertAdjacentHTML('beforeend',li)
        that.fsection.insertAdjacentHTML('beforeend',section)
        that.init()
    }

    // 3. 刪除功能
    removeTab(that, e){
        // 阻止事件冒泡
        e.stopPropagation()
        // 獲取其父親的索引號
        var index = this.parentNode.index
        // remove() 方法直接刪除元素
        that.lis[index].remove()
        that.sections[index].remove()
        that.init()

        // 當刪除非當前元素時，則保持不變
        if(document.querySelector('.liactive')){
            return
        }
        // 當刪除當前元素時，讓前一個li處於選定狀態
        // index = index === 0 ? index : index - 1
        index--
        // 手動調用點擊事件，不需要鼠標觸發
        that.lis[index] && that.lis[index].click()
    }

    // 4. 修改功能
    editTab(){
        var str = this.innerHTML
        // 雙擊禁止選定文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty()
        // alert(1)
        this.innerHTML = '<input type="text"/>'
        var input = this.children[0]
        input.value = str
        input.select()   // 讓文字處於選定狀態

        // 離開文本框時把指給span
        input.onblur = function(){
            this.parentNode.innerHTML = this.value
        }
        input.onkeyup = function(e){
            if(e.keyCode === 13){
                // 手動調用表單失去焦點事件
                this.blur()
            }
        }

    }
}

new Tab('#tab')