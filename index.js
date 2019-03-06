const data = [
    { start: 1, end: 20, action: 'ADDED' },
    { start: 55, end: 58, action: 'ADDED' },
    { start: 60, end: 89, action: 'ADDED' },
    { start: 15, end: 31, action: 'ADDED' },
    { start: 10, end: 15, action: 'ADDED' },
    { start: 1, end: 20, action: 'REMOVED' }
];

const data2 = [
    { start: 1, end: 20, action: 'ADDED' },
    { start: 55, end: 58, action: 'ADDED' },
    { start: 60, end: 89, action: 'ADDED' },
    { start: 15, end: 31, action: 'ADDED' },
    { start: 10, end: 15, action: 'ADDED' },
    { start: 1, end: 20, action: 'REMOVED' },
    { start: 60, end: 89, action: 'REMOVED' },
];

const data3 = [
    { start: 1, end: 20, action: 'ADDED' },
    { start: 55, end: 58, action: 'ADDED' },
    { start: 60, end: 89, action: 'ADDED' },
    { start: 15, end: 31, action: 'ADDED' },
    { start: 10, end: 15, action: 'ADDED' },
    { start: 1, end: 20, action: 'REMOVED' },
    { start: 60, end: 89, action: 'REMOVED' },
    { start: 10, end: 15, action: 'REMOVED' },
    { start: 7, end: 21, action: 'ADDED' },
];

const filterArray = (arr, action) => arr.filter(obj => {
    if(obj.action === action) {
        return obj;
    }
});

const filterRemoved = (removedArr, addedArr) => {
    const props = ['start', 'end'];
    return addedArr.filter(add => {
        return !removedArr.some(rem => {
            return add.start === rem.start && add.end === rem.end;
        });
    }).map(obj => {
        return props.reduce((newObj, start) => {
            newObj[start] = obj[start];
            return newObj;
        }, {});
    });
};

const merge = (arr, num) => {
    return filterRemoved(filterArray(arr, 'REMOVED'), filterArray(arr, 'ADDED'))
        .sort((a, b) =>  a.start - b.start || a.end - b.end)
        .reduce((arr, obj) => {
            const stack = arr[arr.length - 1] || [];
            if (stack.start <= obj.start && obj.start <= (stack.end + num)) {
                if (stack.end < obj.end) {
                    stack.end = obj.end;
                }
                return arr;
            }
            return arr.concat(obj);
        }, []);
};

console.log('merged',merge(data, 7));

console.log('merged2',merge(data2, 7));

console.log('merged3',merge(data3, 6));
