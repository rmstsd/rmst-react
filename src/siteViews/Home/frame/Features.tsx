import cn from '@/utils/cn'
import st from './style.module.less'

export default function Features() {
  return (
    <div
      className={cn('grid grid-cols-1 text-3xl sm:grid-cols-2 lg:grid-cols-3', st.container)}
      style={{
        backgroundImage: 'linear-gradient(135deg, #c0e0fe, #ecfcff)',
        gridTemplateAreas: ''
      }}
    >
      <div className="flex-center aspect-square bg-white sm:col-start-1 sm:col-end-3 sm:aspect-[2/1]">0</div>
      <div className="flex-center aspect-square bg-white">1</div>
      <div className="flex-center aspect-square bg-white">2</div>
      <div className="flex-center aspect-square bg-white">3</div>
      <div className="flex-center aspect-square bg-white">4</div>
    </div>
  )
}
