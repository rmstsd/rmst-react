import { useEffect } from 'react'
import { glDraw } from './gl-draw'
import draw from './老陈打码'

export default function Webgl() {
  useEffect(() => {
    const canvas = document.querySelector('canvas')
    canvas.width = canvas.parentElement.clientWidth
    canvas.height = canvas.parentElement.clientHeight

    // draw(canvas)

    glDraw(canvas)
    // glDraw_2(canvas)
  }, [])

  return (
    <div className="h-full touch-none border">
      <canvas />
    </div>
  )
}

function glDraw_2(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext('webgl2')

  const vertexShaderSrc = `
    attribute vec2 a_Position;
    attribute vec4 a_Color;
    varying vec4 v_Color;
    void main() {
      gl_Position = vec4(a_Position, 0.0, 1.0);
      v_Color = a_Color;
    }
  `

  const fragmentShaderSrc = `
    precision mediump float;
    varying vec4 v_Color;
    void main() {
      gl_FragColor = v_Color;
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
    -0.5, 0.5, 0.0, 1.0, 0.0, 1.0,
    //
    0.5, -0.5, 0.0, 0.0, 1.0, 1.0
  ])
  // const colors = new Float32Array([
  //   0.0, 1.0, 0.0, 1.0,
  //   //
  //   0.0, 0.0, 1.0, 1.0
  // ])

  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

  const posLocation = gl.getAttribLocation(program, 'a_Position')
  gl.vertexAttribPointer(posLocation, 2, gl.FLOAT, false, 6 * Float32Array.BYTES_PER_ELEMENT, 0)
  gl.enableVertexAttribArray(posLocation)

  const colorLocation = gl.getAttribLocation(program, 'a_Color')
  gl.vertexAttribPointer(
    colorLocation,
    4,
    gl.FLOAT,
    false,
    6 * Float32Array.BYTES_PER_ELEMENT,
    2 * Float32Array.BYTES_PER_ELEMENT
  )
  gl.enableVertexAttribArray(colorLocation)

  gl.drawArrays(gl.LINES, 0, 2)
}
