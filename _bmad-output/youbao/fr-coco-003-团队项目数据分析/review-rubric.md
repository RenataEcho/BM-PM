# PRD Quality Review — 团队数据优化（FR-CoCo-003）复审

## Overall verdict
**有条件通过：可继续 UX 与静态 Demo，正式开发须遵守既有门禁。** 上轮关于日期口径、净额负数、归零项目/成员的关键歧义已被诚实登记为有 Owner、截止条件和影响项的正式开发阻塞；统计时点、排行语义、参考快照和 Open Questions 追踪已实质修复，不应要求代理越权代定产品口径。当前无 critical；唯一剩余 high 是目录虽已迁移，但 DESIGN、EXPERIENCE、SPEC、Demo 与登记仍沿用旧编号/旧名称，尚未形成单一的下游合同。

## Decision-readiness — adequate
PRD 已明确区分“可用于 UX/静态 Demo”与“正式开发绿灯”，并在 §9 把 P01、P02、P03、P05、P06 全部标成“正式开发前阻塞”。每项均有产品与口径负责人、精确到受影响 FR 的截止条件和影响项；§9 还要求决策完成后回填 FR Consequences 与 `.memlog.md`，不得只关闭状态。这是合格的开发门禁，不是需要文档代理擅自替产品决策的缺口。

上轮核心问题的处理状态如下：

- **日期口径：已诚实门禁。** P01 覆盖业务日期/结算日期、业务时区、日界线，P05 覆盖跨日退款、冲正与补发；二者均明确 Owner、截止条件和受影响项。
- **净额负数：已诚实门禁。** FR-8 已明确净额公式；P06 单列负净额、总净额非正及正负抵消为 0 时各页面的展示决策，并声明非负 Mock 不代表生产口径。
- **项目/成员归零：已诚实门禁。** P02、P03 分别追踪全部冲正后成员和项目是否计数/展示。
- **有效状态：已设技术合同门禁。** §5.1 明确沿用既有团队奖励系统的生效状态集合，不新创产品枚举，并要求正式开发前记录实际纳入/排除状态值。该事项是既有技术合同落盘，不应由本次 PRD 复审擅自改写状态口径。

### Findings
- 无 critical/high。

## Substance over theater — adequate
Vision、两条具名 UJ、FR 和 Counter-metrics 都直接服务“从团队下钻到项目与成员、并保持同账本可对账”的问题，不是模板家具。SM-C1/SM-C2 明确禁止通过隐藏零值或强行分摊差额美化结果，具有真实约束。

§5.3 仍有“明确且一致”“主流移动端”“可读、可操作”等非量化表述，适合作为 UX 原则，但不能单独承担验收边界；这不影响本轮重点统计口径的门禁完整性。

### Findings
- **medium** 移动端可用性边界仍偏定性（§5.3）— 未给出最低适配宽度、触控目标、长文本处理等可测阈值。*Fix:* 在 DESIGN/SPEC 迁移对账时补齐可验证的布局与交互边界。

## Strategic coherence — adequate
功能主线一致：入口回答“有哪些项目”，概览回答“奖励来自哪里”，项目详情和成员榜回答“谁带来奖励”，成员详情支持异常核对；FR-8/FR-9 用同一有效流水与调整流水保证各层级可对账。

上轮“成功指标不能验证产品 thesis”的 high 已修复。新增 SM-5 用至少 5 名目标参与者、4/5 独立完成、2/3 分钟任务时长验证项目比较和成员定位，并将样本、基线和目标确认交给产品在开发绿灯前完成。它仍是 A1 假设，但已经有 Owner 与截止条件，因此是诚实门禁而非遗漏。

### Findings
- 无 critical/high。

## Done-ness clarity — adequate
FR-1–FR-11 均有可验收 Consequences。统计时点已定义为同一次页面分析的数据截止时刻；§5.1 要求服务端返回统计时点，分页、加载更多和失败重试复用，主动刷新才更新，已解决上轮“分页期间结果漂移”的问题。

排行语义也已闭合：FR-6 规定名次始终按当前筛选结果的奖励金额降序计算，奖励升序或昵称排序只改变展示顺序；同额使用竞赛排名，并按用户 ID 稳定展示；搜索保留原始名次，分页不重算。多归属成员的标签展示规则也已明确。

负净额的产品展示仍未定，但 P06 已准确列出需裁决的页面与状态，并阻塞 FR-3、FR-6、FR-9 开发；这比在缺乏产品授权时强行选择口径更正确。有效状态值则由 §5.1 的技术合同门禁承接。

### Findings
- **medium** 有效状态技术门禁未进入统一追踪表（§5.1、§9）— §5.1 已明确正式开发前必须记录实际纳入/排除状态值，但 §9 没有对应追踪行，执行时可能遗漏。*Fix:* 不改变产品口径，仅在技术合同或门禁清单中补充负责人、产物链接与完成状态。

## Scope honesty — strong
PRD 明确区分生产要求与静态 Demo 边界，并说明 Demo 可使用非负示例数据，但不得据此推定生产负数口径。V1 不做订单/业务来源下钻已稳定放入 Non-Goals、Out of Scope 和 Future Considerations，不再作为本期 Open Question；上轮 P04 的边界冲突已消除。

§9 的开放产品决策密度与风险匹配，且正文没有宣称这些决策已经完成。保留明确 Owner 和截止条件的开放决策不会降低范围诚信；它只意味着正式开发尚未获绿灯。

### Findings
- 无 critical/high。

## Downstream usability — thin
PRD 内部追踪已显著改善：FR-1–FR-11、UJ-1–UJ-2 连续且唯一；SM 与 FR 有映射；P01/P02/P03/P05/P06 都有状态、Owner、截止条件和 affected IDs。A1 在 SM-5 与 Assumptions Index 间可往返。

参考路径问题已解决。PRD 与 addendum 都指向仓库内相对路径 `references/project_data_brand_orange_v3.html`，并记录 SHA-256；本次复核实际文件存在，哈希与文档值 `9df45c002fdbc007b29b832b8a19b5a0d2fa5b9d7b3fa07e52e70c93d217e3f1` 一致。本机 Desktop 路径只保留为来源记录，下游验收不再依赖个人电脑文件。

目录本身已迁移到 `fr-coco-003-团队数据优化/`，但资产迁移尚未完成：同目录 DESIGN、EXPERIENCE、SPEC 仍以 `FR-COCO-03 / 项目分析数据` 为标题或合同名，两个 reconcile 文档仍引用不存在的旧目录；mockup、正式 Demo、总览登记仍使用 `fr-coco-03`，根 README 尚无新编号登记。addendum §3 已诚实承认这些是待对账草稿，但在实际迁移完成前，下游仍会读到冲突合同。

### Findings
- **high** 目录已迁移但下游资产与登记未统一（addendum §3）— DESIGN、EXPERIENCE、SPEC、reconcile 链接、mockup/Demo 文件名、总览登记和 README 仍存在旧编号或旧名称；其中旧 DESIGN/EXPERIENCE/SPEC 还包含与新版 PRD 不完全一致的规则，不能作为已完成合同使用。*Fix:* 按 addendum §3 完成全套资产对账与重命名，统一 `FR-CoCo-003 / 团队数据优化`、相对链接、总览登记和深链，再全仓检索确认旧值只保留在明确的历史迁移说明中。

## Shape fit — strong
这是棕地移动端分析增量，既受既有奖励账本与权限约束，又包含项目首页—项目详情—成员详情的多步体验。两条具名 UJ 足以承载关键上下文，没有 Persona 膨胀；FR、Cross-Cutting Requirements、Non-Goals、Success Metrics 和开发门禁的组合适合继续流向 UX、研发与测试。

### Findings
- 无。

## Mechanical notes
- **ID continuity：** FR-1–FR-11、UJ-1–UJ-2 连续唯一；SM-1–SM-5 与 SM-C1/SM-C2 清晰。Open Questions 缺 P04 是历史事项移入 Future Considerations 后保留编号，不构成引用错误。
- **Cross-reference continuity：** P01/P02/P03/P05/P06 均有影响项；A1 可从 SM-5 往返 Assumptions Index。§5.1 的有效状态技术门禁尚未进入统一追踪表。
- **Glossary：** “统计时点”“调整流水”“未分配或待归因调整金额”“竞赛排名”均已补充；排行与多归属展示已有正文定义。
- **Assumptions Index roundtrip：** `[ASSUMPTION A1]` 在 §8 与 §10 一一对应，含 Owner 与开发绿灯前截止条件。
- **UJ protagonist naming：** UJ-1、UJ-2 均由“小林”承载上下文。
- **Reference integrity：** 仓库内参考快照存在，SHA-256 与 PRD/addendum 一致；个人绝对路径不再是共享验收的唯一来源。
- **Migration integrity：** 新目录已存在，旧资产标识与登记尚未收口，是本次唯一 high。
