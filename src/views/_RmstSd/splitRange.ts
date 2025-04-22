// 将一个跨行的 range 切割为多个不跨行的 range
export function splitRange(node: Text, startOffset: number, endOffset: number): Range[] {
  const range = document.createRange()
  const rowTop = getCharTop(node, startOffset)
  // 字符数小于两个不用判断是否跨行
  // 头尾高度一致说明在同一行
  if (endOffset - startOffset < 2 || rowTop === getCharTop(node, endOffset - 1)) {
    range.setStart(node, startOffset)
    range.setEnd(node, endOffset)
    return [range]
  } else {
    const last = findRowLastChar(rowTop, node, startOffset, endOffset - 1)
    range.setStart(node, startOffset)
    range.setEnd(node, last + 1)
    const others = splitRange(node, last + 1, endOffset)
    return [range, ...others]
  }
}

// 二分法找到 range 某一行的最右字符
function findRowLastChar(top: number, node: Text, start: number, end: number): number {
  if (end - start === 1) {
    return getCharTop(node, end) === top ? end : start
  }
  const mid = Math.floor((end + start) / 2)
  return getCharTop(node, mid) === top ? findRowLastChar(top, node, mid, end) : findRowLastChar(top, node, start, mid)
}

// 获取 range 某个字符位置的 top 值
function getCharTop(node: Text, offset: number) {
  return getCharRect(node, offset).top
}

// 获取 range 某个字符位置的 DOMRect
function getCharRect(node: Text, offset: number) {
  const range = document.createRange()
  range.setStart(node, offset)
  range.setEnd(node, offset + 1 > node.textContent!.length ? offset : offset + 1)
  return range.getBoundingClientRect()
}
