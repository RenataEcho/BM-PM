---
name: '一键代发_报名领取稿件。'
description: 'FR-wen-004：统一领取要求、媒体账号与领取关联信息的视觉合同。'
iteration_id: FR-wen-004
business_line: 右豹主业务
version: v2
status: final
created: 2026-11-04
updated: 2026-11-05
sources:
  - 需求单.md
  - prd.md
  - ../../../docs/design/移动端设计规范.md
  - ../../../docs/design/iteration-shell/DESIGN.md
  - ../../../docs/design/iteration-shell/EXPERIENCE.md
  - ../../../docs/design/admin-ui-spec.md
  - ../../../docs/需求输出规范.md
  - ../../../docs/ITERATION-FR-GUIDE.md
  - ../../../demo/iteration/component-spec-demo.html
  - ../../../demo/iteration/fr-003-fusion-task.js
colors:
  mobile-primary: '#ff4d22'
  mobile-primary-hover: '#ff6c46'
  mobile-primary-soft: '#fff1ec'
  mobile-ink: '#252836'
  mobile-secondary: '#9498a8'
  mobile-muted: '#9aa0ad'
  mobile-line: '#eceef3'
  mobile-bg: '#f6f7fb'
  surface: '#ffffff'
  mobile-danger: '#ff3157'
  admin-primary: '#2563eb'
  admin-primary-soft: '#eff6ff'
  admin-ink: '#18222f'
  admin-secondary: '#4a5568'
  admin-border: '#e8edf3'
  admin-bg: '#f0f4f8'
  admin-danger: '#dc2626'
  admin-success: '#16a34a'
  admin-warning: '#d97706'
  admin-bg-dark: '#0f172a'
  admin-surface-dark: '#1e293b'
  admin-ink-dark: '#f1f5f9'
  admin-border-dark: '#334155'
typography:
  mobile-title:
    fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", Arial, sans-serif'
    fontSize: 17px
    fontWeight: '900'
  mobile-heading:
    fontSize: 15px
    fontWeight: '800'
  mobile-body:
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.5'
  admin-title:
    fontFamily: '"PingFang SC", "Microsoft YaHei", "Segoe UI", -apple-system, sans-serif'
    fontSize: 19px
    fontWeight: '700'
    lineHeight: '1.3'
  admin-body:
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.6'
rounded:
  control: 8px
  mobile-card: 12px
  mobile-sheet: 20px
  admin-control: 7px
  admin-card: 14px
  full: 9999px
spacing:
  compact: 8px
  mobile-gutter: 12px
  mobile-gap: 12px
  section: 20px
  admin-gutter: 20px
  modal-width: 480px
  confirm-width: 400px
  rule-width: 480px
components:
  rule-editor:
    foreground: '{colors.admin-ink}'
    accent: '{colors.admin-primary}'
  upload-requirements:
    accent: '{colors.mobile-primary}'
    background: '{colors.surface}'
  requirement-summary:
    background: '{colors.mobile-primary-soft}'
    foreground: '{colors.mobile-ink}'
  account-form:
    background: '{colors.surface}'
    radius: '{rounded.mobile-card}'
  account-card:
    background: '{colors.surface}'
    radius: '{rounded.mobile-card}'
    selected-border: '{colors.mobile-primary}'
  delete-confirm:
    background: '{colors.surface}'
    radius: '{rounded.mobile-card}'
  claim-action:
    background: '{colors.mobile-primary}'
    foreground: '{colors.surface}'
  backfill-form:
    background: '{colors.surface}'
    foreground: '{colors.mobile-ink}'
  backfill-detail:
    foreground: '{colors.admin-ink}'
    width: '{spacing.modal-width}'
  feedback:
    foreground: '{colors.mobile-ink}'
  demo-shell:
    accent: '{colors.admin-primary}'
    rule-width: '{spacing.rule-width}'
---

# FR-wen-004 · 一键代发_报名领取稿件。 · v2 当前

业务线：右豹主业务（youbao）。对应 PRD v7、SPEC v3，按 2026-11-05 产品十项确认更新。旧版上传第一步增加控件、独立账号管理页、全屏领取选择、素材类型详情抽屉和前端回填新增说明均不再采用。D-2、D-4、E-1、E-2、S-1 已确认，当前无相关待决项。

## Brand & Style（品牌与风格）

继承仓库现有三端视觉：创作者手机端采用浅灰底、白卡、暖橙主操作，后台采用蓝色及现有明暗主题，迭代外壳按自身规范。上传沿用原页面，不重画上传系统。Front matter 保留原有色彩、字体、间距及组件 token，不新增品牌色。

本文件负责视觉，EXPERIENCE.md 负责行为；两份文档的当前版本优先于 PRD 和 Demo。完整页面参考见 page-references.md 的当前确认版。

## Colors & Typography（色彩与字体）

手机主操作、单选描边使用 `{colors.mobile-primary}`，要求摘要使用 `{colors.mobile-primary-soft}` 和 `{colors.mobile-ink}`，失败文字使用正文色配 `{colors.mobile-danger}` 标记。后台采用 `{colors.admin-primary}` 与原有完整 dark 变量；无关联「-」为普通值，不使用错误色。

手机标题采用 `{typography.mobile-title}`，昵称和模块标题采用 `{typography.mobile-heading}`，指标与说明采用 `{typography.mobile-body}`。后台标题、正文分别采用 `{typography.admin-title}`、`{typography.admin-body}`，ID 沿用既有等宽字体。

长 ID、链接允许换行；指标展示完整数值，条件和失败原因不截断。状态同时用文字和标记表达，不只依赖颜色。普通文字对比目标 ≥4.5:1，大字及非文字控件 ≥3:1；沿用 token 仍需按实际字号验证，必要时从既有色板调整文字，不另造色值。

## Layout & Spacing（布局与间距）

| 表面 | 当前设计 |
|---|---|
| 素材类型 | 保留「类型 / 用途 / 状态 / 操作」列表，无详情查看操作；新增/编辑居中弹窗保留名称、用途，并加入三行统一要求，不能按字段数改成抽屉。删除先确认 |
| 上传第一步 | 完全沿用现有「项目与投向」，不新增、移动或修改控件与校验；使用已有素材类型选择结果 |
| 上传第二步 | 所选类型至少启用一项规则时，每本书卡片在公共字段和选片区之间展示「领取稿件限制：不限制 / 使用平台统一限制」，默认不限制。类型三项全关时隐藏整组设置；每卡片一组，不按卡内内容逐条设开关 |
| 上传第三步 | 沿用确认上传；有配置时按书籍只读核对，返回第二步修改。每本书卡片内多条内容打包为一个稿件，成功后类型及使用选择锁定 |
| 稿件详情 | 保留试看、书籍信息、剩余素材、领取步骤、注意事项和原领取按钮，增加本稿件要求摘要 |
| 无账号提示 | 仅有领取要求且点击领取后读取确认无账号时，直接覆盖详情弹提示，文案「请先添加媒体账号」，提供取消及添加账号；不先展示空账号选择列表 |
| 领取账号选择 | 已有账号时在详情上覆盖底部 Sheet，最高约 72%；顶部是本次要求和数据口径，中部账号列表内部滚动，底部固定确认领取及添加入口。卡片含平台、昵称、ID、三指标、解析时间及常驻失败项，提供删除入口 |
| 添加媒体账号 | 从添加提示或领取 Sheet 进入添加表单：平台 → 主页链接 → 识别账号 → 只读结果 → 保存账号；不设「我的 → 媒体账号」或独立管理页 |
| 删除二次确认 | 在选择 Sheet 上方另弹手机确认框，显示账号昵称与历史保留提示、取消/确认删除。确认关闭后回原 Sheet，遮罩只覆盖手机作用域 |
| 创作者回填 | 完全沿用现有入口、表单、提交及反馈；本次不新增只读关联区、账号选择、换号提示或其他交互优化 |
| 后台回填数量弹窗 | 「稿件管理－领取记录」本条回填数量打开原居中明细弹窗，先展示领取账号的平台、昵称、账号 ID，再展示实际回填链接等原回填明细；不改稿件汇总入口 |

手机参考逻辑宽 390px，iframe 为 375×812；留白 `{spacing.mobile-gutter}`，卡片间距 `{spacing.mobile-gap}`。主操作计入安全区和键盘空间，滚动内容预留按钮高度，最后一条失败原因不被遮挡。添加子页隐藏主底栏，领取 Sheet 保留详情背景且禁止误触。没有独立账号管理画面。

后台摘要桌面横排、窄屏竖排（D-4 已确认）；无关联整体显示「-」，不额外叠加三指标、主页及解析时间。零条回填仍展示领取摘要，原明细显示空态；读取失败显示错误和重试，不能用「-」代替。

## Elevation, Shapes & Components（层级、形状与组件）

手机卡片继承 `0 3px 10px rgba(45,55,85,.025)` 轻阴影；控件采用 `{rounded.control}`、卡片与确认框采用 `{rounded.mobile-card}`、Sheet 顶角采用 `{rounded.mobile-sheet}`。后台控件和卡片分别采用 `{rounded.admin-control}`、`{rounded.admin-card}`，继承玻璃与阴影变量。

| 组合名 | 视觉与复用 |
|---|---|
| rule-editor | 固定粉丝量、关注数、获赞数三行：指标、启用、≤/≥、阈值；未启用为「不限制」，条件控件 disabled；错误就近显示，不仅红框 |
| upload-requirements | 仅在第二步有规则的书籍卡片内出现，选项使用既有单选，摘要只读；第一步不新增组件 |
| requirement-summary | 每项单行展示完整要求，末行「以下条件需同时满足」；不限制用普通说明，不画资格通过章 |
| account-form | 四平台单选、链接输入复用现有开白字段外观，不继承审核；结果白卡只读，身份在前、三指标随后、解析时间末尾 |
| account-card | 可选项使用单选语义，选中橙边及标记；禁选项仍清楚展示身份及完整原因，不整卡降透明度。删除与选择热区分离，不因不达要求而隐藏删除 |
| delete-confirm | 使用手机二次确认框，正文色标题，不套后台警告三角；明确删除对象与历史保留，取消和确认删除可辨识 |
| claim-action | 单一橙色主 CTA，提交中尺寸稳定并显示处理中，禁用时就近说明原因；无要求沿用原领取 |
| backfill-form | 仅指既有表单的复用，本期不改造或增加任何账号说明区域 |
| backfill-detail | 复用 `.modal-overlay`、`.modal` 和既有回填列表，增加领取级身份摘要，实际回填链接完整可查看；弹窗内部滚动 |
| feedback | 字段错误与账号失败原因常驻，Toast 仅补充；手机反馈在手机内，后台 Toast 复用 top 66px/right 22px |
| demo-shell | 复用 `.btn .btn-primary`、`.btn .btn-ghost`、`.btn .btn-rule`、`.link`、`.link-danger`、`.drawer.rule`、`.rule-tab-bar`、`.flow-page`、`flow-edges`、`flow-nodes`；不新增账号审核 Tag |

Sheet、删除确认和后台弹窗均为覆盖层，不挤窄底层页面；最顶层关闭后才回到底层。手机浮层不跨 iframe 遮盖整页。后续 Demo 页头版本按实际迭代同步，不由 SPEC 文档版本直接推导。

## Responsive & Accessibility（响应式与可访问性）

手机单列，Sheet 列表内部滚动、操作固定；支持 200% 文本放大，底部按钮不盖正文。后台弹窗宽不超过 `calc(100vw - 32px)`、最大高 85vh；表格窄屏横向滚动、操作可达。减少动态效果时去掉非必要滑入。

输入有 label，比较符有「小于等于 / 大于等于」名称；卡片的禁用原因可聚焦阅读，使用 aria-describedby 关联。弹窗有标题、关闭按钮、dialog 语义及焦点限制，关闭回触发项；按钮热区手机至少 44×44px，图标按钮有可读名称。识别、保存、加载变化适度宣告，失败聚焦首错。

## Do's and Don'ts（边界）

- 文案为「账号已添加」「可选择 / 不满足领取要求」，数据说明为「数据记录于添加时，后续不更新」；不出现待审核、通过、驳回或合作状态。
- 账号已删除仍保留历史领取身份；后台展示的实际回填链接不用于新增账号一致性判断。
- 业务线保持右豹主业务，左侧共享概览/组件规范；只用原有配色与组件 class。规则抽屉仅本 FR，业务流程仅页内 Tab 手写 SVG，深链 `?tab=fe|admin|flow`。
- 本次同步文档；静态 Demo 只用示例数据，不接真实服务、登录、权限或持久化，不回改其他 FR 页面。
