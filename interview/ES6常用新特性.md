### ES6 常用新特性

平时项目开发中灵活运用 ES6+语法可以让开发者减少很多开发时间，提高工作效率。ES6 版本提供了很多新的特性，接下来我列举项目中常用的 ES6+的特性：

- let / const
- 箭头函数
- 解构赋值
- 默认参数
- 扩展运算符
- 类
- 字符串
- 数组
- Promise

#### ES6 的发展史

- 1996, ES1.0 Netscape 将 JS 提交给 ECMA 组织，ES 正式出现
- 1999, ES3.0 被广泛支持
- 2011, ES5.1 成为 ISO 国际标准
- 2015, ES6.0 正式发布

**注意**：ES6 是标准，JS 是实现。类似于后台里接口和接口实现类的关系

### var、let、const

#### var 的应用

1. 可用重复声明
   ```js
   var a = 123
   var a = 456
   alert(a) // 456 不报错
   ```
2. 不能定义常量
   ```js
   var a = 123
   a = 456
   // 值可以改变
   ```
3. 没有块级作用域
   ```js
   if (true) {
   	var a = 123
   }
   alert(a) // 123
   ```
4. 会变量提升预解释
   ```js
   console.log(a)
   var a = 123
   console.log(a)
   ```
   > 实例
   ```html
    <script>
        window.onload=function(){
            var aBtn=document.getElementsByTagName('input')
            for(let i=0;i<aBtn.length;i++){
                (function(i){
                    aBtn[i].onclick=function(){
                    alert(i);
                };
                })(i)
            }
        }
    </script>
    </head>
    <body>
        <input type="bu˚tton" value="星期一">
        <input type="button" value="星期二">
        <input type="button" value="星期三">
    </body>
   ```

#### let 的应用

1. 不可重复声明
   ```js
   let a = 123
   let a = 345
   alert(a) // 出现报错，因为相同的变量不能声明两次
   ```
2. 有块级作用域
   ```js
   if (true) {
   	let a = 123
   }
   alert(a) // a 没有定义
   ```
3. 不会预解析变量
   ```js
   console.log(a)
   let a = 123
   ```
   > 实例
   ```html
   <script>
     window.onload=function(){
         var aBtn=document.getElementsByTagName('input')
         for(let i=0;i<aBtn.length;i++){
             aBtn[i].onclick=function(){
                 alert(i);
             }
         }
     }
   </script>
   </head>
   <body>
       <input type="button" value="星期一">
       <input type="button" value="星期二">
       <input type="button" value="星期三">
   </body>
   ```

#### const 的应用

1. 不能重复声明
   ```js
   const a = 123
   const a = 123
   alert(a) // 相同变量不能声明两次
   ```
2. 不能修改
   ```js
   const a = 123
   a = 345
   alert(a) // 报错，不能修改
   ```
3. 有块级作用域
   ```js
   if (true) {
   	const a = 123
   }
   alert(a) // 报错，未定义
   ```
4. 不会预编译变量
   ```js
   console.log(a) // 语法错误
   let a = 123
   ```

#### 箭头函数

在使用箭头函数时需要注意：

- 如果只有一个参数，可以省略括号`()`
- 如果只有一个`return`，可以省略花括号`{}`
  **注意**：箭头函数与包围它的代码共享同一个`this`，能帮你很好的解决`this`的指向问题

> 普通函数和箭头函数的区别

```js
// 普通函数1
function show(){}

// 箭头函数1
let show()=>{}

// 普通函数2
function(){}

// 箭头函数2
()=>{}
```

#### 解构赋值

从数组和对象中提取值，对变量进行赋值，这被称为解构，解构赋值可以直接使用对象的某个属性，而不需要通过属性访问的形式使用

> 普通赋值和解构

```js
// 普通赋值
let arr = [1, 2, 3]
let a = arr[0]
let b = arr[1]
let c = arr[2]
console.log(a, b, c) // 1,2,3

//获取数组中的值
let [a, b, c] = [1, 2, 3]
console.log(a, b, c) //1,2,3

//获取数组中的值
let [a, b] = [123, 23]
console.log(a, b) //123 23

//获取对象中的值
let { a, c, d } = { a: 12, c: 5, d: 6 }
console.log(a, c, d)

//复杂解构
let [{ a, b }, [n1, n2, n3], num, str] = [
	{ a: 12, b: 4 },
	[2, 3, 6],
	787,
	'abcdes'
]
console.log(a, b, n1, n2, n3, num, str)

//复杂解构
let [json, arr, num, str] = [{ a: 12, b: 4 }, [2, 3, 6], 787, 'abcdes']
console.log(json, arr, num, str)
```

#### 默认参数

```js
$('#div1').animate({ width: '200px' })
$('#div1').animate({ width: '200px' }, 1000)

function show(a, b = 5, c = 12) {
	console.log(a, b, c)
}
show(99) //99 5 12(默认参数就是直接把值替换成没有定义值的)
```

#### 扩展运算符

- 收集剩余的参数
  ```js
  function show(a, b, ...args) {
  	alert(args)
  }
  show(12, 12, 34, 3, 2, 4, 28) //打印出来的结果是34,3,2,4,28   (...args必须放在最后面)
  ```
- 展开数组

  ```js
  //普通函数
  function show(a, b, c) {
  	alert(a)
  	alert(b)
  	alert(c)
  }
  show(1, 2, 3) //打印出来的结果弹出1,再弹出2，再弹出3

  //数组展开
  let arr1 = [1, 2, 3]
  let arr2 = [5, 6, 7]
  let arr = [...arr1, ...arr2]
  alert(arr)

  function show(...args) {
  	fn(...args)
  }
  function fn(a, b) {
  	alert(a + b)
  }
  show(12, 5) //弹出17
  ```

#### 数组

- map

  ```js
  //例子1
  [45,78,278,890]
  [
    {name:'one',level:0,role:9},
    {name:'two',level:0,role:8},
    {name:'three',level:0,role:7},
    {name:'four',level:0,role:6},
  ]

  //例子 2
  let arr=[12,5,8];
  let result = arr.map((item)=>{
  return item\*2;
  })
  alert(result)//24,10,16

  //例子 3
  let arr=[12,5,8];
  let result = arr.map(item=>item\*2);
  alert(result)//24,10,16
  ```

- reduce

  ```js
  //例子1,算平均数
  let score = [89, 12, 34, 23, 45, 55]
  let result = score.reduce(function(tmp, item, index) {
  	return tmp + item
  })
  alert(result / score.length) //43(把这几个数求平均数)

  //例子2
  let arr = [12, 67, 67, 889, 97]
  let result = arr.reduce(function(tmp, item, index) {
  	if (index != this.length - 1) {
  		//不是最后一次
  		return tmp + item
  	} else {
  		//最后一次
  		return tmp + item
  	}
  })
  alert(result) //1132
  ```

- filter

  ```js
  //例子1
  let arr = [12, 5, 8, 99, 67, 87]
  let result = arr.filter(item => {
  	if (item % 3 == 0) {
  		return true
  	} else {
  		return false
  	}
  })
  alert(result) //12,99,87

  //例子2
  let arr = [12, 5, 8, 99, 67, 87]
  let result = arr.filter(item => {
  	alert(item % 3 == 0)
  }) //弹出布尔值
  ```
- forEach
  ```js
  let arr=[12,3,45,6,566];
  arr.forEach((item,index)=>{
      alert(index+':'+item)//0:12  1:3  2:45  3:6  4:566
  }
  ```
#### 字符串