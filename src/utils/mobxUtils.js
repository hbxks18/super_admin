import { extendObservable, runInAction } from "mobx"

const SUFFIX = { LOADING: "Loading" }

export const asyncAction = (currClass, actionName) => {
  extendObservable(currClass, {
    [`${actionName}${SUFFIX.LOADING}`]: false,
  })
  const old = currClass[actionName]
  currClass[actionName] = async (...args) => {
    if (currClass[`${actionName}${SUFFIX.LOADING}`]) {
      return null
    }
    runInAction(() => {
      currClass[`${actionName}${SUFFIX.LOADING}`] = true
    })
    const data = await old(...args)
    runInAction(() => {
      currClass[`${actionName}${SUFFIX.LOADING}`] = false
    })
    return data
  }
}
