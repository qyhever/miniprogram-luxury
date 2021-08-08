
export function showAlertModal (message) {
  return uni.showModal({
    title: '温馨提示',
    content: message,
    showCancel: false,
    confirmText: '我知道了',
    confirmColor: '#e5c0a3'
  })
}

export function listToTree (list, id) {
  const ret = []
  const temp = list.filter(v => v.pid === id)
  temp.forEach(v => {
    ret.push({
      id: v.id,
      name: v.name,
      children: listToTree(list, v.id)
    })
  })
  return ret
}

export function formatSeconds (seconds, showHours) {
  let [hour, minute, second] = [0, 0, 0]
  // hour为给后面计算秒和分等用的(基于显示天的前提下计算)
  hour = Math.floor(seconds / (60 * 60))
  minute = Math.floor(seconds / 60) - hour * 60
  second = Math.floor(seconds) - hour * 60 * 60 - minute * 60

  let showMinute = null
  if (showHours) {
    showMinute = minute
  } else {
    // 如果不显示小时，将“小时”部分的时间折算到“分”中去
    showMinute = Math.floor(seconds / 60)
  }
  // 如果小于10，在前面补上一个"0"
  hour = hour < 10 ? '0' + hour : hour
  showMinute = showMinute < 10 ? '0' + showMinute : showMinute
  second = second < 10 ? '0' + second : second
  if (showHours) {
    return [hour, showMinute, second].join(':')
  }
  return [showMinute, second].join(':')
}
