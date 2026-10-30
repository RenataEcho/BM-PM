---
name: 支持团长留言给直属下级
description: 右豹主业务 FR-wen-003 的移动端留言、系统通知和后台管理增量视觉合同。
iteration_id: FR-wen-003
business_line: 右豹主业务
status: final
version: v1
created: 2026-10-30
updated: 2026-10-30
sources:
  - 需求单.md
  - prd.md
  - ../../../docs/design/移动端设计规范.md
  - ../../../docs/design/iteration-shell/DESIGN.md
  - ../../../docs/design/admin-ui-spec.md
  - ../../../docs/ITERATION-FR-GUIDE.md
  - ../../../demo/iteration/component-spec-demo.html
colors:
  mobile-primary: '#ff4d22'
  mobile-primary-hover: '#ff6c46'
  mobile-selected: '#fff1ec'
  mobile-text: '#252836'
  mobile-secondary: '#9498a8'
  mobile-muted: '#9aa0ad'
  mobile-border: '#eceef3'
  mobile-page: '#f6f7fb'
  surface: '#ffffff'
  admin-primary: '#2563eb'
  admin-primary-hover: '#1d4ed8'
  admin-selected: '#eff6ff'
  admin-text: '#18222f'
  admin-secondary: '#4a5568'
  admin-muted: '#9aa5b4'
  admin-border: '#e8edf3'
  admin-page: '#f0f4f8'
  success: '#16a34a'
  success-bg: '#f0fdf4'
  warning: '#d97706'
  warning-bg: '#fffbeb'
  danger: '#dc2626'
  danger-bg: '#fef2f2'
typography:
  mobile-title:
    fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", Arial, sans-serif'
    fontSize: 17px
    fontWeight: '900'
  mobile-section:
    fontSize: 15px
    fontWeight: '800'
  mobile-row:
    fontSize: 13px
    fontWeight: '800'
  mobile-body:
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.5'
  admin-title:
    fontFamily: 'Inter, "PingFang SC", "Microsoft YaHei", sans-serif'
    fontSize: 19px
    fontWeight: '700'
  admin-body:
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.55'
  admin-caption:
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.5'
rounded:
  mobile-control: 8px
  mobile-card: 16px
  sheet: 20px
  admin-control: 7px
  admin-card: 14px
  full: 9999px
spacing:
  mobile-gutter: 12px
  module-gap: 12px
  admin-gutter: 20px
  field-gap: 12px
  section-gap: 20px
components:
  member-row:
    background: '{colors.surface}'
    color: '{colors.mobile-text}'
    actionColor: '{colors.mobile-primary}'
  message-sheet:
    background: '{colors.surface}'
    radius: '{rounded.sheet}'
    maxHeight: 72%
    mask: 'rgba(0,0,0,0.32)'
  template-option:
    selectedBackground: '{colors.mobile-selected}'
    selectedAccent: '{colors.mobile-primary}'
    radius: '{rounded.mobile-control}'
  actual-content:
    color: '{colors.mobile-text}'
    typography: '{typography.mobile-body}'
  mobile-action:
    background: '{colors.mobile-primary}'
    foreground: '{colors.surface}'
    radius: '{rounded.mobile-control}'
  notification-item:
    background: '{colors.surface}'
    title: '{typography.mobile-row}'
  admin-panel:
    background: 'rgba(255,255,255,0.72)'
    radius: '{rounded.admin-card}'
  admin-button:
    background: '{colors.admin-primary}'
    foreground: '{colors.surface}'
    height: 34px
    radius: '{rounded.admin-control}'
  admin-form:
    controlHeight: 34px
    gap: '{spacing.field-gap}'
  admin-table:
    text: '{colors.admin-text}'
    border: '{colors.admin-border}'
  edit-modal:
    maxWidth: 480px
    radius: '{rounded.admin-card}'
  confirm-modal:
    maxWidth: 400px
    radius: '{rounded.admin-card}'
  detail-drawer:
    width: 480px
    background: 'rgba(255,255,255,0.98)'
  status-tag:
    successColor: '{colors.success}'
    successBackground: '{colors.success-bg}'
    warningColor: '{colors.warning}'
    warningBackground: '{colors.warning-bg}'
    dangerColor: '{colors.danger}'
    dangerBackground: '{colors.danger-bg}'
  feedback:
    background: '#1e293b'
    color: '{colors.surface}'
  rule-drawer:
    width: 480px
    background: 'rgba(255,255,255,0.98)'
  flow-panel:
    background: '{colors.surface}'
    border: '{colors.admin-border}'
---

# FR-wen-003 · 支持团长留言给直属下级 · 视觉设计

## 品牌与风格（Brand & Style）

业务线为「右豹主业务」。本文件与同目录 [EXPERIENCE.md](EXPERIENCE.md) 共同约束本增量：本文件管视觉，后者管行为；二者优先于 PRD 与后续 Demo，冲突时修正 Demo。输入采用 [prd.md](prd.md) v2 的已确认决策；需求单保留的 10 秒及旧联系方式缺失口径不作为当前设计规则。

继承三套已有系统，只描述本次页面组合：C 端使用[移动端设计规范](../../../docs/design/移动端设计规范.md)的暖橙、浅灰底和白卡片；后台使用[管理后台规范](../../../docs/design/admin-ui-spec.md)的蓝色与玻璃面板；评审台使用[迭代外壳](../../../docs/design/iteration-shell/DESIGN.md)。上方 token 是这些规范的使用别名，不是新配色。C 端保持「对象明确、话术固定、发送前看清」；后台突出配置与追溯，不增加营销装饰。

## 色彩（Colors）

| 场域 | 使用规则 |
|---|---|
| 手机内 | `{colors.mobile-page}` 页底、`{colors.surface}` 卡片、`{colors.mobile-text}` 必读文字；`{colors.mobile-primary}` 标记留言入口、选项与发送动作；选中浅底为 `{colors.mobile-selected}` |
| 管理后台与外壳 | `{colors.admin-primary}` 用于保存、查询及链接；`{colors.admin-selected}` 表达选中；`{colors.admin-text}` 和 `{colors.admin-secondary}` 承载字段及规则 |
| 后台业务状态 | 启用／成功用 `{colors.success}` + `{colors.success-bg}`；处理中用 `{colors.warning}` + `{colors.warning-bg}`；失败用 `{colors.danger}` + `{colors.danger-bg}`。关闭／停用以中性文字显示，不等同失败 |
| 必读提示 | 手机中的限制原因、实际内容、对象 ID 使用 `{colors.mobile-text}`；灰字仅做时间、补充说明。状态同时有文字，不靠颜色传达 |

可读性目标为普通正文与底色对比度至少 4.5:1，大字及关键控件边界至少 3:1。白底实算：`#252836` 为 14.63:1、`#9498a8` 为 2.87:1、品牌橙 `#ff4d22` 为 3.31:1、后台蓝 `#2563eb` 为 5.17:1。关键正文与提示使用深色正文；原规范暖橙底白色小字 CTA 不满足普通正文 4.5:1，当前保留继承定义但不宣称已符合 AA。[ASSUMPTION] UX-A2：CTA 可访问性调整由设计规范维护方在实施前确认，优先使用已有 token，不在本 FR 擅自更换品牌色。浅灰辅助字不能承载必读限制原因。

## 字体（Typography）

手机沿用 `{typography.mobile-title}` 页标题、`{typography.mobile-section}` 模块标题、`{typography.mobile-row}` 成员／模板名称、`{typography.mobile-body}` 实际内容。用户 ID 与昵称分层排列，不能以字号压缩代替换行。预览、通知详情、后台实际内容均保留原换行和空格，避免视觉合并导致误判同内容。

后台沿用 `{typography.admin-title}` 页标题、`{typography.admin-body}` 表单与内容、`{typography.admin-caption}` 时间与补充说明。表头沿用后台 12px／600；抽屉标题 15px／700。长 ID 可完整复制或在详情换行，表格截断不能成为唯一内容入口。

## 布局与间距（Layout & Spacing）

### 手机表面

逻辑宽 390px、左右 `{spacing.mobile-gutter}`、模块间 `{spacing.module-gap}`；后续 iframe 稿按规范 375×812 缩放，不能压扁手机内容。成员列表保留原布局，仅在符合资格的单个成员行末增加「留言」。行内保留昵称及用户 ID，点击留言不触发整行原跳转。

「选择话术」与「留言预览」采用同一个 `{components.message-sheet}` 切换步骤，最高约屏高 72%，上部标题和关闭、底部动作固定，中部独立滚动。顺序为对象昵称与右豹 ID → 模板选项或完整实际内容 → 动作；长内容和二维码不能被底部按钮遮住。选择阶段底部「下一步」，预览阶段「返回选择／确认发送」。不叠第二个发送确认弹窗。

系统通知列表复用现有行结构；标题固定「团长留言」。图文详情使用现有全屏子页，隐藏全局底栏并按原行为返回。二维码在实际内容对应位置完整等比显示，不裁切、不拉伸、不添加占位图。二维码具体资源规格与现有消息能力在实施前核实，不新增上传能力或联系方式设置页。

### 后台表面

入口「用户 → 用户通知 → 团长留言」，主区页头下四个模块 Tab：「留言开白／话术模板／留言记录／规则配置」。页面 gutter 为 `{spacing.admin-gutter}`。前三项采用筛选（有需求时）→ 操作区 → 表格；规则配置是四个纵向分组及统一保存区域，每组按开关、数值、单位、适用范围、时间窗口顺序显示。

开白表列为团长 ID／昵称、开白状态、开白时间、操作人、操作时间、备注、操作。模板表列为模板 ID／名称、模板内容摘要、启用状态、变量配置、创建人／时间、更新人／时间、操作。记录表列为记录 ID、团长 ID／昵称、对象 ID／昵称、关系类型、模板 ID／名称、状态、发送时间、失败原因摘要、详情。发送前模板内容和实际内容在只读详情中分别完整展示，避免把宽长正文挤入表格。

表格继承 `<colgroup>` 与固定布局：状态 80–100px、时间 140–160px、昵称 100–130px，长内容占剩余宽度；完整 ID 超出时在详情换行。横向溢出只在表内滚动。操作列使用[组件规范](../../../demo/iteration/component-spec-demo.html)的 `.link`，不混用另一套图标按钮。

### 后续评审台约束

沿用现有总览与页面壳；AGENTS.md 的顶部业务线一级菜单及左侧共用「概览／组件规范」优先于旧外壳文档的单层导航描述。页头保持「右豹主业务」，不另造导航。当前阶段只交付两份文档；后续 Demo 页头写「FR-wen-003 · 支持团长留言给直属下级 · v1 当前」，页内「前端交互／管理后台／业务流程」承载对应内容。

## 层次与阴影（Elevation & Depth）

手机卡片沿用轻阴影 `0 3px 10px rgba(45,55,85,.025)`，Sheet 遮罩限定手机画布内，不能遮住评审台场景按钮。后台面板沿用玻璃卡片，不将透明模糊套到输入框和按钮。Modal、Drawer、Toast 的遮罩、阴影、层级均复制 live spec：Drawer 遮罩 500／面板 501，Modal 600，Toast 700；避免套用旧外壳冲突层级。详情与规则抽屉互斥，打开编辑前关闭详情。

## 形状（Shapes）

手机控件 `{rounded.mobile-control}`、卡片 `{rounded.mobile-card}`、Sheet 顶角 `{rounded.sheet}`。后台按钮和输入 `{rounded.admin-control}`，Modal 与卡片 `{rounded.admin-card}`。二维码保留原图边界，不以圆角遮挡有效图案。状态 Tag 使用 live spec 胶囊，限制 `width: fit-content; white-space: nowrap`。

## 组件（Components）

下表组件名同时用于 EXPERIENCE.md；手机组件从移动端规范继承，后台及评审台组件从 live spec 复制 class，禁止把后台蓝色控件直接放进手机。

| 组件名 | 本次视觉组成与复用方式 |
|---|---|
| member-row | 成员原头像、昵称、ID、关系信息 + 行末暖橙「留言」，沿用 `{components.member-row}`，未具资格不留禁用按钮占位 |
| message-sheet | 顶部 drag bar、标题、关闭，中部滚动区，底部动作；`{components.message-sheet}`，白色底，不用后台 Modal |
| template-option | 模板名称 + 内容摘要 + 单选标识；选中用 `{components.template-option}` 并显示勾选；不把模板变量占位符当实际内容展示 |
| actual-content | `{components.actual-content}`，完整文字及存在的二维码；手机预览、图文详情、后台快照统一保留内容顺序；空变量为空，不补占位文案 |
| mobile-action | 沿用 `{components.mobile-action}` 的主动作和移动端次要动作；loading 有文字「发送中…」，禁用有可见原因 |
| notification-item | `{components.notification-item}`，标题「团长留言」、实际内容摘要、现有时间及未读标识；二维码列表呈现继承现有消息能力，详情完整显示 |
| admin-panel | `{components.admin-panel}`；模块 Tab、筛选卡、表格卡、规则分组沿用后台层级；无新增数据大盘 |
| admin-button | `.btn .btn-primary`／`.btn .btn-ghost`／`.link`；`{components.admin-button}`；删除入口 `.link-danger`，确认 `.btn-danger` |
| admin-form | `{components.admin-form}`；开白表单 ID、状态、备注；模板表单名称、正文、变量插入与启用状态；规则开关和正整数输入；错误紧邻字段 |
| admin-table | `{components.admin-table}`；长正文摘要与详情分离；团长、对象用昵称和 ID 双行，状态 Tag 不撑满单元格 |
| edit-modal | `.modal-overlay` + `.modal.modal-md`，`{components.edit-modal}`；新增／编辑开白和模板，中部滚动，底部取消／保存固定 |
| confirm-modal | `.modal-overlay` + `.modal`，`{components.confirm-modal}`；删除模板，标题与影响说明、取消／确认删除 |
| detail-drawer | `.drawer-overlay` + `.drawer`，`{components.detail-drawer}`；模板与留言记录只读详情。记录按身份关系、模板快照、实际内容、结果分组 |
| status-tag | `.tag.tag-ok`／`.tag.tag-warn`／`.tag.tag-del` 使用 `{components.status-tag}`；开启、关闭、成功、失败均保留中文状态文本 |
| feedback | 手机沿用原轻反馈，后台 `.toast` 使用 `{components.feedback}`；限制和未知结果必须在当前表面保留可读文字，不能只靠短 Toast |
| rule-drawer | `.drawer-overlay` + `.drawer.rule`、`.rule-tab-bar`，`{components.rule-drawer}`；独立于详情 DOM，标题「FR-wen-003 · v1 需求规则」 |
| flow-panel | `.flow-page` + `.flow-svg-wrap` + SVG，`{components.flow-panel}`；手写正交线，先 `flow-edges` 后 `flow-nodes`，图例复用组件规范 |

## 应做与避免（Do's and Don'ts）

- 保留原成员列表与系统通知的视觉上下文，发送对象始终可辨认；只选择固定话术，预览中不出现编辑正文或变量的控件。
- 规则与详情抽屉默认 480px，以 live spec 为准；不套用旧外壳 frontmatter 的 420px。编辑用居中 Modal，详情用右侧 Drawer，删除用 Confirm。
- 状态与错误用文字解释；未开白和间属关系隐藏留言入口，不以红色锁或引导开通制造新流程。
- 手机使用白卡与暖橙，后台使用原蓝色玻璃系统；不引入黑金 Hero、聊天气泡、发件箱、回复栏、群发、导出或新的消息分类。
- 后续 Demo 在 1280×800 下应同时看到场景与一台完整手机，内容在台内滚动；规则抽屉 overlay，不挤压背景，遮罩期间背景不可操作。
- 需求规则只写本 FR；其中「业务流程」只写「见本页『业务流程』Tab」，不嵌图、不复述全文。流程 Tab 手写 SVG，一菱形一判断，失败分支闭环；不用 Mermaid。
- 本次所有表面均为文档规格，未生成 mockup；不把不存在的图稿、生产消息能力或已验证的对比度写成完成事实。
