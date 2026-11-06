---
title: FR-wen-004 嵌入预览重复导航修复
type: bugfix
created: 2026-11-06
status: done
route: oneshot
review_loop_iteration: 0
context: []
---

<frozen-after-approval>
## Intent

总览使用 embed=1 嵌入 FR-wen-004 时，Demo 自带导航与总览导航重复。沿用 FR-003 的嵌入模式，隐藏嵌入页自身的框架导航并释放其留白；直接打开 Demo 保持完整导航，业务内部导航及四个页签可用。仅改本需求并同步 mockups。
</frozen-after-approval>

## Implementation Notes

- HTML 在样式加载前按 `embed=1` 设置专用根 class，避免导航先出现再隐藏；CSS 仅隐藏 `body` 直接子级框架导航，嵌入时移除左边距与顶部导航留白。样式版本更新为 `20261106-nav1`，HTML/CSS 同步 mockups。
- 桌面嵌入页采用纵向 flex 分配四个业务视图的剩余高度，取消 PC 固定最小高度，避免矮窗口裁切；窄屏沿用原有滚动布局。
- Playwright + Edge 实测总览嵌入、直接打开两种入口，`fe/pc/admin/flow` 四页签，窗口 1440×1000、1440×650、1100×650、800×1000：嵌入页框架导航隐藏，外壳导航可见；独立页导航按既有响应式规则显示；页签和规则抽屉可用。桌面业务导航保留，桌面视图底部不超过可用高度，窄屏内容允许滚动，无 pageerror。
- 复跑登记验证通过：列表入口、需求导航、深链、四状态迁移及恢复、数量、空态、业务线隔离、刷新保存正常。
- 验证脚本、截图仅保存在会话产物，不入库。

## Review Triage Log

- medium → patch：独立审查指出固定高度在标题换行或矮窗口下可能裁切内容；改为 flex 分配剩余高度，并验证桌面短窗口及窄屏滚动。
- low → patch：独立审查指出实施记录缺少验证证据；已补齐入口、四页签、内部导航及多尺寸实测结果。无遗留项。
