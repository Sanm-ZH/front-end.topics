# React.js 基础知识速览
## 1、什么是JSX？
一个JSX语法的示例，如下所示
```js
const element = <h1>Hello, world!</h1>;
```
这种语法形式，既不是HTML，也不是字符串，而是称之为JSX，是React里用来描述UI和样式的语法，JSX最终会被编译为
合法的JS语句调用（编译器在遇到`{`时采用`JS`语法进行解析，遇到`<`就采用`HTML`规则进行解析）

## 2、嵌入表达式
JSX中，可以使用花括号`{}`嵌入任意的JavaScript合法表达式，如：`1 + 1`、`user.firstName`、`formatName(user)`都是合法的。

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

## 3、JSX也是一种表达式
JSX本身也是一种表达式，所以它可以像其他表达式一样，用于给一个变量赋值、作为函数实参、作为函数返回值，等等。如：
```js
function getGreeting(user) {
    if (user) {
        return <h1>Hello, {formatName(user)}</h1>
    }
    return <h1>Hello, Guest!</h1>;
}
```
**注意：**
- 在JSX中，声明属性时不要使用引号，如果声明属性的时候使用引号，那么将被作为字符串解析，而不会被作为一个表达式解析，如：
    ```html
    <div firstName="{user.firstName}" lastName={user.lastName}></div>
    ```
    解析后，可以得到：
    ```html
    <div firstName="{user.firstName}" lastName="Lau"></div>
    ```
    因此，当我们需要使用一个字符串字面量的时候，可以使用引号，但是如果要作为表达式解析的时候，则不应当使用引号
<br>

- 在JSX中，有些属性名称需要进行特殊处理。如`class`应该用`className`代替，`tabindex`则用`tabIndex`代替。这是因为JSX本质上更接近于JavaScript，而`class`是JavaScript中的保留字。同时，应该使用`camelCase`来命名一个属性，而不是使用HTML的属性命名方式
<br>

- JSX本身已经做了防注入处理，对于那些不是明确编写的HTML代码，是不会被解析为HTML DOM的，ReactDOM会将他们一律视为字符串，在渲染完成前就转化为字符串，所以可以防止XSS攻击
<br>

- 如果JSX标签是闭合的，那么结尾需要用`/>`，另外，JSX标签是可以互相嵌套的，这和HTML里是一样的

## 4、JSX实质
JSX通过babel编译，而babel实际上把JSX编译给`React.createElement()`调用。如下JSX代码：
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
```
`React.createElement()`方法会首先进行一些避免BUG的检查，然后返回类似以下例子的对象：
```js
const element = {
    type: 'h1',
    props: {
        className: 'wecome',
        children: 'Hello, world'
    }
}
```
这样的对象，则称为`React元素`，代表所有呈现在屏幕上的东西。React正是通过读取这些对象来构建DOM，并且保持数据和UI同步的

## 5、元素渲染
元素（`elements`）是构成React应用的最小单元，元素描述了想要在屏幕中看到的内容，如：
```js
const element = <h1>Hello, world</h1>;
```
和DOM元素不同的是，React元素是纯对象，创建的代价低。并且React会进行优化处理，只把有必要的变化更新到DOM上。此外，元素和组件的概念，是不一样的，组件是由元素组成的。

## 6、将元素渲染进DOM
在React中，使用`ReactDOM.render()`方法来将React元素渲染进一个DOM中。如：
```js
ReactDOM.render(
    element,
    document.getElementById('root')
)
```
React元素是不可变的，所以一旦一个元素创建完成后，我们是无法改变其内容或者属性的。一个元素就像是动画里的一帧，它代表UI在某一时间点的样子。如果非要使用元素来构成可变化的UI界面，就需要使用`setInterval`了，如：
```js
function tick() {
    const element = (
        <div>Now is {new Date().toLocaleTimeString()}</div>
    );
    ReactDOM.render(
        element,
        document.getElementById('root')
    );
}
setInterval(tick, 1000);
```
在实际开发中，大多数React应用只会调用一次ReactDOM.render()，所以更好的方式是使用`有状态组件`

## 7、组件和Props
组件（`component`）能够将UI划分为独立的、可复用的部分，这样我们就只需专注于构建每一个单独的部件。
从概念上看，组件就像是函数：接受任意的输入（称为属性，`Props`），返回React元素。React中有两种定义组件的方式：`函数定义`和`类定义`
- **函数定义组件**
    这种方式是最简单的定义组件的方式，就像写一个JS函数一样，如：
    ```js
    function Welcome (props) {
        return <h1>Hello, {props.name}</h1>;;
    }
    ```
<br>

- **类定义组件**
    还可以使用ES6里的类来定义一个组件，如下所示：
    ```js
    class Welcome extends React.Component {
        render () {
            return <h1>Hello, {this.props.name}<h1>;
        }
    }
    ```
    这种方式比起`函数定义`方式则更加灵活
<br>

- **组件渲染**
    先前，我们遇到的React元素只是呈现一个DOM标签，如：
    ```js
    const element = <div />
    ```
    然而，React元素也可以是用户自定义的`组件`，如：
    ```js
    const element = <Welcome name="Tom" />
    ```
    Welcome组件中声明了一个属性`name="Tom"`，而这个属性，将以`props.name`的方式传递给组件，如下方式：
    ```js
    function Welcome (props) {
        return <h1>Hello, {props.name}</h1>;
    }
    ```
    此时，对于以下的代码：
    ```js
    ReactDOM.render(
        <Welcome name="sanm" />,
        document.getElementById('root')
    )
    ```
    最终就会以`<h1>Hello, sanm</h1>`的方式呈现。在这个过程中，发生了如下的事情：
    - 对`<Welcome name="sanm" />`元素调用了`ReactDOM.render()`丰富
    - React将`{ name: 'sanm' }`作为props实参来调用Welcome组件
    - Welcome完成渲染，返回`<h1>Hello, sanm</h1>`元素
    - ReactDOM计算最小更新代价，然后更新DOM
<br>

- **组合组件**
    组件是可以组合的。即组件内部可以引用其他组件，如：
    ```js
    function Welcome (props) {
        return <h1>Hello, {props.name}</h1>;
    }

    function App () {
        return (
            <div>
                <Welcome name="Tom" />
                <Welcome name="Jack" />
                <Welcome name="Mike" />
            </div>
        )
    }

    ReactDOM.render(
        <App />,
        document.getElementById('root')
    )
    ```
    **注意：** 在React中，组件必须返回`单一`的根元素，这也是为什么App组件中需要用<div>标签包裹的原因。如以下的方式，是错误的（因为它有3个根元素）：
    ```js
    function App () {
        return (
            <Welcome name="Tom" />
            <Welcome name="Jack" />
            <Welcome name="Mike" />
        )
    }
    ```
<br>

- **属性是只读的**
    考虑以下这种情况：
    ```js
    function sum (a, b) {
        return a + b;
    }
    ```
    这种函数称为`纯函数`：它不改变自己的输入值，且总是对相同的输入返回相同的结果。
    与之对立的，则是`非纯函数`，如：
    ```js
    function withdraw (account, amount) {
        account.total -= amount;
    }
    ```
    `非纯函数`在函数内改变了输入的参数。在React中，无论是通过`function`还是`class`声明组件，我们都不应该修改它自身的属性（`props`）。虽然React相当灵活，但是它也有一个严格的规定：`所有的React组件都必须像纯函数那样来使用它们的props`