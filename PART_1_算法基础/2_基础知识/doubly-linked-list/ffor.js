let profile = {name:"April",nickname:"二十七刻",country:"China"};
for(let i in profile) {
    let item = profile[i];
    console.log(item)// 对象的键值
    console.log(i) // 对象的键对应的值
}
// 遍历数组
let letarr=['a','b','c'];
    for(let i in letarr) {
        let item = letarr[i];
        console.log(item)// 数组下标所对应的元素
        console.log(i)// 索引，数组下标
    }
// 遍历字符串
        let str="abcd"
        for(let i in str){
            let item =str[i];
            console.log(item)// 字符串下标所对应的元素
            console.log(i)// 索引 字符串的下标
        }