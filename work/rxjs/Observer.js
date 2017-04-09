class Subject {
	constructor(){
		this.observerCollection = [];
	}

	registerObserver(observer) {
		this.observerCollection.push(observer);
	}

	unregisterObserver(observer) {
		// 如果没传参数，则认为所有都被unregister
		if(observer){
			let index = this.observerCollection.indexOf(observer);
			if(~index) this.observerCollection.splice(index, 1);
		} else {
			this.observerCollection.length = 0;
		}
	}

	notifyObservers() {
		this.observerCollection.forEach((observer) => observer.notify());
	}
}

class Observer {
	constructor(name) {
		this.name = name;
	}
	notify() {
		console.log(`${this.name} has been notified`);
	}
}

let subject = new Subject(); // 创建主题对象

let observer1 = new Observer('观察者1');// 创建观察者1
let observer2 = new Observer('观察者2'); // 观察者2

subject.registerObserver(observer1); // 注册观察者1
subject.registerObserver(observer2); // 注册观察者2

subject.notifyObservers();// 通过观察者
subject.unregisterObserver(observer1); // 移除观察者1

subject.notifyObservers();// 通过观察者


function makeIterator(array){
	var nextIndex = 0;
	return {
		next: function(){
			return nextIndex < array.length ? 
				{value: array[nextIndex++], done: false} :
				{done: true};
		}
	}
}

var arr = makeIterator(['a', 'b', 'c']);
console.log(arr.next().value); // a
console.log(arr.next().value); // b
console.log(arr.next().value); // c
console.log(arr.next().value, arr.next().done); // undefined  true


let arres6 = ['a', 'b', 'c'];
let iter = arres6[Symbol.iterator]();
iter.next(); // {value: 'a', done: false};


class DataSource {
	constructor() {
		let i = 0;
		this._id = setInterval(() => this.emit(i++), 200);
	}

	emit(n) {
		const limit = 10;
		if(this.ondata) {
			this.ondata(n);
		}
		if(n === limit) {
			if(this.oncomplete) {
				this.oncomplete()
			}
			this.destroy();
		}
	}
	destroy() {
		clearInterval(this._id);
	}
}

function myObservable(observer) {
	let datasource = new DataSource();
	datasource.ondata = (e) => observer.next(e);
	datasource.onerror = (err) => observer.error(err);
	datasource.oncomplete = () => observer.complete();
	return () => {
		datasource.destroy();
	};
}

const unsub = myObservable({
	next(x) {console.log(x)},
	error(err) {console.log(err);},
	complete() {console.log('done')}
});


class SafeObserver {
	constructor(destination) {
		this.destination = destination;
	}

	next(value) {
		if(!this.isUnsubscribed && this.destination.next) {
			try {
				this.destination.next(value);
			} catch(err) {
				this.unsubscribe();
				throw err;
			}
		}
	}
	error(err) {
		if(!this.isUnsubscribed && this.destination.error) {
			try {
				this.destination.error(err);
			}catch (e2) {
				this.subscribe();
				throw e2
			}
			this.unsubscribe()
		}
	}

	complete() {
		if(!this.isUnsubscribed && this.destination.complete) {
			try {
				this.destination.complete();
			} catch(err) {
				this.unsubscribe();
				throw err;
			}
			this.unsubscribe();
		}
	}

	unsubscribe() {
		this.isUnsubscribed = true;
		if(this.unsub) {
			this.unsub();
		}
	}
}

function myObservable(observer) {
	const safeObserver = new SafeObserver(observer);
	const datasource = new DataSource();
	datasource.ondata = (e) => safeObserver.next(e);
	datasource.onerror = (err) => safeObserver.error(err);
	datasource.oncomplete = () => safeObserver.complete();

	safeObserver.unsub = () => {
		datasource.destroy()
	};

	//绑定this上下文，返回 unsubscribe方法
	return safeObserver.unsubscribe.bind(safeObserver);
}
const  unsub = myObservable({
	next(x) {console.log(x);},
	error(err) {console.log(err)},
	complete() {console.log('done')}
});



class Observable {
	constructor(_subscribe) {
		this._subscribe = _subscribe
	}
	subscribe(observer) {
		const safeObserver = new SafeObserver(observer);
		safeObserver.unsub = this._subscribe(safeObserver);
		return safeObserver.unsubscribe.bind(safeObserver);
	}
}

function map(source, project) {
	return new Observable((obsever) => {
		const mapObserver = {
			next: (x) => observer.next(project(x)),
			error: (err) => observer.error(err),
			complete: () => observer.complete()
		};
		return source.subscribe(mapObserver);
	});
}

const myObservable = new myObservable((observer) => {
	const datasource = new DataSource();
	datasource.ondata = (e) => observer.next(e);
	datasource.onerror = (err) => observer.error(err);
	datasource.oncomplete = () => observer.complete();

	return () => datasource.destroy();
});


// const unsub = map(myObservable, (x) => x + x).subscribe({
// 	next(x) {console.log(x)},
// 	error(err) {console.log(err);},
// 	complete() {console.log('done')}
// });


function pipe(initialValue, ...fns) {
	return fns.reduce((state, fn) => fn(state), initialValue);
}

const myObservable = new Observable((observer) => {
	const datasource = new DataSource();
	datasource.ondata = (e) => observer.next(e);
	datasource.onerror = (err) => observer.error(err);
	datasource.oncomplete = () => observer.complete();

	return () => datasource.destroy();
});

const unsub = pipe(myObservable, map(x => x + x), map(x => x + '!')).subscribe({
	next(x) {console.log(x);},
	error(err) {console.log(err)},
	complete() {console.log('done')}
});



Observable.prototype.map = function (project) {
	return new Observable((observer) => {
		const mapObserver = {
			next: (x) => observer.next(project(x)),
			error: (err) => observer.error(err),
			complete: () => observer.complete()
		}
		return this.subscribe(mapObserver);
	})
}


// function listen(element, eventName) {
// 	return new Observable(observer => {
// 		let handler = event => observer.next(event);

// 		element.addEventListener(eventName, handler, true);

// 		return () => {
// 			element.removeEventListener(eventName, handler, true);
// 		}
// 	})
// }

// function commandKeys(element) {
// 	let keyCommands = { '38': 'up', '40': 'down'};

// 	return listen(element, 'keydown')
// 		.filter(event => event.keyCode in keyCommands)
// 		.map(event => keyCommands[event.keyCode])
// };

// let subscription = commandKeys(inputElement).subscribe({
// 	next(val) {console.log('receive key command' + val)},
// 	errror(err) {console.log('receive an error ' + err)},
// 	complete() {console.log('stream complete')}
// });

// subscription.unsubscribe();