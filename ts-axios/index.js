"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
// 일반 객체 판별
function isAxiosData(data) {
    if (data !== null)
        return false; // ! 자바스크립트에서 null의 type은 object이다.
    if (data instanceof FormData)
        return false;
    return typeof data === 'object';
}
var axios = {
    defaults: {
        baseUrl: '',
        headers: {}
    },
    get: function (url, config) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve({
                        data: xhr.responseText,
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                }
                else {
                    reject({
                        data: xhr.responseText,
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                }
            };
            xhr.onerror = function () {
                reject({
                    data: xhr.responseText,
                    status: xhr.status,
                    statusText: xhr.statusText
                });
            };
            xhr.open('GET', axios.defaults.baseUrl + url);
            var headers = __assign(__assign({}, axios.defaults.headers), config === null || config === void 0 ? void 0 : config.headers);
            Object.keys(headers).map(function (key) {
                xhr.setRequestHeader(key, config.headers[key]);
            });
            xhr.withCredentials = (config === null || config === void 0 ? void 0 : config.withCredentials) || false;
            xhr.send();
        });
    },
    post: function (url, data, config) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve({
                        data: xhr.responseText,
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                }
                else {
                    reject({
                        data: xhr.responseText,
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                }
            };
            xhr.onerror = function () {
                reject({
                    data: xhr.responseText,
                    status: xhr.status,
                    statusText: xhr.statusText
                });
            };
            xhr.open('POST', axios.defaults.baseUrl + url);
            var headers = __assign(__assign({}, axios.defaults.headers), config === null || config === void 0 ? void 0 : config.headers);
            Object.keys(headers).map(function (key) {
                xhr.setRequestHeader(key, (config === null || config === void 0 ? void 0 : config.headers)[key]);
            });
            xhr.withCredentials = (config === null || config === void 0 ? void 0 : config.withCredentials) || false;
            if (isAxiosData(data)) {
                xhr.send(JSON.stringify(data));
            }
            else {
                xhr.send(data);
            }
        });
    },
    put: function (url, data, config) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve({
                        data: xhr.responseText,
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                }
                else {
                    reject({
                        data: xhr.responseText,
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                }
            };
            xhr.onerror = function () {
                reject({
                    data: xhr.responseText,
                    status: xhr.status,
                    statusText: xhr.statusText
                });
            };
            xhr.open('PUT', axios.defaults.baseUrl + url);
            var headers = __assign(__assign({}, axios.defaults.headers), config === null || config === void 0 ? void 0 : config.headers);
            Object.keys(headers).map(function (key) {
                xhr.setRequestHeader(key, (config === null || config === void 0 ? void 0 : config.headers)[key]);
            });
            xhr.withCredentials = (config === null || config === void 0 ? void 0 : config.withCredentials) || false;
            // ! 일반객체는 send할 수 없으므로 문자열로 바꿔서 보낸다.
            if (isAxiosData(data)) {
                xhr.send(JSON.stringify(data));
            }
            else {
                xhr.send(data);
            }
        });
    },
    "delete": function (url, config) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve({
                        data: xhr.responseText,
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                }
                else {
                    reject({
                        data: xhr.responseText,
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                }
            };
            xhr.onerror = function () {
                reject({
                    data: xhr.responseText,
                    status: xhr.status,
                    statusText: xhr.statusText
                });
            };
            xhr.open('DELETE', axios.defaults.baseUrl + url);
            var headers = __assign(__assign({}, axios.defaults.headers), config === null || config === void 0 ? void 0 : config.headers);
            Object.keys(headers).map(function (key) {
                xhr.setRequestHeader(key, (config === null || config === void 0 ? void 0 : config.headers)[key]);
            });
            xhr.withCredentials = (config === null || config === void 0 ? void 0 : config.withCredentials) || false;
            xhr.send();
        });
    },
    patch: function (url, data, config) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve({
                        data: xhr.responseText,
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                }
                else {
                    reject({
                        data: xhr.responseText,
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                }
            };
            xhr.onerror = function () {
                reject({
                    data: xhr.responseText,
                    status: xhr.status,
                    statusText: xhr.statusText
                });
            };
            xhr.open('PATCH', axios.defaults.baseUrl + url);
            var headers = __assign(__assign({}, axios.defaults.headers), config === null || config === void 0 ? void 0 : config.headers);
            Object.keys(headers).map(function (key) {
                xhr.setRequestHeader(key, (config === null || config === void 0 ? void 0 : config.headers)[key]);
            });
            xhr.withCredentials = (config === null || config === void 0 ? void 0 : config.withCredentials) || false;
            // ! 일반객체는 send할 수 없으므로 문자열로 바꿔서 보낸다.
            if (isAxiosData(data)) {
                xhr.send(JSON.stringify(data));
            }
            else {
                xhr.send(data);
            }
        });
    }
};
exports["default"] = axios;
