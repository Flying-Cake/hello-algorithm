class Node {
    previous
    next
    data
    constructor(data = '',next=null,previous=null) {
        this.data = data
        this.next = next
        this.previous = next
    }
}
class SingleList {
    size
    head
    currentNode
    /**
     * @name 单链表
     * @param size 单链表的长度
     * @param head 单链表的入口
     * @param currentNode 单链表自带的指针指向的节点
     */
    constructor(size = 0,head=new Node('head'),currentNode='') {
        this.size = size
        this.head = head
        this.currentNode = currentNode
    }

    /**
     * @description 在单链表中寻找元素
     * @param value
     * @return Node
     */
    find(value){
        let currentNode = this.head
        while (currentNode && (currentNode.data !== value))currentNode = currentNode.next
        return currentNode
    }
    /**
     * @description 在单链表中插入元素
     * @param item
     * @param data
     * @return {boolean}
     */
    insert(item,data){
        let itemNode = this.find(item)
        if (!itemNode) return false

        let newNode = new Node(data)
        newNode.next = itemNode.next
        itemNode.next = newNode
        this.size++
        this.display()
        return true
    }
    /**
     * @description 在单链表中删除元素
     * @param value
     * @return {boolean}
     */
    remove(value){
        let deleteNode = this.find(value)
        //如果要删除的节点找不到
        if (!deleteNode) return false
        //如果删除的是头结点
        if (value === 'head'){
            //如果链表是空的，就什么也不做，如果不是,那就重置单链表
            if (!(this.isEmpty())){
                return false
            } else {
                this.head.next = null
                return false
            }
        }
        let currentNode = this.head
        while (currentNode.next && currentNode.next.data !== value)currentNode = currentNode.next
        currentNode.next = currentNode.next.next
        deleteNode.next = null
        this.size--
        this.display()
        return true
    }
    /**
     * @description 在单链表的尾部添加节点
     * @param data
     * @return {boolean}
     */
    append(data){
        this.findLast().next = new Node(data)
        this.size++
        this.display()
        return true
    }
    /**
     * @description 获取单链表的最后一个节点
     * @return {*}
     */
    findLast(){
        let currentNode = this.head
        while (currentNode.next) currentNode = currentNode.next
        return currentNode
    }
    /**
     * @description 判断单链表是否为空
     * @return {boolean}
     */
    isEmpty(){
        return this.size === 0
    }
    /**
     * @description 显示链表自带指针所指向的节点
     */
    show(){
        console.log(this.currentNode.data)
    }
    /**
     * @description 获取单链表的长度
     * @return Node
     */
    getLength(){
        return this.size
    }
    /**
     * @description 从当前节点向前移动n个元素
     * @param n
     * @param currentNode
     * @return Node
     */
    advance(n,currentNode = this.head){
        this.currentNode = currentNode
        while ((n--) && this.currentNode.next)this.currentNode = this.currentNode.next
        return this.currentNode
    }

    /**
     * @description 单链表的遍历显示
     */
    display(){
        let result = ''
        let currNode = this.head
        while (currNode) {
            result += currNode.data
            currNode = currNode.next
            if(currNode) {
                result += '->'
            }
        }
        console.log(result)
    }
    /**
     * @description 清空单链表
     */
    clear(){
        this.head.next = null
        this.size = 0
    }
    /**
     * @description 判断是否有闭环 使用快慢指针
     * @return {boolean}
     */
    isLoop(){
        let quick = this.head
        let slow = this.head

        while (quick){
            slow = slow.next
            if (slow.next) quick = quick.next.next
            if(slow === quick){
                console.log('this list has rings')
                return true
            }
        }
        console.log('this list has no rings')
        return false
    }
}
class DoublyLinkedList extends SingleList{
    constructor() {
        super();
    }

    /**
     * 插入节点
     * @param item 要插入的位置
     * @param data 插入的节点数据
     * @return {boolean}
     */
    insert(item, data) {
        if (data === 'head' || data === '') return false
        let currentNode = this.find(item)
        let newNode = new Node(data)

        if (currentNode.next){
            newNode.next = currentNode.next
            newNode.prev = currentNode

            currentNode.next.prev = newNode
            currentNode.next = newNode
        }else{
            currentNode.next = newNode
            newNode.prev = currentNode
        }
        this.size++
        super.display()
        return true
    }

    /**
     * 移除节点
     * @param value 要移除的节点数据
     * @return {boolean}
     */
    remove(value) {
        if (value === '')return false
        //约定了，如果清除的是头节点，那么就清空整个链表
        if (value==='head'){
            this.head.next.prev = null
            this.head.next = null
            this.size = 0
            return true
        }

        let currentNode = this.find(value)
        if (currentNode === false) return false

        if (currentNode.next){
            currentNode.prev.next = currentNode.next
            currentNode.next.prev = currentNode.prev
        } else {
            currentNode.prev.next = null
        }
        currentNode = null
        this.size--
        this.display()
        return true
    }

    /**
     * 反向遍历链表
     */
    reverseDisplay(){
        let result = ''
        let currentNode = this.findLast()
        while (currentNode.data !== 'head') {
            result += `${currentNode.data}->`
            currentNode = currentNode.prev
        }
        result+='head'
        console.log(result)
    }

    /**
     * 在链表末插入节点
     * @param data 节点数据
     * @return {boolean}
     */
    append(data) {
        if (data === 'head' || data === '') return false

        let lastNode = this.findLast()
        let newNode = new Node(data)

        lastNode.next = newNode
        newNode.prev = lastNode

        this.size++
        return true
    }
}

let test = new DoublyLinkedList()

let arr = [1, 2, 3, 4, 5, 6, 7]

for(let i=0; i<arr.length; i++){
    test.append(arr[i])
}

test.display()  // head->1->2->3->4->5->6->7

test.insert(7, 8)

test.insert(`head`, 0.5)

test.reverseDisplay()  // 8->7->6->5->4->3->2->1->0.5->head

test.remove(0.5)  // head->1->2->3->4->5->6->7->8

test.remove(8)
