1. **对于MVVM的理解？**
    > MVVM 是 Model-View-ViewModel 的缩写。<br>
    Model代表数据模型，也可以在Model中定义数据修改和操作的业务逻辑。<br>
    View 代表UI 组件，它负责将数据模型转化成UI 展现出来。<br>
    ViewModel 监听模型数据的改变和控制视图行为、处理用户交互，简单理解就是一个同步View 和 Model的对象，连接Model和View。<br>
    <br>
    在MVVM架构下，View 和 Model 之间并没有直接的联系，而是通过ViewModel进行交互，Model 和 ViewModel 之间的交互是双向的， 因此View 数据的变化会同步到Model中，而Model 数据的变化也会立即反应到View 上。
    ViewModel 通过双向数据绑定把 View 层和 Model 层连接了起来，而View 和 Model 之间的同步工作完全是自动的，无需人为干涉，因此开发者只需关注业务逻辑，不需要手动操作DOM, 不需要关注数据状态的同步问题，复杂的数据状态维护完全由 MVVM 来统一管理。

1. **Vue的生命周期**
- **beforeCreate**（创建前） 在数据观测和初始化事件还未开始
- **created**（创建后） 完成数据观测，属性和方法的运算，初始化事件，$el属性还没有显示出来
- **beforeMount**（载入前） 在挂载开始之前被调用，相关的render函数首次被调用。实例已完成以下的配置：编译模板，把data里面的数据和模板生成html。注意此时还没有挂载html到页面上。
- **mounted**（载入后） 在el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用。实例已完成以下的配置：用上面编译好的html内容替换el属性指向的DOM对象。完成模板中的html渲染到html页面中。此过程中进行ajax交互。
- **beforeUpdate**（更新前） 在数据更新之前调用，发生在虚拟DOM重新渲染和打补丁之前。可以在该钩子中进一步地更改状态，不会触发附加的重渲染过程。
- **updated**（更新后） 在由于数据更改导致的虚拟DOM重新渲染和打补丁之后调用。调用时，组件DOM已经更新，所以可以执行依赖于DOM的操作。然而在大多数情况下，应该避免在此期间更改状态，因为这可能会导致更新无限循环。该钩子在服务器端渲染期间不被调用。
- **beforeDestroy**（销毁前） 在实例销毁之前调用。实例仍然完全可用。
- **destroyed**（销毁后） 在实例销毁之后调用。调用后，所有的事件监听器会被移除，所有的子实例也会被销毁。该钩子在服务器端渲染期间不被调用。

    1. ==什么是vue生命周期？==<br>
    答： Vue 实例从创建到销毁的过程，就是生命周期。从开始创建、初始化数据、编译模板、挂载Dom→渲染、更新→渲染、销毁等一系列过程，称之为 Vue 的生命周期。
    2. ==vue生命周期的作用是什么？==<br>
    答：它的生命周期中有多个事件钩子，让我们在控制整个Vue实例的过程时更容易形成好的逻辑。
    3. ==vue生命周期总共有几个阶段？==<br>
    答：它可以总共分为8个阶段：创建前/后, 载入前/后,更新前/后,销毁前/销毁后。
    4. ==第一次页面加载会触发哪几个钩子？==<br>
    答：会触发 下面这几个beforeCreate, created, beforeMount, mounted 。
    5. ==DOM 渲染在 哪个周期中就已经完成？==<br>
    答：DOM 渲染在 mounted 中就已经完成了。

2. **组件通信方式** （考察频率：高）
    1. ==父->子==
        > props(v-bind)<br>
          $refs

    2. ==子->父==
        > events(v-on)<br>
          $parent $root
          
    3. ==非父子组件==
        > event bus<br>
          vuex

3. **路由导航钩子（导航守卫）**（考察频率：中）
    - 全局钩子
    - 路由独享钩子
    - 组件内钩子

4. **对keep-alive 的了解？附加进入离开钩子**<br>
    keep-alive是 Vue 内置的一个组件，可以使被包含的组件保留状态，或避免重新渲染。
    在vue 2.1.0 版本之后，keep-alive新加入了两个属性: include(包含的组件缓存) 与 exclude(排除的组件不缓存，优先级大于include) 。
    使用方法
    ```html
    <keep-alive include='include_components' exclude='exclude_components'>
      <component>
        <!-- 该组件是否缓存取决于include和exclude属性 -->
      </component>
    </keep-alive>
    ```
    参数解释
    - include - 字符串或正则表达式，只有名称匹配的组件会被缓存
    - exclude - 字符串或正则表达式，任何名称匹配的组件都不会被缓存
    - include 和 exclude 的属性允许组件有条件地缓存。二者都可以用“，”分隔字符串、正则表达式、数组。当使用正则或者是数组时，要记得使用v-bind 。
使用示例
    ```html
    <!-- 逗号分隔字符串，只有组件a与b被缓存。 -->
    <keep-alive include="a,b">
      <component></component>
    </keep-alive>
    
    <!-- 正则表达式 (需要使用 v-bind，符合匹配规则的都会被缓存) -->
    <keep-alive :include="/a|b/">
      <component></component>
    </keep-alive>
    
    <!-- Array (需要使用 v-bind，被包含的都会被缓存) -->
    <keep-alive :include="['a', 'b']">
      <component></component>
    </keep-alive>
    ```