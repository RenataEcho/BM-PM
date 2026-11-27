---
name: 演示门
description: 预览登录门按桌面稿 bm_pm_login_demo 还原。只用于这一屏，不改总览配色。
status: draft
updated: 2026-10-15
sources:
  - docs/design/iteration-shell/DESIGN.md
  - ../../prds/prd-BM-PM-2026-10-15/prd.md
colors:
  primary: '#2563eb'
  primary-hover: '#1d4ed8'
  primary-light: '#eff6ff'
  danger: '#dc2626'
  danger-bg: '#fef2f2'
  bg: '#f0f4f8'
  bg-gradient-start: '#e0e7ff'
  bg-gradient-mid: '#f0f4f8'
  bg-gradient-end: '#e0f2fe'
  topnav-bg-start: '#dbeafe'
  topnav-bg-mid: '#ede9fe'
  topnav-bg-end: '#e0f2fe'
  surface: '#ffffff'
  surface-glass: 'rgba(255,255,255,0.72)'
  border: '#e8edf3'
  text-primary: '#18222f'
  text-secondary: '#4a5568'
  text-muted: '#9aa5b4'
typography:
  brand:
    fontFamily: 'Inter, "PingFang SC", "Microsoft YaHei", sans-serif'
    fontSize: 15px
    fontWeight: '700'
    lineHeight: '1.2'
  page-title:
    fontFamily: 'Inter, "PingFang SC", sans-serif'
    fontSize: 19px
    fontWeight: '700'
    lineHeight: '1.3'
  body:
    fontFamily: 'Inter, "PingFang SC", sans-serif'
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.55'
  caption:
    fontFamily: 'Inter, "PingFang SC", sans-serif'
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.5'
rounded:
  sm: 7px
  lg: 14px
spacing:
  '4': 16px
  '6': 24px
  form-w: 360px
components:
  gate-page:
    background: 'linear-gradient(135deg, {colors.bg-gradient-start} 0%, {colors.bg-gradient-mid} 40%, {colors.bg-gradient-end} 100%)'
  gate-stage:
    background: 'linear-gradient(160deg, {colors.topnav-bg-start} 0%, {colors.topnav-bg-mid} 46%, {colors.topnav-bg-end} 100%)'
    padding: 48px
  gate-panel:
    background: '{colors.surface}'
    padding: 48px
  gate-form:
    width: '{spacing.form-w}'
  gate-input:
    background: '{colors.surface}'
    border: '1px solid {colors.border}'
    radius: '{rounded.sm}'
    height: 40px
    fontSize: 13px
  btn-primary:
    background: '{colors.primary}'
    foreground: '#ffffff'
    radius: '{rounded.sm}'
    height: 40px
    fontSize: 13px
  gate-error:
    background: '{colors.danger-bg}'
    foreground: '{colors.danger}'
    radius: '{rounded.sm}'
    fontSize: '{typography.caption.fontSize}'
---

## Brand & Style

演示门按 `bm_pm_login_demo.html` 还原。左栏是品牌与示意卡片，右栏是登录表单。未通过时不露出总览、侧栏或需求正文。总览本身仍沿用迭代外壳，不把这一屏的配色扩到总览。

总览通过之后仍遵守外壳约定：顶栏不加登录、头像、退出或通知。

## Colors

本文件的色值与 `docs/design/iteration-shell/DESIGN.md` 相同，不新增色相。

- `{colors.primary}` — 进入按钮。悬停用 `{colors.primary-hover}`。
- `{colors.danger}` 与 `{colors.danger-bg}` — 只用于失败提示。不做成整页红底，也不做成危险确认按钮。
- `{colors.text-primary}` — 标题。`{colors.text-secondary}` — 标签。`{colors.text-muted}` — 辅助一句。
- `{colors.topnav-bg-start}` 到 `{colors.topnav-bg-end}` — 左栏品牌底。`{colors.surface}` — 右栏和输入框。`{colors.bg}` — 整页底。

## Typography

- 左栏产品名和右栏「登录」用 22px / 700，字体族与外壳相同。
- 标题用 `{typography.page-title}`。
- 标签、输入、按钮用 `{typography.body}`。
- 失败提示用 `{typography.caption}`。
- 字体族与外壳相同。不另引展示字体。

## Layout & Spacing

桌面是左右两栏，约各占一半。左栏贴边铺渐变，内边距 48px：上方品牌，下方一句「登录后查看总览和需求内容。」右栏白底，表单宽 `{spacing.form-w}`，垂直居中。表单顺序：标题「登录」、一句说明、账号、密码、失败提示（仅失败时）、全宽「进入」。

窄于 860px 时改成上下：品牌在上，表单在下，整页可滚动。

## Elevation & Depth

左栏是平铺渐变，不另加卡片阴影。品牌标记带外壳卡片同级的轻阴影。右栏是实底，输入框不再叠第二层阴影。失败提示是表单里的一条浅底文字，不升起对话框。

## Shapes

品牌标记 `{rounded.lg}`。输入框、按钮、失败提示 `{rounded.sm}`。左右两栏本身不切圆角，贴齐视口。

## Components

### 品牌标记

沿用总览的方形渐变标记，放大到 56px，旁边是「BM-PM」和「迭代需求」。不新做插画、盾牌或锁图标。

### 输入框

白底、`{colors.border}` 描边、高度 40px。标签在框上，文案为「账号」「密码」。聚焦时描边改为 `{colors.primary}`，外圈 `{colors.primary-light}`。密码框遮住字符。失败后描边改为 `{colors.danger}`。

### 主按钮

class 使用外壳的 `btn btn-primary`。文案「进入」。全宽，高度 40px。没有取消、没有次按钮。

### 失败提示

出现在按钮上方。底 `{colors.danger-bg}`，字 `{colors.danger}`。文案只有「账号或密码不正确」。

## Do's and Don'ts

**Do**

- 色、字、圆角、玻璃卡片、主按钮全部沿用迭代外壳。
- 未通过时，视口是左品牌、右登录，背后没有总览。
- 失败只用一条文字提示。

**Don't**

- 不另起配色，不加暗色主题。
- 不在卡片后透出总览或需求内容，也不做毛玻璃虚化的后台截图。
- 不加侧栏、顶栏、头像、通知、退出。
- 不把失败做成红色确认弹窗，不加「取消」。
- 不在门上写出密码或提示默认口令。
