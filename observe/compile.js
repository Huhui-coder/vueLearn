// compiler 分为三步 分别是 parse optimize generate 

// parse 会用正则等方式将 template 模板中进行字符串解析，得到指令、class、style等数据，形成 AST
// template -> parse() => AST

// template 模板代码

// <div :class="c" class="demo" v-if="isShow">
//     <span v-for="item in sz">{{item}}</span>
// </div>

// AST

// {
//     /* 标签属性的map，记录了标签上属性 */
//     'attrsMap': {
//         ':class': 'c',
//         'class': 'demo',
//         'v-if': 'isShow'
//     },
//     /* 解析得到的:class */
//     'classBinding': 'c',
//     /* 标签属性v-if */
//     'if': 'isShow',
//     /* v-if的条件 */
//     'ifConditions': [
//         {
//             'exp': 'isShow'
//         }
//     ],
//     /* 标签属性class */
//     'staticClass': 'demo',
//     /* 标签的tag */
//     'tag': 'div',
//     /* 子标签数组 */
//     'children': [
//         {
//             'attrsMap': {
//                 'v-for': "item in sz"
//             },
//             /* for循环的参数 */
//             'alias': "item",
//             /* for循环的对象 */
//             'for': 'sz',
//             /* for循环是否已经被处理的标记位 */
//             'forProcessed': true,
//             'tag': 'span',
//             'children': [
//                 {
//                     /* 表达式，_s是一个转字符串的函数 */
//                     'expression': '_s(item)',
//                     'text': '{{item}}'
//                 }
//             ]
//         }
//     ]
// }


//   advance 因为我们解析 template 采用循环进行字符串匹配的方式，所以每匹配解析完一段我们需要将已经匹配掉的去掉，头部的指针指向接下来需要匹配的部分。

// parseHTML