(function(){
  'use strict';
  const M=window.FR005,$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let tab='fe',role='mobile',scene='claimed',pcScreen='dashboard',adminScreen='manuscripts',pcSelected='A5100',uploadStep=1,uploadFields={mode:'任务协作',kind:'视频',material:'解说混剪',title:'',file:''},filters={},page=1,pageSize=10,detailId='',detailRole='',activeLayers=[],confirmAction=null,focusBack=new Map(),busy=false;
  const scenes={mobile:[['claimed','已领稿件','已回填显示收益及约稿，其他列表无约稿'],['records','关键词约稿记录','查看当前关键词全部申请并继续约稿'],['prefill','约稿申请','项目、书籍、关键词及剪辑手只读'],['notifications','站内通知','申请通过、稿件待领取两个节点'],['loading','局部加载','仅内容区加载'],['error','读取失败','错误与空态分开，可重试']],pc:[['dashboard','剪辑供稿工作台','定向约稿申请宫格显示待审核数量'],['income','收益明细','查看关键词关联稿件与已结算收益'],['list','定向约稿审核','关键词、已获取收益及审核操作'],['upload','上传右豹稿件','沿用三步供稿，单申请单稿'],['permission','项目权限变化','禁止上传，联系客服恢复'],['rejected','原稿驳回重送审','同一稿件修改后重送审'],['empty','无申请','空状态'],['loading','局部加载','显示加载占位'],['error','读取失败','可重试，不伪装零条']]};
  const tag=s=>`<span class="tag ${s==='已领取稿件'?'tag-ok':M.terminal(s)?'tag-del':'tag-warn'}">${s}</span>`;
  const button=(t,a,extra='',style='primary')=>`<button type="button" class="btn btn-${style}" data-action="${a}" ${extra}>${t}</button>`;
  const link=(t,a,id)=>`<button type="button" class="link" data-action="${a}" data-id="${id}">${t}</button>`;
  const info=(key,value)=>`<dt>${key}</dt><dd>${esc(value)}</dd>`;
  function toast(t){$('#toast').textContent=t;$('#toast').classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('#toast').classList.remove('show'),3000)}
  // 批注器可直接命中同页元素；交互仍由原 iframe 承载。
function closeAnnotation(){
  $('#phone-annotation').hidden=true;
  $('#phone-annotation').replaceChildren();
  $('#mobile').hidden=false;
  $('#annotation-toggle').setAttribute('aria-pressed','false');
  $('#annotation-toggle').textContent='批注视图';
}
// 使用实际计算样式冻结画面，避免 3.0 的 body.embed-mode、html/body/#app
// 组合选择器在父文档作用域重写时失效，也避免通用 class 被外壳污染。
$('#annotation-toggle').onclick=()=>{
  const host=$('#phone-annotation');
  if(!host.hidden){closeAnnotation();return;}
  try{
    const source=$('#mobile').contentDocument;
    if(!source?.querySelector('#app')?.textContent.trim()){
      toast('画面正在加载，请完成后再切换批注视图');return;
    }
    const copy=document.createElement('div');
    copy.className='annotation-screen';
    const applyStyle=(original,node)=>{
      const computed=source.defaultView.getComputedStyle(original);
      node.style.cssText='all:initial!important';
      for(const property of computed)node.style.setProperty(property,computed.getPropertyValue(property),'important');
      node.style.setProperty('animation','none','important');
      node.style.setProperty('transition','none','important');
    };
    applyStyle(source.body,copy);
    for(const [key,value] of Object.entries({width:'375px',height:'812px',minHeight:'0',margin:'0',position:'relative',overflow:'hidden',transform:'translateZ(0)',contain:'layout paint style',isolation:'isolate'})){
      copy.style.setProperty(key.replace(/[A-Z]/g,c=>'-'+c.toLowerCase()),value,'important');
    }
    const pairs=[];
    const clone=(original)=>{
      if(original.nodeType!==Node.ELEMENT_NODE)return original.cloneNode(true);
      if(original.matches('script,style,link,iframe'))return null;
      const node=original.cloneNode(false);
      applyStyle(original,node);
      for(const attribute of [...node.attributes]){
        if(attribute.name.startsWith('on')||attribute.name.startsWith('data-'))node.removeAttribute(attribute.name);
      }
      if(node.id)node.id='annotation-'+node.id;
      for(const attr of ['for','aria-labelledby','aria-describedby','aria-controls']){
        if(node.hasAttribute(attr))node.setAttribute(attr,node.getAttribute(attr).split(/\s+/).map(id=>'annotation-'+id).join(' '));
      }
      node.removeAttribute('inert');
      if(original.matches('input')){node.value=original.value;node.checked=original.checked;node.readOnly=true;}
      if(original.matches('textarea')){node.value=original.value;node.readOnly=true;}
      if(original.matches('select'))node.disabled=true;
      if(original.matches('a,button,input,select,textarea,[tabindex]'))node.tabIndex=-1;
      for(const child of original.childNodes){const result=clone(child);if(result)node.append(result);}
      if(original.matches('select'))node.selectedIndex=original.selectedIndex;
      pairs.push({node,top:original.scrollTop,left:original.scrollLeft});
      return node;
    };
    for(const child of source.body.childNodes){const node=clone(child);if(node)copy.append(node);}
    host.replaceChildren(copy);host.hidden=false;$('#mobile').hidden=true;
    pairs.forEach(({node,top,left})=>{node.scrollTop=top;node.scrollLeft=left;});
    $('#annotation-toggle').setAttribute('aria-pressed','true');
    $('#annotation-toggle').textContent='返回交互视图';
    toast('当前画面已冻结，可开启 Codex 批注；返回交互视图继续操作');
  }catch(error){closeAnnotation();toast('批注视图生成失败，请刷新页面后重试');console.error('批注视图生成失败',error);}
};
// 保留事件传播给预览批注器，但阻止副本中的控件触发默认动作。
$('#phone-annotation').addEventListener('click',event=>event.preventDefault());


  function setTab(t,nextRole){closeAnnotation();if(nextRole&&nextRole!==role){role=nextRole;scene=role==='pc'?'dashboard':'claimed';}tab=['fe','admin','flow'].includes(t)?t:'fe';$$('[data-tab]').forEach(b=>{b.classList.toggle('active',b.dataset.tab===tab&&(!b.dataset.role||b.dataset.role===role));b.setAttribute('aria-current',b.dataset.tab===tab&&(!b.dataset.role||b.dataset.role===role)?'page':'false')});$$('.view').forEach(v=>v.hidden=v.id!=='view-'+tab);const url=new URL(location.href);url.searchParams.set('tab',tab);if(tab==='fe')url.searchParams.set('role',role);else url.searchParams.delete('role');history.replaceState(null,'',url);if(tab==='admin')renderAdmin();if(tab==='fe')renderScenes();}
  function renderScenes(){const items=scenes[role];$('#scenes').innerHTML=items.map(([id,title,desc])=>`<button class="scene ${scene===id?'active':''}" data-scene="${id}" aria-pressed="${scene===id}">${title}<small>${desc}</small></button>`).join('');$$('[data-role]').forEach(b=>b.classList.toggle('active',tab==='fe'&&b.dataset.role===role));const current=items.find(x=>x[0]===scene)||items[0];$('#scene-title').textContent=current[1];$('#scene-desc').textContent=current[2];$('#annotation-toggle').hidden=role!=='mobile';$('#phone-stage').hidden=role!=='mobile';$('#pc').hidden=role!=='pc';if(role==='pc')renderPC();requestAnimationFrame(fitPhone);}
  function switchScene(next){closeAnnotation();scene=next;renderScenes();if(role==='mobile')$('#mobile').contentWindow.postMessage({type:'fr-wen-005:screen',screen:next==='prefill'?'apply':next,prefill:next==='prefill'},location.origin);else{pcScreen=['permission','rejected'].includes(next)?'upload':next;pcSelected=next==='permission'?'A5117':next==='rejected'?'A5104':next==='upload'?'A5103':pcSelected;if(next==='rejected'){const r=M.get(pcSelected);if(r.status==='稿件审核中'&&r.manuscript.status==='审核中')M.act(r.id,'auditReject')}uploadStep=1;const r=M.get(pcSelected);uploadFields={mode:r?.manuscript?.mode||'任务协作',kind:r?.manuscript?.kind||'视频',material:r?.material||'解说混剪',title:r?.manuscript?.title||'',bookType:r?.manuscript?.bookType||'',reminder:r?.manuscript?.editorReminder||'',tips:r?.manuscript?.publishTips||'',keywords:r?.manuscript?.keyword||'',cover:r?.manuscript?.cover||'',file:''};renderPC()}}
  function pcChrome(html){return `<div class="pc-shell"><aside class="pc-nav"><b>🟠 右豹2.0 PC工作台</b><p>右豹工作台</p><p>⌂ 首页</p><p>▥ 数据</p><p>经营协作</p><p>我的团队</p><p>OPC企业号</p><p class="selected">✂ 剪辑供稿</p></aside><div class="pc-main"><div class="pc-crumb">右豹工作台 / 经营协作 / 剪辑供稿${pcScreen==='dashboard'?'':' / 定向约稿'}</div>${html}</div></div>`}
  function pcRows(){return M.records.filter(r=>r.editorId==='100099').slice().sort((a,b)=>b.created-a.created).map(r=>`<tr><td>${r.id}<small>${esc(r.user)}</small></td><td>${esc(r.project)}<small>${esc(r.book)} / ${esc(r.bookId||'未提供')}</small></td><td>${r.bookUrl?`<a href="${esc(/^https?:\/\//i.test(r.bookUrl)?r.bookUrl:'#')}" target="_blank" rel="noopener">${esc(r.bookUrl)}</a>`:'未提供'}</td><td>${esc(r.keyword)}</td><td>¥${M.keywordIncome(M.getClaim(r.sourceId),'editorIncome').toFixed(2)}</td><td>${tag(r.status)}</td><td class="application-note">${esc(r.note||'未填写')}</td><td>${link('详情','pc-detail',r.id)}${r.status==='待审核'?link('通过','accept',r.id)+link('拒绝','reject',r.id):r.status==='制作中'?link(r.rejected?'修改原稿送审':'上传供稿','pc-upload',r.id):''}</td></tr>`).join('')}
  function uploadChoices(name,values,current){return values.map(value=>`<label class="upload-choice"><input type="radio" name="${name}" value="${esc(value)}" ${value===current?'checked':''}>${value}</label>`).join('')}
  function uploadSummary(r){return `<div class="upload-summary"><b>当前项目 ${esc(r.project)}</b><span>运营模式 ${esc(uploadFields.mode)}</span><span>稿件类型 ${esc(uploadFields.kind)}</span><span>素材类型 ${esc(r.material||'解说混剪')}</span><span>平台 右豹</span><span>剪辑手 ${esc(r.editor)}</span><span>定向用户 ${esc(r.user)}</span></div>`}
  function saveUploadDetails(){if($('#upload-title')){uploadFields.title=$('#upload-title').value.trim();uploadFields.tips=$('#upload-tips').value;uploadFields.bookType=$('#upload-book-type').value.trim();uploadFields.reminder=$('#upload-reminder').value.trim()}if($('#upload-confirm-tips')){uploadFields.tips=$('#upload-confirm-tips').value;if($('#upload-keywords'))uploadFields.keywords=$('#upload-keywords').value;}}
  function renderPC(){const host=$('#pc');if(!host.querySelector('iframe'))host.innerHTML='<iframe id="fr005-pc-native" title="一键代发白色PC剪辑供稿" src="fr-wen-005-pc.html?v=income-scene-20261127" style="border:0;width:100%;height:100%;min-height:680px"></iframe>';const frame=host.querySelector('iframe');const frameScene=pcScreen==='upload'&&['permission','rejected'].includes(scene)?scene:pcScreen;const send=()=>frame.contentWindow.postMessage({type:'fr-wen-005:screen',role:'pc',screen:frameScene},location.origin);frame.onload=send;if(frame.dataset.scene!==frameScene){frame.dataset.scene=frameScene;send();}return;}
  function recordDetail(r){let manuscript='暂无关联稿件';if(r.manuscript){const m=r.manuscript;manuscript=`<div class="row"><div class="cover">示例<br>封面</div><div><b>${esc(m.title)}</b><p>${tag(m.status)}</p></div></div><dl class="drawer-meta">${info('稿件ID',m.id)+info('关键词',m.keyword)+info('项目',m.project)+info('稿件书籍名称',m.book)+info('稿件书籍ID',m.bookId||'未提供')+info('关键词回填数量',M.keywordFills(M.getClaim(r.sourceId)).length)+info('稿件目录',m.directory)+info('稿件上传时间',M.format(m.uploaded))+info('代运营合作模式',m.mode)+info('稿件类型',m.kind)+info('素材类型',m.material)+info('平台',m.platform||'右豹')+info('书籍类型',m.bookType||'未填写')+info('剪辑手提醒',m.editorReminder||'未填写')+info('发布技巧',m.publishTips||'未填写')+info('封面',m.cover||'未选择封面')}</dl>`;}return `<div class="detail-group"><h3>1 申请用户信息</h3><dl class="drawer-meta">${info('右豹昵称',r.user)+(tab==='admin'?info('用户ID',r.userId):'')}</dl></div><div class="detail-group"><h3>2 申请信息</h3><dl class="drawer-meta">${info('申请编号',r.id)+info('申请时间',M.format(r.created))+info('项目',r.project)+info('申请书籍名称',r.book)+info('申请书籍ID',r.bookId||'未提供')+info('约稿剪辑手',tab==='admin'?r.editor+' / '+r.editorId:r.editor)+info('申请书籍链接',r.bookUrl||'未提供')+info('关键词',r.keyword)+info('已获取收益（剪辑手）','¥'+M.keywordIncome(M.getClaim(r.sourceId),'editorIncome').toFixed(2))+info('申请说明',r.note||'未填写')+info('拒绝原因',r.rejectReason||'—')}</dl></div><div class="detail-group"><h3>3 剪辑手信息</h3><dl class="drawer-meta">${info('剪辑手昵称',r.editor)+(tab==='admin'?info('剪辑手ID',r.editorId):'')}</dl></div><div class="detail-group"><h3>4 申请状态</h3>${tag(r.status)}<p>${esc(M.deadline(r))}</p></div><div class="detail-group"><h3>5 关联稿件信息</h3>${manuscript}</div>`}
  function renderDetail(){const r=M.get(detailId);if(!r)return;$('#detail-title').textContent=(detailRole==='manuscript'?'稿件详情':'约稿详情')+' · '+r.id;$('#detail-body').innerHTML=recordDetail(r)+(detailRole==='pc'?`<div class="row">${r.status==='待审核'?button('通过','accept',`data-id="${r.id}"`)+button('拒绝','reject',`data-id="${r.id}"`,'ghost'):r.status==='制作中'?button(r.rejected?'修改原稿送审':'上传供稿','pc-upload',`data-id="${r.id}"`):''}</div>`:'');}
  function openDetail(id,source){detailId=id;detailRole=source;$('#detailDrawer').classList.toggle('pc-scope',source==='pc');renderDetail();openLayer('detail');}
  function renderAdmin(){$('#admin-where').textContent='稿件管理 / 右豹稿件';renderManuscripts();}
  function manuscriptList(){return [...M.records.filter(r=>r.manuscript),{id:'ordinary',editor:'阿禾剪辑',editorId:'100102',project:'番茄小说',book:'春日来信',bookId:'BK9001',manuscript:{id:'M4900',title:'春日来信 · 书单推荐',keyword:'春日书单',project:'番茄小说',mode:'任务协作',kind:'视频',material:'解说混剪',fills:2,directory:'春日来信.mp4',uploaded:M.now-3*M.H,status:'已通过',platform:'右豹'}}];}
  function manuscriptMatches(r){const m=r.manuscript;return (!filters.title||(m.title+m.id).includes(filters.title))&&(!filters.keyword||m.keyword.includes(filters.keyword))&&(!filters.editor||(r.editor+r.editorId).includes(filters.editor))&&(!filters.project||r.project===filters.project)&&(!filters.book||r.book.includes(filters.book))&&(!filters.audit||m.status===filters.audit)&&(!filters.material||m.material===filters.material)&&(!filters.occupied||(r.received?'已占用':'未占用')===filters.occupied)&&(!filters.manuscriptStatus||(r.received?'已领取':'未领取')===filters.manuscriptStatus)&&(!filters.fill||((r.sourceId?M.keywordFills(M.getClaim(r.sourceId)).length:m.fills)?'已回填':'未回填')===filters.fill)&&(!filters.channel||filters.channel==='剪辑手上传')&&(!filters.start||m.uploaded>=new Date(filters.start+'T00:00:00').getTime())&&(!filters.end||m.uploaded<=new Date(filters.end+'T23:59:59.999').getTime());}
  function renderManuscripts(){const select=(name,label,values)=>`<label>${label}<select name="${name}"><option value="">全部</option>${values.map(v=>`<option>${v}</option>`).join('')}</select></label>`;$('#admin-content').innerHTML=`<div class="heading"><h2>稿件管理</h2></div><div class="module-tabs"><button class="active">稿件列表</button><button data-action="existing-all">领取记录</button><button data-action="existing-all">结算明细</button></div><form class="filters" id="filter-form"><label>稿件标题 / ID<input name="title" placeholder="标题 / ID"></label>${select('occupied','占用情况',['已占用','未占用'])}${select('audit','审核状态',['审核中','已通过','已驳回'])}${select('manuscriptStatus','稿件状态',['已领取','未领取'])}${select('project','项目',M.projects)}<label>书籍<input name="book"></label>${select('channel','渠道',['剪辑手上传'])}${select('fill','回填状态',['已回填','未回填'])}<label>关键词<input name="keyword"></label><label>剪辑手昵称 / ID<input name="editor"></label>${select('material','素材类型',['解说混剪','图文','真人出镜'])}<label>上传开始日期<input name="start" type="date"></label><label>上传结束日期<input name="end" type="date"></label><div class="actions row"><button class="btn btn-primary" type="submit">查询</button>${button('重置','filter-reset','','ghost')}${button('导入','demo-import','','ghost')}${button('导出','demo-export','','ghost')}</div><p class="error" id="filter-error" role="alert"></p></form><p class="notice">定向稿件沿用右豹稿件上传、审核流程；审核通过后仅申请用户可领取，不进入广场。上传成功新增一条供稿记录，驳回重送审更新原稿记录。</p><div class="module-tabs"><button class="active">右豹稿件</button><button data-action="legacy-manuscripts">站外稿件</button><button data-action="legacy-manuscripts">企业号稿件</button></div><div class="table-card"><div class="table-wrap"><table class="youbao-manuscripts"><thead><tr>${['选择','ID','封面','标题','关键词','关键词项目','回填数量','合填项目','合并关联项目','项目','书籍','稿件信息','稿件目录','发布技巧','代运营合作模式','剪辑手','渠道','素材类型','稿件类型','领取条件','占用情况','审核状态','审核人','稿件状态','定向稿件','上传时间','操作'].map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody id="manuscript-rows"></tbody></table></div><div id="pagination" class="pagination"></div></div>`;for(const [key,value]of Object.entries(filters)){const field=$(`#filter-form [name="${key}"]`);if(field)field.value=value;}renderAdminRows();}
  function renderAdminRows(){const list=manuscriptList().filter(manuscriptMatches),pages=Math.max(1,Math.ceil(list.length/pageSize));page=Math.min(page,pages);$('#manuscript-rows').innerHTML=list.slice((page-1)*pageSize,page*pageSize).map(r=>{const m=r.manuscript;const values=[`<input type="checkbox" aria-label="选择 ${esc(m.id)}">`,esc(m.id),'<div class="cover">示例<br>封面</div>',esc(m.title),esc(m.keyword),esc(m.project),r.id==='ordinary'?String(m.fills):link(String(M.keywordFills(M.getClaim(r.sourceId)).length),'fill-details',r.id),esc(m.project),'—',esc(r.project),`${esc(r.book)}<small>${esc(r.bookId)}</small>`,`${esc(m.kind)} · 1 成片`,esc(m.directory),esc(m.publishTips||'—'),esc(m.mode),`${esc(r.editor)}<small>${esc(r.editorId)}</small>`,'剪辑手上传',esc(m.material),esc(m.kind),'按剪辑手现有配置扣次数或积分',r.received?'已占用':'未占用',tag(m.status),m.status==='审核中'?'—':'管理员',r.received?'已领取':'未领取',r.user?`${esc(r.user)}<small>${esc(r.userId)}</small>`:'-',M.format(m.uploaded),r.id==='ordinary'?button('详情','ordinary-detail','','ghost'):`${link('详情','manuscript-detail',r.id)}${r.status==='稿件审核中'&&m.status==='审核中'?link('审核通过','audit-pass',r.id)+link('驳回','audit-reject',r.id):''}`];return '<tr>'+values.map(v=>`<td>${v}</td>`).join('')+'</tr>';}).join('')||'<tr><td colspan="27" class="empty">暂无符合条件的稿件</td></tr>';$('#pagination').innerHTML=`<span>共 ${list.length} 条 · 第 ${page} / ${pages} 页</span><select id="page-size" aria-label="每页条数">${[10,20,50].map(n=>`<option ${pageSize===n?'selected':''}>${n}</option>`).join('')}</select>${button('上一页','page-prev',page===1?'disabled':'','ghost')}${button('下一页','page-next',page===pages?'disabled':'','ghost')}`;}
  function showFills(r){const c=M.getClaim(r.sourceId),fills=M.keywordFills(c);$('#fills-title').textContent='关键词回填详情 - '+r.keyword;$('#fills-body').innerHTML=`<div class="notice">当前关键词的全部回填作品；约稿领取不新增未回填记录。</div><div class="table-wrap"><table><thead><tr><th>回填链接</th><th>回填时间</th><th>关键词</th><th>用户</th></tr></thead><tbody>${fills.map(f=>`<tr><td><a href="${esc(f.url)}" target="_blank" rel="noopener">查看链接</a></td><td>${M.format(f.time)}</td><td>${esc(r.keyword)}</td><td>${esc(r.user)}</td></tr>`).join('')||'<tr><td colspan="4" class="empty">暂无回填记录</td></tr>'}</tbody></table></div>`;openLayer('fills');}
  function syncInert(){const top=activeLayers.at(-1);$('#workspace').inert=!!top;$('.topnav').inert=!!top;$('.sidebar').inert=!!top;for(const type of ['detail','rule'])$('#'+type+'Drawer').inert=!!top&&top!==type;for(const type of ['edit','confirm','fills'])$('#'+type+'Overlay').inert=!!top&&top!==type;}
  function openLayer(type){if(activeLayers.includes(type))return;focusBack.set(type,document.activeElement);activeLayers.push(type);const overlay=$('#'+type+'Overlay');overlay.hidden=false;overlay.classList.add('open');let panel=overlay;if(type==='detail'||type==='rule'){panel=$('#'+type+'Drawer');panel.hidden=false;panel.inert=false;panel.classList.add('open')}syncInert();panel.querySelector('button,input,select,textarea')?.focus();}
  function closeLayer(type=activeLayers.at(-1)){if(!type)return;activeLayers=activeLayers.filter(t=>t!==type);const overlay=$('#'+type+'Overlay');overlay.classList.remove('open');overlay.hidden=true;if(type==='detail'||type==='rule'){const p=$('#'+type+'Drawer');p.classList.remove('open');p.hidden=true;p.inert=true;}syncInert();const back=focusBack.get(type);if(back?.isConnected)back.focus();else if(activeLayers.length){const t=activeLayers.at(-1);$('#'+t+(t==='detail'||t==='rule'?'Drawer':'Overlay')).querySelector('button')?.focus()}else $('#rules-open').focus();if(type==='rule')$('#rules-open').setAttribute('aria-expanded','false');}
  function confirm(title,copy,fn,{pc=false,cancel='取消',ok='确认',danger=false}={}){$('#confirmOverlay').classList.toggle('pc-scope',pc);$('#confirm-title').textContent=title;$('#confirm-copy').innerHTML=copy;$('#confirm-cancel').textContent=cancel;$('#confirm-ok').textContent=ok;$('#confirm-ok').className='btn btn-'+(danger?'danger':'primary');confirmAction=fn;openLayer('confirm');}
  function run(id,action,payload){const result=M.act(id,action,payload);toast(result.ok?'示例操作已完成':result.error);return result.ok;}
  function rules(which){$$('[data-rule]').forEach(b=>b.classList.toggle('active',b.dataset.rule===which));const sections=which==='fe'?[
['1 业务目标','已回填稿件表现良好时，用户向原剪辑手继续约同一本书，并复用原关键词发布新作品。'],
['2 用户入口','仅已领—已回填卡片显示收益及约稿操作；收益在卡片右上方淡橙底块单行显示“收益：￥金额”，字号与书名一致。已有申请时显示约稿记录，进入当前关键词的全部约稿记录，每条卡片独立操作，底部固定继续约稿，基于当前原稿再次申请。未回填、已超时不显示约稿；底栏仅保留广场、已领。'],
['3 最简申请','项目、关键词、书籍名称、书籍ID、书籍链接、剪辑手从原记录带入且不可修改；仅申请说明可填写。待审核可撤销；接受后不可取消。拒绝原因在记录查看。'],
['4 剪辑手审核与供稿','审核列表显示关键词、已获取收益（剪辑手从原稿取得的收益），可通过或填写原因拒绝。通过后沿用三步上传，平台为右豹，单申请单稿；失去项目权限时，在选择项目模块下方提示“请联系客服开启项目权限后再上传”，并禁止上传。确认上传沿用书籍分组及成片行列表，支持勾选、发布技巧编辑和移除。驳回后修改原稿重送审。'],
['收益明细展示','工作台查看明细打开现有右侧抽屉；按结算日期及原关键词范围分组，左侧展示关联的原稿和定向稿ID、标题，右侧合并关键词、书名与已结算收益。关键词收益仅计一次，不按关联稿件数重复分摊或累计。同一稿件关联不同关键词时，在各关键词组分别展示关联信息；分页以关键词组为单位，避免拆散组。'],
['下载与排序','已回填支持默认排序（领取时间倒序）、收益高到低、收益低到高。关键词约稿记录不设筛选。仅一稿时直接下载；多稿时打开沿用3.0底部Sheet的稿件列表，显示缩览图、稿件类型、素材类型、可下载时间；未领按剪辑手现有配置扣次数或积分领取、已失效显示下载已失效并禁用。下载为静态演示。'],
['5 领取与回填','稿件审核通过后从关联约稿记录进入现有详情按剪辑手现有收费方式领取，优先扣1次；无次数时自定义收费确认配置积分价格后扣积分，平台计费沿用现有次数兑换档位，积分不足或取消不扣减。与广场共享次数、积分，自动复用原关键词；仅申请用户可领取且不可重复领取。领取后申请以已领取稿件结束，不新增未回填记录、不重置原记录或新增回填时限。发布后在当前关键词追加回填，收益按关键词统计，不改变约稿申请结束状态。'],
['6 通知','只发送申请已通过、稿件待领取两个节点通知。上传待审核不通知。'],
['7 业务流程','见本页「业务流程」Tab。']
]:[['1 稿件管理','不新增独立约稿模块、平台或配置。剪辑手上传成功即在右豹稿件新增一条记录，继续原审核流程。'],['2 定向稿件列','在现有右豹稿件列表增加定向稿件列，定向稿件显示申请用户昵称、ID；普通稿件显示“-”。保留既有列表字段与筛选。'],['3 审核','审核通过进入待领取并通知申请用户；驳回后剪辑手修改同一稿件重新上传，不重复生成稿件ID。'],['4 状态',M.stages.join('、')+'。领取后申请终态为已领取稿件；继续使用当前关键词回填并统计收益，不生成新的领取记录。']];$('#rule-body').innerHTML=sections.map(([title,copy])=>`<section class="rule-section"><h3>${title}</h3><p class="rule-content">${copy}</p></section>`).join('');}
  $('#rules-open').addEventListener('click',()=>{if(activeLayers.includes('rule'))return closeLayer('rule');rules(tab==='admin'?'admin':'fe');openLayer('rule');$('#rules-open').setAttribute('aria-expanded','true')});
  document.addEventListener('click',e=>{if(e.target.closest('#phone-annotation'))return;const b=e.target.closest('button');if(!b)return;if(b.dataset.tab)return setTab(b.dataset.tab,b.dataset.role);if(b.dataset.role){role=b.dataset.role;scene=role==='pc'?'dashboard':'claimed';return switchScene(scene)}if(b.dataset.scene)return switchScene(b.dataset.scene);if(b.dataset.admin){adminScreen=b.dataset.admin;return renderAdmin()}if(b.dataset.rule)return rules(b.dataset.rule);if(b.dataset.close)return closeLayer(b.dataset.close);if(b.id==='reset-demo'){M.reset();filters={};page=1;toast('示例数据已重置');return switchScene(role==='pc'?'dashboard':'claimed')}
    const id=b.dataset.id,a=b.dataset.action,r=id?M.get(id):null;
    if(a==='pc-list'||a==='pc-dashboard'){pcScreen=a==='pc-list'?'list':'dashboard';scene=pcScreen;renderScenes();renderPC()}
    else if(a==='pc-detail')openDetail(id,'pc');else if(a==='admin-detail')openDetail(id,'admin');else if(a==='manuscript-detail')openDetail(id,'manuscript');
    else if(a==='accept')confirm('确认接受约稿',`<p>请仔细核对本次约稿的项目及书籍／剧信息。书籍信息继承用户原已回填稿件，不可修改。</p><dl class="drawer-meta">${info('项目',r.project)+info('书籍／剧名称',r.book)+info('书籍ID',r.bookId||'未提供')}</dl>`,()=>run(id,'accept'),{pc:true,cancel:'返回核对',ok:'确认接受'});
    else if(a==='reject')confirm('拒绝本次约稿申请？','<p>拒绝后本次申请结束，原因将反馈给用户。</p><label class="field">拒绝原因 *<textarea id="reject-reason" placeholder="请输入拒绝原因"></textarea></label><p id="reject-error" class="error" role="alert"></p>',()=>{const reason=$('#reject-reason').value.trim();if(!reason){$('#reject-error').textContent='请填写拒绝原因';$('#reject-reason').focus();return false;}return run(id,'reject',{reason});},{pc:true,ok:'确认拒绝',danger:true});
    else if(a==='pc-upload'){if(activeLayers.includes('detail'))closeLayer('detail');pcSelected=id;pcScreen='upload';uploadStep=1;uploadFields={mode:r.manuscript?.mode||'任务协作',kind:r.manuscript?.kind||'视频',material:r.material||'解说混剪',title:r.manuscript?.title||'',bookType:r.manuscript?.bookType||'',reminder:r.manuscript?.editorReminder||'',tips:r.manuscript?.publishTips||'',keywords:r.manuscript?.keyword||'',cover:r.manuscript?.cover||'',file:''};renderPC()}
    else if(a==='upload-next'){uploadFields.mode=$('[name=upload-mode]:checked').value;uploadFields.kind=$('[name=upload-kind]:checked').value;uploadFields.material=M.get(pcSelected).material||'解说混剪';uploadStep=2;renderPC()}
    else if(a==='upload-prev'){saveUploadDetails();uploadStep--;renderPC()}
    else if(a==='upload-clear'){saveUploadDetails();uploadFields.file='';uploadFields.size='';renderPC()}
    else if(a==='upload-example'||a==='upload-next-file'){saveUploadDetails();if(a==='upload-example'){uploadFields.file='定向成片.mp4';uploadFields.size='1.6 MB';return renderPC()}if(!uploadFields.file){$('#upload-error').textContent='请选择一个成片，或使用示例成片';return;}if(!uploadFields.title){$('#upload-error').textContent='请填写稿件标题';return;}uploadStep=3;renderPC()}
    else if(a==='upload-start'){saveUploadDetails();uploadFields.keywords=r.keyword;if(run(id,'uploadStart',uploadFields))renderPC()}
    else if(a==='upload-success')run(id,'uploadSuccess');
    else if(a==='upload-fail')run(id,'uploadFail');
    else if(a==='upload-cancel')confirm('取消本次上传？','<p>取消的是本次文件上传，不是已接受的约稿申请。稍后可以重新上传。</p>',()=>run(id,'uploadCancel'),{pc:true,ok:'确认取消上传'});
    else if(a==='audit-pass')confirm('确定通过该稿件？','',()=>run(id,'auditPass'),{ok:'确定'});
    else if(a==='audit-reject')confirm('驳回此稿件？','<p>申请回到制作中，剪辑手修改同一原稿后重送审。</p>',()=>run(id,'auditReject'),{ok:'确认驳回',danger:true});
    else if(a==='existing-all')toast('查看全部沿用已有页面，本需求不新增交互');
    else if(a==='fill-details'){showFills(r);}
    else if(a==='legacy-manuscripts')toast('本页只演示定向约稿增量，其他稿件沿用已有页面');
    else if(a==='filter-reset'){filters={};page=1;renderAdmin();toast('筛选已重置');}
    else if(a?.startsWith('page-')){const pages=Math.max(1,Math.ceil(manuscriptList().filter(manuscriptMatches).length/pageSize));page=a==='page-first'?1:a==='page-last'?pages:page+(a==='page-next'?1:-1);renderAdminRows();}
    else if(['demo-import','demo-export','ordinary-detail'].includes(a))toast('沿用现有功能，静态 Demo 不传输真实数据');

  });
  $('#confirm-ok').addEventListener('click',()=>{if(busy)return;busy=true;try{if(confirmAction?.()!==false)closeLayer('confirm')}finally{busy=false}});
  for(const type of ['detail','rule','edit','confirm','fills'])$('#'+type+'Overlay').addEventListener('click',e=>{if(e.target===e.currentTarget&&activeLayers.at(-1)===type)closeLayer(type)});
  document.addEventListener('keydown',e=>{const type=activeLayers.at(-1);if(!type)return;if(e.key==='Escape'){e.preventDefault();return closeLayer(type)}if(e.key==='Tab'){const panel=$('#'+type+(type==='detail'||type==='rule'?'Drawer':'Overlay')),nodes=[...panel.querySelectorAll('button,input,textarea,select,a[href]')].filter(x=>!x.disabled&&!x.hidden),first=nodes[0],last=nodes.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus()}}});
  document.addEventListener('submit',e=>{if(e.target.id==='filter-form'){e.preventDefault();const values=Object.fromEntries(new FormData(e.target));if(values.start&&values.end&&values.start>values.end){$('#filter-error').textContent='上传开始日期不得晚于结束日期';return;}filters=Object.fromEntries(Object.entries(values).map(([k,v])=>[k,String(v).trim()]));$('#filter-error').textContent='';page=1;renderAdminRows()}});
  document.addEventListener('change',e=>{if(['upload-file','upload-folder'].includes(e.target.id)){saveUploadDetails();const files=Array.from(e.target.files);if(files.length!==1){$('#upload-error').textContent='一份申请仅支持一个成片，请重新选择仅含一个成片的文件或文件夹';e.target.value='';return;}const file=files[0];if(!/\.(mp4|mov|webm|mkv|avi|png|jpe?g|webp|gif|zip)$/i.test(file.name)){$('#upload-error').textContent='请选择视频、图片或ZIP成片';return;}uploadFields.file=file.webkitRelativePath||file.name;uploadFields.size=(file.size/1024/1024).toFixed(1)+' MB';renderPC()}else if(e.target.id==='upload-cover'){uploadFields.cover=e.target.files[0]?.name||'';e.target.nextElementSibling.textContent=uploadFields.cover||'未选择封面';}});
  document.addEventListener('change',e=>{if(e.target.id==='page-size'){pageSize=Number(e.target.value);page=1;renderAdminRows()}});

  M.subscribe(()=>{renderPC();renderAdmin();if(activeLayers.includes('detail'))renderDetail()});
  function fitPhone(){const stage=$('#phone-stage');stage.style.width='389px';stage.style.height='826px';$('#mobile').style.transform='none';$('#phone-annotation').style.transform='none';}
  new ResizeObserver(fitPhone).observe($('#board'));window.addEventListener('resize',fitPhone);
  renderFlow();setTab(new URLSearchParams(location.search).get('tab')||'fe',new URLSearchParams(location.search).get('role')==='pc'?'pc':'mobile');renderScenes();renderAdmin();

  function renderFlow(){window.renderFR005Flow();}
})();
