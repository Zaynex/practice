import { Observable, Subject } from 'rxjs'
import  'jquery'
import 'bootstrap'
require('bootstrap.min.css')
import { createTodoItem, mockHttpRequest, mockToggle, search, HttpResponse } from './lib'
const $input = <HTMLInputElement>document.querySelector('.todo-val')
const $list = <HTMLUListElement>document.querySelector('.list-group')
const $add = document.querySelector(".button-add")

const type$ = Observable.fromEvent<KeyboardEvent>($input, 'keydown')
    .publish()
    .refCount()

const enter$ = type$
    .filter(r => r.keyCode === 13)

const clickAdd$ = Observable.fromEvent<MouseEvent>($add, 'click')

const input$ = enter$.merge(clickAdd$)
// do 操作符一般用来处理 Observable 的副作用，例如操作 DOM，修改外部变量，打 log

//  使用 clearInputSubject$ 在 distinct 第二个参数中可以清除distinct 操作符的缓存
const clearInputSubject$ = new Subject<void>()
const item$ = input$
    .map(() => $input.value)
    .filter(r => r !== '')
    // 如果input值不变值只要忽略后面几次点击的请求即可
    .distinct(null, clearInputSubject$)
    .switchMap(mockHttpRequest)
    .map(createTodoItem)
    .do((ele: HTMLElement) => {
        $list.appendChild(ele)
        $input.value = ''
    })
    .publishReplay(1)
    .refCount();
// const item$ = input$.map(() => $input.value)
//     .filter(r => r !== '')
//     .map(createTodoItem)
//     .do((ele: HTMLElement) => {
//         $list.appendChild(ele)
//         $input.value = ''
//     })
//     .publishReplay(1)
//     .refCount()
    
const toggle$ = item$.mergeMap($todoItem => {
    return Observable.fromEvent<MouseEvent>($todoItem, 'click')
        .debounceTime(300)
        .filter(e => e.target === $todoItem)
        .mapTo({
            data: {
                _id: $todoItem.dataset['id'],
                isDone: $todoItem.classList.contains('done')
            }, $todoItem})
})
.switchMap(result => {
    return mockToggle(result.data._id, result.data.isDone)
        .mapTo(result.$todoItem)
})
    .do(($todoItem: HTMLElement) => {
        if($todoItem.classList.contains('done')) {
            $todoItem.classList.remove('done')
        } else {
            $todoItem.classList.add('done')
        }
    })


const remove$ = item$.mergeMap($todoItem => {
    const $removeButton = $todoItem.querySelector('.button-remove')
    return Observable.fromEvent($removeButton, 'click')
        .mapTo($todoItem)
})
    .do(($todoItem: HTMLElement) => {
        const $parent = $todoItem.parentNode
        $parent.removeChild($todoItem);
    })

const search$ = type$.debounceTime(200)
    .filter(evt => evt.keyCode !== 13)
    .map(result => (<HTMLInputElement>result.target).value)
    .switchMap(search)
    .do((result: HttpResponse | null) => {
        const actived = document.querySelectorAll('.active')
        Array.prototype.forEach.call(actived, (item: HTMLElement) => {
            item.classList.remove('active')
        })
        if(result) {
            const item = document.querySelector(`.todo-item-${result._id}`)
            item.classList.add('active')
        }
    })


const app$ = toggle$.merge(remove$, search$)
    .do(r => console.log(r))

app$.subscribe()


