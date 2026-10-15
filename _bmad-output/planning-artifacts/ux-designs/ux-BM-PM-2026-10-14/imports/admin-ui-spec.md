---
name: admin-ui-spec
description: 管理后台 UI/UX 设计规范，涵盖色彩系统、明暗主题切换、菜单架构、页面布局、组件规范、弹窗抽屉布局、筛选与批量操作分离、表单交互、图标动效、响应式断点、错误页、导出样式等完整标准。当用户需要开发或设计管理后台页面、需要遵循统一 UI 规范、询问组件样式/交互规则、或构建新页面时使用。
---

# 管理后台 UI/UX 规范（右豹专用）

> **版本**：v1.1（同步自 UIUX.md，2026-04-29）  
> 简约大气 · 玻璃拟态科技风格，支持明暗色切换，面向 B 端管理系统。

---

# 零、玻璃拟态风格规范（Glassmorphism）

**核心原则**：卡片/面板采用半透明磨砂玻璃效果，配合渐变背景底色，营造科技感与层次感。

## 背景底色

```css
/* Light 模式 */
body { background: #f0f4f8; }
body.use-gradient { background: linear-gradient(135deg, #e0e7ff 0%, #f0f4f8 40%, #e0f2fe 100%); background-attachment: fixed; }

/* Dark 模式 */
[data-theme="dark"] body { background: #0f172a; }
[data-theme="dark"] body.use-gradient { background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0c1a2e 100%); }
```

## 玻璃卡片样式

```css
/* Light 玻璃卡片 */
.glass-card {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.55);
  box-shadow: 0 8px 32px rgba(30, 40, 80, 0.10), inset 0 1px 0 rgba(255,255,255,0.8);
  border-radius: 14px;
}

/* Dark 玻璃卡片 */
[data-theme="dark"] .glass-card {
  background: rgba(30, 41, 59, 0.65);
  backdrop-filter: blur(16px) saturate(160%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05);
}
```

## TopNav / Sidebar 玻璃化

```css
.topnav, .sidebar {
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
}
.topnav { box-shadow: 0 2px 16px rgba(99,102,241,0.10); }
.sidebar { box-shadow: 2px 0 12px rgba(99,102,241,0.07); }
[data-theme="dark"] .sidebar { box-shadow: 2px 0 12px rgba(0,0,0,0.3); }
```

## 装饰光晕（可选）

- 背景固定位置放置 2-3 个径向渐变光晕球，`pointer-events: none; z-index: 0`
- Light：`radial-gradient(circle, rgba(99,102,241,0.15), transparent 60%)`
- Dark：`radial-gradient(circle, rgba(99,102,241,0.25), transparent 60%)`

## 使用范围

- 所有卡片（stat-card、filter-card、table-card、drawer、modal）均使用玻璃效果
- TopNav、Sidebar 使用轻度玻璃效果
- 按钮、输入框、下拉框**不使用**玻璃效果（保持清晰可操作感）

---

# 一、色彩系统（Color System）

## CSS 变量完整清单（每个页面 `:root` 必须全量声明，禁止遗漏）

```css
:root {
  /* 品牌主色 */
  --primary: #2563eb;
  --primary-hover: #1d4ed8;
  --primary-active: #1e40af;
  --primary-light: #eff6ff;
  --primary-border: #bfdbfe;

  /* 语义色 */
  --success: #16a34a;   --success-bg: #f0fdf4;   --success-border: #bbf7d0;
  --warning: #d97706;   --warning-bg: #fffbeb;   --warning-border: #fde68a;
  --danger:  #dc2626;   --danger-bg:  #fef2f2;   --danger-border:  #fca5a5;
  --info:    #0891b2;   --info-bg:    #ecfeff;   --info-border:    #a5f3fc;

  /* 中性色（Light） */
  --bg: #f0f4f8;              /* 禁止遗漏 */
  --surface: #ffffff;
  --surface-hover: #f8fafc;
  --border: #e8edf3;
  --border-hover: #c8d5e2;
  --text-primary: #18222f;
  --text-secondary: #4a5568;
  --text-muted: #9aa5b4;
  --text-disabled: #c8d5e2;

  /* 阴影 */
  --shadow-sm: 0 1px 4px rgba(30,40,60,0.06);
  --shadow:    0 2px 10px rgba(30,40,60,0.08);
  --shadow-lg: 0 8px 28px rgba(30,40,60,0.11);
  --shadow-xl: 0 16px 48px rgba(30,40,60,0.14); /* 禁止遗漏 */

  /* 圆角 */
  --radius-xs: 4px;
  --radius-sm: 7px;
  --radius:    10px;
  --radius-lg: 14px;
  --radius-xl: 20px;

  /* 动效 */
  --transition:      all 0.16s ease;
  --transition-slow: all 0.28s ease;

  /* 导航专用变量 */
  --topnav-h:          54px;
  --sidebar-w:         220px;  /* 根据项目调整，需与所有页面保持一致 */
  --topnav-bg:         linear-gradient(135deg, #dbeafe 0%, #ede9fe 40%, #e0f2fe 100%);
  --topnav-text:       #3b4d6b;
  --topnav-text-active:#1e3a8a;
  --topnav-hover-bg:   rgba(99,102,241,0.09);
  --topnav-active-bg:  rgba(99,102,241,0.13);
  --topnav-border:     rgba(148,163,196,0.25);
  --sidebar-bg:        rgba(240,244,255,0.92);
  --sidebar-border:    rgba(148,163,196,0.22);
}

[data-theme="dark"] {
  --bg: #0f172a;
  --surface: #1e293b;
  --surface-hover: #273348;
  --border: #334155;
  --border-hover: #475569;
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
  --text-muted: #475569;
  --text-disabled: #334155;
  --shadow-sm: 0 1px 4px rgba(0,0,0,0.3);
  --shadow:    0 2px 10px rgba(0,0,0,0.35);
  --shadow-lg: 0 8px 28px rgba(0,0,0,0.45);
  --shadow-xl: 0 16px 48px rgba(0,0,0,0.55);
  --topnav-bg:         linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0c1a2e 100%);
  --topnav-text:       rgba(203,213,225,0.85);
  --topnav-text-active:#f1f5f9;
  --topnav-hover-bg:   rgba(255,255,255,0.08);
  --topnav-active-bg:  rgba(255,255,255,0.13);
  --topnav-border:     rgba(255,255,255,0.10);
  --sidebar-bg:        rgba(15,23,42,0.97);
  --sidebar-border:    rgba(255,255,255,0.07);
}
```

## Tag 多色系

| 类名 | 背景 | 文字 | 用途示例 |
|------|------|------|---------|
| `tag-blue`   | `#eff6ff` | `#2563eb` | 主要分类、功能类型 |
| `tag-green`  | `#f0fdf4` | `#16a34a` | 正常/在售状态 |
| `tag-amber`  | `#fffbeb` | `#92400e` | 待处理/警告 |
| `tag-purple` | `#faf5ff` | `#7c3aed` | 特殊标记、大版本 |
| `tag-gray`   | `#f1f5f9` | `#64748b` | 停用/归档 |

Dark 模式 Tag 统一加 `rgba(色值, 0.18)` 背景，文字用对应浅色。

## Badge 类名规范（⚠️ 禁止使用 `.badge-primary`）

| 语义 | 类名 | 颜色变量 |
|------|------|---------|
| 成功 / 正常 | `badge-success` | `--success` |
| 警告 / 待处理 | `badge-warning` | `--warning` |
| 危险 / 异常 | `badge-danger` | `--danger` |
| 信息 / 处理中 | `badge-info` | `--info` |
| 默认 / 停用 | `badge-default` | `#64748b` |

Dark 模式 `.badge-info` 必须补充：
```css
[data-theme="dark"] .badge-info {
  background: rgba(8,145,178,0.18);
  color: #22d3ee;
  border-color: rgba(8,145,178,0.3);
}
```

---

# 二、字体与排版（Typography）

**字体栈**：`'PingFang SC', 'Microsoft YaHei', 'Segoe UI', -apple-system, sans-serif`  
**等宽字体**：`'SFMono-Regular', 'Consolas', 'Monaco', monospace`（用于编码、ID 类数据）

| 级别 | 大小 | 字重 | 行高 | 用途 |
|------|------|------|------|------|
| 页面标题 h1 | 19px | 700 | 1.3 | 页面主标题 |
| 卡片标题 h2 | 15px / 13.5px | 600 | 1.4 | 区块/卡片标题 |
| 小节标题 h3 | 13px | 600 | 1.5 | 表单分组标题 |
| 正文 | 13px | 400 | 1.6 | 表格内容、表单值 |
| 辅助说明 | 12px | 400 | 1.5 | 描述、提示文字 |
| 标签/角标 | 11px | 600 | 1 | Badge、Tag、角标 |
| 超小说明 | 10px | 400 | 1.4 | 版权、时间戳次要信息 |

---

# 三、图标规范（Icon System）

**推荐图标库**：Lucide Icons / Heroicons（MIT 协议，SVG inline）

| 使用场景 | 尺寸 | 线宽 |
|---------|------|------|
| TopNav 一级菜单图标 | 14px | 1.8px |
| 侧边栏导航菜单图标 | 15px | 1.6px |
| 按钮内图标 | 14px | 1.4-1.5px |
| 表格操作图标 | 15px | 1.5px |
| 输入框前缀图标 | 14px | 1.4px |
| 状态提示图标 | 16px | 1.5px |
| 卡片标题图标 | 12px | 2px |
| 空态插图 | 60-64px | 0.9-1.5px |

**使用规则**：
- 仅使用 SVG inline，不使用字体图标
- 图标颜色继承父元素 `currentColor`，便于主题切换
- 图标 + 文字间距：`gap: 5px` 或 `gap: 6px`
- 纯图标按钮必须有 `title` 属性提供无障碍提示

---

# 四、动效规范（Motion & Animation）

| 场景 | 时长 | 缓动 |
|------|------|------|
| 按钮 hover/active | 0.16s | ease |
| 输入框 focus | 0.16s | ease |
| 下拉菜单展开 | 0.15-0.18s | ease-out |
| 抽屉滑入/滑出 | 0.28s | cubic-bezier(0.4,0,0.2,1) |
| 弹窗出现/消失 | 0.22s | ease-out |
| Toast 出现/消失 | 0.25-0.28s | ease |
| 批量操作栏切换 | 0.2s | ease |
| 主题切换色彩过渡 | 0.20s | ease |
| 侧边栏折叠/展开 | 0.22s | ease |
| 骨架屏闪烁 | 1.5s | ease-in-out（infinite） |
| 欢迎横幅入场 | 0.5s | cubic-bezier(.22,.68,0,1.1) |
| 三级菜单展开 | 0.22s | ease |

**原则**：
- 功能性动效优先，装饰性动效克制
- 所有过渡使用 CSS `transition`，避免 JS 驱动动画
- 每个页面末尾必须添加 `prefers-reduced-motion` 声明：

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

# 五、菜单架构（Navigation Structure）

## 架构设计

支持以下两种常见导航结构，根据项目规模选择：

- **单层**：仅左侧侧边栏（适合功能较少的后台）
- **双层**：顶部一级域 Tab + 左侧二三级侧边栏（适合功能复杂的大型后台）

具体菜单结构由各项目 PRD 定义，Skill 不预设。

## 顶部导航栏（TopNav）

```
高度：54px（--topnav-h）
position: fixed; top: 0; left: 0; right: 0; z-index: 300
背景：渐变玻璃拟态（--topnav-bg）
```

**结构（左→右）：**
1. Logo 区（30×30px 圆角 8px 图标 + 品牌名）+ 右边框分隔
2. 一级域 Tab 导航（等高铺满，可横向滚动）
3. 右侧操作区（主题切换 + 通知角标 + 用户头像下拉）

**一级 Tab 样式：**
```css
.pnav-item { height: 100%; padding: 0 14px; font-size: 13px; font-weight: 500; }
.pnav-item.active::after {
  content: ''; position: absolute; bottom: 0; left: 10px; right: 10px;
  height: 2px; border-radius: 2px 2px 0 0; background: #4f46e5;
}
[data-theme="dark"] .pnav-item.active::after { background: rgba(255,255,255,0.85); }
```

## 左侧侧边栏（Sidebar）

```
展开宽度：由 --sidebar-w 变量控制（根据项目统一设定，全站保持一致）
折叠宽度：展开宽度的约 1/4（通常 52–56px）
position: fixed; top: 54px; bottom: 0; left: 0; z-index: 200
```

**二级菜单项（nav-item）：**
```css
.nav-item {
  height: 40px; padding: 0 12px 0 14px;
  margin: 1px 8px; width: calc(100% - 16px);
  border-radius: 8px; font-size: 13px; font-weight: 500;
}
.nav-item.active {
  color: #2563eb; background: rgba(37,99,235,0.12); font-weight: 600;
}
.nav-item.active::before {
  content: ''; position: absolute; left: 0; top: 7px; bottom: 7px;
  width: 3px; border-radius: 0 2px 2px 0; background: #2563eb;
}
```

**三级菜单项（nav-subitem）：**
```css
.nav-subitem {
  height: 36px; padding: 0 14px 0 40px;
  margin: 1px 8px; width: calc(100% - 16px);
  border-radius: 7px; font-size: 12.5px;
}
```

**折叠态规则：**
- 文字、箭头、分组标签、Badge：`opacity: 0; pointer-events: none`
- 三级子菜单强制关闭：`max-height: 0 !important`
- 图标（18px）居中显示
- 折叠时 JS 动态设置 `title` 属性显示 Tooltip：

```javascript
function updateNavTooltips() {
  const collapsed = sidebar.classList.contains('collapsed');
  document.querySelectorAll('.nav-item, .nav-subitem').forEach(item => {
    const textEl = item.querySelector('.nav-text');
    item.title = collapsed && textEl ? textEl.textContent.trim() : '';
  });
}
```

## 面包屑规则

```html
<!-- 正确结构：中间层用 <a>，末级用 <span> -->
<nav class="breadcrumb">
  <a href="index.html">工作台</a>
  <span class="sep">/</span>
  <a href="user.html">用户管理</a>
  <span class="sep">/</span>
  <span>用户列表</span>  <!-- 末级不可点击 -->
</nav>
```

- 最多 3 层，末级不可点击（`<span>`），中间层可点击（`<a>`）
- 面包屑区域：`padding: 10px 20px 0; font-size: 12px`

---

# 六、页面布局结构（Page Layout）

```
┌──────────────────────────────────────────────────────┐
│  TopNav（54px fixed，z-index: 300）                   │
├────────────┬─────────────────────────────────────────┤
│            │  面包屑（10px 20px 0）                   │
│  Sidebar   │  ──────────────────────────────────      │
│(--sidebar-w)│  Page Header                            │
│  fixed     │   ├── h1 标题（19px/700）                │
│            │   ├── 描述（12px/muted）                 │
│            │   └── 右侧操作按钮组                     │
│            │  Filter Card（筛选卡片，margin-bottom 14px）│
│            │  Table Card                              │
│            │   ├── Table Header（标题行 + 批量操作）  │
│            │   ├── Table Body                         │
│            │   └── Pagination                         │
└────────────┴─────────────────────────────────────────┘
```

## Page Header 规范

```css
.page-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 16px; } /* ⚠️ 固定 16px */
.page-title  { font-size: 19px; font-weight: 700; }
.page-desc   { font-size: 12px; color: var(--text-muted); margin-top: 3px; }
```

## 筛选区（Filter Card）

```css
.filter-card { padding: 16px 18px; margin-bottom: 14px; }
.filter-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; } /* ⚠️ 必须用 grid，禁止 flex */
.filter-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 14px; padding-top: 14px; border-top: 1px solid var(--border); }
```

**规则：**
- 筛选字段与「重置」「查询」按钮**同在一个卡片容器内**，不分离
- **强制 4 列网格**，禁止改为 flex 或其他列数
- 超过 **8 个字段**时默认仅显示前 4 个，底部左侧出现「展开更多 ▾」/「收起 ▴」按钮
- 所有筛选输入框使用 `.form-input-sm`（`height: 30px; font-size: 12px`），禁止固定像素宽度
- 日期范围：两个独立字段（开始时间 + 结束时间），相邻放置，不合并
- 底部操作行：左侧「展开/收起」，右侧「重置（Default）」+「查询（Primary）」
- 查询触发：刷新列表，页码重置至第 1 页
- 重置：清空所有字段值，**不自动触发查询**，Toast 提示「筛选条件已重置」

```css
/* 展开/收起按钮 */
.filter-expand-btn {
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 12px; color: var(--primary); cursor: pointer;
  background: none; border: none; padding: 0;
}
.filter-expand-btn svg { width: 12px; height: 12px; transition: transform 0.18s ease; }
.filter-expand-btn.expanded svg { transform: rotate(180deg); }
```

## 批量操作栏（Bulk Action Bar）

- **位置**：表格卡片 header 行右侧，不单独占行，不与筛选区混用
- **默认态**：「列表标题 + 条数 + 每页条数切换」
- **选中态**（有选中时）：切换为「已选 N 项 / 批量操作按钮组 / 取消」，动画过渡 0.2s
- 取消：清空所有选中，header 恢复默认
- 批量删除使用 Danger 色按钮

---

# 七、组件规范（Components）

## 按钮（Button）

| 类型 | 背景 | 文字 | 边框 | 用途 |
|------|------|------|------|------|
| Primary | `--primary` | 白 | 无 | 主操作（新增、保存、查询） |
| Default | `--surface` | `--text-primary` | `--border` | 次级操作 |
| Danger | `--danger` | 白 | 无 | 不可逆操作（删除） |
| Danger-Outline | 白 | `--danger` | `#fca5a5` | 危险二级操作 |
| Ghost | 透明 | `--text-secondary` | 无 | 低优先级（取消） |

**尺寸：**
```css
.btn    { height: 34px; padding: 0 16px; font-size: 13px; border-radius: var(--radius-sm); }
.btn-sm { height: 30px; padding: 0 12px; font-size: 12px; }
.btn-lg { height: 38px; padding: 0 20px; font-size: 14px; }
```

**状态：**
- hover：加深背景或边框
- active：`transform: translateY(1px)`
- disabled：`opacity: 0.45; cursor: not-allowed`
- loading：左侧旋转图标，按钮禁用

## 输入框（Input）

```css
/* 筛选区专用小输入框 */
.form-input-sm {
  height: 30px; padding: 0 9px;
  border: 1px solid var(--border); border-radius: 6px;
  font-size: 12px; font-family: inherit; background: var(--surface);
}
.form-input-sm:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(37,99,235,0.10);
}

/* 表单内标准输入框（弹窗/抽屉） */
.form-input {
  height: 34px; padding: 0 10px;
  border: 1px solid var(--border); border-radius: var(--radius-sm);
  font-size: 13px; font-family: inherit; background: var(--surface);
}
```

## 下拉选择（Select）

- 支持搜索过滤（输入关键词过滤选项）
- 多选模式：已选项以 Tag 形式显示，超出换行
- 级联选择：父子联动，子级随父级变化重置

## 日期选择（DatePicker）

- 单日期 / 日期范围两种模式
- 面板 `z-index: 1000`，定位参考输入框，边界自动避让
- 快捷选项：今天 / 本周 / 本月 / 最近7天 / 最近30天

## Badge（状态标记）

```css
.status-badge {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 2px 8px; border-radius: var(--radius-xs);
  font-size: 11px; font-weight: 600;
  width: fit-content; white-space: nowrap; /* 禁止在宽 td 中撑满 */
}
.status-dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; }
```

> **注意**：`.badge` / `.tag` / `.status-badge` 均须声明 `width: fit-content; white-space: nowrap`。

## 表格操作按钮（行内）

**⚠️ 操作按钮类名唯一合法写法，禁止自造变体：**

| 操作 | 正确 class | 禁止写法 |
|------|-----------|---------|
| 查看 | `action-btn view` | `action-btn detail` / `preview` |
| 编辑 | `action-btn edit` | `action-btn modify` |
| 删除 | `action-btn delete` | **`action-btn del`**（最常见错误） |
| 禁用 | `action-btn disable` | `action-btn ban` / `stop` |
| 复制 | `action-btn copy` | `action-btn clone` |
| 更多 | `action-btn more` | `action-btn extra` |

```css
.action-btn {
  width: 28px; height: 28px; border-radius: 6px;
  display: inline-flex; align-items: center; justify-content: center;
  border: none; cursor: pointer; background: transparent;
  transition: background 0.15s ease, color 0.15s ease;
  flex-shrink: 0;
}
.action-btn.view    { color: var(--success); }
.action-btn.edit    { color: var(--primary); }
.action-btn.delete  { color: var(--danger);  }
.action-btn.disable { color: var(--warning); }
.action-btn.copy    { color: var(--info);    }
.action-btn.more    { color: var(--text-secondary); }

.action-btn.view:hover    { background: var(--success-bg);    color: #15803d; }
.action-btn.edit:hover    { background: var(--primary-light); color: var(--primary-hover); }
.action-btn.delete:hover  { background: var(--danger-bg);    color: #b91c1c; }
.action-btn.disable:hover { background: var(--warning-bg);   color: #b45309; }
.action-btn.copy:hover    { background: var(--info-bg);      color: #0e7490; }
.action-btn.more:hover    { background: var(--surface-hover); color: var(--text-primary); }

[data-theme="dark"] .action-btn.view:hover    { background: rgba(22,163,74,0.15);  }
[data-theme="dark"] .action-btn.edit:hover    { background: rgba(37,99,235,0.15);  }
[data-theme="dark"] .action-btn.delete:hover  { background: rgba(220,38,38,0.15);  }
[data-theme="dark"] .action-btn.disable:hover { background: rgba(217,119,6,0.15);  }
[data-theme="dark"] .action-btn.copy:hover    { background: rgba(8,145,178,0.15);  }
[data-theme="dark"] .action-btn.more:hover    { background: rgba(255,255,255,0.08); }

.action-btn:disabled { opacity: 0.35; cursor: not-allowed; pointer-events: none; }
```

**操作列布局：**
```css
.action-cell { display: flex; align-items: center; gap: 2px; justify-content: flex-end; }
.col-action  { position: sticky; right: 0; background: var(--surface); box-shadow: -2px 0 6px rgba(0,0,0,0.04); white-space: nowrap; }
[data-theme="dark"] .col-action { background: var(--surface); }
```

- 操作数 > 3 个时，次要操作收入「更多」下拉（`action-btn.more`）
- 纯图标按钮必须加 `title` 属性（无障碍）
- **严禁使用统一浅灰色**展示操作按钮

## 业务流程图（SVG Flow · 迭代 Demo）

> 迭代需求「业务流程」Tab 专用。视觉基准：`demo/iteration/component-spec-demo.html#sec-flow`。完整要点与硬限制见该页及 `ITERATION-FR-GUIDE.md` 第四节。

**结构**：`.flow-page` → intro →（仅多图时）`.flow-tab-bar` → `.flow-svg-wrap > svg`（先 `flow-edges` 后 `flow-nodes`）→ 底部共用 `.flow-legend`。

**要点**：能闭环就只用一张图，拆第二张是例外；正交折线、端点落在节点边、驳回/失败必须闭环回起点顶边、一菱形一问题、超 12 字 `tspan` 换行、每张 SVG 独立 `marker id`、`?tab=flow`。

**限制**：手写绝对坐标、无自动避让/折行/重排；禁止因节点多就先拆 Tab；禁用 Mermaid；不进规则抽屉；不接真实状态机；无暗色适配。

---

# 八、表格规范（Table）

## 表头

```css
thead th {
  background: var(--surface-hover);
  font-size: 12px; font-weight: 600;
  color: var(--text-secondary); letter-spacing: 0.5px;
  padding: 10px 12px; border-bottom: 1px solid var(--border);
  white-space: nowrap; position: sticky; top: 0;
}
[data-theme="dark"] thead th { background: rgba(39,51,72,0.8); }
```

## 行样式

```css
tbody tr { height: 48px; border-bottom: 1px solid var(--border); cursor: pointer; }
tbody td { padding: 12px; font-size: 13px; vertical-align: middle; }
tbody tr:hover    { background: rgba(37,99,235,0.04); box-shadow: inset 3px 0 0 var(--primary); }
tbody tr.selected { background: rgba(37,99,235,0.06); box-shadow: inset 3px 0 0 var(--primary); }
```

## 列宽规范（⚠️ 必须使用 `<colgroup>`，禁止完全依赖浏览器自动分配）

| 列类型 | 推荐宽度 |
|--------|---------|
| 序号 / ID | 50–70px |
| 短码 / 状态 | 80–100px |
| 时间戳 | 140–160px |
| 姓名 / 昵称 | 100–130px |
| 手机号 / 证件号 | 130–150px |
| 金额 / 数值 | 100–120px |
| 长文本描述 | 剩余空间（auto） |
| 操作列 | 按按钮数 × 30px |

```css
table { table-layout: fixed; width: 100%; }
td, th { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
```

## 字段截断 Tooltip

- 所有可能截断的 `td` 加 `overflow: hidden; text-overflow: ellipsis; white-space: nowrap`
- 同时设置 `title` 属性为完整内容（浏览器原生 Tooltip 兜底）
- 富内容单元格：自定义 hover 浮层，`z-index: 500`，延迟 300ms 显示，边界自动避让

## 空态

```css
.empty-state svg { opacity: 0.25; } /* ⚠️ 固定 0.25，禁止写 0.3 */
```

居中：64px SVG 插图 + 「暂无数据」（14px/600）+ 说明（12px/muted）

## 加载态

骨架屏：按行数渲染行骨架，高度同数据行，灰色渐变闪烁动画。**不使用**全屏 Spinner 遮盖表格。

---

# 九、分页（Pagination）

```
左：共 N 条，第 X/Y 页
中：首页 / 上一页 / 页码按钮（当前页前后各2页）/ 下一页 / 末页
右：每页条数切换（10 / 20 / 50）
```

```css
.pagination { display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; }
.page-btn   { height: 30px; min-width: 30px; padding: 0 8px; border-radius: 6px; border: 1px solid var(--border); }
/* ⚠️ 高度固定 30px，禁止写 28px */
```

**每页条数选项（必须提供三档）：**
```html
<select class="form-select-sm page-size-select">
  <option value="10">10条/页</option>
  <option value="20" selected>20条/页</option>
  <option value="50">50条/页</option>
</select>
```

- 切换每页条数后重置至第 1 页
- 首页/上一页在第1页时禁用，下一页/末页在末页时禁用

---

# 十、弹窗与抽屉（Modal & Drawer）

## 字段数量决策规则

| 字段数量 | 容器类型 | 理由 |
|---------|---------|------|
| **≤ 6 个字段** | **弹窗（Modal）** | 内容简短，弹窗聚焦效率高 |
| **7–14 个字段** | **抽屉（Drawer）** | 中等复杂度，侧滑不打断上下文 |
| **≥ 15 个字段** | **独立详情页（Detail Page）** | 字段过多，需要充分空间 |

> 字段数量按**可编辑字段**计算。确认删除、状态切换等操作类永远使用**弹窗**。

## 弹窗（Modal）：≤ 6 字段或确认类

| 尺寸 | 宽度 | 适用场景 |
|------|------|---------|
| sm | 420px | 确认删除、简单提示 |
| md | 520px | 简单表单（≤ 4 字段，单列） |
| lg | 640px | 中等表单（5-6 字段，两列） |

**布局规则：** 字段 ≤ 4 个单列；字段 5-6 个两列。

**交互规则：**
- 遮罩 `rgba(0,0,0,0.45)`，普通弹窗点击遮罩关闭，**危险确认弹窗遮罩不可点击关闭**
- ESC 键关闭；打开时 focus 第一个输入框
- Body 超出视口时内部滚动，Header/Footer 固定

```javascript
// 遮罩点击处理标准写法
function handleOverlayClick(event, modalId) {
  const dangerModals = ['confirm-delete-modal', 'batch-delete-modal', 'reject-modal'];
  if (dangerModals.includes(modalId)) return;
  closeModal(modalId);
}
```

## 抽屉（Drawer）：7–14 字段

```
宽度：默认 520px，可拖拽（最小 380px，最大 90vw）
宽度自适应：≥ 700px → 3列；≥ 500px → 2列；< 500px → 1列
分组数量：不超过 6 组，每组有标题 + 底部 1px 分割线
```

## 独立详情页（≥ 15 字段）

```
路由：/module/detail/:id
Page Header：← 返回 / 标题 / 右侧（编辑、删除按钮）
字段网格：≥ 1200px → 3列；≥ 800px → 2列；< 800px → 1列
只读详情：label + value 形式，不使用输入框
```

---

# 十一、表单交互规范（Form Interaction）

**校验时机：**
- 提交时：统一校验所有字段，滚动至第一个错误项
- blur 时：单字段校验，避免输入中报错
- 实时校验：仅限格式类（手机号、邮箱），输入停止 300ms 后触发

**必填标识**：字段 label 后红色 `*`（`color: var(--danger)`）

**重置 vs 取消：**
- 重置：清空表单但不关闭（用于筛选区）
- 取消：不保存直接关闭（用于弹窗/抽屉）

---

# 十二、Toast 通知规范

```css
.toast-container {
  position: fixed;
  top: 66px;   /* ⚠️ 精确值，禁止写 64px */
  right: 22px; /* ⚠️ 精确值，禁止写 20px */
  z-index: 9998;
  display: flex; flex-direction: column; gap: 8px;
}
.toast { min-width: 200px; max-width: 340px; padding: 11px 13px 11px 14px; border-left: 3px solid; border-radius: var(--radius); }
```

| 类型 | 左边框色 | 图标 |
|------|---------|------|
| 成功 | `--success` | ✓ |
| 错误 | `--danger` | ✕ |
| 警告 | `--warning` | ⚠ |
| 信息 | `--info` | ℹ |

- 持续：2.5s 后右滑淡出（`transform: translateX(120%)`）
- 支持手动关闭（右侧 × 按钮）

---

# 十三、权限控制规范（Permission）

- 无权限操作：按钮 `disabled`，**不隐藏**，保持布局稳定
- disabled 按钮 hover：显示 Tooltip「暂无操作权限」
- 无权限页面：显示 403 错误页，不跳转登录
- 数据脱敏：无查看权限的字段显示 `****`

---

# 十四、危险操作规范

**删除确认弹窗**（必须）：

```
标题：确认删除？
内容：即将删除「{对象名称}」，此操作不可撤销。
按钮：取消（左，Default）/ 确认删除（右，Danger）
遮罩：点击不关闭（防误触）
```

**批量删除**：同上，内容改为「即将删除 N 条记录，此操作不可撤销。」

---

# 十五、主题切换规范（Theme Switching）

**⚠️ 初始化脚本必须内联在 `<head>` 内、所有 CSS `<link>` 之前，防止深色模式下刷新闪白：**

```html
<head>
  <meta charset="UTF-8">
  <!-- 主题初始化：必须在所有 CSS 加载之前执行 -->
  <script>
    (function() {
      var saved = localStorage.getItem('theme');
      var prefer = window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', saved || prefer);
    })();
  </script>
  <link rel="stylesheet" href="...">
</head>
```

```javascript
function toggleTheme() {
  const cur  = document.documentElement.getAttribute('data-theme');
  const next = cur === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}
```

- 过渡：`transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease`

---

# 十六、响应式断点（Responsive Breakpoints）

> 管理后台以桌面端为主，移动端降级展示。

| 断点名 | 宽度 | 行为 |
|--------|------|------|
| xs | < 640px | 侧边栏隐藏，顶部汉堡菜单；表格横向滚动；弹窗全屏 |
| sm | 640-768px | 侧边栏收起（图标模式）；抽屉宽度 100vw |
| md | 768-1024px | 侧边栏可展开；表单 2 列 |
| lg | 1024-1280px | 标准布局；抽屉默认 520px |
| xl | ≥ 1280px | 宽屏；内容区 max-width 1680px |

**表单列数自适应：**

| 容器宽度 | 表单列数 |
|---------|---------|
| ≥ 700px | 3 列 |
| ≥ 500px | 2 列 |
| < 500px | 1 列 |

**移动端降级规则：**
- 表格：横向滚动，操作列 `position: sticky; right: 0`
- 弹窗：宽度 `calc(100vw - 32px)`，最大高度 `85vh`
- 抽屉：宽度 `100vw`，从底部滑入（bottom sheet 模式）

---

# 十七、特殊表单字段规范

## 级联选择（Cascader）
- 父子三级联动，子级随父级变化重置
- 下拉面板多列并排展示（每级一列）

## 日期范围（DateRange）
- 开始/结束日期联动，开始不得晚于结束
- 清空时两个字段同时清空
- 快捷选项：今天 / 本周 / 本月 / 最近7天 / 最近30天

## 富文本（RichText）
- 工具栏：B / I / U / 有序列表 / 无序列表 / 链接 / 图片
- 最小高度 120px，最大高度 400px（内部滚动）
- 暗色模式工具栏和编辑区背景同步切换

## 文件上传（Upload）
- 支持拖拽 + 点击，格式/大小限制显示在组件下方
- 上传中：进度条显示百分比
- 已上传：文件名 + 大小 + 预览图（图片类）+ 删除

## 数字输入（NumberInput）
- 右侧 +/− 步进按钮
- 支持最大值/最小值/步长/精度配置
- 超限时边框红色提示

---

# 十八、错误页规范（Error Pages）

| 页面 | 状态码 | 标题 | 说明 | 操作 |
|------|--------|------|------|------|
| 无权限 | 403 | 访问受限 | 您没有权限访问此页面 | 返回首页 |
| 未找到 | 404 | 页面不存在 | 您访问的页面已移动或删除 | 返回首页 |
| 服务异常 | 500 | 服务器错误 | 系统开小差了，请稍后重试 | 刷新 / 联系管理员 |
| 网络异常 | — | 网络中断 | 请检查您的网络连接 | 重试 |

**样式规范：**
- 居中布局，SVG 插图（light/dark 各一套）
- 状态码大字：64px，font-weight 700，`var(--primary-light)` 色
- 标题 24px，说明 14px `var(--text-muted)`

---

# 十九、导出与打印规范（Export & Print）

## Excel 导出
- 列宽：文字列 ≥ 15，编码列 ≥ 12，数字列 ≥ 10
- 表头：加粗，背景色 `#dbeafe`
- 状态列：导出中文文字（如「在售」），不导出 HTML 标签
- 日期列：格式 `YYYY-MM-DD`
- 文件名：`{模块名}_{YYYYMMDD}.xlsx`

## 打印样式（`@media print`）
- 隐藏：TopNav、Sidebar、操作按钮、分页、筛选区
- 表格：铺满宽度，黑色边框，无 hover 效果

---

# 二十、ESC 关闭优先级

```
危险确认弹窗（最高优先级）
  ↓ 关闭后
编辑抽屉
  ↓ 关闭后
详情抽屉
  ↓ 关闭后
其他浮层 / 下拉菜单（最低优先级）
```

同时存在多个浮层时，ESC 只关闭最顶层，不级联关闭。

---

# 二十一、自检清单（Checklist）

生成或评审页面前必须逐项确认：

**CSS 变量与精确值：**
- [ ] `--sidebar-w` 已声明，且全站所有页面取值一致
- [ ] `--shadow-xl` 变量已声明，`--bg` 变量已声明
- [ ] Toast `top: 66px; right: 22px`（精确值，不是 64/20）
- [ ] `.page-header { margin-bottom: 16px }`（不是 20px）
- [ ] 空态 SVG `opacity: 0.25`（不是 0.3）
- [ ] 所有色值使用 CSS 变量，`[data-theme="dark"]` 下均有覆盖

**类名规范：**
- [ ] 删除按钮为 `action-btn delete`（不是 `del`）
- [ ] Badge 信息类使用 `badge-info`（不是 `badge-primary`）
- [ ] Dark 模式 `.badge-info` 已适配

**导航与布局：**
- [ ] TopNav 高度 54px，`z-index: 300`
- [ ] Sidebar 宽度由 `--sidebar-w` 统一控制，全站一致，`fixed top: 54px`
- [ ] 面包屑：中间层 `<a>`，末级 `<span>`，最多3层
- [ ] 折叠态菜单有 `updateNavTooltips()` 实现

**主题与动效：**
- [ ] 主题初始化脚本在 `<head>` 最前（CSS link 之前）
- [ ] 有 `@media (prefers-reduced-motion: reduce)` 声明

**筛选区：**
- [ ] 布局使用 `grid repeat(4,1fr)`，禁止 flex
- [ ] 字段 > 8 个时有展开/收起按钮，前 4 个默认显示
- [ ] 所有筛选输入框使用 `.form-input-sm`（30px 高）
- [ ] 重置有 Toast 提示，不自动触发查询

**表格：**
- [ ] 有 `<colgroup>` 列宽约束
- [ ] 操作按钮使用语义色系（查看绿/编辑蓝/禁用橙/删除红）
- [ ] 操作数 > 3 时收入「更多」下拉
- [ ] 纯图标操作按钮均有 `title` 属性
- [ ] 操作列 `.col-action` sticky right + dark 模式背景适配

**分页：**
- [ ] 分页按钮 `height: 30px; min-width: 30px`（不是 28px）
- [ ] 每页条数有 10 / 20 / 50 三个选项

**弹窗：**
- [ ] 弹窗字段数 ≤ 6，超出改用抽屉，≥ 15 用独立详情页
- [ ] 危险确认弹窗遮罩不可点击关闭
- [ ] 无权限按钮 disabled 不隐藏

**交互与通知：**
- [ ] 骨架屏加载态已实现（非全屏 Spinner）
- [ ] 空态 SVG + 主文字 + 说明已实现
- [ ] ESC 关闭优先级正确
- [ ] 导出文件名含模块名 + 日期

---

*Skill 版本 v1.1，同步自 UIUX.md，2026-04-29*
