/**
 * test case 1
 */

var book = {
    title: 'Professional JavaScript',
    authors: [
        'Nicholas C'
    ],
    year: 2011
};

var jsonText = JSON.stringify(book);


/**
 * test case 2
 */

var book = {
    title: 'Professional JavaScript',
    authors: [
        'Nicholas C'
    ],
    year: 2011,
    toJSON: function(){
        return this.title
    }
};

var jsonText = JSON.stringify(book);

/**
 * test case 3
 */

var book = {
    title: 'Professional JavaScript',
    authors: [
        'Nicholas C'
    ],
    year: 2011
};
// 过滤属性 authors
var jsonText = JSON.stringify(book, ["authors"]);
console.log(jsonText) // {"authors":["Nicholas C"]}

/**
 * test case 4
 */

var book = {
    title: 'Professional JavaScript',
    authors: [
        'Nicholas C', 'Zaynex'
    ],
    year: 2011
};
// 过滤属性 authors
var jsonText = JSON.stringify(book, function(key, value){
    switch(key) {
        case "authors": 
            return value.join(',');
        case 'year':
            return 2017;
        default:
            return value;
    }
});
console.log(jsonText) // {"title":"Professional JavaScript","authors":"Nicholas C,Zaynex","year":2017}


/**
 * test case 5
 */

var book = {
    title: 'Professional JavaScript',
    authors: [
        'Nicholas C'
    ],
    year: 2011
};
// 设置缩进 4格
var jsonText = JSON.stringify(book, null, 4);
console.log(jsonText)
/*
{
    "title": "Professional JavaScript",
    "authors": [
        "Nicholas C"
    ],
    "year": 2011
}
*/

console.log('分隔符')
/**
 * test case 6
 */
var book = {
    title: 'Professional JavaScript',
    authors: [
        'Nicholas C', 'Zaynex'
    ],
    year: 2011,
    toJSON: function(){
        //  自定义JSON.stringify()
        return {year: this.year}
    }
};
// 过滤属性 authors
var jsonText = JSON.stringify(book, function(key, value){
    switch(key) {
        case "authors": 
            return value.join(',');
        case 'year':
            return value + '2017';
        default:
            return value;
    }
});
console.log(jsonText) // {"year":"20112017"}


/**
 * test case 7
 */

var book = {
    title: 'Professional JavaScript',
    authors: [
        'Nicholas C', 'Zaynex'
    ],
    year: 2011,
    toJSON: function(){
        //  自定义JSON.stringify()
        return this.year;
    }
};
// 过滤属性 authors
var jsonText = JSON.stringify(book, ['authors']);
var jsonText = JSON.stringify(book, function(key, value){
    switch(key) {
        case "authors": 
            return value.join(',');
        case 'year':
            return value + '1';
        default:
            return value;
    }
});
console.log(jsonText); // 2011