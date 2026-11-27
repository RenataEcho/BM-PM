---
name: 右豹快捷图标
description: C 端金刚区四个填色快捷图标。配色与底板继承移动端设计规范，本文件只记这一组图标。
status: draft
updated: 2026-10-22
sources:
  - docs/design/移动端设计规范.md
  - docs/design/c-end/DESIGN.md
colors:
  brand-orange: '#ff4d22'
  brand-orange-hover: '#ff6c46'
  icon-ink-top: '#ff7a52'
  text-primary: '#252836'
  surface-page: '#f6f7fb'
  surface-card: '#ffffff'
typography:
  shortcut-label:
    fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", Arial, sans-serif'
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.2
rounded:
  icon: 14px
  card: 16px
spacing:
  icon: 44px
  label-gap: 6px
components:
  shortcut-icon:
    size: '{spacing.icon}'
    radius: '{rounded.icon}'
    ink: '{colors.brand-orange}'
    inkTop: '{colors.icon-ink-top}'
    labelColor: '{colors.text-primary}'
    label: '{typography.shortcut-label}'
---

# DESIGN · 快捷图标

本文件只覆盖首页金刚区这一组四个图标。其余 C 端 token 以 `docs/design/移动端设计规范.md` 为准。和本文件冲突时，以本文件里写明的图标为准。

## Brand & Style

四个入口共用一张白卡片里的方圆图标。底板是暖色毛玻璃，符号是品牌橙渐变的填色图形，压在玻璃之上。标题四个字是识别主体，图标负责在一扫之间分开「新手 / 项目 / 推文 / 海外」。

## Colors

- **brand-orange** — 符号渐变的落点。不换成蓝或绿。
- **icon-ink-top** — 符号渐变的高光端，比 `{colors.brand-orange}` 略浅，仍在橙系里。
- **surface-page / surface-card** — 页底与承载四个入口的那一张白卡片。

## Typography

标题用 `{typography.shortcut-label}`，色 `{colors.text-primary}`。四个字必须完整露出，不缩成两字，不换行。

## Layout & Spacing

四个入口在同一张白卡片里四列等分。每列上图标、下标题。图标 `{components.shortcut-icon.size}`，与标题间距 `{spacing.label-gap}`。

从左到右：新手必看、项目教学、推文教程、海外课程。

## Elevation & Depth

卡片是白底轻阴影，四个图标不再各自做浮层。图标底板：半透明白、顶部高光、底边暖橙内阴影、右下角一团被磨砂压住的橙色光。

## Shapes

图标是方圆 `{rounded.icon}`，不是正圆。符号用整块填色，轮廓要在 44px 里还能分开。

## Components

### 快捷图标

| 标题 | 符号 | 读法 |
|---|---|---|
| 新手必看 | 芽苗，带一只小花盆 | 从零开始 |
| 项目教学 | 文件夹，中间挖一个播放三角 | 看项目怎么做 |
| 推文教程 | 对话气泡，里面两行字 | 学写推文 |
| 海外课程 | 圆地球，经线与赤道是挖空 | 海外内容 |

符号渐变自上而下 `{colors.icon-ink-top}` → `{colors.brand-orange}`。播放三角、气泡里的字行、地球经纬，都是挖空，露出玻璃，不是另画一根细线。

对照稿：`.working/shortcut-icons.html`。定稿前符号以稿上为准；和本表冲突时，先改表再改稿。

## Do's and Don'ts

- **Do** 四字标题完整露出。
- **Do** 四个符号用同一套底板和同一套橙渐变。
- **Don't** 做成正圆细线图标。
- **Don't** 给这一组另起蓝色或绿色。
- **Don't** 每个入口单独一张浮层卡片。
