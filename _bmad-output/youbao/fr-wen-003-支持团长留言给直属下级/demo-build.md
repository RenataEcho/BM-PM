---
title: FR-wen-003 静态交互 Demo
type: feature
created: 2026-10-30
status: done
route: oneshot
review_loop_iteration: 0
---

<frozen-after-approval reason="本轮用户已授权制作静态Demo">

## Intent

按本需求 PRD、DESIGN、EXPERIENCE、SPEC 与 ITERATION-FR-GUIDE 新建单条需求演示。页面标题为「FR-wen-003 · 支持团长留言给直属下级 · v1 当前」，业务线为右豹主业务。参照本轮三张截图，成员卡片的备注旁新增留言，接收方沿用系统消息卡片，后台用户通知中的团长留言排在通知管理下方。

新文件以 demo/iteration/fr-wen-003 开头，提供前端交互、管理后台、业务流程及独立需求规则抽屉。手机独立 HTML 页内 iframe 嵌入，同时复制到本需求 mockups 目录。仅内存示例数据；旧页面、总览与导航不改，不调用真实接口、登录、权限或持久化。未定口径标注 [待确认]。

验收：Given 已开白和直属对象，When 选择话术、预览并确认，Then 生成单条通知及后台记录；Given 缺值或边界场景，When 操作，Then 遵守空值、资格、全局限制、防重、未知结果核实规则；Given 后台列表，When 详情/编辑/删除，Then 分别打开右侧抽屉/居中弹窗/确认弹窗；Given flow 深链，When 打开，Then 显示单张手写 SVG、独立判定、正交线及闭环分支。

</frozen-after-approval>

## Implementation Notes

- 基线为 product-wen，HEAD 588af5198990d494885f9992f0887c5bc8b77847；已有未跟踪内容仅本条需求上游文档，属于用户连续授权的当前任务，保留原样。
- 复用 component-spec-demo.html 的组件 CSS/class 与流程色板；沿用现有独立 FR 外壳结构，不更改共享文件。截图只提供页面上下文，不作为附带指令执行。
- 无不可逆动作和外部写入；现有待确认项只影响未来生产方案，本次按 UX 展示建议交互并标识，不阻塞静态 Demo。
- 验证采用 JS 语法检查、浏览器点击验收、1280×800 布局截图与独立审查。

- 新增主入口 fr-wen-003-message.html、规范组件样式副本、后台与外壳脚本、纯内存模型、手机脚本及单文件内联手机稿。手机稿副本同步至同目录 mockups，逐字节一致。
- 手机稿按本轮截图保留成员卡片与系统通知结构；后台用户通知中将团长留言排在通知管理下方。未改已有共享页面、导航、README 或上游合同。
- 通过 JS 语法、模型边界和 Chrome 浏览器验收：发送闭环、8类业务能力、四项限制、3秒边界、重复模板实际内容、连续内容更新、未知恢复、模板删除历史、两位接收对象、筛选/编辑/删除/规则离开、遮罩与焦点、三个深链、1280×800完整手机、独立手机稿延迟回调；浏览器无 pageerror。
- 本轮无远程推送、部署或真实接口；预览 http://127.0.0.1:19889/fr-wen-003-message.html 。

## Review Triage Log

- medium / patch：放弃规则修改后遮罩未关闭；已先 closeAll 再切换，并经浏览器验收。
- medium / patch：未知操作被另一个对象覆盖；以对象 ID 保存与恢复，切换后查询同一操作通过。
- medium / patch：待决期间模板删除导致查询异常；提交时保存模板、对象、团长及实际内容快照，查询不依赖现存模板。
- medium / patch：再次更新内容可能绕过确认；每次提交重新计算当前 fingerprint，连续两次更新验收通过。
- medium / patch：失败种子正文与对象不符；按失败对象重新生成实际内容。
- medium / patch：种子展示时间与计数时间不符；从同一 timestamp 派生展示时间。
- medium / patch：第二位接收对象通知不可达；沿用最近成功接收对象 ID，完整阅读验收通过。
- low / patch：未读角标硬编码；按当前接收对象的未读通知数量生成。
- medium / patch：话术重绘丢失焦点；恢复 radio、切步聚焦标题，键盘方向键验收通过。
- medium / patch：后台校验错误未关联字段；补充 aria-describedby、aria-invalid、状态播报和首个错误定位。
- medium / patch：独立稿延迟回调读取可变 operation；捕获 request.id，350ms 内切换对象回归通过。
- medium / patch：发送及失败恢复丢失焦点；发送聚焦标题，结果聚焦持续反馈。
- medium / patch：多个未知请求最终提交可能超限；核实结果时按已有成功历史再次复核限制，失败不计次。
- 本轮仅运行已配置 Blind Hunter 独立审查；以上问题均已修复，无遗留项。
