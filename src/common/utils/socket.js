/*
 * @Description: 
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-06-01 14:37:50
 * @LastEditors: wenbin
 * @LastEditTime: 2021-10-26 13:54:46
 * @FilePath: /bi-table-test/src/common/utils/socket.js
 * Copyright (C) 2021 wenbin. All rights reserved.
 */
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
// import '../link/sockjs.min.js';
// import '../link/stomp.min.js';
// var SockJS = require('../link/sockjs.min.js')
// var Stomp = require('../link/stomp.min.js')

class socket {
  constructor (socketUrl) {
    this.sock = new SockJS(socketUrl);
  }
  initWebSocket (callback) {
    // this.connect(callback)
    const self = this
    // 断开重连机制,尝试发送消息,捕获异常发生时重连

    this.timer = setInterval(() => {
      self.connect(callback)
    }, 5000)
  }
  connect(callback) {
    this.stompClient = Stomp.over(this.sock)
    const token = localStorage.getItem('token')
    let sendData = {};
    if (token) {
      sendData.Authorization = `Bearer ${token}`
    }
    // const token = sessionStorage.getItem('cookieaccess_token')
    // 向服务器发起websocket连接
    this.stompClient.connect(sendData, (message) => {
      // console.log('connect', url);
      // console.log('connect', message);
      // this.subscribe(url)
      if (this.timer) {
        console.log('成功')
        clearInterval(this.timer);
      }
      callback()
    }, error => {
      this.initWebSocket(callback)
    })
  }
  sender(url, datas = {}) {
    this.stompClient.send(url, {}, JSON.stringify(datas))
  }
  disconnect () {
    if (this.stompClient !== null) {
      this.stompClient.disconnect()
      if (this.timer) {
        clearInterval(this.timer);
      }
      console.log('Disconnected')
    }
  }
  subscribe (url, callback) { // 订阅公告
    const _this = this
    _this.stompClient.subscribe(url, function (msg) {
      if (msg && msg.body) {
        callback(JSON.parse(msg.body))
      }
    })
  }
}

export default socket