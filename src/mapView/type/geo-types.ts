/**
 * 二维点。浮点数。
 */
export interface Point2D {
  x: number
  y: number
}

/**
 * 曲线上的一个点，及其参数
 */
export interface CurvePoint2D {
  x: number
  y: number
  percentage: number // 位于曲线的位置，百分比位置
  tangent: number | null // 切线方向
  normal: number | null // 法线方向
}

/**
 * 矩形。
 */
export interface Rect {
  cx: number
  cy: number
  width: number
  height: number
  theta?: number
}

/**
 * Nurbs 曲线控制点
 */
export interface NurbsControlPoint {
  x: number
  y: number
  weight: number
}

/**
 * x,y 坐标最大最小值
 */
export interface Bound2D {
  minX: number
  maxX: number
  minY: number
  maxY: number
}
