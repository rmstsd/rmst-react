class Manager<T = any> {
  constructor(initialState: T) {
    this.state = initialState
    this.undoStack = []
    this.redoStack = []
  }

  state: T = null

  undoStack: Command[] = []
  redoStack: Command[] = []

  addCommand(command: Command) {
    this.state = command.execute(this.state)
    this.undoStack.push(command)
    this.redoStack = []
  }

  undo() {
    const command = this.undoStack.pop()
    this.state = command.undo(this.state)
    this.redoStack.push(command)
  }

  redo() {
    const command = this.redoStack.pop()
    this.state = command.execute(this.state)
    this.undoStack.push(command)
  }
}

export default Manager

export class Command<T = any> {
  execute(state: T): T {
    return
  }
  undo(state: T): T {
    return
  }
}
