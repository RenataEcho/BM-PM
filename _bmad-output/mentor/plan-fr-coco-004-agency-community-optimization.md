---
title: 'FR-CoCo-004 机构社群优化 Demo'
type: 'feature'
ticket: ''
created: '2026-11-09'
status: 'built'
baseline_revision: '1ce01e4597ab7b2e364316f0b3b3ef140883fa36'
route: 'oneshot'
route_source: 'auto'
risk: 'low'
review: 'quick'
review_source: 'auto'
lenses_ran:
  - 'quick-fidelity-review'
  - 'browser-acceptance'
review_loop_iteration: 0
context: []
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** 导师商务需要新增编号为 FR-CoCo-004 的“机构社群优化”可交互 Demo，现有仓库中尚无对应页面。

**Approach:** 将用户指定的本地独立 HTML 原样落入 `demo/iteration/`，严格保留其页面、样式、文案、数据与交互，不执行文档、登记、外壳接入或其他规范化改造。

</frozen-after-approval>

## Implementation Notes

采用 oneshot 路由，因为本次变更仅复制一个已完成的独立静态页面，且用户明确要求跳过其他规范化流程。目标文件为 `demo/iteration/fr-coco-004-opc-agency-detail-mentor-sheet-v2.html`；不得修改任何既有文件。

- 已将指定源 HTML 原样复制到目标路径。
- `cmp` 校验通过，源文件与仓库 Demo 字节级一致。
- 快速审查无发现；通过本地 HTTP 预览完成 6 项浏览器交互验收，结果全部通过。

## Plan Change Log

## Review Triage Log

## Verification

**Commands:**
- `cmp "/Users/maziluo/Desktop/视频教程/opc_agency_detail_mentor_sheet_v2.html" "demo/iteration/fr-coco-004-opc-agency-detail-mentor-sheet-v2.html"` -- expected: 两个文件字节级一致

**Manual checks:**
- 在浏览器打开目标文件，确认默认机构详情、社群详情、导师介绍底部弹层、返回与说明弹窗均可交互。
