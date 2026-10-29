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
| 右豹主业务 | 待编号 | 推广文案 | 待开始 | [查看 Demo](demo/iteration/framework-shell.html#youbao/fr-pending-promotion) |
| 导师商务 | FR-CoCo-002 | 导师迭代V1.2 | 开发中 | [查看 Demo](demo/iteration/fr-coco-002-mentor-v1-2.html?tab=fe) |
| 右豹主业务 | FR-CoCo-001 | AI申词 | 开发中 | [查看 Demo](demo/iteration/fr-coco-001-ai-shen-ci.html?tab=fe) |
| 右豹主业务 | FR-001 | 剪辑手供稿书籍填写优化 | 开发中 | [查看 Demo](demo/iteration/fr-001-book-entry.html?tab=fe) |
| 右豹主业务 | FR-003 | 代发上融合任务 | 开发中 | [查看 Demo](demo/iteration/fr-003-fusion-task.html?tab=fe) |

| 右豹主业务 | FR-002 | 新增登录设备 | 待开始 | [查看 Demo](demo/iteration/fr-002.html) |
| 企业号 | FR-001 | 员工离职操作优化 | 待开始 | [查看 Demo](demo/iteration/fr-enterprise-001-leaving.html?tab=fe) |
总览按登记行生成需求导航与路由；状态可选待开始、开发中、已上线、已暂停，分别进入进行中、进行中、归档、废纸篓。列表、数量、空状态和左侧分组同步更新。

状态沿用浏览器 localStorage（`bm-pm-fr-statuses`），只保存在当前浏览器配置及同源地址下；刷新保留，清除站点数据后恢复登记的初始值，不写回 README 或服务器，不跨浏览器、设备及不同端口同步。FR-003 初始状态为「开发中」，属于「进行中」。

FR-003 总览深链：[前端交互](http://127.0.0.1:19889/framework-shell.html?tab=fe#youbao/fr-003)、[管理后台](http://127.0.0.1:19889/framework-shell.html?tab=admin#youbao/fr-003)、[业务流程](http://127.0.0.1:19889/framework-shell.html?tab=flow#youbao/fr-003)。

AI申词与导师需求的本地规则编辑：运行 `python3 scripts/preview_server.py`（端口 19889）。保存写入对应需求目录的 `frontend-rules.json`，普通静态服务不支持保存。

## 待编号需求草稿

| 业务线 | 需求 | 状态 | 页面 |
| --- | --- | --- | --- |
| 右豹主业务 | 推广文案 | 待开始 | [UX 草稿](demo/iteration/fr-pending-promotion.html) |
