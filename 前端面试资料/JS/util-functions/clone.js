var clone = (function(){
  // classify object
  var classof = function(o){
    if (o === null) { return "null"; }
    if (o === undefined) { return "undefined"; }
    // I suppose Object.prototype.toString use obj.constructor.name
    // to generate string
    var className = Object.prototype.toString.call(o).slice(8,-1);
    return className;
  };
  
  var references = null;

  var handlers = {
    // Handle regexp and date even in shallow.
    'RegExp': function(reg) {
      var flags = '';
      flags += reg.global ? 'g' : '';
      flags += reg.multiline ? 'm' : '';
      flags += reg.ignoreCase ? 'i' : '';
      return new RegExp(reg.source, flags);
    },
    'Date': function(date) {
      return new Date(+date);
    },
    'Array': function(arr, shallow) {
      var newArr = [], i;
      for (i=0; i<arr.length; i++) {
        if (shallow) {
          newArr[i] = arr[i];
        } else {
          // handle circular reference
          if (references.indexOf(arr[i]) !== -1) {
            continue;
          }
          var handler = handlers[classof(arr[i])];
          if (handler) {
            references.push(arr[i]);
            newArr[i] = handler(arr[i], false);
          } else {
            newArr[i] = arr[i];
          }
        }
      }
      return newArr;
    },
    'Object': function(obj, shallow) {
      var newObj = {}, prop, handler;
      for (prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          // escape prototype properties
          if (shallow) {
            newObj[prop] = obj[prop];
          } else {
            // handle circular reference
            if (references.indexOf(obj[prop]) !== -1) {
              continue;
            }
            // recursive
            handler = handlers[classof(obj[prop])];
            if (handler) {
              references.push(obj[prop]);
              newObj[prop] = handler(obj[prop], false);
            } else {
              newObj[prop] = obj[prop];
            }
          }
        }
      }
      return newObj;
    }
  };

  return function(obj, shallow) {
    // reset references
    references = [];
    // default to shallow clone
    shallow = shallow === undefined ? true : false;
    var handler = handlers[classof(obj)];
    return handler ? handler(obj, shallow) : obj;
  };
}());

(function(){
  // Following is some tests
  var date = new Date();
  var reg = /hello word/gi;
  var obj = {
    prop: 'this ia a string',
    arr: [1,2,3],
    o: {
      wow: 'aha'
    }
  };
  var refer1 = {
    arr: [1,2,3]
  };
  var refer2 = {
    refer: refer1
  };
  refer1.refer = refer2;

  var cloneDate = clone(date, false);
  var cloneReg = clone(reg, false);
  var cloneObj = clone(obj, false);
  alert( (date !== cloneDate) && (date.valueOf() === cloneDate.valueOf()) );
  alert( (cloneReg !== reg) && (reg.toString() === cloneReg.toString()) );
  alert( (obj !== cloneObj) && (obj.arr !== cloneObj.arr) && (obj.o !== cloneObj.o) && (JSON.stringify(obj) === JSON.stringify(cloneObj)) );

  clone(refer2, false);
  alert("I'm not dead yet!");
  // Output:
  // true
  // true
  // true
  // I'm not dead yet!
}());
