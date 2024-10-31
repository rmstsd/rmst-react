import { initShaders } from './gl-draw'

export function testShader(gl: WebGLRenderingContext) {
  const vs = `void main() {
        gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
        gl_PointSize = 100.0;
    }`

  const fs = `
     void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 0.5);
    }
    `

  const program = initShaders(gl, vs, fs)

  gl.clearColor(1, 1, 1, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)

  gl.drawArrays(gl.POINTS, 0, 1)
}
