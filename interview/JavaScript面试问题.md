### js面试问题
#### 介绍js的基本数据类型
> js 一共有六种基本数据类型，分别是 `Undefined、Null、Boolean、Number、String`，还有在 ES6 中新增的 `Symbol` 类型，代表创建后独一无二且不可变的数据类型，它的出现我认为主要是为了解决可能出现的全局变量冲突的问题。

#### JavaScript 有几种类型的值？你能画一下他们的内存图吗？
涉及知识点：

- 栈：原始数据类型（`Undefined、Null、Boolean、Number、String`）
- 堆：引用数据类型（对象、数组和函数）

> 两种类型的区别是：存储位置不同。
> **原始数据类型直接存储在栈（`stack`）中的简单数据段**，占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储。
> **引用数据类型存储在堆（`heap`）中的对象**，占据空间大、大小不固定。如果存储在栈中，将会影响程序运行的性能；引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。

回答：

> js 可以分为两种类型的值，一种是基本数据类型，一种是复杂数据类型。<br>
> 基本数据类型....（参考1）<br>
> 复杂数据类型指的是 Object 类型，所有其他的如 Array、Date 等数据类型都可以理解为 Object 类型的子类。<br>
> 两种类型间的主要区别是它们的存储位置不同，基本数据类型的值直接保存在栈中，而复杂数据类型的值保存在堆中，通过使用在栈中保存对应的指针来获取堆中的值。

详细资料可以参考：
- [《JavaScript 有几种类型的值？》](https://blog.csdn.net/lxcao/article/details/52749421)
- [《JavaScript 有几种类型的值？能否画一下它们的内存图》](https://blog.csdn.net/jiangjuanjaun/article/details/80327342)

#### 什么是堆？什么是栈？它们之间有什么区别和联系？
> 堆和栈的概念存在于数据结构中和操作系统内存中。<br>
> 在数据结构中，栈中数据的存取方式为先进后出。而堆是一个优先队列，是按优先级来进行排序的，优先级可以按照大小来规定。完全二叉树是堆的一种实现方式。<br>
> 在操作系统中，内存被分为栈区和堆区。<br>
> 栈区内存由编译器自动分配释放，存放函数的参数值，局部变量的值等。其操作方式类似于数据结构中的栈。<br>
> 堆区内存一般由程序员分配释放，若程序员不释放，程序结束时可能由垃圾回收机制回收。

详细资料可以参考：
[《什么是堆？什么是栈？他们之间有什么区别和联系？》](https://www.zhihu.com/question/19729973)

#### 内部属性 [[Class]] 是什么？
> 所有 typeof 返回值为 "object" 的对象（如数组）都包含一个内部属性 [[Class]]（我们可以把它看作一个内部的分类，而非
> 传统的面向对象意义上的类）。这个属性无法直接访问，一般通过 `Object.prototype.toString(..)` 来查看。例如：<br>
> ```js
> Object.prototype.toString.call( [1,2,3] );
> // "[object Array]"
> Object.prototype.toString.call( /regex-literal/i );
> // "[object RegExp]"
> ```

#### 介绍 js 有哪些内置对象？
涉及知识点：

> 全局的对象（ global objects ）或称标准内置对象，不要和 `"全局对象（global object）" `混淆。这里说的全局的对象是说在全局作用域里的对象。全局作用域中的其他对象可以由用户的脚本创建或由宿主程序提供。<br>
> 标准内置对象的分类<br>
>（1）值属性，这些全局属性返回一个简单值，这些值没有自己的属性和方法。<br>
> 例如 `Infinity、NaN、undefined、null` 字面量<br>
>（2）函数属性，全局函数可以直接调用，不需要在调用时指定所属对象，执行结束后会将结果直接返回给调用者。<br>
> 例如 `eval()、parseFloat()、parseInt()` 等<br>
>（3）基本对象，基本对象是定义或使用其他对象的基础。基本对象包括一般对象、函数对象和错误对象。<br>
> 例如 `Object、Function、Boolean、Symbol、Error` 等<br>
>（4）数字和日期对象，用来表示数字、日期和执行数学计算的对象。<br>
> 例如 `Number、Math、Date`<br>
>（5）字符串，用来表示和操作字符串的对象。<br>
> 例如 `String、RegExp`<br>
>（6）可索引的集合对象，这些对象表示按照索引值来排序的数据集合，包括数组和类型数组，以及类数组结构的对象。例如 Array<br>
>（7）使用键的集合对象，这些集合对象在存储数据时会使用到键，支持按照插入顺序来迭代元素。<br>
> 例如 Map、Set、WeakMap、WeakSet<br>
>（8）矢量集合，SIMD 矢量集合中的数据会被组织为一个数据序列。<br>
> 例如 SIMD 等<br>
>（9）结构化数据，这些对象用来表示和操作结构化的缓冲区数据，或使用 JSON 编码的数据。<br>
> 例如 JSON 等<br>
>（10）控制抽象对象<br>
> 例如 Promise、Generator 等<br>
>（11）反射<br>
> 例如 Reflect、Proxy<br>
>（12）国际化，为了支持多语言处理而加入 ECMAScript 的对象。<br>
> 例如 Intl、Intl.Collator 等<br>
>（13）WebAssembly<br>
>（14）其他<br>
> 例如 arguments

回答：

> js 中的内置对象主要指的是在程序执行前存在全局作用域里的由 js 定义的一些全局值属性、函数和用来实例化其他对象的构造函数对象。一般我们经常用到的如全局变量值 `NaN、undefined`，全局函数如 `parseInt()、parseFloat()` 用来实例化对象的构造函数如 `Date、Object` 等，还有提供数学计算的单体内置对象如 `Math` 对象。

详细资料可以参考：
[《标准内置对象的分类》](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects)
[《JS 所有内置对象属性和方法汇总》](https://segmentfault.com/a/1190000011467723#articleHeader24)