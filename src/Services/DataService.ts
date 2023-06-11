import axios, { AxiosResponse } from "axios";

export default abstract class DataService {
  private static readonly API_BASE_URL: string =
    process.env.REACT_APP_ENV_API_BASE_URL ||
    "https://secure.kipsu.com/acct/api/v3/";

  protected axiosGet(url: string, apiKey: string): Promise<AxiosResponse> {
    return axios.get(DataService.API_BASE_URL + url, {
      headers: { "X-API-KEY": apiKey },
    });
  }

  protected axiosPost(
    url: string,
    data: any,
    apiKey: string
  ): Promise<AxiosResponse> {
    return axios.post(DataService.API_BASE_URL + url, data, {
      headers: { "X-API-KEY": apiKey },
    });
  }
}
