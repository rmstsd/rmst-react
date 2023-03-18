import { useState } from 'react'

const Misc = () => {
  const [dom, setDom] = useState(null)
  const [bool, setBool] = useState(true)

  console.log(dom)

  return (
    <div>
      <button onClick={() => setBool(!bool)}>sb</button>
      {bool ? <div ref={setDom}>Misc</div> : null}
    </div>
  )
}

export default Misc
