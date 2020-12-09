// Vue中修改一个数据 会经过 setter -> Dep -> Watcher -> patch -> 视图

// 如果在一个函数中，我们对一个data中的属性累加了1000次，那么会触发1000次 setter -> Dep -> Watcher -> patch -> 视图吗？
// 如果， 这样的话， DOM会被更新1000次，效率极低。

// Vue.js在默认情况下，每次触发某个数据的 setter 方法后，对应的 Watcher 对象其实会被 push 进一个队列 queue 中，在下一个 tick 的时候将这个队列 queue 全部拿出来 run（ Watcher 对象的一个方法，用来触发 patch 操作） 一遍