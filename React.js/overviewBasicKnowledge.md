### 1、什么是JSX？
一个JSX语法的示例，如下所示
```js
const element = <h1>Hello, world!</h1>;
```
这种语法形式，既不是HTML，也不是字符串，而是称之为JSX，是React里用来描述UI和样式的语法，JSX最终会被编译为
合法的JS语句调用（编译器在遇到`{`时采用`JS`语法进行解析，遇到`<`就采用`HTML`规则进行解析）

### 2、嵌入表达式
JSX中，可以使用花括号{}嵌入任意的JavaScript合法表达式，如：1 + 1、user.firstName、formatName(user)都是合法的。

如下示例：
```js
const user = {
    firstName: 'Zhang',
    lastName : 'San'
};

const elem = (
    <h1>Hello, {formatName(user)}</h1>
);
/*
这里的()，实际上是可选的，但是React推荐加入()，这样子就会被视为一个表达式，而不会导致
自动插入分号的问题
*/

ReactDOM.render(
    element,
    document.getElementById('app')
)
```

### 3、JSX也是一种表达式
JSX本身也是一种表达式，所以它可以像其他表达式一样，用于给一个变量赋值、作为函数实参、作为函数返回值，等等。如：
```js
function getGreeting(user) {
    if (user) {
        return <h1>Hello, {formatName(user)}</h1>
    }
    return <h1>Hello, Guest!</h1>;
}
```
注意：
- 在JSX中，声明属性时不要使用引号，如果声明属性的时候使用引号，那么将被作为字符串解析，而不会被作为一个表达式解析，如：
```html
<div firstName="{user.firstName}" lastName={user.lastName}></div>
```
解析后，可以得到：
```html
<div firstName="{user.firstName}" lastName="Lau"></div>
```
因此，当我们需要使用一个字符串字面量的时候，可以使用引号，但是如果要作为表达式解析的时候，则不应当使用引号
- 在JSX中，有些属性名称需要进行特殊处理。如class应该用className代替，tabindex则用tabIndex代替。这是因为JSX本质上更接近于JavaScript，而class是JavaScript中的保留字。同时，应该使用camelCase来命名一个属性，而不是使用HTML的属性命名方式
- JSX本身已经做了防注入处理，对于那些不是明确编写的HTML代码，是不会被解析为HTML DOM的，ReactDOM会将他们一律视为字符串，在渲染完成前就转化为字符串，所以可以防止XSS攻击
- 如果JSX标签是闭合的，那么结尾需要用/>，另外，JSX标签是可以互相嵌套的，这和HTML里是一样的

### 4、JSX实质
JSX通过babel编译，而babel实际上把JSX编译给React.createElement()调用。如下JSX代码：
```js
const element = (
    <h1 className="wecome">
        Hello, world!
    </h1>
);
```
是等同于以下的语句的：
```js
const elem = React.createElement(
    'h1',
    {className: 'wecome'},
    'Hello, world!'
);
React.createElement()方法会首先进行一些避免BUG的检查，然后返回类似以下例子的对象：
const element = {
    type: 'h1',
    props: {
        className: 'wecome',
        children: 'Hello, world'
    }
}
```
这样的对象，则称为React元素，代表所有呈现在屏幕上的东西。React正是通过读取这些对象来构建DOM，并且保持数据和UI同步的
