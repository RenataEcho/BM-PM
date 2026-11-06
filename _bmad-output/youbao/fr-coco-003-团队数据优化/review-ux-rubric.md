# Spine Pair Review — FR-CoCo-003 团队数据优化

## Overall verdict
**strong。** 两个剩余 medium 均已闭合：Key Flows 现在逐项保留 FR-1～FR-11 的精确 ID→来源原名映射，S1 入口项目数也明确了局部加载、失败降级、可进入性与重试归属。全量回归未发现新的下游消费缺口，spine pair 可被架构、story-dev、Demo 与测试干净提取。

## 1. Flow coverage — strong
从 `prd.md` 提取并逐项核对 UJ-1～UJ-2 与 FR-1～FR-11。Key Flows 映射中的名称与 PRD §4 标题完全一致：FR-1「项目数据入口」、FR-2「项目奖励概览」、FR-3「奖励构成筛选与分组」、FR-4「项目列表与排序」、FR-5「项目详情概览」、FR-6「成员奖励排行榜」、FR-7「成员项目奖励详情」、FR-8「奖励归属与去重」、FR-9「调整与对账」、FR-10「一致的数据权限」、FR-11「页面状态与恢复」。三条流程均有具名主角、编号步骤、Climax 和适用的失败分支。

### Findings
无。

## 2. Token completeness — strong
核对了 19 个颜色、7 个字体角色、6 个圆角、10 个间距和 13 个组件对象；双 spine 中全部 `{path.to.token}` 引用均可解析。颜色均为 hex，`colors.overlay` 为 `#17112680`；本需求未声明暗色模式。关键文字、控件边界、焦点与图形对比合同保持完整。

### Findings
无。

## 3. Component coverage — strong
13 个组件 token 均在 `DESIGN.md` Components 中有视觉规则，并在 `EXPERIENCE.md` Component Patterns 中有行为规则：`entry-card`、`reward-hero`、`kpi-row`、`period-switch`、`donut-chart`、`chart-legend`、`project-card`、`member-row`、`filter-control`、`bottom-sheet`、`skeleton`、`empty-state`、`pagination-load-more`。

### Findings
无。

## 4. State coverage — strong
逐面检查了 S1、S2、S3、S4 和 D1。S1 的动态计数现在明确继承既有团队数据页加载合同：加载时仅计数位显示局部骨架；失败时显示“—”和“项目数加载失败”，入口仍可进入 S2，重试由既有页面刷新承接且不新增卡内第二点击目标。S2～S4 的首次加载/失败、差异化空态、搜索无结果、加载更多失败、离线、权限失效、停用历史与已加载内容保留均保持覆盖；焦点、overlay 隔离和返回恢复合同无退化。

### Findings
无。

## 5. Visual reference coverage — strong
`mockups/` 的 2 个文件均被 inline 引用并说明用途：`fr-coco-003-team-data-reference.html` 是可执行构图参考，`fr-coco-03-project-mobile.html` 是历史反例。`references/project_data_brand_orange_v3.html` 的输入边界和 `入口参考.png` 的 S1 入口语境均已说明；无 `wireframes/`、`imports/`，无孤儿；spines-win-on-conflict 已声明。

### Findings
无。

## 6. Bloat & overspecification — strong
像素值集中于 token 或确有构图意义的移动端基准；排名、统计时点、Demo 隔离与 P-ID 均直接约束行为或防止 Mock 污染。未重复完整 persona、FR 正文或范围，没有无下游用途的装饰叙事。

### Findings
无。

## 7. Inheritance discipline — strong
两份 frontmatter 的相对来源均可解析；权威顺序一致。UJ 原名与 FR ID→原名均逐字继承 PRD；核心术语、组件名称及 EXPERIENCE→DESIGN token 引用一致。参考 HTML、历史 mock 与入口截图均未越权成为产品口径。

### Findings
无。

## 8. Shape fit — strong
DESIGN 章节严格遵循 canonical 顺序。EXPERIENCE 的 Foundation、Information Architecture、Voice and Tone、Component Patterns、State Patterns、Interaction Primitives、Accessibility Floor、Key Flows 均存在；Inspiration 与 Responsive 由参考输入、手机 iframe 和缩放要求触发，附加的 Demo/未决口径章节服务真实交付边界。

### Findings
无。

## Mechanical notes
- **机械提取：** UJ-1～UJ-2、FR-1～FR-11；19 colors / 7 typography / 6 rounded / 10 spacing / 13 components。
- **本轮精确修复验证：** 11 个 FR 的 ID→名称与 `prd.md` §4 标题逐项一致；S1 入口计数的 loading / failure / retry / navigability 合同完整。
- **回归验证：** token、组件双边登记、权限/离线、视觉引用、唯一权威顺序、UJ 原名、焦点与 overlay 隔离均无退化。
- **视觉文件：** `mockups/` 2、`wireframes/` 0、`imports/` 0；另有 1 个 reference HTML 和 1 张入口截图，均已说明作用。
- **Mermaid：** 无 Mermaid；不适用语法检查。
- **Finding counts：** critical 0、high 0、medium 0、low 0。
