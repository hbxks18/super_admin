import { observable, configure, action, runInAction, isObservable } from "mobx"
import { asyncAction } from "@/utils/mobxUtils"
import { loading } from "@/utils/decorator"

configure({
  enforceActions: "always",
})
/**
 * 超类，一些page store 用到的方法可以写到此处
 *
 * @export
 * @class SuperStroe
 */
export default class SuperStroe {
  constructor() {
    this.init()
  }

  init() {
    if (this.loading) {
      this.loading.forEach(item => {
        asyncAction(this, item)
      })
    }
  }

  @action setVal = (name, value, key) => {
    if (!isObservable(this[name])) {
      throw new Error(`${name} 未被观察`)
    }
    if (key) {
      this[name][key] = value
    } else {
      this[name] = value
    }
  }

  // 清空查询条件
  @action clear = () => {
    if (this.pagination && this.query) {
      this.pagination = {
        page: 1,
        page_size: 10,
      }
      this.query = {}
    }
  }

  // 列表翻页统一方法
  @action onChangePage = (page, page_size) => {
    if (this.pagination && this.load) {
      this.pagination.page = page
      this.pagination.page_size = page_size
      this.load()
    }
  }
}
