---
name: '一键代发用户定向约稿；'
description: 'FR-wen-005 右豹主业务定向约稿增量视觉合同，继承现有移动端、剪辑供稿、后台及迭代外壳。'
iteration_id: FR-wen-005
business_line: 右豹主业务
business_line_code: youbao
version: ux-v1
prd_version: v4
status: final
created: 2026-11-17
updated: 2026-11-17
sources:
  - 需求单.md
  - prd.md
  - ../../../docs/design/移动端设计规范.md
  - ../../../docs/design/iteration-shell/DESIGN.md
  - ../../../docs/design/iteration-shell/EXPERIENCE.md
  - ../../../docs/design/admin-ui-spec.md
  - ../../../docs/ITERATION-FR-GUIDE.md
  - ../../../demo/iteration/component-spec-demo.html
  - ../../../demo/iteration/fr-wen-004-pc.html
  - ../../../demo/iteration/fr-wen-004-pc.css
colors:
  mobile-primary: '#ff4d22'
  mobile-primary-hover: '#ff6c46'
  mobile-primary-soft: '#fff1ec'
  mobile-ink: '#252836'
  mobile-secondary: '#9498a8'
  mobile-muted: '#9aa0ad'
  mobile-line: '#eceef3'
  mobile-bg: '#f6f7fb'
  mobile-surface: '#ffffff'
  mobile-danger: '#ff3157'
  mobile-nav-inactive: '#758096'
  pc-primary: '#ff7a16'
  pc-primary-hover: '#ed6710'
  pc-ink: '#1b2b40'
  pc-secondary: '#596579'
  pc-muted: '#8c97a8'
  pc-bg: '#f5f7fb'
  pc-surface: '#ffffff'
  pc-border: '#e4e8f0'
  pc-warning: '#e18320'
  pc-warning-bg: '#fff5e7'
  pc-success: '#369f63'
  pc-success-bg: '#eef9f0'
  pc-danger: '#ef5266'
  pc-danger-bg: '#fff0f1'
  admin-primary: '#2563eb'
  admin-primary-hover: '#1d4ed8'
  admin-primary-soft: '#eff6ff'
  admin-ink: '#18222f'
  admin-secondary: '#4a5568'
  admin-muted: '#9aa5b4'
  admin-bg: '#f0f4f8'
  admin-surface: '#ffffff'
  admin-border: '#e8edf3'
  admin-success: '#16a34a'
  admin-success-bg: '#f0fdf4'
  admin-warning: '#d97706'
  admin-warning-bg: '#fffbeb'
  admin-danger: '#dc2626'
  admin-danger-bg: '#fef2f2'
  admin-info: '#0891b2'
  admin-info-bg: '#ecfeff'
  admin-bg-dark: '#0f172a'
  admin-surface-dark: '#1e293b'
  admin-ink-dark: '#f1f5f9'
  admin-border-dark: '#334155'
  shell-primary: '#2563eb'
  shell-ink: '#18222f'
  shell-surface: '#ffffff'
  shell-version: '#7c3aed'
  shell-fr: '#d97706'
typography:
  mobile-title:
    fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", Arial, sans-serif'
    fontSize: 17px
    fontWeight: '900'
    lineHeight: '1.5'
  mobile-section:
    fontSize: 15px
    fontWeight: '800'
    lineHeight: '1.5'
  mobile-row:
    fontSize: 13px
    fontWeight: '800'
    lineHeight: '1.5'
  mobile-body:
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.5'
  desktop-title:
    fontFamily: '"PingFang SC", "Microsoft YaHei", "Segoe UI", -apple-system, sans-serif'
    fontSize: 19px
    fontWeight: '700'
    lineHeight: '1.3'
  desktop-body:
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.6'
  desktop-caption:
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.5'
rounded:
  mobile-control: 8px
  mobile-card: 16px
  mobile-sheet: 20px
  desktop-control: 7px
  desktop-card: 14px
  pc-card: 12px
  full: 9999px
spacing:
  mobile-gutter: 12px
  mobile-gap: 12px
  mobile-width: 390px
  mobile-tabbar: 74px
  desktop-gutter: 20px
  desktop-gap: 16px
  desktop-input: 34px
  desktop-filter: 30px
  desktop-sidebar: 220px
  pc-sidebar: 174px
  detail-drawer: 520px
  confirm-modal: 400px
  edit-modal: 480px
components:
  mobile-navigation:
    active: '{colors.mobile-primary}'
    inactive: '{colors.mobile-nav-inactive}'
    height: '{spacing.mobile-tabbar}'
  request-card:
    background: '{colors.mobile-surface}'
    ink: '{colors.mobile-ink}'
    radius: '{rounded.mobile-card}'
  application-form:
    background: '{colors.mobile-surface}'
    radius: '{rounded.mobile-card}'
    control-radius: '{rounded.mobile-control}'
  selection-sheet:
    background: '{colors.mobile-surface}'
    selected: '{colors.mobile-primary-soft}'
    radius: '{rounded.mobile-sheet}'
  state-deadline:
    mobile-ink: '{colors.mobile-ink}'
    pc-ink: '{colors.pc-ink}'
    admin-ink: '{colors.admin-ink}'
  manuscript-flow:
    note: '稿件详情、领取、回填完全继承现有页面，只从约稿记录增加入口。'
  notification-entry:
    note: '继承站内通知列表，不增加渠道或新通知组件。'
  pc-request-workspace:
    primary: '{colors.pc-primary}'
    background: '{colors.pc-bg}'
    radius: '{rounded.pc-card}'
  decision-dialog:
    width: '{spacing.confirm-modal}'
    radius: '{rounded.desktop-card}'
  directed-upload:
    primary: '{colors.pc-primary}'
    background: '{colors.pc-surface}'
  admin-records:
    primary: '{colors.admin-primary}'
    ink: '{colors.admin-ink}'
    radius: '{rounded.desktop-card}'
  admin-summary:
    ink: '{colors.admin-ink}'
    note: '继承后台stat-card，五项全量总数。'
  record-detail:
    width: '{spacing.detail-drawer}'
    radius: '{rounded.desktop-card}'
  time-config:
    width: '{spacing.edit-modal}'
    primary: '{colors.admin-primary}'
  feedback:
    note: '手机轻提示、PC反馈、后台Toast分别继承各自作用域。'
  demo-shell:
    primary: '{colors.shell-primary}'
    surface: '{colors.shell-surface}'
---

# FR-wen-005 · 一键代发用户定向约稿； · 视觉合同

## Brand & Style（品牌与风格）

业务线为**右豹主业务（youbao）**，需求名保留原登记的末尾分号。本文件仅定义该增量的页面组合与信息层次，行为见同目录 [EXPERIENCE.md](EXPERIENCE.md)。本次 ux-v1 依据 PRD v4；`status: final` 表示本轮文档交付完成，不代表用户已完成视觉签核。

继承关系：手机沿用[移动端设计规范](../../../docs/design/移动端设计规范.md)；剪辑手 PC 沿用[现有剪辑供稿画面](../../../demo/iteration/fr-wen-004-pc.html)及其 [CSS](../../../demo/iteration/fr-wen-004-pc.css)，仅参考外观与既有供稿结构，不带入 FR-wen-004 的业务规则；管理后台沿用[后台规范](../../../docs/design/admin-ui-spec.md)；评审外壳沿用[迭代外壳](../../../docs/design/iteration-shell/DESIGN.md)与[组件规范](../../../demo/iteration/component-spec-demo.html)。不新建品牌、配色或控件体系。

本文件与 EXPERIENCE.md 为本需求的视觉、行为合同；后续 Demo 不一致时改 Demo。原需求单的天单位及旧状态称呼已被 PRD v4 更新，本设计统一小时与完整阶段名称。顶层业务线导航、左侧共享「概览 / 组件规范」按当前 AGENTS.md 执行，覆盖旧外壳样例中的单 Sidebar 导航描述。

## Colors（色彩）

| 作用域 | 继承 token | 本次用途 |
|---|---|---|
| 手机 | `{colors.mobile-primary}`、`{colors.mobile-primary-soft}` | 定向约稿、提交、实际可领取后的主操作；底栏选中 |
| 手机 | `{colors.mobile-bg}`、`{colors.mobile-surface}`、`{colors.mobile-ink}` | 浅灰底、白卡、深色核心正文；状态、时限和不可取消规则清晰可读 |
| 手机 | `{colors.mobile-danger}` | 必填错误、权限冲突；同时有文字原因 |
| 剪辑手 PC | `{colors.pc-primary}`、`{colors.pc-bg}`、`{colors.pc-ink}` | 沿用既有供稿橙色操作、白底内容与灰色工作区，不套蓝色管理后台 |
| 后台 | `{colors.admin-primary}`、`{colors.admin-surface}`、`{colors.admin-ink}` | 查询、时限编辑、表格和五组详情；玻璃卡继承规范原值 |
| 外壳 | `{colors.shell-primary}`、`{colors.shell-version}`、`{colors.shell-fr}` | 页签、规则入口、版本及编号标记，仅在手机／PC内容区之外 |

状态文字不缩写。PC 和后台在既有 Tag 上区分待处理、进行中、完成及异常；手机采用既有浅橙标签和深色文字，不引入蓝绿主色。后台亮暗完整变量、Badge 暗色值按原规范继承；上表仅为本 FR 使用索引，不替代后台全量变量清单。手机不新增暗色主题。

正文目标对比度为 4.5:1，大字为 3:1。核心信息使用 `{colors.mobile-ink}` 对 `{colors.mobile-surface}`，后台使用 `{colors.admin-ink}` 对 `{colors.admin-surface}`。浅灰只放辅助信息，不单独承载时限、禁用原因或错误。品牌橙及浅灰继承不等于已通过可访问性验证，橙底白字按钮等组合须在后续真实渲染中复核；若不足，应回到共享规范统一处理，不在本 FR 私建新色值。

## Typography（字体）

手机页名用 `{typography.mobile-title}`，项目／书籍主标题用 `{typography.mobile-section}`，卡片行标题用 `{typography.mobile-row}`，说明用 `{typography.mobile-body}`。截止时间和不可取消提示使用正文深色，不用 9px 辅助字号。书名可换行，ID 独立次行；申请说明在详情完整换行，列表只作摘要。

后台页名、正文和时间说明分别继承 `{typography.desktop-title}`、`{typography.desktop-body}`、`{typography.desktop-caption}`。PC 保留现有客户端字体与页头层次，不重绘客户端框架。ID 使用现有等宽字体；缺失 ID 写「未提供」，不能以虚构数字占位。

## Layout & Spacing（布局与间距）

### 手机关键屏

逻辑宽 `{spacing.mobile-width}`，左右 `{spacing.mobile-gutter}`，模块间隔 `{spacing.mobile-gap}`；后续 iframe 按 375×812 画布等比缩放，不截断底部操作。底栏沿用 `{spacing.mobile-tabbar}`，安全区按既有约 86px 留位。

| 页面 | 从上到下的固定信息顺序 | 操作位置 |
|---|---|---|
| 约稿记录 | 页名「约稿」及「定向约稿」→ 记录白卡列表 → 原一键代发底栏新增「约稿」项 | 发起按钮在页头；每张卡内仅呈现当前状态适用的操作，不再叠贴底通栏 |
| 申请填写 | 返回＋「定向约稿」→ 项目 → 书籍／剧 → 剪辑手 → 申请说明（选填）→ 规则提示 → 提交申请 | 全屏子页隐藏底栏；提交位于表单末尾，键盘展开时可滚动到达 |
| 选择内容 | Sheet 标题／关闭 → 搜索或选项 → 选中标记／不支持原因 | 覆盖在手机画布内，最大约72%高度；长列表内部滚动 |
| 记录展开信息 | 当前阶段 → 适用时限／截止时间 → 项目、书籍／剧、剪辑手 → 申请时间与申请说明 → 关联稿件及可用操作 | 在记录页展开，不新造交易详情；实际可领取后从这里进入既有稿件详情 |

记录卡左侧先显示项目和书籍／剧，右上完整状态标签；第二层为剪辑手及申请时间；第三层为当前节点说明、明确的截止时间；底部为操作。来源稿件的「约稿」入口放在原已领列表行操作区，不占据原领取／回填按钮位置。卡片在制作和送审阶段不显示可领取样式，避免把「上传成功」画成交付完成。

### PC 与管理后台关键屏

| 页面 | 组合布局 | 细节 |
|---|---|---|
| 剪辑供稿－定向约稿 | 既有PC侧栏与面包屑 →「定向约稿」内容入口 → 申请列表 → 记录详情抽屉 | 白色卡片、橙色操作；展示申请用户、项目／书籍、说明、状态及当前可用动作 |
| 接受确认 | 居中确认框，标题 → 核对正文 → 项目／书籍／已提供ID →「返回核对／确认接受」 | 使用既有 `.modal-overlay`、`.modal`，PC变量作用域；不套手机提示框 |
| 定向供稿 | 申请摘要 → 既有供稿步骤「项目与投向／填写并选成片／确认上传」→ 上传进度与结果 | 沿用原上传页布局；明确本申请归属、当前阶段、权限异常及本轮截止信息 |
| 后台约稿记录 | 标题 → 五项总数统计 → 筛选区 → 记录表 → 分页 | 标题区单独放「时限配置」，不能混入行操作；统计以全量总数标注 |
| 后台记录详情 | 右侧overlay抽屉 → 五组信息 → 关闭 | 默认 `{spacing.detail-drawer}`，只读label/value；长内容独立滚动，底层表格不缩窄 |
| 时限配置 | 独立居中编辑框 → 两个整数小时输入 → 生效说明 → 取消／保存 | `{spacing.edit-modal}`，两字段单列，单位紧跟输入；0说明常驻 |

后台列表同列上下展示「昵称／ID」「书籍名称／ID」「稿件标题／ID」，列顺序见 EXPERIENCE.md。用 `colgroup` 限定列宽、长文本省略并可查看全文；窄屏横向滚动，操作列保持可达。五组只读详情不是十五个可编辑字段，不因展示字段多而改成独立详情页。

### 后续评审外壳

外壳保持「右豹主业务」，共享左侧「概览 / 组件规范」。FR页页头为 `FR-wen-005 · 一键代发用户定向约稿； · v1 当前`；UX版本不替代PRD版本，也不由PRD v4推导Demo v4。

2026-11-18 按用户调整：页内四个主Tab「用户端 / 剪辑手PC端 / 管理后台 / 业务流程」同一行，替换原「前端交互」及其内部角色切换。保留深链 `?tab=fe|admin|flow`；用户端与PC分别为 `?tab=fe&role=mobile|pc`，旧 `?tab=fe` 默认用户端。手机始终页内嵌入。Chrome固定，Demo台内滚动，一屏可见场景及至少一台完整手机。

## Elevation & Depth（层级与景深）

手机卡片继承 `0 3px 10px rgba(45,55,85,.025)`；Sheet遮罩继承既有0.32—0.38量级，浮层只覆盖手机内部。PC沿用原客户端实底卡与弹窗阴影，管理后台沿用玻璃卡、`--shadow-xl`及亮暗主题。外壳不进入手机画布。

按钮、确认框、抽屉、Tag、业务流程的基础class均取[组件规范](../../../demo/iteration/component-spec-demo.html)：`.btn .btn-primary`、`.btn .btn-ghost`、`.btn .btn-rule`、`.link`、`.link-danger`、`.modal-overlay`、`.modal`、`.modal.modal-md`、`.drawer-overlay`、`.drawer`、`.tag`、`.tag-ok`、`.tag-warn`、`.tag-del`。采用该规范实际层级：抽屉遮罩500／抽屉501、确认框遮罩600、外壳Toast700；避免引用旧示例中的400／500层级。手机使用已有移动端视觉覆盖，不直接套400px后台弹窗。

## Shapes（形状）

手机控件 `{rounded.mobile-control}`，卡片 `{rounded.mobile-card}`，Sheet顶角 `{rounded.mobile-sheet}`，搜索胶囊 `{rounded.full}`。PC卡片 `{rounded.pc-card}`，后台卡片 `{rounded.desktop-card}`，桌面控件 `{rounded.desktop-control}`。图片封面跟随原稿件组件比例，不为定向约稿增加营销海报或黑金收益Hero。

## Components（组件）

下表名称与 EXPERIENCE.md.Component Patterns 一一对应；均为现有组件的业务组合。

| 组合名 | 视觉规格与状态 |
|---|---|
| mobile-navigation | 原底栏增加「约稿」，选中橙色，保持原导航项和图标风格；申请等全屏子页隐藏 |
| request-card | 白卡、项目和书名优先；状态、当前节点、时限与动作分层；一张卡对应一份申请 |
| application-form | 四组信息，前三组必填、申请说明选填；必填标记、冲突提示和原输入值同时可见 |
| selection-sheet | 既有Bottom Sheet＋胶囊搜索＋选项；剪辑手不支持项置灰但原因可读；手填书籍保留名称及已提供ID |
| state-deadline | 状态标签＋节点解释＋绝对截止时间／剩余时间；不限时写「不限制」，不显示00:00；上传进度不取代申请状态 |
| manuscript-flow | 保留既有封面、标题、详情、领取及回填视觉；只增加定向约稿进入路径，不新增交易表单 |
| notification-entry | 原站内通知行，用原通知样式展示结果／上传文案，定位后以既有选中背景强调对应记录 |
| pc-request-workspace | 继承客户端白卡与橙CTA；详情在右侧，审核动作和供稿动作随阶段改变 |
| decision-dialog | PC接受确认展示完整核对信息；撤销／拒绝使用既有确认组件，不新增拒绝理由输入 |
| directed-upload | 复用既有上传表单、运营模式选择、进度条和原稿件重送审；无新增多稿件区或分润锁定字段 |
| admin-records | 玻璃筛选卡、固定列宽表格、完整状态Tag；唯一行操作为「查看详情」文字链 |
| admin-summary | 五张既有统计卡，分别标约稿总数、约稿完成数、超时交付数、未按时领取数、未按时回填数；不是完成率图表 |
| record-detail | PC展示该申请必要信息；后台严格五组完整字段，label/value只读，缺失说明有文字 |
| time-config | 两个标准数字输入、小时单位、默认72／48、0含义、生效说明；错误位于对应输入下方 |
| feedback | 加载用局部骨架；空态用既有图标和说明；错误常驻且可重试，Toast补充；手机反馈不跨出手机框 |
| demo-shell | 场景切换器、编号版本、`.drawer.rule`规则抽屉；流程采用`.flow-page`、`.flow-svg-wrap`、`.flow-legend`和手写SVG |

## Do's and Don'ts（边界）

- 关键时间使用小时，默认交付72小时、领取48小时；不得沿用原需求单「3天」配置输入，回填独立24小时。
- 不用颜色代替11个完整状态名称，不把「稿件审核中」画成可领取，不把领取成功画成已回填。
- 详情overlay，编辑居中modal；所有动作留在各自角色作用域，不把后台只读行画成审批入口。
- 所有页面以本文件中的布局表与EXPERIENCE状态表交付。本轮未生成HTML、截图或Figma稿，不将表格说明宣称为已渲染画面。
- [ASSUMPTION UX-01] 约稿卡片在页内展开申请信息、PC入口的模块内摆位，属于本次布局方案，待Demo评审确认；不影响入口、权限、计时或状态口径。外壳四个主Tab已按2026-11-18用户指令明确，不属于待定项。
- [ASSUMPTION UX-02] 继承组件的橙底白字、浅灰辅助字和暗色状态Tag尚未经过本需求真实画面测量；后续对比度复核由共享规范统一处理，不推定已达到WCAG AA。


## 2026-11-17 浏览器批注修订（本轮用户确认口径）

以下为本轮17条批注及隐私要求的增量合同；与上文旧口径冲突时以此节为准。

- 用户端、剪辑手PC端列表、详情、选择器和弹窗仅显示用户及剪辑手昵称，禁止展示账号ID；管理后台保留ID查询与展示。书籍ID、申请编号、稿件ID不属于账号ID。
- 删除作品广场场景，不改既有广场。我的领取、通知与稿件详情继承既有页面结构。已领记录增加约稿入口；约稿记录不新增通知入口，右上角显示定向约稿。
- 约稿记录筛选为全部、待审核、制作中、待领取、待回填、已超时。制作中含稿件审核中；已超时含交付、领取、回填三种超时，卡片保留完整阶段名。
- 书籍名称、ID、链接独立输入，均可发起搜索；选择搜索结果带入对应书籍信息，也可手填。名称必填，ID可缺省，链接必填口径 [待确认]。素材类型：真人出镜、图文、解压TTS、解说混剪、meme剪辑、AIGC、营销号、沙雕漫、AI数字人、滚屏素材。
- 定向稿件默认无领取条件，每申请仅一稿，不显示剩余素材；任务协作有快捷提词，账号运营无快捷提词。领取复用FR-wen-004选关键词、搜索、单选、选词领取和先领后填；未选关键词禁用选词领取。先领后填1小时内补充关键词后才可下载，超时释放预占，未领稿件继续受原领取截止约束。示例分润比例仅演示，实际配置 [待确认]。
- PC收益数据以静态板块展示；最近上传保留查看全部，后续为已有内容。拒绝申请必填原因，原因写入申请结果及原审核结果通知。
- 上传复用三步：项目与投向（运营模式、稿件类型、素材类型），填写并选成片（书籍名称、ID、链接只读带入，标题、发布提示、单成片），确认上传。一申请仅一个稿件，不可改申请书籍信息。
- 超时未交付提示：当前申请已超时未交付，申请已自动关闭，不可再上传稿件。
- 后台移除明暗切换；申请时间列放最右，回填数量倒数第二。数量打开只读覆盖弹窗，继承FR-wen-004回填详情的领稿账号概览与八列表格，零条显示空态。
- 业务流程见本页业务流程；不接真实接口、登录、权限或持久化。


## 2026-11-18 供稿三步页面调整（用户批注）

以用户提供的现有上传稿件截图为结构基准，保留本需求定向单稿边界。

1. 项目与投向：选择项目仅显示申请项目并默认选中；素材类型仅显示申请类型并选中，不可改选。平台仅显示并自动选择「定向供稿」。运营模式仍可选择任务协作／账号运营；稿件类型支持图集、视频、压缩包。显示剪辑手和定向用户昵称。
2. 填写并选成片：顶部显示当前项目、模式、稿件类型、素材类型、平台、剪辑手和定向用户摘要。一张书籍卡，名称、ID、链接只读带入申请；补充书籍类型（选填，可输入／选择）、剪辑手提醒（选填）、稿件标题、发布技巧（选填）。支持选择文件或文件夹、清空、移除及单成片预览；不提供添加书籍或批量供稿。文件夹仅接受一个成片，多文件提示重新选择。本地文件仅读取名称和大小，不传输文件内容。
3. 确认上传：顶部同一项目摘要，显示1稿件／1成片、书籍分组及稿件卡、待上传状态、可选封面和发布技巧。账号运营沿用截图每稿1—5个不重复关键词；任务协作仍在用户领取时选词。提交操作为「开始上传」；原稿驳回时为「原稿重新送审」。上一步保留填写内容，上传成功后信息绑定该申请稿件。

截图中的批量选稿、批量关键词、添加书籍不适用于本次一申请一稿；不接真实上传和持久化。


## 2026-11-18 补充：剪辑手定向约稿发布权限与列表字段

用户确认在管理后台「基础配置 → 剪辑手管理 → 编辑剪辑手 → 发布平台」中增加「定向约稿」复选项，可与右豹、站外、企业号并选。保存后，移动端申请的剪辑手选择列表仅显示状态可用且开启定向约稿权限的剪辑手；原有项目范围校验继续有效。未开启者不显示，不仅是置灰。提交申请时再次校验此权限，防止历史预填或选中后权限变化绕过；已选者权限关闭时清空选择并提示重新选择。全部关闭时显示无可用剪辑手的空态；重新开启后恢复可选。

[ASSUMPTION] 关闭权限限制新申请，不自动撤销或删除已有申请，不改变已承接稿件的交付时钟；其他存量处理仍沿用原规则。示例配置仅存在当前Demo内存，嵌入移动端共享，刷新重置，不跨独立页面或浏览器同步。示例初始小陈、阿禾剪辑开启，北川关闭；不代表线上默认开关口径。

剪辑手PC定向约稿列表列顺序：申请／用户、项目／书籍／剧、书籍链接、素材类型、申请状态、交付时限、申请说明、操作。申请说明独立一列位于操作前，缺失值显示未填写／未提供。后台定向约稿记录列表「操作」移动到最右侧，表头与数据同步调整。


## 2026-11-18 最新确认：稿件审核通过

本条取代前文“审核通过但暂不可领取／等待实际可领”等旧口径。后台稿件管理点击审核通过，仅弹窗询问「确定通过该稿件？」；取消保持稿件审核中，确定后稿件已通过、申请直接进入待领取，从此刻按申请适用领取时限计时（0不限制）。不提供可领取选项，不存在审核已通过却保持稿件审核中的操作或演示场景；重复审核不重置计时。驳回及原稿重送审规则不变。
