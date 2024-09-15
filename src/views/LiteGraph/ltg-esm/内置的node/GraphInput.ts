// Input for a subgraph
function GraphInput() {
  this.addOutput('', 'number')

  this.name_in_graph = ''
  this.properties = {
    name: '',
    type: 'number',
    value: 0
  }

  const that = this

  this.name_widget = this.addWidget('text', 'Name', this.properties.name, function (v) {
    if (!v) {
      return
    }
    that.setProperty('name', v)
  })
  this.type_widget = this.addWidget('text', 'Type', this.properties.type, function (v) {
    that.setProperty('type', v)
  })

  this.value_widget = this.addWidget('number', 'Value', this.properties.value, function (v) {
    that.setProperty('value', v)
  })

  this.widgets_up = true
  this.size = [180, 90]
}

GraphInput.title = 'Input'
GraphInput.desc = 'Input of the graph'

GraphInput.prototype.onConfigure = function () {
  this.updateType()
}

// ensures the type in the node output and the type in the associated graph input are the same
GraphInput.prototype.updateType = function () {
  const type = this.properties.type
  this.type_widget.value = type

  // update output
  if (this.outputs[0].type != type) {
    if (!LiteGraph.isValidConnection(this.outputs[0].type, type)) this.disconnectOutput(0)
    this.outputs[0].type = type
  }

  // update widget
  if (type == 'number') {
    this.value_widget.type = 'number'
    this.value_widget.value = 0
  } else if (type == 'boolean') {
    this.value_widget.type = 'toggle'
    this.value_widget.value = true
  } else if (type == 'string') {
    this.value_widget.type = 'text'
    this.value_widget.value = ''
  } else {
    this.value_widget.type = null
    this.value_widget.value = null
  }
  this.properties.value = this.value_widget.value

  // update graph
  if (this.graph && this.name_in_graph) {
    this.graph.changeInputType(this.name_in_graph, type)
  }
}

// this is executed AFTER the property has changed
GraphInput.prototype.onPropertyChanged = function (name, v) {
  if (name == 'name') {
    if (v == '' || v == this.name_in_graph || v == 'enabled') {
      return false
    }
    if (this.graph) {
      if (this.name_in_graph) {
        // already added
        this.graph.renameInput(this.name_in_graph, v)
      } else {
        this.graph.addInput(v, this.properties.type)
      }
    } // what if not?!
    this.name_widget.value = v
    this.name_in_graph = v
  } else if (name == 'type') {
    this.updateType()
  } else if (name == 'value') {
  }
}

GraphInput.prototype.getTitle = function () {
  if (this.flags.collapsed) {
    return this.properties.name
  }
  return this.title
}

GraphInput.prototype.onAction = function (action, param) {
  if (this.properties.type == LiteGraph.EVENT) {
    this.triggerSlot(0, param)
  }
}

GraphInput.prototype.onExecute = function () {
  const name = this.properties.name
  // read from global input
  const data = this.graph.inputs[name]
  if (!data) {
    this.setOutputData(0, this.properties.value)
    return
  }

  this.setOutputData(0, data.value !== undefined ? data.value : this.properties.value)
}

GraphInput.prototype.onRemoved = function () {
  if (this.name_in_graph) {
    this.graph.removeInput(this.name_in_graph)
  }
}

// LiteGraph.registerNodeType('graph/input', GraphInput)
export default GraphInput
