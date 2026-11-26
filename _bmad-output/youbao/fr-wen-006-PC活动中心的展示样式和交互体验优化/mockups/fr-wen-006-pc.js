(() => {
  'use strict';
  const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
  const esc = v => String(v ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const activities = [
    {id:'zhihu',project:'知乎故事',title:'知乎故事会员有效用户激励重磅回归',description:'百亿补贴、天天分成',start:'2026.11.25 00:00',end:'2026.12.01 23:59',views:518763,joined:40366,tags:['创作激励','会员活动','项目·知乎故事'],status:'进行中',participated:true,tabs:['intro','cases','ranking'],buttons:['查看活动规则','前往项目'],logo:'zhihu',cover:'zhihu'},
    {id:'hongguo',project:'红果网文-漫剧投测',title:'红果网文AIGC漫剧投测限时涨价',description:'发现漫剧创作新机会',start:'2026.11.13 00:00',end:'2026.12.03 23:59',views:527813,joined:40930,tags:['漫剧投测','创作活动'],status:'进行中',tabs:['intro','cases'],buttons:['查看活动规则'],logo:'hongguo',cover:'hongguo'},
    {id:'baidu',project:'百度网盘',title:'百度网盘AI工具+教育工具推广活动上线',description:'AI 工具与教育工具推广活动',start:'2026.10.22 00:00',end:'长期',views:459821,joined:29981,tags:['推广活动','项目·百度网盘'],status:'进行中',tabs:['intro'],buttons:['前往项目'],logo:'baidu',cover:'baidu'},
    {id:'yanyan',project:'知乎故事-海外、盐言故事-海外',title:'知乎&盐言-出海高订单分成激励',description:'优质内容，遇见更多读者',start:'2026.11.18 00:00',end:'2026.12.08 23:59',views:487123,joined:35611,tags:['海外创作','分成激励'],status:'进行中',tabs:['intro','ranking'],buttons:['前往项目'],logo:'yanyan',cover:'yanyan'},
    {id:'xunlei',project:'迅雷网盘',title:'迅雷网盘推广CPS活动激励',description:'网盘推广活动',start:'2026.11.07 00:00',end:'2026.11.30 23:59',views:458922,joined:27614,tags:['CPS活动','项目·迅雷网盘'],status:'进行中',tabs:['intro','ranking'],buttons:['查看活动规则','前往项目'],logo:'xunlei',cover:'xunlei'},
    {id:'keling',project:'可灵AI-TikTok、可灵AI-Instagram',title:'可灵·海外（TikTok、INS）-说唱内容激励活动',description:'海外内容创作活动',start:'2026.11.13 00:00',end:'2026.11.19 23:59',views:257824,joined:15241,tags:['海外活动'],status:'已结束',tabs:['intro','cases'],buttons:[],logo:'keling',cover:'keling'},
    {id:'training',project:'右豹平台',title:'3天右豹生态公益培训营',description:'3天学会选赛道·做项目',start:'2026.07.22 21:00',end:'2026.10.23 23:59',views:345863,joined:192626,tags:['公益培训营','3天学会','项目·活动项目'],status:'已结束',participated:true,tabs:['intro'],buttons:[],logo:'youbao',cover:'training-cover'},
    {id:'zhihu-old',project:'知乎故事',title:'知乎故事会员有效用户激励延期',description:'会员有效用户激励活动',start:'2026.10.22 00:00',end:'2026.11.11 23:59',views:205639,joined:2633,tags:['会员活动'],status:'已结束',tabs:['intro'],buttons:[],logo:'zhihu',cover:'zhihu'},
    {id:'zhihu-order',project:'知乎故事',title:'知乎故事高价订单分成激励',description:'高价订单分成激励活动',start:'2026.11.09 00:00',end:'2026.11.15 23:59',views:396134,joined:60191,tags:['分成激励'],status:'已结束',participated:true,tabs:['intro','ranking'],buttons:[],logo:'zhihu',cover:'zhihu'},
    {id:'festival',project:'—',title:'中秋国庆双节逐鹿榜争霸',description:'双节活动回顾',start:'2026.09.25 00:00',end:'2026.10.18 23:59',views:565789,joined:129338,tags:['双节活动'],status:'已结束',tabs:['intro','ranking'],buttons:[],logo:'festival',cover:'festival'},
    {id:'plan',project:'—',title:'金九银十·字节&右豹生金计划',description:'创作活动与激励计划',start:'2026.09.19 00:00',end:'2026.10.02 23:59',views:4563789,joined:3763915,tags:['创作活动'],status:'已结束',tabs:['intro','cases','ranking'],buttons:[],logo:'plan',cover:'plan'}
  ];
  const filters=['全部','进行中','已结束','已参与'], tabNames={intro:'介绍',cases:'案例',ranking:'榜单'};
  let page='home',filter='全部',listState='normal',detailState='normal',buttonScope='intro',current=null,detailTab='intro',opener=null,sourceScroll=0,sourcePage='home',toastTimer,detailVersion=0;
  const notifyState=()=>window.parent.postMessage({type:'fr-wen-006:state',listState,detailState,buttonScope},location.origin);
  const number = n => n === null || n === undefined ? '—' : String(n);
  const stat = (n,label) => `${label} ${number(n)}`;
  const stateMessage = (title,description='',action='') => `<div class="empty-state"><span class="empty-mark" aria-hidden="true">${title.includes('失败')?'↻':title.includes('查看')?'⊘':'▤'}</span><strong>${title}</strong>${description?`<p>${description}</p>`:''}${action}</div>`;
  const skeletons = count => `<div class="${page==='home'?'':'activity-grid'}" aria-busy="true" aria-label="活动加载中">${Array.from({length:count},()=>'<div class="skeleton-card" aria-hidden="true"><div class="skeleton"></div><div class="skeleton"></div><div class="skeleton"></div></div>').join('')}</div>`;
  function data() {
    if(listState==='empty')return [];
    return activities.map((a,i)=>{
      if(listState==='missing'&&i===0)return {...a,logo:null,cover:false,views:null,joined:0,start:null,end:null,tags:[]};
      if(listState==='long'&&i===0)return {...a,title:'知乎故事会员有效用户激励重磅回归'.repeat(5).slice(0,64),description:'百亿补贴、天天分成',tags:['创作激励','会员有效用户','活动内容完整阅读','长标签换行展示','项目·知乎故事','示例内容'],long:true};
      return a;
    });
  }
  function logo(a,cover=false) {
    const asset=cover?a.cover:a.logo;
    if(!asset)return cover?'':`<span class="project-logo logo-placeholder" aria-hidden="true">◇</span>`;
    return `<img class="${cover?'activity-cover':'project-logo'}" src="fr-wen-006-assets/${asset}.png" alt="" ${cover?'':'loading="lazy"'}>`;
  }
  function card(a) {
    return `<button class="activity-card" data-activity="${a.id}" aria-label="查看活动：${esc(a.title)}"><div class="card-project"><strong>项目·<span class="project-name">${esc(a.project)}</span></strong><span class="status ${a.status==='已结束'?'ended':''}">${a.status}</span></div><div class="card-main">${logo(a)}<div class="card-copy"><h3>${esc(a.title)}</h3><p>${esc(a.description)}</p></div></div><div class="card-time">活动时间：${esc(a.start||'—')} ～ ${esc(a.end||'—')}</div><div class="card-bottom"><div class="card-stats"><span>${stat(a.views,'浏览')}</span><span>${stat(a.joined,'参与')}</span></div></div></button>`;
  }
  function filtered(){return data().filter(a=>filter==='全部'||filter==='已参与'&&a.participated||a.status===filter);}
  function home() {
    return `<div class="home-grid"><div class="home-primary"><section class="hero"><div><span class="eyebrow">OPC 数字生态工作台</span><h2>数据透明 | 秒级提现 | 秒级到账</h2><p>PC 端重点服务高频接单、批量操作、团队协作。收益以平台记录为准。</p></div><div class="hero-buttons"><button class="btn" data-outside>进入项目接单</button><button class="btn" data-outside>查看今日收益</button></div></section><section class="metrics" aria-label="工作台数据"><div class="metric"><span>今日预估</span><strong>¥0.0</strong><small>较昨天持平</small></div><div class="metric"><span>待处理任务</span><strong>0</strong><small>暂无待处理任务</small></div><div class="metric"><span>团队有效成员</span><strong>0</strong><small>今日持平</small></div><div class="metric"><span>待复核事项</span><strong>0</strong><small>0 个需补材料</small></div></section><section class="panel"><div class="panel-head"><h2>我的工作台</h2></div><div class="workspace-placeholder"><span>+</span>设置工作台</div></section><section class="panel tasks"><div class="panel-head"><h2>今日待办</h2><button class="link" data-outside>查看全部</button></div><table><thead><tr><th>项目</th><th>赛道</th><th>摘要</th><th>操作</th></tr></thead></table><div class="task-empty"><span aria-hidden="true">▱</span><p>今日暂无待办</p></div></section></div><aside class="home-secondary"><section class="panel home-activities" aria-labelledby="home-activity-title"><div class="panel-head"><h2 id="home-activity-title" tabindex="-1">活动中心</h2><button class="link" data-page="center">查看全部 →</button></div><div id="home-results" class="compact-list">${listMarkup(true)}</div></section><section class="panel news"><div class="panel-head"><div><h2>右豹动态</h2><p>平台公告与规则更新</p></div><button class="link" data-outside>查看全部</button></div>${[
      ['9','2026-11','从内容生产到项目共创，右豹文化携双业务亮相杭州','平台活动、行业交流与项目合作动态。'],
      ['9','2026-11','从追剧到赴约，右豹文化把AI漫剧带进这座城','发现更多内容创作与行业发展的新机会。'],
      ['20','2026-10','深圳展会｜洞察短剧出海新机遇','汇聚行业伙伴，共同探索内容创作新方向。']
    ].map(([d,m,t,p])=>`<article class="news-item"><div class="news-date">${m}<b>${d}</b></div><div><h3>${t}</h3><p>${p}</p><div class="news-thumb">右豹 · 行业动态</div></div></article>`).join('')}</section></aside></div>`;
  }
  function listMarkup(compact=false) {
    if(listState==='loading')return skeletons(3);
    if(listState==='error')return stateMessage('活动加载失败，请重试','', '<button class="btn btn-ghost" data-retry-list>重试</button>');
    const rows=compact?data().slice(0,3):filtered();
    if(!rows.length)return stateMessage(compact||filter==='全部'?'暂无活动':'暂无符合条件的活动',compact?'':filter==='全部'?'有可查看的活动时会显示在这里。':'可以切换其他筛选继续浏览。');
    return compact?rows.map(card).join(''):`<div class="activity-grid">${rows.map(card).join('')}</div>`;
  }
  function center() {
    return `<section class="center-heading"><div><h1>活动中心</h1><p>活动为额外运营激励；奖励独立展示，不计入常规收益链路，不给关系链分钱</p></div><button class="btn btn-ghost" data-refresh>↻　刷新</button></section><nav class="module-tabs" aria-label="活动中心导航"><button class="active" aria-current="page">活动列表</button><button data-ledger>我的奖励台账</button></nav><div class="center-filter-bar"><div class="activity-filters" role="tablist" aria-label="活动筛选">${filters.map(f=>`<button role="tab" id="filter-${filters.indexOf(f)}" data-filter="${f}" aria-selected="${filter===f}" aria-controls="center-results" tabindex="${filter===f?0:-1}">${f}</button>`).join('')}</div><span class="result-count" id="result-count">${listState==='loading'?'加载中…':listState==='error'?'加载失败':`共 ${filtered().length} 条活动`}</span></div><section id="center-results" class="center-results" role="tabpanel" aria-labelledby="filter-${filters.indexOf(filter)}">${listMarkup()}</section>`;
  }
  function renderPage(keepScroll=false) {
    notifyState();
    const y=$('#page-scroll').scrollTop;
    $('#page-content').innerHTML=page==='home'?home():center();$('#crumb').textContent=page==='home'?'首页':'服务增长　›　活动中心';
    $$('[data-page]').forEach(b=>{b.classList.toggle('active',b.dataset.page===page);if(b.closest('.client-nav')||b.closest('.client-tabs')){if(b.dataset.page===page)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');}});
    $('#page-scroll').scrollTop=keepScroll?y:0;
    $('#live-status').textContent=listState==='error'?'活动加载失败':listState==='loading'?'活动加载中':page==='center'?`${filter}，共 ${filtered().length} 条活动`:'';
  }
  function toast(text) {clearTimeout(toastTimer);$('#toast').textContent=text;$('#toast').classList.add('show');toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),3600);}
  function intro(a) {
    if(a.id==='training')return `<div class="rich-content"><section class="content-module"><img class="activity-poster" src="fr-wen-006-assets/training-poster.png" alt="右豹生态公益培训营介绍海报节选"></section></div>`;
    return `<div class="rich-content"><section class="content-module"><h2>${esc(a.title)}</h2><p>${esc(a.description)}。了解活动介绍、创作方向和当前项目内容，在开始前完整阅读活动说明。</p><div class="rich-note"><strong>活动时间</strong><br>${esc(a.start||'—')} ～ ${esc(a.end||'—')}</div><h3>活动说明</h3><p>本页展示当前活动已配置的信息。参与条件、内容要求与奖励结果以原活动规则为准，查看活动详情不会改变参与状态。</p></section><section class="content-module"><h2>内容与项目说明</h2><p>围绕项目内容进行创作，了解活动适用范围与原有说明。不同内容方向的具体要求按活动配置展示。</p><div class="table-scroll" tabindex="0" role="region" aria-label="活动说明表，可横向滚动"><table><thead><tr><th>信息类型</th><th>活动展示内容</th><th>阅读提示</th></tr></thead><tbody><tr><td>适用项目</td><td>${esc(a.project)}</td><td>查看原有项目说明</td></tr><tr><td>活动时间</td><td>${esc(a.start||'—')} ～ ${esc(a.end||'—')}</td><td>保留完整起止时间</td></tr><tr><td>奖励说明</td><td>以活动原有规则为准</td><td>不根据本地展示推算奖励</td></tr></tbody></table></div><p>请先阅读完整介绍，再根据当前活动提供的入口继续。<button class="link" data-rich-link>查看原有说明链接 ↗</button></p></section>${a.long?Array.from({length:4},(_,i)=>`<section class="content-module"><h2>介绍模块 ${i+3}</h2><p>这是长内容阅读场景的示例模块。正文按配置顺序连续呈现，不折叠成长摘要，也不增加后台编辑子页签。</p><p>长链接、图片和表格均应保留完整内容；缩小窗口后，文字换行，超宽表格在自己的容器内滚动。</p></section>`).join(''):''}</div>`;
  }
  function cases(a) {
    return `<section class="case-group"><h3>创作案例 · 图文内容</h3><div class="media-grid"><article class="media-sample"><div class="media-preview"><img src="fr-wen-006-assets/${a.logo||'zhihu'}.png" alt="图文案例示例"></div><p>案例图片 · 示例内容</p></article><article class="media-sample"><div class="media-preview"><span>图文内容</span></div><p>案例图片 · 示例内容</p></article><article class="media-sample"><div class="media-failed"><span>媒体加载失败</span><small>其余案例仍可阅读</small></div><p>案例标题保持可见</p></article></div></section><section class="case-group"><h3>创作案例 · 视频内容</h3><div class="media-grid"><article class="media-sample"><div class="media-preview"><img src="fr-wen-006-assets/${a.logo||'zhihu'}.png" alt="视频案例示例封面"><span class="play" aria-hidden="true">▶</span></div><p>视频案例 · 示例内容</p></article></div></section>`;
  }
  function ranking() {
    if(detailState==='empty-ranking')return stateMessage('暂无榜单数据');
    return `<div class="ranking-description">活动榜单 · 示例内容<br>排名及数值以当前活动展示为准</div><div class="rank-header" aria-hidden="true"><span>名次</span><span>用户</span><span style="text-align:right">数值</span></div>${['小林','星河','阿青','小周','南风','木木'].map((n,i)=>`<div class="rank-row ${i<3?'top':''}"><strong>第 ${i+1} 名</strong><div class="rank-person"><span aria-hidden="true">${n[0]}</span><div>${n[0]}***<small>创作用户</small></div></div><div class="rank-value">${[12860,11280,9850,8760,7520,6380][i]}<small>榜单展示值</small></div></div>`).join('')}<p class="rank-cycle">统计周期：按活动原有周期展示</p>`;
  }
  function validTabs(){return detailState==='no-content'?[]:current.tabs;}
  function renderDetail() {
    notifyState();
    const a=current;if(!a)return;
    if(['loading','error','hidden'].includes(detailState)) {
      $('#detail-content').innerHTML=detailState==='loading'?skeletons(1):detailState==='hidden'?stateMessage('该活动暂不可查看','请关闭详情返回原页面。'):stateMessage('活动详情加载失败，请重试','', '<button class="btn btn-ghost" data-retry-detail>重试</button>');
      $('#detail-actions').hidden=true;return;
    }
    const tabs=validTabs();if(!tabs.includes(detailTab))detailTab=tabs[0]||'intro';
    $('#detail-content').innerHTML=`<section class="detail-summary">${a.cover?`<div class="summary-visual">${logo(a,true)}<span class="status ${a.status==='已结束'?'ended':''}">${a.status}</span></div>`:''}<div class="summary-copy">${a.cover?'':`<span class="status ${a.status==='已结束'?'ended':''}">${a.status}</span>`}<h1 id="activity-title">${esc(a.title)}</h1>${a.description?`<p class="summary-description">${esc(a.description)}</p>`:''}<p class="summary-time">活动时间：${esc(a.start||'—')} ～ ${esc(a.end||'—')}</p>${a.tags.length?`<div class="activity-tags">${a.tags.map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div>`:''}<div class="summary-stats"><span>浏览 <b>${number(a.views)}</b></span><span>参与 <b>${number(a.joined)}</b></span></div></div></section>${detailState==='reward'?'<div class="reward-result" role="status"><strong>恭喜中奖</strong><br>奖励结果展示示例；具体内容以原活动返回结果为准。</div>':''}${tabs.length?`<section class="detail-document"><nav class="detail-tabs" role="tablist" aria-label="活动详情内容">${tabs.map(t=>`<button id="detail-tab-${t}" role="tab" aria-controls="detail-panel" data-detail-tab="${t}" aria-selected="${detailTab===t}" tabindex="${detailTab===t?0:-1}">${tabNames[t]}</button>`).join('')}</nav><div class="detail-tab-body" id="detail-panel" role="tabpanel" aria-labelledby="detail-tab-${detailTab}">${detailTab==='intro'?intro(a):detailTab==='cases'?cases(a):ranking()}</div></section>`:''}`;
    const show=a.buttons.length&&(buttonScope==='all'||detailTab==='intro'||!tabs.length);
    $('#detail-actions').hidden=!show;
    $('#detail-actions').innerHTML=show?a.buttons.map((t,i)=>`<button class="btn ${i===a.buttons.length-1?'btn-primary':'btn-ghost'}" data-business>${esc(t)}</button>`).join(''):'';
  }
  function openDetail(id,trigger=null) {
    const a=data().find(x=>x.id===id);if(!a)return;
    current=a;detailTab=a.tabs[0]||'intro';opener=trigger;sourcePage=page;sourceScroll=$('#page-scroll').scrollTop;detailVersion++;
    $('#client').inert=true;$('#detail-overlay').hidden=false;$('#activity-drawer').hidden=false;$('#detail-overlay').classList.add('open');$('#activity-drawer').classList.add('open');
    renderDetail();$('#detail-scroll').scrollTop=0;$('#detail-heading').focus();
  }
  function closeDetail(restore=true) {
    if($('#activity-drawer').hidden)return;
    detailVersion++;$('#detail-overlay').hidden=true;$('#activity-drawer').hidden=true;$('#detail-overlay').classList.remove('open');$('#activity-drawer').classList.remove('open');$('#client').inert=false;
    if(restore){if(page===sourcePage)$('#page-scroll').scrollTop=sourceScroll;
      const target=opener?.isConnected?opener:$(`[data-activity="${current?.id}"]`)||$('[data-filter][aria-selected="true"]')||$('#home-activity-title')||$('[data-page="home"]');target?.focus({preventScroll:true});}
    current=null;
  }
  function navigate(next) {closeDetail(false);page=next;renderPage();const h=$('#page-content h1')||$('#home-activity-title');if(h){h.tabIndex=-1;h.focus({preventScroll:true});}}
  function changeFilter(next) {filter=next;renderPage(true);$(`[data-filter="${filter}"]`)?.focus({preventScroll:true});}
  function retryList(){listState='normal';renderPage(true);$('#live-status').textContent='活动已重新加载';}
  document.addEventListener('click',e=>{
    const b=e.target.closest('button');if(!b)return;
    if(b.dataset.page)navigate(b.dataset.page);
    if(b.dataset.filter)changeFilter(b.dataset.filter);
    if(b.dataset.activity)openDetail(b.dataset.activity,b);
    if(b.dataset.detailTab){detailTab=b.dataset.detailTab;renderDetail();const nav=$('.detail-tabs');$('#detail-scroll').scrollTop=Math.max(0,nav.offsetTop-$('#detail-scroll').offsetTop);$(`[data-detail-tab="${detailTab}"]`).focus({preventScroll:true});}
    if(b.id==='detail-close')closeDetail();
    if(b.hasAttribute('data-retry-list'))retryList();
    if(b.hasAttribute('data-refresh')){retryList();toast('活动列表已刷新');}
    if(b.hasAttribute('data-retry-detail')){const version=detailVersion;detailState='normal';if(current&&version===detailVersion){renderDetail();$('#detail-close').focus();}}
    if(b.hasAttribute('data-business'))toast('此处预览原配置按钮；不会执行真实参与或跳转。');
    if(b.hasAttribute('data-rich-link'))toast('原有链接的打开方式待确认；当前仅作位置预览。');
    if(b.hasAttribute('data-ledger'))toast('奖励台账沿用现有页面，本次不调整。');
    if(b.hasAttribute('data-outside'))toast('当前预览展示首页与活动中心。');
    if(b.hasAttribute('data-expand')){const expanded=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',!expanded);$('#growth-items').hidden=expanded;}
  });
  $('#detail-overlay').addEventListener('click',()=>closeDetail());
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){e.preventDefault();if(!$('#activity-drawer').hidden)closeDetail();else window.parent.postMessage({type:'fr-wen-006:escape'},location.origin);return;}
    if(e.key==='Tab'&&!$('#activity-drawer').hidden){const targets=[$('#detail-heading'),...$$('#activity-drawer button,#activity-drawer a,#activity-drawer [tabindex="0"]')].filter(el=>el.getClientRects().length&&el.tabIndex>=0||el.id==='detail-heading');const first=targets[0],last=targets.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}
    const group=e.target.closest('.activity-filters,.detail-tabs');if(group&&['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const list=[...group.querySelectorAll('button')];let i=list.indexOf(e.target);i=e.key==='Home'?0:e.key==='End'?list.length-1:(i+(e.key==='ArrowRight'?1:-1)+list.length)%list.length;list[i].click();}
  });
  function setScene(scene){closeDetail(false);filter='全部';listState='normal';detailState='normal';buttonScope='intro';page=scene==='home'?'home':'center';if(scene==='empty')listState='empty';if(scene==='error')listState='error';if(scene==='edge')listState='long';renderPage();if(['detail','training','edge'].includes(scene))openDetail(scene==='training'?'training':'zhihu');}
  window.addEventListener('message',e=>{
    if(e.origin!==location.origin||e.source!==window.parent||e.data?.type!=='fr-wen-006:control')return;
    const m=e.data;
    if(m.escape){if(!$('#activity-drawer').hidden)closeDetail();else window.parent.postMessage({type:'fr-wen-006:escape'},location.origin);return;}
    if(m.scene){setScene(m.scene);return;}
    if(m.listState){closeDetail(false);listState=m.listState;renderPage(true);}
    if(m.detailState){detailState=m.detailState;if(!current){if(!data().length){listState='normal';renderPage(true);}openDetail(data()[0].id);}else{renderDetail();$('#detail-scroll').scrollTop=0;}}
    if(m.buttonScope){buttonScope=m.buttonScope;if(current)renderDetail();}
  });
  setScene(new URLSearchParams(location.search).get('screen')||'home');
})();
