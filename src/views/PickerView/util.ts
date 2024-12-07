function momentum(current, start, duration, minY, maxY, wrapperHeight) {
  const durationMap = {
    noBounce: 400,
    weekBounce: 100,
    strongBounce: 75
  }
  const bezierMap = {
    noBounce: 'cubic-bezier(.17, .89, .45, 1)',
    weekBounce: 'cubic-bezier(.25, .46, .45, .94)',
    strongBounce: 'cubic-bezier(.25, .46, .45, .94)'
  }
  let type = 'noBounce'
  // 惯性滑动加速度
  // @en inertial sliding acceleration
  const deceleration = 0.003
  // 回弹阻力
  // @en rebound resistance
  const bounceRate = 5
  // 强弱回弹的分割值
  // @en Split value of strong and weak rebound
  const bounceThreshold = 300
  // 回弹的最大限度
  // @en maximum rebound
  const maxOverflowY = wrapperHeight / 6
  let overflowY

  const distance = current - start
  const speed = (2 * Math.abs(distance)) / duration
  let destination = current + (speed / deceleration) * (distance < 0 ? -1 : 1)
  if (destination < minY) {
    overflowY = minY - destination
    type = overflowY > bounceThreshold ? 'strongBounce' : 'weekBounce'
    destination = Math.max(minY - maxOverflowY, minY - overflowY / bounceRate)
  } else if (destination > maxY) {
    overflowY = destination - maxY
    type = overflowY > bounceThreshold ? 'strongBounce' : 'weekBounce'
    destination = Math.min(maxY + maxOverflowY, maxY + overflowY / bounceRate)
  }

  return {
    destination,
    duration: durationMap[type],
    bezier: bezierMap[type]
  }
}
