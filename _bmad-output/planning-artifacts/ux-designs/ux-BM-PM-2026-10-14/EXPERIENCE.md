---
name: BM-PM Admin
description: B 端管理后台行为契约。视觉身份见 DESIGN.md。完整继承右豹 admin-ui-spec v1.1 的交互规则，不另起模式。
status: draft
updated: 2026-10-15
sources:
  - imports/admin-ui-spec.md
  - DESIGN.md
---

## Foundation

桌面优先的 **Web 管理后台**（B 端）。内部设计系统即右豹 `admin-ui-spec` v1.1；`DESIGN.md` 是外观参考，本文件只写相对该系统的**行为**。强制 Light/Dark（`html[data-theme]`）。

**导航约束（已钉死）：** 采用双层壳。TopNav 一级 Tab **只做业务线切换**，顺序与文案固定为：

1. 右豹主业务（默认选中）
2. 导师商务
3. 企业号

禁止把「工作台 / 需求 / 迭代 / 成员」等模块名放进顶栏。切线后 **整棵 Sidebar 换成该线的二三级菜单**；各线模块树由 PRD 补全。Logo 回到**当前业务线**的默认列表，不设独立「工作台」一级 Tab。

源文件：`imports/admin-ui-spec.md`。本文件与源或 mock 冲突时，**spine 为准**。

## Information Architecture

| Surface | Reached from | Purpose |
|---|---|---|
| Shell | 任意已登录页 | TopNav `{spacing.topnav-h}` + Sidebar `{spacing.sidebar-w}` + 主列；全站同一壳 |
| 业务线上下文 | TopNav 三个 Tab | 当前线：右豹主业务 / 导师商务 / 企业号；决定 Sidebar 与面包屑首段 |
| 列表页 | Sidebar 二三级 | 标准 CRUD 列表：面包屑 → Page Header → Filter Card → Table Card（批量栏 + 表 + Pagination） |
| Modal | 列表主按钮 / 行操作 / 危险确认 | ≤6 个可编辑字段的表单，或确认类（删除、状态切换） |
| Drawer | 列表「新建/编辑」字段 7–14 | 中等表单，侧滑不打断列表上下文 |
| 详情页 | 列表「查看」或 ≥15 字段 | 路由 `/module/detail/:id`；只读网格 + 页头返回/编辑/删除 |
| 403 | 无页面权限的 URL | 停留，不踢登录 |
| 404 / 500 / 网络异常 | 坏链、服务失败、断网 | 居中错误页，主操作返回或重试 |

面包屑最多 3 层：首段为当前业务线名，中间 `<a>`，末级 `<span>` 不可点。一级业务线 Tab 可横向滚动。Sidebar 折叠时三级菜单强制关闭，图标居中，JS 写 `title` Tooltip。

→ 构图参考：`mockups/ux-demo.html`（列表 + 筛选 + 批量 + 新建 Modal + 编辑 Drawer + 主题）。源细则：`imports/admin-ui-spec.md`。Spine 与 mock / 源冲突时以 spine 为准。

## Voice and Tone

界面微文案。品牌姿态在 `DESIGN.md` Brand & Style。

| Do | Don't |
|---|---|
| 「暂无数据」+ 一句说明 | 「空空如也～」或插画口号 |
| 「筛选条件已重置」 | 「操作成功！」套在重置上 |
| 「即将删除「{对象名称}」，此操作不可撤销。」 | 「确定要删除吗？」不含对象名 |
| 「暂无操作权限」（disabled Tooltip） | 直接藏按钮导致布局跳动 |
| 错误页：「访问受限 / 页面不存在 / 服务器错误 / 网络中断」 | 把 403 跳去登录页 |

## Component Patterns

行为。外观见 `DESIGN.md` Components。

| Component | Use | Behavioral rules |
|---|---|---|
| Icons | 全局 | SVG inline、`currentColor`；纯图标必须可访问名。不使用字体图标。 |
| TopNav | Shell | 左 Logo（回当前业务线默认列表）→ **仅三个业务线 Tab**：右豹主业务、导师商务、企业号（此顺序）→ 右：主题切换、通知角标、头像菜单。同一时刻只高亮一条线。`active` 用底边指示条。切换时关闭本线浮层（Modal/Drawer），清空勾选。 |
| Sidebar | Shell | 菜单树绑定当前业务线。点击二级展开/进入；三级缩进点击进入列表。折叠：文字/箭头/分组/Badge 不可点；图标 18px 居中；`updateNavTooltips()` 同步 `title`。 |
| Breadcrumb | 主列顶 | 最多 3 层；首段=当前业务线；末级不可点。 |
| Page Header | 列表/详情 | 左：`h1` + 描述；右：主操作按钮组（新建用 Button Primary）。 |
| Filter Card | 列表 | 字段与「重置」「查询」同卡。强制 4 列。字段 >8 时默认只露前 4，左下「展开更多 ▾ / 收起 ▴」。查询：刷新列表并 **页码回到 1**。重置：清空字段、**不自动查询**、Toast「筛选条件已重置」。日期范围=两个独立字段，相邻。输入一律 Input sm。 |
| Bulk Action Bar | Table 卡头右侧 | 默认：标题 + 条数 + 每页条数。有勾选：切成「已选 N 项 / 批量按钮 / 取消」（0.2s）。取消清空勾选。批量删除用 Button Danger。不与筛选混排、不单独占一行。 |
| Table | 列表 | 行可点进入查看（若有查看权限）。Hover/selected 左强调条。截断单元格 `title` 为全文；富内容 300ms 后浮层，`z-index: 500`，边界避让。操作 >3 收入 `action-btn more`。操作列 sticky 右。必须 `<colgroup>`。 |
| Action buttons | 表格操作列 | 类名仅 `view|edit|delete|disable|copy|more`。纯图标必须 `title`。禁用不隐藏。 |
| Pagination | Table 卡底 | 左：共 N 条、第 X/Y 页。中：首页/上一页/当前±2 页/下一/末。右：每页 **10 / 20 / 50**（默认 20）。改每页条数 → 回第 1 页。首页/末页对应按钮禁用。 |
| Button | 全局 | Primary=主路径（新增、保存、查询）；Default=次级；Danger=不可逆；Ghost=取消。disabled `opacity` 降、cursor not-allowed；无权限时 **禁用不隐藏**。loading：左旋图标 + 禁用。 |
| Input / Select | 筛选与表单 | 筛选用 Input sm。Select 可搜索；多选已选项为 Tag、超出换行；级联子级随父重置。Focus 时边框改 `{colors.primary}`。 |
| DatePicker | 筛选/表单 | 单日或范围。面板 `z-index: 1000`，贴输入框、边界避让。快捷：今天 / 本周 / 本月 / 最近7天 / 最近30天。范围：开始不得晚于结束；清空则两个一起空。 |
| Badge / Tag | 状态、分类 | Badge 用 `badge-success|warning|danger|info|default`，禁止 `badge-primary`。Tag 用五色类。不在宽 `td` 里撑满。 |
| Glass card | Filter / Table / Modal / Drawer / 统计卡 | 容器壳；内部控件不走玻璃。 |
| Modal | ≤6 字段或确认 | 字段 ≤4 单列，5–6 两列。宽度 sm/md/lg。普通：点遮罩关、Esc 关、打开 focus 首个输入。危险确认：**遮罩不关**。Body 滚动，Header/Footer 固定。 |
| Drawer | 7–14 字段 | 默认宽 520，可拖 380–90vw。列数随自身宽度（≥700 三列 / ≥500 两列 / 否则一列）。分组 ≤6，组标题 + 底部分割线。 |
| Detail Page | ≥15 字段或查看 | 返回 + 标题 + 右编辑/删除。只读：label + value，不用输入框。网格随视口 3/2/1 列。 |
| Toast | 全局 | 成功/错误/警告/信息。2.5s 后右滑淡出；可手动关。容器 `{components.toast}`。 |
| Empty state | Table 无行 | 64px SVG（opacity 0.25，见 DESIGN.md Elevation）+「暂无数据」+ 说明。 |
| Skeleton | Table 冷加载 | 按行数画行骨架，高度同数据行，闪烁。**禁止**全屏 Spinner 盖表。 |
| Upload / Cascader / RichText / NumberInput | 表单 | 拖拽+点击上传，进度百分比；级联多列；富文本工具栏固定集合、高 120–400；数字 ± 步进，超限红框。 |
| Error pages | 403/404/500/网络 | 403「返回首页」且不跳登录；404 返回首页；500 刷新/联系管理员；网络「重试」。 |

**字段数 → 容器（可编辑字段计数；确认删除/状态切换永远 Modal）：**

| 字段数 | 容器 |
|---|---|
| ≤ 6 | Modal |
| 7–14 | Drawer |
| ≥ 15 | Detail Page |

## State Patterns

| State | Surface | Treatment |
|---|---|---|
| 冷加载 | 列表 Table | 行骨架，不是全屏 Spinner |
| 空列表 | 列表 Table | Empty state：插图 +「暂无数据」+ 说明 |
| 筛选已填未查 | Filter Card | 重置不自动查；查询才刷新并回第 1 页 |
| 行选中 | Table | 批量栏切到「已选 N」；行 selected 强调 |
| 截断 | Table 单元格 | 原生 `title`；富内容 300ms 浮层 |
| 分页边界 | Pagination | 首页禁用上翻；末页禁用下翻 |
| 校验失败 | Modal / Drawer / 表单 | 提交时全量校验并滚到首个错误；blur 单字段；格式类停输 300ms 再验。必填 label 后红 `*`（`{colors.danger}`） |
| 保存中 | Button | loading + 禁用 |
| 危险确认打开 | Modal | 遮罩点击无效；Esc 仍关最顶层（见 ESC 优先级） |
| 无操作权限 | 任意按钮 | disabled + Tooltip「暂无操作权限」，不隐藏 |
| 无页面权限 | 目标 URL | 403 页，不跳登录 |
| 字段无查看权 | 详情/列表 | 显示 `****` |
| 主题已存 | 全局 | `<head>` 内联脚本先于 CSS 读 `localStorage.theme` 或系统偏好 |
| 减少动效 | 全局 | `prefers-reduced-motion` 把动画/过渡压到近 0 |
| 离线 | 网络异常页 | 「请检查您的网络连接」+ 重试 |
| 导出 | 列表 | 文件名 `{模块名}_{YYYYMMDD}.xlsx`；状态列中文；日期 `YYYY-MM-DD` |

## Interaction Primitives

- **指针：** 行点击查看；操作列图标点按；筛选查询/重置；勾选驱动批量栏。
- **键盘：** Esc 只关最顶层，不级联。优先级：危险确认 Modal → 编辑 Drawer → 详情 Drawer → 其他浮层/下拉。普通 Modal 点遮罩可关；危险确认遮罩不可关。打开表单焦点落到第一个输入。
- **表单：** 重置=清字段不关容器（筛选）；取消=不保存并关（Modal/Drawer）。
- **删除：** 必须确认 Modal；文案含对象名或「N 条」；按钮左取消（Default）右确认删除（Danger）。
- **禁止：** 筛选改非 4 列；筛选重置自动查询；无权限藏按钮；403 踢登录；全屏 Spinner 盖表；操作类名自造（尤其 `del`）；Badge 用 `badge-primary`；业务流程图用 Mermaid；顶栏增加第四条业务线或改用模块名 Tab（未改契约前）。

## Accessibility Floor

对比与字号在 `DESIGN.md`。行为底线：

- 纯图标按钮（含 Action buttons、折叠侧栏）必须有 `title` / 可访问名。
- 折叠 Sidebar 用 Tooltip 补文字。
- Focus 可见：输入焦点环按 DESIGN；Tab 顺序=阅读顺序。
- 主题切换不闪白：初始化脚本在 CSS 之前。
- `prefers-reduced-motion: reduce` 必须存在。
- 无权限用 disabled + 说明，不靠「找不到按钮」传达。
- 错误页标题+说明+单一主操作，插图 Light/Dark 各一套。

## Responsive & Platform

管理后台以桌面为主，小屏降级，不是原生 App。

| 断点 | 行为 |
|---|---|
| xs `<640` | Sidebar 隐藏，TopNav 汉堡；表横滚，操作列 sticky 右；Modal `calc(100vw - 32px)`、最大高 85vh |
| sm 640–768 | Sidebar 图标态；Drawer `100vw` |
| md 768–1024 | Sidebar 可展开；表单 2 列 |
| lg 1024–1280 | 标准壳；Drawer 默认 520px |
| xl ≥1280 | 主列 `max-width: {spacing.content-max}` |

移动端 Drawer 改为从底部滑入（bottom sheet）。打印：隐藏 TopNav、Sidebar、操作、分页、筛选；表铺满黑边、无 hover。

## Inspiration & Anti-patterns

- **继承：** 右豹 admin-ui-spec v1.1 的壳层、4 列筛选、字段数→容器、语义色操作钮。
- **拒绝：** 为「好看」给按钮/输入加玻璃；筛选 flex；`.badge-primary`；`action-btn del`；操作钮统一浅灰；空态 SVG 0.3；Toast 64/20；分页 28px；业务流 Mermaid；无权限直接藏控件；顶栏用模块名替代三条业务线。

## Key Flows

主角 **林安**（内部运营）为 `[ASSUMPTION]`：源规范无具名用户旅程，用此角色跑通规范中的负载交互。各业务线 **Sidebar 模块树**待 PRD。

### Flow 1 — 列表筛选并定位一条（林安，工作日上午）

1. 林安顶栏停在 **右豹主业务**，从 Sidebar 进入该线某模块列表。Table 先出 Skeleton 行，再出数据。
2. Filter Card 默认 4 格。她填名称 + 日期范围（两个字段），点 **查询**。
3. 列表刷新，分页回到第 1 页。行 hover 出现左强调条。
4. 她把每页改为 50 → 再次回第 1 页。
5. **Climax：** 目标行出现在首屏。她点行（或 `action-btn view`）进入查看，不必改筛选布局、也不需要全屏 loading。

失败：查询无命中 → Empty state「暂无数据」+ 说明；筛选仍保留，可改条件再查。重置 → Toast「筛选条件已重置」，表不自动变。

### Flow 2 — 批量删除（林安，下午清理）

1. 林安在列表勾选 3 行。Bulk Action Bar 从「标题+条数」切到「已选 3 项」。
2. 她点批量删除（Danger）。
3. 危险确认 Modal：「即将删除 3 条记录，此操作不可撤销。」左取消、右确认删除。点遮罩 **无反应**。
4. **Climax：** 确认后 3 行消失，Toast 成功，批量栏回到默认，勾选清空。她仍停在同一列表上下文。

失败：无删除权限 → 按钮 disabled，hover「暂无操作权限」，栏布局不塌。Esc 在确认框打开时只关该 Modal。

### Flow 3 — 按字段数进入编辑（林安，新建配置）

1. 林安点 Page Header「新建」（Button Primary）。
2. 系统按可编辑字段数开容器：5 字段 → Modal 两列；10 字段 → Drawer；16 字段 → 详情页表单。
3. 她填表。格式字段停输 300ms 校验；提交时全量校验，失败则滚到首错。
4. **Climax：** 保存成功，Toast 成功，回到列表且新行可扫到（或详情只读网格）。她没有在错误容器里硬塞 20 个字段。

失败：点取消 → 不保存并关闭。危险操作仍走独立确认 Modal，不嵌在 Drawer 里用遮罩误关。

### Flow 4 — 无页面权限（林安，误开同事模块）

1. 林安从书签打开无权限 URL。
2. **Climax：** 403「访问受限」+「返回首页」。Session 仍在，不进登录。列表里她看不见的字段是 `****`，不是空白。

失败：她若只有按钮级无权限，则按钮在、disabled、Tooltip 说明。

### Flow 5 — 切换主题（林安，夜间）

1. 林安点 TopNav 主题切换。`data-theme` 与 `localStorage.theme` 更新，色彩 0.2s 过渡。
2. 她刷新。
3. **Climax：** `<head>` 内联脚本先于 CSS 应用 Dark，页面不闪白。玻璃卡、Badge info、操作列 sticky 底均已是 Dark token。

失败：系统偏好 Dark 且无 localStorage → 首次也走 Dark，同样不闪白。
