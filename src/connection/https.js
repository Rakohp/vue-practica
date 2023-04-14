import axios from "axios";

const headerConfig = {
  Accept: "application/json, text/plain, /",
  "Content-Type": "application/json;charset=UTF-8",
  "Access-Control-Allow-Origin": "*",
};

export const http = {
  get: function(
    endPoint = "",
    params = {}
    ) {
    return new Promise((resolve, reject) => {
      axios({
        baseURL: settingHttp.urlBase,
        method: "GET",
        url: endPoint,
        params: params,
        headers: headerConfig
      })
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          if (!error.toString().includes("404")) {
            reject(error);
          }
        });
    });
  },
  post: function(
    endPoint = "",
    params = {}
  ) {
    return new Promise((resolve, reject) => {
      axios({
        baseURL: settingHttp.urlBase,
        method: "POST",
        url: endPoint,
        data: params ? JSON.stringify(params) : null,
        headers: headerConfig,
        validateStatus: () => true,
      })
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
};

export const settingHttp = {
  urlBase: "",
};