import { useEffect } from 'react'

import { drawScene } from './gl/draw-scene'
import { initBuffers } from './gl/init-buffers'

export default function Webgl() {
  useEffect(() => {
    const canvas = document.querySelector('canvas')
    canvas.width = canvas.parentElement.clientWidth
    canvas.height = canvas.parentElement.clientHeight

    const gl = canvas.getContext('webgl')
    gl.clearColor(1, 1, 1, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    const vsSource = `
      attribute vec4 aVertexPosition;
      attribute vec4 aVertexColor;

      uniform mat4 uModelViewMatrix;
      uniform mat4 uProjectionMatrix;

      varying lowp vec4 vColor;

      void main() {
        gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
        vColor = aVertexColor;
      }
    `
    const fsSource = `
      varying lowp vec4 vColor;

      void main() {
        gl_FragColor = vColor;
      }
    `

    const shaderProgram = initShaderProgram(gl, vsSource, fsSource)

    // Collect all the info needed to use the shader program.
    // Look up which attributes our shader program is using
    // for aVertexPosition, aVertexColor and also
    // look up uniform locations.
    const programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
        vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor')
      },
      uniformLocations: {
        projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
        modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix')
      }
    }
    // Here's where we call the routine that builds all the
    // objects we'll be drawing.
    const buffers = initBuffers(gl)

    // Draw the scene
    drawScene(gl, programInfo, buffers)

    //  初始化着色器程序，让 WebGL 知道如何绘制我们的数据
    function initShaderProgram(gl: WebGLRenderingContext, vsSource: string, fsSource: string) {
      const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource)
      const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource)

      // 创建着色器程序

      const shaderProgram = gl.createProgram()
      gl.attachShader(shaderProgram, vertexShader)
      gl.attachShader(shaderProgram, fragmentShader)
      gl.linkProgram(shaderProgram)

      // 如果创建失败，alert
      if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.error(`Unable to initialize the shader program: ${gl.getProgramInfoLog(shaderProgram)}`)
        return null
      }

      return shaderProgram
    }

    //
    // 创建指定类型的着色器，上传 source 源码并编译
    //
    function loadShader(gl: WebGLRenderingContext, type: GLenum, source: string) {
      const shader = gl.createShader(type)

      // Send the source to the shader object
      gl.shaderSource(shader, source)

      // Compile the shader program
      gl.compileShader(shader)

      // See if it compiled successfully

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(`An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`)
        gl.deleteShader(shader)
        return null
      }

      return shader
    }

    //
  }, [])

  return (
    <div className="h-full border">
      <canvas />
    </div>
  )
}
