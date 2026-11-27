---
title: '合伙人搜索归因 UI'
type: 'feature'
ticket: ''
created: '2026-11-27'
status: 'built'
baseline_revision: '4101857e1416b3ed3a9bc34d29952358f3c07e5d'
route: 'full'
route_source: 'auto'
risk: 'medium'
review: 'quick'
review_source: 'pinned'
lenses_ran: ['quick']
review_loop_iteration: 0
context:
  - '{project-root}/docs/ITERATION-FR-GUIDE.md'
  - '{project-root}/docs/需求输出规范.md'
  - '{project-root}/_bmad-output/youbao/_inbox/合伙人搜索归因.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** 右豹主业务要一条「合伙人搜索归因」的可点预览。现在只有收件，总览里看不到。

**Approach:** 用桌面上的 `youbao_partner_demo_v6 (1).html` 作为手机画面，原样放进新建迭代页。外壳沿用 FR-CoCo-007 的场景 tab、左规则表、右 Demo。只做前端交互。状态登记为待开始。

**Decision:** 全局编号是 FR-CoCo-008。文件、页头和总览都用这个号。

## Boundaries & Constraints

**Always:** 需求名用「合伙人搜索归因」。业务线是右豹主业务，`data-line` 为 `youbao`。手机画面按给定 Demo 的搜索、主页、编辑和其中的弹层来。外壳 class 从 `demo/iteration/fr-coco-007-wallet-merge.html` 和 `fr-003-fusion-task.css` 来。规则表能看、能编辑、能保存。C 端画面宽约 390px。没在 Demo 里出现的业务口径写 `[待确认]`。

**Never:** 不改已有 FR 页面，不改给定 Demo 源文件。不写 PRD、DESIGN、EXPERIENCE、SPEC。不接接口、登录、权限和持久化。不另做管理后台和业务流程图。不把画面改成另一套视觉。不把「归因」补成 Demo 里没有的统计或结算。

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| 搜索有结果 | 关键词能命中示例合伙人或项目 | 按全部 / 合伙人 / 项目切换结果 | 无 |
| 搜索无结果 | 关键词无命中 | 显示「暂无相关搜索结果」 | 无提交 |
| 打开主页 | 从结果进入一位合伙人 | 看到简介、案例、资料、联系 | 无 |
| 编辑缺必填 | 别名为空，或案例 / 资料不完整 | 不保存 | 沿用 Demo 的提示 |
| 退出未保存 | 编辑器有未保存修改 | 确认后才离开 | 取消则留在编辑器 |
| 联系方式空 | 主页没有微信号和二维码 | 联系弹层说明尚未配置 | 不展示空二维码当已配置 |

</frozen-after-approval>

## Code Map

- `demo/iteration/fr-coco-007-wallet-merge.html` — 新建页复制它的页头、场景 tab、左表、全屏预览和需求规则抽屉。只留「前端交互」。
- `demo/iteration/fr-003-fusion-task.css` — 外壳样式，不要新写一套。
- `demo/iteration/framework-shell.html` — 待开始列表加一行。已有行不动。深链写法见 `data-id`、`data-line="youbao"`、`data-demo`。
- `demo/iteration/sidebar-nav.js` — 右豹主业务已在 `LINES` 里。不要改菜单结构。
- `README.md` — 「迭代需求」表加一行，业务线写右豹主业务。
- `/Users/maziluo/Desktop/视频教程/youbao_partner_demo_v6 (1).html` — 手机画面来源。搜索、主页、编辑、分享、联系、删除确认都在这一份里。
- `_bmad-output/youbao/_inbox/合伙人搜索归因.md` — 收件。占号后改名为需求目录里的 `需求单.md`，收件箱不再留这份。

## Tasks & Acceptance

**Execution:**

- [ ] `_bmad-output/youbao/fr-coco-008-合伙人搜索归因/需求单.md` — 占号 FR-CoCo-008，从收件挪过来。编号写入需求单。不写 prd。
- [ ] `demo/iteration/fr-coco-008-partner-phone.html` — 放入给定 Demo 的手机画面，支持 `embed=1` 和场景参数：搜索、主页、编辑。
- [ ] `demo/iteration/fr-coco-008-partner-search.html` — 新建外壳。页头 `FR-CoCo-008 · 合伙人搜索归因 · v1 当前`。场景为搜索、合伙人主页、编辑主页。左表记 Demo 里已有的行为，没有的写 `[待确认]`。手机 iframe 宽 390px。
- [ ] `_bmad-output/youbao/fr-coco-008-合伙人搜索归因/frontend-rules.json` — 规则表保存到这里。
- [ ] `README.md` 与 `demo/iteration/framework-shell.html` — 各加一行，状态待开始，`data-line="youbao"`。

**Acceptance Criteria:**

- Given 总览切到右豹主业务，when 从待开始打开这条，then 页头是 FR-CoCo-008、合伙人搜索归因和 v1 当前。
- Given 前端交互，when 切换搜索、主页、编辑，then 左表和右侧手机一起换，手机仍约 390px。
- Given 手机里的搜索、主页、编辑、联系和未保存退出，when 按 Demo 操作，then 结果与给定 Demo 一致。
- Given 需求规则抽屉，when 打开，then 只写整条需求，不把场景表再抄一遍。全屏预览可进可退。

## Implementation Notes

- 2026-11-27：手机画面按给定 Demo 放入 `demo/iteration/fr-coco-008-partner-phone.html`，外壳用 postMessage 切搜索、主页、编辑。iframe 的 `src` 保持首次地址，画面由消息切换。
- 六条矩阵在 `http://127.0.0.1:19889/fr-coco-008-partner-phone.html?embed=1&screen=search` 上执行并通过：搜索命中、项目页签无结果、无命中、打开主页、空联系方式、缺必填不保存、未保存退出先取消再确认。
- 总览深链 `#youbao/fr-coco-008` 打开 `fr-coco-008-partner-search.html?embed=1&tab=fe`。需求规则抽屉和全屏预览可进可退。
- 当前 19889 进程若是改路由之前启动的，页内保存会提示改用 `python3 scripts/preview_server.py`。路由已写在 `scripts/preview_server.py`。
- 2026-11-27 评审后：嵌入编辑且弹层打开时，主页容器改为盖住画面，删除确认和上传失败可以看见。关掉弹层后主页容器重新隐藏。同一份手机页复制到需求目录 `mockups/fr-coco-008-partner-phone.html`。

## Plan Change Log

## Review Triage Log

- 2026-11-27 quick：4 条。high 0，medium 1，low 1，false 1，另 1 条 low 因意图排除而不进入修改。
- `medium` / patch — `demo/iteration/fr-coco-008-partner-phone.html` 的 `#modal` 在主页 `.device` 内。嵌入编辑时 `.profilewrap` 是 `display:none`，删除确认和上传失败加了 `open` 也画不出来。再回主页时这层还盖在上面。
- `low` / 不改 — `fr-coco-008-partner-search.html` 只从外壳向手机发场景。手机里点进主页、保存、返回不会改左侧规则表。冻结意图要求外壳沿用 FR-CoCo-007，该页同样只 `postMessage` 到手机。验收里的「切换搜索、主页、编辑」是外壳场景 tab，这条路径会同时换表和手机。
- `false` — 评审 diff 里的 `.memlog.md` 和 `scripts/__pycache__/preview_server.cpython-311.pyc` 不是这次实现写入的。它们在实现前就是未跟踪的本地日志和缓存，交付清单里没有。
- `low` / patch — `_bmad-output/youbao/fr-coco-008-合伙人搜索归因/` 没有 `mockups/`。`docs/ITERATION-FR-GUIDE.md` 第 47 条要求这里放一份和 iframe 相同的手机画面。缺了之后，看需求目录的人会对不上页内 Demo。

## Design Notes

手机画面保持给定 Demo 的结构和配色。迭代外壳仍用现有页头、tab 和规则表，不把 Demo 的配色铺到外壳上。场景只切三块主界面；分享、联系、删除确认留在手机画面内部。

## Verification

**Commands:**

- `python3 -m http.server 19889 --directory demo/iteration` — 页面可从 `http://127.0.0.1:19889/framework-shell.html?tab=fe#youbao/fr-coco-008` 打开。

**Manual checks (if no CLI):**

- 搜索无结果、编辑缺必填、未保存退出、空联系方式，都在手机画面里点一遍。
