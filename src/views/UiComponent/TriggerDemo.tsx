import { Trigger, Button } from '@arco-design/web-react'
import RmstTrigger from '@/components/Trigger/RmstTrigger'
import { PureComponent, useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'

const TriggerDemo = () => {
  const popupContent = () => <div className="bg-white shadow-lg border-2 p-2">123</div>

  const [count, setCount] = useState(0)
  const [bool, setBool] = useState(false)

  return (
    <div>
      <Trigger popup={popupContent} trigger="click">
        <MyButton
          text="官方"
          onClick={() => {
            console.log('111')
          }}
        />
      </Trigger>

      <hr className="my-3" />

      <RmstTrigger popup={popupContent}>
        <MyButton
          text="我的"
          onClick={() => {
            console.log('used click')
          }}
        />
      </RmstTrigger>

      <hr className="my-3" />

      <Button onClick={() => setBool(!bool)}>setBool</Button>

      <CSSTransition in={bool} timeout={500} unmountOnExit classNames="alert" appear mountOnEnter>
        <span>123</span>
      </CSSTransition>
    </div>
  )

  return <div>TriggerDemo</div>
}

export default TriggerDemo

const MyButton = props => {
  return (
    <button onClick={props.onClick} className="border-2 p-2">
      Click me {props.text}
    </button>
  )
}

class SS2 extends PureComponent {
  state = { count: 2 }

  render() {
    return (
      <Button
        className="cc-cc"
        onClick={() => {
          this.setState({ count: 3 }, () => {
            console.log(this.state.count)

            console.log(document.querySelector('.cc-cc').textContent)
          })
        }}
      >
        {this.state.count}
      </Button>
    )
  }
}
