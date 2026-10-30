---
name: 导师迭代V1.2
description: 导师商务社群页。头图按品牌社群页的深色底和圆角头像；项目条用浅暖卡片；底部按钮和金额用移动端橙色。迭代台蓝紫只留在手机框外。管理后台只列规则。
status: final
created: 2026-10-26
updated: 2026-10-26
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

本文件覆盖 FR-CoCo-002 的两块画面：迭代页里的社群页，以及管理后台的规则文案。配色和组件沿用 `docs/design/移动端设计规范.md` 与 `docs/design/iteration-shell/DESIGN.md`。头图深色是品牌社群参照页的例外。和 Demo 不一致时改 Demo。

## Brand & Style

社群页是已加入成员看的一张手机页。头图按品牌社群页：深色底、居中圆角社群头像、白字社群名称，已加入天数写在名称下面。头图下面是浅暖卡片里的项目图标条，再往下用三个 Tab 切换社群介绍、社群导师、社区战绩。品牌橙用于底部「进入社区飞书」和金额。

迭代页本身仍是给研发看的记录页。页头写 `FR-CoCo-002 · 导师迭代V1.2 · v1 当前`。蓝紫玻璃只出现在手机框外面。

## Colors

手机里只用上面的 token。页底 `{colors.surface-page}`，卡片 `{colors.surface-card}`，主文 `{colors.text-primary}`，说明 `{colors.text-secondary}`，分割 `{colors.line-default}`。主按钮和金额用 `{colors.brand-orange}`，按压 `{colors.brand-orange-hover}`。

头图底色是参照画面的深色渐变，从 `#2b1020` 经 `#4a1832` 到 `#140910`。社群名称用白色。已加入天数用白色 72% 透明度。这层只用于头图，不把数据页的金字铺到战绩上。社群战绩的金额用 `{colors.brand-orange}` 加 `{typography.money}` 的字重。人数和名次用 `{colors.text-primary}`，同样保留字重。

导师浮层的遮罩用 `{colors.sheet-mask}`，拖条用 `{colors.drag-handle}`。

## Typography

社群名称用 `{typography.page-title}`。分区标题用 `{typography.module-title}`。项目名称和导师名字用 `{typography.label}`，色 `{colors.text-primary}`。战绩各项的名称也用 `{typography.label}`，色 `{colors.text-secondary}`。介绍正文、身份、职责、已加入天数用 `{typography.body}`。金额用 `{typography.money}`。

## Layout & Spacing

迭代页是桌面壳。前端交互里，左侧场景、右侧手机。手机逻辑宽 390，框内按 375×812 画。框顶有状态栏：时间、信号、无线网络、电量。状态栏下面才是社群页。这一页没有 App 底栏。

社群页从上到下：

1. 深色头图。状态栏、返回箭头、圆角社群头像、社群名称、已加入天数都在这层里。
2. 浅暖卡片里的社群负责项目，卡片压住头图下沿。
3. 「社群介绍」「社群导师」「社区战绩」三个 Tab，一次只显示一块白卡片。左右 `{spacing.gutter}`。
4. 底部「进入社区飞书」固定在手机底，圆角跟参照画面的底部按钮。

返回箭头不规定回到哪一页。点它在这个 Demo 里仍停在社群页。不画「免费」。

## Elevation & Depth

卡片阴影用 `{components.card.shadow}`。导师浮层盖在手机画面上，从底部升起，最高约 `{components.mentor-sheet.maxHeight}`，不把社群页挤窄。需求规则抽屉在手机框外面，从迭代页右侧盖上。

## Shapes

卡片 `{rounded.card}`。按钮 `{rounded.control}`。项目图标底板 `{rounded.icon}`，方圆。导师头像是圆形照片。浮层顶角 `{rounded.sheet}`。不把项目图标做成正圆细线。

## Components

### 头图

深色头图里，社群头像是居中的圆角方图，64px，圆角 16px。下面是白色社群名称，再下面是已加入天数。天数是「已加入」紧接整数再紧接「天」，例如已加入128天。左上角有返回箭头。没有角标位。

### 社群负责项目

一张浅暖卡片，压在头图下沿。标题「社群负责项目」。下面横排：每一项上为项目图标，下为项目名称。图标 32px，圆角 8px，各项目用自己的图形颜色。名称完整换行，不截断。

每一项都有项目图标。不会出现没有图标的项目，也不会出现一项都没有，这张卡片始终在。没有项目名称的项不占位。

一行放不下时，卡片内横向滑动，下一项要露出一截。

### 内容 Tab

三个 Tab 横排在项目卡片下面：社群介绍、社群导师、社区战绩。选中用 `{colors.brand-orange}` 和底边，未选中 `#758096`。点一个，只显示对应的一块白卡片。没有介绍时不出现「社群介绍」。没有战绩时不出现「社区战绩」。「社群导师」始终在。

### 社群介绍

白卡片，背景 `{colors.surface-card}`，圆角 `{rounded.card}`。正文用 `{typography.body}`，全文都在这一块里，随着社群页滚动。配了图片或视频时，按返回顺序接在正文下面，宽度跟内容区一致，圆角 12px，媒体区用深色底。视频用系统播放控件。没配媒体时，这一块只有正文。

### 社群导师

白卡片。身份是导师后台配置的标签，显示在这一行的右侧，浅橙底 `#fff5f1`、橙边 `#ffe5dc`、橙字 `#f06446`。行的左边是圆形头像，中间是名字和职责。标签是创业导师的在前。标签是助理导师的在后，先写一行「助理导师」紧接人数再紧接「人」，例如助理导师4人，再接同样的行。人数等于下面列出的助理导师行数。没有助理导师时不写这一行。不会出现一位导师都没有。

### 导师浮层

沿用移动端 Bottom Sheet。顶上拖条 `{components.mentor-sheet.handle}`。内容是这一位的头像、名字、身份、职责，以及标题「导师介绍」和一段介绍。介绍按原文，比卡片上的职责更完整，左对齐。没有「关闭」按钮。点遮罩空白处关闭，点浮层里的内容不关闭。没有手机号、飞书昵称、飞书手机号、飞书ID、收益，也没有编辑或进入飞书。

### 社群战绩

白卡片。页上 Tab 写「社区战绩」。里面的版式：

| 位置 | 页上的字 | 数字 |
|---|---|---|
| 第一行，左右并排 | 社区本月总产出、活跃成员 | 产出是金额，`{typography.money}`，色 `{colors.brand-orange}`。活跃成员是活跃人数 / 社群成员总数，色 `{colors.text-primary}`，字重与金额相同 |
| 第二行，左右并排 | 你的社区排行、本月收益 | 名次用 `{colors.text-primary}`；本月收益用金额色 |
| 第三行 | 团队成员收益 | 成员名字、项目名称、单月收益。单月收益用金额色 |
| 底块 | 成员TOP-10 | 按收益从高到低。每行是头像、脱敏昵称、收益。收益用金额色 |

某一格没有返回时，该格留空，不写 0，不写横线。返回的数是 0 时写 0。五项都没有返回时，这一区不出现，成员TOP-10 也不单独出现。金额、名次和排行行都没有按下的样子。脱敏昵称按返回原样显示。

### 进入社区飞书

固定在手机底部，左右留白。实心 `{colors.brand-orange}`，高 48px，圆角 14px，字为「进入社区飞书」。按压变为 `{colors.brand-orange-hover}`。

### 场景切换器

沿用迭代外壳的胶囊按钮。选中为主色浅底加主色字。只出现在手机框左边，不画进手机。

### 管理后台规则

玻璃卡片里的三块文字：社群管理、人员管理、导师管理。每块是标题加规则条。不画表格、筛选、分页和可点操作。

### 需求规则抽屉

沿用迭代外壳的右侧抽屉。宽和关闭方式不变。里面仍是「前端需求」「后台需求」。

## Do's and Don'ts

**Do**

- 手机里用移动端橙色、浅灰底，头图用参照页的深色。
- 头图用参照画面的深色底、圆角头像和白字名称。下面是负责项目，再用 Tab 切换介绍、社群导师、社区战绩。
- 社区本月总产出、你的社区排行这两个标题照现有的字。
- 金额用橙色加字重；人数和名次用深色加同样的字重。

**Don't**

- 不另起蓝、绿或黑金。数据页 Hero 不套到头图和战绩上。
- 不把迭代台蓝紫按钮画进手机。
- 不画社群公告、月收益排行榜、专精项目、社群案例、「加入社群」。
- 不画「免费」，不解释它。
- 不画上一级，不画项目详情页，不画飞书群里的画面。
- 不把管理后台画成可点的表。

## 2026-10-27 个人介绍 Demo 补充

个人介绍配置页沿用移动端浅灰底、白色表单卡片、品牌橙保存按钮。字段按头像、导师名称、当前身份、个人介绍排列；身份置灰，文本区左对齐。独立 Demo 为 demo/iteration/fr-coco-002-mentor-intro.html，手机页为 fr-coco-002-mentor-intro-fe.html。

个人介绍整合回原 V1.2 迭代入口：前端交互左侧提供「用户视角 / 导师视角」，默认用户社群页；导师视角从个人信息页进入个人介绍配置。独立个人介绍入口跳转至原入口导师视角。

2026-10-27 优化：用户视角、导师视角使用前端交互顶部 Tab 切换；参考 AI 申词，左侧常驻展开当前视角的前端需求规则。导师视角直接进入个人介绍配置页，介绍默认可编辑，无需编辑图标。当前身份仍置灰只读。

2026-10-27 保存行为确认：保存后仅提示「保存成功」，保持当前编辑页和信息展开状态，不跳转、不提供预览操作。此规则替代此前保存返回和预览的演示行为。


研发对照规则栏宽屏最大宽度统一为 540px，右侧保留手机宽度；空间不足时规则栏收缩，避免撑宽 H5。
