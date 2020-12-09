// render function 会转化成 VNode 节点，
// 其实 Virtual DOM 就是一棵以js对象(VNode节点)所组成的树。
// 用对象的属性来描述节点， 实际上它只是对 真实DOM的一层抽象，最终
// 可以转化成为真实的DOM树，由于它只依靠js环境，所以具备了跨平台的能力。


// Virtual DOM  与 AST 之间的区别
// Virtual DOM 是对 真实DOM 的抽象映射
// AST 是对模板语法的抽象映射
// template > ast > render function > 执行 render function > VNode

class VNode {
    constructor(tag, data, children, text, elm) {
        this.tag = tag // 当前节点的标签名
        this.data = data // 当前节点的数据信息，比如 props,attrs
        this.children = children // 当前节点的子节点，是一个数组
        this.text = text // 当前节点的文本信息
        this.elm = elm // 当前虚拟节点对应的真实节点
    }
}

<template>
    <span class="demo" v-show="isShow">
        This is a span
    </span>
</template>

// 转为为VNode

// {
//     tag: 'span',
//     data: {
//         direactives: [
//             {
//                 rawName: 'v-show',
//                 expression: 'isShow',
//                 name: 'show',
//                 value: true
//             }
//         ],
//         staticClass: 'demo'
//     },
//     text: undefined,
//     children: [
//         {
//             tag: undefined,
//             data: undefined,
//             text: 'This is a span',
//             children: undefined
//         }
//     ]
// }


// 一些 VNode 常用的方法

// 创建一个空节点
function createEmptyVNode() {
    const node = new VNode()
    node.text = ''
    return node
}

// 创建一个文本节点
function createTextVNode(val) {
    return new VNode(undefined,undefined,undefined,undefined, String(val))
}

// 克隆一个VNode节点
function cloneVNode(node) {
    const cloneNode = new VNode(...node)
    return cloneNode
}