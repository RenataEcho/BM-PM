# Spine Pair Review — BM-PM

## Overall verdict

两份 spine 已能作为内部设计系统的实现契约：外观与行为从同一份右豹规范蒸馏，形状完整，交叉引用大体可解析。尚未达到 `final`：没有 key-screen mock、主角是假设、对比度数值未写、通知面板行为空白。对「继承现成规范、先下契约」足够；对「只凭 spine 像素级还原每一页」仍要打开 `imports/admin-ui-spec.md`。

## 1. Flow coverage — adequate

源无具名 UJ。EXPERIENCE.md 用五条 Key Flow 覆盖筛选查询、批量删除、字段数容器、403、主题切换，均有步骤、高潮与失败路径。

### Findings

- **medium** 主角「林安」为 `[ASSUMPTION]`，菜单树待 PRD（EXPERIENCE.md Key Flows）。*Fix:* PRD 出来后把旅程名称改成源用语，或确认沿用林安。
- **low** 未单独走「导出 Excel / 打印」旅程（EXPERIENCE.md State Patterns 有规则、无 Flow）。*Fix:* 若导出是首发范围，补一条 Flow。

## 2. Token completeness — adequate

DESIGN.md YAML 中品牌/语义/中性/Dark 均有 hex。`{path.to.token}` 在 EXPERIENCE 中指向 `{spacing.*}` `{colors.*}` `{components.toast}`，可解析。玻璃层用 rgba（规范允许）。

### Findings

- **medium** 未声明负载组合的对比度目标（主按钮白字、Dark 正文、Badge）（DESIGN.md Colors）。*Fix:* 为 `{colors.primary}`+白字、`{colors.text-primary}`+`{colors.bg}` 等写 AA 结论。
- **low** EXPERIENCE 一处写 `{DESIGN.md}` 非正式路径（Empty state 行）。*Fix:* 改为 `{components}` 或正文不引用文件当 token。

## 3. Component coverage — adequate

壳、筛选、表、分页、操作钮、Modal/Drawer、Toast、空态/骨架在两份中都有规则。Icons 已补行为行。

### Findings

- **low** 命名不完全同一：DESIGN「Action buttons」/ `action-btn` vs EXPERIENCE「Action buttons」；「Glass card」vs `glass-card`（DESIGN.md Components / EXPERIENCE.md Component Patterns）。*Fix:* 统一成 frontmatter 键名。
- **low** 通知角标仅在 TopNav 出现，无面板组件（EXPERIENCE.md TopNav）。*Fix:* 有需求再补，或写明 v1 只切换圆点。

## 4. State coverage — adequate

列表冷加载/空/筛选/选中/分页/校验/权限/403/脱敏/主题/减动效/离线均有。缺通知空态、头像菜单项。

### Findings

- **low** 头像菜单与通知面板状态未列（EXPERIENCE.md State Patterns）。*Fix:* PRD 定账号模型后再补。

## 5. Visual reference coverage — thin

仅 `imports/admin-ui-spec.md`。无 `mockups/` `wireframes/`。IA 已声明 spine 为准。符合「跳过创意工具、继承规范」的选择，但下游缺少一屏即懂的构图。

### Findings

- **medium** 无 key-screen HTML（workspace mockups/ 空）。*Fix:* 需要时补列表页+Modal+Drawer 三张；或接受源 HTML Demo 外链。

## 6. Bloat & overspecification — adequate

EXPERIENCE 以表为主。筛选栅格、Toast 坐标等像素在 DESIGN，行为不重复决策。源 CSS 未整文件粘贴（reconcile 已说明实现仍要打开源）。

### Findings

- **low** Filter 4 列在 DESIGN Layout 与 EXPERIENCE Filter Card 各写一次（有意：外观 vs 行为）。*Fix:* 可留。

## 7. Inheritance discipline — strong

`sources` 可解析。容器决策、类名禁令与源一致。Token 引用指向 DESIGN 键。菜单树按源留给 PRD。

### Findings

无。

## 8. Shape fit — strong

DESIGN 八节顺序正确。EXPERIENCE 必选节齐全；Responsive 与 Inspiration 因断点/反模式已触发并存在。

### Findings

无。

## Mechanical notes

- 两份 `status: draft`，`updated: 2026-10-15`。
- 无 Mermaid。
- `reconcile-admin-ui-spec.md` 记录未进入 spine 的源内容。
