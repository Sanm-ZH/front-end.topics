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
