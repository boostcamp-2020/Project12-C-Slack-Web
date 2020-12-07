const dmTitleGenerator = member => {
  return member.reduce(function (acc, curr, idx) {
    if (idx === 0) return curr.displayName
    return acc + ', ' + curr.displayName
  }, '')
}

export default dmTitleGenerator
