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
  var STATUS_BUCKET = { '待开始': '进行中', '开发中': '进行中', '已上线': '归档', '已暂停': '废纸篓' };
  var STATUS_KEY = 'bm-pm-fr-statuses';
  function currentStatuses() {
    try { return JSON.parse(localStorage.getItem(STATUS_KEY) || '{}'); } catch (e) { return {}; }
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
    return { line: line, view: view };
  }

  function lineName(id) {
    for (var i = 0; i < LINES.length; i++) {
      if (LINES[i].id === id) return LINES[i].label;
    }
    return LINES[0].label;
  }

  function render(container) {
    var state = parseHash();
    var html = [];
    ITEMS.forEach(function (item) {
      var current = state.view === item.id;
      html.push(
        '<a class="nav-item' + (current ? ' active' : '') + '" href="#' + state.line + '/' + item.id + '"' +
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
    ['进行中', '归档', '废纸篓'].forEach(function (group) {
      if (!groups[group]) return;
      html.push('<div class="nav-group-label">' + group + '（' + groups[group].length + '）</div>');
      groups[group].forEach(function (entry) {
        var demo = entry.demo;
        html.push('<a class="nav-item' + (state.view === demo.id ? ' active' : '') + '" href="#' + demo.line + '/' + demo.id + '"' + (state.view === demo.id ? ' aria-current="page"' : '') + '>' + demo.label + '</a>');
      });
    });
    container.innerHTML = html.join('');
  }

  function init() {
    document.querySelectorAll('[data-iteration-sidebar]').forEach(render);
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

  window.addEventListener('hashchange', init);
})();
