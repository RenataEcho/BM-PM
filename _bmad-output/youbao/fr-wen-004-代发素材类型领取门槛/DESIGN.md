---
name: '代发素材类型领取门槛'
description: 'FR-wen-004：统一领取要求、媒体账号与领取关联信息的视觉合同。'
iteration_id: FR-wen-004
business_line: 右豹主业务
version: v4
status: final
created: 2026-11-04
updated: 2026-11-06
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

## 2026-11-11 最新调整（优先于历史截图及确认记录）

- 后台已有社交媒体账号模块，本 FR 不再新增该模块、第四个 Tab 或九列表格；稿件管理保留「稿件列表 / 领取记录 / 结算明细」。历史 FR-9 / CAP-9 / S9 新增模块口径撤销，复用现有模块，不在本 FR 重复设计。
- 领取账号选择 Sheet 中每个账号增加「更新数据」，列表上方增加「一键更新全部」。仅用户主动触发，不做定时或进入时自动刷新。更新粉丝量、关注数、获赞数，列表不展示更新时间；账号身份、历史领取关联与添加时间不覆盖。
- 更新中显示反馈并禁止重复更新及确认领取。单个成功后更新该账号；批量逐账号处理，成功项更新、失败项保留原值并提示可重试，不用 0 或空值覆盖失败数据。更新不新增或删除账号。
- 更新完成后按最新规则和最近成功取得的指标重新判断当前可选项；原选择仍满足时保留，不满足时清空，用户重新选择，不自动领取。真实 0 有效。
- 选定账号进入关键词流程后的本次判断与关联快照仍固定；后续账号更新不追溯覆盖已进入流程、占用或成功记录。补关键词无需重审，历史回填与下载规则沿用。
- 静态 Demo 仅模拟更新结果和失败；真实产品需调用账号数据更新服务，不包含真实接口或持久化。



# FR-wen-004 · 代发素材类型领取门槛 · v4 当前

业务线：右豹主业务（youbao）。对应 PRD v9、SPEC v5、EXPERIENCE v4，按 2026-11-06 基础业务流程最终结论更新。旧版上传第一步增加控件、独立账号管理页、全屏领取选择、素材类型详情抽屉和前端回填新增说明均不再采用。D-2、D-4、E-1、E-2、S-1 及本次流程检查项均已确认。本轮已按当前合同同步静态 Demo，验证记录见 demo-final-build.md。

## Brand & Style（品牌与风格）

继承仓库现有三端视觉：创作者手机端采用浅灰底、白卡、暖橙主操作，后台采用蓝色及现有明暗主题，迭代外壳按自身规范。上传沿用原页面，不重画上传系统。Front matter 保留原有色彩、字体、间距及组件 token，不新增品牌色。

本文件负责视觉，EXPERIENCE.md 负责行为；两份文档的当前版本优先于 PRD 和 Demo。完整页面参考见 page-references.md 的当前确认版。

## Colors & Typography（色彩与字体）

手机主操作、单选描边使用 `{colors.mobile-primary}`，要求摘要使用 `{colors.mobile-primary-soft}` 和 `{colors.mobile-ink}`，失败文字使用正文色配 `{colors.mobile-danger}` 标记。后台采用 `{colors.admin-primary}` 与原有完整 dark 变量；无关联「-」为普通值，不使用错误色。

手机标题采用 `{typography.mobile-title}`，昵称和模块标题采用 `{typography.mobile-heading}`，指标与说明采用 `{typography.mobile-body}`。后台标题、正文分别采用 `{typography.admin-title}`、`{typography.admin-body}`，ID 沿用既有等宽字体。

长 ID、链接允许换行；指标展示完整数值，条件和未满足提示不截断。状态同时用文字和标记表达，不只依赖颜色。普通文字对比目标 ≥4.5:1，大字及非文字控件 ≥3:1；沿用 token 仍需按实际字号验证，必要时从既有色板调整文字，不另造色值。

## Layout & Spacing（布局与间距）

| 表面 | 当前设计 |
|---|---|
| 素材类型 | 保留「类型 / 用途 / 状态 / 操作」列表，无详情查看操作；新增/编辑居中弹窗保留名称、用途，并加入三行统一要求，不能按字段数改成抽屉。删除先确认 |
| 上传第一步 | 完全沿用现有「项目与投向」，不新增、移动或修改控件与校验；使用已有素材类型选择结果 |
| 上传第二步 | 所选类型至少启用一项规则时，每本书卡片在公共字段和选片区之间展示「领取稿件限制：不限制 / 使用平台统一限制」，默认不限制。类型三项全关时隐藏整组设置；每卡片一组，不按卡内内容逐条设开关 |
| 上传第三步 | 沿用确认上传；上传前按书籍只读核对，可回第二步修改。一个书籍卡片作为一个素材稿件，同卡多成片共享整稿关键词与要求；账号运营模式最多 5 个关键词按整稿计算。上传成功后所有内容仅可查看，素材审核驳回后重新上传，不编辑原记录 |
| 稿件详情 | 站内及站外私域统一执行门槛，保留试看、书籍信息、剩余素材、领取步骤、注意事项和原入口，增加要求摘要；类型被删除显示「-」，存量及类型删除后的新领取无门槛 |
| 无账号提示 | 仅有领取要求且点击领取后读取确认无账号时，直接覆盖详情弹提示，文案「请先添加媒体账号」，提供取消及添加账号；不先展示空账号选择列表 |
| 领取账号选择 | 已有账号时在详情上覆盖底部 Sheet，最高约 72%；顶部是「稿件领取要求（需全满足）」及本次要求，中部账号列表内部滚动，底部固定确认领取及添加入口。紧凑卡片含平台、昵称(ID)同行、三指标及统一未满足提示，提供删除入口 |
| 添加媒体账号 | 从添加提示或领取 Sheet 进入：平台 → 主页链接 → 识别账号 → 只读结果 → 保存账号；返回来源稿件按最新规则分流，有要求再进 Sheet、已无门槛不强制选账号；不设创作者独立管理页 |
| 删除二次确认 | 在选择 Sheet 上方另弹手机确认框，显示账号昵称与历史保留提示、取消/确认删除。确认关闭后回原 Sheet，遮罩只覆盖手机作用域 |
| 创作者回填 | 完全沿用现有入口、表单、提交及反馈；本次不新增只读关联区、账号选择、换号提示或其他交互优化 |
| 后台回填数量弹窗 | 「稿件管理－领取记录」本条回填数量打开原居中明细弹窗，先展示领取账号的平台、昵称、账号 ID，再展示实际回填链接等原回填明细；不改稿件汇总入口 |
- [2026-11-11 已调整] 复用现有后台社交媒体账号模块，不新增本 FR Tab；账号手动更新见最新调整。
| 关键词与占用 | 先完成账号判断，再在稿件详情上覆盖「选择该项目关键词」底部 Sheet；支持搜索及单选，未选时「选词领取」禁用，选中后高亮；关闭返回同一详情，不跳转独立选词页。先领后填占用期为 1 小时，补关键词期间沿用本次判断；占用不展示为领取成功，不提供可用下载操作 |
| 成功、超时与下载 | 关联关键词成功后才显示领取成功并允许下载；超时显示「已超时」，释放稿件、保留关联、退回积分／次数，再领重新选账号；已成功稿件再次下载直接放行 |

手机参考逻辑宽 390px，iframe 为 375×812；留白 `{spacing.mobile-gutter}`，卡片间距 `{spacing.mobile-gap}`。主操作计入安全区和键盘空间，滚动内容预留按钮高度，统一未满足提示不被遮挡。添加子页隐藏主底栏，领取 Sheet 保留详情背景且禁止误触。创作者没有独立账号管理画面。

后台领稿账号信息统一放在回填列表上方，平台、昵称、ID 分行并展示主页链接；有回填、零回填均保持相同摘要结构，下方原八列不再增加领稿账号列。无关联整体显示「-」，不额外叠加三指标及解析时间。零条回填仍展示领取摘要，原明细显示空态；读取失败显示错误和重试，不能用「-」代替。

先领后填超时后仍保留本次领稿账号信息，记录状态为「已超时」；再次领取不覆盖旧记录。占用、关键词关联成功及超时用既有状态组件区分，不新增配色体系。1 小时指补关键词期限，与作品回填期限分开。扣次及退款／退次复用原流程，不新增交互机制。

## Elevation, Shapes & Components（层级、形状与组件）

后台社交媒体账号表中，「用户」同列分行展示右豹昵称和 ID，「社交媒体账号」同列分行展示账号昵称和 ID；主页链接可完整查看并打开，三指标完整显示且真实 0 不替换为「-」。账号状态复用现有 Tag，仅「正常」「已删除」，同时显示文字；已删除行仍保留身份、主页、指标、新增时间。新增时间为保存成功时间，三指标为添加时记录。表格窄屏横向滚动，Tab 和主页链接可达；沿用表格加载、空态、失败重试样式，不新增后台账号增删改操作。本页覆盖全部用户账号新增记录，与领取级回填明细并列使用。

手机卡片继承 `0 3px 10px rgba(45,55,85,.025)` 轻阴影；控件采用 `{rounded.control}`、卡片与确认框采用 `{rounded.mobile-card}`、Sheet 顶角采用 `{rounded.mobile-sheet}`。后台控件和卡片分别采用 `{rounded.admin-control}`、`{rounded.admin-card}`，继承玻璃与阴影变量。

| 组合名 | 视觉与复用 |
|---|---|
| rule-editor | 固定粉丝量、关注数、获赞数三行：指标、启用、≤/≥、阈值；未启用为「不限制」，条件控件 disabled；错误就近显示，不仅红框 |
| upload-requirements | 仅在第二步有规则的书籍卡片内出现，选项使用既有单选，摘要只读；第一步不新增组件 |
| requirement-summary | 标题「稿件领取要求（需全满足）」，每项单行展示完整要求，不重复显示底部说明；不限制用普通说明，不画资格通过章 |
| account-form | 四平台单选、链接输入复用现有开白字段外观，不继承审核；结果白卡只读，身份在前、三指标随后、解析时间末尾 |
| account-card | 可选项使用单选语义，选中橙边及标记；禁选项仍清楚展示身份、三项指标及「本账号未满足要求」，不展开具体失败项，不整卡降透明度。删除与选择热区分离，不因不达要求而隐藏删除 |
| delete-confirm | 使用手机二次确认框，正文色标题，不套后台警告三角；明确删除对象与历史保留，取消和确认删除可辨识 |
| claim-action | 单一橙色主 CTA，提交中尺寸稳定并显示处理中，禁用时就近说明原因；无要求沿用原领取 |
| backfill-form | 仅指既有表单的复用，本期不改造或增加任何账号说明区域 |
| backfill-detail | 复用 `.modal-overlay`、`.modal` 和既有回填列表，增加领取级身份摘要，实际回填链接完整可查看；弹窗内部滚动 |
| feedback | 字段错误与账号未满足提示常驻，Toast 仅补充；手机反馈在手机内，后台 Toast 复用 top 66px/right 22px |
| demo-shell | 复用 `.btn .btn-primary`、`.btn .btn-ghost`、`.btn .btn-rule`、`.link`、`.link-danger`、`.drawer.rule`、`.rule-tab-bar`、`.flow-page`、`flow-edges`、`flow-nodes`；不新增账号审核 Tag |

Sheet、删除确认和后台弹窗均为覆盖层，不挤窄底层页面；最顶层关闭后才回到底层。手机浮层不跨 iframe 遮盖整页。后续 Demo 页头版本按实际迭代同步，不由 SPEC 文档版本直接推导。

## Responsive & Accessibility（响应式与可访问性）

手机单列，Sheet 列表内部滚动、操作固定；支持 200% 文本放大，底部按钮不盖正文。后台弹窗宽不超过 `calc(100vw - 32px)`、最大高 85vh；表格窄屏横向滚动、操作可达。减少动态效果时去掉非必要滑入。

输入有 label，比较符有「小于等于 / 大于等于」名称；卡片的禁用原因可聚焦阅读，使用 aria-describedby 关联。弹窗有标题、关闭按钮、dialog 语义及焦点限制，关闭回触发项；按钮热区手机至少 44×44px，图标按钮有可读名称。识别、保存、加载变化适度宣告，失败聚焦首错。

## Do's and Don'ts（边界）

- 媒体账号文案为「账号已添加」「可选择 / 不满足领取要求」，数据说明为「数据记录于添加时，支持手动更新，不自动刷新」；不出现媒体账号待审核、通过、驳回或合作状态。原素材发布审核及关键词申请状态沿用，不与已取消的媒体账号审核混同。
- 账号已删除仍保留历史领取身份；后台展示的实际回填链接不用于新增账号一致性判断。
- 上传或添加账号期间规则变化，以选择账号领取时最新规则判断；选定账号进入本次流程后，补关键词、申请返回、提交和失败重试不重新判断。超时再次领取重新选择账号。
- 存量稿件默认无门槛，类型删除后类型「-」且后续领取无门槛；已进入本次流程和历史关联不因后续变化重判。读取失败不得伪装成已删除或无门槛。
- 无门槛仅跳过账号步骤，仍在关联关键词成功后才能下载；成功后的再次下载无需判断，直接下载。流程中不得把占用等同于领取成功。
- 业务线保持右豹主业务，左侧共享概览/组件规范；只用原有配色与组件 class。规则抽屉仅本 FR，业务流程仅页内 Tab 手写 SVG，深链 `?tab=fe|admin|flow`。
- 本次同步文档；静态 Demo 只用示例数据，不接真实服务、登录、权限或持久化，不回改其他 FR 页面。


### 2026-11-06 浏览器批注修订（1—14）

- Demo 移除作品广场，从稿件详情开始；「快捷提词」单行加宽。要求摘要统一为「稿件领取要求（需全满足）」，不重复提示需同时满足。
- 账号 Sheet 使用紧凑卡片，保留身份和三项指标、单选及删除；不满足只显示「本账号未满足要求」。删除入场数据说明及底部选择提示，添加入口统一「添加账号」。判断算法、指标快照和历史关联不变。
- 空账号 Demo 直接进入点击免费领取后的添加提示弹窗。异常状态放入各端 Demo 列表入口，移除全局异常下拉、重置/规则模拟区及编辑弹窗中的失败开关。
- 剪辑手 PC 端与移动端、管理后台、业务流程并列；复用 FR-003 既有看板、项目与投向 → 填写并选成片 → 确认上传的结构和样式，只在各书籍卡片增加领稿要求选择，不引入星图匹配。
- 素材类型列表增加「领稿要求」，按启用项显示粉丝数/关注数/获赞数及比较符、阈值，无启用项显示「-」。
- 领取记录沿用参考截图的筛选和列：ID、用户、稿件、项目名称、稿件类型、书籍信息、剪辑手、关键词、回填数量、扣次、扣次、状态、领取时间、操作。截图原有两个「扣次」标签照原样保留。
- 回填数量弹窗保留回填链接、回填时间、账号、平台、状态、来源、关键词、用户，上方统一展示「领稿账号信息」（平台、昵称、ID、主页链接），下方保留原八列回填列表，不重复增加账号信息列，不以领取账号替换实际回填账号。零回填保留关联信息，无关联显示「-」。

### 2026-11-06 浏览器批注补充

- 门槛读取失败只在详情的领取要求区域显示错误及局部重试；视频、书籍信息与其他详情保留。读取成功前禁止新领取。
- 超时展示与再次下载复用已有「我的领取／已领」页面，不新增本 FR 页面，移除独立演示场景；原超时、退款及成功下载规则保留。
- 添加账号不判断是否符合领取门槛，不展示「解析未达要求」专项场景。「关联账号失效」仅为未证实的跨端删除防御假设，移除演示入口。

### 后台及 PC 定位批注（2026-11-06）

- 剪辑手 PC Demo 默认定位到「填写并选成片」第二步，逐书籍显示领稿要求，保留上一步及下一步交互。
- 点击领取记录时，默认打开含回填作品的回填数量弹窗，展示本次新增的领稿账号信息；关闭后可正常筛选及查看其他记录。
- 社交媒体账号新增「媒体平台」列，位于社交媒体账号右侧，九列顺序按当前表格。
- 稿件列表沿用参考截图字段、筛选及右豹稿件／站外稿件／企业号稿件子 Tab；领稿要求仅新增在标题右侧。表格包含选择、ID、封面、标题、领稿要求、关键词、关键词项目、回填数量、项目、书、稿件信息、稿件目录、发布技巧、代运营合作模式、剪辑手、渠道、素材类型、占用状态、审核、操作，横向滚动。
