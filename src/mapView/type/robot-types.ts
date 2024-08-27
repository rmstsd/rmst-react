import { SceneRobot } from "./scene-types"
import { Point2D, Rect } from "./geo-types"
import { MapToTyped } from "../type"

/**
 * 机器人自身上报的信息
 */
export interface RobotSelfReport {
  error: boolean// 是否有错，如机器人离线
  errorMsg: string | null // 错误原因
  timestamp: string // 获取机器人报告的时间
  main: RobotSelfReportMain | null // 主要字段
  // rawReport: EntityValue | null // 原始报文
}

/**
 * 机器人自身上报的信息，主要、通用字段
 */
export interface RobotSelfReportMain {
  battery: number | null // 电池电量 0..1
  x: number | null // 机器人位置 x
  y: number | null // 机器人位置 y
  direction: number | null  // 机器人车头朝向（角度）
  currentMap: string | null // 当前地图名
  currentMapMd5: string | null // 当前地图 MD5
  currentPoint: string | null // 当前站点（MrSite.id）
  blocked: boolean | null // 是否被阻挡（障碍物、其他机器人、含义复杂……）
  charging: boolean | null // 充电中
  emergency: boolean | null // 急停按下
  relocStatusLabel: string | null // 重定位状态
  confidence: number | null // 定位置信度 0..1
  todayOdo: number | null // 今日里程
  currentLockNickName: string | null // 控制权所有者名称
  alarms: RobotAlarm[] | null // 告警
}

/**
 * 机器人告警
 */
export interface RobotAlarm {
  level: RobotAlarmLevel;
  code: string | null
  message: string
  times: number
  timestamp: string
}

/**
 * 机器人告警级别
 */
export type RobotAlarmLevel = "Info" | "Warning" | "Error" | "Fatal"

/**
 * 一个机器人的信息，给前端用，汇总所有信息
 */
export interface RobotUiReport {
  robotName: string;
  config: SceneRobot;
  groupId: number,
  groupName: string
  online: boolean;
  selfReport?: RobotSelfReport | null;
  orderRecord?: RobotOrderRecord | null;
  // 前端设置
  color?: string
}

/**
 * 机器人执行运单的状态
 */
export type RobotCmdStatus = "Idle" | "Moving" | "Interrupted" | "Failed"

/**
 * 机器人身上库位状态
 */
export interface RobotBin {
  index: number
  status: RobotBinStatus
  orderId: string | null // 与此库位关联的运单
}

/**
 * 机器人身上库位状态
 */
export type RobotBinStatus = "Empty" | "Reserved" | "Filled" | "Cancelled"

/**
 * 选择要执行的运单步骤
 */
export interface SelectedStepDigest {
  orderId: string
  stepId: string
  stepIndex: number
  stepLocation: string | null
  stepPointName: string | null
  stepPointCoordinate: Point2D | null
  cost: number
}

/**
 * 机器人处理运单的实时情况
 */
export interface RobotOrderRecord {
  offDuty: boolean
  cmdStatus: RobotCmdStatus
  orders: string[]
  bins: RobotBin[]
  nextSelected?: SelectedStepDigest | null // 下一步
  executingSelected?: SelectedStepDigest | null // 正在执行
}

/**
 * 资源申请和释放的最小单元
 */
export interface MapResourceUnit {
  unitId: string // 单元 ID
  items: MapResourceItem[] // 占用的资源空间
  reason: string // 原因
}

/**
 * 占用的一项空间资源
 */
export interface MapResourceItem {
  areaId: number // 在哪个区域！
  shape: MapResourceItemShape
  rect: Rect | null // 允许旋转
}

export type MapResourceItemShape = "RotatedRect" // 带旋转的矩形

/**
 * 已占用资源 robot name -> unit id -> unit
 */
export type MapResources = MapToTyped<MapToTyped<MapResourceUnit>>