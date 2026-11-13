---
name: 加入导师团优化
description: 导师商务「我的社群」、社群详情、导师团主页与导师个人介绍配置页；以锁定 Demo 的完整有数据状态为验收真源。
status: final
created: 2026-10-26
updated: 2026-11-13
iteration_id: FR-CoCo-002
sources:
  - _bmad-output/mentor/fr-coco-002-加入导师团优化/prd.md
  - _bmad-output/mentor/fr-coco-002-加入导师团优化/addendum.md
  - docs/design/移动端设计规范.md
  - docs/design/iteration-shell/DESIGN.md
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
  surface-muted: '#f3f4f7'
  header-top: '#2b1020'
  header-mid: '#4a1832'
  header-bottom: '#140910'
  detail-wash-top: '#ffe4ee'
  detail-wash-mid: '#f7eef6'
  detail-wash-end: '#f5f6fa'
  free-badge: '#3b6cff'
  platform-tag-bg: '#f3f4f7'
  platform-tag-text: '#8b909b'
  project-wash: '#fff3ee'
  sheet-mask: '#00000052'
  drag-handle: '#e4e6eb'
typography:
  page-title:
    fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", Arial, sans-serif'
    fontSize: 18px
    fontWeight: 700
    lineHeight: 1.2
  module-title:
    fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", Arial, sans-serif'
    fontSize: 15px
    fontWeight: 800
    lineHeight: 1.3
  body:
    fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", Arial, sans-serif'
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", Arial, sans-serif'
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.4
  row-title:
    fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", Arial, sans-serif'
    fontSize: 13px
    fontWeight: 800
    lineHeight: 1.4
  money:
    fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", Arial, sans-serif'
    fontSize: 16px
    fontWeight: 800
    lineHeight: 1.2
rounded:
  control: 8px
  card: 16px
  cta: 14px
  sheet: 20px
  project-icon: 8px
spacing:
  gutter: 12px
  stack: 12px
  icon: 44px
  project-icon: 32px
  mentor-group-icon: 40px
  member-avatar: 44px
  avatar-tile: 64px
  cta-clearance: 72px
components:
  card:
    background: '{colors.surface-card}'
    radius: '{rounded.card}'
    shadow: '0 3px 10px rgba(45,55,85,.025)'
  header:
    background: 'linear-gradient(180deg, {colors.header-top} 0%, {colors.header-mid} 46%, {colors.header-bottom} 100%)'
    title: '{typography.page-title}'
    titleColor: '#ffffff'
    meta: '{typography.body}'
    metaColor: 'rgba(255,255,255,.72)'
    avatar: '{spacing.avatar-tile}'
    avatarRadius: '{rounded.card}'
  project-row:
    background: '{colors.project-wash}'
    radius: '{rounded.card}'
    iconSize: '{spacing.project-icon}'
    iconRadius: '{rounded.project-icon}'
    label: '{typography.label}'
  intro:
    body: '{typography.body}'
  mentor-card:
    avatar: '{spacing.icon}'
  mentor-group-link:
    background: '{colors.surface-muted}'
    iconSize: '{spacing.mentor-group-icon}'
    radius: '{rounded.control}'
    label: '{typography.body}'
    title: '{typography.label}'
  mentor-sheet:
    mask: '{colors.sheet-mask}'
    radius: '{rounded.sheet}'
    maxHeight: 72%
    handle: '{colors.drag-handle}'
  mentor-group-header:
    background: '{colors.surface-card}'
    iconSize: '{spacing.avatar-tile}'
    radius: '{rounded.card}'
    title: '{typography.page-title}'
  track-chip:
    background: '{colors.brand-orange-soft}'
    foreground: '{colors.brand-orange}'
    radius: 9999px
  member-row:
    avatar: '{spacing.member-avatar}'
    title: '{typography.row-title}'
  stats:
    money: '{typography.money}'
    moneyColor: '{colors.brand-orange}'
    countColor: '{colors.text-primary}'
  feishu-button:
    background: '{colors.brand-orange}'
    hover: '{colors.brand-orange-hover}'
    radius: '{rounded.cta}'
    minHeight: 48px
---

# DESIGN · 加入导师团优化

本文件覆盖 FR-CoCo-002 v2 的五块画面：「我的社群」列表、社群详情、导师团主页、导师视角个人介绍配置页，以及管理后台规则文案。配色和组件沿用现有移动端与迭代外壳。社群详情顶部以 `imports/community-detail-header-2026-11-13.png` 为准，验收页 `demo/iteration/fr-coco-002-mentor-v1-2-fe.html` 跟随本文件。导师团主页仍用深色 Hero。

## Brand & Style

用户视角先展示浅灰底、白卡片的「我的社群」绑定列表。进入详情后，顶部是浅粉过渡上的居中社群身份。所属导师团在列表里是卡片字段，在详情里位于「社群负责导师」下方，是浅暖色独立卡片，不放入单个导师卡片。详情不展示成立时间、社群成员数和社群公告。

导师团主页是从列表或详情下钻的只读全屏子页。页面使用与锁定 Demo 一致的深棕色 Hero、橙色导师团图标、白卡片和品牌橙轻强调；服务数据、可展开介绍、负责人和分层成员向下排列。

迭代页本身仍是给研发看的记录页。页头写 `FR-CoCo-002 · 加入导师团优化 · v2 当前`。蓝紫玻璃只出现在手机内容外面。

## Colors

手机里只用上面的 token。页底 `{colors.surface-page}`，卡片 `{colors.surface-card}`，弱承载区与骨架用 `{colors.surface-muted}`，主文 `{colors.text-primary}`，说明 `{colors.text-secondary}`，占位 `{colors.text-muted}`，分割 `{colors.line-default}`。主按钮、金额和负责赛道轻标签用 `{colors.brand-orange}`；主按钮按压用 `{colors.brand-orange-hover}`，标签底用 `{colors.brand-orange-soft}`。

社群详情头图是浅粉过渡，从 `{colors.detail-wash-top}` 经 `{colors.detail-wash-mid}` 落到 `{colors.detail-wash-end}`。名称、简介用 `{colors.text-primary}`。已加入天数和头像下方标签用 `{colors.platform-tag-text}`，标签底用 `{colors.platform-tag-bg}`。图标左上角标写「免费」或「付费」：「免费」用 `{colors.free-badge}` 配白字，「付费」用 `{colors.brand-orange}` 配白字。页上不解释角标何时出现。

导师团主页仍用深色渐变，从 `{colors.header-top}` 经 `{colors.header-mid}` 到 `{colors.header-bottom}`。这层不铺到社群详情，也不把数据页的金字铺到战绩上。社群战绩的金额用 `{colors.brand-orange}` 加 `{typography.money}` 的字重。人数和名次用 `{colors.text-primary}`，同样保留字重。

导师浮层的遮罩用 `{colors.sheet-mask}`，拖条用 `{colors.drag-handle}`。

## Typography

社群名称与导师团名称用 `{typography.page-title}`。分区标题用 `{typography.module-title}`。项目名称、导师昵称、导师团入口名称用 `{typography.label}`；成员行昵称用 `{typography.row-title}`，均为 `{colors.text-primary}`。战绩和服务数据标签用 `{typography.label}` 与 `{colors.text-secondary}`。介绍正文、身份、职责、已加入天数、社群简介、缺失及异常提示用 `{typography.body}`。社群详情名称居中，用 `{colors.text-primary}`。金额用 `{typography.money}`。

## Layout & Spacing

迭代页是桌面壳。前端交互里，左侧规则、右侧嵌入页。用户视角内容最大宽 430px 并居中；导师视角个人介绍页按 375×812 展示。

用户视角从上到下：

1. 「我的社群」列表：固定顶栏和社群卡片。不放搜索、筛选和审核信息。
2. 社群详情：浅粉头图、居中身份和社群介绍。不放成立时间、社群成员数和社群公告。
3. 「社群负责导师」、浅暖色「所属导师团」卡片、「社群负责项目」「社群战绩」「收益荣誉榜」依次纵向展示。社群介绍留在头图里。
4. 底部固定「换绑」和「对接社群」。对接社群是实心主按钮，权重大于描边的换绑。

详情返回「我的社群」并恢复滚动位置。

导师团主页从上到下：

1. 深色 Hero 内有返回、导师团名称、说明和负责赛道。
2. Hero 下方白卡三列展示服务社群数、导师团成员数、服务会员数。
3. 「导师团介绍」卡默认展示摘要，可展开或收起。
4. 「导师团负责人」卡单独展示负责人。
5. 「导师团成员」按专项导师、创业导师等层级分组展示。

导师视角与用户视角共用同一前端交互区域。个人介绍配置页按移动端单列表单排布：头像、昵称、当前身份、个人介绍依次向下，底部是品牌橙保存按钮。研发对照规则栏宽屏最大宽度统一为 540px，右侧保留手机宽度；空间不足时规则栏收缩，避免撑宽 H5。

## Elevation & Depth

卡片阴影用 `{components.card.shadow}`。导师浮层盖在手机画面上，从底部升起，最高约 `{components.mentor-sheet.maxHeight}`，不把社群页挤窄。导师团主页与社群页保持同一平面层级，通过整页前进与返回表达层级，不叠第二层 Sheet。需求规则抽屉在手机框外面，从迭代页右侧盖上。

## Shapes

卡片 `{rounded.card}`。按钮与导师团入口 `{rounded.control}`。项目图标底板使用 `{rounded.project-icon}`，为圆角方形。导师团图标也是圆角方形；导师头像是圆形照片。负责赛道用全圆角轻标签。浮层顶角 `{rounded.sheet}`。不把项目图标或导师团图标做成正圆细线。

## Components

### 我的社群列表

白色固定顶栏居中写「我的社群」，左侧返回，右侧是橙色文字「申请记录」，点击进入申请记录页。列表不放搜索和筛选，直接列出全部社群。社群卡片为白底大圆角：上半是白色社群信息，左侧圆角图标，名称后不接绑定状态，也不展示审核信息，下方一行是已加入天数和橙色的已获得收益，不展示成员数，右侧有下钻箭头。下半是浅灰导师卡，圆形头像旁只写导师姓名和灰色「绑定导师」，赛道和项目放在姓名右侧，没有箭头。再往下是绑定时间或申请时间，已解绑另有解绑时间。列表卡片不放解绑或换绑。点击白色社群信息进入原来的社群详情；点击灰色导师卡打开导师浮层。列表不再展示「最近记录」。

### 社群详情头部

浅粉头图里只有左上返回。社群图标居中，圆角方形，左上角按社群显示「免费」或「付费」。名称居中。名称下是「已加入 N 天 · 持续成长中」，再是标签「导师团服务中」「项目交流社区」。社群介绍就写在这些标签下面，完整展示，不截断。其下是「展开全部介绍」，展开后补上其余正文，按钮改为「收起」。头图不放成立时间、赛道、30日最高收益、本周新加入。

头图下方不放社群成员数，也不放社群公告。列表同样不展示成员数。负责项目不在头部重复，仍在下方「社群负责项目」。

### 所属导师团入口

放在「社群负责导师」下方、「社群负责项目」上方。浅暖色独立卡，背景 `#fff6ed`，描边 `#f6dcc6`。左侧为橙色渐变图标，中间依次显示「所属导师团」和导师团名称 / 赛道，右侧是箭头。它是社群级入口，不属于导师卡片。

### 社群负责项目

项目以 88px 左右的纵向小卡横向排列：图标在上、名称在下；一屏放不下时横向滑动。点击后打开项目说明 Bottom Sheet。

### 长页内容分区

头部之后按顺序纵向排列社群负责导师、所属导师团、社群负责项目、社群战绩和收益荣誉榜。社群介绍不另起分区。页面不设置内容 Tab，用户通过纵向滚动浏览。

### 社群介绍

介绍正文放在头图标签下方，左对齐，颜色 `#3c4250`，完整展示。下方橙色文字按钮写「展开全部介绍」，展开后补上其余正文，按钮写「收起」。收起后仍保留头像下这段介绍。没有介绍的社群不显示正文和按钮。

### 社群负责导师

白卡片标题固定写「社群负责导师」。负责人使用一行主卡展示头像、昵称、职责和身份标签；下半部以「导师团成员」标题和双列布局展示其他成员。

导师卡片内不展示所属导师团。所属导师团使用「社群负责导师」下方的浅暖色独立卡片；列表卡片中的同名字段进入同一导师团主页。

### 导师浮层

沿用移动端 Bottom Sheet。顶上有拖条；内容是头像、昵称、身份 Tag、标签列表、标题「导师介绍」和完整介绍。右上有关闭按钮，底部有「我知道了」按钮，也可点遮罩关闭。列表里的灰色导师卡打开同一套浮层，身份写「绑定导师」，标签展示该导师的赛道和项目。

### 导师团主页导航

导航与导师团身份共同位于深色 Hero。左侧返回，右侧小字「MENTOR TEAM · 导师团主页」；不放分享、关注、加入、编辑或更多菜单。

### 导师团基本信息

Hero 内横排导师团图标与名称，名称下方显示说明和负责赛道标签。Hero 下方白卡三列展示服务社群数、导师团成员数和服务会员数。

### 导师团负责人

白卡片标题固定写「导师团负责人」。卡内展示一名导师长的圆形头像、昵称、轻标签、职责和箭头；点击后打开资料浮层。

### 导师团成员

白卡片标题固定写「导师团成员」。专项导师、创业导师等分组使用浅暖分组条，成员行展示头像、昵称、身份 Tag、职责和箭头；点击后打开资料浮层。

### 服务数据

服务数据不另设分区标题，使用 Hero 下方第一张白卡三列等分展示。

### 导师团介绍

白卡片标题写「导师团介绍」。默认显示摘要；点击「查看完整介绍」展开剩余正文，按钮切换为「收起介绍」。

### 导师团主页状态视觉

锁定 Demo 只展示完整有数据状态，不设计加载、失败、缺失、异常或空数据视觉。

### 社群战绩

页上分区标题写「社群战绩」，下方另设「收益荣誉榜」。两个模块使用独立白卡：

| 位置 | 页上的字 | 数字 |
|---|---|---|
| 社群战绩三列 | 社群本月总产出、活跃成员、本月新增成员 | 总产出用橙色金额；人数用深色粗体 |
| 个人排行 | 你的社群排行、本月收益、团队成员收益 | 名次用橙色大字，收益使用辅助色 |
| 收益荣誉榜 | 本月收益 TOP 5 | 第一名使用深色重点卡，其余四名使用紧凑排行 |

锁定 Demo 固定展示完整示例数据，不设计缺失值、零值或空榜视觉。

### 详情底部操作

固定在手机底部，左右留白，两个按钮并排。左侧「换绑」是白底橙色描边，flex 较小；右侧「对接社群」是实心品牌橙，flex 更大。未换绑时左侧写「换绑」，点击进入换绑页。换绑审核中写「换绑审核中」，已解绑写「已解绑」，这两种置灰且不可点。

点击「对接社群」从底部打开浮层，社群页留在遮罩下面。浮层顶部有拖条，标题「联系平台运营」，副标题为「了解」加当前社群名，中间是橙色细边二维码，底部写「截图或长按保存」，右下是橙色圆形保存按钮。关闭按钮在浮层右上角，点遮罩也能关掉。

### 个人介绍配置

沿用移动端浅灰底、白色表单卡片和品牌橙保存按钮。头像区域显示当前头像与「更换头像」文字入口；昵称使用单行输入框；当前身份使用置灰只读输入样式；个人介绍使用多行文本区并左对齐。字段限制未确认时不增加额外错误色和错误文案。行为见 `EXPERIENCE.md`。

### 视角切换器

场景切换沿用迭代外壳的下划线 Tab，依次是我的社群、社群详情、导师团、申请记录和导师视角。只出现在嵌入页上方，不画进手机内容。切换场景时，左侧规则和右侧页面一起更换。

### 业务流程

页签内一张手写 SVG，不拆第二张。换绑从社群详情底部进入，按钮先按审核状态分流；只有「换绑」进入换绑页。驳回和撤销沿外侧回到起点。不画解绑申请。图例在图下方。

### 管理后台规则

玻璃卡片里的三块文字：社群管理、人员管理、导师管理。每块由标题和规则条目组成。不画表格、筛选、分页和可点操作。

### 需求规则抽屉

沿用迭代外壳的右侧抽屉。宽和关闭方式不变。里面仍是「前端需求」「后台需求」。

## Do's and Don'ts

**Do**

- 手机里用移动端橙色、浅灰底。社群详情头图用浅粉过渡；导师团头图用深色。
- 默认先展示「我的社群」列表，再进入详情。
- 社群详情顶部按参照图居中排布，并保留长页分区；所属导师团使用列表与详情中的社群级入口。详情不展示社群成员数和社群公告。
- 导师团主页保留深色 Hero、顶部三项数据、可展开介绍、负责人和分层成员。
- 社群介绍与导师团介绍都提供展开 / 收起。
- 「社群本月总产出」「你的社群排行」「本月收益 TOP 5」沿用锁定 Demo 文案。
- 金额用橙色加字重；人数和名次用深色加同样的字重。

**Don't**

- 不把迭代台蓝紫按钮画进手机。
- 不把社群介绍、社群负责导师、社区战绩做成 Tab 或互斥切换内容。
- 不把所属导师团放进单个导师卡片。
- 不在导师团主页增加加入、退出、切换、编辑或后台配置入口。
- 「免费」和「付费」只作为社群图标上的角标出现，不在页上解释出现条件。
- 不连接真实项目详情页或飞书。
- 不把管理后台画成可点的表。
