export const genRects = (length, clientWidth, clientHeight) => {
  const randomRects = Array.from({ length }, () => {
    const x = Math.floor(100 + Math.random() * (clientWidth - 200))
    const y = Math.floor(100 + Math.random() * (clientHeight - 200))
    const width = Math.floor(Math.random() * 10)
    const height = Math.floor(Math.random() * 10)
    const fill = '#' + Math.floor(Math.random() * 16777215).toString(16)

    return {
      x,
      y,
      width,
      height,
      fill
    }
  })

  return randomRects
}
