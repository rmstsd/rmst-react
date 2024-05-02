class InterceptorMng {
  list = []

  use(onFulfilled) {
    this.list.push(onFulfilled)
  }
  eject() {}
}

class Axios {
  interceptors = {
    request: new InterceptorMng(),
    response: new InterceptorMng()
  }

  request(config) {
    // 配置合并
    // 拦截器
    return this.dispatchRequest(config)
  }

  dispatchRequest(config) {
    return new Promise(resolve => {
      const { method, url } = config

      const request = new XMLHttpRequest()

      request.open(method, url, true)

      request.onreadystatechange = () => {
        if (request.readyState === 4 || request.status !== 0) {
          if (request.status >= 200 || request.status < 300) {
            const response = {
              data: request.response || request.responseText,
              status: request.status,
              statusText: request.statusText,
              headers: request.getAllResponseHeaders(),
              config
            }

            resolve(response)
          }
        }
      }

      request.send()
    })
  }
}

function createInstance() {
  const context = new Axios()

  let instance = Axios.prototype.request.bind(context)

  instance = Object.assign(instance, context)

  console.dir(instance)

  // instance.interceptors.request = {
  //   use: () => {},
  //   eject: () => {}
  // }

  // axios.interceptors.response = {
  //   use: () => {},
  //   eject: () => {}
  // }

  return instance
}

const axios = createInstance()

export default axios
