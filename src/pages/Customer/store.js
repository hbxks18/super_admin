import { observable, configure, action, runInAction } from "mobx"

import { loading } from "@/utils/decorator"
import { MODAL_TYPE } from "./enum"
import SuperStroe from "@/store/Super"

import api from "./services"

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

  @observable data = []

  @observable modalData = {
    visible: false,
    type: MODAL_TYPE.DEFINE.CREATE,
  }

  @action.bound @loading async load() {
    const params = { ...this.query, ...this.pagination }
    const res = await api.getDataList(params)
    if (res.success) {
      runInAction(() => {
        this.data = res.data.list
      })
    } else {
    }
  }

  @action.bound @loading async create(params, cb) {
    const res = await api.postCreate(params)
    if (res.success) {
      runInAction(() => {
        cb && cb()
      })
    }
  }

  @action.bound @loading async edit(params, cb) {
    const res = await api.postEdit(params)
    if (res.success) {
      runInAction(() => {
        cb && cb()
      })
    }
  }
}

export default new Store()
