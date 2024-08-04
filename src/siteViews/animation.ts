export function createAnimation(scrollStart, scrollEnd, valueStart, valueEnd) {
  return function (scroll) {
    if (scroll <= scrollStart) {
      return valueStart
    }

    if (scroll >= scrollEnd) {
      return valueEnd
    }

    return valueStart + (valueEnd - valueStart) * ((scroll - scrollStart) / (scrollEnd - scrollStart))
  }
}

export function mapRange(in_min: number, in_max: number, input: number, out_min: number, out_max: number) {
  if (input < in_min) {
    return out_min
  }

  if (input > in_max) {
    return out_max
  }

  return ((input - in_min) / (in_max - in_min)) * (out_max - out_min) + out_min
}
