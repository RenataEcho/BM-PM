---
title: FR-003 代发上融合任务静态交互 Demo
type: feature
created: 2026-10-22
status: done
route: oneshot
---

<frozen-after-approval reason="用户已明确授权按现有PRD与UX制作可逆静态Demo">

## Intent

为 FR-003「代发上融合任务」新增独立三页签 Demo，沿用现有界面布局和组件，呈现剪辑手上传、创作者报名领取回填、运营查看以及业务流程。以本目录 DESIGN、EXPERIENCE、SPEC 和需求单为业务与体验合同，参考截图仅用于现有界面形态。

新增入口 `demo/iteration/fr-003-fusion-task.html`，配套同前缀 CSS/JS、PC 与手机独立嵌入文件；Mockup 副本写入本目录 mockups。仅 README 增加 FR-003 预览链接；遵照用户「已有页面不要改」，不修改总览及其他 HTML。规则保留待确认边界，不据此新增产品能力。不连接真实接口、登录、权限或持久化。

</frozen-after-approval>

## Implementation Notes

- 当前 product-wen 分支；基线 d4d14001f9f8d6963767b4c462d29597b95c1515。未跟踪目录是本次对话已授权生成的 FR-003 文档，继续原目录，保留全部来源文档。
- 本次是单一可逆静态原型，无外部发布或数据变更；业务未定项按用户要求直接标待确认。复用组件页原始 CSS class，不改变其文件。
- 验证深链、postMessage 切屏、双校验阻断、账号锁定、关键词数量、浮层/键盘焦点、SVG 回环和 Mockup 副本一致性。


## Review Triage Log

本次采用 Blind Hunter；静态 Demo 未接真实服务，跳过独立接口与端到端测试审查层。审查规模约119.19kB，N=10。全部问题已核对来源代码，均采用简单修复，无延期项。

1. medium / patch：新领取复用 filled，确有可达路径；newClaim 重置回填状态。
2. medium / patch：浏览覆盖领取标题与项目；领取信息独立快照，后续回填使用快照。
3. medium / patch：新增账号报名禁用旧合格账号；保留已合格资格，新账号单独待审示意。
4. medium / patch：官方信息复用手填字段；按领取记录独立保存官方 Mock 对象，缺失显示 -。
5. low / patch：明细视频按钮只有 Toast；改为当前弹窗中的对应视频静态预览占位，明确实际内容待确认。
6. medium / patch：已超时筛选误标已回填记录；超时状态属于领取快照，筛选不改变业务状态。
7. medium / patch：PC关闭浮层仍可键盘聚焦；关闭态增加 visibility:hidden，打开恢复。
8. low / patch：选择文件入口键盘不可达；改用真实按钮触发文件选择。
9. low / patch：PC实际导航未同步外层场景；render发送同源消息，外层更新选中态、aria及说明。
10. medium / patch：流程缺上传关键词校验；补充账号运营判断、关键词关联、至少一个关键词校验与返回起点回路。

## Verification

- 三份 JS 均通过 node --check；git diff --check 通过。
- 浏览器实测：PC匹配前阻断、匹配后使用示例成片、确认上传进入待审核；手机账号不一致和视频ID不一致分别阻断并保留输入，正确样例完成有效分账绑定。
- 浏览器实测：已回填记录在已回填筛选可见，已超时筛选为空；PC内部导航同步外层场景。
- 浏览器实测：回填明细两条逐条分组，第二条官方信息为 -；视频静态预览占位可打开；详情抽屉、删除取消、需求规则默认后台及Esc关闭正常。
- 三页签深链切换、SVG固定画布横纵滚动与首屏完整手机已检查；浏览器无 console error。
- 两端6份Mockup副本已逐个比较 SHA256 一致；不调用API、不持久化。
- README登记右豹主业务FR-003；按用户明确要求没有修改总览或任何已有HTML页面。
