import { random, randomInt, xor } from 'es-toolkit'
import { drawRect } from './rect'
import { testShader } from './test-shader'

export function glDraw(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext('webgl2')

  let down = false
  let prev = { x: 0, y: 0 }
  let ts = { x: 0, y: 0 }

  const points = Array.from({ length: 8000 }, () => ({
    x: random(-1, 1),
    y: random(-1, 1),
    size: randomInt(10, 20),
    color: new Float32Array([Math.random(), Math.random(), Math.random(), 1.0])
  }))

  // canvas.addEventListener('pointerdown', evt => {
  //   down = true
  //   prev.x = evt.clientX
  //   prev.y = evt.clientY
  // })

  // document.addEventListener('pointermove', evt => {
  //   if (!down) return

  //   const { clientX, clientY } = evt

  //   const { left, top, width, height } = canvas.getBoundingClientRect()
  //   const [cssX, cssY] = [clientX - left, clientY - top]

  //   const dx = clientX - prev.x
  //   const dy = clientY - prev.y

  //   const [halfWidth, halfHeight] = [width / 2, height / 2]
  //   const [xBaseCenter, yBaseCenter] = [cssX - halfWidth, cssY - halfHeight]
  //   const yBaseCenterTop = -yBaseCenter
  //   const [x, y] = [xBaseCenter / halfWidth, yBaseCenterTop / halfHeight]

  //   ts.x += dx / halfWidth
  //   ts.y += -dy / halfHeight

  //   gl.uniform4f(u_Translation_2, dx / halfWidth, dy / halfHeight, 0, 0)

  //   drawStage()

  //   prev.x = clientX
  //   prev.y = clientY
  // })

  // document.addEventListener('pointerup', evt => {
  //   down = false
  // })

  // canvas.addEventListener('click', function (event) {
  //   const { clientX, clientY } = event
  //   const { left, top, width, height } = canvas.getBoundingClientRect()
  //   const [cssX, cssY] = [clientX - left, clientY - top]

  //   const [halfWidth, halfHeight] = [width / 2, height / 2]
  //   const [xBaseCenter, yBaseCenter] = [cssX - halfWidth, cssY - halfHeight]
  //   const yBaseCenterTop = -yBaseCenter
  //   const [x, y] = [xBaseCenter / halfWidth, yBaseCenterTop / halfHeight]
  //   console.log(x, y)

  //   drawStage()
  // })

  drawRect(gl)

  // testShader(gl)

  return

  function drawStage() {
    gl.clearColor(1, 1, 1, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)

    triangles.forEach(({ points, color }) => {
      const vertices = new Float32Array(points)
      const vertexBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

      gl.vertexAttribPointer(a_Position_2, 2, gl.FLOAT, false, 0, 0)
      gl.uniform4fv(t_color, color)

      gl.enableVertexAttribArray(a_Position_2)
      gl.uniform4f(u_Translation_2, ts.x, ts.y, 0, 0)

      // gl.drawArrays(gl.POINTS, 0, 3)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    })

    // points.forEach(({ x, y, size, color }) => {
    //   gl.vertexAttrib2f(a_Position, x, y)
    //   gl.vertexAttrib1f(a_PointSize, size)
    //   gl.uniform4fv(u_FragColor, color)
    //   gl.uniform4f(u_Translation, ts.x, ts.y, 0, 0)
    //   gl.drawArrays(gl.POINTS, 0, 1)
    // })
  }

  // const vsSource = `
  //     attribute vec4 a_Position;
  //     attribute float a_PointSize;
  //     uniform vec4 u_Translation;

  //     void main() {
  //       gl_Position = a_Position+u_Translation;
  //       gl_PointSize = a_PointSize;
  //     }
  //   `

  // const fsSource = `
  //   precision mediump float;
  //   uniform vec4 u_FragColor;

  //   void main() {
  //     gl_FragColor = u_FragColor;
  //   }
  // `

  // const program = initShaders(gl, vsSource, fsSource)

  // const a_Position = gl.getAttribLocation(program, 'a_Position')
  // const a_PointSize = gl.getAttribLocation(program, 'a_PointSize')

  // const u_FragColor = gl.getUniformLocation(program, 'u_FragColor')
  // gl.uniform4f(u_FragColor, Math.random(), Math.random(), Math.random(), 1.0)

  // gl.vertexAttrib2f(a_Position, 0, 0)
  // gl.vertexAttrib1f(a_PointSize, 50.0)

  // const u_Translation = gl.getUniformLocation(program, 'u_Translation')
  // gl.uniform4f(u_Translation, 0, 0.5, 0, 0)

  // // 三角面
  // const vs = `
  //     attribute vec4 a_Position;
  //     uniform vec4 u_Translation;
  //     void main() {
  //       gl_Position = a_Position + u_Translation;
  //       gl_PointSize = 10.0;
  //   }
  // `

  // const fs = `
  //   precision mediump float;
  //   uniform vec4 t_color;
  //   void main() {
  //     gl_FragColor = t_color;
  //   }
  // `

  // const triangles = Array.from({ length: 1000 }, () => ({
  //   points: [random(-1, 1), random(-1, 1), random(-1, 1), random(-1, 1), random(-1, 1), random(-1, 1)],
  //   color: new Float32Array([Math.random(), Math.random(), Math.random(), 1.0])
  // }))

  // const program_2 = initShaders(gl, vs, fs)
  // const vertices = new Float32Array([0.0, 0.1, -0.1, -0.1, 0.1, -0.1])
  // const vertexBuffer = gl.createBuffer()
  // gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  // gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

  // const a_Position_2 = gl.getAttribLocation(program_2, 'a_Position')
  // const t_color = gl.getUniformLocation(program_2, 't_color')

  // const u_Translation_2 = gl.getUniformLocation(program_2, 'u_Translation')
  // // gl.uniform4f(u_Translation_2, 0, 0.5, 0, 0)

  // gl.vertexAttribPointer(a_Position_2, 2, gl.FLOAT, false, 0, 0)
  // gl.enableVertexAttribArray(a_Position_2)

  // // gl.drawArrays(gl.POINTS, 0, 3)
  // // gl.drawArrays(gl.TRIANGLES, 0, 3)

  // drawStage()
}

export function initShaders(gl: WebGLRenderingContext, vsSource, fsSource) {
  //创建程序对象
  const program = gl.createProgram()
  //建立着色对象
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource)
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource)

  //把顶点着色对象装进程序对象中
  gl.attachShader(program, vertexShader)
  //把片元着色对象装进程序对象中
  gl.attachShader(program, fragmentShader)

  //连接webgl上下文对象和程序对象
  gl.linkProgram(program)
  //启动程序对象
  gl.useProgram(program)
  //将程序对象挂到上下文对象上
  return program
}

function loadShader(gl: WebGLRenderingContext, type: GLenum, source) {
  //根据着色类型，建立着色器对象
  const shader = gl.createShader(type)
  //将着色器源文件传入着色器对象中
  gl.shaderSource(shader, source)
  //编译着色器对象
  gl.compileShader(shader)
  //返回着色器对象
  return shader
}
