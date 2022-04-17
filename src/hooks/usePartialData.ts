import { useLayoutEffect, useRef, useState } from 'react'

// 初始渲染的时候分批渲染
export const usePartialData = (wholeList: unknown[]) => {
  const [data, setData] = useState([])
  const firstRenderRef = useRef(true)

  useLayoutEffect(() => {
    let start = 0
    const pageSize = 150
    let timer = null
    const load = list => {
      if (list.length === wholeList.length) {
        firstRenderRef.current = false
        return
      }

      timer = setTimeout(() => {
        const nvList = list.concat(wholeList.slice(start, start + pageSize))
        setData(nvList)
        start += pageSize

        load(nvList)
      }, 50)
    }
    if (firstRenderRef.current) load([])
    else setData(wholeList)

    return () => {
      firstRenderRef.current && clearTimeout(timer)
    }
  }, [wholeList])

  return data
}
