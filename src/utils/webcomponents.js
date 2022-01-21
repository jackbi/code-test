/*
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-12-23 09:54:37
 * @LastEditors: wenbin
 * @LastEditTime: 2021-12-23 10:25:41
 * @FilePath: /bi-table-test/src/utils/webcomponents.js
 * Copyright (C) 2021 wenbin. All rights reserved.
 */
class Names extends HTMLElement {
  constructor() {
    super();
    this.creatShadow();
  }
  /**
   * 封闭内部dom
   */
  creatShadow() {
    this.shadow = this.attachShadow({ mode: "closed" });
    console.log(this.shadow);
  }
  /**
   * 创建内部显示内容
   */
  creatContent() {
    var templateElem = document.getElementById("userCardTemplate");
    var content = templateElem.content.cloneNode(true);
    content
      .querySelector("img")
      .setAttribute("src", this.getAttribute("image"));
    content.querySelector(".container>.name").innerText = this.getAttribute(
      "name"
    );
    content.querySelector(".container>.email").innerText = this.getAttribute(
      "email"
    );
    this.shadow.appendChild(content);
  }
  /**
   * 当自定义元素第一次被连接到文档DOM时被调用
   * 相当于mounted
   */
  connectedCallback() {
    console.log("connectedCallback");
  }
  /**
   * 当自定义元素与文档DOM断开连接时被调用。
   * 与beforeDestroy类似
   */
  disconnectedCallback() {
    console.log("disconnectedCallback");
  }
  /**
   * 当自定义元素被移动到新文档时被调用。
   */
  adoptedCallback() {
    console.log("adoptedCallback");
  }
  /**
   * 暴露哪些属性可以被监听
   * @returns {string[]}
   */
  static get observedAttributes() {
    return ["image", "name", "email"];
  }
  /**
   * 当自定义元素的一个属性被增加、移除或更改时被调用。
   */
  attributeChangedCallback() {
    console.log("attributeChangedCallback");
  }
}

// export class Gender extends HTMLElement {
//   constructor() {
//     // 必须首先调用 super方法
//     super();

//     this.innerText = "测试2";

//     // 添加方法
//     this.onclick = () => {
//       console.log("点击测试2");
//     };
//   }
// }

window.customElements.define("my-name", Names);
window.customElements.define(
  "gender-info",
  class extends HTMLElement {
    constructor() {
      // 必须首先调用 super方法
      super();
    }
    connectedCallback() {
      this.innerHTML = "测试1";
      this.onclick = function() {
        console.log("1111");
      };
    }
  }
);

// customElements.define('my-name', Names, {extends: 'div'});
