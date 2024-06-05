import { LiteGraph } from '..'

/* LiteGraph GUI elements used for canvas editing *************************************/
export function closeAllContextMenus(ref_window) {
  ref_window = ref_window || window

  var elements = ref_window.document.querySelectorAll('.litecontextmenu')
  if (!elements.length) {
    return
  }

  var result = []
  for (var i = 0; i < elements.length; i++) {
    result.push(elements[i])
  }

  for (var i = 0; i < result.length; i++) {
    if (result[i].close) {
      result[i].close()
    } else if (result[i].parentNode) {
      result[i].parentNode.removeChild(result[i])
    }
  }
}

export function extendClass(target, origin) {
  for (var i in origin) {
    //copy class properties
    if (target.hasOwnProperty(i)) {
      continue
    }
    target[i] = origin[i]
  }

  if (origin.prototype) {
    //copy prototype properties
    for (var i in origin.prototype) {
      //only enumerable
      if (!origin.prototype.hasOwnProperty(i)) {
        continue
      }

      if (target.prototype.hasOwnProperty(i)) {
        //avoid overwriting existing ones
        continue
      }

      //copy getters
      if (origin.prototype.__lookupGetter__(i)) {
        target.prototype.__defineGetter__(i, origin.prototype.__lookupGetter__(i))
      } else {
        target.prototype[i] = origin.prototype[i]
      }

      //and setters
      if (origin.prototype.__lookupSetter__(i)) {
        target.prototype.__defineSetter__(i, origin.prototype.__lookupSetter__(i))
      }
    }
  }
}

//used to create nodes from wrapping functions
export function getParameterNames(func) {
  return (func + '')
    .replace(/[/][/].*$/gm, '') // strip single-line comments
    .replace(/\s+/g, '') // strip white space
    .replace(/[/][*][^/*]*[*][/]/g, '') // strip multi-line comments  /**/
    .split('){', 1)[0]
    .replace(/^[^(]*[(]/, '') // extract the parameters
    .replace(/=[^,]+/g, '') // strip any ES6 defaults
    .split(',')
    .filter(Boolean) // split & filter [""]
}

/* helper for interaction: pointer, touch, mouse Listeners used by LGraphCanvas DragAndScale ContextMenu*/
export function pointerListenerAdd(oDOM, sEvIn, fCall, capture = false) {
  if (!oDOM || !oDOM.addEventListener || !sEvIn || typeof fCall !== 'function') {
    //console.log("cant pointerListenerAdd "+oDOM+", "+sEvent+", "+fCall);
    return // -- break --
  }

  var sMethod = LiteGraph.pointerevents_method
  var sEvent = sEvIn

  // UNDER CONSTRUCTION
  // convert pointerevents to touch event when not available
  if (sMethod == 'pointer' && !window.PointerEvent) {
    console.warn("sMethod=='pointer' && !window.PointerEvent")
    console.log(
      'Converting pointer[' + sEvent + '] : down move up cancel enter TO touchstart touchmove touchend, etc ..'
    )
    switch (sEvent) {
      case 'down': {
        sMethod = 'touch'
        sEvent = 'start'
        break
      }
      case 'move': {
        sMethod = 'touch'
        //sEvent = "move";
        break
      }
      case 'up': {
        sMethod = 'touch'
        sEvent = 'end'
        break
      }
      case 'cancel': {
        sMethod = 'touch'
        //sEvent = "cancel";
        break
      }
      case 'enter': {
        console.log('debug: Should I send a move event?') // ???
        break
      }
      // case "over": case "out": not used at now
      default: {
        console.warn('PointerEvent not available in this browser ? The event ' + sEvent + ' would not be called')
      }
    }
  }

  switch (sEvent) {
    //both pointer and move events
    case 'down':
    case 'up':
    case 'move':
    case 'over':
    case 'out':
    case 'enter': {
      oDOM.addEventListener(sMethod + sEvent, fCall, capture)
    }
    // only pointerevents
    case 'leave':
    case 'cancel':
    case 'gotpointercapture':
    case 'lostpointercapture': {
      if (sMethod != 'mouse') {
        return oDOM.addEventListener(sMethod + sEvent, fCall, capture)
      }
    }
    // not "pointer" || "mouse"
    default:
      return oDOM.addEventListener(sEvent, fCall, capture)
  }
}
export function pointerListenerRemove(oDOM, sEvent, fCall, capture = false) {
  if (!oDOM || !oDOM.removeEventListener || !sEvent || typeof fCall !== 'function') {
    //console.log("cant pointerListenerRemove "+oDOM+", "+sEvent+", "+fCall);
    return // -- break --
  }
  switch (sEvent) {
    //both pointer and move events
    case 'down':
    case 'up':
    case 'move':
    case 'over':
    case 'out':
    case 'enter': {
      if (LiteGraph.pointerevents_method == 'pointer' || LiteGraph.pointerevents_method == 'mouse') {
        oDOM.removeEventListener(LiteGraph.pointerevents_method + sEvent, fCall, capture)
      }
    }
    // only pointerevents
    case 'leave':
    case 'cancel':
    case 'gotpointercapture':
    case 'lostpointercapture': {
      if (LiteGraph.pointerevents_method == 'pointer') {
        return oDOM.removeEventListener(LiteGraph.pointerevents_method + sEvent, fCall, capture)
      }
    }
    // not "pointer" || "mouse"
    default:
      return oDOM.removeEventListener(sEvent, fCall, capture)
  }
}
