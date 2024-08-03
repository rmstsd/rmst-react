const list = new Array(12).fill(null)
export default function Investors() {
  return (
    <div className="grid grid-cols-2 gap-[30px] p-[40px] text-3xl sm:grid-cols-3 lg:grid-cols-5">
      <div className="flex-center col-start-1 col-end-3 aspect-[2/1] bg-white sm:col-end-4 sm:aspect-[3/1] lg:col-end-3 lg:aspect-auto">
        1
      </div>

      {list.map((_, index) => (
        <div className="flex-center aspect-square bg-white" key={index}>
          {index + 2}
        </div>
      ))}

      <div className="flex-center col-start-1 col-end-3 aspect-[2/1] bg-white sm:col-end-4 sm:aspect-[3/1] lg:col-start-5 lg:col-end-6 lg:aspect-auto">
        {list.length + 2}
      </div>
    </div>
  )
}
