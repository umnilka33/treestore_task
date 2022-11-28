class TreeStore {

    constructor() {
        this.items = items;
    }

    getAll() {
        //Должен возвращать изначальный массив элементов.
        return items;
    }

    getItem(id) {
        //Принимает id элемента и возвращает сам объект элемента;
        return items.find(el => el.id == id);
    }

    getChildren(id) {
        /* Принимает id элемента и возвращает массив элементов, являющихся дочерними для того элемента,
        * чей id получен в аргументе. Если у элемента нет дочерних, то должен возвращаться пустой массив;
        */
        return items.filter(el => el.parent == id);
    }

    getAllChildren(id) {
        /*Принимает id элемента и возвращает массив элементов, являющихся прямыми дочерними элементами того,
        * чей id получен в аргументе + если у них в свою очередь есть еще дочерние элементы, они все тоже будут включены в результат,
        * и так до самого глубокого уровня.
        * */
       let childArray = [];
       
        AllChildrenRec(id);

        function AllChildrenRec(child_id) {
            for(let i = 0; i < items.length; i++){
                if(items[i].parent == child_id){
                    AllChildrenRec(items[i].id);
                    childArray.push(items[i]);
                }
            }
        }
        return childArray;
    }

    getAllParents(id) {
        /*Принимает id элемента и возвращает массив из цепочки родительских элементов,
        * начиная от самого элемента, чей id был передан в аргументе и до корневого элемента,
        * т.е. должен получиться путь элемента наверх дерева через цепочку родителей к корню дерева. 
        * в результате getAllParents ПОРЯДОК ЭЛЕМЕНТОВ ВАЖЕН!
        */
        let parentArray = [];
        if(this.getItem(id) !== undefined){
            let parent = this.getItem(id).parent;
            while(parent !== 'root'){
                for(let i = 0; i < items.length; i++){
                    if(items[i].id == parent){
                        parentArray.push(items[i]);
                        parent = items[i].parent;
                    }
                }
            }
        }
        return parentArray;
    }

}

const items = [
    { id: 1, parent: 'root' },
    { id: 2, parent: 1, type: 'test' },
    { id: 3, parent: 1, type: 'test' },

    { id: 4, parent: 2, type: 'test' },
    { id: 5, parent: 2, type: 'test' },
    { id: 6, parent: 2, type: 'test' },

    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null },
];

const ts = new TreeStore(items);
/*
console.log('all items', ts.getAll());
console.log('just item', ts.getItem(7));
console.log('children', ts.getChildren(4));
console.log('children', ts.getChildren(5));
console.log('children', ts.getChildren(2));
console.log('ALL children', ts.getAllChildren(2));
console.log('ALL parents', ts.getAllParents(7));
*/
module.exports = ts;