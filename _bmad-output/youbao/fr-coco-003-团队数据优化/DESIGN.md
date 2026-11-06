---
name: FR-CoCo-003 团队数据优化
description: 基于最终 V4.2 PRD 与用户 V4.2 Demo 快照的移动端视觉合同，覆盖项目、全项目成员、单项目双榜与汇总成员 Sheet，并保持手机画布与迭代外壳隔离。
status: final
updated: 2026-11-02
sources:
  - prd.md
  - addendum.md
  - reconcile-prd-v42.md
  - references/team_project_member_data_mobile_h5_v4_2_with_requirements.html
  - mockups/fr-coco-003-team-project-member-data-v4-2.html
  - ../../../docs/design/移动端设计规范.md
  - ../../../docs/design/iteration-shell/DESIGN.md
  - ../../../docs/design/iteration-shell/EXPERIENCE.md
colors:
  brand-primary: '#FF603B'
  brand-pressed: '#E44A27'
  brand-text: '#C04425'
  brand-soft: '#FFF3EE'
  brand-soft-strong: '#FFE6DC'
  chart-1: '#FF603B'
  chart-2: '#D94A2B'
  chart-3: '#B76B24'
  chart-4: '#8B6A3B'
  chart-5: '#73556F'
  chart-more: '#5E6878'
  chart-outline: '#52362D'
  surface-page: '#F5F6F8'
  surface-card: '#FFFFFF'
  surface-control: '#FFF4EF'
  surface-subtle: '#FAF9F8'
  surface-sheet-stat: '#FFF7F3'
  text-primary: '#303033'
  text-secondary: '#6F6B70'
  text-muted: '#686469'
  border-subtle: '#F1E8E3'
  border-control: '#8A817D'
  overlay: 'rgba(23,17,38,.50)'
  focus-ring: '#8F321C'
typography:
  page-title:
    fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", Arial, sans-serif'
    fontSize: 1.0625rem
    fontWeight: '700'
    lineHeight: '1.35'
  section-title:
    fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", Arial, sans-serif'
    fontSize: 1rem
    fontWeight: '700'
    lineHeight: '1.4'
  row-title:
    fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", Arial, sans-serif'
    fontSize: 0.875rem
    fontWeight: '700'
    lineHeight: '1.4'
  body:
    fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", Arial, sans-serif'
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: '1.5'
  caption:
    fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", Arial, sans-serif'
    fontSize: 0.75rem
    fontWeight: '400'
    lineHeight: '1.5'
  metric:
    fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", Arial, sans-serif'
    fontSize: 1rem
    fontWeight: '700'
    lineHeight: '1.3'
rounded:
  sm: 8px
  md: 10px
  lg: 12px
  xl: 16px
  sheet: 20px
  full: 9999px
spacing:
  '1': 4px
  '2': 8px
  '3': 12px
  '4': 16px
  '5': 20px
  '6': 24px
  page-gutter: 12px
  section-gap: 12px
  card-padding: 14px
  touch-min: 44px
components:
  member-embedded-entry:
    background: '{colors.surface-card}'
    border-top: '1px solid {colors.border-subtle}'
    radius: '0'
    padding: '14px {spacing.card-padding}'
  overview-grid:
    layout: 'colored cumulative cards above today values; flow left, reward right'
    columns: 'repeat(2, minmax(0, 1fr))'
    gap: '{spacing.2}'
    background: '{colors.surface-card}'
    radius: '{rounded.lg}'
  period-switch:
    background: '{colors.surface-control}'
    active-background: '{colors.surface-card}'
    active-foreground: '{colors.brand-text}'
    active-indicator: '2px solid {colors.focus-ring}'
    radius: '{rounded.md}'
    min-height: '{spacing.touch-min}'
  donut-chart:
    colors: '{colors.chart-1}, {colors.chart-2}, {colors.chart-3}, {colors.chart-4}, {colors.chart-5}, {colors.chart-more}'
    outline: '2px solid {colors.chart-outline}'
    separator: '2px solid {colors.surface-card}'
    center-background: '{colors.surface-card}'
    size: '136px'
  primary-tabs:
    background: '{colors.surface-control}'
    active-background: '{colors.surface-card}'
    active-foreground: '{colors.brand-text}'
    radius: '{rounded.lg}'
    min-height: '{spacing.touch-min}'
  filter-card:
    background: '{colors.surface-card}'
    border: '1px solid {colors.border-subtle}'
    radius: '{rounded.xl}'
    padding: '{spacing.3}'
  filter-control:
    background: '{colors.surface-card}'
    border: '1px solid {colors.border-control}'
    radius: '{rounded.md}'
    min-height: '{spacing.touch-min}'
  relation-scroller:
    background: '{colors.surface-control}'
    active-background: '{colors.surface-card}'
    active-foreground: '{colors.brand-text}'
    active-indicator: '2px solid {colors.focus-ring}'
    min-height: '{spacing.touch-min}'
  project-card:
    background: '{colors.surface-card}'
    border: '1px solid {colors.border-subtle}'
    radius: '{rounded.lg}'
    padding: '{spacing.card-padding}'
  member-profile-card:
    background: '{colors.surface-card}'
    border: '1px solid {colors.border-subtle}'
    radius: '{rounded.xl}'
    padding: '{spacing.card-padding}'
    metric-background: '{colors.surface-subtle}'
  aggregate-member-sheet:
    background: '{colors.surface-card}'
    overlay: '{colors.overlay}'
    radius: '{rounded.sheet} {rounded.sheet} 0 0'
    max-height: '89dvh'
  icon-fallback:
    background: '{colors.brand-soft-strong}'
    foreground: '{colors.brand-text}'
    radius: '{rounded.md}'
    size: '42px'
  empty-state:
    background: '{colors.surface-card}'
    foreground: '{colors.text-muted}'
    title: '{typography.section-title}'
    body: '{typography.body}'
---

## Brand & Style

本合同只定义 `FR-CoCo-003` 的手机产品画面。视觉以用户提供的 V4.2 快照为最新基线：浅灰页面、白色卡片、暖橙选中态、紧凑筛选和低装饰的数据展示；产品字段、口径与边界以最终 `prd.md` 为准。待提升的构图快照为 [`mockups/fr-coco-003-team-project-member-data-v4-2.html`](mockups/fr-coco-003-team-project-member-data-v4-2.html)。

暖橙方向继承 `docs/design/移动端设计规范.md`，但本页不使用黑金数据 Hero。手机画布和桌面迭代外壳严格隔离：D1 继续使用 `docs/design/iteration-shell/` 的蓝紫玻璃 token；S1–S4 不读取父页面变量、class、遮罩或 z-index，父页面也不读取本文件 token。

## Color & Type

- `{colors.brand-primary}` 用于主填充、图形和大面积选中底；小字号文字、焦点和金额强调使用更深的 `{colors.brand-text}` / `{colors.focus-ring}`。
- 奖励构成固定使用 `{colors.chart-1}`～`{colors.chart-5}` 与 `{colors.chart-more}` 六个槽位，分别对应前五个项目和“更多项目”。每个槽位同时有序号、项目名、金额和占比，不允许只靠颜色映射。
- 图表扇区使用 `{colors.chart-outline}` 外轮廓与白色分隔。色觉难以区分时，结构化图例和顺序编号仍能完成识别。
- 普通文字对背景至少 4.5:1；焦点环、控件边界和必要图形至少 3:1。错误、空态和权限待决不通过新增高饱和色表达。
- 页名、模块名、项目/成员名、正文、辅助文字和数字分别使用 `{typography.page-title}`、`{typography.section-title}`、`{typography.row-title}`、`{typography.body}`、`{typography.caption}`、`{typography.metric}`。数字的层级同时依靠字段标签、字号与字重，不只依靠橙色。

## Mobile IA and Visual Order

### S1 团队数据入口

从上到下保持既有团队数据页结构：

1. 既有页面导航与团队奖励内容，本 FR 不重绘。
2. 既有“成员数据”白色卡片：标题、“查看详情”和三项成员指标保持不变。
3. 同一张成员数据卡片底部新增 `{components.member-embedded-entry}`，与指标区以横向分隔线区分。
4. 内嵌行包含方圆图形、标题“项目数据”、副文案“查看项目奖励构成与成员排行”和跳转标识。
5. 既有页尾及“邀请达人加入团队”固定操作保持不变；成员数据卡片底部须留出安全区，不被固定操作覆盖。

不得新增“项目分析”分区标题，不得把入口做成成员数据卡片之外的独立白卡。入口不以固定项目数、成员数或金额作为字段合同。即使无数据，是否和如何呈现入口仍受权限与 P03 的最终产品决定影响。

### S2 项目数据首页

从上到下固定为：

1. 返回栏、页标题“项目数据”与问号说明图标；图标打开统计规则说明浮层，内容由后台 `data.tips` 字段配置。
2. `{components.overview-grid}`：一个白色双列组件展示累计出单流水与累计团队奖励，各列下方以灰色辅助文字展示对应今日值，不展示昨日统计；奖励值不单独高亮。
3. 构成卡：项目奖励构成 / 项目流水构成下拉、累计/今日/昨日 `{components.period-switch}`、Top 5 +“更多项目”环形图、完整结构化图例和统计说明。
4. `{components.primary-tabs}`：顶层“项目排行榜 / 成员排行榜”。
5. 项目 Tab：累计/今日/昨日三种出单流水降序控件、结果说明、项目卡列表；不提供奖励排序。
6. 成员 Tab：统一筛选卡、结果说明、全项目成员卡列表。

顶层 Tab 位于图表之后，因此切换排行榜不替换概览或图表。项目列表排序不改变构成图的指标、周期、排名、分组或金额。

### S3 项目详情

从上到下固定为：

1. 返回栏、项目 Icon、项目名称与明确的当前项目身份。
2. `{components.primary-tabs}`：“成员奖励排行 / 成员出单排行”。
3. 两榜共用的 `{components.filter-card}`：搜索、五项关系、五项时间。
4. 排行标题、固定排序依据与结果范围说明。
5. `{components.member-profile-card}` 列表。

项目详情不放概览 KPI 卡；页面没有排序下拉。筛选卡与成员卡均只作用于当前项目。

### S4 全项目成员汇总 Sheet

S2 成员排行榜点击成员后，在手机视口内打开 `{components.aggregate-member-sheet}`。从上到下为拖拽提示/关闭、成员昵称、用户 ID、成员关系、当前周期标题、三项总计、各项目明细、口径说明。Sheet 可独立纵向滚动，底部尊重安全区。

### E1 既有成员产生奖励详情页

S3 任一榜单点击成员均交给既有页面，不在本 FR 复制该页面视觉。交接参数为成员 ID 与当前项目 ID；Demo 未接入时可显示一张规则提示卡，但不得伪造新详情界面。

## Layout & Responsive

- 基准宽度 375px，单列布局，左右 gutter `{spacing.page-gutter}`；375px 下页面本体不得横向溢出。
- 五项关系使用 `{components.relation-scroller}`，允许控件自身横向滚动。首尾有内边距，最后一个选项可完整滚入视口；不得让某个标签只能以被裁切状态出现。
- 关系选中态同时使用填充、深色文字、描边/下划线和程序化状态。时间与顶层 Tab 同理。
- 环形图与图例在 375px 可并排；空间不足或 200% 文本时上下堆叠。累计条与今日双卡在空间不足时改为单列；三项指标、双列选择器同理。
- 文本缩放 200% 时不固定卡片高度，不裁切项目名、成员名、字段标签或按钮；除关系控件自身的有意横向滚动外，不产生水平滚动。
- 所有独立操作目标至少 `{spacing.touch-min}` × `{spacing.touch-min}`。焦点样式不被粘性页头、卡片 overflow 或 Sheet 裁切。

## Components

- **Member Embedded Entry `{components.member-embedded-entry}`**：位于成员数据卡片底部，整行一个主焦点；顶部以 1px 分隔线连接指标区，图形为 44px 方圆暖橙底，不另加外层卡片、阴影或“项目分析”标题。
- **Overview Grid `{components.overview-grid}`**：累计流水与累计奖励使用有底色双卡并固定在上层；今日流水与今日奖励在对应列下方，不展示昨日统计。流水固定在左、奖励固定在右；字段名永远可见，接口错误时整组或受影响项进入错误状态，不显示伪零。
- **Reward Composition `{components.donut-chart}`**：每个周期按团队奖励降序映射前五项；第六槽固定为“更多项目”。“更多项目”仅出现在图表/图例，不能做成项目卡或下钻入口。
- **Primary Tabs `{components.primary-tabs}`**：S2 和 S3 各自使用独立 Tab 组。选中项有文字、背景和底边/描边三重线索。
- **Unified Filter Card `{components.filter-card}`**：搜索框有持久可访问名称；关系用滚动选项组；时间和排序使用有标签控件。S2 成员榜显示“时间维度 + 排序维度”，S3 只显示时间，不留空排序位。
- **Relation Scroller `{components.relation-scroller}`**：顺序固定为全部、直属、间属、直属团队、间属团队。滚动只发生在该控件内部，键盘焦点进入时自动把当前项完整滚入视口。
- **Project Card `{components.project-card}`**：项目 Icon、项目名称、累计/今日/昨日团队奖励、累计/今日/昨日出单流水、下钻标识。卡片没有奖励成员数字段。
- **Icon Fallback `{components.icon-fallback}`**：后台 Icon 缺失或加载失败时，使用稳定方圆底板和项目名称首个可读字/通用项目符号；尺寸、占位和可访问名称与成功图片一致，不触发布局位移。
- **Member Profile Card `{components.member-profile-card}`**：上区展示名次、头像/首字兜底、昵称、用户 ID、成员关系和下钻标识；下区固定展示有效出单量、出单流水、团队奖励三项指标。无 V 等级、活跃度、加入日期或其他 Mock 标签。
- **Project vs Global Member Cards**：S2 全项目卡的辅助语义为“全部有权项目去重汇总”，点击进入 S4；S3 卡的辅助语义为当前项目，点击进入 E1。S3 奖励榜突出团队奖励，出单榜突出出单流水并让有效出单量具备同级醒目标签；两者仍完整显示三项指标。
- **Aggregate Member Sheet `{components.aggregate-member-sheet}`**：总计与各项目明细都显示相同三项指标和当前周期。总计与明细关系不通过视觉暗示强行对账，等待 P13。
- **Empty/Error `{components.empty-state}`**：空态留在所属模块；错误态含明确“加载失败”和 44px 重试按钮。错误不借用 `0`、`0.00` 或空白卡片表达。

## Elevation, Shape and Isolation

卡片使用 `0 1px 5px rgba(99,64,50,.035)` 轻阴影和 `{colors.border-subtle}` 边界，不使用玻璃模糊。入口与成员卡用 `{rounded.xl}`，项目卡用 `{rounded.lg}`，输入和选择器用 `{rounded.md}`。Sheet 只存在于手机文档内；父级需求规则 overlay 只存在于 D1，两者不共享 DOM、CSS class、遮罩、焦点管理或 Esc 处理。

## Contract Boundaries

- V4.2 快照可提升暖橙层级、卡片结构、筛选组合和字段位置；固定项目名、用户、金额、日期、生成算法、DOM 与精确 CSS 不是合同。
- 正式视觉不出现仅属于 Mock 的 V 标签、活跃标签或加入日期。
- 产品只规定排行榜最多前 100 名；本视觉合同不规定翻页、追加或分页控件。
- 未关闭的 P01、P03、P05～P13 只作为未决合同影响项存在。UX 不为累计边界、零/负净额、并列、跨项目关系、未授权呈现、奖励台账或多项目订单归属预设视觉答案。
- Demo 可使用已授权、非负、无并列且不含多项目关联订单的示例数据；这不关闭任何门禁。

## Do / Don't

- Do：以文字、顺序、图例和形状辅助颜色；保持暖橙手机画面与蓝紫迭代外壳隔离。
- Do：项目卡和成员卡完整展示 PRD 字段，确保 375px、44px 和 200% 文本可用。
- Don't：从快照固定值反推生产字段或统计口径。
- Don't：在项目详情补概览卡、在成员卡补演示标签，或为“更多项目”增加列表入口。
