const chars = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
]
function getRandomChar() {
  return chars[Math.floor(Math.random() * chars.length)]
}

class Animator {
  constructor(duration = 1000) {
    this.duration = duration
  }

  duration = 1000

  start() {
    const start = performance.now()

    const frameCb = () => {
      setTimeout(() => {
        const elapsed = Math.min(performance.now() - start, this.duration)

        if (elapsed === this.duration) {
          this.onDone?.()
        } else {
          this.onUpdate?.()
          frameCb()
        }
      }, 1000 / 20)
    }

    frameCb()
  }

  onDone() {}

  onUpdate() {}
}

export class SingleWordClass {
  constructor(word: string) {
    this.word = word
    this.initWordList()
  }

  private word = ''
  totalTime = 500

  wordList: { isSpace: boolean; char: string; visible: boolean }[] = []

  get interval() {
    return this.totalTime / this.word.length
  }

  initWordList() {
    this.wordList = this.word.split('').map(char => ({ char, visible: false, isSpace: char === ' ' }))
  }

  startRender() {
    const dispatchItem = (index: number) => {
      if (index > this.word.length - 1) {
        return
      }

      if (this.word[index] !== ' ') {
        this.renderCharItem(index)
      }

      setTimeout(() => {
        dispatchItem(index + 1)
      }, this.interval)
    }

    dispatchItem(0)
  }

  onUpdate = () => {}

  private renderCharItem(index: number) {
    this.wordList[index].visible = true

    const animator = new Animator(200)
    animator.onUpdate = () => {
      const char = getRandomChar()
      this.wordList[index].char = char

      this.onUpdate()
    }
    animator.onDone = () => {
      const charItem = this.word.charAt(index)
      this.wordList[index].char = charItem
      this.onUpdate()
    }
    animator.start()
  }
}
