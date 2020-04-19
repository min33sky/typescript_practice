export interface AxiosConfig {
  headers?: {
    [key: string]: string;
  };
  withCredentials?: boolean;
}

export interface AxiosData {
  [key: string]: any;
}

export interface AxiosResult {
  data: any;
  status: number;
  statusText: string;
}

// 일반 객체 판별
function isAxiosData(data: any): data is AxiosData {
  if (data !== null) return false; // ! 자바스크립트에서 null의 type은 object이다.
  if (data instanceof FormData) return false;
  return typeof data === 'object';
}

export interface Axios {
  defaults: {
    baseUrl: string;
    headers: {
      [key: string]: string;
    };
  };
  get(url: string, config: AxiosConfig): Promise<AxiosResult>;
  post(
    url: string,
    data?: string | AxiosData | FormData,
    config?: AxiosConfig,
  ): Promise<AxiosResult>;
  put(
    url: string,
    data?: string | AxiosData | FormData,
    config?: AxiosConfig,
  ): Promise<AxiosResult>;
  delete(url: string, config?: AxiosConfig): Promise<AxiosResult>;
  patch(
    url: string,
    data?: string | AxiosData | FormData,
    config?: AxiosConfig,
  ): Promise<AxiosResult>;
}

const axios: Axios = {
  defaults: {
    baseUrl: '',
    headers: {},
  },

  get(url, config) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve({
            data: xhr.responseText,
            status: xhr.status,
            statusText: xhr.statusText,
          });
        } else {
          reject({
            data: xhr.responseText,
            status: xhr.status,
            statusText: xhr.statusText,
          });
        }
      };
      xhr.onerror = function () {
        reject({
          data: xhr.responseText,
          status: xhr.status,
          statusText: xhr.statusText,
        });
      };
      xhr.open('GET', axios.defaults.baseUrl + url);
      const headers = { ...axios.defaults.headers, ...config?.headers };
      Object.keys(headers).map((key) => {
        xhr.setRequestHeader(key, config.headers![key]);
      });
      xhr.withCredentials = config?.withCredentials || false;
      xhr.send();
    });
  },

  post(url, data, config) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve({
            data: xhr.responseText,
            status: xhr.status,
            statusText: xhr.statusText,
          });
        } else {
          reject({
            data: xhr.responseText,
            status: xhr.status,
            statusText: xhr.statusText,
          });
        }
      };
      xhr.onerror = function () {
        reject({
          data: xhr.responseText,
          status: xhr.status,
          statusText: xhr.statusText,
        });
      };
      xhr.open('POST', axios.defaults.baseUrl + url);
      const headers = { ...axios.defaults.headers, ...config?.headers };
      Object.keys(headers).map((key) => {
        xhr.setRequestHeader(key, config?.headers![key]);
      });
      xhr.withCredentials = config?.withCredentials || false;
      if (isAxiosData(data)) {
        xhr.send(JSON.stringify(data));
      } else {
        xhr.send(data);
      }
    });
  },

  put(url, data, config) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve({
            data: xhr.responseText,
            status: xhr.status,
            statusText: xhr.statusText,
          });
        } else {
          reject({
            data: xhr.responseText,
            status: xhr.status,
            statusText: xhr.statusText,
          });
        }
      };
      xhr.onerror = function () {
        reject({
          data: xhr.responseText,
          status: xhr.status,
          statusText: xhr.statusText,
        });
      };
      xhr.open('PUT', axios.defaults.baseUrl + url);
      const headers = { ...axios.defaults.headers, ...config?.headers };
      Object.keys(headers).map((key) => {
        xhr.setRequestHeader(key, config?.headers![key]);
      });
      xhr.withCredentials = config?.withCredentials || false;
      // ! 일반객체는 send할 수 없으므로 문자열로 바꿔서 보낸다.
      if (isAxiosData(data)) {
        xhr.send(JSON.stringify(data));
      } else {
        xhr.send(data);
      }
    });
  },

  delete(url, config) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve({
            data: xhr.responseText,
            status: xhr.status,
            statusText: xhr.statusText,
          });
        } else {
          reject({
            data: xhr.responseText,
            status: xhr.status,
            statusText: xhr.statusText,
          });
        }
      };
      xhr.onerror = function () {
        reject({
          data: xhr.responseText,
          status: xhr.status,
          statusText: xhr.statusText,
        });
      };
      xhr.open('DELETE', axios.defaults.baseUrl + url);
      const headers = { ...axios.defaults.headers, ...config?.headers };
      Object.keys(headers).map((key) => {
        xhr.setRequestHeader(key, config?.headers![key]);
      });
      xhr.withCredentials = config?.withCredentials || false;
      xhr.send();
    });
  },

  patch(url, data, config) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve({
            data: xhr.responseText,
            status: xhr.status,
            statusText: xhr.statusText,
          });
        } else {
          reject({
            data: xhr.responseText,
            status: xhr.status,
            statusText: xhr.statusText,
          });
        }
      };
      xhr.onerror = function () {
        reject({
          data: xhr.responseText,
          status: xhr.status,
          statusText: xhr.statusText,
        });
      };
      xhr.open('PATCH', axios.defaults.baseUrl + url);
      const headers = { ...axios.defaults.headers, ...config?.headers };
      Object.keys(headers).map((key) => {
        xhr.setRequestHeader(key, config?.headers![key]);
      });
      xhr.withCredentials = config?.withCredentials || false;
      // ! 일반객체는 send할 수 없으므로 문자열로 바꿔서 보낸다.
      if (isAxiosData(data)) {
        xhr.send(JSON.stringify(data));
      } else {
        xhr.send(data);
      }
    });
  },
};

export default axios;
