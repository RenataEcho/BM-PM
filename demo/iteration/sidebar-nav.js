(function () {
  var LINES = [
    { id: 'youbao', label: '右豹主业务' },
    { id: 'mentor', label: '导师商务' },
    { id: 'enterprise', label: '企业号' }
  ];
  var ITEMS = [
    { id: 'overview', label: '概览' },
    { id: 'components', label: '组件规范' }
  ];
  // 登记行是导航与路由的唯一来源，避免新增需求后仍打开旧 Demo。
  function demos() {
    return Array.from(document.querySelectorAll('#view-overview tr[data-id][data-line]')).map(function (row) {
      return { id: row.dataset.id, line: row.dataset.line, label: row.cells[1].textContent,
        status: row.querySelector('[data-status-select]').value, url: row.dataset.demo,
        title: row.cells[0].textContent + ' · ' + row.cells[1].textContent };
    });
  }
  var STATUS_BUCKET = { '待开始': '待开始', '开发中': '进行中', '已上线': '归档', '已暂停': '废纸篓' };
  var GROUP_ORDER = ['待开始', '进行中', '归档', '废纸篓'];
  var STATUS_KEY = 'bm-pm-fr-statuses-20261113';
  var COLLAPSE_KEY = 'bm-pm-sidebar-groups';
  var SHELL = 'framework-shell.html?v=20261113-status';
  function currentStatuses() {
    try { return JSON.parse(localStorage.getItem(STATUS_KEY) || '{}'); } catch (e) { return {}; }
  }
  function readCollapsed() {
    try { return JSON.parse(localStorage.getItem(COLLAPSE_KEY) || '{}'); } catch (e) { return {}; }
  }
  function collapsedFor(line) {
    var map = readCollapsed();
    return map[line] || {};
  }
  function setCollapsed(line, group, collapsed) {
    var map = readCollapsed();
    if (!map[line]) map[line] = {};
    map[line][group] = collapsed;
    try { localStorage.setItem(COLLAPSE_KEY, JSON.stringify(map)); } catch (e) {}
  }
  function shellHref(hash) {
    return (document.getElementById('view-overview') ? '' : SHELL) + hash;
  }
  function ensureGroupStyle() {
    if (document.getElementById('bm-nav-group-style')) return;
    var style = document.createElement('style');
    style.id = 'bm-nav-group-style';
    style.textContent = [
      '.nav-group{margin-top:6px}',
      '.nav-group-label{display:flex;align-items:center;gap:6px;width:calc(100% - 16px);margin:2px 8px;padding:8px 8px 8px 10px;border:0;border-radius:8px;background:transparent;color:var(--text-muted,#9aa5b4);cursor:pointer;font-family:inherit;font-size:11px;font-weight:600;line-height:1.4;text-align:left}',
      '.nav-group-label:hover{background:rgba(99,102,241,0.06);color:var(--text-primary,#18222f)}',
      '.nav-group-caret{width:0;height:0;flex:0 0 auto;border-style:solid;border-width:4px 0 4px 5px;border-color:transparent transparent transparent currentColor;transform-origin:2px 4px;transition:transform .18s}',
      '.nav-group-label[aria-expanded="true"] .nav-group-caret{transform:rotate(90deg)}',
      '.nav-group-items[hidden]{display:none !important}'
    ].join('');
    document.head.appendChild(style);
  }

  function parseHash() {
    var raw = (location.hash || '').replace(/^#/, '');
    var line = 'youbao';
    var view = 'overview';
    if (raw === 'components') view = 'components';
    else if (raw && raw !== 'overview') {
      var parts = raw.split('/');
      if (LINES.some(function (item) { return item.id === parts[0]; })) line = parts[0];
      if (demos().some(function (demo) { return demo.line === line && demo.id === parts[1]; })) view = parts[1];
      if (parts[1] === 'components' || raw === 'components') view = 'components';
    }
    var page = location.pathname.split('/').pop();
    if (page.indexOf('fr-coco-002-') === 0) line = 'mentor';
    return { line: line, view: view };
  }

  function lineName(id) {
    for (var i = 0; i < LINES.length; i++) {
      if (LINES[i].id === id) return LINES[i].label;
    }
    return LINES[0].label;
  }

  function render(container, options) {
    ensureGroupStyle();
    var state = parseHash();
    var html = [];
    var focusedGroup = document.activeElement && document.activeElement.getAttribute && document.activeElement.closest('[data-iteration-sidebar]') === container
      ? document.activeElement.getAttribute('data-nav-group') : '';
    ITEMS.forEach(function (item) {
      var current = state.view === item.id;
      html.push(
        '<a class="nav-item' + (current ? ' active' : '') + '" href="' + shellHref('#' + state.line + '/' + item.id) + '"' +
        (current ? ' aria-current="page"' : '') + '>' + item.label + '</a>'
      );
    });
    var statuses = currentStatuses();
    var lineDemos = demos().filter(function (demo) { return demo.line === state.line; });
    var groups = {};
    lineDemos.forEach(function (demo) {
      var status = statuses[demo.id] || demo.status;
      var group = STATUS_BUCKET[status] || '进行中';
      (groups[group] || (groups[group] = [])).push({ demo: demo, status: status });
    });
    var folded = collapsedFor(state.line);
    if (!(options && options.keepCollapsed)) {
      GROUP_ORDER.forEach(function (group) {
        if (!groups[group]) return;
        if (groups[group].some(function (entry) { return entry.demo.id === state.view; }) && folded[group]) {
          setCollapsed(state.line, group, false);
          folded[group] = false;
        }
      });
    }
    GROUP_ORDER.forEach(function (group, index) {
      if (!groups[group]) return;
      var open = !folded[group];
      var panelId = 'nav-group-' + state.line + '-' + index;
      html.push('<div class="nav-group">');
      html.push('<button type="button" class="nav-group-label" data-nav-group="' + group + '" aria-expanded="' + (open ? 'true' : 'false') + '" aria-controls="' + panelId + '"><span class="nav-group-caret" aria-hidden="true"></span><span>' + group + '（' + groups[group].length + '）</span></button>');
      html.push('<div class="nav-group-items" id="' + panelId + '"' + (open ? '' : ' hidden') + '>');
      groups[group].forEach(function (entry) {
        var demo = entry.demo;
        html.push('<a class="nav-item' + (state.view === demo.id ? ' active' : '') + '" href="' + shellHref('#' + demo.line + '/' + demo.id) + '"' + (state.view === demo.id ? ' aria-current="page"' : '') + '>' + demo.label + '</a>');
      });
      html.push('</div></div>');
    });
    container.innerHTML = html.join('');
    if (focusedGroup) {
      var next = container.querySelector('[data-nav-group="' + focusedGroup + '"]');
      if (next) next.focus();
    }
  }

  function init(options) {
    document.querySelectorAll('[data-iteration-sidebar]').forEach(function (container) {
      render(container, options);
    });
  }

  window.bmDemos = demos;
  window.bmRefreshSidebar = init;
  window.bmParseHash = parseHash;
  window.bmLineName = lineName;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.addEventListener('hashchange', function () { init(); });
  document.addEventListener('click', function (event) {
    var button = event.target.closest('[data-nav-group]');
    if (!button || !button.closest('[data-iteration-sidebar]')) return;
    event.preventDefault();
    var state = parseHash();
    setCollapsed(state.line, button.getAttribute('data-nav-group'), button.getAttribute('aria-expanded') === 'true');
    init({ keepCollapsed: true });
  });
})();
