---
name: AI申词
description: 右豹主业务移动端 H5。小明选项目、定书、让 AI 出词，再走现有关键词题词接口。配色继承移动端设计规范，本文件只记这一页的差异。
status: draft
updated: 2026-10-26
sources:
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
  chip-bg: '#fff5f1'
  chip-border: '#ffe5dc'
  chip-text: '#f06446'
typography:
  page-title:
    fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", Arial, sans-serif'
    fontSize: 17px
    fontWeight: 900
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
rounded:
  control: 8px
  card: 16px
  pill: 9999px
spacing:
  gutter: 12px
  stack: 12px
components:
  cta:
    background: '{colors.brand-orange}'
    hover: '{colors.brand-orange-hover}'
    radius: '{rounded.control}'
  card:
    background: '{colors.surface-card}'
    radius: '{rounded.card}'
    shadow: '0 3px 10px rgba(45,55,85,.025)'
  chip:
    background: '{colors.chip-bg}'
    border: '{colors.chip-border}'
    foreground: '{colors.chip-text}'
    radius: '{rounded.pill}'
---

# DESIGN · AI申词

本文件只覆盖 FR-CoCo-001 这个移动端 H5。其余 C 端 token 以 `docs/design/移动端设计规范.md` 为准。迭代台外壳以 `docs/design/iteration-shell/DESIGN.md` 为准，蓝紫玻璃只出现在迭代台外壳。

## Brand & Style

工具页，浅灰底、白卡片、品牌橙做主按钮。小明来这里是为了少想关键词，画面保持短、直接。

## Colors

不另起色。参照稿里的紫色全部换成 `{colors.brand-orange}`。主按钮实心橙。次按钮白底橙边。选中项目、页头链接、词芯片用 `{colors.brand-orange-soft}`、`{colors.chip-bg}`、`{colors.chip-border}`、`{colors.chip-text}`。页底 `{colors.surface-page}`，卡片 `{colors.surface-card}`。

不用数据页黑金。不用迭代台蓝紫做手机里的按钮。

## Typography

页名用 `{typography.page-title}`。书名用 `{typography.module-title}`。简介、记录正文用 `{typography.body}`。

## Layout & Spacing

前端交互不设左侧场景栏；Demo 台居中展示 375px 宽的 H5 页面，不使用手机外壳、黑边或设备装饰，不横向拉伸或缩放。页面高度随展示区适配，内容区独立滚动，底部操作始终可见。左右 `{spacing.gutter}`，模块之间 `{spacing.stack}`。

手机顶部有状态栏：时间、信号、无线网络、电量。下面才是页头。这一页没有 App 底栏。申请记录从页头进入，返回后回到申词页。

## Elevation & Depth

卡片阴影用 `{components.card.shadow}`。提交成功或失败写在当前页的一条结果条上，不另起居中弹窗。

## Shapes

这一页按参照稿的圆角：项目卡 13px，内容卡 15px，按钮 12px，词芯片 8px。颜色仍用上面的橙色 token。

## Components

- **项目**：三列卡片。上是橙底字标，下是名称。选中加橙边、浅橙底、右上角勾。
- **添加书籍**：右侧两个页签，「输入书籍 ID」和「官方推荐」。推荐页每次 5 本，可换一换，点添加加入本次。
- **书籍信息**：白卡片。左封面，右名称、书籍 ID、书籍链接，右侧可移除。
- **统一申请数量**：单独一块输入。这个数用于本次每一本书，1 到 10。
- **词**：按书分组，词是浅橙芯片，横排换行。还没申词时给空状态。
- **底部按钮**：固定两枚并排。左是实心橙，未出词时写「AI 申词」，出词后改为「重新申请」。右是白底橙边的「立即题词」。
- **申请记录**：返回在内容区。每条有项目、类型、状态、时间，再按书列出数量和词，或题词结果。只读。

## Do's and Don'ts

**Do**

- 手机里只用移动端橙色和白卡片。
- 成功、失败都留在当前页。

**Don't**

- 不要把迭代台的蓝色主按钮画进手机。
- 不要加 App 底栏、客服悬浮、数据 Hero。
- 不要为题词再套一层确认弹窗。


### 研发对照规则栏

前端交互采用左侧规则、右侧 375px H5 的布局，无手机外壳。左栏独立滚动，展示当前页面的字段、交互、状态与边界；申请记录与申词页切换时同步更新。左栏与完整需求抽屉复用同一份结构化规则，提示词仅留在抽屉，业务流程指向独立 Tab。


### 本地规则编辑

左侧规则区提供「编辑规则／保存到项目／取消」。使用 ## 分区标题与 - 规则条目编辑当前页面规则，保存至同目录 frontend-rules.json；刷新读取保存结果，抽屉与左栏同步。通过 python3 scripts/preview_server.py 启动本地服务。格式错误、保存失败或并发修改时保留输入并提示；取消不写文件。此能力仅编辑研发说明，不改变 H5 示例数据，也不自动改写 PRD 或视觉、交互合同。


### 字节系题词 · 推广类型

字节系项目点击「立即题词」先选择推广类型（必选），确认后携带所选类型走题词接口；未选择不可确认，取消不提交。类型：真人出镜、图文、解压TTS、解说混剪、meme剪辑、AIGC、营销号、沙雕漫、AI数字人、滚屏素材。

交互采用「选择推广类型」弹窗，单选下拉，不设默认值。确认按钮为「确认题词」；关闭或取消保留当前申词结果。Demo 仅模拟提交反馈，不接真实接口。[ASSUMPTION] 所选类型适用于本次所有书籍；接口字段名及枚举编码待接口方确认。


规则栏在宽屏下最大宽度为 540px，右侧 H5 保持 375px，减少规则正文换行。


研发对照规则栏宽屏最大宽度统一为 540px，右侧保留手机宽度；空间不足时规则栏收缩，避免撑宽 H5。
