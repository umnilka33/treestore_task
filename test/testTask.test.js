const ts = require('../task/testTask.js');

test('TEST getAll()', 
() => {
    expect(ts.getAll()).toStrictEqual([
        { id: 1, parent: 'root' },
        { id: 2, parent: 1, type: 'test' },
        { id: 3, parent: 1, type: 'test' },
    
        { id: 4, parent: 2, type: 'test' },
        { id: 5, parent: 2, type: 'test' },
        { id: 6, parent: 2, type: 'test' },
    
        { id: 7, parent: 4, type: null },
        { id: 8, parent: 4, type: null },
    ])
})

test('TEST getItem(id) where id = 1', 
() => {
    expect(ts.getItem(1)).toStrictEqual({ id: 1, parent: 'root' })
});

test('TEST getItem(id) where id is undefined', 
() => {
    expect(ts.getItem(12)).toBeUndefined();
});

test('TEST getChildren(id) where id = 4', 
() => {
    expect(ts.getChildren(4)).toStrictEqual([{"id":7,"parent":4,"type":null},{"id":8,"parent":4,"type":null}])
});

test('TEST getChildren(id) with no children', 
() => {
    expect(ts.getChildren(5)).toStrictEqual([])
});

test('TEST getAllChildren(id) where id = 2', 
() => {
    expect(ts.getAllChildren(2)).toStrictEqual([{"id":7,"parent":4,"type":null},{"id":8,"parent":4,"type":null},{"id":4,"parent":2,"type":"test"},{"id":5,"parent":2,"type":"test"},{"id":6,"parent":2,"type":"test"}])
});

test('TEST getAllChildren(id) with no children', 
() => {
    expect(ts.getAllChildren(12)).toStrictEqual([])
});

test('TEST getAllParents(id) where id = 7', 
() => {
    expect(ts.getAllParents(7)).toStrictEqual([{"id":4,"parent":2,"type":"test"},{"id":2,"parent":1,"type":"test"},{"id":1,"parent":"root"}])
});

test('TEST getAllParents(id) with no children', 
() => {
    expect(ts.getAllParents(12)).toStrictEqual([])
});