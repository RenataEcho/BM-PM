---
name: FR-CoCo-005 团长数据优化
status: final
updated: 2026-11-13
sources:
  - prd.md
  - demo/iteration/fr-coco-005-phone.html
colors:
  canvas: "#f6f4fb"
  surface: "#ffffff"
  ink: "#17151c"
  ink-secondary: "#656579"
  reward: "#ff5935"
  reward-soft: "#fff2eb"
  service: "#7951bd"
  identity-v3: "#a344e8"
  identity-v2: "#ff633e"
  identity-v1: "#4266ed"
  line: "#e6e1ef"
typography:
  name:
    fontFamily: "PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: 17px
    fontWeight: 700
  amount:
    fontFamily: "PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: 28px
    fontWeight: 700
  body:
    fontFamily: "PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: 13px
    fontWeight: 400
  meta:
    fontFamily: "PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: 12px
    fontWeight: 400
rounded:
  card: 16px
  chip: 999px
  sheet: 16px
spacing:
  page: 16px
  card: 14px
  row: 8px
components:
  reward-amount:
    textColor: "{colors.reward}"
  service-entry:
    textColor: "{colors.service}"
    backgroundColor: "{colors.surface}"
---

## Brand & Style

手机里的团长数据页是 OPC 团队经营画面。身份用深色头图和等级色，金额用暖橙，服务带动用紫色，和普通团队数据分开。语气是经营账本，不是活动海报。

迭代页外壳沿用 `docs/design/iteration-shell/DESIGN.md`。蓝紫玻璃只出现在手机外面的记录台。手机内部不改成外壳配色。

画面参照：`demo/iteration/fr-coco-005-phone.html`。外壳与手机不一致时，改外壳。

## Colors

- **Canvas（`#f6f4fb`）** 是手机内容区的底。
- **Surface（`#ffffff`）** 是卡片和底部按钮条。
- **Ink（`#17151c`）** 是标题和成员名。次级说明用 **Ink Secondary（`#656579`）**。
- **Reward（`#ff5935`）** 只用于奖励金额、今日新增和主要数字。浅底用 **Reward Soft（`#fff2eb`）**。
- **Service（`#7951bd`）** 用于服务带动入口、规则入口和服务带动标签。
- 身份等级色分开：V1 `{colors.identity-v1}`，V2 `{colors.identity-v2}`，V3 `{colors.identity-v3}`。

## Typography

成员名和卡片标题用 `{typography.name}`。团队总奖励的主数字用 `{typography.amount}`，颜色走 `{colors.reward}`。说明、标签和日期用 `{typography.body}` 或 `{typography.meta}`。

## Layout & Spacing

手机逻辑宽度 414px，内容在手机内部滚动。页边距 `{spacing.page}`。卡片内边距 `{spacing.card}`。同一张卡片里的指标用三列或四列网格，不把服务带动入口塞进指标格子。

数据页从上到下：身份头图、团队奖励数据、成员数据、项目排行榜、底部邀请按钮。「成员数据」标题旁放一个说明，点击用浮层展示后台 `team_member_rule`。团队奖励详情不放「全部奖励来源」筛选。身份权益、项目排行榜、奖励日历和奖励区的「服务带动奖励」只展示，不响应点击。

## Elevation & Depth

卡片贴在底上，靠圆角和浅分割分开，不使用大阴影。规则、项目分析、社群列表和备注用底部或居中浮层盖住页面，不把后面的页面挤窄。

## Shapes

卡片圆角 `{rounded.card}`。身份标签和状态标签用 `{rounded.chip}`。浮层顶部圆角 `{rounded.sheet}`。

## Components

### 奖励主数字

团队总奖励和明细金额使用 `{components.reward-amount}`。今日、昨日新增放在主数字旁边，不另做一张卡片。

### 服务带动入口

奖励区和成员区各放一条 `{components.service-entry}`。左文案、右数字和箭头。奖励区下面有一行说明：服务带动奖励已计入团队奖励。

### 成员四项

团队成员卡片用四格：TA的团队人数、团队总流水、TA的个人流水、TA贡献的团队奖励。服务带动成员在四格下再放社群条和奖励条。

### 奖励明细卡

一张明细只显示一名成员、一条奖励。标签区分常规团队奖励和服务带动奖励。金额在右侧，用奖励色。

## Do's and Don'ts

- 服务带动用紫色，团队奖励金额用橙色。不要对调。
- 不要把两个服务带动入口合成一条。
- 不要在迭代外壳里再画一套手机配色。
- 示例金额可以出现，但页面要能看出这是模拟账本。
