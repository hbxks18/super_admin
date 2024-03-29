import { observable, computed, action, runInAction } from "mobx"
import { arrayTreeFilter } from "@/utils/common"
import { config } from "@/router.js"
// import { loading } from "@/utils/decorator"
import SuperStroe from "./Super"

/**
 * 基类，用于存放一些全局使用的公用数据，每个页面都可以拿到该数据
 *
 * @export
 * @class BaseStore
 */
class BaseStore extends SuperStroe {
  @observable auth = [999] // 权限集合

  @observable currentOpenkeys = [] // 当前菜单的展开项

  @observable currentSelectedKeys = [] // 当前菜单的选中项

  @computed get getRouteBySelectedKeys() {
    // 当前path对应的菜单路由
    const routes = arrayTreeFilter(config, (item, level) => {
      if (this.currentSelectedKeys[level]) {
        return (
          item.path === this.currentSelectedKeys[level] ||
          item.key === this.currentSelectedKeys[level]
        )
      }
      return false
    })
    return routes
  }

  @computed get getCurrentPageTitle() {
    // 当前页面的title
    const selectedRoute = this.getRouteBySelectedKeys
    return selectedRoute[selectedRoute.length - 1]?.name
  }

  @observable
  version = "0.0.1"

  @action.bound handleUpdateVersion(v) {
    this.version = v
  }
}

export default new BaseStore()
