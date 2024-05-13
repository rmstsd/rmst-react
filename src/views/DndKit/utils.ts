let id = 50
export function genOnlyKey() {
  return ++id
}

export function randomString() {
  return Math.random()
    .toString(36)
    .substring(2, 15)
    .repeat(Math.ceil(Math.random() + 10))
}
