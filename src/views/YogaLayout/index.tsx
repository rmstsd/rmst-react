import { useEffect } from 'react'
import { Stage, TextNode, ViewNode } from './rmst-render'
import RmstStage, { RmstText, RmstView } from './HostConfig'

import { TextService } from './rmst-render/TextService'
import { split } from 'canvas-hypertxt'

export default function YogaLayout() {
  useEffect(() => {
    return
    const stage = new Stage(document.querySelector('.canvas'), {
      backgroundColor: 'orange',
      paddingTop: 10,
      paddingLeft: 10,
      paddingRight: 20,
      paddingBottom: 20,
      marginTop: 10,
      marginLeft: 10
    })

    const text = new TextNode('Abcjliyu人美声甜', {
      backgroundColor: '#eee',
      color: 'red',
      // marginLeft: 15,
      // marginTop: 20,
      paddingRight: 10,
      paddingBottom: 10,
      paddingLeft: 20,
      paddingTop: 10,
      marginLeft: 10,
      marginTop: 10
    })
    const view = new ViewNode({
      backgroundColor: 'pink',
      flexDirection: 'row',
      gap: 20,
      // paddingTop: 10,
      // paddingLeft: 40,
      paddingRight: 10
      // paddingBottom: 40
    })
    view.append(text)

    const view_2 = new ViewNode({ backgroundColor: 'purple', height: 100 })
    view.append(view_2)

    const text_2 = new TextNode('干了兄弟们', {
      backgroundColor: '#eee',
      color: 'blue',
      paddingRight: 10,
      paddingBottom: 10,
      paddingLeft: 20,
      paddingTop: 10,
      marginTop: 10,
      marginLeft: 10,
      marginRight: 15
    })

    view_2.append(text_2)

    stage.append(view)
    console.log(stage)
  }, [])

  return (
    <div>
      <h1>YogaLayout</h1>
      <hr />

      <h1>OOP</h1>
      <canvas className="canvas border" width={800} height={400}></canvas>

      <hr />

      <h1>jsx ✔</h1>
      <RmstStage style={{ backgroundColor: 'orange', padding: 10, marginTop: 10, gap: 10 }}>
        <RmstView style={{ backgroundColor: 'pink', flexDirection: 'row', gap: 20, padding: 10 }}>
          <RmstText style={{ backgroundColor: '#eee', color: 'red', padding: 5, marginLeft: 10 }}>
            Abcjliyu人美声甜
          </RmstText>

          <RmstView style={{ backgroundColor: 'purple', height: 100 }}>
            <RmstText
              style={{
                backgroundColor: '#eee',
                color: 'blue',
                padding: 10,
                marginTop: 10,
                marginLeft: 10,
                marginRight: 15
              }}
            >
              干了兄弟们
            </RmstText>
          </RmstView>
        </RmstView>

        <RmstView style={{ backgroundColor: 'antiquewhite' }}>
          <RmstText style={{ backgroundColor: 'khaki', color: 'black', margin: 5, width: 234 }}>
            Abcjliyu人美声甜Abcjliyu人美声甜Abcjliyu人美声甜
          </RmstText>
        </RmstView>
      </RmstStage>
    </div>
  )
}
