# BM-PM

不鸣各业务线需求记录。需求文档和静态 HTML Demo。

## 预览

公开总览：<https://renataecho.github.io/BM-PM/>

本地预览在项目文件夹执行：

```bash
python3 -m http.server 19889 --directory demo/iteration
```

总览页：<http://127.0.0.1:19889/framework-shell.html>

## 迭代需求

| 业务线 | 编号 | 需求 | 状态 | 页面 |
|---|---|---|---|---|
| 右豹主业务 | FR-001 | 剪辑手供稿书籍填写优化 | 开发中 | [查看 Demo](demo/iteration/fr-001-book-entry.html?tab=fe) |
| 右豹主业务 | FR-003 | 代发上融合任务 | 开发中 | [查看 Demo](demo/iteration/fr-003-fusion-task.html?tab=fe) |

总览按登记行生成需求导航与路由；状态可选待开始、开发中、已上线、已暂停，分别进入进行中、进行中、归档、废纸篓。列表、数量、空状态和左侧分组同步更新。

状态沿用浏览器 localStorage（`bm-pm-fr-statuses`），只保存在当前浏览器配置及同源地址下；刷新保留，清除站点数据后恢复登记的初始值，不写回 README 或服务器，不跨浏览器、设备及不同端口同步。FR-003 初始状态为「开发中」，属于「进行中」。

FR-003 总览深链：[前端交互](http://127.0.0.1:19889/framework-shell.html?tab=fe#youbao/fr-003)、[管理后台](http://127.0.0.1:19889/framework-shell.html?tab=admin#youbao/fr-003)、[业务流程](http://127.0.0.1:19889/framework-shell.html?tab=flow#youbao/fr-003)。
