let arr = [
    {id: 1, name: '部门1', pid: 0},
    {id: 2, name: '部门2', pid: 1},
    {id: 3, name: '部门3', pid: 1},
    {id: 4, name: '部门4', pid: 3},
    {id: 5, name: '部门5', pid: 4},
]
/*let result = []
let start = {}
//获取最顶层的部门
arr.forEach(item=>{
    if (item.pid < start) {
        start.pid = item.pid
        start.name = item.name
        start.id = item.id
        start.children = []
    }
})
result.push(start)
//将原数组的数据搬运到树中
const remove = (item) =>{
    遍历
}

//循环遍历原数组，并对原数组进行删减操作*/
/**
 * 递归查找，获取children
 */
const getChildren = (data, result, pid) => {
    for (const item of data) {
        if (item.pid === pid) {
            const newItem = {...item, children: []}
            result.push(newItem)
            getChildren(data, newItem.children, item.id)
        }
    }
}

/**
 * 转换方法
 */
/*const arrayToTree = (data, pid) => {
    const result = [];
    getChildren(data, result, pid)
    return result;
}*/
function arrayToTree(items) {
    const result = [];   // 存放结果集
    const itemMap = {};  //

    // 先转成map存储
    for (const item of items) {
        itemMap[item.id] = {...item, children: []}
    }

    for (const item of items) {
        const id = item.id;
        const pid = item.pid;
        const treeItem =  itemMap[id];
        if (pid === 0) {
            result.push(treeItem);
        } else {
            if (!itemMap[pid]) {
                itemMap[pid] = {
                    children: [],
                }
            }
            itemMap[pid].children.push(treeItem)
        }

    }
    return result;
}

console.log(JSON.stringify(arrayToTree(arr)))