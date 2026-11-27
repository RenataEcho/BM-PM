---
name: FR-CoCo-006 收益分配迭代
description: 右豹主业务收益分配的手机画面与后台用户详情。配色和通用组件沿用既有规范，本文件只记这一刀的画面。
status: draft
updated: 2026-11-25
sources:
  - prd.md
  - 需求单.md
  - addendum.md
  - imports/youbao-revenue-distribution-demo.html
  - ../../../docs/design/移动端设计规范.md
  - ../../../docs/design/iteration-shell/DESIGN.md
  - ../../../docs/design/admin-ui-spec.md
colors:
  brand-orange: '#ff4d22'
  brand-orange-hover: '#ff6c46'
  brand-orange-soft: '#fff1ec'
  accent-red: '#ff3157'
  text-primary: '#252836'
  text-secondary: '#9498a8'
  text-muted: '#9aa0ad'
  line-default: '#eceef3'
  surface-page: '#f6f7fb'
  surface-card: '#ffffff'
  nav-inactive: '#758096'
  sheet-mask: '#1a1e2861'
  admin-primary: '#2563eb'
  admin-primary-hover: '#1d4ed8'
  admin-primary-light: '#eff6ff'
  admin-success: '#16a34a'
  admin-success-bg: '#f0fdf4'
  admin-warning: '#d97706'
  admin-warning-bg: '#fffbeb'
  admin-danger: '#dc2626'
  admin-danger-bg: '#fef2f2'
  admin-info: '#0891b2'
  admin-info-bg: '#ecfeff'
  admin-text: '#18222f'
  admin-text-secondary: '#4a5568'
  admin-text-muted: '#9aa5b4'
  admin-border: '#e8edf3'
  admin-surface: '#ffffff'
  admin-bg: '#f0f4f8'
typography:
  page-title:
    fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", Arial, sans-serif'
    fontSize: 17px
    fontWeight: 900
    lineHeight: '1.2'
  module-title:
    fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", Arial, sans-serif'
    fontSize: 15px
    fontWeight: 800
    lineHeight: '1.35'
  row-title:
    fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", Arial, sans-serif'
    fontSize: 13px
    fontWeight: 800
    lineHeight: '1.4'
  body:
    fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", Arial, sans-serif'
    fontSize: 12px
    fontWeight: 400
    lineHeight: '1.5'
  amount:
    fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", Arial, sans-serif'
    fontSize: 16px
    fontWeight: 800
    lineHeight: '1.35'
  admin-section:
    fontFamily: '"PingFang SC", "Microsoft YaHei", "Segoe UI", -apple-system, sans-serif'
    fontSize: 13px
    fontWeight: 600
    lineHeight: '1.5'
  admin-body:
    fontFamily: '"PingFang SC", "Microsoft YaHei", "Segoe UI", -apple-system, sans-serif'
    fontSize: 13px
    fontWeight: 400
    lineHeight: '1.6'
rounded:
  control: 8px
  card: 14px
  sheet: 20px
  full: 9999px
spacing:
  gutter: 12px
  module: 12px
  phone: 390px
  card-padding: 14px
  admin-drawer: 520px
components:
  page-header:
    backgroundColor: '{colors.surface-page}'
    textColor: '{colors.text-primary}'
    fontSize: '{typography.page-title.fontSize}'
    height: 48px
  rule-button:
    backgroundColor: '{colors.brand-orange-soft}'
    textColor: '{colors.brand-orange}'
    radius: '{rounded.control}'
    size: 35px
  entry-bar:
    backgroundColor: '{colors.surface-card}'
    textColor: '{colors.brand-orange}'
    radius: '{rounded.card}'
    minHeight: 44px
  segment-tab:
    activeTextColor: '{colors.brand-orange}'
    inactiveTextColor: '{colors.nav-inactive}'
    activeBackground: '{colors.surface-card}'
    trackBackground: '{colors.line-default}'
    radius: 12px
  filter-chip:
    activeBackground: '{colors.brand-orange-soft}'
    activeTextColor: '{colors.brand-orange}'
    inactiveTextColor: '{colors.nav-inactive}'
    radius: '{rounded.control}'
    minHeight: 32px
  agreement-card:
    backgroundColor: '{colors.surface-card}'
    radius: '{rounded.card}'
    shadow: '0 3px 10px rgba(45,55,85,.025)'
  status-pill:
    pendingBackground: '{colors.brand-orange-soft}'
    pendingTextColor: '{colors.brand-orange}'
    restingTextColor: '{colors.text-secondary}'
    radius: '{rounded.full}'
  record-row:
    backgroundColor: '{colors.surface-card}'
    radius: 12px
    border: '1px solid {colors.line-default}'
    outgoingColor: '{colors.brand-orange}'
    incomingColor: '{colors.text-primary}'
    neutralColor: '{colors.text-muted}'
  sheet:
    backgroundColor: '{colors.surface-card}'
    radius: '{rounded.sheet}'
    mask: '{colors.sheet-mask}'
  confirm-card:
    backgroundColor: '{colors.surface-card}'
    radius: 16px
    actionBackground: '{colors.brand-orange}'
  admin-permission:
    backgroundColor: '{colors.admin-surface}'
    border: '1px solid {colors.admin-border}'
    titleColor: '{colors.admin-text}'
    actionBackground: '{colors.admin-primary}'
  admin-table:
    headerColor: '{colors.admin-text-secondary}'
    textColor: '{colors.admin-text}'
    border: '1px solid {colors.admin-border}'
---

## Brand & Style

收益分配是一本双方都能对上的账。手机里是浅灰底、白卡片、暖橙数字。人先被认出来，钱的方向再用「分出 / 接收」和正负号说清楚。

这一刀沿用 `docs/design/移动端设计规范.md` 的 C 端 token，沿用 `docs/design/iteration-shell/DESIGN.md` 的记录台，沿用 `docs/design/admin-ui-spec.md` 的管理后台。手机框内不出现记录台的蓝紫，也不出现后台的玻璃和蓝色主按钮。

现有画面在 `imports/youbao-revenue-distribution-demo.html`。它决定页面怎么分区。它自带的宋体、`#ff6033`、收入绿色和支出褐红，改成上面的 token。和本文件冲突时，以本文件为准。

## Colors

C 端只用移动端规范里已有的颜色。

- **Brand Orange（`{colors.brand-orange}`）** 用于主按钮、选中页签、待你确认、分出金额、发起入口文字。按压用 `{colors.brand-orange-hover}`。
- **Brand Orange Soft（`{colors.brand-orange-soft}`）** 用于规则按钮底、选中筛选、待你确认底、表单说明底。
- **Text Primary / Secondary / Muted** 分别是 `{colors.text-primary}`、`{colors.text-secondary}`、`{colors.text-muted}`。收到的金额用正文色加正号，零金额和已拒绝、已解除用辅色。
- **Surface Page / Card** 是 `{colors.surface-page}` 和 `{colors.surface-card}`。分割用 `{colors.line-default}`。
- **Accent Red（`{colors.accent-red}`）** 只留给手机里必须单独标出的失败短句，不替代主按钮，也不拿来给「收到」上色。

后台只用管理后台规范里的语义色。权限主按钮是 `{colors.admin-primary}`。协议和分配记录的状态走后台 Badge：待确认 `{colors.admin-warning}`，已生效和已分配 `{colors.admin-success}`，待分配 `{colors.admin-info}`，分配失败 `{colors.admin-danger}`，已拒绝和已解除用默认灰。这些颜色停在后台页签里。

## Typography

手机字体栈是 `{typography.page-title.fontFamily}`。页名用 `{typography.page-title}`。入口名和对方姓名用 `{typography.module-title}`。卡片上的关系句用 `{typography.row-title}`。说明、时间和比例用 `{typography.body}`。金额用 `{typography.amount}`，并保留字重，不能只靠橙色区分收和支。

后台区块标题用 `{typography.admin-section}`，表格和表单值用 `{typography.admin-body}`。

## Layout & Spacing

手机逻辑宽度 `{spacing.phone}`。左右页边和模块间距都是 `{spacing.gutter}`。内容在手机内部滚动。

收益分配页从上到下：

1. 页头：标题居中，右侧只有规则按钮。
2. 分段页签：「分配记录」「分配用户」。默认停在分配记录。
3. 分配用户页签在筛选之上放发起入口。分配记录页签不放发起入口。
4. 筛选。
5. 列表。

发起入口按已开通的权限各占一行。「分配我的收益」和「邀请直属成员分配」同时开通时，两行都在，直接进入各自的表单。

后台不新开菜单。配置、协议和分配记录都在既有「用户详情 → 收益分配」里，自上而下三块。协议和分配记录是该用户相关的表。`[ASSUMPTION]` 不另做全局协议菜单。

记录台里，手机嵌在前端交互页签，后台画在管理后台页签。演示账号切换放在手机外面的场景条上。

## Elevation & Depth

协议卡用 `{components.agreement-card.shadow}`，靠白底和这条轻阴影分开，不使用大阴影。分配记录条用细边框，不叠第二层阴影。

规则、协议详情、分配记录详情、发起表单从底部升起，遮罩是 `{colors.sheet-mask}`，点遮罩关闭。解除确认是页面中部的一张白卡片，一次只问解除。后台编辑沿用管理后台的弹窗和抽屉，不进手机框。

## Shapes

控件圆角 `{rounded.control}`。协议卡圆角 `{rounded.card}`。底部浮层顶部圆角 `{rounded.sheet}`。状态标签用 `{rounded.full}`。对方头像保持正圆，只放姓名首字；这是人名标记，不是金刚区图标。

## Components

### 页头

`{components.page-header}`。标题「收益分配」。右侧不放「发起协议」文字按钮。

### 规则按钮

`{components.rule-button}`。圆形信息符号，可点区域不小于按钮本身。

### 发起入口

`{components.entry-bar}`。左对齐入口原名，右侧箭头。未开通的入口不占位。两项都未开通时，整块不出现。

### 分段页签

`{components.segment-tab}`。两段等分。选中段白底、品牌橙字、轻阴影。未选中用 `{colors.nav-inactive}`。

### 协议筛选

`{components.filter-chip}`。三项：全部协议、我发起的、我收到的。这里的「发起 / 收到」指谁提交了协议。

### 协议卡

`{components.agreement-card}`。左上头像和对方姓名。姓名旁是状态标签。其下两行时间：未生效显示发起时间；已生效显示生效时间。再一行写「我发起的」或「我收到的」。

卡身两列。左列是累计金额，标签按资金方向写「累计已分出」或「累计已收到」；还没生效时金额是「—」。右列是分配比例，文案是「我分出 N%」或「我接收 N%」。邀请类里，团长这张卡是「我发起的」加「我接收」。

底部文字按钮按状态出现：待你确认时是「查看并处理」；已生效时是「解除协议」；已拒绝或已解除、且当前用户仍是发起方并仍有该类型权限时，是「发起协议」。

### 状态标签

`{components.status-pill}`。待你确认用橙底橙字。待对方确认、已生效、已拒绝、已解除只用文字色区分，已生效不加绿色底。

### 分配记录条

`{components.record-row}`。左行标题是「分给 姓名」或「来自 姓名」。右金额：分出带减号，颜色 `{colors.brand-orange}`；收到带加号，颜色 `{colors.text-primary}`；零金额不带符号，颜色 `{colors.text-muted}`。副行是月日时间、参与分配金额、比例。分配失败时副行改为状态「分配失败」，金额用辅色且不带正负号。

### 记录筛选

分配记录标题右侧两个下拉：资金方向（全部方向、我分出的、我收到的收益）、分配时间。方向筛选看的是钱，和协议筛选的发起关系分开。零金额记录默认折叠，列表底部一条文字开关写出条数。

### 协议详情

底部浮层。定义列表展示协议状态、资金方向、收益归属方、分配接收方、协议发起方、协议确认方、发起时间、生效时间。已解除时加解绑时间。已生效时加协议时长。角色名用这四个词。历史正向协议把原主账号显示为收益归属方，原子账号显示为分配接收方，画面上不改称主账号、子账号。

待你确认时，定义列表之下先放确认六项，再放「拒绝」和「接受协议」。已生效时底部是「解除协议」。已拒绝或已解除且允许再次发起时，底部是「发起协议」。

### 确认六项

浅橙说明块，六行标签固定为：谁的收益、分给谁、分配比例、哪些收益参与分配、什么时候分配、分配前哪笔收益暂不可提现。

邀请类在六行之上加 PRD 示例句，团长名称和比例取当前协议：「团长 XX 邀请你将约定范围内收益的 30% 分配给 TA。接受后，纳入协议的当日收益将在分配完成前暂不可提现。系统于次日 00:00 自动分配，分配成功后，你可提现剩余金额。」

个人分配类只有六行，不另写一段示例句。「哪些收益参与分配」的值写「沿用当前收益分配。[待确认]」。「什么时候分配」写「次日 00:00」。生效当天从何时起算，跟在参与收益那一行，标记 `[待确认]`。

### 发起表单

底部浮层，标题用入口原名。个人分配的选择字段叫「分配接收方」。邀请的选择字段叫「直属成员」。下一项是「分配比例（%）」，范围沿用现有 Demo 的单份协议 0.01 到 100，步进 0.01。说明一句：个人分配写「由你分出收益，对方按约定比例接收。」邀请写「由直属成员分出收益，你按约定比例接收。」主按钮「发送协议」，次按钮「取消」。

### 解除确认

`{components.confirm-card}`。标题「解除协议」。正文点出对方姓名。说明：「解除后不再按这份协议分配新收益，历史分配记录仍可查看。」主按钮「确认解除」，次按钮「取消」。

### 规则说明

底部浮层。两段已定口径：对方接受后协议生效；生效后，纳入协议的当日收益整笔在分配完成前暂不可提现，次日 00:00 分配成功后，收益归属方的剩余金额恢复可提现，分配接收方的到账金额可提现。现有 Demo 里「收到的分配不再进入下一份协议基数」改为 `[待确认]`，不放进已定段落。

### 分配记录详情

底部浮层。行：收益归属方、分配接收方、参与分配收益、分配比例、分配金额、剩余金额、处理状态、实际分配时间。处理状态用待分配、已分配、分配失败。底部文字按钮「查看协议」。不展示分配单号。

### 权限勾选

后台「用户详情 → 收益分配」第一块。标题「收益分配协议发起权限」。两个独立复选框，标签用权限原名：「分配发起方个人收益」「邀请直属 V2/V3 成员分配收益」。保存按钮用后台 Primary。原来已开通主账号权限的用户，第一项默认勾上，第二项默认不勾。

### 后台协议表

同一区块第二块。列：协议类型、协议发起方、协议确认方、收益归属方、分配接收方、分配比例、协议状态、发起时间、生效时间。状态用后台 Badge。类型用两个入口原名。

### 后台分配记录表

同一区块第三块。列：协议、收益日期、收益归属方、分配接收方、计算基数、分配比例、分配金额、剩余金额、处理状态、完成时间。失败行的完成时间为空。不展示分配单号。

## Do's and Don'ts

| Do | Don't |
|---|---|
| 手机只用 `{colors.brand-orange}` 做主识别，收到金额用正文色和正号 | 把现有 Demo 的绿色收入、褐红支出或 `#ff6033` 带回手机 |
| 协议关系写「我发起的 / 我收到的」，资金写「我分出 / 我接收」 | 用主账号、子账号充当新协议上的角色名 |
| 两个发起入口用各自的原名，并只渲染已开通的 | 用一个「发起协议」盖住类型，或在未开通时留灰按钮 |
| 待你确认的六项放在接受按钮之上 | 把未定的累计比例、资格变化、起算时刻写成已定句子 |
| 后台状态用管理后台 Badge，手机状态用文字和浅橙 | 把后台蓝、记录台蓝紫画进手机框 |
