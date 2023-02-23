import fetchData from "../../../services/fetch_data.services";

export default class FetchTasksServices {
  static addItem = async (data) => fetchData("POST", "tasks", data);
  static editItem = async (id, data) => fetchData("PATCH", `tasks/${id}`, data);
  static getItems = async (q) => fetchData("GET", `tasks${q ? `?${q}` : ""}`);
  static getItemById = async (id) => fetchData("GET", `tasks/${id}`);
  static deleteItem = async (id) => fetchData("DELETE", `tasks/${id}`);
}
