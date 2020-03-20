### npm相关问题
#### 安装 node-sass 的时候总是会各种不成功
- **方法一：使用淘宝镜像**
  macOS 系统直接运行下面的命令即可：
  ```
  SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/ npm install node-sass
  ```
  我们一般更希望能跨平台、并且直接使用 npm install 安装所有依赖，所以我的做法是在项目内添加一个 `.npmrc` 文件：
  ```
  // .npmrc
  sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
  phantomjs_cdnurl=https://npm.taobao.org/mirrors/phantomjs/
  electron_mirror=https://npm.taobao.org/mirrors/electron/
  registry=https://registry.npm.taobao.org
  ```
  这样使用 `npm install` 安装 `node-sass`、`electron` 和 `phantomjs` 时都能自动从淘宝源上下载，但是在使用 `npm publish` 的时候要把 `registry` 这一行给注释掉，否则就会发布到淘宝源上去了。

- **方法二：使用梯子**
  假设你的梯子在你本地机器上开启了一个第三方服务器 `127.0.0.1:1080`，那么只需按照下面的方法配置一下就能正常安装 `node-sass` 了（如果你开启的是 PAC 模式而不是全局模式，那还需要将 s3.amazonaws.com 加入 PAC 列表）：
  ```
  npm config set proxy http://127.0.0.1:1080
  npm i node-sass
  // 下载完成后删除代理
  npm config delete proxy
  ```
#### 警告`npm update`
warn: `Browserslist: caniuse-lite is outdated. Please run next command npm update caniuse-lite browserslis`

- 直接删除该项目`node_modules`下面的`caniuse-lite`和`browserslist`这两个文件夹
- `npm i caniuse-lite browserslist`