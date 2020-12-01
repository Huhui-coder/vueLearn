// 模拟视图更新，当它被调用的时候，就代表进行视图更新操作
function cb(val) {
    console.log('渲染视图', val)
}

// 通过 Object.defineProperty 来实现对一个对象的响应式化
// 入参是三个参数， 需要绑定的对象(obj)，对象的某个属性(key), 具体的值 
function defineReactive(obj, key, val) {
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            console.log('进行了读取操作', val)
            return val
        },
        set: function reactiveSetter(newVal) {
            if (newVal === val) return
            cb(newVal)
        }
    })
}

// 入参是一个参数 value, 需要响应式化的对象， 
// 通过遍历， 将这个对象的每个属性都进行 defineReactive 处理，达到对对象下的每个属性都进行响应式化的处理

function observe(value) {
    if (!value || (typeof value !== 'object')) {
        return;
    }
    Object.keys(value).forEach((key) => {
        defineReactive(value, key, value[key])
    })
}

class Vue {
    constructor(options) {
        this._data = options.data;
        observe(this._data)
    }
}

let o = new Vue({
    data: {
        test: 'I am test'
    }
});

o._data.test = "hello vue.js"
console.log(o._data.test)