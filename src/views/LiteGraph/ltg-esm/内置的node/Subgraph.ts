//Subgraph: a node that contains a graph
function Subgraph() {
  var that = this
  this.size = [140, 80]
  this.properties = { enabled: true }
  this.enabled = true

  //create inner graph
  this.subgraph = new LiteGraph.LGraph()
  this.subgraph._subgraph_node = this
  this.subgraph._is_subgraph = true

  this.subgraph.onTrigger = this.onSubgraphTrigger.bind(this)

  //nodes input node added inside
  this.subgraph.onInputAdded = this.onSubgraphNewInput.bind(this)
  this.subgraph.onInputRenamed = this.onSubgraphRenamedInput.bind(this)
  this.subgraph.onInputTypeChanged = this.onSubgraphTypeChangeInput.bind(this)
  this.subgraph.onInputRemoved = this.onSubgraphRemovedInput.bind(this)

  this.subgraph.onOutputAdded = this.onSubgraphNewOutput.bind(this)
  this.subgraph.onOutputRenamed = this.onSubgraphRenamedOutput.bind(this)
  this.subgraph.onOutputTypeChanged = this.onSubgraphTypeChangeOutput.bind(this)
  this.subgraph.onOutputRemoved = this.onSubgraphRemovedOutput.bind(this)
}

Subgraph.title = 'Subgraph'
Subgraph.desc = 'Graph inside a node'
Subgraph.title_color = '#334'

Subgraph.prototype.onGetInputs = function () {
  return [['enabled', 'boolean']]
}

/*
  Subgraph.prototype.onDrawTitle = function(ctx) {
      if (this.flags.collapsed) {
          return;
      }

      ctx.fillStyle = "#555";
      var w = LiteGraph.NODE_TITLE_HEIGHT;
      var x = this.size[0] - w;
      ctx.fillRect(x, -w, w, w);
      ctx.fillStyle = "#333";
      ctx.beginPath();
      ctx.moveTo(x + w * 0.2, -w * 0.6);
      ctx.lineTo(x + w * 0.8, -w * 0.6);
      ctx.lineTo(x + w * 0.5, -w * 0.3);
      ctx.fill();
  };
  */

Subgraph.prototype.onDblClick = function (e, pos, graphcanvas) {
  var that = this
  setTimeout(function () {
    graphcanvas.openSubgraph(that.subgraph)
  }, 10)
}

/*
  Subgraph.prototype.onMouseDown = function(e, pos, graphcanvas) {
      if (
          !this.flags.collapsed &&
          pos[0] > this.size[0] - LiteGraph.NODE_TITLE_HEIGHT &&
          pos[1] < 0
      ) {
          var that = this;
          setTimeout(function() {
              graphcanvas.openSubgraph(that.subgraph);
          }, 10);
      }
  };
 */

Subgraph.prototype.onAction = function (action, param) {
  this.subgraph.onAction(action, param)
}

Subgraph.prototype.onExecute = function () {
  this.enabled = this.getInputOrProperty('enabled')
  if (!this.enabled) {
    return
  }

  //send inputs to subgraph global inputs
  if (this.inputs) {
    for (var i = 0; i < this.inputs.length; i++) {
      var input = this.inputs[i]
      var value = this.getInputData(i)
      this.subgraph.setInputData(input.name, value)
    }
  }

  //execute
  this.subgraph.runStep()

  //send subgraph global outputs to outputs
  if (this.outputs) {
    for (var i = 0; i < this.outputs.length; i++) {
      var output = this.outputs[i]
      var value = this.subgraph.getOutputData(output.name)
      this.setOutputData(i, value)
    }
  }
}

Subgraph.prototype.sendEventToAllNodes = function (eventname, param, mode) {
  if (this.enabled) {
    this.subgraph.sendEventToAllNodes(eventname, param, mode)
  }
}

Subgraph.prototype.onDrawBackground = function (ctx, graphcanvas, canvas, pos) {
  if (this.flags.collapsed) return
  var y = this.size[1] - LiteGraph.NODE_TITLE_HEIGHT + 0.5
  // button
  var over = LiteGraph.isInsideRectangle(
    pos[0],
    pos[1],
    this.pos[0],
    this.pos[1] + y,
    this.size[0],
    LiteGraph.NODE_TITLE_HEIGHT
  )
  let overleft = LiteGraph.isInsideRectangle(
    pos[0],
    pos[1],
    this.pos[0],
    this.pos[1] + y,
    this.size[0] / 2,
    LiteGraph.NODE_TITLE_HEIGHT
  )
  ctx.fillStyle = over ? '#555' : '#222'
  ctx.beginPath()
  if (this._shape == LiteGraph.BOX_SHAPE) {
    if (overleft) {
      ctx.rect(0, y, this.size[0] / 2 + 1, LiteGraph.NODE_TITLE_HEIGHT)
    } else {
      ctx.rect(this.size[0] / 2, y, this.size[0] / 2 + 1, LiteGraph.NODE_TITLE_HEIGHT)
    }
  } else {
    if (overleft) {
      ctx.roundRect(0, y, this.size[0] / 2 + 1, LiteGraph.NODE_TITLE_HEIGHT, [0, 0, 8, 8])
    } else {
      ctx.roundRect(this.size[0] / 2, y, this.size[0] / 2 + 1, LiteGraph.NODE_TITLE_HEIGHT, [0, 0, 8, 8])
    }
  }
  if (over) {
    ctx.fill()
  } else {
    ctx.fillRect(0, y, this.size[0] + 1, LiteGraph.NODE_TITLE_HEIGHT)
  }
  // button
  ctx.textAlign = 'center'
  ctx.font = '24px Arial'
  ctx.fillStyle = over ? '#DDD' : '#999'
  ctx.fillText('+', this.size[0] * 0.25, y + 24)
  ctx.fillText('+', this.size[0] * 0.75, y + 24)
}

// Subgraph.prototype.onMouseDown = function(e, localpos, graphcanvas)
// {
// 	var y = this.size[1] - LiteGraph.NODE_TITLE_HEIGHT + 0.5;
// 	if(localpos[1] > y)
// 	{
// 		graphcanvas.showSubgraphPropertiesDialog(this);
// 	}
// }
Subgraph.prototype.onMouseDown = function (e, localpos, graphcanvas) {
  var y = this.size[1] - LiteGraph.NODE_TITLE_HEIGHT + 0.5
  console.log(0)
  if (localpos[1] > y) {
    if (localpos[0] < this.size[0] / 2) {
      console.log(1)
      graphcanvas.showSubgraphPropertiesDialog(this)
    } else {
      console.log(2)
      graphcanvas.showSubgraphPropertiesDialogRight(this)
    }
  }
}
Subgraph.prototype.computeSize = function () {
  var num_inputs = this.inputs ? this.inputs.length : 0
  var num_outputs = this.outputs ? this.outputs.length : 0
  return [200, Math.max(num_inputs, num_outputs) * LiteGraph.NODE_SLOT_HEIGHT + LiteGraph.NODE_TITLE_HEIGHT]
}

//**** INPUTS ***********************************
Subgraph.prototype.onSubgraphTrigger = function (event, param) {
  var slot = this.findOutputSlot(event)
  if (slot != -1) {
    this.triggerSlot(slot)
  }
}

Subgraph.prototype.onSubgraphNewInput = function (name, type) {
  var slot = this.findInputSlot(name)
  if (slot == -1) {
    //add input to the node
    this.addInput(name, type)
  }
}

Subgraph.prototype.onSubgraphRenamedInput = function (oldname, name) {
  var slot = this.findInputSlot(oldname)
  if (slot == -1) {
    return
  }
  var info = this.getInputInfo(slot)
  info.name = name
}

Subgraph.prototype.onSubgraphTypeChangeInput = function (name, type) {
  var slot = this.findInputSlot(name)
  if (slot == -1) {
    return
  }
  var info = this.getInputInfo(slot)
  info.type = type
}

Subgraph.prototype.onSubgraphRemovedInput = function (name) {
  var slot = this.findInputSlot(name)
  if (slot == -1) {
    return
  }
  this.removeInput(slot)
}

//**** OUTPUTS ***********************************
Subgraph.prototype.onSubgraphNewOutput = function (name, type) {
  var slot = this.findOutputSlot(name)
  if (slot == -1) {
    this.addOutput(name, type)
  }
}

Subgraph.prototype.onSubgraphRenamedOutput = function (oldname, name) {
  var slot = this.findOutputSlot(oldname)
  if (slot == -1) {
    return
  }
  var info = this.getOutputInfo(slot)
  info.name = name
}

Subgraph.prototype.onSubgraphTypeChangeOutput = function (name, type) {
  var slot = this.findOutputSlot(name)
  if (slot == -1) {
    return
  }
  var info = this.getOutputInfo(slot)
  info.type = type
}

Subgraph.prototype.onSubgraphRemovedOutput = function (name) {
  var slot = this.findOutputSlot(name)
  if (slot == -1) {
    return
  }
  this.removeOutput(slot)
}
// *****************************************************

Subgraph.prototype.getExtraMenuOptions = function (graphcanvas) {
  var that = this
  return [
    {
      content: 'Open',
      callback: function () {
        graphcanvas.openSubgraph(that.subgraph)
      }
    }
  ]
}

Subgraph.prototype.onResize = function (size) {
  size[1] += 20
}

Subgraph.prototype.serialize = function () {
  var data = LiteGraph.LGraphNode.prototype.serialize.call(this)
  data.subgraph = this.subgraph.serialize()
  return data
}
//no need to define node.configure, the default method detects node.subgraph and passes the object to node.subgraph.configure()

Subgraph.prototype.reassignSubgraphUUIDs = function (graph) {
  const idMap = { nodeIDs: {}, linkIDs: {} }

  for (const node of graph.nodes) {
    const oldID = node.id
    const newID = LiteGraph.uuidv4()
    node.id = newID

    if (idMap.nodeIDs[oldID] || idMap.nodeIDs[newID]) {
      throw new Error(`New/old node UUID wasn't unique in changed map! ${oldID} ${newID}`)
    }

    idMap.nodeIDs[oldID] = newID
    idMap.nodeIDs[newID] = oldID
  }

  for (const link of graph.links) {
    const oldID = link[0]
    const newID = LiteGraph.uuidv4()
    link[0] = newID

    if (idMap.linkIDs[oldID] || idMap.linkIDs[newID]) {
      throw new Error(`New/old link UUID wasn't unique in changed map! ${oldID} ${newID}`)
    }

    idMap.linkIDs[oldID] = newID
    idMap.linkIDs[newID] = oldID

    const nodeFrom = link[1]
    const nodeTo = link[3]

    if (!idMap.nodeIDs[nodeFrom]) {
      throw new Error(`Old node UUID not found in mapping! ${nodeFrom}`)
    }

    link[1] = idMap.nodeIDs[nodeFrom]

    if (!idMap.nodeIDs[nodeTo]) {
      throw new Error(`Old node UUID not found in mapping! ${nodeTo}`)
    }

    link[3] = idMap.nodeIDs[nodeTo]
  }

  // Reconnect links
  for (const node of graph.nodes) {
    if (node.inputs) {
      for (const input of node.inputs) {
        if (input.link) {
          input.link = idMap.linkIDs[input.link]
        }
      }
    }
    if (node.outputs) {
      for (const output of node.outputs) {
        if (output.links) {
          output.links = output.links.map(l => idMap.linkIDs[l])
        }
      }
    }
  }

  // Recurse!
  for (const node of graph.nodes) {
    if (node.type === 'graph/subgraph') {
      const merge = reassignGraphUUIDs(node.subgraph)
      idMap.nodeIDs.assign(merge.nodeIDs)
      idMap.linkIDs.assign(merge.linkIDs)
    }
  }
}

Subgraph.prototype.clone = function () {
  var node = LiteGraph.createNode(this.type)
  var data = this.serialize()

  if (LiteGraph.use_uuids) {
    // LGraph.serialize() seems to reuse objects in the original graph. But we
    // need to change node IDs here, so clone it first.
    const subgraph = LiteGraph.cloneObject(data.subgraph)

    this.reassignSubgraphUUIDs(subgraph)

    data.subgraph = subgraph
  }

  delete data['id']
  delete data['inputs']
  delete data['outputs']
  node.configure(data)
  return node
}

Subgraph.prototype.buildFromNodes = function (nodes) {
  //clear all?
  //TODO

  //nodes that connect data between parent graph and subgraph
  var subgraph_inputs = []
  var subgraph_outputs = []

  //mark inner nodes
  var ids = {}
  var min_x = 0
  var max_x = 0
  for (var i = 0; i < nodes.length; ++i) {
    var node = nodes[i]
    ids[node.id] = node
    min_x = Math.min(node.pos[0], min_x)
    max_x = Math.max(node.pos[0], min_x)
  }

  var last_input_y = 0
  var last_output_y = 0

  for (var i = 0; i < nodes.length; ++i) {
    var node = nodes[i]
    //check inputs
    if (node.inputs)
      for (var j = 0; j < node.inputs.length; ++j) {
        var input = node.inputs[j]
        if (!input || !input.link) continue
        var link = node.graph.links[input.link]
        if (!link) continue
        if (ids[link.origin_id]) continue
        //this.addInput(input.name,link.type);
        this.subgraph.addInput(input.name, link.type)
        /*
        var input_node = LiteGraph.createNode("graph/input");
        this.subgraph.add( input_node );
        input_node.pos = [min_x - 200, last_input_y ];
        last_input_y += 100;
        */
      }

    //check outputs
    if (node.outputs)
      for (var j = 0; j < node.outputs.length; ++j) {
        var output = node.outputs[j]
        if (!output || !output.links || !output.links.length) continue
        var is_external = false
        for (var k = 0; k < output.links.length; ++k) {
          var link = node.graph.links[output.links[k]]
          if (!link) continue
          if (ids[link.target_id]) continue
          is_external = true
          break
        }
        if (!is_external) continue
        //this.addOutput(output.name,output.type);
        /*
        var output_node = LiteGraph.createNode("graph/output");
        this.subgraph.add( output_node );
        output_node.pos = [max_x + 50, last_output_y ];
        last_output_y += 100;
        */
      }
  }

  //detect inputs and outputs
  //split every connection in two data_connection nodes
  //keep track of internal connections
  //connect external connections

  //clone nodes inside subgraph and try to reconnect them

  //connect edge subgraph nodes to extarnal connections nodes
}

// LiteGraph.registerNodeType('graph/subgraph', Subgraph)

export default Subgraph
