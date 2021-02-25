# tsconfig.json

## Downlevel Iteration-downlevelIteration
```Downleveling``` 是TypeScript用于转换旧版本JavaScript的术语。此标志用于支持更精确的实现现代JavaScript如何迭代旧版JavaScripts运行时中的新概念。
ES6添加了几种新的```迭代原语(iteration primitives)```：```for / of```循环(```for(el of arr)```)，```数组解构([a,...b])```，```arguments解构(fn(...args))```，和```Symbol.iterator```。     
写了这么多，才发现有中文页面，对照下来自己翻译的很垃圾    

总之这个选项是为了解决emoji的问题。摘取下方第二个参考里的一部分解释
```txt
The ghost emoji — or the code point U+1F47B, to be more precise — consists of the two code units U+D83D and U+DC7B. Because indexing into a string returns the code unit (rather than the code point) at that index, the emitted for-loop breaks up the ghost emoji into its individual code units.  
鬼的emoji---或者说 U+1F47B这个代码点(code points),更准确的说---由两个代码单元(code units)U+D83D和U+DC7B组成。由于字符串的索引会返回索引处的字符单元(而非字符点)
```
```txt
On the other hand, the string iteration protocol iterates over each code point of the string. This is why the output of the two programs differs. You can convince yourself of the difference by comparing the length property of the string and the length of the sequence produced by the string iterator:
另一方面，字符串迭代协议迭代字符串的每个代码点。这就是为什么两个程序会输出不同的结果。你可以通过以下程序验证：
```
```ts
const ghostEmoji = "\u{1F47B}";

console.log(ghostEmoji.length); // 2
console.log([...ghostEmoji].length); // 1
```
长话短说就是```for...of```循环在转换为ES3或者ES5时不总是正确的。这就是为什么需要```--downlevelIteration```标志(TypeScript 2.3引入)     

## 使用downlevelIteration
添加此项后，执行```tsc -p .```生成代码比不加的时候要复杂的多。同时能输出```for...of```循环正确的结果。因为它包含了正确的迭代协议的实现：
- __values帮助函数寻找[Symbol.iterator]方法并在找到时调用它。如果没找到，会在对象上创建一个合成数组迭代器
- 与迭代每个代码单元不同，for循环会一直调用迭代器的next()方法，直到done为false
- To implement the iteration protocol according to the ECMAScript specification, try/catch/finally blocks are generated for proper error handling.   

总之，开启此项，将使用辅助函数检查Symbol.iterator是否实现(无论原生还是polyfill)。如果没有实现，会回退到基于索引的迭代。
  
## 通过设置--importHelpers减少体积     
这个具体看参考吧。使用Map的时候有效。

参考： [Downlevel Iteration - downlevelIteration](https://www.typescriptlang.org/zh/tsconfig#downlevelIteration)       

[Downlevel Iteration for ES3/ES5 in TypeScript](https://mariusschulz.com/blog/downlevel-iteration-for-es3-es5-in-typescript )

["💩".length === 2](https://blog.jonnew.com/posts/poo-dot-length-equals-two)
```bash
curl cht.sh/typescript/downlevelIteration
```    