import Portal from '@/components/Portal/Portal'

const Sector = () => {
  return (
    <div className="sec-root">
      <Portal.Host>
        <main>content</main>

        <Portal>
          <>modal</>
        </Portal>
      </Portal.Host>
    </div>
  )
}

export default Sector
