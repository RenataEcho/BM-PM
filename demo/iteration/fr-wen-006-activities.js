(() => {
  'use strict';
  const $ = s => document.querySelector(s);
  if (new URLSearchParams(location.search).get('embed') === '1') document.documentElement.classList.add('embedded');
  const scenes = [
    ['home','工作台首页','活动中心置于右豹动态上方，无筛选，展示前 3 条。'],
    ['center','活动中心列表','统一项目标识、活动摘要和数据层级，保留四项筛选。'],
    ['detail','详情 · 全配置','完整头部、连续介绍、分组案例与榜单；关闭回列表。'],
    ['training','详情 · 公益培训营','参考移动端头部优化 PC 信息；介绍使用原截图海报节选，无多余空 Tab。'],
    ['empty','空态与无结果','全部无活动与单筛选无结果使用不同反馈。'],
    ['error','加载失败与重试','列表与详情分别失败，支持重试与关闭。'],
    ['edge','长内容与缺失信息','64 字名称、多标签、长表格；未知数值不以 0 替代。']
  ];
  let scene = 'home', tab = 'fe', review = false, previousFocus;
  const frame = $('#pc-preview');
  const send = payload => frame.contentWindow.postMessage({type:'fr-wen-006:control',...payload},location.origin);
  function setScene(next) {
    scene = next;
    const current = scenes.find(s => s[0] === next) || scenes[0];
    $('#scene-title').textContent = current[1]; $('#scene-desc').textContent = current[2];
    $('#scenes').innerHTML = scenes.map(([id,title,desc]) => `<button class="scene ${id === scene ? 'active' : ''}" data-scene="${id}" aria-pressed="${id === scene}">${title}<small>${desc}</small></button>`).join('');
    $('#list-state').value = next === 'empty' ? 'empty' : next === 'error' ? 'error' : next === 'edge' ? 'long' : 'normal';
    $('#detail-state').value = 'normal'; $('#button-scope').value = 'intro';
    send({scene:next});
  }
  frame.addEventListener('load', () => send({scene}));
  window.addEventListener('message', e => {
    if (e.origin !== location.origin || e.source !== frame.contentWindow) return;
    if (e.data?.type === 'fr-wen-006:escape') setReview(false);
    if (e.data?.type === 'fr-wen-006:state') {
      $('#list-state').value=e.data.listState;$('#detail-state').value=e.data.detailState;$('#button-scope').value=e.data.buttonScope;
    }
  });
  function setTab(next) {
    tab = next === 'flow' ? 'flow' : 'fe';
    for (const name of ['fe','flow']) {
      $(`#view-${name}`).hidden = name !== tab;
      const b = $(`[data-tab="${name}"]`); b.classList.toggle('active',name === tab); b.setAttribute('aria-selected',name === tab);b.tabIndex=name===tab?0:-1;
    }
    const url = new URL(location.href); url.searchParams.set('tab',tab); history.replaceState(null,'',url);
  }
  function setReview(open) {
    if (open) closeRules(false);
    review = open; document.documentElement.classList.toggle('review',open); $('#review-exit').hidden=!open;
    if(window.parent!==window){
      try{window.parent.document.documentElement.classList.toggle('fr-review',open);}catch(_){window.parent.postMessage({type:'fr-review',active:open},location.origin);}
    }
    (open ? $('#review-exit') : $('#review-open')).focus();
  }
  const rules = {
    fe: `<div class="rule-content"><h3>1 业务目标</h3><p>仅优化右豹 PC 活动发现、列表与详情阅读；PC 与移动端的活动信息、业务规则和数据口径一致。</p><h3>2 页面与入口</h3><ul><li>首页右侧「右豹动态」上方增加「活动中心」，最多展示前 3 条，不带筛选；「查看全部」进入活动中心。</li><li>服务增长 → 活动中心：保留全部、进行中、已结束、已参与；卡片与首页采用同一信息层级，中心保留既有导航。</li><li>摘要及卡片打开同一活动的右侧宽抽屉；完整名称、起止时间、人数、标签及允许展示的封面在顶部呈现。</li></ul><h3>3 交互规则</h3><ul><li>介绍有效模块连续展示，不把后台子 Tab 外露；案例按标题和媒体分组，榜单按原开关、数量、脱敏数据和描述展示；开启空榜保留 Tab。</li><li>奖励只展示现有返回结果，不自行计算中奖或增加领取。</li><li>最多 2 个原配置按钮，文案及动作沿用现状。[待确认] 跨 Tab 范围和非跳转状态；场景台提供两种条件分支，不据此定规则。</li><li>详情覆盖背景，正文独立滚动，关闭回到原筛选、位置及焦点；支持遮罩、关闭按钮、Esc，Esc 每次只关最上层。</li></ul><h3>4 边界规则</h3><ul><li>Logo 与封面分开，真实取值与多项目策略 [待确认]；截图裁取 Logo 仅作视觉样例。</li><li>首页选取排序、已参与、浏览/参与人数含虚实值组合沿用核实后的现状 [待确认]，不由打开或点击推导参与。</li><li>未知时间/人数显示 —，真实 0 保留；不可见内容不展示；加载、空态和失败分别反馈。</li><li>媒体和链接真实行为 [待确认]。演示只给预览反馈，不执行真实业务。</li></ul><h3>5 业务流程</h3><p>见本页业务流程。</p></div>`,
    admin: `<div class="rule-content"><h3>1 本次无后台增量</h3><p>不调整现有活动后台、配置字段、数据表、接口配置、权限及运营流程，因此不提供管理后台页签。</p><h3>2 沿用现有配置</h3><p>标题 64 字、描述 40 字、多标签、方形封面、介绍最多 6 个模块、案例图文视频、榜单开关及数量、最多 2 个详情按钮、奖励结果开关均沿用现状。</p><h3>3 核实边界</h3><p>可见性、置顶与排序、参与关系、人数统计、奖励计算发放及按钮真实行为需对照既有实现；不在本次定义新规则。平台、赛道等后台字段不因有值就新增公开展示。</p></div>`
  };
  function showRuleTab(name) {
    $('#rules-body').innerHTML=rules[name];$('#rules-body').scrollTop=0;
    document.querySelectorAll('[data-rule]').forEach(b=>{const selected=b.dataset.rule===name;b.classList.toggle('active',selected);b.setAttribute('aria-selected',selected);b.tabIndex=selected?0:-1;});
  }
  function openRules() {
    if(!$('#rule-drawer').hidden){closeRules();return;}
    previousFocus=document.activeElement;showRuleTab('fe');$('#workspace').inert=true;
    $('#rule-overlay').hidden=false;$('#rule-drawer').hidden=false;
    $('#rule-overlay').classList.add('open');$('#rule-drawer').classList.add('open');$('#rules-open').setAttribute('aria-expanded','true');$('#rules-close').focus();
  }
  function closeRules(restore=true) {
    if($('#rule-drawer').hidden)return;
    $('#rule-overlay').classList.remove('open');$('#rule-drawer').classList.remove('open');$('#rule-overlay').hidden=true;$('#rule-drawer').hidden=true;
    $('#workspace').inert=false;$('#rules-open').setAttribute('aria-expanded','false');if(restore)(previousFocus||$('#rules-open')).focus();
  }
  document.addEventListener('click', e=>{
    const b=e.target.closest('button');if(!b)return;
    if(b.dataset.scene)setScene(b.dataset.scene);
    if(b.dataset.tab)setTab(b.dataset.tab);
    if(b.dataset.rule)showRuleTab(b.dataset.rule);
    if(b.id==='rules-open')openRules();if(b.id==='rules-close')closeRules();
    if(b.id==='review-open')setReview(true);if(b.id==='review-exit')setReview(false);
  });
  $('#rule-overlay').addEventListener('click',()=>closeRules());
  $('#list-state').addEventListener('change',e=>send({listState:e.target.value}));
  $('#detail-state').addEventListener('change',e=>send({detailState:e.target.value}));
  $('#button-scope').addEventListener('change',e=>send({buttonScope:e.target.value}));
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){if(!$('#rule-drawer').hidden){e.preventDefault();closeRules();}else if(review){e.preventDefault();send({escape:true});}return;}
    if(e.key==='Tab'&&!$('#rule-drawer').hidden){const focusable=[...$('#rule-drawer').querySelectorAll('button,[href],select,[tabindex="0"]')].filter(el=>el.tabIndex>=0);const first=focusable[0],last=focusable.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}
    const group=e.target.closest('.page-tabs,.rule-tab-bar');if(group&&['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const buttons=[...group.querySelectorAll('button')];let i=buttons.indexOf(e.target);i=e.key==='Home'?0:e.key==='End'?buttons.length-1:(i+(e.key==='ArrowRight'?1:-1)+buttons.length)%buttons.length;buttons[i].click();buttons[i].focus();}
  });
  // 手写绝对坐标；不使用布局引擎。
  const rect=(x,y,w,h,lines,kind='fe')=>{const colors={fe:['#eff6ff','#2563eb'],be:['#f0fdf4','#16a34a'],fail:['#fef2f2','#dc2626'],skip:['#f1f5f9','#94a3b8']};const [fill,stroke]=colors[kind];return `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${fill}" stroke="${stroke}"/><text x="${x+w/2}" y="${y+h/2-(lines.length-1)*9+4}" text-anchor="middle" font-size="12" fill="#18222f">${lines.map((l,i)=>`<tspan x="${x+w/2}" dy="${i?18:0}">${l}</tspan>`).join('')}</text></g>`;};
  const diamond=(cy,text)=>`<g><polygon points="440,${cy-45} 550,${cy} 440,${cy+45} 330,${cy}" fill="#fffbeb" stroke="#d97706"/><text x="440" y="${cy+4}" text-anchor="middle" font-size="12" fill="#18222f">${text}</text></g>`;
  const edge=(points)=>`<polyline points="${points}" marker-end="url(#fr006-arrow)"/>`;
  $('#flow-chart').innerHTML=`<svg width="1000" height="1450" viewBox="0 0 1000 1450" role="img" aria-labelledby="flow-title flow-desc"><title id="flow-title">PC活动浏览业务流程</title><desc id="flow-desc">从工作台或活动中心读取既有可见数据，失败回到入口重试，详情不可见回入口，正常关闭返回来源上下文。</desc><defs><marker id="fr006-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#94a3b8"/></marker></defs><g class="flow-edges">${edge('440,104 440,140')}${edge('440,204 440,240')}${edge('440,330 440,375')}${edge('550,285 710,285')}${edge('890,285 940,285 940,20 440,20 440,40')}${edge('440,439 440,480')}${edge('440,544 440,580')}${edge('440,670 440,715')}${edge('550,625 710,625')}${edge('890,625 920,625 920,20 440,20 440,40')}${edge('440,779 440,820')}${edge('440,910 440,955')}${edge('550,865 710,865')}${edge('890,865 900,865 900,20 440,20 440,40')}${edge('440,1019 440,1060')}${edge('440,1150 440,1195')}${edge('550,1105 710,1105')}${edge('800,1137 800,1350 580,1350')}${edge('440,1259 440,1318')}${edge('300,1350 160,1350 160,20 440,20 440,40')}</g><g class="flow-nodes">${rect(300,40,280,64,['进入工作台或活动中心','中心可切换原有筛选'])}${rect(300,140,280,64,['读取现有可见活动与排序','首页只取前 3 条'], 'be')}${diamond(285,'列表加载成功？')}${rect(710,253,180,64,['显示加载失败','重试回入口'],'fail')}${rect(300,375,280,64,['展示摘要 / 卡片','空结果显示对应空态'])}${rect(300,480,280,64,['点击活动','请求对应活动详情'], 'be')}${diamond(625,'详情加载成功？')}${rect(710,593,180,64,['显示失败，可重试','或关闭回入口'],'fail')}${rect(300,715,280,64,['获取现有活动可见状态','不新增权限判定'], 'be')}${diamond(865,'活动仍可见？')}${rect(710,833,180,64,['停止展示正文与操作','关闭回入口'],'fail')}${rect(300,955,280,64,['按配置展示头部与有效 Tab','介绍 / 案例 / 榜单'])}${diamond(1105,'当前有配置按钮？')}${rect(710,1073,180,64,['无按钮区','阅读或直接关闭'],'skip')}${rect(300,1195,280,64,['沿用原按钮文案与行为','跨 Tab 范围待核实'])}${rect(300,1318,280,64,['关闭详情','返回原筛选 / 位置 / 焦点'])}<g font-size="11" fill="#16a34a"><text x="451" y="352">是</text><text x="451" y="695">是</text><text x="451" y="937">是</text><text x="451" y="1177">是</text></g><g font-size="11" fill="#dc2626"><text x="610" y="274">否</text><text x="610" y="614">否</text><text x="610" y="854">否</text><text x="610" y="1094">否</text></g><text x="172" y="1260" font-size="11" fill="#4a5568">继续浏览 / 回到原入口</text></g></svg>`;
  setTab(new URLSearchParams(location.search).get('tab'));setScene('home');
})();
