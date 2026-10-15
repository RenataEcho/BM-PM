<!-- bmad:context -->
<!-- Verified 2026-10-15 against the working tree; no git commit yet. Managed by bmad-project-context; edits inside this block are replaced on refresh. Keep anything you want preserved outside the markers. -->

## BM-PM

需求文档和静态 HTML Demo 仓。规划在 `_bmad-output/planning-artifacts/`，项目知识在 `docs/`。

## Policy

- 新增量另开 `demo/iteration/fr-*.html`。已上线、已归档，或别人名下的 FR 页面不回改。
- 不另起配色和组件样式。C 端主视觉以 `docs/design/移动端设计规范.md` 为准；迭代外壳以 `docs/design/iteration-shell/DESIGN.md` 为准；管理后台以 `docs/design/admin-ui-spec.md` 为准。按钮、弹窗、抽屉、Tag、流程图从 `demo/iteration/component-spec-demo.html` 复制 class。
- 全局编号是 `FR-0xx`，先占号再写。PRD 正文里的 `FR-n` 只表示本增量第 n 条。
- 新需求先写明业务线，再做设计。业务线是「右豹主业务」「导师商务」「企业号」。
- Demo 不接真实接口、登录、权限和持久化。
- 一次提交只含这一条需求改过的文件。说明用 `feat(FR-0xx): …`；只改已有页上一句话时用 `fix(FR-0xx): …`。浏览器下载和本地日志不要加入。

## Where things are

- 同事的新需求以 `docs/需求单.md` 为输入；落地步骤见 `docs/需求输出规范.md`。写 FR Demo 时先读 `docs/ITERATION-FR-GUIDE.md`。
- 新 PRD 放 `_bmad-output/planning-artifacts/prds/prd-{项目名}-日期/prd.md`；视觉与行为放同日期的 `ux-designs/ux-{项目名}-日期/DESIGN.md` 与 `EXPERIENCE.md`。这两份和 Demo 冲突时，以这两份为准，改 Demo。写法见 `docs/需求输出规范.md`。
- 需求合同写到 `_bmad-output/specs/spec-{slug}/SPEC.md`。目录还没有，写的时候建。
- 需求规则抽屉只写当前 FR。流程说明只指向页内「业务流程」Tab。
- 登记写两处，不拷旧仓 FR 清单。文件没有就先建空壳。根目录 `README.md` 的「迭代需求」表加一行，并写上业务线。总览页先切到该业务线，再在进行中列表加一行，行上 `data-line` 为 `youbao`、`mentor` 或 `enterprise`。已上线进归档，已暂停进废纸篓。业务线是顶部一级菜单。点开后左侧同一组是「概览 / 组件规范」，不按业务线拆成不同菜单。页头保持当前业务线，切换左侧这两项不改页头。新需求先写明业务线，再做设计。

## Running and verifying

- 本地预览用 `python3 -m http.server 19889 --directory demo/iteration`。预览入口写在根目录 `README.md`。总览页是 `demo/iteration/framework-shell.html`。FR 页深链参数是 `?tab=fe|admin|flow`。

## Conventions that differ from defaults

- 需求文档和 Demo 文案用中文。未确认的口径标 `[ASSUMPTION]`，页面上也可以写 `[待确认]`。
- 业务流程图手写 SVG，不用 Mermaid。写「业务流程」Tab 时按 `docs/ITERATION-FR-GUIDE.md` 第四节。

<!-- /bmad:context -->
