// 实现使用函数调用xtx-message组件的逻辑
import { createVNode, render } from 'vue'
import MessagePopupVue from "@/component/MessagePopup.vue"

// 准备dom容器
const div = document.createElement('div')
div.setAttribute('class', 'message-container')
document.body.appendChild(div)
// 定时器标识

function popup_message(text: String, type: String) {
    console.log("popup_message called!!!")
    // 实现：根据xtx-message.vue渲染消息提示
    // 1. 导入组件
    // 2. 根据组件创建虚拟节点
    const vnode = createVNode(MessagePopupVue, { type, text })
    // 3. 准备一个DOM容器
    // 4. 把虚拟节点渲染挂载到DOM容器中
    const content = document.createElement('div')
    div.appendChild(content)
    render(vnode, content)
    // 5. 开启定时，移出DOM容器内容
    let timer = 0
    clearTimeout(timer)
    timer = setTimeout(() => {
        //div.removeChild(content)
    }, 3000)
}

export default popup_message;
