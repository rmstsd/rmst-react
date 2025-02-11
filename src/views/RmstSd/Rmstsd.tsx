import { useEffect } from 'react'
import './style.less'
import { sleepAsync, sleepSync } from '@/utils/utils'
import { splitRange } from './splitRange'
import platform from 'platform'
import { Grid } from '@arco-design/web-react'
import GridSys from './GridSys'
import FlexboxGrid from './FlexboxGrid'
const Row = Grid.Row
const Col = Grid.Col

export default function Rmstsd() {
  console.log(platform)
  useEffect(() => {
    const div = document.querySelector('div')
    const overlay = document.querySelector('.overlay')

    const sel = window.getSelection()

    div.onclick = async evt => {
      const range = sel.getRangeAt(0)

      console.log(range)

      const node = range.startContainer

      const aa = splitRange(node, range.startOffset, range.endOffset)

      for (const item of aa) {
        await sleepAsync(2000)
        console.log(item)

        sel.removeAllRanges()

        sel.addRange(item)
      }

      console.log(aa)

      return
    }

    const isHitText = (x, y, rangeRect) => {
      const width = 30
      const height = 20

      const halfWidth = width / 2
      const halfHeight = height / 2

      const points = [
        { x, y },
        { x: x - halfWidth, y: y - halfHeight },
        { x, y: y - halfHeight },
        { x: x + halfWidth, y: y - halfHeight },
        { x: x + halfWidth, y },
        { x: x + halfWidth, y: y + halfHeight },
        { x, y: y + halfHeight },
        { x: x - halfWidth, y: y + halfHeight },
        { x: x - halfWidth, y }
      ]

      overlay.style.left = x - halfWidth + 'px'
      overlay.style.top = y - halfHeight + 'px'
      overlay.style.width = width + 'px'
      overlay.style.height = height + 'px'

      for (const point of points) {
        const { x, y } = point
        const isInRect = x > rangeRect.left && x < rangeRect.right && y > rangeRect.top && y < rangeRect.bottom

        if (isInRect) {
          return true
        }
      }

      return false
    }
  }, [])

  return (
    <div className="rmstsd">
      <Plt />
      <div className="content">君不见黄河之水天上来，奔流到海不复回</div>

      <div className="overlay"></div>
      <div className="img-cont"></div>

      <hr />

      <div style={{ margin: '10px 0' }}>
        <Row gutter={[16, 50]} justify="end">
          <Col span={10}>
            <div className="sgcontent">moveIcon</div>
          </Col>
          <Col span={4} offset={1}>
            <div className="sgcontent">分离label</div>
          </Col>
          <Col span={4}>
            <div className="sgcontent">删除icon</div>
          </Col>

          {/* <Col span={24}>
            <div className="sgcontent">页面类型</div>
          </Col>
          <Col span={24}>
            <div className="sgcontent">页面内容</div>
          </Col>

          <Col span={2}>
            <div className="sgcontent">图标</div>
          </Col>
          <Col span={20} offset={2}>
            <div className="sgcontent">颜色</div>
          </Col>

          <Col span={24}>
            <div className="sgcontent">菜单项名称</div>
          </Col> */}
        </Row>
      </div>

      <hr />

      <GridSys />

      <hr />

      <FlexboxGrid />
    </div>
  )
}

function Plt() {
  return (
    <div>
      <div>{navigator.platform}</div>
      <div>{navigator.userAgent}</div>
    </div>
  )
}
