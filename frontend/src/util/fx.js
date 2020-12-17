export const curry = action => (value, ...iterator) =>
  iterator.length
    ? action(value, ...iterator)
    : (...iterator) => action(value, ...iterator)

export const Lazy = {}

Lazy.map = curry(function* (action, iterator) {
  for (const value of iterator) yield action(value)
})

Lazy.range = curry(function* (max) {
  let i = 0
  while (i < max) yield i++
})

Lazy.filter = curry(function* (action, iterator) {
  for (const value of iterator) if (action(value)) yield value
})

Lazy.takeNoneDuplicate = function* (iterator) {
  let res = []
  for (const value of iterator) {
    if (!res.includes(value)) {
      res.push(value)
      yield value
    }
  }
}

export const reduce = curry((action, acc, iterator) => {
  if (!iterator) {
    iterator = acc[Symbol.iterator]()
    acc = iterator.next().value
  }
  for (const value of iterator) acc = action(acc, value)
  return acc
})

export const take = curry((length, iterator) => {
  let res = []
  iterator = iterator[Symbol.iterator]()
  for (const value of iterator) {
    res.push(value)
    if (res.length === length) return res
  }
  return res
})

export const go = (...iterator) =>
  reduce((value, action) => action(value), iterator)

export const map = curry((action, iterator) => {
  return iterator.map(action)
})
