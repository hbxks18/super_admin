export const arrayTreeFilter = (
  data = [],
  filterFn,
  options = { childrenKeyName: "children" }
) => {
  let children = data
  const result = []
  let level = 0
  do {
    const foundItem = children.filter(item => filterFn(item, level))[0]
    if (!foundItem) {
      break
    }
    result.push(foundItem)
    children = foundItem[options.childrenKeyName] || []
    level += 1
  } while (children.length)
  return result
}
