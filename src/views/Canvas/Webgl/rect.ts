var data = new Float32Array([0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, -0.5])

import ca from 'color-alpha'
import cr from 'color-rgba'
import { flow, random } from 'es-toolkit'

const vs = `
  attribute mediump vec2 aVertexPosition; 
  void main() {
    gl_Position = vec4(aVertexPosition, 0, 1.0); 
  }
`

const fs = `
  precision mediump float; 
  uniform vec4 u_color; 

  void main() {
    gl_FragColor = u_color;
  }
`

export function drawRect(gl: WebGL2RenderingContext) {
  drawByWebGL(gl)

  return

  const program = initShader(gl, vs, fs)

  const vertexData = [-0.5, 0, 0, 0, -0.5, 0.5, 0, 0.5]
  const vertexData2 = [-0.1, 0.1, 0.5, 0, 0, -0.5, 0.7, -0.7]

  const vts = [vertexData, vertexData2]

  vts.forEach(vertexData => {
    // 绑定缓冲对象到gl.ARRAY_BUFFER目标点
    const vertexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)

    // 给缓冲对象填充数据，矩形的四个顶点坐标
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW)

    // 获取顶点属性的在着色器中的索引，并激活它
    const aVertexPositionLocation = gl.getAttribLocation(program, 'aVertexPosition')
    gl.enableVertexAttribArray(aVertexPositionLocation)

    // 设置顶点属性如何从顶点缓冲对象中取值。每次从数组缓冲对象中读取2个值
    gl.vertexAttribPointer(aVertexPositionLocation, 2, gl.FLOAT, false, 0, 0)

    {
      const colorLocation = gl.getUniformLocation(program, 'u_color')
      gl.uniform4f(colorLocation, Math.random(), Math.random(), Math.random(), 0.7)
    }

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  })
}

function initShader(gl: WebGLRenderingContext, vertexShaderSource, fragmentShaderSource) {
  const vertexShader = gl.createShader(gl.VERTEX_SHADER)
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
  gl.shaderSource(vertexShader, vertexShaderSource)
  gl.shaderSource(fragmentShader, fragmentShaderSource)
  gl.compileShader(vertexShader)
  gl.compileShader(fragmentShader)

  var program = gl.createProgram()
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)

  gl.linkProgram(program)
  gl.useProgram(program)
  return program
}

// webgl 绘制矩形 https://codesandbox.io/p/sandbox/svg-canvas-2d-webgl-hui-zhi-ju-xing-forked-6qm7t9?file=%2Fsrc%2Findex.js%3A36%2C5
const drawByWebGL = (gl: WebGL2RenderingContext) => {
  let prev = { x: 0, y: 0 }
  let down = false
  let ts = { x: 0, y: 0 }
  const canvas = document.querySelector('canvas') as HTMLCanvasElement

  canvas.addEventListener('pointerdown', evt => {
    down = true
    prev.x = evt.clientX
    prev.y = evt.clientY
  })

  document.addEventListener('pointermove', evt => {
    if (!down) return

    const { clientX, clientY } = evt

    const { left, top, width, height } = canvas.getBoundingClientRect()
    const [cssX, cssY] = [clientX - left, clientY - top]

    const dx = clientX - prev.x
    const dy = clientY - prev.y
    prev.x = clientX
    prev.y = clientY

    const [halfWidth, halfHeight] = [width / 2, height / 2]
    const [xBaseCenter, yBaseCenter] = [cssX - halfWidth, cssY - halfHeight]
    const yBaseCenterTop = -yBaseCenter
    const [x, y] = [xBaseCenter / halfWidth, yBaseCenterTop / halfHeight]

    ts.x += dx / halfWidth
    ts.y += -dy / halfHeight

    //为uniform 变量赋值
    gl.uniform4f(u_Translation, ts.x, ts.y, 0, 0)

    render()
  })

  document.addEventListener('pointerup', evt => {
    down = false
  })

  const vertexShaderSrc = `
    attribute vec4 a_Position;
    uniform vec4 u_Translation;
    void main() {
      gl_Position = a_Position + u_Translation;
      gl_PointSize = 10.0;
    }
  `

  const fragmentShaderSrc = `
    precision mediump float;
    uniform vec4 u_FragColor;
    void main() {
      gl_FragColor = u_FragColor;
    }
  `

  /**** 渲染器生成处理 ****/
  // 创建顶点渲染器
  const vertexShader = gl.createShader(gl.VERTEX_SHADER)
  gl.shaderSource(vertexShader, vertexShaderSrc)
  gl.compileShader(vertexShader)
  // 创建片元渲染器
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
  gl.shaderSource(fragmentShader, fragmentShaderSrc)
  gl.compileShader(fragmentShader)
  // 程序对象
  const program = gl.createProgram()
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  gl.useProgram(program)

  const vertices = new Float32Array([
    // 第一个点
    -0.5, 0.5,
    // 第二个点
    0.5, 0.5,
    // 第三个点
    -0.5, -0.5,
    // 4
    0.5, -0.5
  ])

  // -- 一次性操作
  // 创建缓存对象
  const vertexBuffer = gl.createBuffer()
  // 绑定缓存对象到上下文
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  // 向缓存区写入数据

  // 获取 a_Position 变量地址
  const a_Position = gl.getAttribLocation(program, 'a_Position')
  // 允许访问缓存区
  gl.enableVertexAttribArray(a_Position)
  // 将缓冲区对象分配给 a_Position 变量
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)

  const u_FragColor = gl.getUniformLocation(program, 'u_FragColor')
  const u_Translation = gl.getUniformLocation(program, 'u_Translation')
  // --

  gl.clearColor(1, 1, 1, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)

  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
  gl.uniform4fv(u_FragColor, glColor('blue', 0.5))
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

  const rect2 = [
    -0.27135627982184296, -0.6380974900500178, 0.34538168103537914, -0.6380974900500178, -0.27135627982184296,
    -1.159547017491221, 0.34538168103537914, -1.159547017491221
  ]
  const vertices2 = new Float32Array(rect2)

  gl.bufferData(gl.ARRAY_BUFFER, vertices2, gl.STATIC_DRAW)
  gl.uniform4fv(u_FragColor, glColor('red', 0.5))
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

  const rects = genRects(100)

  function render() {
    gl.clearColor(1, 1, 1, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)

    rects.forEach(item => {
      gl.bufferData(gl.ARRAY_BUFFER, item.points, gl.STATIC_DRAW)
      gl.uniform4fv(u_FragColor, item.color)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    })

    // gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
    // gl.uniform4fv(u_FragColor, glColor('blue', 0.5))
    // gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

    // gl.bufferData(gl.ARRAY_BUFFER, vertices2, gl.STATIC_DRAW)
    // gl.uniform4fv(u_FragColor, glColor('red', 0.5))
    // gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  }
}

function glColor(color: string | number | null, alpha: number) {
  const [r, g, b, a] = cr(ca(color, alpha))

  return [r / 255, g / 255, b / 255, a]
}

function genRects(length = 1) {
  const rects = Array.from({ length }, () => {
    const x = random(-0.8, 0.8)
    const y = random(-0.8, 0.8)

    const width = random(0.02, 0.1)
    const height = random(0.02, 0.1)

    return {
      points: new Float32Array([
        // 第一个点
        x,
        y,
        // 第二个点
        x + width,
        y,
        // 第三个点
        x,
        y - height,
        // 4
        x + width,
        y - height
      ]),
      color: [random(0, 1), random(0, 1), random(0, 1), 1]
    }
  })

  return rects
}
