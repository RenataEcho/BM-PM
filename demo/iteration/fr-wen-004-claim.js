(()=>{'use strict';const $=s=>document.querySelector(s),M=window.ClaimDemo,esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));let ruleReturn; let tab='fe',module='types',screen='detail',drawerReturn,modalReturn,modalAction,drawerAction;
const scenes=[['detail','稿件详情 · 有要求','稿件详情展示统一领取要求。'],['select','选择账号 · 混合列表','选择满足要求的账号领取。'],['empty','空账号 · 添加提示弹窗','直接展示免费领取后的添加账号提示。'],['none','全部不满足','账号不满足时不可选择，可添加账号。'],['direct','无要求 · 进入关键词','跳过账号门槛，继续关键词关联。'],['add','添加媒体账号','识别主页信息后保存。'],['private','站外私域 · 统一门槛','站外分享领取同样先选择满足门槛的账号。'],['legacy','存量稿件 · 无门槛','存量默认无门槛，继续关键词流程。'],['deleted-type','类型已删除 · 无门槛','类型显示为 -，无需选择账号。'],['keyword','选择项目关键词 · 弹窗','详情页底部选词，选择后可点击选词领取。'],['occupied','先领后填 · 占用中','1 小时内补关键词，沿用本次账号判断。'],['fault-read','领取要求读取失败','仅门槛区域显示失败与重试，其他详情正常展示。'],['fault-parse','账号解析失败','检查平台与主页链接后重试。'],['fault-missing','解析缺少指标','缺少指标时不可保存。'],['fault-identity','解析缺少昵称','缺少身份信息时不可保存。'],['fault-zero','解析三项为 0','真实零值允许保存。'],['fault-duplicate','重复账号','保存时提示已存在。'],['fault-save','账号保存失败','保留识别结果，可重试。'],['fault-delete','账号删除失败','保留账号，可重试。'],['fault-claim','稿件领取失败','保留当前选择，可重试。']];
function fitPhone(){if($('#phone-stage').hidden)return;const board=$('.board-scroll'),scale=Math.max(.2,Math.min(1,(board.clientHeight-52)/812,(board.clientWidth-52)/375));const stage=$('#phone-stage'),frame=$('#mobile');stage.style.width=(375*scale+16)+'px';stage.style.height=(812*scale+16)+'px';frame.style.width='375px';frame.style.height='812px';frame.style.zoom='1';frame.style.transform=`scale(${scale})`;frame.style.transformOrigin='top left';const annotation=$('#phone-annotation');annotation.style.zoom='1';annotation.style.transform=`scale(${scale})`;annotation.style.transformOrigin='top left';}
new ResizeObserver(fitPhone).observe($('.board-scroll'));
// 批注器可直接命中同页元素；交互仍由原 iframe 承载。
function closeAnnotation(){
  $('#phone-annotation').hidden=true;
  $('#phone-annotation').replaceChildren();
  $('#mobile').hidden=false;
  $('#annotation-toggle').setAttribute('aria-pressed','false');
  $('#annotation-toggle').textContent='批注视图';
}
function annotationCss(rules){
  return [...rules].map(rule=>{
    if(rule.selectorText){
      const selector=rule.selectorText.replace(/(^|[\s,>+~])(?:body|html|:root)(?=$|[\s,>+~.#:[\]])/g,'$1.annotation-screen').replace(/#([\w-]+)/g,'#annotation-$1').split(',').map(part=>'#phone-annotation '+(part.trim().startsWith('.annotation-screen')?'':'.annotation-screen ')+part.trim()).join(',');
      return selector+'{'+rule.style.cssText+'}';
    }
    if(rule.cssRules)return rule.cssText.slice(0,rule.cssText.indexOf('{')+1)+annotationCss(rule.cssRules)+'}';
    return rule.cssText;
  }).join('\n');
}
$('#annotation-toggle').onclick=()=>{
  const host=$('#phone-annotation');
  if(!host.hidden){closeAnnotation();fitPhone();return;}
  try{
    const source=$('#mobile').contentDocument;
    if(!source?.body||!source.querySelector('#content')?.textContent.trim()||source.querySelector('.skeleton')||[...source.querySelectorAll('button')].some(button=>button.textContent==='处理中…')){
      toast('画面正在加载或处理中，请完成后再切换批注视图');return;
    }
    const copy=document.createElement('div');
    copy.className='annotation-screen';
    copy.style.cssText='width:375px;height:812px;position:relative;contain:layout paint style;isolation:isolate';
    const pairs=[...source.body.querySelectorAll('*')].map(original=>({original}));
    copy.append(...[...source.body.childNodes].map(node=>node.cloneNode(true)));
    const clones=[...copy.querySelectorAll('*')];
    pairs.forEach((pair,i)=>{
      const node=clones[i],original=pair.original;
      pair.copy=node;pair.top=original.scrollTop;pair.left=original.scrollLeft;
      node.removeAttribute('inert');
      for(const attribute of [...node.attributes]){
        if(attribute.name.startsWith('on')||attribute.name.startsWith('data-'))node.removeAttribute(attribute.name);
      }
      if(node.id)node.id='annotation-'+node.id;
      for(const attr of ['for','aria-labelledby','aria-describedby','aria-controls']){
        if(node.hasAttribute(attr))node.setAttribute(attr,node.getAttribute(attr).split(/\s+/).map(id=>'annotation-'+id).join(' '));
      }
      if(node.matches('input')){node.value=original.value;node.checked=original.checked;node.readOnly=true;}
      if(node.matches('textarea')){node.value=original.value;node.readOnly=true;}
      if(node.matches('select')){node.selectedIndex=original.selectedIndex;node.disabled=true;node.style.opacity=getComputedStyle(original).opacity;}
      if(node.matches('a,button,input,select,textarea,[tabindex]'))node.tabIndex=-1;
    });
    copy.querySelectorAll('script,iframe').forEach(node=>node.remove());
    const style=document.createElement('style');
    style.textContent='#phone-annotation .annotation-screen,#phone-annotation .annotation-screen *{all:revert}'+[...source.styleSheets].map(sheet=>annotationCss(sheet.cssRules)).join('\n');
    host.replaceChildren(style,copy);
    host.hidden=false;
    $('#mobile').hidden=true;
    fitPhone();
    pairs.forEach(pair=>{pair.copy.scrollTop=pair.top;pair.copy.scrollLeft=pair.left;});
    $('#annotation-toggle').setAttribute('aria-pressed','true');
    $('#annotation-toggle').textContent='返回交互视图';
    toast('当前画面已冻结，可开启 Codex 标注；返回交互视图继续操作');
  }catch(error){closeAnnotation();toast('批注视图生成失败，请刷新页面后重试');console.error('批注视图生成失败',error);}
};
// 保留事件传播给预览批注器，但阻止副本中的控件触发默认动作。
$('#phone-annotation').addEventListener('click',event=>event.preventDefault());

function toast(t){$('#toast').textContent=t;$('#toast').classList.add('show');setTimeout(()=>$('#toast').classList.remove('show'),2400);}window.claimToast=toast;
function switchTab(t){closeAnnotation();tab=['fe','pc','admin','flow'].includes(t)?t:'fe';document.querySelectorAll('.view').forEach(el=>el.hidden=el.id!=='view-'+tab);document.querySelectorAll('[data-tab]').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));const u=new URL(location.href);u.searchParams.set('tab',tab);history.replaceState(null,'',u);if(tab==='admin')renderAdmin();}
function scene(s){closeAnnotation();screen=s;document.querySelectorAll('[data-screen]').forEach(b=>b.classList.toggle('active',b.dataset.screen===s));const row=scenes.find(x=>x[0]===s)||scenes[0];$('#scene-title').textContent=row[1];$('#scene-desc').textContent=row[2];$('#mobile').contentWindow.postMessage({type:'fr-wen-004-screen',screen:s},location.origin);requestAnimationFrame(fitPhone);}
$('#scenes').innerHTML=scenes.map(x=>`<button class="scene btn btn-ghost" data-screen="${x[0]}">${x[1]}</button>`).join('');
function showDrawer(title,html,rule=false){drawerReturn=document.activeElement;$('#drawer-title').textContent=title;$('#drawer-body').innerHTML=html;$('#drawer').classList.toggle('rule',rule);$('#drawer').hidden=false;$('#drawer-overlay').hidden=false;$('#drawer').classList.add('open');$('#drawer-overlay').classList.add('open');$('#workspace').inert=true;$('#rules-open').setAttribute('aria-expanded',rule?'true':'false');$('#drawer-close');$('#drawer .drawer-close').focus();}
function closeDrawer(){if($('#drawer').hidden)return;$('#drawer').hidden=true;$('#drawer-overlay').hidden=true;$('#workspace').inert=false;$('#rules-open').setAttribute('aria-expanded','false');drawerReturn?.focus();}
function modal(title,html,action){modalReturn=document.activeElement;modalAction=action;$('#modal-title').textContent=title;$('#modal-body').innerHTML=html;$('#modal-footer').innerHTML='<button class="btn btn-ghost" data-modal-close>关闭</button>'+(action?'<button class="btn btn-primary" id="modal-save">保存</button>':'');$('#modal-overlay').hidden=false;$('#modal-overlay').classList.add('open');$('#workspace').inert=true;if(!$('#drawer').hidden)$('#drawer').inert=true;$('#modal-overlay .modal').focus();}
function closeModal(){if($('#modal-overlay').hidden)return;$('#modal-overlay').hidden=true;$('#drawer').inert=false;$('#workspace').inert=!$('#drawer').hidden;modalReturn?.focus();}
const rules={fe:`<h3>1 页面与入口</h3><p>站内与站外私域统一在关键词流程前执行账号门槛。无门槛跳过账号步骤，有要求先读取本人账号，无账号提示添加，已有账号打开底部选择。</p><h3>2 上传</h3><p>第一步沿用，第二步有规则才逐书籍设置。一个书籍卡片为一个素材稿件，同卡成片共享整稿关键词；账号运营每稿最多5个关键词。成功上传后所有内容只读，审核驳回重新上传。</p><h3>3 账号与判断</h3><p>四平台完整身份与三指标才能保存，真实0有效，低指标也能添加。本人平台＋ID去重，删除二次确认。选择时使用最新规则，选定进入本次领取流程后，补关键词与提交不重审；不满足统一提示「本账号未满足要求」。添加返回重新分流，不自动领取。</p><h3>4 选词、占用与下载</h3><p>选词复用详情页底部弹窗，支持搜索与单选；选中后「选词领取」高亮，关闭返回详情。门槛读取失败仅在门槛区域提示及重试。先领后填须先通过门槛，占用后1小时内补关键词。成功关联关键词才算领取成功，才允许下载。超时释放稿件，关联保留为已超时，积分／次数退回；再领重新走流程和选账号。超时和再次下载复用已有已领页面，本 Demo 不另建页面或独立场景。已成功稿件再次下载直接放行，原扣次退款及作品回填规则沿用。</p><h3>5 业务流程</h3><p>见本页「业务流程」Tab。</p>`,admin:`<h3>1 素材类型</h3><p>居中新增编辑，指标独立启用、≤/≥、非负含0及小数，全部启用项取AND。存量稿件默认无门槛；类型删除后稿件类型显示「-」，后续新领取无门槛，历史关联保留。</p><h3>2 账号记录</h3><p>稿件管理第四个Tab「社交媒体账号」。九列为用户（右豹昵称、ID）、社交媒体账号（昵称、ID）、媒体平台、主页链接、粉丝数、关注数、获赞数、账号状态、新增时间。全部用户成功新增账号均记录，是否领取或达标不影响范围。</p><h3>3 状态与时间</h3><p>仅正常／已删除；用户删除后保留原行，重加另生成正常新行，跨用户独立。指标为添加时记录，不刷新；新增时间为保存成功时间。本页只用于记录查看。</p><h3>4 领取追溯</h3><p>本条领取的回填数量弹窗展示历史关联与实际回填链接，零回填保留关联；无关联显示「-」。占用超时保留账号及已超时记录。读取失败与空值区分。</p>`};
function openRules(){ruleReturn=document.activeElement;$('#rule-drawer').hidden=false;$('#rule-overlay').hidden=false;$('#rule-drawer').classList.add('open');$('#rule-overlay').classList.add('open');$('#workspace').inert=true;$('#rules-open').setAttribute('aria-expanded','true');ruleContent(tab==='admin'?'admin':'fe');$('#rule-drawer .drawer-close').focus();}function closeRules(){$('#rule-drawer').hidden=true;$('#rule-overlay').hidden=true;$('#workspace').inert=false;$('#rules-open').setAttribute('aria-expanded','false');ruleReturn?.focus();}function ruleContent(t){$('#rules-body').innerHTML=rules[t];document.querySelectorAll('[data-rule]').forEach(b=>b.classList.toggle('active',b.dataset.rule===t));}
function ruleSummary(rules){return ['粉丝数','关注数','获赞数'].flatMap((name,i)=>rules[i]?.on?[`${name}${rules[i].op}${rules[i].value}`]:[]).join('，')||'-';}
let socialPage=1,socialFailed=false,socialQuery={user:'',account:'',status:'',start:'',end:''};
function renderAdmin(){
 const s=M.state,names={types:'基础配置 / 素材类型',manuscripts:'稿件管理 / 稿件列表',claims:'稿件管理 / 领取记录',settlements:'稿件管理 / 结算明细',social:'稿件管理 / 社交媒体账号'};
 $('#admin-location').textContent=names[module];document.querySelectorAll('.product-nav [data-module]').forEach(b=>b.classList.toggle('active',module==='types'?b.dataset.module==='types':b.dataset.module==='claims'));
 $('#admin-tabs').innerHTML=module==='types'?'':[['manuscripts','稿件列表'],['claims','领取记录'],['settlements','结算明细'],['social','社交媒体账号']].map(([id,name])=>`<button data-module="${id}" class="${module===id?'active':''}">${name}</button>`).join('');
 if(module==='social'){renderSocial();return;}
 if(module==='manuscripts'){renderManuscripts();return;}
 if(module==='settlements'){$('#admin-content').innerHTML='<h2>结算明细</h2><div class="empty">暂无结算明细</div>';return;}
 $('#admin-content').innerHTML=module==='types'?`<h2>素材类型</h2><div class="toolbar"><button class="btn btn-primary" id="new-type">新增素材类型</button></div><div class="table-wrap"><table class="data-table"><thead><tr><th>素材类型</th><th>用途</th><th>领稿要求</th><th>状态</th><th>操作</th></tr></thead><tbody>${s.types.map(t=>`<tr><td>${esc(t.name)}</td><td>${esc(t.purpose||'国内代发')}</td><td>${esc(ruleSummary(t.rules))}</td><td><span class="tag tag-ok">启用</span></td><td><button class="link" data-type-edit="${t.id}">编辑</button><button class="link link-danger" data-type-delete="${t.id}">删除</button></td></tr>`).join('')}</tbody></table></div><div class="admin-scenarios"><button class="btn btn-ghost" data-admin-scene="save">Demo · 保存失败</button></div>`:`<div class="claim-filters"><label>用户/稿件<input id="claim-filter" placeholder="用户/稿件"></label><label>回填状态<select id="claim-state"><option value="">全部</option><option>待关联关键词</option><option>占用中</option><option>领取成功</option><option>待回填</option><option>已回填</option><option>已超时</option></select></label><label>稿件类型<select id="claim-type"><option value="">全部</option>${s.types.map(t=>`<option>${esc(t.name)}</option>`).join('')}</select></label><label>项目名称<select id="claim-project"><option value="">全部</option><option>番茄小说</option><option>知乎故事</option></select></label><label>书籍名称/id<input id="claim-book" placeholder="书名/书号"></label><label>剪辑手<input id="claim-editor" placeholder="剪辑手"></label><label>关键词<input id="claim-keyword" placeholder="关键词"></label><label>回填信息<input id="claim-fill" placeholder="回填信息"></label><label>领取时间<input type="date" id="claim-start" aria-label="领取开始日期"><input type="date" id="claim-end" aria-label="领取结束日期"></label><button id="claim-query" class="btn btn-primary">查询</button><button id="claim-reset" class="btn btn-ghost">重置</button></div><div id="claims-table"></div><div class="admin-scenarios"><button class="btn btn-ghost" data-admin-scene="read">Demo · 回填信息读取失败</button><button class="btn btn-ghost" data-admin-scene="zero">Demo · 零回填</button><button class="btn btn-ghost" data-admin-scene="unlinked">Demo · 无需关联账号</button></div>`;
 if(module==='claims')renderClaims();
}
function renderSocial(){
 $('#admin-content').innerHTML=`<h2>社交媒体账号</h2><div class="claim-filters"><label>用户昵称 / ID<input id="social-user" value="${esc(socialQuery.user)}" placeholder="右豹昵称 / ID"></label><label>社交媒体账号昵称 / ID<input id="social-account" value="${esc(socialQuery.account)}" placeholder="账号昵称 / ID"></label><label>账号状态<select id="social-status">${['','正常','已删除'].map(x=>`<option value="${x}" ${socialQuery.status===x?'selected':''}>${x||'全部'}</option>`).join('')}</select></label><label>新增时间<input id="social-start" type="date" value="${esc(socialQuery.start)}" aria-label="新增开始日期"><input id="social-end" type="date" value="${esc(socialQuery.end)}" aria-label="新增结束日期"></label><button class="btn btn-primary" id="social-query">查询</button><button class="btn btn-ghost" id="social-reset">重置</button></div><div id="social-table" aria-live="polite"></div><div class="admin-scenarios"><button class="btn btn-ghost" id="social-fault">Demo · 读取失败</button></div>`;
 renderSocialRows();
}
function renderSocialRows(){
 if(socialFailed){$('#social-table').innerHTML='<p class="error" role="alert">读取失败，未取得社交媒体账号记录。</p><button class="btn btn-primary" id="social-retry">重试</button>';return;}
 const q=socialQuery;const rows=M.state.accountHistory.filter(a=>(!q.user||(a.user+a.uid).includes(q.user))&&(!q.account||(a.nickname+a.id).includes(q.account))&&(!q.status||a.status===q.status)&&(!q.start||a.addedAt.slice(0,10)>=q.start)&&(!q.end||a.addedAt.slice(0,10)<=q.end)).sort((a,b)=>b.addedAt.localeCompare(a.addedAt));
 const pages=Math.max(1,Math.ceil(rows.length/15));socialPage=Math.min(socialPage,pages);
 const heads=['用户','社交媒体账号','媒体平台','主页链接','粉丝数','关注数','获赞数','账号状态','新增时间'];
 $('#social-table').innerHTML=`<div class="table-wrap"><table class="data-table social-table"><thead><tr>${heads.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.slice((socialPage-1)*15,socialPage*15).map(a=>`<tr><td>${esc(a.user)}<span class="cell-sub">ID：${esc(a.uid)}</span></td><td>${esc(a.nickname)}<span class="cell-sub">ID：${esc(a.id)}</span></td><td>${esc(a.platform)}</td><td><a class="link account-homepage" href="${esc(a.url)}" target="_blank" rel="noopener noreferrer">${esc(a.url)}</a></td>${a.values.map(v=>`<td>${esc(v)}</td>`).join('')}<td><span class="tag ${a.status==='正常'?'tag-ok':'tag-del'}">${esc(a.status)}</span></td><td>${esc(a.addedAt)}</td></tr>`).join('')||'<tr><td colspan="9">暂无社交媒体账号记录</td></tr>'}</tbody></table></div><div class="pagination"><span>共 ${rows.length} 条</span><button id="social-prev" ${socialPage===1?'disabled':''}>‹</button><span>${socialPage} / ${pages}</span><button id="social-next" ${socialPage===pages?'disabled':''}>›</button></div>`;
}
let manuscriptQuery={},manuscriptSource='右豹稿件';
function manuscriptRows(){return M.books().concat(M.state.publishedBooks.filter(b=>b.publishStatus==='已驳回'));}
function renderManuscripts(){
 const q=manuscriptQuery,field=(id,title,options)=>`<label>${title}${options?`<select id="manuscript-${id}">${['',...options].map(v=>`<option value="${esc(v)}" ${q[id]===v?'selected':''}>${esc(v||'全部')}</option>`).join('')}</select>`:`<input id="manuscript-${id}" value="${esc(q[id]||'')}" placeholder="${title}">`}</label>`;
 $('#admin-content').innerHTML=`<div class="claim-filters manuscript-filters">${field('title','标题/ID')}${field('occupancy','占用',['空闲','占用中','已完成'])}${field('review','审核',['已通过','待审核','已驳回'])}${field('status','稿件状态',['正常','已下架'])}${field('project','项目',['番茄小说','知乎故事'])}${field('book','书名')}${field('keyword','关键词')}${field('editor','剪辑手')}${field('channel','渠道',['PC上传'])}${field('type','素材类型',M.state.types.map(t=>t.name))}<label>上传时间<input id="manuscript-start" type="date" value="${esc(q.start||'')}" aria-label="上传开始日期"><input id="manuscript-end" type="date" value="${esc(q.end||'')}" aria-label="上传结束日期"></label><button class="btn btn-primary" id="manuscript-query">查询</button><button class="btn btn-ghost" id="manuscript-reset">重置</button></div><nav class="module-tabs manuscript-sources">${['右豹稿件','站外稿件','企业号稿件'].map(v=>`<button class="${v===manuscriptSource?'active':''}" data-manuscript-source="${v}">${v}</button>`).join('')}</nav><div id="manuscript-table"></div>`;
 renderManuscriptRows();
}
function manuscriptMeta(b){const records=M.state.claims.filter(r=>r.bookId===b.id),success=records.some(r=>M.canDownload(r));return {type:M.state.types.find(t=>t.id===b.typeId)?.name||'-',project:b.project||'番茄小说',bookId:b.bookId||b.id,keyword:(b.keywords||[]).join('、')||'-',editor:b.editor||'阿文（3595310）',channel:b.channel||'PC上传',status:b.status||'正常',review:b.publishStatus||'已通过',source:b.source||'右豹稿件',time:b.uploadedAt||'2026-11-04 10:20:00',occupancy:records.some(r=>['占用中','待关联关键词'].includes(r.status))?'占用中':success?'已完成':'空闲',fills:records.reduce((n,r)=>n+r.fills.length,0)};}
function renderManuscriptRows(){
 const q=manuscriptQuery,rows=manuscriptRows().map((b,i)=>({b,i,m:manuscriptMeta(b)})).filter(({b,m})=>m.source===manuscriptSource&&(!q.title||(b.name+b.id).includes(q.title))&&(!q.book||(b.name+m.bookId).includes(q.book))&&(!q.keyword||m.keyword.includes(q.keyword))&&(!q.editor||m.editor.includes(q.editor))&&['occupancy','review','status','project','channel','type'].every(k=>!q[k]||m[k]===q[k])&&(!q.start||m.time.slice(0,10)>=q.start)&&(!q.end||m.time.slice(0,10)<=q.end));
 const heads=['','ID','封面','标题','领稿要求','关键词','关键词项目','回填数量','项目','书','稿件信息','稿件目录','发布技巧','代运营合作模式','剪辑手','渠道','素材类型','占用状态','审核','操作'];
 $('#manuscript-table').innerHTML=`<div class="table-wrap"><table class="data-table manuscripts-table"><thead><tr>${heads.map((h,i)=>`<th>${i===0?'<input type="checkbox" id="manuscript-check-all" aria-label="全选当前稿件">':h}</th>`).join('')}</tr></thead><tbody>${rows.map(({b,i,m})=>`<tr><td><input type="checkbox" data-manuscript-check aria-label="选择${esc(b.name)}"></td><td>${esc(b.id)}</td><td><span class="manuscript-cover" aria-label="${esc(b.name)}封面示例">▤</span></td><td>${esc(b.name)}</td><td class="manuscript-requirement">${b.use?esc(M.summary(M.state.types.find(t=>t.id===b.typeId)?.rules||[])):'不限制'}</td><td>${esc(m.keyword)}</td><td>${esc(b.keywordProject||'-')}</td><td>${m.fills}</td><td>${esc(m.project)}</td><td>${esc(b.name)}<span class="cell-sub">书籍ID：${esc(m.bookId)}</span></td><td>${esc(b.size||'34.6 MB')} · ${(b.contents||[1,2]).length} 个文件</td><td><button class="link" data-manuscript="${i}">查看目录</button></td><td>${esc(b.tips||'-')}</td><td>${esc(b.mode||'任务协作')}</td><td>${esc(m.editor)}</td><td>${esc(m.channel)}</td><td>${esc(m.type)}</td><td><span class="tag ${m.occupancy==='已完成'?'tag-ok':'tag-warn'}">${esc(m.occupancy)}</span></td><td><span class="tag ${m.review==='已驳回'?'tag-del':'tag-ok'}">${esc(m.review)}</span></td><td><button class="link" data-manuscript="${i}">详情</button></td></tr>`).join('')||'<tr><td colspan="20">暂无稿件</td></tr>'}</tbody></table></div><div class="pagination"><span>共 ${rows.length} 条</span><button disabled>‹</button><span>1 / 1</span><button disabled>›</button></div>`;
}

function claimMeta(r){return {uid:r.uid||'100004',project:r.project||'番茄小说',type:r.typeId?(M.state.types.find(t=>t.id===r.typeId)?.name||'-'):(r.type||'短剧解说'),bookId:r.bookId||M.books().find(b=>b.name===r.book)?.id||'-',editor:r.editor||'3595310',editorName:r.editorName||'阿文',keyword:r.keyword||'-',deduct:r.deduct||'零元',deductCount:r.deductCount||'零元',status:r.status||(r.fills.length?'已回填':'待回填'),time:r.time||'2026-11-04 10:30'};}
function renderClaims(){
 const value=id=>$('#claim-'+id).value.trim();
 const rows=M.state.claims.filter(r=>{const m=claimMeta(r);return (!value('filter')||(r.id+r.book+r.user+m.uid).includes(value('filter')))&&(!value('state')||m.status===value('state'))&&(!value('type')||m.type===value('type'))&&(!value('project')||m.project===value('project'))&&(!value('book')||(r.book+m.bookId).includes(value('book')))&&(!value('editor')||(m.editor+m.editorName).includes(value('editor')))&&(!value('keyword')||m.keyword.includes(value('keyword')))&&(!value('fill')||r.fills.some(f=>(f.url+f.author).includes(value('fill'))))&&(!value('start')||m.time.slice(0,10)>=value('start'))&&(!value('end')||m.time.slice(0,10)<=value('end'));});
 const heads=['ID','用户','稿件','项目名称','稿件类型','书籍信息','剪辑手','关键词','回填数量','扣次','扣次','状态','领取时间','操作'];
 $('#claims-table').innerHTML=`<div class="table-wrap"><table class="data-table claims-table"><thead><tr>${heads.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>{const m=claimMeta(r);return `<tr><td>${esc(r.id)}</td><td>${esc(r.user)}（${esc(m.uid)}）</td><td>${esc(r.book)}</td><td>${esc(m.project)}</td><td><span class="tag tag-warn">${esc(m.type)}</span></td><td>${esc(r.book)}<span class="cell-sub">书籍 ID ${esc(m.bookId)}</span></td><td>${esc(m.editor)}<span class="cell-sub">${esc(m.editorName)}</span></td><td>${esc(m.keyword)}</td><td><button class="link" data-count="${r.id}">${r.fills.length}</button></td><td>${esc(m.deduct)}</td><td>${esc(m.deductCount)}</td><td><span class="tag ${m.status==='已回填'?'tag-ok':'tag-warn'}">${esc(m.status)}</span></td><td>${esc(m.time)}</td><td><button class="link" data-record="${r.id}">稿件详情</button></td></tr>`;}).join('')||'<tr><td colspan="14">暂无领取记录</td></tr>'}</tbody></table></div><div class="pagination"><span>共 ${rows.length} 条</span><button disabled>‹</button><button>1</button><button disabled>›</button><select aria-label="每页条数"><option>15条/页</option><option selected>20条/页</option><option>50条/页</option></select></div>`;
}
function accountInfo(a){return a?`${esc(a.platform)}<span class="cell-sub">${esc(a.nickname)}<br>ID：${esc(a.id)}</span><span class="cell-sub">主页链接：${/^https?:\/\//i.test(a.url||'')?`<a class="link account-homepage" href="${esc(a.url)}" target="_blank" rel="noopener noreferrer">${esc(a.url)}</a>`:'-'}</span>`:'-';}
function showCounts(id,retry=false){
 const r=M.state.claims.find(x=>x.id===id),failed=!retry&&M.consume('admin-read');
 modal(`回填详情 - ${r.book}`,failed?`<p class="error">读取失败，未取得本条领取信息。</p><button class="btn btn-primary" data-retry-count="${id}">重试</button>`:`${!r.fills.length?`<div class="summary-grid"><div><small>领稿账号信息</small>${accountInfo(r.account)}</div></div>`:''}<div class="table-wrap"><table class="data-table fill-details"><thead><tr>${['回填链接','回填时间','账号','平台','状态','来源','关键词','用户','领稿账号信息'].map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${r.fills.map(f=>`<tr><td><a class="link" href="${esc(f.url)}" target="_blank" rel="noopener">${esc(f.url)}</a></td><td>${esc(f.time)}</td><td>${esc(f.account||'-')}</td><td>${esc(f.platform||'抖音')}</td><td><span class="tag tag-ok">${esc(f.status||'已回填')}</span></td><td>${esc(f.source||'领取回填')}</td><td>${esc(f.keyword||claimMeta(r).keyword)}</td><td>${esc(f.user||r.user)}</td><td>${accountInfo(r.account)}</td></tr>`).join('')||'<tr><td colspan="9">暂无回填记录</td></tr>'}</tbody></table></div>`);
}

function editType(fresh=false,typeId='short'){const type=M.state.types.find(t=>t.id===typeId);const draft=fresh?M.state.rules.map(()=>({on:false,op:'',value:''})):M.copy(type.rules);modal(fresh?'新增素材类型':'编辑素材类型 · 统一领取要求',`<label>类型名称<input id="type-name" value="${fresh?'':esc(type.name)}"></label><label>用途<input id="type-purpose" value="${fresh?'':esc(type.purpose||'国内代发')}" maxlength="100"></label><h3>统一领取要求</h3><p>全部启用条件需同时满足</p>${draft.map((r,i)=>`<section class="metric-row"><div><label><input type="checkbox" data-enabled="${i}" ${r.on?'checked':''}> ${M.state.fields[i]}</label><select id="op-${i}" aria-label="${M.state.fields[i]}比较符" ${r.on?'':'disabled'}><option value="">选择比较符</option><option ${r.op==='≥'?'selected':''} value="≥">≥ 大于等于</option><option ${r.op==='≤'?'selected':''} value="≤">≤ 小于等于</option></select><input id="value-${i}" type="text" inputmode="decimal" aria-label="${M.state.fields[i]}阈值" value="${r.value}" ${r.on?'':'disabled'}></div><p class="error" id="metric-error-${i}"></p></section>`).join('')}<p class="muted">不启用表示不限制；保存影响后续领取，不撤销历史。</p><p class="error" id="rule-error" role="alert"></p>`);drawerAction=()=>{let valid=true;draft.forEach((r,i)=>{r.on=$(`[data-enabled="${i}"]`).checked;r.op=$('#op-'+i).value;r.value=$('#value-'+i).value;const bad=r.on&&(!r.op||r.value.trim()===''||!Number.isFinite(Number(r.value))||Number(r.value)<0);$('#metric-error-'+i).textContent=bad?'请选择比较符并输入非负数（允许0和小数）':'';if(bad)valid=false;});if(!$('#type-name').value.trim()){valid=false;$('#rule-error').textContent='请填写类型名称';}if(!valid){const first=$('#modal-body .error:not(:empty)');if(first){first.tabIndex=-1;first.focus();}return;}if(M.consume('admin-save')){$('#rule-error').textContent='保存失败，草稿保留，请重试';return;}const saved=draft.map(r=>({...r,value:Number(r.value)}));if(fresh){M.state.types.push({id:'type'+(++M.state.sequence),name:$('#type-name').value.trim(),purpose:$('#type-purpose').value.trim(),rules:saved});}else{type.name=$('#type-name').value.trim();type.purpose=$('#type-purpose').value.trim();type.rules=saved;if(type.id==='short')M.state.rules=saved;}M.state.version++;closeModal();renderAdmin();toast('演示：规则已保存，对后续新进入生效');};modalAction=drawerAction;$('#modal-footer').innerHTML='<button class="btn btn-ghost" data-modal-close>取消</button><button class="btn btn-primary" id="modal-save">保存</button>'; }

function renderFlow(){
 const box=(x,y,lines,kind='fe')=>{const c={fe:['#eff6ff','#2563eb'],be:['#f0fdf4','#16a34a'],error:['#fef2f2','#dc2626'],skip:['#f1f5f9','#94a3b8'],async:['#fff7ed','#ea580c']}[kind];return `<g><rect x="${x}" y="${y}" width="260" height="70" rx="8" fill="${c[0]}" stroke="${c[1]}"/><text x="${x+130}" y="${y+28}" text-anchor="middle">${lines.map((v,i)=>`<tspan x="${x+130}" dy="${i?20:0}">${esc(v)}</tspan>`).join('')}</text></g>`;};
 const nodes=[
 [560,40,['后台配置素材类型','三项门槛独立启用'],'be'],
 [560,180,['上传：一卡打包一个稿件','多条成片共享整稿关键词']],
 [560,320,['上传成功后全部内容只读','查看详情；驳回后重新上传新稿']],
 [1000,320,['原稿记录保留','重新上传从第一步开始'],'async'],
 [560,460,['站内 / 站外私域领取','读取最新类型和门槛']],
 [80,460,['读取失败：阻止领取','重试成功后继续'],'error'],
 [560,600,['本稿件是否存在有效门槛？','存量默认无门槛 / 删除类型显示 -']],
 [1000,600,['无门槛：跳过账号选择','仍需完成关键词关联'],'skip'],
 [560,740,['选择账号时按最新规则判断','使用已保存静态指标，全部条件满足']],
 [80,740,['无账号或全部不满足','添加账号 / 不合格账号禁选']],
 [80,880,['识别完整身份和三项指标','未达标也可保存；重复不新增'],'async'],
 [80,1020,['保存成功进入账号历史','后台「社交媒体账号」八列表'],'be'],
 [1000,880,['用户确认删除账号','本人可选列表移除']],
 [1000,1020,['账号历史保留：已删除','重新添加产生新的正常记录'],'be'],
 [560,1160,['确认选定账号，进入领取流程','固定本次账号判断，不受规则变化影响'],'be'],
 [560,1300,['关键词相关流程','按原规则申请 / 扣积分或次数']],
 [1000,1300,['先领后填：稿件占用中','1 小时内补关键词，暂不可下载'],'async'],
 [1000,1440,['是否在 1 小时内关联成功？','期间无需重新校验账号']],
 [1000,1580,['已超时：稿件释放，其他人可领','关联记录保留；积分 / 次数退回'],'error'],
 [1000,1720,['再次领取：重新走流程','按最新规则重新选择账号']],
 [560,1580,['关键词成功关联 = 领取成功','保存领稿账号及关键词关联'],'be'],
 [560,1720,['首次下载 / 再次下载整稿','领取成功后的再次下载直接放行']],
 [560,1860,['发布作品与回填沿用原流程','不比对领稿账号与作品账号']],
 [560,2000,['后台领取记录 / 回填详情','追溯本次关联与实际作品链接'],'be']
 ];
 const edges=[
 ['690,110 690,180'],['690,250 690,320'],['820,355 1000,355','驳回',900,342],['1130,320 1130,150 690,150 690,180','新稿',1140,240],
 ['690,390 690,460'],['560,495 340,495','失败',435,480],['210,460 210,430 690,430 690,460','重试',400,416],
 ['690,530 690,600'],['820,635 1000,635','否',900,620],['690,670 690,740','是',702,708],
 ['560,775 340,775','需添加',420,760],['210,810 210,880'],['210,950 210,1020'],['340,1055 430,1055 430,845 690,845 690,810','返回判断',440,920],
 ['820,775 1130,775 1130,880','删除',1140,830],['1130,950 1130,1020'],['1000,1055 930,1055 930,845 690,845 690,810','重选',940,920],
 ['690,810 690,1160','满足并确认',702,1125],['1130,670 1290,670 1290,1265 690,1265 690,1300'],
 ['690,1230 690,1300'],['820,1335 1000,1335','先占用',890,1320],['1130,1370 1130,1440'],
 ['1000,1475 890,1475 890,1615 820,1615','是',902,1500],['1130,1510 1130,1580','否',1142,1545],
 ['1130,1650 1130,1720'],['1260,1755 1380,1755 1380,495 820,495','重走领取',1390,1130],
 ['690,1370 690,1580','成功关联',702,1530],['690,1650 690,1720'],['690,1790 690,1860'],['690,1930 690,2000']
 ];
 $('#flow-chart').innerHTML=`<svg width="1490" height="2140" viewBox="0 0 1490 2140" role="img" aria-labelledby="claim-flow-title"><title id="claim-flow-title">FR-wen-004 最终业务流程：先校验账号，成功关联关键词后下载</title><defs><marker id="wen004-flow-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8" fill="#94a3b8"/></marker></defs><g class="flow-edges">${edges.map(([p])=>`<polyline points="${p}" marker-end="url(#wen004-flow-arrow)"/>`).join('')}</g><g class="flow-nodes">${nodes.map(n=>box(...n)).join('')}${edges.filter(e=>e[1]).map(([,l,x,y])=>`<text x="${x}" y="${y}">${l}</text>`).join('')}<text x="80" y="2115">关联失败保留当前流程可重试；先领后填超时按原规则退款 / 退次；账号历史仅供后台查看。</text></g></svg>`;
}

document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.id==='claim-reset'){renderAdmin();return;}if(b.dataset.adminScene){const kind=b.dataset.adminScene;if(kind==='save'){M.state.faults['admin-save']=true;editType(false,M.state.types[0].id);}else{M.state.faults['admin-read']=kind==='read';const r=M.state.claims.find(x=>kind==='zero'?x.fills.length===0:kind==='unlinked'?!x.account:true);if(r)showCounts(r.id);}return;}if(b.dataset.tab)switchTab(b.dataset.tab);if(b.dataset.screen)scene(b.dataset.screen);if(b.dataset.module){module=b.dataset.module;renderAdmin();if(module==='claims'){const r=M.state.claims.find(x=>x.fills.length)||M.state.claims[0];if(r){document.querySelector(`[data-count="${r.id}"]`)?.focus({preventScroll:true});showCounts(r.id);}}}if(b.dataset.rule)ruleContent(b.dataset.rule);if(b.id==='rules-open')openRules();if(b.hasAttribute('data-rule-close'))closeRules();if(b.hasAttribute('data-close'))closeDrawer();if(b.hasAttribute('data-modal-close'))closeModal();if(b.id==='modal-save')modalAction?.();if(b.id==='save-rule')drawerAction?.();if(b.dataset.typeEdit)editType(false,b.dataset.typeEdit);if(b.id==='new-type')editType(true);if(b.dataset.typeDelete){const t=M.state.types.find(x=>x.id===b.dataset.typeDelete);modal('删除素材类型',`<p>确认删除“${esc(t.name)}”？</p><p>删除后关联稿件的类型显示「-」，后续新领取改为无门槛；历史领取信息保留。</p>`,()=>{M.deleteType(t.id);closeModal();renderAdmin();toast('演示：类型已删除，后续领取无门槛');});$('#modal-footer').innerHTML='<button class="btn btn-ghost" data-modal-close>取消</button><button class="btn btn-danger" id="modal-save">确认删除</button>';}if(b.id==='claim-query')renderClaims();if(b.dataset.count)showCounts(b.dataset.count);if(b.dataset.retryCount){const r=modalReturn;showCounts(b.dataset.retryCount,true);modalReturn=r;}if(b.dataset.record){const r=M.state.claims.find(x=>x.id===b.dataset.record);showDrawer(`领取详情 · ${r.id}`,`<p>用户：${esc(r.user)}</p><p>稿件：${esc(r.book)}</p><p>状态：${esc(claimMeta(r).status)}</p><p>回填数量：<button class="link" data-count="${r.id}">${r.fills.length}</button></p>`);}if(b.id==='reset-demo'){M.reset();$('#mobile').contentWindow.postMessage({type:'fr-wen-004-reset'},location.origin);scene('detail');toast('演示已重置');}});
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
 if(b.id==='manuscript-query'){manuscriptQuery=Object.fromEntries(['title','occupancy','review','status','project','book','keyword','editor','channel','type','start','end'].map(k=>[k,$('#manuscript-'+k).value.trim()]));renderManuscriptRows();}
 if(b.id==='manuscript-reset'){manuscriptQuery={};renderManuscripts();}
 if(b.dataset.manuscriptSource){manuscriptSource=b.dataset.manuscriptSource;renderManuscripts();}
 if(b.id==='social-query'){socialQuery={user:$('#social-user').value.trim(),account:$('#social-account').value.trim(),status:$('#social-status').value,start:$('#social-start').value,end:$('#social-end').value};socialPage=1;renderSocialRows();}
 if(b.id==='social-reset'){socialQuery={user:'',account:'',status:'',start:'',end:''};socialPage=1;socialFailed=false;renderSocial();}
 if(b.id==='social-fault'){socialFailed=true;renderSocialRows();}
 if(b.id==='social-retry'){socialFailed=false;$('#social-table').innerHTML='<p role="status">正在加载账号记录…</p>';setTimeout(()=>{if(module==='social')renderSocialRows();},150);}
 if(b.id==='social-prev'){socialPage--;renderSocialRows();}if(b.id==='social-next'){socialPage++;renderSocialRows();}
 if(b.dataset.manuscript!==undefined){const r=manuscriptRows()[+b.dataset.manuscript];showDrawer('稿件详情',`<h3>${esc(r.name)}</h3><p>稿件 ID：${esc(r.id)}</p><p>素材类型：${esc(M.state.types.find(t=>t.id===r.typeId)?.name||'-')}</p><p>整稿关键词：${esc((r.keywords||[]).join('、')||'按原关键词流程关联')}</p><p>成片：${esc((r.contents||['示例成片01','示例成片02']).join('、'))}</p><p class="muted">上传成功后所有内容只读。素材审核驳回后需重新上传稿件。</p>`);}
});
document.addEventListener('change',e=>{if(e.target.id==='manuscript-check-all')document.querySelectorAll('[data-manuscript-check]').forEach(c=>c.checked=e.target.checked);if(e.target.dataset.enabled!==undefined){const i=e.target.dataset.enabled;$('#op-'+i).disabled=!e.target.checked;$('#value-'+i).disabled=!e.target.checked;}});
$('#rule-overlay').onclick=closeRules;$('#drawer-overlay').onclick=closeDrawer;$('#modal-overlay').onclick=e=>{if(e.target===$('#modal-overlay'))closeModal();};document.addEventListener('keydown',e=>{const root=!$('#modal-overlay').hidden?$('#modal-overlay .modal'):!$('#rule-drawer').hidden?$('#rule-drawer'):!$('#drawer').hidden?$('#drawer'):null;if(!root)return;if(e.key==='Escape'){e.preventDefault();if(!$('#modal-overlay').hidden)closeModal();else if(!$('#rule-drawer').hidden)closeRules();else closeDrawer();}if(e.key==='Tab'){const els=[...root.querySelectorAll('button:not(:disabled),input:not(:disabled),select:not(:disabled),a[href]')].filter(x=>x.getClientRects().length);if(e.shiftKey&&(document.activeElement===els[0]||document.activeElement===root)){e.preventDefault();els.at(-1)?.focus();}else if(!e.shiftKey&&(document.activeElement===els.at(-1)||document.activeElement===root)){e.preventDefault();els[0]?.focus();}}});window.addEventListener('message',e=>{if(e.origin!==location.origin||e.source!==$('#mobile').contentWindow)return;if(e.data.type==='fr-wen-004-ready')scene(screen);});renderFlow();switchTab(new URLSearchParams(location.search).get('tab'));scene('detail');
if(tab==='admin')renderAdmin();
})();
