import { observable, configure, action, runInAction } from "mobx"

import { loading } from "@/utils/decorator"
import SuperStroe from "@/store/Super"

const mockAjax = (params, res) =>
  new Promise((resolve, reject) => {
    console.log("【参数】", params)
    setTimeout(() => {
      console.log("【结果】", res)
      resolve(res)
    }, 3000)
  })

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

  @action.bound @loading async load() {
    const params = { ...this.query, ...this.pagination }
    const res = await mockAjax(params, [
      {
        key: "1",
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        tags: ["nice", "developer"],
      },
      {
        key: "2",
        name: "Jim Green",
        age: 42,
        address: "London No. 1 Lake Park",
        tags: ["loser"],
      },
      {
        key: "3",
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
        tags: ["cool", "teacher"],
      },
    ])
    runInAction(() => {
      this.data = res
    })
  }
}

export default new Store()
