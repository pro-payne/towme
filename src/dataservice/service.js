import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://towme-api.payne.cutag.co.za/api",
  validateStatus: (status: number) => {
    let correct = false;

    if (status >= 200 && status <= 403) {
      correct = true;
    } else if (status === 422) {
      correct = true;
    }

    return correct;
  },
});

const Request = (source: string) => {
  const thisInstance = axiosInstance;
  if (source === "") {
    const user = localStorage.getItem("user") || "";
    if (user !== "") {
      const token = JSON.parse(user);
      if (typeof token.accessToken !== "undefined") {
        thisInstance.defaults.headers.common.Authorization = `Bearer ${token.accessToken}`;
      }
    }
  } else {
    thisInstance.baseURL = "";
  }
  return thisInstance;
};

export function Post(url, data, source) {
  return Request(source === undefined ? "" : source).post(url, data);
}

export function Get(url, data, source) {
  const inputData = data || {};
  return Request(source === undefined ? "" : source).get(url, {
    params: inputData,
  });
}
