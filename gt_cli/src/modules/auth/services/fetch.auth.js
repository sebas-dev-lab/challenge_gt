import fetchData from "../../../services/fetch_data.services";

export default class AuthServices {
  static login = async (data) => fetchData("POST", "auth/signin", data);
  static register = async (data) => fetchData("POST", "auth/register", data);
  static logout = async () => fetchData("GET", "auth/signout");
}
