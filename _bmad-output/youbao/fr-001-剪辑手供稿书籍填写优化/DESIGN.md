---
title: 剪辑手供稿书籍填写优化 · 视觉设计
status: final
created: 2026-10-19
updated: 2026-10-19
iteration_id: FR-001
business_line: youbao
business_line_name: 右豹主业务
sources:
  - 需求单.md
  - prd.md
  - ../../../docs/design/移动端设计规范.md
  - ../../../docs/design/iteration-shell/DESIGN.md
  - ../../../docs/design/admin-ui-spec.md
colors:
  primary: "var(--primary)"
  surface: "var(--surface)"
  background: "var(--bg)"
  border: "var(--border)"
  text-primary: "var(--text-primary)"
  text-secondary: "var(--text-secondary)"
  text-muted: "var(--text-muted)"
  success: "var(--success)"
  warning: "var(--warning)"
  danger: "var(--danger)"
typography:
  font-family: "'PingFang SC', 'Microsoft YaHei', 'Segoe UI', sans-serif"
  body: "13px / 1.6"
  label: "12px / 1.5"
  title: "19px / 1.3 / 700"
rounded:
  control: "var(--radius-sm)"
  card: "var(--radius-lg)"
spacing:
  page-gutter: "24px"
  field-gap: "12px"
  section-gap: "20px"
components:
  input: "admin-ui-spec .form-input, 34px"
  button: "admin-ui-spec .btn"
  modal: "admin-ui-spec Modal md, 520px"
  stepper: "iteration-shell stepper"
---

## Brand & Style

这是右豹主业务的 PC 端供稿流程页，继承迭代外壳与右豹管理后台的中性、清晰、任务优先视觉；其中 C 端字段、输入和反馈的基础 token 以 `docs/design/移动端设计规范.md` 为准。页面不新增品牌色、字体、圆角或组件样式。视频中的供稿页面只作为布局和操作顺序参考；本文件与视频冲突时以本文件和 PRD 为准。

页面重点是「填写并选成片」第二步：让剪辑手快速辨认四个书籍字段、检索候选、确认下一步校验结果。书籍字段区是主内容，检索候选和校验弹窗是临时层，不用装饰性大图或复杂动效。

## Colors

- 页面底使用 `{colors.background}`，内容卡片使用 `{colors.surface}`，边界使用 `{colors.border}`。
- 主按钮、步骤当前态、输入焦点使用 `{colors.primary}`；按钮文字沿用规范的白色前景。
- 匹配成功、待确认和阻断分别使用 `{colors.success}`、`{colors.warning}`、`{colors.danger}` 的语义色及对应浅底。
- 「字节系 / 知乎系可继续提交」是警示确认，不使用危险红色作为主按钮；「海外短剧 / 海外小说只能关闭」使用危险语义提示，但关闭按钮仍为 Default。

## Typography

使用 `{typography.font-family}`。页面标题使用 `{typography.title}`；字段标签、步骤标签和正文使用 `{typography.body}` 与 `{typography.label}`。书籍 ID、书籍链接和候选中的编码使用等宽字体以便核对，但不改变字号层级。

## Layout & Spacing

- 采用迭代外壳的 TopNav、Sidebar、面包屑和内容最大宽度；当前业务线固定为右豹主业务。
- 主内容顺序为：面包屑 → 上传稿件标题/步骤条 → 第二步表单卡 → 底部操作栏。
- 表单卡内部按「书籍信息」「成片素材选择」分组。书籍名称与书籍 ID 是可检索字段；类型和链接与其同组，保持同一视觉层级。
- 桌面端四列表单网格按现有规范排布；书籍链接等长字段可跨两列。页面宽度不足时降为两列，再降为单列，不改变字段顺序。
- 候选列表紧贴触发输入框下方，最多 20 条，面板宽度不小于输入框；不遮挡底部操作栏。

## Elevation & Depth

表单卡、候选面板和弹窗使用现有玻璃/阴影 token。候选面板高于表单卡，校验弹窗高于候选面板；遮罩使用规范的 `rgba(0,0,0,0.45)`。不使用新的浮层层级或全屏 loading。

## Shapes

输入框、按钮、Tag、弹窗圆角分别沿用 `{rounded.control}`、迭代外壳按钮规范和后台组件规范。候选行使用常规矩形列表行，不做胶囊卡片。字段之间用留白和分组标题分隔，不用额外彩色边框。

## Components

- **步骤条：** 复用迭代外壳 stepper；第一步已完成，第二步高亮，第三步待进入。步骤编号和文字保持现有组件尺寸。
- **书籍输入框：** 复用 `.form-input`。名称、ID 输入框带可检索提示；focus 有主色边框和焦点环。已补值仍是普通可编辑输入，不显示锁定图标。
- **候选面板：** 每行展示书籍名称、ID、类型和链接的可核对摘要；hover 使用主色浅底，点击整行选择。无结果只显示「暂无结果」；查库失败显示独立系统异常。
- **字段提示：** 在书籍区标题下说明「支持按书籍名称或书籍 ID 模糊搜索，点选只补空字段」。说明使用 muted 文本，不与错误提示混淆。
- **按钮：** 下一步为 Primary；返回/取消为 Default 或 Ghost。按钮文案沿用 PRD，不自行改写。
- **校验弹窗：** 复用 md Modal。标题说明项目系和异常字段；字节系、知乎系按钮为「取消 / 继续提交」；海外短剧、海外小说仅显示「关闭」。
- **状态标记：** 项目系可用现有 Tag；匹配状态只在弹窗或字段辅助说明中表达，不在输入框内塞入状态徽章。

## Do's and Don'ts

| Do | Don't |
|---|---|
| 继承迭代外壳、移动端/后台规范的 token 和组件 | 另起配色、玻璃样式或圆角体系 |
| 用候选行帮助核对四个字段，保留输入框可编辑 | 选中后锁定字段或把候选做成强绑定 |
| 当前触发检索的字段可被候选值更新，其他已填字段保留 | 把当前触发字段误当成只补空 |
| 用语义色区分提示与阻断 | 用红色表示所有不匹配，或用 Toast 代替确认弹窗 |
| 保持第二步上下文，弹窗关闭后回到原表单 | 用新页面打断填写，或在第三步再次拦截 |
| 桌面优先并按现有断点降级 | 为视频中的临时布局新增专用组件 |


## 当前上传页面校准（2026-10-19）

以用户提供的当前 UX 图 2 为准：第二步「填写并选成片」中的选成片指选择要上传的成片素材，不是选择制作流程或成片方式。书籍信息下方展示剪辑手提醒、发布技巧、选择文件夹 / 选择文件、成片素材列表；清空先确认。第三步确认所选素材。Demo 只读取本地文件信息以展示，不实际上传，不接接口或持久化；默认素材明确标记为示例。书籍检索、候选补全和项目系校验规则保持本次需求定义。
