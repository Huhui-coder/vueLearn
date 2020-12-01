class Watcher {
    constructor() {
        Dep.target = this
    }
    update() {
        console.log('update')
    }
}
class Dep {
    constructor() {
        this.subs = []
    }
    addSub(sub) {
        this.subs.push(sub)
    }
    notify() {
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}

new Watcher()
var dep = new Dep()
dep.addSub(Dep.target) // 在 Watcher 中 将 this 的值 赋值给了Dep.target, 然后 再 用dep.addSub 将当前 Watcher push 进去 那么自然 当前的 sub 就能使用 Watcher 中的方法啦。

dep.notify()

