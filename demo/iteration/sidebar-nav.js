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

  function parseHash() {
    var raw = (location.hash || '').replace(/^#/, '');
    var line = 'youbao';
    var view = 'overview';
    if (raw === 'components') view = 'components';
    else if (raw && raw !== 'overview') {
      var parts = raw.split('/');
      if (LINES.some(function (item) { return item.id === parts[0]; })) line = parts[0];
      if (line === 'youbao' && parts[1] === 'fr-001') view = 'fr-001';
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
    if (state.line === 'youbao') {
      html.push('<div class="nav-group-label">迭代需求</div><a class="nav-item' + (state.view === 'fr-001' ? ' active' : '') + '" href="#youbao/fr-001"' + (state.view === 'fr-001' ? ' aria-current="page"' : '') + '>剪辑手供稿书籍填写优化</a>');
    }
    container.innerHTML = html.join('');
  }

  function init() {
    document.querySelectorAll('[data-iteration-sidebar]').forEach(render);
  }

  window.bmParseHash = parseHash;
  window.bmLineName = lineName;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.addEventListener('hashchange', init);
})();
