---
name: 导师迭代V1.2
description: 导师商务社群页与导师个人信息页。社群导师按后端身份层级展示，导师长首位；社群战绩和收益荣誉榜独立显隐；导师可编辑头像、昵称和个人介绍。
status: final
created: 2026-10-26
updated: 2026-11-06
iteration_id: FR-CoCo-002
sources:
  - _bmad-output/mentor/fr-coco-002-导师迭代V1.2/prd.md
  - _bmad-output/mentor/fr-coco-002-导师迭代V1.2/addendum.md
  - docs/design/移动端设计规范.md
  - docs/design/iteration-shell/DESIGN.md
colors:
  brand-orange: '#ff4d22'
  brand-orange-hover: '#ff6c46'
  text-primary: '#252836'
  text-secondary: '#9498a8'
  line-default: '#eceef3'
  surface-page: '#f6f7fb'
  surface-card: '#ffffff'
  header-top: '#2b1020'
  header-mid: '#4a1832'
  header-bottom: '#140910'
  project-wash: '#fff3ee'
  sheet-mask: 'rgba(0,0,0,.32)'
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
  stack: 16px
  icon: 44px
  project-icon: 32px
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
  mentor-sheet:
    mask: '{colors.sheet-mask}'
    radius: '{rounded.sheet}'
    maxHeight: 72%
    handle: '{colors.drag-handle}'
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

# DESIGN · 导师迭代V1.2

本文件覆盖 FR-CoCo-002 的三块画面：用户视角的社群页、导师视角的个人介绍配置页，以及管理后台的规则文案。配色和组件沿用 `docs/design/移动端设计规范.md` 与 `docs/design/iteration-shell/DESIGN.md`。头图深色是品牌社群参照页的例外。和 Demo 不一致时改 Demo。

## Brand & Style

社群页是已加入成员看的一张手机长页。头图按品牌社群页：深色底、居中圆角社群头像、白字社群名称，已加入天数写在名称下面。头图下面是浅暖卡片里的项目图标条，再按纵向顺序展示社群介绍、社群导师、社区战绩三个分区。品牌橙用于底部「进入社区飞书」和金额。

迭代页本身仍是给研发看的记录页。页头写 `FR-CoCo-002 · 导师迭代V1.2 · v1 当前`。蓝紫玻璃只出现在手机框外面。

## Colors

手机里只用上面的 token。页底 `{colors.surface-page}`，卡片 `{colors.surface-card}`，主文 `{colors.text-primary}`，说明 `{colors.text-secondary}`，分割 `{colors.line-default}`。主按钮和金额用 `{colors.brand-orange}`，按压 `{colors.brand-orange-hover}`。

头图底色是参照画面的深色渐变，从 `#2b1020` 经 `#4a1832` 到 `#140910`。社群名称用白色。已加入天数用不透明度 72% 的白色。这层只用于头图，不把数据页的金字铺到战绩上。社群战绩的金额用 `{colors.brand-orange}` 加 `{typography.money}` 的字重。人数和名次用 `{colors.text-primary}`，同样保留字重。

导师浮层的遮罩用 `{colors.sheet-mask}`，拖条用 `{colors.drag-handle}`。

## Typography

社群名称用 `{typography.page-title}`。分区标题用 `{typography.module-title}`。项目名称和导师昵称用 `{typography.label}`，色 `{colors.text-primary}`。战绩各项的名称也用 `{typography.label}`，色 `{colors.text-secondary}`。介绍正文、身份、职责、已加入天数用 `{typography.body}`。金额用 `{typography.money}`。

## Layout & Spacing

迭代页是桌面壳。前端交互里，左侧场景、右侧手机。手机逻辑宽 390，框内按 375×812 画。框顶有状态栏：时间、信号、无线网络、电量。状态栏下面才是社群页。这一页没有 App 底栏。

社群页从上到下：

1. 深色头图。状态栏、返回箭头、圆角社群头像、社群名称、已加入天数都在这层里。
2. 浅暖卡片里的社群负责项目，卡片压住头图下沿。
3. 「社群介绍」「社群导师」「社区战绩」三个纵向分区依次展示，每块使用白卡片，左右 `{spacing.gutter}`，分区之间保留 `{spacing.stack}`。
4. 底部「进入社区飞书」固定在手机底，圆角跟参照画面的底部按钮。

返回箭头不规定回到哪一页。点它在这个 Demo 里仍停在社群页。不画「免费」。

导师视角与用户视角共用同一前端交互区域。个人介绍配置页按移动端单列表单排布：头像、昵称、当前身份、个人介绍依次向下，底部是品牌橙保存按钮。研发对照规则栏宽屏最大宽度统一为 540px，右侧保留手机宽度；空间不足时规则栏收缩，避免撑宽 H5。

## Elevation & Depth

卡片阴影用 `{components.card.shadow}`。导师浮层盖在手机画面上，从底部升起，最高约 `{components.mentor-sheet.maxHeight}`，不把社群页挤窄。需求规则抽屉在手机框外面，从迭代页右侧盖上。

## Shapes

卡片 `{rounded.card}`。按钮 `{rounded.control}`。项目图标底板使用 `{rounded.project-icon}`，为圆角方形。导师头像是圆形照片。浮层顶角 `{rounded.sheet}`。不把项目图标做成正圆细线。

## Components

### 头图

深色头图里，社群头像是居中的圆角方图，64px，圆角 16px。下面是白色社群名称，再下面是已加入天数。天数是「已加入」紧接整数再紧接「天」，例如已加入128天。左上角有返回箭头。没有角标位。

### 社群负责项目

一张浅暖卡片，压在头图下沿。标题「社群负责项目」。下面横排：每一项上为项目图标，下为项目名称。图标 32px，圆角 8px，各项目用自己的图形颜色。名称完整换行，不截断。

每一项都有项目图标。不会出现没有图标的项目，也不会出现一项都没有，这张卡片始终在。没有项目名称的项不占位。

一行放不下时，卡片内横向滑动，下一项要露出一截。

### 长页内容分区

项目卡片下面按顺序纵向排列社群介绍、社群导师、社区战绩。页面不设置内容 Tab，也没有分区切换控件；用户通过纵向滚动浏览。各分区显隐行为见 `EXPERIENCE.md`。

### 社群介绍

白卡片，背景 `{colors.surface-card}`，圆角 `{rounded.card}`。正文用 `{typography.body}`，全文都在这一块里，随着社群页滚动。配置图片或视频时，按后端返回顺序排列在正文下方，宽度跟内容区一致，圆角 12px，媒体区用深色底。视频用系统播放控件。没配媒体时，这一块只有正文。

### 社群导师

白卡片先写分组标题「导师团负责人」，其后写分组标题「导师团成员」。每张导师卡片左边是圆形头像，中间是昵称和职责，右侧显示导师后台配置的身份标签；标签用浅橙底 `#fff5f1`、橙边 `#ffe5dc`、橙字 `#f06446`。

不额外添加助理导师人数标题。导师长继续显示后端返回的身份标签，避免把排序身份和视觉标签拆成两个字段。排序行为见 `EXPERIENCE.md`。

### 导师浮层

沿用移动端 Bottom Sheet。顶上拖条 `{components.mentor-sheet.handle}`。内容是这一位的头像、昵称、身份、职责，以及标题「导师介绍」和一段介绍。介绍按原文，比卡片上的职责更完整，左对齐。没有「关闭」按钮。点遮罩空白处关闭，点浮层里的内容不关闭。没有手机号、飞书昵称、飞书手机号、飞书ID、收益，也没有编辑或进入飞书。

### 社群战绩

页上分区标题写「社区战绩」。分区内的「社群战绩」与「收益荣誉榜」使用两个独立白卡片模块：

| 位置 | 页上的字 | 数字 |
|---|---|---|
| 社群战绩第一行，左右并排 | 社区本月总产出、活跃成员 | 产出是金额，`{typography.money}`，色 `{colors.brand-orange}`。活跃成员是活跃人数 / 社群成员总数，色 `{colors.text-primary}`，字重与金额相同 |
| 社群战绩第二行，左右并排 | 你的社区排行、本月收益 | 名次用 `{colors.text-primary}`；本月收益用金额色 |
| 社群战绩第三行 | 团队成员收益 | 成员名字、项目名称、单月收益。单月收益用金额色 |
| 收益荣誉榜 | 收益荣誉榜 | 沿用成员TOP-10规则，按收益从高到低；每行是头像、脱敏昵称、收益，收益用金额色 |

某一格的数据未返回时，该格留空，不写 0 或横线；返回值为 0 时写 0。金额、名次和排行项均无按压态。脱敏昵称按返回原样显示。

### 进入社区飞书

固定在手机底部，左右留白。实心 `{colors.brand-orange}`，高 48px，圆角 14px，字为「进入社区飞书」。按压变为 `{colors.brand-orange-hover}`。

### 个人介绍配置

沿用移动端浅灰底、白色表单卡片和品牌橙保存按钮。头像区域显示当前头像与「更换头像」文字入口；昵称使用单行输入框；当前身份使用置灰只读输入样式；个人介绍使用多行文本区并左对齐。字段限制未确认时不增加额外错误色和错误文案。行为见 `EXPERIENCE.md`。

### 视角切换器

用户视角 / 导师视角沿用迭代外壳的胶囊按钮。选中为主色浅底加主色字。只出现在手机框左边，不画进手机。社群页不另设内容场景切换器。

### 管理后台规则

玻璃卡片里的三块文字：社群管理、人员管理、导师管理。每块由标题和规则条目组成。不画表格、筛选、分页和可点操作。

### 需求规则抽屉

沿用迭代外壳的右侧抽屉。宽和关闭方式不变。里面仍是「前端需求」「后台需求」。

## Do's and Don'ts

**Do**

- 手机里用移动端橙色、浅灰底，头图用参照页的深色。
- 头图用参照画面的深色底、圆角头像和白字名称。下面是负责项目，再依次展示介绍、社群导师、社区战绩。
- 「社区本月总产出」「你的社区排行」两个标题沿用现有文案。
- 金额用橙色加字重；人数和名次用深色加同样的字重。

**Don't**

- 不另起蓝、绿或黑金。数据页 Hero 不套到头图和战绩上。
- 不把迭代台蓝紫按钮画进手机。
- 不把社群介绍、社群导师、社区战绩做成 Tab 或互斥切换内容。
- 不画社群公告、月收益排行榜、专精项目、社群案例、「加入社群」。
- 不画「免费」，不解释它。
- 不画上一级，不画项目详情页，不画飞书群里的画面。
- 不把管理后台画成可点的表。
