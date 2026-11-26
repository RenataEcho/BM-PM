---
name: PC活动中心的展示样式和交互体验优化
description: 右豹主业务 PC 活动发现、列表与详情宽抽屉的增量视觉合同。
iteration_id: FR-wen-006
business_line: 右豹主业务
business_line_code: youbao
version: v1
status: draft
created: 2026-11-26
updated: 2026-11-26
sources:
  - ./需求单.md
  - ./prd.md
  - ./现有活动功能补充.md
  - ../../../docs/design/移动端设计规范.md
  - ../../../docs/design/iteration-shell/DESIGN.md
  - ../../../docs/design/iteration-shell/EXPERIENCE.md
  - ../../../docs/design/admin-ui-spec.md
  - ../../../demo/iteration/component-spec-demo.html
colors:
  brand-orange: '#ff4d22'
  brand-orange-hover: '#ff6c46'
  brand-orange-soft: '#fff1ec'
  text-primary: '#252836'
  text-secondary: '#9498a8'
  text-muted: '#9aa0ad'
  line-default: '#eceef3'
  surface-page: '#f6f7fb'
  surface-card: '#ffffff'
typography:
  page-title:
    fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", Arial, sans-serif'
    fontSize: 20px
    fontWeight: '800'
    lineHeight: '1.4'
  section-title:
    fontSize: 17px
    fontWeight: '800'
    lineHeight: '1.5'
  card-title:
    fontSize: 15px
    fontWeight: '800'
    lineHeight: '1.5'
  body:
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.7'
  caption:
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.6'
  primary-button:
    fontSize: 19px
    fontWeight: '800'
    lineHeight: '1.4'
rounded:
  sm: 8px
  md: 12px
  lg: 16px
  full: 9999px
spacing:
  '1': 4px
  '2': 8px
  '3': 12px
  '4': 16px
  '5': 20px
  '6': 24px
  page-gutter: 24px
  grid-gap: 16px
  card-min: 280px
  workbench-w: 320px
  drawer-w: 880px
  drawer-gutter: 24px
  control-h: 44px
  logo-size: 40px
  cover-size: 112px
components:
  workbench-activities:
    background: '{colors.surface-card}'
    radius: '{rounded.lg}'
    padding: '{spacing.4}'
  activity-filter:
    active-background: '{colors.brand-orange-soft}'
    active-text: '{colors.text-primary}'
    indicator: '{colors.brand-orange}'
    min-height: '{spacing.control-h}'
  activity-card:
    background: '{colors.surface-card}'
    border: '{colors.line-default}'
    radius: '{rounded.md}'
    padding: '{spacing.4}'
    min-width: '{spacing.card-min}'
  project-logo:
    size: '{spacing.logo-size}'
    radius: '{rounded.sm}'
    placeholder-background: '{colors.surface-page}'
  activity-drawer:
    width: '{spacing.drawer-w}'
    background: '{colors.surface-card}'
    gutter: '{spacing.drawer-gutter}'
  activity-summary:
    cover-size: '{spacing.cover-size}'
    gap: '{spacing.4}'
  activity-tag:
    background: '{colors.brand-orange-soft}'
    foreground: '{colors.text-primary}'
    radius: '{rounded.full}'
  reward-result:
    background: '{colors.brand-orange-soft}'
    foreground: '{colors.text-primary}'
    radius: '{rounded.sm}'
  detail-tabs:
    indicator: '{colors.brand-orange}'
    active-text: '{colors.text-primary}'
    min-height: '{spacing.control-h}'
  introduction-content:
    typography: '{typography.body}'
    gap: '{spacing.6}'
  case-group:
    gap: '{spacing.3}'
    media-radius: '{rounded.sm}'
  ranking-list:
    divider: '{colors.line-default}'
    top-background: '{colors.brand-orange-soft}'
  detail-actions:
    background: '{colors.surface-card}'
    border: '{colors.line-default}'
    min-height: '{spacing.control-h}'
    primary-background: '{colors.brand-orange}'
    primary-foreground: '{colors.surface-card}'
  content-feedback:
    background: '{colors.surface-page}'
    foreground: '{colors.text-primary}'
    radius: '{rounded.sm}'
---

# FR-wen-006 · PC活动中心的展示样式和交互体验优化

## Brand & Style

业务线为**右豹主业务**。本文件负责视觉，配套 [EXPERIENCE.md](EXPERIENCE.md) 负责行为。设计文档与后续 Demo 不一致时改 Demo。当前为可评审草案；已知的业务待确认项见 EXPERIENCE.md，不能把设计提案视为线上现状。

产品画面继承[移动端设计规范](../../../docs/design/移动端设计规范.md)的暖橙、浅灰底和白卡片，将活动信息适配到 PC 阅读空间。这里是创作者客户端，不是活动运营后台；不把管理后台玻璃拟态套入活动内容，不采用一键代发模块专用橙色。后台没有增量界面。

本次只交付两个设计文档，布局由下文区域表表达。现状证据为[现有活动功能补充及附件索引](现有活动功能补充.md)：附件 01 对照头部、奖励结果及榜单；附件 04 对照案例分组、媒体和底部按钮。截图中的金额、日期与奖励只是样例。

[ASSUMPTION D-01] PC 容器尺寸、字号扩展、网格和断点是本次设计提案，不是已经确认的 PC 基线。已有 PC 样式核实后仅调整布局适配，不改变信息和业务规则。

## Colors

所有颜色取自现有 C 端 token，不新增品牌色。

| Token | 本次用途 |
|---|---|
| `{colors.brand-orange}` | 主按钮、筛选及详情 Tab 的选中指示线；不为榜单另建金银铜色 |
| `{colors.brand-orange-hover}` | 保留源规范 token；本 FR 主按钮 hover 仍使用品牌橙底，以轻阴影反馈，避免浅橙底与白字对比下降 |
| `{colors.brand-orange-soft}` | 选中筛选底、活动标签、奖励结果、前三名轻量背景 |
| `{colors.text-primary}` | 标题、时间、人数、规则正文、标签和操作文案等必读信息 |
| `{colors.text-secondary}` / `{colors.text-muted}` | 非必要辅助装饰和骨架占位；不承载活动时间、条件或唯一提示 |
| `{colors.surface-page}` / `{colors.surface-card}` | 页面浅灰、内容白卡片 |
| `{colors.line-default}` | 卡片、Tab、抽屉头尾和榜单分割 |

视觉可访问性：必读正文用深色对白底，对比约 14.63:1。原品牌橙与白色对比约 3.31:1，不用于普通小号白字；PC 橙底主按钮使用 `{typography.primary-button}` 的 19px/800 大字（大字要求至少 3:1）。选中 Tab 用深色文字加橙色指示线，不只靠橙字。继承的灰字对白底不足 4.5:1，因此不把灰字当成必要信息的唯一载体。富文本中运营原有配色不擅自改含义，低对比内容需在实现核验中提出。

记录台外壳另按 [iteration-shell/DESIGN.md](../../../docs/design/iteration-shell/DESIGN.md) 引用其 token；不在本文件重建外壳配色。

## Typography

字体栈继承移动端规范，PC 不使用手机画面整体放大。

| 层级 | 用法 |
|---|---|
| `{typography.page-title}` | 活动中心页名、详情完整活动名称 |
| `{typography.section-title}` | 工作台活动区、案例标题、介绍模块标题 |
| `{typography.card-title}` | 活动卡片名称；摘要最多两行 |
| `{typography.body}` | 正文、时间、人数、榜单主要信息、筛选项 |
| `{typography.caption}` | 标签、小字描述、周期描述；必要内容仍用主文字色 |
| `{typography.primary-button}` | PC 橙底主操作；长文案折行并增加按钮高度，不缩小字号 |

[ASSUMPTION D-02] 上述 PC 字号是以既有字体和层级作出的阅读适配。标题后台上限仍为 64 字；列表允许视觉截断，详情必须完整换行，不能删除文字或用 Tooltip 代替完整详情。日期范围允许两行，开始与结束时间均完整呈现。富文本保留原有层级、表格和强调关系，不把全部文字强制统一为卡片标题字号。

## Layout & Spacing

### 1. 工作台活动区

[ASSUMPTION D-03] 保留工作台既有主布局，仅在右侧活动区使用约 `{spacing.workbench-w}` 的可用宽度。容器内纵向排列最多 3 条摘要，间距 `{spacing.3}`；不足 3 条不补空卡。每条为「项目 Logo + 活动名称」和下方「浏览人数 / 参与人数」。不塞入完整规则、榜单、活动封面大图。活动区窄于建议宽度时摘要文字换行，不能把工作台其它区域挤窄。入口导航继续沿用「服务增长-活动中心」。

### 2. 活动中心列表

| 从上到下 | 排布 |
|---|---|
| 页头 | 活动中心；保留 PC 客户端现有导航，不重做工作台外壳 |
| 筛选 | 全部 / 进行中 / 已结束 / 已参与，单行排列；窄窗允许换行；选中项深色加粗、浅橙底及橙色下划线 |
| 卡片网格 | 可用内容宽度按至少 `{spacing.card-min}` 的卡片和 `{spacing.grid-gap}` 间距排布，最多 3 列；不足空间降为 2 列、1 列 |
| 卡片内部 | 顶部 Logo 与两行名称；底部人数成组，项目身份与活动封面不混用 |

[ASSUMPTION D-04] 页边距 `{spacing.page-gutter}`；内容宽度 ≥872px 用 3 列、≥576px 用 2 列、其余 1 列（边界按 280px 卡宽与 16px 间距计算，不含页边距）。窄卡日期和描述不是新增必显字段；如既有页面已展示且允许展示，应保留并排在名称与人数之间。分页或加载更多沿用当前 PC 能力，不在本次另定条数或滚动加载策略。

### 3. 活动详情抽屉

[ASSUMPTION D-05] 客户端可用视口宽度 ≥960px 时，右侧抽屉宽度为 `{spacing.drawer-w}`；不足 960px 时宽度为客户端可用视口的 100%，仍是同一右侧详情容器，不跳到新页面。抽屉覆盖背景，不挤压列表。右边缘贴视口，无整张圆角浮卡。

| 区域 | 视觉及空间职责 |
|---|---|
| 固定头 | 「活动详情」及右上关闭，至少 44px 关闭点击区；与正文分割 |
| 独立滚动正文：基本信息 | 左侧方形活动封面 112px；右侧完整名称 → 完整活动时间 → 浏览/参与人数 → 标签；无封面时文字占满，不留空洞 |
| 正文：描述 | 仅已有规则允许展示且有值时，置于名称下；最多 40 字仍完整保留，不自行公开后台字段 |
| 正文：奖励结果 | 有效配置且现有状态允许时，在基本信息下独立浅橙提示块，保留原状态文案 |
| 正文：详情 Tab | 介绍 / 案例 / 榜单，由既有有效内容和开关决定；吸附在正文滚动区域顶端 |
| 正文：Tab 内容 | 介绍连续阅读；案例按标题分组；榜单按行，阅读宽度使用剩余空间 |
| 固定操作区 | 仅当前 Tab 按核实后的现有规则有按钮时出现；最多两个原配置按钮；不出现时正文占用其空间 |

正文内边距 `{spacing.drawer-gutter}`；区块间距 `{spacing.6}`。主体只设一条纵向滚动条；富文本超宽表格可在自身横向滚动。底部操作区参与抽屉布局，不浮盖最后一段正文。内容宽度不足 560px 时，封面缩为 80px，名称在剩余宽度换行；不足 400px 时基本信息改为上下排列、内边距 16px。长标签换行，不在横向滑条内藏掉。

## Elevation & Depth

产品卡片继承轻阴影 `0 3px 10px rgba(45,55,85,.025)`，不做玻璃磨砂或营销光晕。抽屉与背景使用现有遮罩范围 `rgba(26,30,40,.38)`，以遮罩和边缘阴影区分层级。

抽屉高于客户端内容，头、Tab、尾只在抽屉内形成局部层级。后续记录台 Demo 应把产品遮罩限制在产品预览范围，避免盖住记录台「需求规则」「退出全屏」；记录台浮层继续遵循其既有层级。

## Shapes

控件与项目 Logo 用 `{rounded.sm}`；活动卡片用 `{rounded.md}`；工作台容器用 `{rounded.lg}`；活动标签用 `{rounded.full}`。活动封面保持方形、等比显示，不拉伸为横幅。Logo 是项目标识，不能因都是方形而与封面共用同一数据。

## Components

组件名与 EXPERIENCE.md 的行为表一一对应。产品画面仅做上述品牌 token 的作用域适配；后续记录台按钮、抽屉、Tag 结构从[组件规范 Demo](../../../demo/iteration/component-spec-demo.html)复制既有 `.btn`、`.drawer`、`.drawer-header`、`.drawer-body`、`.drawer-close`、`.tag` 等 class，不复制后台蓝色进产品画面。

| 组件 | 视觉规则 |
|---|---|
| workbench-activities（工作台活动区） | 单张白容器内纵向摘要，最多 3 条，不把每个 Logo 做成独立浮层 |
| activity-filter（活动筛选） | 高至少 `{spacing.control-h}`；深色选中文字、浅橙选中底及橙色指示线；焦点轮廓与选中态可区分 |
| activity-card（活动卡片） | 白底轻边框，Logo、名称和人数为固定识别层级；hover 以原有边框/轻阴影反馈，不跳动卡片 |
| project-logo（项目 Logo） | 40px 方圆图；缺失时同尺寸中性占位，不能显示活动封面；多项目视觉区域预留但不擅定选择、拼接或折叠规则 |
| activity-drawer（活动详情抽屉） | 固定头、独立滚动正文、条件固定尾；宽度和降级见上文 |
| activity-summary（详情基本信息） | 封面与名称、时间、人数、标签分区；详情不截标题和日期；浏览/参与图标旁保留文字说明 |
| activity-tag（活动标签） | 浅橙底深色字；按原有标签文本展示，多标签自然换行 |
| reward-result（奖励结果） | 基本信息下单独浅橙块，不加新奖励金额、领奖入口或未证实的倒计时 |
| detail-tabs（详情 Tab） | 指示线品牌橙，选中加字重；不显示未配置模块的占位 Tab |
| introduction-content（活动介绍） | 最多 6 个有效模块按原顺序接续；模块间 24px；图片限容器宽，表格保留列与内容，长链接可断行 |
| case-group（活动案例） | 每个案例标题置于自己的媒体组上方；媒体按既有顺序网格排列、等比缩略图；视频保留明确播放标识，不把封面当图片案例 |
| ranking-list（榜单） | 名次 / 头像与脱敏昵称 / 数值 / 描述的行结构；前三名用浅橙背景和字重突出，名次数字仍可见；小字及周期描述完整 |
| detail-actions（详情按钮区） | 最多两按钮，原有主次与顺序不变；主按钮品牌橙、大字白字，次按钮沿用白底深字边框结构；窄窗长文案换行或纵向排列 |
| content-feedback（内容反馈） | 原内容区域内的骨架、空态或错误提示；主提示深色字，保持重试与关闭可见；不用空态代替加载失败 |

[ASSUMPTION D-06] 案例媒体列数、按钮主次与尺寸在既有 PC 组件核实后落地：媒体在内容宽 ≥560px 时最多 3 列、其余 2 列、极窄时 1 列。图片查看和视频播放交互不由网格提案新增，见行为文档待确认项 Q-06。

## Do's and Don'ts

- 项目 Logo 与活动封面分开建视觉位；数据来源不明时使用占位并明确待确认。
- 详情利用宽度完整呈现名称、时间及配置内容，不能只把移动端截图等比放大。
- 介绍模块按后台有效内容顺序连续展示，不把后台编辑子 Tab 变成前端 6 个 Tab。
- 排名、奖励状态和人数都保留文字含义，不只靠颜色或装饰判断。
- 不把「已参与」画成活动生命周期状态，不根据本地点击把活动加入该筛选。
- 不新增排序、领奖、分享、报名或奖励计算，不把截图按钮文案固定成所有活动的通用动作。
- 不改现有后台、移动端、一键代发基线或他人的 FR 页面。
- 记录台与产品分作用域继承规范；有业务流程图时按仓规手写 SVG，规则入口仅指向页内「业务流程」。

## 2026-11-26 · PC 截图与 Demo 落地补充

用户新增的 [PC 首页](附件/PC补充-1.png)、[移动端列表](附件/PC补充-2.png)、[PC 活动中心](附件/PC补充-3.png)、[PC 详情](附件/PC补充-4.png)、[移动端详情头部](附件/PC补充-5.png) 作为本 FR 现状与视觉参考，不将截图中的操作提示当成指令。

- 首页右栏明确在「右豹动态」上方新增「活动中心」；纵向最多 3 条，**不带筛选**，右上「查看全部」进入活动中心。既有主区域保持截图中的深色工作台横幅、指标、我的工作台与今日待办。
- 首页和活动中心共用活动卡片结构：项目识别/状态 → Logo 与两行名称、已有描述 → 完整活动时间 → 浏览/参与人数；卡片不显示右下角箭头，整卡保留可点击入口；首页为紧凑列表，中心为宽卡片网格。新增时间/描述的视觉位参考用户本次列表截图，数据及字段可见范围仍按原规则，不增后台字段。
- 既有 PC 导航、页头和中心「活动列表 / 我的奖励台账」保留原客户端蓝色上下文；本 FR 活动筛选、卡片和详情继续使用本文件 C 端暖橙 token。奖励台账仅保留入口位置，不设计新账本。
- 详情头部参考移动端卡片信息组织，适配 PC 完整标题、起止时间、标签、人数和方形封面；不沿用截图中的窄抽屉信息表。介绍内容按 PC 阅读宽度排版。
- 本次已授权制作 Demo，取代前文「只交付两个设计文档、尚无 Mock」的阶段描述。入口为 `demo/iteration/fr-wen-006-activities.html`；产品页为 `fr-wen-006-pc.html`，样式/脚本及资产均以本 FR 命名，配套副本见同目录 `mockups/`。
- PC 预览不套手机框；宽屏记录台左侧为场景清单，较窄记录台将场景清单横排以保留 PC 阅读宽度，产品本身的断点仍按前文。产品 iframe 高度随预览区收缩，页面内容在客户端内滚动。
- [ASSUMPTION] 截图裁取的单项目 Logo 和封面仅为视觉示例，不证明接口取值或多项目选择规则；描述、日期和媒体示例不新增活动规则。Q-01 的 PC 静态外观已补充，原需求关联与真实交互仍待核实。

### 2026-11-26 · 卡片与详情头部评审调整

- 首页与活动中心卡片移除右下角箭头，整卡点击和键盘打开行为保留。
- 详情顶部活动状态标签移到活动图标下方居中，右侧从完整活动名称开始排列；窄窗上下布局仍保持状态紧跟图标。缺少封面时不预留空图位，状态跟随文字信息显示。
