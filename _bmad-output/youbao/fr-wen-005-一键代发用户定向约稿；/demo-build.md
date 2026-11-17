---
title: 'FR-wen-005 定向约稿静态 Demo'
type: 'feature'
created: '2026-11-17'
status: 'done'
route: 'oneshot'
review_loop_iteration: 0
---

<frozen-after-approval reason="用户已授权按已定合同制作独立 Demo">

## Intent

为右豹主业务 FR-wen-005 新建独立静态演示，需求名保留「一键代发用户定向约稿；」。以同目录 DESIGN.md、EXPERIENCE.md、SPEC.md 及 PRD v4 为合同，实现前端内用户／剪辑手角色切换、后台与手写 SVG 流程。沿用 component-spec-demo.html 的组件 class 和对应角色色彩，支持 tab 深链、embed／screen 及 postMessage 切屏。手机嵌入页内，详情右侧覆盖、编辑居中、危险操作确认；规则抽屉只含本需求，流程仅指向页内流程。

仅新增 fr-wen-005-* 文件及本目录 mockups 副本，不修改已有页面、README、总览或已有需求文档；用户此次「已有页面不要改」优先于默认登记要求。不接真实服务、登录或持久化。示例数据内存联动，覆盖双入口申请与联动校验、承接确认、撤销／拒绝、定向单稿上传及原稿重送审、审核与实际可领分开、领取回填、十一状态、72／48／24 小时及 0 不限、D+2 上传边界、后台五统计和完整只读详情。未定布局标 [待确认]。

</frozen-after-approval>

## Implementation Notes

- 无新增产品决策、无不可逆外部操作；采用有限静态文件的一次实现路线。已有未跟踪目录为本需求输入，保留原样。
- 新增主入口、组件样式副本、内存模型、外壳脚本、移动端独立 iframe 页面及脚本；mockups 与移动端依赖保持副本一致。
- 使用原组件规范中的按钮、弹窗、抽屉、标签、规则与流程 class，不加载 gate.js，不触发登录。
- 验证：模型边界断言、HTML 与脚本检查、浏览器走读申请／PC审核上传／后台审稿／移动领取回填、筛选配置、深链及浮层。
- 新增 fr-wen-005-directed.html/css/js、fr-wen-005-model.js、fr-wen-005-mobile.html/js、fr-wen-005-components.css、fr-wen-005-flow.js；移动端及其依赖复制进本目录 mockups。
- 模型 11 组业务边界检查通过；流程几何检查通过：35 个节点、55 条连线正交、端点落边，无穿框或孤立节点。
- 浏览器完成手填无ID申请到已回填全链路；确认后台五组详情、配置小数拦截、旧申请配置不回改、统计不随筛选变化、重置不自动查询、规则按当前视图定位、Esc关闭、手机在1280×720视口完整显示。

## Review Triage Log

独立 Blind Hunter 审查完成，以下问题均核对并修复，无待处理项。

- high：时间推进先清理使 D+2 瞬间成功不可演示；增加同一时刻成功事件优先的原子模拟，并验证无成功时仍超时。
- medium：上传草稿跨申请串用；发起时将元数据绑定上传实例，切换场景重置草稿。
- medium：上传后先通知再补标题；标题、目录及模式在模型内一次写入后发布状态。
- medium：过滤后按序号生成书籍ID；改为稳定名称／ID对象。
- low：选择后重建表单丢失焦点；渲染后聚焦对应字段。
- low：通知目标仅滚动未聚焦；滚动后聚焦目标卡片。
- medium：上传失败缺少常驻说明；保留失败／取消事实及合法重试提示。
- medium：D后仍有有效上传的流程分支遗漏；先判断既有上传，再进入D+2等待。
- medium：未处理申请误画成拒绝；增加「剪辑手已处理」判定及继续待审核回环。
- medium：不限时与失败重试流程混用D；拆成单问题菱形，分别判断0不限、D前重试与D+2等待。
- low：审核等待孤立节点；删除重复节点，由主线稿件审核中承担等待。
- medium：浏览器发现重置按钮隐式提交表单；通用操作按钮补 type="button"，复测重置仅清输入。
- medium：1280×720下手机底部被裁；按实际可用高度等比缩放，复测完整画布可见。

## Verification

```powershell
node '_bmad-output/youbao/fr-wen-005-一键代发用户定向约稿；/checks/model.test.cjs'
node '_bmad-output/youbao/fr-wen-005-一键代发用户定向约稿；/checks/flow.test.cjs'
node --check demo/iteration/fr-wen-005-directed.js
node --check demo/iteration/fr-wen-005-mobile.js
node --check demo/iteration/fr-wen-005-model.js
node --check demo/iteration/fr-wen-005-flow.js
```

预览：`http://127.0.0.1:19889/fr-wen-005-directed.html?tab=fe`，管理后台 `?tab=admin`，业务流程 `?tab=flow`。未修改已有 README 或总览页，遵循本次「已有页面不要改」的明确约束。
