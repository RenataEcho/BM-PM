---
title: 'FR-CoCo-005 团长数据优化'
type: 'feature'
ticket: ''
created: '2026-11-13'
status: 'built'
baseline_revision: '5d1aa5c656faf320c9e65fd9bbbbefe1fa36f88f'
route: 'full'
route_source: 'auto'
risk: 'medium'
review: ''
review_source: ''
lenses_ran: []
review_loop_iteration: 0
context:
  - '{project-root}/docs/需求输出规范.md'
  - '{project-root}/docs/ITERATION-FR-GUIDE.md'
  - '{project-root}/团队数据需求1.0.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** 右豹主业务还没有「团长数据优化」这条增量。团长在数据页上看不到拆开的服务带动入口，成员列表也没有约定的四项统计，奖励详情没有常规/服务带动筛选、项目分析和规则说明。

**Approach:** 占号 FR-CoCo-005。手机画面按用户给出的 `OPC_team_demo_v8_28.html` 原样放进新的迭代页。需求口径以 `团队数据需求1.0.md` 为准，写进需求单、PRD、DESIGN.md 和 EXPERIENCE.md。不改 FR-CoCo-003 或其他已有页面。

## Boundaries & Constraints

**Always:** 业务线是右豹主业务。需求名用「团长数据优化」。新页面放 `demo/iteration/fr-coco-005-tuanzhang-data.html`，手机内容放 `demo/iteration/fr-coco-005-phone.html`。迭代外壳沿用现有样式。手机内部保持来源 Demo 的画面和交互。文档用中文。示例数据，不接真实接口。

**Never:** 不改 FR-CoCo-001 到 004 的页面和文档。不把这条需求写进 `initiative-c-end-icons` 或 `planning-artifacts`。不重做配色去覆盖来源 Demo。不实现真实社群详情页。不做可点的管理后台原型。

</frozen-after-approval>

## Code Map

- `demo/iteration/fr-coco-03-project-data.html` -- 外壳结构可复用：页头、页签、场景条、手机 iframe、需求规则抽屉、全屏预览、业务流程 SVG。不要改这个文件。
- `demo/iteration/fr-003-fusion-task.css` -- 外壳 class 来源。只引用，不改。
- `demo/iteration/framework-shell.html` -- 进行中列表加一行，`data-line="youbao"`，`data-id="fr-coco-005"`。
- `README.md` -- 「迭代需求」表加一行。
- `团队数据需求1.0.md` -- 行为口径。不要改。
- `demo/iteration/fr-coco-005-phone.html` -- 来源 Demo 的副本，只追加父页面切屏消息。

## Tasks & Acceptance

**Execution:**
- [x] `_bmad-output/youbao/fr-coco-005-团长数据优化/需求单.md` -- 记下业务线、入口和规则 -- 占号后不再留在 inbox
- [x] `_bmad-output/youbao/fr-coco-005-团长数据优化/prd.md` -- 写本增量范围和可验收结果 -- 和 Demo、规则对齐
- [x] `_bmad-output/youbao/fr-coco-005-团长数据优化/DESIGN.md` -- 记录手机画面视觉，外壳沿用迭代台 -- 冲突时以本文约束 Demo 外壳，手机内容以来源 Demo 为准
- [x] `_bmad-output/youbao/fr-coco-005-团长数据优化/EXPERIENCE.md` -- 记录页面、状态和北城的操作路径 -- 覆盖规则文档里的四个页面
- [x] `demo/iteration/fr-coco-005-phone.html` -- 放来源 Demo，并接收父页面切屏 -- 场景按钮能打开对应画面
- [x] `demo/iteration/fr-coco-005-tuanzhang-data.html` -- 新建迭代页 -- 页头、规则抽屉、全屏预览、业务流程
- [x] `README.md` 与 `demo/iteration/framework-shell.html` -- 登记 FR-CoCo-005 -- 右豹主业务进行中能点开

**Acceptance Criteria:**
- Given 总览切到右豹主业务，when 点开 FR-CoCo-005，then 页头是「FR-CoCo-005 · 团长数据优化 · v1 当前」，手机里是来源 Demo 的数据首页。
- Given 数据首页，when 查看奖励区和成员区，then 各有一个服务带动入口，分别进入服务带动相关列表。
- Given 团队成员列表，when 看一名成员，then 能看到 TA的团队人数、团队总流水、TA的个人流水、TA贡献的团队奖励。
- Given 服务带动成员列表，when 看一名被服务带动的成员，then 能看到服务承接社群和服务带动奖励。
- Given 成员奖励详情，when 切换奖励类型，then 可以按全部、常规团队奖励、服务带动奖励筛选，并能打开项目分析和规则说明。
- Given 页头，when 打开需求规则和全屏预览，then 规则只写本需求，全屏能从右上角退出。

## Implementation Notes

- 来源 Demo 初始化时查询 `.flow-summary .amount`，页面上没有这个节点，脚本在这里中断，服务带动合计和列表不会画出来。已改为更新实际的流水、成员数和团队奖励节点，后面的列表初始化得以继续。
- 已在浏览器核对：数据首页两个服务带动入口、团队成员四项、服务带动社群和奖励、棠宁的奖励详情筛选、项目分析标签、规则说明、业务流程页签、需求规则抽屉和全屏退出。

## Plan Change Log

## Review Triage Log

## Design Notes

手机内容不重绘。外壳复用 `fr-coco-03-project-data.html` 的页签、抽屉和全屏，iframe 宽度用源 Demo 标明的 414px。成员奖励详情场景用示例成员棠宁 `3930131`。社群点击保持源 Demo 的说明浮层。

## Verification

**Manual checks (if no CLI):**
- 用 `python3 -m http.server 19889 --directory demo/iteration` 打开 `fr-coco-005-tuanzhang-data.html?tab=fe` 和 `?tab=flow`。
- 点完场景条、服务带动入口、成员卡、奖励筛选、项目分析、规则说明、需求规则抽屉和全屏预览。
