//timer that works everywhere
let getTime: () => number
if (typeof performance != 'undefined') {
  getTime = performance.now.bind(performance)
} else if (typeof Date != 'undefined' && Date.now) {
  getTime = Date.now.bind(Date)
  // @ts-ignore
} else if (typeof process != 'undefined') {
  getTime = function () {
    // @ts-ignore
    var t = process.hrtime()
    return t[0] * 0.001 + t[1] * 1e-6
  }
} else {
  getTime = function getTime() {
    return new Date().getTime()
  }
}

export default getTime
