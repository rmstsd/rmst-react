import axios from 'axios'
import { useEffect, useRef, useState } from 'react'

const ScrollList = () => {
  const [list, setList] = useState([])
  const wrapperRef = useRef<HTMLDivElement>(null)

  const initTotalSize = useRef(0)
  const loadMoreLoading = useRef(false)
  const pageNoRef = useRef(1)

  useEffect(() => {
    getList(true)
  }, [])

  const getList = (isInitialize?: boolean) => {
    const { clientWidth, clientHeight } = wrapperRef.current

    const rowSize = Math.floor(clientWidth / 200)
    const rowCount = Math.ceil(clientHeight / 140)

    if (isInitialize) initTotalSize.current = rowCount * rowSize

    const pageNo = isInitialize ? pageNoRef.current : initTotalSize.current / rowCount + 1 + pageNoRef.current

    const pageSize = isInitialize ? rowSize * rowCount : rowSize

    axios
      .get('http://8.142.164.165:8181/studio/project/getUserProject', {
        headers: { authorization: 'f3288516461c481b91e43c221f0fac44' },
        params: { pageNo, pageSize }
      })
      .then(res => {
        console.log(res.data.result)

        setList(list.concat(res.data.result.list))

        loadMoreLoading.current = false
      })
  }

  const onScroll = evt => {
    const { clientHeight, scrollHeight, scrollTop } = wrapperRef.current

    if (clientHeight + scrollTop > scrollHeight - 20) {
      if (loadMoreLoading.current) return
      loadMoreLoading.current = true

      pageNoRef.current++
      getList()
    }
  }

  return (
    <div ref={wrapperRef} className="scroll-list-wrapper" onScroll={onScroll}>
      <section className="scroll-list-container">
        {list.map(item => (
          <div className="scroll-list-item" key={item.projectId}>
            {item.appName}
          </div>
        ))}
      </section>

      <h1>loading...</h1>
    </div>
  )
}

export default ScrollList
