import { Observable } from 'rxjs'
import  'jquery'
import 'bootstrap'
require('bootstrap.min.css')
import { createTodoItem } from './lib'
const $input = <HTMLInputElement>document.querySelector('.todo-val')
const $list = <HTMLUListElement>document.querySelector('.list-group')
// const input$ = Observable.fromEvent<KeyboardEvent>($input, 'keydown')
//     .filter(r => r.keyCode === 13)
//     .do(e => console.log(e))
const $add = document.querySelector(".button-add")
const enter$ = Observable.fromEvent<KeyboardEvent>($input, 'keydown')
    .filter(r => r.keyCode === 13)

const clickAdd$ = Observable.fromEvent<MouseEvent>($add, 'click')

const input$ = enter$.merge(clickAdd$)
// do 操作符一般用来处理 Observable 的副作用，例如操作 DOM，修改外部变量，打 log

const item$ = input$.map(() => $input.value)
    .filter(r => r !== '')
    .map(createTodoItem)
    .do((ele: HTMLElement) => {
        $list.appendChild(ele)
        $input.value = ''
    })
    .publishReplay(1)
    .refCount()
    
const toggle$ = item$.mergeMap($todoItem => {
    return Observable.fromEvent<MouseEvent>($todoItem, 'click')
        .filter(e => e.target === $todoItem)
        .mapTo($todoItem)
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

const app$ = toggle$.merge(remove$)
    .do(r => console.log(r))

app$.subscribe()


