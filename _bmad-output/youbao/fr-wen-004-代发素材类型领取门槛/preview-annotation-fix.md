---
title: 'FR-wen-004 预览批注兼容修复'
type: bugfix
created: '2026-11-05'
status: done
route: oneshot
review_loop_iteration: 0
---

<frozen-after-approval reason="用户确认保留现有改动并继续修复">

## Intent

修复 Codex 预览中手机 iframe 区域无法选取批注目标、进入标注后光标消失的问题。保留现有缩放及光标修改，增加同页批注视图，复制当前画面及滚动位置，让外层文档可以直接命中文案和控件；退出后恢复原 iframe 和内存演示状态。仅修改 FR-wen-004，mockups 保持一致。

</frozen-after-approval>

## Implementation Notes

- 已确认手机内容在 iframe 内，外层文档命中与鼠标事件不能穿透 iframe；尚未直接验证 Codex 批注器实现。
- 保留 iframe 作为交互视图；批注视图使用父文档普通 DOM 的只读副本，隔离样式与 ID，不接入业务事件，不改变业务状态。
- 验证当前画面、弹窗、滚动位置、不同窗口尺寸、退出恢复、父文档命中和事件传播；Codex 实际批注体验需在客户端最终确认。

- 已修改领取页 HTML / CSS / JS 及同名 mockups：新增批注视图开关，命名空间隔离副本样式和 ID，复制表单状态及所有滚动位置，移除副本 inert 以允许选择目标；保留原 iframe。操作未完成时禁止切换，切场景或 Tab 自动返回交互。
- 浏览器验证通过：外层 document.elementFromPoint 命中具体按钮、点击事件冒泡、详情按钮及账号 Sheet 几何误差小于 2px、滚动误差小于 1px、返回状态保留、640 / 1024 / 1440 宽度、上传隐藏开关、后台 / 流程 Tab、只读表单、Ctrl+C 不被拦截，无页面异常。JS 语法检查、git diff --check、两套副本一致性通过。
- 已请求在 Codex 中打开修复入口；本会话没有可操作 Codex 标注 UI 的工具，实际客户端标注及光标体验仍需用户最终确认，不把 DOM 验证等同于客户端实测。

## Review Triage Log

1. medium / patch：select 可改动副本，浏览器复现；改为禁用并保留透明度，验证通过。
2. medium / patch：已有 220ms 操作会继续修改原状态；正在加载或处理时禁止切换，验证通过。
3. medium / patch：过宽 keydown.preventDefault 会阻挡 Ctrl+C；删除键盘拦截，验证默认行为不被取消。
4. false：已实测详情按钮和 Sheet 几何、嵌套滚动，误差分别小于 2px / 1px。
5. low / rejected：当前 CSS 不含需额外解析的转义标识符或带逗号函数选择器，命名空间改写覆盖现有规则；读取失败已有提示，不为假设未来规则增加解析器。
6. low / rejected：切场景退出静态副本是有意行为，按钮可见文字同步恢复「批注视图」，原需求未要求跨场景持续冻结。
7. maybe-false：尚未客户端实测批注与光标；需用户在预览打开批注视图，再启用 Codex 标注确认。保留这一验证限制。

## Codex 原生批注复验（2026-11-05）

- 用户复验失败后，直接操作 Codex 顶部「批注」复现：同页副本和外层标题都无法选取。原先仅增加副本并未解决初始化问题。
- 对照总览页、独立手机页均能出现蓝色选框及「添加评论」。失败页曾捕获 MutationObserver.observe 参数不是 Node、读取 null.append 的错误；未取得注入脚本堆栈，不将其断言为已确认的客户端根因。
- 本次为手机 iframe 增加 loading="lazy"，调整子文档加载时机。保留同页批注视图和原交互状态。HTML 已同步 mockups。
- 在 Codex 原生 UI 实测：打开批注视图 → 开启顶部批注 → 点击「晚风来信」，出现蓝色选框及「添加评论」输入框，鼠标保持可见；刷新后关闭旧批注、重新打开批注视图及顶部批注，再次选取成功。未发送测试评论。
- 实测截图保存在会话产物 fr-wen-004-native-annotation.jpg。此结果覆盖选取和打开输入框，未验证评论提交。