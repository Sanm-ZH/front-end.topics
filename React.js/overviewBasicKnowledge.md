# React.js 基础知识速览

## 1、什么是 JSX？

一个 JSX 语法的示例，如下所示

```js
const element = <h1>Hello, world!</h1>
```

这种语法形式，既不是 HTML，也不是字符串，而是称之为 JSX，是 React 里用来描述 UI 和样式的语法，JSX 最终会被编译为
合法的 JS 语句调用（编译器在遇到`{`时采用`JS`语法进行解析，遇到`<`就采用`HTML`规则进行解析）

## 2、嵌入表达式

JSX 中，可以使用花括号`{}`嵌入任意的 JavaScript 合法表达式，如：`1 + 1`、`user.firstName`、`formatName(user)`都是合法的。

如下示例：

```js
const user = {
	firstName: 'Zhang',
	lastName: 'San'
}

const elem = <h1>Hello, {formatName(user)}</h1>
/*
这里的()，实际上是可选的，但是React推荐加入()，这样子就会被视为一个表达式，而不会导致
自动插入分号的问题
*/

ReactDOM.render(element, document.getElementById('app'))
```

## 3、JSX 也是一种表达式

JSX 本身也是一种表达式，所以它可以像其他表达式一样，用于给一个变量赋值、作为函数实参、作为函数返回值，等等。如：

```js
function getGreeting(user) {
	if (user) {
		return <h1>Hello, {formatName(user)}</h1>
	}
	return <h1>Hello, Guest!</h1>
}
```

**注意：**

- 在 JSX 中，声明属性时不要使用引号，如果声明属性的时候使用引号，那么将被作为字符串解析，而不会被作为一个表达式解析，如：
  `html <div firstName="{user.firstName}" lastName={user.lastName}></div>`
  解析后，可以得到：
  `html <div firstName="{user.firstName}" lastName="Lau"></div>`
  因此，当我们需要使用一个字符串字面量的时候，可以使用引号，但是如果要作为表达式解析的时候，则不应当使用引号
  <br>

- 在 JSX 中，有些属性名称需要进行特殊处理。如`class`应该用`className`代替，`tabindex`则用`tabIndex`代替。这是因为 JSX 本质上更接近于 JavaScript，而`class`是 JavaScript 中的保留字。同时，应该使用`camelCase`来命名一个属性，而不是使用 HTML 的属性命名方式
  <br>

- JSX 本身已经做了防注入处理，对于那些不是明确编写的 HTML 代码，是不会被解析为 HTML DOM 的，ReactDOM 会将他们一律视为字符串，在渲染完成前就转化为字符串，所以可以防止 XSS 攻击
  <br>

- 如果 JSX 标签是闭合的，那么结尾需要用`/>`，另外，JSX 标签是可以互相嵌套的，这和 HTML 里是一样的

## 4、JSX 实质

JSX 通过 babel 编译，而 babel 实际上把 JSX 编译给`React.createElement()`调用。如下 JSX 代码：

```js
const element = <h1 className="wecome">Hello, world!</h1>
```

是等同于以下的语句的：

```js
const elem = React.createElement('h1', { className: 'wecome' }, 'Hello, world!')
```

`React.createElement()`方法会首先进行一些避免 BUG 的检查，然后返回类似以下例子的对象：

```js
const element = {
	type: 'h1',
	props: {
		className: 'wecome',
		children: 'Hello, world'
	}
}
```

这样的对象，则称为`React元素`，代表所有呈现在屏幕上的东西。React 正是通过读取这些对象来构建 DOM，并且保持数据和 UI 同步的

## 5、元素渲染

元素（`elements`）是构成 React 应用的最小单元，元素描述了想要在屏幕中看到的内容，如：

```js
const element = <h1>Hello, world</h1>
```

和 DOM 元素不同的是，React 元素是纯对象，创建的代价低。并且 React 会进行优化处理，只把有必要的变化更新到 DOM 上。此外，元素和组件的概念，是不一样的，组件是由元素组成的。

## 6、将元素渲染进 DOM

在 React 中，使用`ReactDOM.render()`方法来将 React 元素渲染进一个 DOM 中。如：

```js
ReactDOM.render(element, document.getElementById('root'))
```

React 元素是不可变的，所以一旦一个元素创建完成后，我们是无法改变其内容或者属性的。一个元素就像是动画里的一帧，它代表 UI 在某一时间点的样子。如果非要使用元素来构成可变化的 UI 界面，就需要使用`setInterval`了，如：

```js
function tick() {
	const element = <div>Now is {new Date().toLocaleTimeString()}</div>
	ReactDOM.render(element, document.getElementById('root'))
}
setInterval(tick, 1000)
```

在实际开发中，大多数 React 应用只会调用一次 ReactDOM.render()，所以更好的方式是使用`有状态组件`

## 7、组件和 Props

组件（`component`）能够将 UI 划分为独立的、可复用的部分，这样我们就只需专注于构建每一个单独的部件。
从概念上看，组件就像是函数：接受任意的输入（称为属性，`Props`），返回 React 元素。React 中有两种定义组件的方式：`函数定义`和`类定义`

- **函数定义组件**
  这种方式是最简单的定义组件的方式，就像写一个 JS 函数一样，如：
  `js function Welcome (props) { return <h1>Hello, {props.name}</h1>;; }`
  <br>

- **类定义组件**
  还可以使用 ES6 里的类来定义一个组件，如下所示：
  `js class Welcome extends React.Component { render () { return <h1>Hello, {this.props.name}<h1>; } }`
  这种方式比起`函数定义`方式则更加灵活
  <br>

- **组件渲染**
  先前，我们遇到的 React 元素只是呈现一个 DOM 标签，如：
  `js const element = <div />`
  然而，React 元素也可以是用户自定义的`组件`，如：
  `js const element = <Welcome name="Tom" />`
  Welcome 组件中声明了一个属性`name="Tom"`，而这个属性，将以`props.name`的方式传递给组件，如下方式：
  `js function Welcome (props) { return <h1>Hello, {props.name}</h1>; }`
  此时，对于以下的代码：
  `js ReactDOM.render( <Welcome name="sanm" />, document.getElementById('root') )`
  最终就会以`<h1>Hello, sanm</h1>`的方式呈现。在这个过程中，发生了如下的事情： - 对`<Welcome name="sanm" />`元素调用了`ReactDOM.render()`丰富 - React 将`{ name: 'sanm' }`作为 props 实参来调用 Welcome 组件 - Welcome 完成渲染，返回`<h1>Hello, sanm</h1>`元素 - ReactDOM 计算最小更新代价，然后更新 DOM
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
  function sum(a, b) {
  	return a + b
  }
  ```
  这种函数称为`纯函数`：它不改变自己的输入值，且总是对相同的输入返回相同的结果。
  与之对立的，则是`非纯函数`，如：
  ```js
  function withdraw(account, amount) {
  	account.total -= amount
  }
  ```
  `非纯函数`在函数内改变了输入的参数。在 React 中，无论是通过`function`还是`class`声明组件，我们都不应该修改它自身的属性（`props`）。虽然 React 相当灵活，但是它也有一个严格的规定：`所有的React组件都必须像纯函数那样来使用它们的props`

## 8、State 与生命周期

使用`类定义组件`有一些额外的好处，如拥有`本地状态`这一特性。
以下是一个`类定义组件`

```js
class Clock extends React.Component {
	render() {
		return (
			<div>
				<h1>Hello, world!</h1>
				<h2>Now is {this.props.date.toLocaleTimeString()}</h2>
			</div>
		)
	}
}
```

**需要注意的有：**

> - `类名`即为`组件名`（无论是函数定义组件还是类定义组件，组件名称的首字母都必须大写，并且继承自`React.Component`）
> - 使用 `render()` 方法，用来返回需要呈现的内容

- **在类中加入 state**
  state 是属于一个组件自身的。我们可以在类的构造函数 constructor 中来初始化状态，如：
  ```js
  constructor (props) {
      super(props)
      this.state = {
          date: new Date()
      }
  }
  ```
  如此一来，我们就可以在 render()函数中使用 this.state.xxx 来引用一个状态
- **生命周期**
  在应用里，往往都会有许许多多的组件。在组件销毁后，回收和释放它们所占据的资源非常重要。
  在时钟应用的例子里，我们需要在第一次渲染到 DOM 的时候设置一个定时器，并且需要在相应的 DOM 销毁后，清除这个定时器。那么，这种情况下，React 为我们提供了生命周期的钩子函数，方便我们进行使用。在 React 中，生命周期分为：
  1）Mount 已插入真实 DOM
  2）Update 正在重新渲染
  3）Unmount 已移出真实 DOM
  而相应的，生命周期钩子函数有：

  `componentWillMount`

  `componentDidMount`

  `componentWillUpdate(newProps, nextState)`

  `componentDidUpdate(prevProps, prevState)`
  
  `componentWillUnmount()`

  此外，还有两种特殊状态的处理函数：

  componentWillReceiveProps(nextProps) 已加载的组件收到新的参数时调动
  shouldComponentUpdate(nextProps, nextState) 组件判断是否重新渲染时调用

  因此，基于生命周期钩子函数，我们可以实现一个时钟应用如下：

  ```js
  class Clock extends React.Component {
  	constructor(props) {
  		super(props)
  		this.state = {
  			date: new Date()
  		}
  	}
  	tick() {
  		this.setState({
  			date: new Date()
  		})
  	}
  	componentDidMount() {
  		this.timerId = setInterval(() => {
  			this.tick()
  		}, 1000)
  	}
  	componentWillUnmount() {
  		clearInterval(this.timerId)
  	}
  	render() {
  		return <div>Now is {this.state.date.toLocaleTimeString()}</div>
  	}
  }
  ```

  **需要注意的是：**

  - render()里用不到的 state，不应该声明在 state 里
  - 不能直接使用`this.state.xxx = xxx`的方式来改变一个 state 的值，应该使用`this.setState()`。如：
    ```js
    setName () {
        this.setState({
            name: 'sanm'
        })
    }
    ```
    `this.setState()`会自动覆盖 this.state 里相应的属性，并触发 render()重新渲染。
  - 状态更新可能是异步的
    React 可以将多个 setState()调用合并成一个调用来提升性能。且由于 this.props 和 this.state 可能是异步更新的，所以不应该依靠它们的值来计算下一个状态。这种情况下，可以给 setState 传入一个函数，如：
    ```js
    this.setState((prevState, props) => ({
    	counter: prevState.counter + props.increment
    }))
    ```
