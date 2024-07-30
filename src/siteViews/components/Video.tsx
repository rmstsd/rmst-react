export default function Video({ url }) {
  return <video src={url} autoPlay loop muted className="w-full h-full object-cover" />
}
