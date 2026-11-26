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
| 右豹主业务 | FR-wen-006 | PC活动中心的展示样式和交互体验优化 | 待开始 | [查看 Demo](demo/iteration/framework-shell.html?tab=fe#youbao/fr-wen-006) |
| 右豹主业务 | FR-XIAOYU-004 | 批量传订单 | 待开始 | [查看 Demo](demo/iteration/framework-shell.html#youbao/fr-xiaoyu-004) |
| 右豹主业务 | FR-XIAOYU-005 | 项目详情页新增工具列表 | 待开始 | [查看 Demo](demo/iteration/framework-shell.html#youbao/fr-xiaoyu-005) |
| 右豹主业务 | FR-wen-005 | 一键代发用户定向约稿； | 开发中 | [查看 Demo](demo/iteration/fr-wen-005-directed.html?tab=fe) |
| 右豹主业务 | FR-wen-004 | 代发素材类型领取门槛 | 开发中 | [查看 Demo](demo/iteration/fr-wen-004-claim.html?tab=fe) |
| 右豹主业务 | FR-XIAOYU-002 | 推广文案 | 待开始 | [查看 Demo](demo/iteration/framework-shell.html#youbao/fr-xiaoyu-002) |
| 右豹主业务 | FR-XIAOYU-003 | 小程序推广计划 | 待开始 | [查看 Demo](demo/iteration/framework-shell.html#youbao/fr-xiaoyu-003) |
| 右豹主业务 | FR-CoCo-003 | 团队项目数据分析 | 开发中 | [查看 Demo](demo/iteration/framework-shell.html?tab=fe#youbao/fr-coco-003) |
| 右豹主业务 | FR-CoCo-005 | 团长数据优化 | 待开始 | [查看 Demo](demo/iteration/framework-shell.html?tab=fe#youbao/fr-coco-005) |
| 导师商务 | FR-CoCo-004 | 机构社群优化 | 开发中 | [查看 Demo](demo/iteration/framework-shell.html#mentor/fr-coco-004) |
| 导师商务 | FR-CoCo-002 | 加入导师团优化 | 开发中 | [查看 Demo](demo/iteration/fr-coco-002-mentor-v1-2.html?tab=fe) |
| 右豹主业务 | FR-CoCo-001 | AI申词 | 待开始 | [查看 Demo](demo/iteration/fr-coco-001-ai-shen-ci.html?tab=fe) |
| 右豹主业务 | FR-001 | 剪辑手供稿书籍填写优化 | 已上线 | [查看 Demo](demo/iteration/fr-001-book-entry.html?tab=fe) |
| 右豹主业务 | FR-003 | 代发上融合任务 | 待开始 | [查看 Demo](demo/iteration/fr-003-fusion-task.html?tab=fe) |
| 右豹主业务 | FR-002 | 新增登录设备 | 已上线 | [查看 Demo](demo/iteration/fr-002.html) |
| 右豹主业务 | FR-wen-003 | 支持团长留言给直属下级 | 待开始 | [查看 Demo](demo/iteration/fr-wen-003-message.html?tab=fe) |
| 企业号 | FR-001 | 员工离职操作优化 | 待开始 | [查看 Demo](demo/iteration/fr-enterprise-001-leaving.html?tab=fe) |
| 企业号 | FR-XY-01 | 员工列表优化 | 待开始 | [查看 Demo](https://cicichak00.github.io/Enterprise-Systems/drafts/employee-management/) |
| 企业号 | FR-XY-02 | 新增工具配置项 | 待开始 | [查看 Demo](https://cicichak00.github.io/Enterprise-Systems/enterprise-tools/employee.html) |
| 企业号 | FR-XY-03 | 新增团队数据页 | 待开始 | [查看 Demo](https://cicichak00.github.io/Enterprise-Systems/ux/team-statistics.html) |

总览按登记行生成需求导航与路由；状态可选待开始、开发中、已上线、已暂停，分别进入进行中、进行中、归档、废纸篓。列表、数量、空状态和左侧分组同步更新。

状态沿用浏览器 localStorage（`bm-pm-fr-statuses-20261113`），只保存在当前浏览器配置及同源地址下；刷新保留，清除站点数据后恢复登记的初始值，不写回 README 或服务器，不跨浏览器、设备及不同端口同步。FR-003 初始状态为「待开始」，属于「进行中」。

FR-003 总览深链：[前端交互](http://127.0.0.1:19889/framework-shell.html?tab=fe#youbao/fr-003)、[管理后台](http://127.0.0.1:19889/framework-shell.html?tab=admin#youbao/fr-003)、[业务流程](http://127.0.0.1:19889/framework-shell.html?tab=flow#youbao/fr-003)。

FR-wen-003 初始状态为「待开始」，属于「进行中」；状态保存范围同上。总览深链：[前端交互](http://127.0.0.1:19889/framework-shell.html?tab=fe#youbao/fr-wen-003)、[管理后台](http://127.0.0.1:19889/framework-shell.html?tab=admin#youbao/fr-wen-003)、[业务流程](http://127.0.0.1:19889/framework-shell.html?tab=flow#youbao/fr-wen-003)。

AI申词、团队项目数据分析与导师需求的本地规则编辑：运行 `python3 scripts/preview_server.py`（端口 19889）。保存写入对应需求目录的 `frontend-rules.json`，普通静态服务不支持保存。

FR-wen-004 初始状态为「开发中」（[ASSUMPTION]，待产品确认），属于「进行中」；状态保存范围同上。总览深链：[前端交互](http://127.0.0.1:19889/framework-shell.html?tab=fe#youbao/fr-wen-004)、[管理后台](http://127.0.0.1:19889/framework-shell.html?tab=admin#youbao/fr-wen-004)、[业务流程](http://127.0.0.1:19889/framework-shell.html?tab=flow#youbao/fr-wen-004)。

FR-wen-005 初始状态为「开发中」（2026-11-17 已确认），属于「进行中」；状态保存范围同上。总览深链：[前端交互](http://127.0.0.1:19889/framework-shell.html?tab=fe#youbao/fr-wen-005)、[管理后台](http://127.0.0.1:19889/framework-shell.html?tab=admin#youbao/fr-wen-005)、[业务流程](http://127.0.0.1:19889/framework-shell.html?tab=flow#youbao/fr-wen-005)。

FR-wen-006 初始状态为「待开始」（2026-11-26 已确认），属于「进行中」；状态沿用上述 localStorage 保存范围。总览深链：[前端交互](http://127.0.0.1:19889/framework-shell.html?tab=fe#youbao/fr-wen-006)、[业务流程](http://127.0.0.1:19889/framework-shell.html?tab=flow#youbao/fr-wen-006)。本需求无管理后台增量；直接 Demo 为 [活动体验页](demo/iteration/fr-wen-006-activities.html?tab=fe)。

## 待编号需求草稿

| 业务线 | 需求 | 状态 | 页面 |
| --- | --- | --- | --- |
| 右豹主业务 | 推广文案 | 待开始 | [UX 草稿](demo/iteration/fr-xiaoyu-002.html) |
