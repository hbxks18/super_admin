import { observable, configure, action, runInAction } from "mobx"

// import { loading } from "@/utils/decorator"
import SuperStroe from "./Super"

/**
 * 基类，用于存放一些全局使用的公用数据，每个页面都可以拿到该数据
 *
 * @export
 * @class BaseStore
 */
class BaseStore extends SuperStroe {
  @observable version = "0.0.1"

  @action.bound handleUpdateVersion(v) {
    this.version = v
  }
}

export default new BaseStore()
