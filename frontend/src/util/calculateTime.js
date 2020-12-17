export default function calculateTime(time) {
  const timeData = new Date(time)
  const now = new Date()
  let diff = (now - timeData) / 1000

  if (diff < 60) {
    return ' < 1 minute ago'
  } else if ((diff /= 60) < 60) {
    return singularOrPlural(diff, 'minute')
  } else if ((diff /= 60) < 24) {
    return singularOrPlural(diff, 'hour')
  } else {
    diff /= 24
    return singularOrPlural(diff, 'day')
  }
}

const singularOrPlural = (time, text) => {
  if (Math.floor(time) === 1) return Math.floor(time) + ` ${text} ago`
  return Math.floor(time) + ` ${text}s ago`
}
