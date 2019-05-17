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

  ````js
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

  ````

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

  - Mount 已插入真实 DOM
  - Update 正在重新渲染
  - Unmount 已移出真实 DOM

  而相应的，生命周期钩子函数有：

  - `componentWillMount`
  - `componentDidMount`
  - `componentWillUpdate(newProps, nextState)`
  - `componentDidUpdate(prevProps, prevState)`
  - `componentWillUnmount()`

  此外，还有两种特殊状态的处理函数：

  `componentWillReceiveProps(nextProps)` 已加载的组件收到新的参数时调动
  `shouldComponentUpdate(nextProps, nextState)` 组件判断是否重新渲染时调用

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

  - `render()`里用不到的 `state`，不应该声明在 `state` 里
  - 不能直接使用`this.state.xxx = xxx`的方式来改变一个 `state` 的值，应该使用`this.setState()`。如：
    ```js
    setName () {
        this.setState({
            name: 'sanm'
        })
    }
    ```
    `this.setState()`会自动覆盖 this.state 里相应的属性，并触发 `render()`重新渲染。
  - **状态更新可能是异步的**
    `React` 可以将多个 `setState()`调用合并成一个调用来提升性能。且由于 `this.props` 和 `this.state` 可能是异步更新的，所以不应该依靠它们的值来计算下一个状态。这种情况下，可以给 `setState` 传入一个函数，如：
    `js this.setState((prevState, props) => ({ counter: prevState.counter + props.increment }))`

## 9、事件处理

React 元素的事件与 DOM 元素类似，不过也有一些区别，如：

- React 事件使用 `camelCase` 命名（`onClick`），而不是全小写的形式（`onclick`）
- 使用 JSX，传入的是事件的句柄，而不是一个字符串
  如以下的 HTML：

  ```html
  <button onclick="increment()">ADD</button>
  ```

  使用 React 的方式描述如：

  ```html
  <button onClick="{increment}">ADD</button>
  ```

  还有一个不同在于，在原生 DOM 中，我们可以通过返回 `false` 来阻止默认行为，但是这在 React 中是行不通的，在 React 中需要明确使用 `preventDefault()`来阻止默认行为。如：

  ```js
  function ActionLink() {
  	function handleClick(e) {
  		e.preventDefault()
  		alert('Hello, world!')
  	}

  	return (
  		<a href="#" onClick={handleClick}>
  			Click Me
  		</a>
  	)
  }
  ```

  这里，事件回调函数里的 `event` 是经过 React 特殊处理过的（遵循 W3C 标准），所以我们可以放心地使用它，而不用担心跨浏览器的兼容性问题。

  **注意：** 在使用事件回调函数的时候，我们需要特别注意 `this` 的指向问题，因为在 React 里，**除了构造函数和生命周期钩子函数里会自动绑定 `this` 为当前组件外，其他的都不会自动绑定 `this` 的指向为当前组件**，因此需要我们自己注意好 `this` 的绑定问题，
  通常而言，在一个类方式声明的组件里使用事件回调，我们需**要在组件的 `constructor` 里绑定回调方法的 `this` 指向**，如：

  ```js
  class Counter extends React.Component {
  	constructor(props) {
  		super(props)
  		this.state = {
  			counter: 0
  		}
  		// 在这里绑定指向
  		this.increment = this.increment.bind(this)
  	}
  	increment() {
  		this.setState({
  			counter: this.state.counter + 1
  		})
  	}
  	render() {
  		return (
  			<div>
  				The counter now is: {this.state.counter}
  				<button onClick={this.increment}>+1</button>
  			</div>
  		)
  	}
  }
  ```

  当然，我们还有另外一种方法来使用**箭头函数**绑定指向，就是使用`实验性`的属性初始化语法，如：

  ```js
  class Counter extends React.Component {
    increment: () => {
        this.setState({
            counter: this.state.counter + 1
        });
    }
    // ...
  }
  ```

- 像事件处理程序传递参数我们可以为事件处理程序传递额外的参数，方式有以下两种：
  ```html
  <button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
  <button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
  ```
  需要注意的是，使用箭头函数的情况下，参数 `e` 要显式传递，而使用 bind 的情况下，则无需显式传递（参数 `e` 会作为最后一个参数传递给事件处理程序）

## 10、条件渲染

在 React 里，我们可以创建不同的组件来封装我们需要的功能。我们也可以根据组件的状态，只渲染组件中的一部分内容，而条件渲染就是为此而准备的。在 React 中，我们可以像在 JavaScript 中写条件语句一样地写条件渲染语句，如：

```js
function Greet(props) {
	const isLogined = props.isLogined
	if (isLogined) {
		return <div>Hello !</div>
	}
	return <div>Please sign in</div>
}

ReactDOM.render(<Greet isLogined={true} />, document.getElementById('root'))
```

这将渲染出：

```html
<div>Hello !</div>
```

- **使用变量来存储元素**
  我们也可以使用变量来存储元素，如：

  ```js
  function LogBtn(props) {
  	var button
  	const isLogined = props.isLogined
  	if (isLogined) {
  		button = <button>退出</button>
  	} else {
  		button = <button>登陆</button>
  	}
  	return <div>You can {button}</div>
  }

  ReactDOM.render(<LogBtn isLogined={false} />, document.getElementById('root'))
  ```

- **使用&&运算符进行渲染**
  由于 JavaScript 语法对待`&&`运算符的性质，我们也可以使用&&运算符来完成条件渲染，如：

  ```js
  function LogBtn(props) {
  	var button
  	const isLogined = props.isLogined
  	return (
  		<div>
  			Hello
  			{!isLogined && <button>请登陆</button>}
  		</div>
  	)
  }
  ```

  当`props.isLogined`为`false`的时候，就会渲染出：

  ```html
  <div>Hello <button>请登录</button></div>
  ```

- **使用三目运算符进行渲染**
  我们可能已经发现了，其实 JSX 可以像一个表达式那样子灵活使用，所以，我们自然也可以使用三目运算符进行渲染，如：

  ```js
  function LogBtn(props) {
  	const isLogined = props.isLogined
  	return (
  		<div>
  			You can
  			<button>{isLogined ? '退出' : '登陆'}</button>
  		</div>
  	)
  }
  ```

- **阻止整个组件的渲染**
  有时候，我们希望是整个组件都不渲染，而不仅仅是局部不渲染，那么这种情况下，我们就可以在`render()`函数里返回一个`null`，来实现我们想要的效果，如：

  ```js
  function LogBtn(props) {
  	const isLogined = props.isLogined
  	const isShow = props.isShow
  	if (isShow) {
  		return (
  			<div>
  				You can
  				<button>{isLogined ? '退出' : '登陆'}</button>
  			</div>
  		)
  	}
  	return null
  }
  ```

  **注意：** 组件里返回`null`不会影响组件生命周期的触发，如`componentWillUpdate`和`componentDidUpdate`仍然会被调用

## 11、列表渲染与 keys

在 JavaScript 中，我们可以使用`map()`函数来对一个数组列表进行操作，如：

```js
const numbers = [1, 2, 3, 4, 5]
const doubled = numbers.map(number => number * 2)
console.log(doubled) // 得到[2, 4, 6, 8, 10]
```

同样的，在 React 里，我们也可以使用`map()`来进行列表渲染，如：

```js
const numbers = [1, 2, 3, 4, 5]
const listItems = numbers.map(number => {
	return <li>{number}</li>
})

ReactDOM.render(<ul>{listItems}</ul>, document.getElementById('root'))
```

这将得到：

```html
<ul>
	<li>1</li>
	<li>2</li>
	<li>3</li>
	<li>4</li>
	<li>5</li>
</ul>
```

当然，我们还可以进行更好的封装，如：

```js
function NumberList(props) {
	const numbers = props.numbers
	const listItems = numbers.map(number => {
		return <li>{number}</li>
	})

	return <ul>{listItems}</ul>
}
```

当我们运行以上的代码的时候，会发现控制台提示：`Each child in an array or iterator should have a unique "key" prop`，因此，我们需要为列表项的每一个项分配一个`key`，来解决这个问题，通常而言，我们可以使用以下几种方式来提供`key`：

- 使用数据项自身的 ID，如`<li key={item.itemId}>`
- 使用索引下标（`index`），如：

```js
const listItems = numbers.map((number, index) => {
	;<li key={index}>{number}</li>
})
```

但是 React 不推荐在需要重新排序的列表里使用索引下标，因为会导致变得很慢。
**注意：** 只有在一个项的同胞里区分彼此的时候，才需要使用到 key，key 不需要全局唯一，只需要在一个数组内部区分彼此时唯一便可。key 的作用是给 React 一个提示，而不会传递给组件。如果我们在组件内需要同样的一个值，可以换个名字传递，如：

```js
const content = posts.map(post => (
	<Post key={post.id} id={post.id} title={post.title} />
))
```

## 12、表单

表单和其他的 React 中的 DOM 元素有所不同，因为表单元素生来就是为了保存一些内部状态。在 React 中，表单和 HTML 中的表单略有不同

- **受控组件**
  HTML 中，`<input>`、`<textarea>`、`<select>`这类表单元素会维持自身状态，并根据用户输入进行更新。不过 React 中，可变的状态通常保存在组件的`this.state`中，且只能用`setState()`方法进行更新，如：

  ```js
  class NameForm extends React.Component {
  	constructor(props) {
  		super(props)
  		this.state = {
  			value: ''
  		}
  		this.handleChange = this.handleChange.bind(this)
  		this.handleSubmit = this.handleSubmit.bind(this)
  	}
  	handleChange(event) {
  		this.setState({
  			value: event.target.value
  		})
  	}
  	handleSubmit(event) {
  		alert('Your name is ' + this.state.value)
  		event.preventDefault()
  	}
  	render() {
  		return (
  			<form onSubmit={this.handleSubmit}>
  				Name:{' '}
  				<input
  					type="text"
  					value={this.state.value}
  					onChange={this.handleChange}
  				/>
  				<input type="submit" value="Submit" />
  			</form>
  		)
  	}
  }
  ```

  和 HTML 中不同的是，React 中的`textarea`并不需要写成`<textarea></textarea>`的形式，而是写成`<textarea value="" ... />`的形式便可。而对于 HTML 中的`select`标签，通常做法是：

  ```html
  <select>
  	<option value="A">A</option>
  	<option value="B" selected>B</option>
  	<option value="C">C</option>
  </select>
  ```

  但是 React 中，不需要在需要选中的`option`处加入`selected`，而只需要传入一个 value，就会自动根据 value 来选中相应的选项，如：

  ```html
  <select value="C">
  	<option value="A">A</option>
  	<option value="B">B</option>
  	<option value="C">C</option>
  </select>
  ```

  那么如上述例子，C 所在的这个`option`就会被选中

- **多个输入的解决办法**
  通常一个表单都有多个输入，如果我们为每一个输入添加处理事件，那么将会非常繁琐。好的一个解决办法是，使用`name`，然后根据`event.target.name`来选择做什么。如：

  ```js
  class Form extends React.Component {
  	constructor(props) {
  		super(props)
  		this.state = {
  			name: '',
  			gender: '男',
  			attend: false,
  			profile: ''
  		}
  		this.handleInputChange = this.handleInputChange.bind(this)
  		this.handleSubmit = this.handleSubmit.bind(this)
  	}
  	handleInputChange(event) {
  		const target = event.target
  		const value = target.type === 'checkbox' ? target.checked : target.value
  		const name = target.name
  		this.setState({
  			[name]: value
  		})
  	}
  	handleSubmit(event) {
  		this.setState({
  			profile: `姓名：${this.state.name}，${this.state.gender}，${
  				this.state.attend ? '参加' : '不参加'
  			}活动`
  		})
  		event.preventDefault()
  	}
  	render() {
  		return (
  			<form>
  				<p>
  					姓名：
  					<input
  						name="name"
  						value={this.state.name}
  						onChange={this.handleInputChange}
  					/>
  				</p>
  				<p>
  					性别：
  					<select
  						name="gender"
  						value={this.state.gender}
  						onChange={this.handleInputChange}
  					>
  						<option value="男">男</option>
  						<option value="女">女</option>
  					</select>
  				</p>
  				<p>
  					是否参加：
  					<input
  						name="attend"
  						type="checkbox"
  						onChange={this.handleInputChange}
  						checked={this.state.attend}
  					/>
  				</p>
  				<input type="submit" value="Submit" onClick={this.handleSubmit} />
  				<p>您的报名信息：{this.state.profile}</p>
  			</form>
  		)
  	}
  }
  ```

- **非受控组件**
  大多数情况下，使用`受控组件`实现表单是首选，在受控组件中，表单数据是交由 React 组件处理的。如果想要让表单数据由 DOM 处理（即数据不保存在 React 的状态里，而是保存在 DOM 中），那么可以使用`非受控组件`，使用`非受控组件`，可以无需为每个状态更新编写事件处理程序，使用`ref`即可实现，如：

  ```js
  class NameForm extends React.Component {
  	constrcutor(props) {
  		super(props)
  	}
  	handleSubmit(event) {
  		console.log('A name was submitted: ', this.input.value)
  		event.preventDefault()
  	}
  	render() {
  		return (
  			<form onSubmit={this.handleSubmit}>
  				<label>
  					Name: <input type="text" ref={input => (this.input = input)} />
  				</label>
  				<input type="submit" value="submit" />
  			</form>
  		)
  	}
  }
  ```

  对于`非受控组件`，如果要指定默认值，那么可以使用`defaultValue`，如：

  ```html
  <input type="text" defaultValue="Hello" ref={input => this.input = input} />
  ```

  相应的，`type="checkbox"`和`type="radio"`，则使用`defaultChecked`

## 13、状态提升

当需要几个组件共用状态数据的时候，可以使用状态提升技术。核心思想在于：把数据抽离到最近的共同父组件，父组件管理状态（state），然后通过属性（props）传递给子组件。如实现一个货币转换的组件，可以如下：

- **首先定义转换函数**

  ```js
  function USD2RMB(amount) {
  	return amount * 6.7925
  }

  function RMB2USD(amount) {
  	return amount * 0.1472
  }

  function convert(amount, typeFn) {
  	return typeFn(amount)
  }
  ```

- **定义组件**
  我们希望在 RMB 的输入表单上上输入的时候，USD 的输入表单上的数值也同步更新，这种情况下，如果 RMB 组件自己管理自己的状态，是很难以实现的，因此，我们需要让这个状态提升自父组件进行管理。如下：

  ```js
  class CurrencyInput extends React.Component {
  	constructor(props) {
  		super(props)
  		this.handleChange = this.handleChange.bind(this)
  	}
  	handleChange(event) {
  		this.props.onInputChange(event.target.value)
  	}
  	render() {
  		const value = this.props.value
  		const type = this.props.type
  		return (
  			<p>
  				{type}:{' '}
  				<input type="text" value={value} onChange={this.handleChange} />
  			</p>
  		)
  	}
  }
  ```

  最后定义一个共同的父组件，如下：

  ```js
  class CurrencyConvert extends Component {
  	constructor(props) {
  		super(props)
  		this.state = {
  			type: 'RMB',
  			amount: 0
  		}
  		this.handleRMBChange = this.handleRMBChange.bind(this)
  		this.handleUSDChange = this.handleUSDChange.bind(this)
  	}
  	handleRMBChange(amount) {
  		this.setState({
  			type: 'RMB',
  			amount
  		})
  	}
  	handleUSDChange(amount) {
  		this.setState({
  			type: 'USD',
  			amount
  		})
  	}
  	render() {
  		const type = this.state.type
  		const amount = this.state.amount
  		const RMB = type === 'RMB' ? amount : convert(amount, USB2RMB)
  		const USD = type === 'USD' ? amount : convert(amount, RMB2USB)
  		return (
  			<div>
  				<p>Please Input:</p>
  				<CurrencyInput
  					type="RMB"
  					value={RMB}
  					onInputChange={this.handleRMBChange}
  				/>
  				<CurrencyInput
  					type="USD"
  					value={USD}
  					onInputChange={this.handleUSDChange}
  				/>
  			</div>
  		)
  	}
  }
  ```

## 14、组合 vs 继承

React 推崇更多的是使用组合，而非使用继承。对于一些使用场景，React 给出的建议如下：

- **包含关系**
  当父组件不知道子组件可能的内容是什么的时候，可以使用`props.children`，如：

  ```js
  function Article(props) {
  	return (
  		<section>
  			<aside>侧边栏</aside>
  			<article>{props.children}</article>
  		</section>
  	)
  }

  function App() {
  	return <Article>这是一篇文章</Article>
  }
  ```

  这将渲染得到：

  ```html
  <section>
  	<aside>侧边栏</aside>
  	<article>这是一篇文章</article>
  </section>
  ```

  我们还可以自定义名称，因为 JSX 实际上会被转化为合法的 JS 表达式，所以，还可以有：

  ```js
  function Article(props) {
  	return (
  		<section>
  			<aside>{props.aside}</aside>
  			<article>{props.children}</article>
  		</section>
  	)
  }

  function App() {
  	return <Article aside={<h1>这是一个侧栏</h1>}>这是一篇文章</Article>
  }
  ```

  这将渲染得到：

  ```html
  <section>
  	<aside><h1>这是一个侧栏</h1></aside>
  	<article>这是一篇文章</article>
  </section>
  ```

- **何时使用继承？**
  在 Facebook 的网站上，使用了数以千计的组件，但是实践证明还没有发现需要使用继承才能解决的情况。
  属性和组合为我们提供了清晰的、安全的方式来自定义组件的样式和行为，组件可以接受任意元素，包括：基本数据类型、React 元素、函数。
  如果要在组件之间复用 UI 无关的功能，那么应该将其提取到单独的 JavaScript 模块中，这样子可以在不对组件进行扩展的前提下导入并使用函数、对象、类
