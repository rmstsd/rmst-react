import { stringSimilarity } from 'string-similarity-js'

const wd = 'AP1'
console.log(stringSimilarity(wd, 'Ap1', 1))
console.log(stringSimilarity(wd, 'AP1', 1))
console.log(stringSimilarity(wd, 'ap1', 1))
console.log(stringSimilarity(wd, 'ap12', 1))
console.log(stringSimilarity(wd, 'ap134', 1))
console.log(stringSimilarity(wd, 'apdf134', 1))
console.log(stringSimilarity(wd, 'paf134', 1))

export default function Rmstsd() {
  return <div>Rmstsd</div>
}
