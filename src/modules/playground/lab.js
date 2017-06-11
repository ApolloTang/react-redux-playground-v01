import {createStore, applyMiddleware, compose} from 'redux';

export default function() {

  function* generator() {
    yield 'f'
    yield 'o'
    yield 'o'
  }
  var g = generator()
  // a generator object g is built using the generator function
  console.log(typeof g[Symbol.iterator])// === 'function'
  // it's an iterable because it has an @@iterator
  typeof g.next === 'function'
  // it's also an iterator because it has a .next method
  g[Symbol.iterator]() === g
  // the iterator for a generator object is the generator object itself
  console.log([...g])
  // <- ['f', 'o', 'o']
  console.log(Array.from(g))
  // <- ['f', 'o', 'o']
  console.log('helxxxxxxxxlo');

}
