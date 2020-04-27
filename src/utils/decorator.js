/* 装饰器 */

export const loading = (target, name, descriptor) => {
  if (!target.hasOwnProperty("loading")) target.loading = []
  target.loading.push(name)
  return descriptor
}

export const toProps = name => target => {
  target["__props"] = name
}
