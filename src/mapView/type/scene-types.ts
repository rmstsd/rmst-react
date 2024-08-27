import { CurvePoint2D, Point2D, Rect } from "./geo-types"
import { MapToTyped } from "../type"

/**
 * 表示一个场景的结构。主要用于存储和交换！
 */
export interface SceneSchema {
  id: string  // 唯一 ID
  name: string // 人可见的名字
  disabled?: boolean
  version: number // 版本号
  displayOrder?: number // 显示顺序
  lastModifiedOn: Date; // 最后修改时间
  robotGroups: RobotGroup[]; // 机器人组
  robotTags: RobotTag[]; // 机器人标签
  mapSet: SceneMapSet; // 场景的地图集
  containerTypes: SceneContainerType[]; // 容器类型
}

/**
 * 场景的主要信息。
 */
export interface SceneDigest {
  id: string  // 唯一 ID
  name: string // 人可见的名字
  disabled?: boolean
  version: number // 版本号
  displayOrder?: number // 显示顺序
  lastModifiedOn: Date; // 最后修改时间
}

/**
 * 表示场景中一个机器人组。
 */
export interface RobotGroup {
  id: number; // 组 ID
  name: string; // 组名
  disabled?: boolean; // 停用
  displayOrder: number; // 显示顺序，给界面用
  remark?: string; // 备注
  robots: SceneRobot[]; // 组内机器人
  collisionModel?: RobotGroupCollisionModel; // 机器人组的碰撞模型
}

/**
 * 机器人标签。考虑到未来可能要给标签属性，建模为一个类。
 */
export interface RobotTag {
  name: string; // 名字是标识
}

/**
 * 表示组内一个机器人的配置。
 */
export interface SceneRobot {
  robotName: string; // 机器人名称
  disabled?: boolean; // 停用
  remark?: string; // 备注
  tags: string[]; // 标签
  vendor?: string // 厂商
  selfBinNum?: number; // 机器人库位数；一次能载几个货
  image?: any // 机器人图片
  connectionType?: string // 连接类型
  robotIp?: string // 机器人 IP
  robotPortStart?: number // 机器人起始端口
  ssl?: boolean // 海柔：连接使用 SSL 加密
}

/**
 * 表示机器人组的碰撞模型。
 */
export interface RobotGroupCollisionModel {
  volume: number; // 体积
}

/**
 * 表示一个场景的地图集。
 */
export interface SceneMapSet {
  areas: SceneArea[]; // 地图区域
}

/**
 * 表示场景中一个区域。
 */
export interface SceneArea {
  id: number; // 唯一 ID，在整个场景内唯一。主要用于编辑，业务不用。
  name: string; // 区域名称，接口和界面上显示名称。
  disabled?: boolean; // 停用
  displayOrder?: number; // 显示顺序，给界面用
  remark?: string; // 备注
  mergedMap: SceneAreaMap; // 合并区域中多个机器人组的地图后的地图
  groupsMap: MapToTyped<RobotAreaMapRecord>; // 每个机器人组的地图
}

/**
 * 一个区域的地图。
 */
export interface SceneAreaMap {
  bound: Rect; // 区域界限，能容纳这个区域上所有元素的矩形
  points: MapPoint[]; // 点位
  paths: MapPath[]; // 路径
  zones: MapZone[]; // 区块
  // binPoints: SceneBinPoint[]; // 库位点
  bins: SceneBin[]; // 库位
  restrictedLines: MapRestrictedLine[] // 禁行线
  // TODO 门、电梯、禁行线、装饰性元素
  sourceMaps?: string[]; // 如果此地图从某个源地图生成，则记录源地图的名称
  envPointCloud?: EnvPointCloud | null; // 环境点云
}

/**
 * 场景中的点位。
 */
export interface MapPoint {
  id: number; // 唯一 ID，在整个场景内唯一。主要用于编辑，业务不用。
  name: string; // 点位名称，接口和界面上显示名称。
  type: string // 类型，如 LocationMark
  x: number;
  y: number;
  disabled: boolean; // 停用
  remark: string; // 备注
  parkAllowed: boolean // 允许停靠
}

/**
 * 场景中的路径。
 */
export interface MapPath {
  id: number; // 唯一 ID，在整个场景内唯一。主要用于编辑，业务不用。
  fromPointId: number; // 起点
  fromPointName: string;
  toPointId: number; // 终点
  toPointName: string;
  disabled: boolean; // 停用
  remark: string; // 备注
  degree: number; // 形状参数：度数。控制点中具有全局影响的点的数量。增加度数会增加曲线连续性。
  knots: number[]; // 形状参数：节数组。个数等于控制点数 + 度数 + 1。
  controls: Point2D[]; // 形状参数： 控制点数组：包含起点和终点。每个控制点由 x, y 和权重组成。
  actualLength: number; // 路径实际长度，默认无限大 —— 算不出来就不用用这条路
  costFactor: number // 成本因子，乘以 actualLength
  middlePoint: CurvePoint2D; // 路径的中点
  tracePoints: CurvePoint2D[] // 轨迹点，路径上的 N 个点。注意中点不一定在这个列表里。
  key: string // 路径的唯一键
}

//   val shape: ZoneShape = ZoneShape.Rect, // 区块形状
//   val rect: Rect = Rect(), // 用于描述矩形区块
//   val polygon: List<Point2D>, // 用于描述多边形区块
// )

/**
 * 场景中的区块。
 */
export interface MapZone {
  id: number; // 唯一 ID，在整个场景内唯一。主要用于编辑，业务不用。
  name: string; // 区块名称。一般自动生成，也可以手工指定。接口和界面上显示名称。
  disabled: boolean; // 停用
  type: string
  remark: string; // 备注
  // shape: ZoneShape; // 区块形状
  // rect: Rect; // 用于描述矩形区块
  polygon: Point2D[]; // 用于描述多边形区块
}

/**
 * 区块形状
 */
export type ZoneShape = 'Rect' | 'Polygon'

/**
 * 禁行线。一根直线，机器人禁止穿越、旋转碰撞。
 */
export interface MapRestrictedLine {
  id: number; // 唯一 ID，在整个场景内唯一。主要用于编辑，业务不用。
  disabled?: boolean; // 停用
  remark?: string
  p1: Point2D // 直线点 1
  p2: Point2D // 直线点 2
}

/**
 * 库位点。放置货物容器的位置（和范围）。
 */
export interface SceneBinPoint {
  id: number; // 唯一 ID，在整个场景内唯一。主要用于编辑，业务不用。
  disabled: boolean; // 停用
  x: number;
  y: number;
  layers: number; // 层数
  polygon: Point2D[]; // 描述货物放置的范围
}

/**
 * 场景里的一个库位
 */
export interface SceneBin {
  id: number; // 唯一 ID，在整个场景内唯一。主要用于编辑，业务不用。
  name: string; // 库位名称
  x: number;
  y: number;
  layerNo: number; // 层号，从 1 开始
  disabled: boolean; // 停用
  workPointId: number; // 取放货关联点位。core 存在未绑定的库位
  workPointName: string // 取放货关联点位。
  remark: string; // 备注
}

/**
 * 一个区域的环境点云
 */
export interface EnvPointCloud {
  imagePath: string; // 图片路径，用于显示。
  // val pointsFilePath: string = "", // 点云文件路径，用于计算
  width: number; // 现场宽度，单位米
  height: number;
  imageWidth: number; // 图片宽度，单位像素
  imageHeight: number;
  scale: number; // 每米用图片多少像素表示
  imageOriginX: number; // 原点在图片中的位置，单位像素
  imageOriginY: number;
}

/**
 * 表示机器人的一张地图。
 */
export interface RobotAreaMapRecord {
  mapName?: string; // 用户、接口使用的地图名称。
  mapFile?: string; // 地图在磁盘存放文件路径。
  mapMd5?: string; // MD5
  remark?: string; // 自定义备注。
}

/**
 * 一个容器类型
 */
export interface SceneContainerType {
  id: number; // 唯一 ID，在整个场景内唯一。主要用于编辑，业务不用。
  name: string; // 类型名称
  disabled: boolean; // 停用
  displayOrder: number; // 显示顺序，给界面用
  remark: string; // 备注
  imagePath: string; // 图片路径，用于显示
}