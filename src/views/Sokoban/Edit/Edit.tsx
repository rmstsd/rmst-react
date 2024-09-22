import { Button } from '@arco-design/web-react'
import { observer } from 'mobx-react-lite'
import sokobanStore from '../store/store'
import { CellType } from '../type'

export default observer(function Edit() {
  const { cellType, setCellType } = sokobanStore

  return (
    <div>
      <div className="mb-8 flex gap-4">
        <Button type={cellType === CellType.Floor ? 'primary' : 'default'} onClick={() => setCellType(CellType.Floor)}>
          地板
        </Button>
        <Button type={cellType === CellType.Wall ? 'primary' : 'default'} onClick={() => setCellType(CellType.Wall)}>
          墙
        </Button>
        <Button
          type={cellType === CellType.Player ? 'primary' : 'default'}
          onClick={() => setCellType(CellType.Player)}
        >
          玩家
        </Button>
        <Button type={cellType === CellType.Box ? 'primary' : 'default'} onClick={() => setCellType(CellType.Box)}>
          箱子
        </Button>
        <Button
          type={cellType === CellType.Target ? 'primary' : 'default'}
          onClick={() => setCellType(CellType.Target)}
        >
          放置点
        </Button>

        <Button onClick={() => sokobanStore.isValidMap()}>ok</Button>
      </div>
    </div>
  )
})
