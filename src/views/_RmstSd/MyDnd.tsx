import { DndContext, UniqueIdentifier } from '@dnd-kit/core'
import { SortableContext, useSortable } from '@dnd-kit/sortable'
import {} from '@dnd-kit/utilities'
import { makeAutoObservable } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useMemo } from 'react'

const MyDnd = observer(function MyDndInner() {
  const containerIds = store.groups.map(g => g.id)

  return (
    <div className="overflow-auto border p-4" style={{ height: 600 }}>
      <DndContext
        onDragMove={evt => {
          // console.log(evt)

          const { active, over } = evt
          // console.log(active, over)

          if (!active?.id || !over?.id) {
            return
          }

          store.activeId = active.id
          store.overId = over.id

          const { initial, translated } = active.rect.current

          const center_y = translated.top + translated.height / 2

          let pos = ''

          if (center_y > over.rect.top + over.rect.height / 2) {
            pos = 'After'
          } else {
            pos = 'Before'
          }

          console.log(store.findItem(active.id).label, store.findItem(over.id).label, pos)

          over.rect
        }}
      >
        <SortableContext items={containerIds}>
          {store.groups.map(group => {
            return (
              <Container key={group.id} group={group}>
                <SortableContext items={group.items.map(item => item.id)}>
                  {group.items.map(item => (
                    <Item key={item.id} item={item} />
                  ))}
                </SortableContext>
              </Container>
            )
          })}
        </SortableContext>
      </DndContext>
    </div>
  )
})

export default MyDnd

const Container = observer(({ group, children }) => {
  const { setNodeRef, listeners } = useSortable({ id: group.id })

  return (
    <div className="border p-4" ref={setNodeRef}>
      <div className="header flex justify-between">
        {group.label}

        <span className="cursor-move" {...listeners}>
          han
        </span>
      </div>

      {children}
    </div>
  )
})

const Item = observer(({ item }) => {
  const { setNodeRef, listeners } = useSortable({ id: item.id })

  return (
    <div
      ref={setNodeRef}
      className="item flex justify-between p-8 pl-10"
      style={{ backgroundColor: store.overId === item.id ? 'red' : 'white' }}
    >
      {item.label}
      <span className="cursor-move" {...listeners}>
        han
      </span>
    </div>
  )
})

class Store {
  groups = [
    {
      label: '统计看板',
      items: [
        {
          label: '运营看板',
          displayOrder: 0,
          target: 'Page::Dashboard',
          type: 'entity',
          icon: 'chart-user',
          color: '#1A7BF2',
          id: '466a026e-7813-40a7-8220-e9a0359284ff'
        },
        {
          label: '库位一览',
          displayOrder: 0,
          target: 'Page::BinOverview',
          type: 'entity',
          icon: 'game-board',
          color: '#1ABFFB',
          id: '4ebe8e5a-b072-4f80-96ac-ab9c59a8b462'
        },
        {
          label: '统计看板',
          displayOrder: 0,
          target: 'Page::StatsDashboard',
          type: 'entity',
          icon: 'chart-mixed',
          color: '#1ABFFB',
          id: '1cff4aa3-7938-4dbe-ae10-2f93ee2fcd01'
        },
        {
          type: 'entity',
          label: '周期报表',
          displayOrder: 0,
          target: 'Page::PeriodicReport',
          icon: 'chart-mixed',
          color: '#0ACFB3',
          id: 'f895e0d2-1729-47db-81a7-a03d02245104'
        },
        {
          type: 'entity',
          label: 'UI Demo',
          displayOrder: 0,
          target: 'Page::Demo',
          icon: 'tablet-screen',
          color: '#FC8E0E',
          id: '248ba246-deeb-4861-809c-9e0d3d2fcce0'
        },
        {
          type: 'extPage',
          label: '智能叫料',
          displayOrder: 0,
          target: 'Ext::SmartCallMaterial',
          id: '2e198654-60c8-41ed-aa19-66d1e8bb1069'
        },
        {
          type: 'entity',
          label: '用户',
          displayOrder: 0,
          target: 'Entity::HumanUser',
          icon: 'user',
          color: '#E853A8',
          id: '89f37ea3-712c-4043-8a48-b6167371e908'
        },
        {
          type: 'entity',
          label: '用户角色',
          displayOrder: 0,
          target: 'Entity::UserRole',
          icon: 'users',
          color: '#E853A8',
          id: 'd82605e4-5872-48e1-9fca-6bb09cb86211'
        },
        {
          type: 'entity',
          label: '时间序列数值报表',
          displayOrder: 0,
          target: 'Entity::StatsTimelineValueReport',
          icon: 'chart-simple',
          color: '#1ABFFB',
          id: '4c73fc5d-7b53-4e52-903f-919c72077b86'
        },
        {
          type: 'entity',
          label: '地图',
          displayOrder: 0,
          target: 'Page::MapView',
          icon: 'map-location-dot',
          color: '#1ABFFB',
          id: '84befa12-f6ae-40dd-809f-bfab0e3b7f7a'
        }
      ],
      displayOrder: 100,
      id: '61fb9bed-e54d-4c51-855f-2b337803addd'
    },
    {
      label: 'QuickStore',
      items: [
        {
          label: 'QS 仓配工作台',
          displayOrder: 100,
          target: 'Page::QsWorkStationUi',
          type: 'entity',
          icon: 'computer-classic',
          color: '#1A7BF2',
          id: '081dd279-2d2b-4111-96ad-88c4dbfea0c0'
        },
        {
          label: 'QS 库口上架单',
          displayOrder: 90,
          target: 'Entity::QsPutOnContainerOrder',
          type: 'entity',
          icon: 'shelves',
          color: '#FC8E0E',
          id: 'c21746e4-01f8-4ea6-865b-d0fb9cd14e11'
        },
        {
          label: 'QS 库口下架单',
          displayOrder: 90,
          target: 'Entity::QsTakeOffContainerOrder',
          type: 'entity',
          icon: 'shelves',
          color: '#FC8E0E',
          id: '742ea3db-7bbb-41b2-9762-c8e619c23fa6'
        },
        {
          label: 'QS 移库单',
          displayOrder: 80,
          target: 'Entity::QsMoveBinOrder',
          type: 'entity',
          icon: 'code-compare',
          color: '#3CC62F',
          id: '758815f6-0d9e-4538-9958-768c925a272a'
        },
        {
          label: 'QS 入库单',
          displayOrder: 0,
          target: 'Entity::QsInboundOrder',
          type: 'entity',
          icon: 'ramp-loading',
          color: '#3CC62F',
          id: '4bc290ff-3cd1-4818-9b9c-f3b6d797ea3d'
        },
        {
          label: 'QS 出库单',
          displayOrder: 0,
          target: 'Entity::QsOutboundOrder',
          type: 'entity',
          icon: 'boxes-packing',
          color: '#FC8E0E',
          id: 'f1f2ca70-38ac-4e73-84d4-0252dbd31bb6'
        },
        {
          label: 'QS 装货单',
          displayOrder: 0,
          target: 'Entity::QsPutOrder',
          type: 'entity',
          icon: 'inbox-in',
          color: '#FC8E0E',
          id: 'bbb04002-33a2-4918-be4c-6b3f92ec42f9'
        },
        {
          type: 'entity',
          label: '机器人应用管理',
          displayOrder: 0,
          target: 'Page::RobotAppIndex',
          icon: 'robot',
          color: '#8141EB',
          id: 'bbbbb353-aab6-487e-8641-3657e5b3d6f0'
        },
        {
          label: 'QS 拣货单',
          displayOrder: 0,
          target: 'Entity::QsPickOrder',
          type: 'entity',
          icon: 'inbox-out',
          color: '#FC8E0E',
          id: 'd39ce023-ad94-4570-8634-c2616bb4101a'
        },
        {
          label: '库存明细',
          displayOrder: 0,
          target: 'Entity::FbInvLayout',
          type: 'entity',
          icon: 'boxes-stacked',
          color: '#3CC62F',
          id: 'd7855e5f-8824-4278-b4e0-ebdab5e945aa'
        },
        {
          type: 'entity',
          label: '用户角色',
          displayOrder: 0,
          target: 'Entity::UserRole',
          icon: 'users',
          color: '#E853A8',
          id: '1d689276-419f-4fbe-a37e-1287fd946906'
        }
      ],
      displayOrder: 90,
      id: 'a29456fe-5655-4cec-babb-fc6fa4e3a00a'
    },
    {
      label: '机器人应用',
      items: [
        {
          label: '机器人应用管理',
          displayOrder: 0,
          target: 'Page::RobotAppIndex',
          type: 'entity',
          icon: 'robot',
          color: '#8141EB',
          id: '8e3cd81e-7ecf-4e18-a8af-477ea080417c'
        },
        {
          label: '容器搬运单',
          displayOrder: 0,
          target: 'Entity::ContainerTransportOrder',
          type: 'entity',
          icon: 'code-compare',
          color: '#E853A8',
          id: '83216b5e-66c8-404e-99c3-ac65942316e9'
        },
        {
          label: '猎鹰任务记录',
          displayOrder: 0,
          target: 'Entity::FalconTaskRecord',
          type: 'entity',
          icon: 'file-pen',
          color: '#1A7BF2',
          id: '8072a58f-def1-4c09-b44a-afcde0317e7e'
        }
      ],
      displayOrder: 80,
      id: '2e0e0c49-65d0-4d99-8f11-9c8a81aedf20'
    },
    {
      label: '基础资料',
      items: [
        {
          type: 'entity',
          label: '业务对象',
          displayOrder: 0,
          target: 'Page::MetaIndex',
          icon: 'server',
          color: '#1A7BF2',
          id: 'd0c901ee-207a-4df1-a3e8-34d7c425425e'
        },
        {
          label: '仓库',
          displayOrder: 1,
          target: 'Entity::FbWarehouse',
          sepTop: false,
          type: 'entity',
          icon: 'warehouse',
          color: '#3CC62F',
          id: '59bc287b-439b-41ef-8fb0-9f32af2ae3e4'
        },
        {
          label: '物料',
          displayOrder: 0,
          target: 'Entity::FbMaterial',
          type: 'entity',
          icon: 'screwdriver-wrench',
          color: '#3CC62F',
          id: '2883fe0e-a22a-4d4b-8778-71de776f01ce'
        },
        {
          label: '物料分类',
          displayOrder: 0,
          target: 'Entity::FbMaterialCategory',
          type: 'entity',
          icon: 'screwdriver-wrench',
          color: '#3CC62F',
          id: '655d8277-fbfe-4eeb-b1c7-c35407cdff85'
        },
        {
          label: '库位',
          displayOrder: 0,
          target: 'Entity::FbBin',
          type: 'entity',
          icon: 'cubes',
          color: '#0ACFB3',
          id: '948154f2-4cfb-4e83-ac6c-8ffdaa8c4d77'
        },
        {
          label: '库区',
          displayOrder: 0,
          target: 'Entity::FbDistrict',
          type: 'entity',
          icon: 'square',
          color: '#3CC62F',
          id: 'e2b37288-7429-4acd-8817-75545a703679'
        },
        {
          label: '容器',
          displayOrder: 0,
          target: 'Entity::FbContainer',
          type: 'entity',
          icon: 'box',
          color: '#3CC62F',
          id: '00f513ee-f47f-4d4c-98c3-e9a2756973cf'
        },
        {
          label: '容器类型',
          displayOrder: 0,
          target: 'Entity::FbContainerType',
          type: 'entity',
          icon: 'box',
          color: '#3CC62F',
          id: '073607a6-b4d6-4905-ba40-03f05ecf8cd4'
        },
        {
          label: '物料容器容量',
          displayOrder: 0,
          target: 'Entity::FbMaterialContainerMaxQty',
          type: 'entity',
          icon: 'box-open',
          color: '#3CC62F',
          id: 'f927f323-1367-4195-ac65-66f08c6e1717'
        }
      ],
      displayOrder: 70,
      id: '2aeef884-b905-4157-8d0b-524188327c44'
    },
    {
      label: 'PLC',
      items: [
        {
          label: 'PLC 设备配置',
          displayOrder: 0,
          target: 'Entity::PlcDeviceConfig',
          type: 'entity',
          icon: 'gear',
          color: '#FC8E0E',
          id: '3961837b-39db-45ae-ab10-c843ad587c21'
        },
        {
          label: 'PLC 设备面板',
          displayOrder: 0,
          target: 'Page::PlcPanel',
          type: 'entity',
          icon: 'door-open',
          color: '#0ACFB3',
          id: 'a9d5f30d-959b-4a25-82d9-62caa7b78288'
        },
        {
          label: 'PLC 读写记录',
          displayOrder: 0,
          target: 'Entity::PlcRwLog',
          type: 'entity',
          icon: 'file-pen',
          color: '#FC8E0E',
          id: 'c0988145-26be-4b8f-8ab3-44dbb6741923'
        }
      ],
      displayOrder: 50,
      id: 'd7f99f9f-9b54-41bc-a932-c2b72e8a9760'
    },
    {
      label: '运维',
      items: [
        {
          label: '运维中心',
          displayOrder: 0,
          target: 'Page::OpControl',
          type: 'entity',
          icon: 'wrench',
          color: '#0ACFB3',
          id: '76bf88be-0073-4e60-a56a-9c016188f04a'
        },
        {
          label: '网关简单运单',
          displayOrder: 0,
          target: 'Entity::SimpleTransportOrder',
          type: 'entity',
          icon: 'code-compare',
          color: '#1A7BF2',
          id: 'a218eb69-d04b-48e4-bcb3-974b19dc11b1'
        },
        {
          label: '故障记录',
          displayOrder: 0,
          target: 'Entity::FailureRecord',
          type: 'entity',
          icon: 'circle-exclamation',
          color: '#EF524D',
          id: 'f2378091-e6ee-401d-8314-fd936a11646c'
        },
        {
          label: '系统关键事件',
          displayOrder: 0,
          target: 'Entity::SystemKeyEvent',
          type: 'entity',
          icon: 'calendar-star',
          color: '#8141EB',
          id: '078f59db-0966-4d17-8ef0-ddf799b05531'
        },
        {
          label: '代理账户',
          displayOrder: 0,
          target: 'Entity::AgentUser',
          type: 'entity',
          icon: 'file-user',
          color: '#1A7BF2',
          id: '741ddc9b-9839-4da8-8d4f-a469f4e23e4a'
        },
        {
          label: '直接运单',
          displayOrder: 0,
          target: 'Entity::DirectRobotOrder',
          type: 'entity',
          icon: 'code-compare',
          color: '#FC8E0E',
          id: '9957d8e5-7bb5-4fdd-bc04-162d3aec6e1a'
        }
      ],
      displayOrder: 0,
      id: '3b105912-c78e-478d-af6e-b764bac7455f'
    }
  ]

  activeId: UniqueIdentifier = ''
  overId: UniqueIdentifier = ''

  findItem(id) {
    for (const g of this.groups) {
      if (g.id === id) {
        return g
      }

      for (const item of g.items) {
        if (item.id === id) {
          return item
        }
      }
    }
  }

  constructor() {
    makeAutoObservable(this)
  }
}

const store = new Store()
