import { observable, configure, action, runInAction } from "mobx"

import { loading } from "@/utils/decorator"
import SuperStroe from "@/store/Super"

/**
 * 当前页面的Store
 *
 * @export
 * @class Store
 */
class Store extends SuperStroe {
  @observable pagination = {
    page: 1,
    page_size: 10,
  }
  @observable query = {}

  @observable count = 1

  @action setCount = v => {
    this.count = v
  }
}

export default new Store()
