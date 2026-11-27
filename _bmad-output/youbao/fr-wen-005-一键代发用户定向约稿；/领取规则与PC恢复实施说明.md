---
title: FR-wen-005 领取规则对齐与PC供稿恢复
type: feature
created: 2026-11-27
status: done
route: dispatch
baseline_commit: 144b0d07ec86b68fa85f4fa08210243f6d62b050
context: []
---

<frozen-after-approval reason="用户已明确授权恢复UV并继续两项修改">

## Intent

右豹主业务 FR-wen-005 的约稿领取不得统一免费；按现有管理后台给剪辑手配置的收费方式扣次数或积分，不新增独立规则。PC剪辑供稿按GitHub原有白色客户端Demo恢复，替换当前深色3.0方案，参考用户截图中的左导航、招募Banner、四统计卡和收益/最近上传双栏。

## Boundaries & Constraints

保留用户此前修改：横向排序、右上下载按钮、弹窗标题仅书名、关键词聚合和领取不新增未回填。保留约稿审核/供稿/驳回重审及三端内存联动。只改FR-wen-005文件和其文档、副本；冻结基线及FR-003/004/006不可改。当前工作区有大量既有修改，必须保留，不提交、不推送、不重置。演示不接真实接口、持久化、付款或上传。

## I/O & Edge-Case Matrix

| 场景 | 输入 | 预期 |
|---|---|---|
| 有次数 | 本人待领取已通过稿 | 扣1次，积分不扣，结束申请且原领取记录不新增 |
| 自定义收费 | 无次数、积分足够 | 先确认配置积分价格，确认后扣积分；取消不扣 |
| 平台计费 | 无次数 | 沿用次数兑换档位，兑换扣积分并增加次数，再领取扣1次 |
| 积分不足 | 无次数、余额不足 | 阻断且余额与申请不变，使用现有积分不足/购买示例 |
| 非法或重复领取 | 非本人、审核中、已领 | 阻断且不重复扣减 |
</frozen-after-approval>

## Code Map

- demo/iteration/fr-wen-005-model.js：共享内存模型；act claim目前完全免费。增加对既有收费配置及共享次数/积分的引用和原子扣减校验，不信任调用方传入价格。配置可引用已有EDIT0R_FEE规则同构数据；小陈配置为现有平台计费示例，不发明新价格。自定义收费可使用已有苏晚30积分/陈予50积分样例以验证。
- demo/iteration/fr-wen-005-mobile.html：复制的3.0源，EDITOR_FEE、COUNT_SKUS、quotaLeft、points、requestClaim、confirmCustomClaim、payOverlay是既有规则。新约稿领取复用其费用逻辑与弹层样式，次数/积分必须在广场及约稿之间共享，刷新重置。
- demo/iteration/fr-wen-005-native.js：实际移动端增量；现免费领取按钮、成功提示及详情文案需替换。费用确认、兑换/不足/购买尽可能复用原函数与样式，不自动购买。右上按钮布局保留。
- GitHub RenataEcho/BM-PM 提交 d6d4ac89f0266ca7b4b71f9a6acb8526bc990ffd，demo/iteration/fr-wen-004-pc.html/.css/.js：原白客户端、dashboard及三步upload源，本地对应文件可读且已只读联网核验HTML。复制成fr-wen-005-pc.*独立文件，保留原白色导航、Banner、四卡和双栏布局、上传字段与层级；用FR005数据替换原ClaimDemo依赖并加约稿入口/列表/详情/审核/定向供稿，不复制FR004领稿门槛新规则。PC普通上传/详情入口可点击，定向上传锁定来源字段，权限、取消/失败、驳回重送审继续演示。
- demo/iteration/fr-wen-005-directed.js/.html：PC iframe切换到新pc.html，场景消息保持有效；更新需求规则、后台领取条件文案及所有缓存版本。fr-wen-005-flow.js：手写SVG加入既有费用校验/扣减及失败回环，不用Mermaid，保持正交落边。
- _bmad-output/youbao/fr-wen-005-一键代发用户定向约稿；/：prd、DESIGN、EXPERIENCE、SPEC及mockups，更新所有生效的统一免费口径，注明恢复源完整提交和差异；历史明确标记失效。mockups同步产品文件和依赖。checks/model.test.cjs已有过期新记录断言，按当前已确认领取不新增记录更新，再补计费矩阵；flow.test.cjs按新SVG正确校验。

## Tasks & Acceptance

- [x] 共享模型及移动端费用流程，对齐既有规则，去掉统一免费/0积分承诺。
- [x] 复制GitHub白色PC Demo为FR005独立文件并接入原全部场景及三端联动。
- [x] 同步规则抽屉、SVG流程、四份需求文档和mockups；更新缓存。
- [x] 执行模型矩阵、流程几何、JS语法及副本一致性检查，浏览器验证移动端与PC。

Given待领取定向稿，when用户按现有方式领取，then扣配置次数/积分，保留关键词且不新增原领取记录；重复操作不扣第二次。
GivenPC场景，when打开看板及上传/审核入口，then显示GitHub白色客户端原结构，并完成审批到上传到后台审核的内存联动。

## Implementation Notes

UV 0.13.10 已从PyPI恢复到 C:/Users/Administrator/.local/bin/uv.exe，用户PATH已配置；项目临时安装目录已清理。

## Spec Change Log

## Review Triage Log

| 发现 | 判定 | 验证与处理 |
|---|---|---|
| Blind-1 标题丢失 | medium | PC提交固定拼书名，不能修改标题；补原表单字段和元数据映射。 |
| Blind-2 封面/预览丢失 | medium | 新PC仅文件名，缺封面及预览；复用原组件补回。 |
| Blind-3 文件格式 | medium | 文件夹输入无类型拦截，单txt也能提交；补选择及提交校验。 |
| Blind-4 重置残留 | medium | reset后ID仍相同，本地upload/publishedBooks未清；按模型重置清本地状态。 |
| Blind-5 看板数字 | low | 7/2固定与定向上传领取不联动；从示例和当前模型生成。 |
| Blind-6 焦点循环 | medium | 仅button导致拒绝文本域不在循环；纳入全部可聚焦元素。 |
| Blind-7 原稿聚合 | false | 当前入口保留当前来源原稿，关联定向稿按关键词聚合；同关键词其他原领取并未被要求全部合并展示，未回填原稿也不能视为当前已回填来源。 |
| Blind-8 下载回填鉴权 | false | 本仓静态Demo不接登录权限，全部可达示例是同一用户；未证明可经当前UI命中非本人记录。领取本人校验保留。 |
| Blind-9 自定义费示例 | medium | 初始定向稿均平台计费，无法经UI看到确认；补既有收费的可达示例。 |
| Blind-10 共享余额验证 | medium | 测试直接改wallet，未执行广场适配；补真实函数连接验证。 |
| Verification-1 共享余额连接 | medium | 与Blind-10同源，现有访问器未被集成测试执行；补覆盖。 |
| Verification-2 PC表单映射 | medium | 现有测试只调用F.act，不覆盖PC文件与字段映射；补适配检查。 |
| Verification-other 广场记录丢失 | medium | ensureClaim新行在sync被M.claims映射抹掉但已扣余额；保留本地广场行并修复后续渲染。 |
| Edge-1 权限/驳回场景误发 | medium | switchScene将permission/rejected规范成upload，iframe只能选A5103；发送真实场景。 |
| Edge-2 广场记录丢失 | medium | 与Verification-other同源，已读原startDownload→ensureClaim→draw→sync确认；同一修正覆盖。 |
| Edge-3 到期详情旁路 | medium | 旧详情dyPublish直接startDownload未用模型到期校验；统一已领原稿下载校验。 |

## Verification

node --check 检查修改的脚本；node执行本FR checks/model.test.cjs及flow.test.cjs。浏览器验证375×812手机与PC工作台、上传、审核、领取费用确认及排序下载布局。

### 2026-11-27 完成验证

所有有效审查项已修复：PC来源场景消息、广场记录保留和共享余额、到期下载、标题／封面／本地预览、选择及提交文件格式校验、重置清理、动态统计、抽屉完整焦点循环与原看板密度。新增苏晚30／陈予50积分待领取示例沿用既有配置，用于经UI演示确认、取消和积分不足。

- 模型12组通过，覆盖次数优先、30／50积分、100／400积分次数兑换、幂等与上传重审。
- 新增 adapters.test.cjs 的4组实际DOM适配器回归通过，覆盖原广场与约稿共享余额、PC表单字段进入共享模型，以及连续权限／驳回场景切换。
- SVG24节点29连线通过正交、端点落边、穿框和孤立节点检查。
- 6个外部脚本与2段HTML内联脚本语法通过；12个Demo文件与mockups哈希一致；本FR git diff --check通过。
- 浏览器人工验证：移动端横向排序与下载卡片右上按钮；次数领取后显示下载；陈予稿件确认50积分，取消后余额仍80，确认领取后余额30，下一份50积分稿件阻断并提示差20；PC白色看板、权限禁用及驳回重送审来源正确。
- PC截图保存于仓外可视化目录，未纳入仓库。未提交、未推送，未修改其他FR或冻结基线。
