var data = new Float32Array([0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, -0.5])

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
