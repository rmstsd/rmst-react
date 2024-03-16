import CustomScrollbar from '@/components/CustomScrollbar/CustomScrollbar'

const arr = Array.from({ length: 50 }, (_, index) => index + 1)

const ScrollDemo = () => {
  return (
    <div>
      <CustomScrollbar style={{ height: 400, display: 'flow-root' }} className="border">
        {arr.map(item => (
          <h1 key={item}>{item}</h1>
        ))}
      </CustomScrollbar>
    </div>
  )
}

export default ScrollDemo
