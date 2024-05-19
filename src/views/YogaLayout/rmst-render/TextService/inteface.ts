export type ParsedTextStyleProps = Partial<OriParsedTextStyleProps>

interface OriParsedTextStyleProps extends ParsedBaseStyleProps {
  x: number
  y: number
  z?: number
  isBillboard?: boolean
  billboardRotation?: number
  isSizeAttenuation?: boolean
  text: string
  textAlign?: 'start' | 'center' | 'middle' | 'end' | 'left' | 'right'
  textBaseline?: 'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom'
  fontStyle?: 'normal' | 'italic' | 'oblique'
  fontSize?: number
  fontFamily?: string
  fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter' | number
  fontVariant?: 'normal' | 'small-caps' | string
  lineHeight?: number
  letterSpacing?: number
  // whiteSpace?: 'pre';
  leading?: number
  wordWrap?: boolean
  wordWrapWidth?: number
  maxLines?: number
  textOverflow?: TextOverflow | string
  isOverflowing?: boolean
  textPath?: Path
  textDecorationLine?: TextDecorationLine
  textDecorationColor?: CSSRGB
  textDecorationStyle?: TextDecorationStyle | string
  textPathSide?: 'left' | 'right'
  textPathStartOffset?: number
  // dropShadow?: boolean;
  // dropShadowDistance?: number;
  metrics?: TextMetrics
  dx?: number
  dy?: number
}
type TextOverflow = 'clip' | 'ellipsis' | string

interface ParsedBaseStyleProps
  extends Omit<
    BaseStyleProps,
    | 'fill'
    | 'stroke'
    | 'lineWidth'
    | 'increasedLineWidthForHitTesting'
    | 'lineDash'
    | 'points'
    | 'shadowColor'
    | 'transform'
    | 'transformOrigin'
    | 'miterLimit'
    | 'filter'
    | 'opacity'
    | 'fillOpacity'
    | 'strokeOpacity'
  > {
  opacity?: number
  fillOpacity?: number
  strokeOpacity?: number

  fill?: CSSRGB | CSSGradientValue[] | Pattern
  stroke?: CSSRGB | CSSGradientValue[] | Pattern
  lineDash?: [number, number]

  transform: ParsedTransform[]
  transformOrigin?: [CSSUnitValue, CSSUnitValue, CSSUnitValue]

  lineWidth?: number
  increasedLineWidthForHitTesting?: number
  /**
   * offset relative to initial definition
   */
  offsetX?: number
  offsetY?: number
  shadowColor?: CSSRGB
  miterLimit?: number
  filter?: ParsedFilterStyleProperty[]
}
