export function TopMenu({ onClick }) {
  return (
    <div
      className="absolute left-1/2 top-0 z-10 h-[30px] -translate-x-1/2 cursor-pointer rounded-bl-2xl rounded-br-2xl bg-gray-700 px-6 text-center text-white"
      onClick={onClick}
    >
      back home
    </div>
  )
}
