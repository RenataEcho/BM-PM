---
name: BM-PM Admin
description: B 端管理后台视觉系统。完整继承右豹 admin-ui-spec v1.1（玻璃拟态 · 简约大气 · Light/Dark），本文件只收录外观契约，不另起品牌层。
status: draft
updated: 2026-10-15
sources:
  - imports/admin-ui-spec.md
colors:
  primary: '#2563eb'
  primary-hover: '#1d4ed8'
  primary-active: '#1e40af'
  primary-light: '#eff6ff'
  primary-border: '#bfdbfe'
  primary-foreground: '#ffffff'
  success: '#16a34a'
  success-bg: '#f0fdf4'
  success-border: '#bbf7d0'
  warning: '#d97706'
  warning-bg: '#fffbeb'
  warning-border: '#fde68a'
  danger: '#dc2626'
  danger-bg: '#fef2f2'
  danger-border: '#fca5a5'
  info: '#0891b2'
  info-bg: '#ecfeff'
  info-border: '#a5f3fc'
  bg: '#f0f4f8'
  surface: '#ffffff'
  surface-hover: '#f8fafc'
  border: '#e8edf3'
  border-hover: '#c8d5e2'
  text-primary: '#18222f'
  text-secondary: '#4a5568'
  text-muted: '#9aa5b4'
  text-disabled: '#c8d5e2'
  nav-accent: '#4f46e5'
  tag-blue-bg: '#eff6ff'
  tag-blue-fg: '#2563eb'
  tag-green-bg: '#f0fdf4'
  tag-green-fg: '#16a34a'
  tag-amber-bg: '#fffbeb'
  tag-amber-fg: '#92400e'
  tag-purple-bg: '#faf5ff'
  tag-purple-fg: '#7c3aed'
  tag-gray-bg: '#f1f5f9'
  tag-gray-fg: '#64748b'
  badge-default: '#64748b'
  export-header: '#dbeafe'
  bg-dark: '#0f172a'
  surface-dark: '#1e293b'
  surface-hover-dark: '#273348'
  border-dark: '#334155'
  border-hover-dark: '#475569'
  text-primary-dark: '#f1f5f9'
  text-secondary-dark: '#94a3b8'
  text-muted-dark: '#475569'
  text-disabled-dark: '#334155'
  info-fg-dark: '#22d3ee'
typography:
  font-sans:
    fontFamily: "'PingFang SC', 'Microsoft YaHei', 'Segoe UI', -apple-system, sans-serif"
  font-mono:
    fontFamily: "'SFMono-Regular', 'Consolas', 'Monaco', monospace"
  h1:
    fontFamily: "'PingFang SC', 'Microsoft YaHei', 'Segoe UI', -apple-system, sans-serif"
    fontSize: 19px
    fontWeight: '700'
    lineHeight: '1.3'
  h2:
    fontSize: 15px
    fontWeight: '600'
    lineHeight: '1.4'
  h2-sm:
    fontSize: 13.5px
    fontWeight: '600'
    lineHeight: '1.4'
  h3:
    fontSize: 13px
    fontWeight: '600'
    lineHeight: '1.5'
  body:
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.6'
  caption:
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.5'
  label:
    fontSize: 11px
    fontWeight: '600'
    lineHeight: '1'
  micro:
    fontSize: 10px
    fontWeight: '400'
    lineHeight: '1.4'
  error-code:
    fontSize: 64px
    fontWeight: '700'
  error-title:
    fontSize: 24px
    fontWeight: '700'
rounded:
  xs: 4px
  sm: 7px
  DEFAULT: 10px
  lg: 14px
  xl: 20px
  full: 9999px
spacing:
  '1': 4px
  '2': 8px
  '3': 12px
  '4': 16px
  '5': 20px
  gutter: 12px
  page-header-bottom: 16px
  filter-card-bottom: 14px
  breadcrumb-padding: 10px 20px 0
  content-max: 1680px
  topnav-h: 54px
  sidebar-w: 220px
  sidebar-collapsed: 56px
components:
  glass-card:
    background: 'rgba(255, 255, 255, 0.72)'
    blur: 16px
    radius: '{rounded.lg}'
    border: '1px solid rgba(255, 255, 255, 0.55)'
  glass-card-dark:
    background: 'rgba(30, 41, 59, 0.65)'
    blur: 16px
    border: '1px solid rgba(255, 255, 255, 0.08)'
  button-primary:
    background: '{colors.primary}'
    foreground: '{colors.primary-foreground}'
    height: 34px
    radius: '{rounded.sm}'
  button-sm:
    height: 30px
  button-lg:
    height: 38px
  input:
    height: 34px
    radius: '{rounded.sm}'
    border: '{colors.border}'
  input-sm:
    height: 30px
    radius: 6px
    fontSize: 12px
  badge:
    radius: '{rounded.xs}'
    fontSize: 11px
  action-btn:
    size: 28px
    radius: 6px
  topnav:
    height: '{spacing.topnav-h}'
    z-index: 300
  sidebar:
    width: '{spacing.sidebar-w}'
    z-index: 200
  toast:
    top: 66px
    right: 22px
    z-index: 9998
---

## Brand & Style

BM-PM 管理后台的视觉身份 **完整继承** 右豹 `admin-ui-spec` v1.1（同步自 UIUX.md，2026-04-29）。姿态是：**简约大气的玻璃拟态科技风**，面向 B 端桌面管理系统，强制支持 Light / Dark。

这不是 shadcn 增量皮肤，而是一套自有内部设计系统。实现时每个页面 `:root` 必须声明规范中的全量 CSS 变量（含 `--bg`、`--shadow-xl`、`--sidebar-w`），禁止遗漏；`[data-theme="dark"]` 必须覆盖中性色、阴影与导航变量。

玻璃用在 **卡片与壳层**（stat / filter / table / drawer / modal，以及 TopNav、Sidebar 的轻度磨砂）。**按钮、输入框、下拉框不用玻璃**——可操作控件保持实底、清晰。装饰光晕可选：固定位置 2–3 个径向渐变球，`pointer-events: none`。

源文件：`imports/admin-ui-spec.md`。可点击构图：`mockups/ux-demo.html`。本 spine 与源或 mock 冲突时以本文件为准；未写入的像素级细则仍以源为准。行为、流程、权限见 `EXPERIENCE.md`。

## Colors

品牌主色是 **Blue 600 `{colors.primary}`**（`#2563eb`）。用于主按钮、侧栏选中、表格行左强调条、链接与焦点环。Hover `{colors.primary-hover}`，Active `{colors.primary-active}`。浅底 `{colors.primary-light}` 只给选中浅底、编辑操作 hover，不当大面积页面底。

语义色四套，成对使用（色 / 浅底 / 边）：

- 成功 `{colors.success}` — 查看操作、正常状态
- 警告 `{colors.warning}` — 待处理、禁用操作
- 危险 `{colors.danger}` — 删除、不可逆
- 信息 `{colors.info}` — 处理中、复制操作

中性色：页面底 `{colors.bg}`（`#f0f4f8`，禁止当成纯白），实面 `{colors.surface}`，边框 `{colors.border}`。正文 `{colors.text-primary}`，次要 `{colors.text-secondary}`，说明 `{colors.text-muted}`，禁用 `{colors.text-disabled}`。

Dark 使用平行 token（`*-dark`）：底 `{colors.bg-dark}`、面 `{colors.surface-dark}`。主题写在 `html[data-theme]`，初始化脚本必须内联在 `<head>`、所有 CSS 之前，避免刷新闪白。渐变壳层：Light 用蓝紫到冰蓝；Dark 用 `#0f172a` → `#1e1b4b` → `#0c1a2e`。

Tag 五色（`tag-blue|green|amber|purple|gray`）与 Badge 语义类（`badge-success|warning|danger|info|default`）分开。**禁止 `.badge-primary`**。Dark 下 Tag 用 `rgba(色, 0.18)` 底 + 浅字；`.badge-info` 必须单独写 Dark：底 `rgba(8,145,178,0.18)`、字 `{colors.info-fg-dark}`。

Excel 表头背景固定 `{colors.export-header}`。

避免：另起品牌色、把 `{colors.primary}` 当大面积底、操作按钮统一浅灰、漏声明 `--bg`。

## Typography

中文优先栈 `{typography.font-sans.fontFamily}`。编码、ID、短码用 `{typography.font-mono.fontFamily}`。

| 角色 | Token | 用途 |
|---|---|---|
| 页标题 | `{typography.h1}` 19px / 700 | Page Header `h1` |
| 卡片标题 | `{typography.h2}` 15px / 600（紧凑 13.5px） | 区块标题 |
| 分组标题 | `{typography.h3}` 13px / 600 | 表单分组 |
| 正文 | `{typography.body}` 13px / 400 / 1.6 | 表值、表格 |
| 说明 | `{typography.caption}` 12px | 页描述、提示、面包屑 |
| 标记 | `{typography.label}` 11px / 600 | Badge、Tag、角标 |
| 微字 | `{typography.micro}` 10px | 版权、次要时间戳 |

错误页状态码 `{typography.error-code}` 64px / 700，颜色用 `{colors.primary-light}`，标题 24px。空态主文案 14px / 600。一级 Tab 13px / 500；二级导航 13px / 500（选中 600）；三级 12.5px。表头 12px / 600，`letter-spacing: 0.5px`，色 `{colors.text-secondary}`。

## Layout & Spacing

桌面优先，标准壳：

- TopNav 固定 `{spacing.topnav-h}`（54px），`z-index: 300`，通栏
- Sidebar 固定，`top: 54px`，展开 `{spacing.sidebar-w}`（默认 220px，全站同一 CSS 变量，禁止页间漂移），折叠约 52–56px，`z-index: 200`
- 主列：面包屑 `{spacing.breadcrumb-padding}` → Page Header（`margin-bottom` **必须** `{spacing.page-header-bottom}` 16px，禁止 20px）→ Filter Card（下边距 14px）→ Table Card（表头/批量栏 + 表体 + 分页）
- `xl`（≥1280px）内容区 `max-width: {spacing.content-max}`（1680px）

筛选网格 **强制 `repeat(4, 1fr)` + gap 12px**，禁止 flex 或改列数。筛选控件一律 `.form-input-sm`（高 30px），禁止写死像素宽。日期范围是两个相邻字段，不合并成一个控件外观。

断点（外观降级）：`xs` <640 隐侧栏、表横滚、弹窗近全屏；`sm` 640–768 侧栏图标态；`md` 768–1024 表单 2 列；`lg` 1024–1280 抽屉默认 520px；`xl` 宽屏。抽屉列数随自身宽度：≥700 → 3 列，≥500 → 2 列，否则 1 列。

Modal 宽度档：sm 420 / md 520 / lg 640。Drawer 默认 520，可拖 380–90vw。

## Elevation & Depth

玻璃本身就是主层次：卡片 `{components.glass-card}` 外影 `0 8px 32px rgba(30,40,80,0.10)` + 内高光；Dark 外影加深到 `rgba(0,0,0,0.4)`。实面阴影四级，页面必须声明 `--shadow-xl`：

- sm `0 1px 4px rgba(30,40,60,0.06)`
- DEFAULT `0 2px 10px rgba(30,40,60,0.08)`
- lg `0 8px 28px rgba(30,40,60,0.11)`
- xl `0 16px 48px rgba(30,40,60,0.14)`

Dark 对应 0.3 / 0.35 / 0.45 / 0.55 黑影。TopNav Light 影 `0 2px 16px rgba(99,102,241,0.10)`；Sidebar Light `2px 0 12px rgba(99,102,241,0.07)`。

表格行 hover / selected：淡蓝底 + **inset 左条 3px `{colors.primary}`**，不用大投影做层级。操作列 sticky 时左侧细影 `-2px 0 6px rgba(0,0,0,0.04)`。弹窗遮罩 `rgba(0,0,0,0.45)`。空态插图 **opacity 固定 0.25**（禁止 0.3）。

焦点环：输入 `0 0 0 3px rgba(37,99,235,0.10)`，边框改 `{colors.primary}`。

## Shapes

圆角偏软、偏工具：**卡片 / 玻璃面板 `{rounded.lg}` 14px**；默认控件 `{rounded.DEFAULT}` 10px；按钮与标准输入 `{rounded.sm}` 7px；Badge `{rounded.xs}` 4px；大容器 `{rounded.xl}` 20px。特例：筛选小输入圆角 **6px**（不是 7px）；分页钮、行内操作钮 6px；侧栏二级项 8px、三级 7px；Logo 30×30 为 8px；一级 Tab 下划线 2px 高、顶圆 2px。

胶囊 `{rounded.full}` 只给圆点（`.status-dot` 5px）等真圆形，不把按钮做成 pill。

## Components

未列出的控件仍按 `imports/admin-ui-spec.md` 的视觉细则。下列是实现时必须看齐的外观锚点。

**Glass card** — 所有内容卡片与浮层壳。Light `{components.glass-card}`；Dark `{components.glass-card-dark}`。TopNav / Sidebar 模糊 20px、饱和 180%，不用完整卡片玻璃配方。

**Button** — Primary 实底 `{colors.primary}` 白字；Default 面色 + `{colors.border}`；Danger 实底 `{colors.danger}`；Danger-Outline 白底 `{colors.danger}` 字 + `{colors.danger-border}`；Ghost 透明次要字。默认高 34px / 字 13px / `{rounded.sm}`；sm 30px / 12px；lg 38px / 14px。Hover 加深；active `translateY(1px)`；disabled `opacity: 0.45`。不用玻璃。

**Input / Select** — 实面、1px `{colors.border}`。标准高 34px；筛选 `.form-input-sm` 高 30px、字 12px、圆角 6px。Focus 见 Elevation。

**Badge / Tag / status-badge** — `width: fit-content; white-space: nowrap`，禁止在宽单元格里撑满。Badge 用语义类，不用 primary。可带 5px 状态圆点。

**Action buttons** — 28×28、圆角 6px、透明底。色：view `{colors.success}` · edit `{colors.primary}` · delete `{colors.danger}` · disable `{colors.warning}` · copy `{colors.info}` · more `{colors.text-secondary}`。Hover 用对应 `*-bg`。类名只能是 `action-btn view|edit|delete|disable|copy|more`（删除禁止 `del`）。禁止统一灰色图标。操作列 sticky 右、Dark 下背景跟 `{colors.surface-dark}`。

**Table** — `table-layout: fixed` + `<colgroup>`。表头 sticky、`{colors.surface-hover}`（Dark `rgba(39,51,72,0.8)`）。行高 48px，单元格 13px / padding 12px。截断 ellipsis。

**Pagination** — 钮高 **30px**、`min-width: 30px`、圆角 6px（禁止 28px）。内边距 14px 16px。

**Toast** — 容器 **`top: 66px; right: 22px`**（禁止 64/20），`z-index: 9998`。条 min 200 / max 340，左 3px 语义边，圆角 `{rounded.DEFAULT}`。

**Icons** — Lucide / Heroicons，SVG inline，`currentColor`。尺寸：TopNav 14 / 侧栏 15 / 按钮内 14 / 表格操作 15 / 输入前缀 14 / 状态 16 / 卡片标题 12 / 空态 60–64。图文 gap 5–6px。

**Motion（外观时长）** — 控件 0.16s ease；抽屉 0.28s；弹窗 0.22s；主题色 0.20s。页面必须带 `prefers-reduced-motion: reduce` 把动画/过渡压到近 0。

**Error pages** — 居中；插图 Light/Dark 各一套；状态码 `{typography.error-code}` + `{colors.primary-light}`。

**Filter Card** — 玻璃卡，内边距 `16px 18px`，下边距 `{spacing.filter-card-bottom}`。内网格 `repeat(4, 1fr)` + `{spacing.gutter}`。底栏顶部分割 `{colors.border}`。

**Bulk Action Bar** — 不占独立行；在 Table 卡头右侧与标题同行切换。选中态 0.2s 过渡。

**Breadcrumb** — `{typography.caption}`，区 `padding: {spacing.breadcrumb-padding}`，分隔符 `/`。

**Modal / Drawer** — 壳用 `{components.glass-card}`。Modal 宽 420 / 520 / 640；遮罩 `rgba(0,0,0,0.45)`。Drawer 默认 520px。Header/Footer 固定，Body 内滚。

**Empty state / Skeleton** — 空态 64px SVG `opacity: 0.25` + 14px/600 主文 + `{typography.caption}` 说明。骨架行高同 Table 数据行，灰色渐变闪烁 1.5s；不用全屏 Spinner。

## Do's and Don'ts

| Do | Don't |
|---|---|
| 继承右豹 token 与玻璃分工：卡片/壳层玻璃，控件实底 | 另起主色、圆角阶或「更现代」的扁平/新拟态 |
| `:root` 全量变量，且 `--bg`、`--shadow-xl`、`--sidebar-w` 全站一致 | 页面漏变量，或把 `--sidebar-w` 写成不同像素 |
| 筛选 `grid repeat(4, 1fr)`、`.form-input-sm` 30px | 筛选改 flex、改列数、输入写死宽度 |
| `action-btn delete`、`badge-info`，操作钮语义色 | `action-btn del`、`.badge-primary`、操作钮统一浅灰 |
| Toast `66px / 22px`；page-header 下边距 16px；空态 SVG 0.25；分页钮 30px | 写成 64/20、20px、0.3、28px |
| 主题脚本在 `<head>` 最先执行；Dark 覆盖中性色与 `.badge-info` | 刷新闪白；Dark 只改底不改字/边 |
| 表用 `<colgroup>` + 固定布局 | 完全交给浏览器自动列宽 |
| 打印隐藏壳层与操作，表黑边 | 打印仍带 TopNav/Sidebar/筛选 |
| 顶栏一级 Tab 仅为三条业务线：右豹主业务、导师商务、企业号 | 把工作台/需求/迭代等模块名做成顶栏 Tab |
