export default function Features() {
  return (
    <section
      className={'grid grid-cols-1 gap-[30px] p-[40px] text-3xl sm:grid-cols-2 lg:grid-cols-3'}
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
    </section>
  )
}
