# Make Anki Card in nodejs
// 制作一些简单的anki卡片，用来记忆在学习过程中需要简单记忆（有印象）的知识

## 1.[Lodash][0]
> 一个 JavaScript 的实用工具库, 表现一致性, 模块化, 高性能, 以及 可扩展

[官网][1]

[0]: ./lodashOfAnki.js
[1]: https://www.lodashjs.com/

### 目前示例：
```json
chunk
_.chunk(array, [size=0])
将数组拆分成多个 size 长度的块，并组成一个新数组。如果数组无法被分割成全部等长的块，那么最后剩余的元素将组成一个块。
参数
array (Array) 需要被处理的数组 [size=0] (number) 每个块的长度     
返回值 (Array)
  返回一个拆分好的新数组
示例
_.chunk(['a', 'b', 'c', 'd'], 2);
// => [['a', 'b'], ['c', 'd']]

_.chunk(['a', 'b', 'c', 'd'], 3);
// => [['a', 'b', 'c'], ['d']]


----itemEnd-
compact
_.compact(array)
创建一个移除了所有假值的数组。例如：false、null、0、""、undefined， 以及NaN 都是 “假值”.
参数
array (Array) 需要被处理的数组。     
返回值 (Array)
  返回移除了假值的数组。
示例
_.compact([0, 1, false, 2, '', 3]);
// => [1, 2, 3]


----itemEnd-
    .
    .
    .
    .
uniqueId
_.uniqueId([prefix])
创建唯一ID。如果提供了 prefix，会被添加到ID前缀上。
参数
[prefix] (string) 要添加到ID前缀的值     
返回值 (string)
  返回唯一ID
示例
_.uniqueId('contact_');
// => 'contact_104'

_.uniqueId();
// => '105'


----itemEnd-
```
