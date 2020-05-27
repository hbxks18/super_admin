import ajax from "@/utils/ajax"

const api = {
  getDataList: params => ajax.get("/api/customer/list", { params }),
  postCreate: params => ajax.get("/api/customer/create", { params }),
  postEdit: params => ajax.get("/api/customer/edit", { params }),
}

export default api
