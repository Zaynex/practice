function Parent(name) {
    this.name = name;
}

Parent.prototype.myName = function() {
    console.log( this.name )
}

function Child(name, label) {
    Parent.call(this, name)
    this.label = label
}

// Child.prototype = Object.create(Parent.prototype)
// Child.prototype = new Parent();
Object.setPrototypeOf(Child.prototype, Parent.prototype)


Child.prototype.myLabel = function(){
    console.log( this.label )
}

var a = new Child('ab', 'obj ab')
a.myName()
a.myLabel()
var b = new Parent('ab', 'obj ab')
b.myName()

Object.defineProperty(Object.prototype, "__proto__", {
    get: function(){
        return Object.getPrototypeOf(this)
    },
    set: function(){
        Object.setPrototypeOf(this, o)
        return o
    }
})


if(!Object.create) {
    Object.create = function(o) {
        function F(){}
        F.prototype = o;
        return new F();
    }
}