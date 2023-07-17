export const ani = (initialValue: number) => {
  let currValue = initialValue

  const per = 20
  let timer: number

  const getCurr = () => {
    return currValue
  }

  const start = (endValue: number, cb: (curr: number) => void) => {
    cancelAnimationFrame(timer)

    function animate() {
      if (endValue === currValue) {
        return
      }

      if (endValue > currValue) {
        currValue += per
        if (currValue > endValue) {
          currValue = endValue
        }
      } else {
        currValue -= per
        if (currValue < endValue) {
          currValue = endValue
        }
      }

      cb(currValue)

      timer = requestAnimationFrame(animate)
    }

    timer = requestAnimationFrame(animate)
  }

  const stop = () => {
    cancelAnimationFrame(timer)
  }

  return { getCurr, start, stop }
}
