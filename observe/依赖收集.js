// 为什么要进行依赖收集
// 收集了依赖之后，知道哪些是要更新的

// 订阅者 Dep, 存放 Watcher 观察者对象

class Dep {
    constructor() {
        // 用来存放Watcher对象的数组
        this.subs = [];
    }
    // 在 subs 中 添加一个 Watcher 对象 
    addSub(sub) {
        this.subs.push(sub)
    }
    // 通知所有的Watcher 对象更新视图
    notify() {
        this.subs.forEach((sub) => {
            sub.update()
        })
    }
}
// 观察者 Watcher

class Watcher {
    constructor() {
        // 在 new 一个 Watcher的时候将该对象赋值给Dep.targer, 在 get 中会用到
        Dep.target = this;
    }
    // 更新视图的方法
    update() {
        console.log('视图更新方法')
    }
}

function observer(value) {
    if (!value || (typeof value !== 'object')) {
        return;
    }

    Object.keys(value).forEach((key) => {
        defineReactive(value, key, value[key]);
    });
}

function defineReactive(obj, key, val) {
    // 一个 Dep 类对象
    const dep = new Dep()

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            dep.addSub(Dep.target)
            return val;
        },
        set: function reactiveSetter(newVal) {
            if (newVal === val) return;
            dep.notify();
        }
    })
}

Dep.target = null


class Vue {
    constructor(options) {
        this._data = options.data;
        observer(this._data)
        new Watcher()
        // 必须是先通过 getter 收集 依赖之后, 再使用 setter 触发的时候 才会正确的触发，执行 notify函数
        console.log('render~', this._data.test)
        console.log('render~', this._data.name)
    }
}

let o = new Vue({
    data: {
        test: 'I am test',
        name: 'hit'
    }
});
o._data.test = 'I am hit'
o._data.name = 'huhui'