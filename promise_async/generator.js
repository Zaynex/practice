function Iter (value) {
  this.value = value
  this.next = null
}

Iter.prototype[Symbol.iterator] = function () {
  const iterator = { next: next }
  let current = this

  function nect () {
    if (current) {
      let value = current.value
      current = current.next
      return { done: false, value: value }
    }
  }
  return iterator
}

const one = new Iter(1)
const two = new Iter(2)
const three = new Iter(3)

one.next = two
two.next = three

for (let i of one) {
  console.log(i)
}