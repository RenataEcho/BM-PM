'use strict';
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const sceneSets = {
  mobile: [
    ['plaza','一键代发广场','项目筛选与三列稿件列表'],['detail','稿件详情 / 立即领取','试看片、书籍与领取说明'],
    ['unregistered','未报名 · 报名引导','领取后进入现有开白表单'],['register','报名表单 · 复用示意','填写账号、资质截图并提交审核'],
    ['accounts','多个抖音号 · 选择账号','只允许合格账号领取'],['ineligible','已报名 · 无合格账号','待审核、资质不合格不能领取'],
    ['keyword','账号运营 · 单关键词','每次只领取一个关键词'],['claimed','我的领取 · 未回填','查看关联账号并进入回填'],
    ['fill','视频回填 · 账号锁定','确认后才解析、依次校验'],['account-error','账号不一致','保留输入，重填，不记违规'],
    ['video-error','视频 ID 不一致','账号通过后校验视频 ID'],['success','回填成功 / 收益明细','有效回填才形成分账绑定'],
    ['timeout','未回填超时','继续沿用一键代发既有处理']
  ],
  pc: [['dashboard','剪辑供稿看板','沿用现有供稿入口'],['upload','上传稿件 · 三步流程','项目投向、书籍成片、确认上传'],['match-error','书籍 / 任务匹配失败','未匹配不能进入下一步'],['keyword','账号运营 · 关联关键词','支持多个关键词，不推广到全部模式'],['review','已提交 · 待审核','审核通过后才进入稿件池'],['rejected','审核驳回 · 修改重提','返回书籍与成片修改']]
};
let activeTab = 'fe', surface = 'mobile', screen = 'plaza', adminTab = 'manuscripts', filters = {}, modalSave = null, modalDelete = false;
let focusReturn = {rules:null, detail:null, modal:null};
const manuscripts = [
 {id:'1409', title:'夏日回声',project:'融合短剧',book:'7698713701427186713',mode:'账号运营',keywords:['星河01','星河02','星河03'],count:2,audit:'已通过',state:'正常',date:'2026-10-22',editor:'填100006'},
 {id:'1408', title:'星河入梦',project:'融合漫剧',book:'7698713701427186720',mode:'任务协作',keywords:[],count:1,audit:'已通过',state:'正常',date:'2026-10-22',editor:'剪辑手小林'},
 {id:'1407', title:'山海之间',project:'融合故事',book:'7698713701427186731',mode:'任务协作',keywords:[],count:0,audit:'待审核',state:'正常',date:'2026-10-21',editor:'剪辑手小林'},
 {id:'1406', title:'落日来信',project:'融合短剧',book:'7698713701427186742',mode:'任务协作',keywords:[],count:0,audit:'已驳回',state:'正常',date:'2026-10-21',editor:'填100006'}
];
const claims = [
 {id:'142',mid:'1409',user:'小周',uid:'3595284',keyword:'星河01',account:'周周的剧场',handle:'zhouzhou_01',state:'已回填',violation:false,date:'2026-10-22',time:'09:24:07',video:'7561234567890101',official:true},
 {id:'141',mid:'1409',user:'小橙',uid:'3595285',keyword:'星河02',account:'小橙追剧',handle:'xiaocheng_02',state:'已回填',violation:false,date:'2026-10-22',time:'10:16:13',video:'7561234567890102',official:false},
 {id:'140',mid:'1409',user:'小周',uid:'3595284',keyword:'星河03',account:'周周的剧场',handle:'zhouzhou_01',state:'已超时释放',violation:true,date:'2026-10-20',time:'08:10:00',video:null,official:false},
 {id:'139',mid:'1408',user:'林林',uid:'3595414',keyword:'-',account:'林林说漫',handle:'linlin_03',state:'已回填',violation:false,date:'2026-10-22',time:'11:12:00',video:'7561234567890103',official:true}
];
// 官方拉取样例独立于手工回填，按领取记录保存，缺失时不回退到回填字段。
const officialSamples = {
 '142':{account:'周周的剧场',video:'7561234567890101',url:'https://www.douyin.com/video/7561234567890101'},
 '139':{account:'林林说漫',video:'7561234567890103',url:'https://www.douyin.com/video/7561234567890103'}
};
claims.forEach(r=>r.officialData=officialSamples[r.id]||null);
function toast(message){const t=$('#toast');t.textContent=message;t.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>t.classList.remove('show'),2500);}
function setTab(tab, update=true){activeTab=['fe','admin','flow'].includes(tab)?tab:'fe';$$('[data-tab]').forEach(b=>{b.classList.toggle('active',b.dataset.tab===activeTab);b.setAttribute('aria-pressed',String(b.dataset.tab===activeTab));});$$('.view').forEach(v=>v.hidden=v.id!==`view-${activeTab}`);if(update){const u=new URL(location.href);u.searchParams.set('tab',activeTab);history.replaceState(null,'',u);}if(activeTab==='fe')requestAnimationFrame(sizeDevice);}
function sizeDevice(){if(surface!=='mobile')return;const area=$('#board-scroll');const scale=Math.max(.35,Math.min(1,(area.clientHeight-32)/796,(area.clientWidth-32)/406));const d=$('#device');d.style.width=`${406*scale}px`;d.style.height=`${796*scale}px`;d.style.padding=`${8*scale}px`;d.style.borderRadius=`${30*scale}px`;$('#mockup').style.transform=`scale(${scale})`;}
function setSurface(value, initial){surface=value==='pc'?'pc':'mobile';screen=initial||sceneSets[surface][0][0];$$('[data-surface]').forEach(b=>b.classList.toggle('active',b.dataset.surface===surface));$('#device').className=`device ${surface==='mobile'?'phone':'desktop'}`;$('#device').removeAttribute('style');$('#mockup').removeAttribute('style');$('#mockup').title=surface==='mobile'?'FR-003 创作者手机端交互演示':'FR-003 剪辑手PC供稿交互演示';$('#board-title').textContent=surface==='mobile'?'创作者 · 一键代发':'剪辑手 PC · 剪辑供稿';$('#scenes').innerHTML=sceneSets[surface].map(([key,title,desc])=>`<button class="scene-btn ${key===screen?'active':''}" data-screen="${key}"><strong>${title}</strong><span>${desc}</span></button>`).join('');loadScene();}
function loadScene(){const entry=sceneSets[surface].find(s=>s[0]===screen);$('#scene-caption').textContent=entry?entry[2]:'';$$('[data-screen]').forEach(b=>{b.classList.toggle('active',b.dataset.screen===screen);b.setAttribute('aria-pressed',String(b.dataset.screen===screen));});$('#mockup').src=`fr-003-fusion-${surface}.html?v=20261022-4&embed=1&screen=${encodeURIComponent(screen)}`;requestAnimationFrame(sizeDevice);}
function openDrawer(kind){if(kind==='rules')closeDrawer('detail',false);if(kind==='detail')closeDrawer('rules',false);focusReturn[kind]=document.activeElement;const drawer=$(`#${kind}-drawer`),overlay=$(`#${kind}-overlay`);drawer.hidden=false;overlay.hidden=false;drawer.classList.add('open');overlay.classList.add('open');$('#rules-open').setAttribute('aria-expanded',String(kind==='rules'));drawer.focus();}
function closeDrawer(kind, restore=true){const d=$(`#${kind}-drawer`),o=$(`#${kind}-overlay`);if(d.hidden)return;d.hidden=true;o.hidden=true;d.classList.remove('open');o.classList.remove('open');if(kind==='rules')$('#rules-open').setAttribute('aria-expanded','false');if(restore&&focusReturn[kind]?.isConnected)focusReturn[kind].focus();}
function rulePanel(which){$$('[data-rule]').forEach(b=>{b.classList.toggle('active',b.dataset.rule===which);b.setAttribute('aria-pressed',String(b.dataset.rule===which));});$$('.rule-panel').forEach(p=>p.classList.toggle('active',p.id===`rule-${which}`));}
function section(title,body){return `<section class="rule-section"><h3>${title}</h3><div class="rule-content">${body}</div></section>`;}
$('#rule-fe').innerHTML=[section('1 业务目标','让融合稿件通过匹配和审核后可领取，创作者以合格抖音号完成视频回填与收益绑定。'),section('2 页面与入口','<ul><li>剪辑手沿用 PC 供稿入口。书籍名称和书籍 ID 从星图任务检索，匹配失败不可提交下一步；审核驳回可修改重提。</li><li>一键代发广场新增融合短剧、融合漫剧、融合故事筛选；无报名账号由「立即报名」进入现有开白表单，有报名账号由选择 Sheet 中「其他抖音号报名」增加账号。</li><li>报名与审核完整复用现有开白表单，不新增审核能力。</li></ul>'),section('3 交互规则','<ul><li>合格账号必须无违规、已实名且成年、已设置提现、总粉丝 ≥1000、有效粉丝 >500，且有资质截图；一个用户可报名多个账号，合格账号后续可复用。</li><li>每次领取只选本人一个合格抖音号；无合格账号或达到既有停权条件不能领取。领取时的账号在回填中只读。</li><li>账号运营上传需关联关键词、支持多个；每次领取一个关键词，每个关键词完成回填形成一条记录；其他运营模式不统一要求关键词。</li></ul>'),section('4 边界规则','<ul><li>点击「确认回填」才解析链接。先账号一致，再视频 ID 与官方接口视频 ID 一致；账号失败提示「视频链接与报名抖音号不匹配」。视频不符提示重填，有疑问咨询客服；保留输入。</li><li>即时校验失败不新增违规，不形成分账；成功才形成有效分账绑定。接口失败沿用既有系统处理，不新增重试策略。</li><li>取消回填成功后的官方任务数据再次比对记违规及本 FR 三次停权条款；既有领取次数、24小时未回填违规、超时释放、停权和分账保持原口径，不新增独立任务完成节点。</li><li>已报名但无合格账号的具体文案与信息分层 [待确认]。</li></ul>'),section('5 业务流程','见本页业务流程。')].join('');
$('#rule-admin').innerHTML=[section('1 业务目标','运营在现有稿件与领取记录中核对回填和官方参与任务内容，定位到具体领取记录；不新增独立后台模块。'),section('2 数据表与字段','<ul><li>稿件列表复用审核状态：待审核 / 已通过 / 已驳回；稿件状态：正常 / 已删除。不新增独立上架状态，「正常」不等于审核通过。</li><li>领取记录新增「参与任务信息」：官方实际发布抖音号、视频 ID、视频 URL；新增「涉嫌违规」：是 / 否。</li><li>「回填数量」是当前稿件被领取后形成的回填记录条数。账号运营多个关键词可形成多条；仅关联或领取而未回填不计数。</li><li>数量弹窗逐条展示：创作者昵称和用户ID；回填平台、昵称、链接、视频ID、发布日期、作品类型、内容类型；官方平台、昵称、链接、视频ID。来源分组且逐条对应。</li></ul>'),section('3 列表与筛选','<ul><li>以稿件标题/ID、项目、状态与日期定位记录，领取记录可按用户定位。</li><li>稿件详情为右侧抽屉，编辑为居中弹窗，删除先确认。「回填数量」依已定 UX 为居中只读弹窗，可滚动查看多条记录。</li><li>官方视频无法匹配时显示「-」，不串用其他领取记录，也不用手填信息替代官方信息。</li></ul>'),section('4 边界规则','<ul><li>每次领取都有一条记录。领取后未在24小时内回填，按既有规则将该条涉嫌违规标「是」，其他领取不连带；其余未命中既有违规条件显示「否」。判定和更新沿用既有机制。</li><li>官方未匹配、回填即时校验失败不直接记违规；仍未回填达到既有超时条件时照常处理。</li><li>报名审核以外的其他既有字段展示范围 [待确认]；零条表现、明细排序、分页、部分字段缺失的展示 [待确认]。多平台明细不意味着融合任务支持抖音以外的报名账号。</li></ul>')].join('');
function setAdmin(tab){adminTab=tab;document.querySelector('#filter-state-label').firstChild.textContent=tab==='manuscripts'?'审核状态':'回填状态';filters={};$$('[data-admin]').forEach(b=>b.classList.toggle('active',b.dataset.admin===tab));$('#filter-state').innerHTML=(tab==='manuscripts'?['全部','待审核','已通过','已驳回']:['全部','待回填','已回填','已超时释放']).map((s,i)=>`<option value="${i?s:''}">${s}</option>`).join('');$('#filter-form').reset();$('#table-heading').textContent=tab==='manuscripts'?'右豹稿件':'稿件领取记录';renderTable();}
function tag(text,cls='ok'){return `<span class="tag tag-${cls}">${esc(text)}</span>`;}
function videoLink(id,label='查看视频'){return `<button class="link" data-video="${esc(id)}">${esc(label)}</button>`;}
function renderTable(){let records=adminTab==='manuscripts'?manuscripts:claims;records=records.filter(r=>{const m=adminTab==='manuscripts'?r:manuscripts.find(m=>m.id===r.mid);return (!filters.query||[r.id,r.user,r.uid,m.title,m.book].filter(Boolean).join(' ').includes(filters.query))&&(!filters.project||m.project===filters.project)&&(!filters.state||(adminTab==='manuscripts'?r.audit:r.state)===filters.state)&&(!filters.date||r.date===filters.date);});const table=$('#admin-table');if(adminTab==='manuscripts'){
 const widths=[70,180,130,190,130,130,80,110,110,100,110,140,170];const heads=['ID','标题 / 封面','项目','书籍信息','关键词','运营模式','回填数量','剪辑手','审核状态','稿件状态','渠道 / 类型','上传时间','操作'];
 table.innerHTML=`<colgroup>${widths.map(w=>`<col style="width:${w}px">`).join('')}</colgroup><thead><tr>${heads.map((h,i)=>`<th class="${i===heads.length-1?'col-action':''}">${h}</th>`).join('')}</tr></thead><tbody>${records.map(m=>`<tr><td>${m.id}</td><td><div class="cell-title"><span class="cover">融合<br>视频</span><b>${esc(m.title)}</b></div></td><td>${m.project}</td><td>${esc(m.title)}<span class="cell-sub">书籍 ID ${m.book}</span></td><td>${m.keywords.length?m.keywords.join('、'):'-'}</td><td>${m.mode}</td><td><button class="link" data-count="${m.id}" aria-label="查看${esc(m.title)}的${m.count}条回填明细">${m.count}</button></td><td>${esc(m.editor)}</td><td>${tag(m.audit,m.audit==='已通过'?'ok':m.audit==='已驳回'?'del':'warn')}</td><td>${tag(m.state,m.state==='正常'?'ok':'del')}</td><td>PC上传<span class="cell-sub">站内 · 视频</span></td><td>${m.date}<span class="cell-sub">15:24:07</span></td><td class="col-action"><button class="link" data-detail="${m.id}">详情</button><button class="link" data-edit="${m.id}" ${m.state==='已删除'?'disabled':''}>编辑</button><button class="link link-danger" data-delete="${m.id}" ${m.state==='已删除'?'disabled':''}>删除</button></td></tr>`).join('')||'<tr><td colspan="13" class="empty-cell">暂无匹配稿件<br>请调整筛选条件</td></tr>'}</tbody>`;
 }else{const widths=[70,140,150,110,160,130,110,200,240,110,120,160,100];const heads=['ID','用户','稿件','项目名称','书籍信息','领取关联抖音号','关键词','回填信息','参与任务信息','涉嫌违规','状态','领取时间','操作'];table.innerHTML=`<colgroup>${widths.map(w=>`<col style="width:${w}px">`).join('')}</colgroup><thead><tr>${heads.map((h,i)=>`<th class="${i===heads.length-1?'col-action':''}">${h}</th>`).join('')}</tr></thead><tbody>${records.map(r=>{const m=manuscripts.find(m=>m.id===r.mid);return `<tr><td>${r.id}</td><td>${esc(r.user)}<span class="cell-sub">用户 ID ${r.uid}</span></td><td>${esc(m.title)}<span class="cell-sub">稿件 ${m.id}</span></td><td>${m.project}</td><td>${esc(m.title)}<span class="cell-sub">书籍 ID ${m.book}</span></td><td>${esc(r.account)}<span class="cell-sub">@${r.handle}</span></td><td>${esc(r.keyword)}</td><td>${r.video?`抖音 / ${esc(r.account)}<span class="cell-sub">${r.video}</span>${videoLink(r.video,'https://www.douyin.com/video/'+r.video)}`:'-'}</td><td>${r.officialData?`实际发布：${esc(r.officialData.account)}<span class="cell-sub">视频 ID ${r.officialData.video}</span>${videoLink(r.officialData.video,r.officialData.url)}`:'-'}</td><td>${tag(r.violation?'是':'否',r.violation?'del':'ok')}${r.violation?'<span class="cell-sub">24小时内未回填</span>':''}</td><td>${tag(r.state,r.violation?'del':r.state==='已回填'?'ok':'warn')}</td><td>${r.date}<span class="cell-sub">${r.time}</span></td><td class="col-action"><button class="link" data-claim-detail="${r.id}">稿件详情</button></td></tr>`;}).join('')||'<tr><td colspan="13" class="empty-cell">暂无匹配领取记录<br>请调整筛选条件</td></tr>'}</tbody>`;}
 $('#result-count').textContent=`共 ${records.length} 条 · 示例数据`;$('#pagination-total').textContent=`共 ${records.length} 条`;}
function meta(entries){return `<dl class="drawer-meta">${entries.map(([k,v])=>`<dt>${esc(k)}</dt><dd>${v}</dd>`).join('')}</dl>`;}
function showDetail(id,claimId){const m=manuscripts.find(m=>m.id===id);const r=claims.find(r=>r.id===claimId);$('#detail-title').textContent=`${r?'领取 '+r.id+' · ':''}${m.title} · 稿件详情`;$('#detail-body').innerHTML=meta([['稿件 ID',m.id],['项目',m.project],['书籍名称',esc(m.title)],['书籍 ID',m.book],['星图任务匹配','已匹配（示例）'],['审核状态',tag(m.audit,m.audit==='已通过'?'ok':'warn')],['稿件状态',tag(m.state,m.state==='正常'?'ok':'del')],['运营模式',m.mode],['关联关键词',m.keywords.join('、')||'-'],['回填数量',String(m.count)]])+(r?`<section class="detail-section"><h3>本次领取</h3>${meta([['领取记录',r.id],['创作者',`${esc(r.user)} / ${r.uid}`],['关联抖音号',`${esc(r.account)} / @${r.handle}`],['关键词',r.keyword],['回填状态',r.state],['涉嫌违规',r.violation?'是 · 超过24小时未回填':'否'],['官方视频',r.officialData?videoLink(r.officialData.video):'-']])}</section>`:'')+'<p class="note">审核状态与稿件状态独立；正常不等于审核通过。其他既有后台字段具体展示范围 [待确认]。</p>';openDrawer('detail');}
function openModal(title,body,buttons,save,danger=false){focusReturn.modal=document.activeElement;modalSave=save;modalDelete=danger;$('#modal-title').textContent=title;$('#modal-body').innerHTML=body;$('#modal-footer').innerHTML=buttons;$('#modal-overlay').hidden=false;$('#modal-overlay').classList.add('open');$('#modal-overlay .modal').focus();}
function closeModal(){if($('#modal-overlay').hidden)return;$('#modal-overlay').hidden=true;$('#modal-overlay').classList.remove('open');modalSave=null;modalDelete=false;if(focusReturn.modal?.isConnected)focusReturn.modal.focus();}
const cancelButton='<button class="btn btn-ghost" data-close="modal">取消</button>';
function editManuscript(id){const m=manuscripts.find(m=>m.id===id);openModal('编辑稿件 · '+m.title,`<p class="note">沿用现有编辑入口；本演示只调整发布技巧，不改变审核结果和任务匹配。</p><div class="form-field"><label for="edit-tip">发布技巧</label><input id="edit-tip" maxlength="120" value="${esc(m.tip||'发布前请核对任务要求')}" required></div>`,cancelButton+'<button class="btn btn-primary" data-modal-save>保存</button>',()=>{const v=$('#edit-tip').value.trim();if(!v){$('#edit-tip').setAttribute('aria-invalid','true');$('#edit-tip').focus();return;}m.tip=v;closeModal();toast('发布技巧已更新，仅本页演示有效');});}
function deleteManuscript(id){const m=manuscripts.find(m=>m.id===id);openModal('确认删除稿件？',`<p>确认将「${esc(m.title)}」的稿件状态设为「已删除」？</p><p class="cell-sub">仅修改本页示例状态，不删除真实数据。</p>`,cancelButton+'<button class="btn btn-danger" data-modal-save>确认删除</button>',()=>{m.state='已删除';closeModal();renderTable();toast('示例稿件已标为已删除');},true);}
function recordGroup(title,entries){return `<section class="record-group"><h4>${title}</h4><dl>${entries.map(([k,v])=>`<dt>${esc(k)}</dt><dd>${v}</dd>`).join('')}</dl></section>`;}
function showCounts(id){const m=manuscripts.find(m=>m.id===id),rows=claims.filter(r=>r.mid===id&&r.state==='已回填');openModal(`${m.title} · 回填明细（${rows.length}）`,`<p class="cell-sub">只展示当前稿件已形成的回填记录；排序与分页 [待确认]。</p>${rows.map((r,i)=>`<article class="record-block"><div class="record-head">回填记录 ${i+1} · 领取 ${r.id} · ${esc(r.keyword)}</div>${recordGroup('创作者信息',[['用户昵称',esc(r.user)],['用户 ID',r.uid]])}${recordGroup('回填信息',[['投稿平台','抖音'],['昵称',esc(r.account)],['视频链接',videoLink(r.video,'https://www.douyin.com/video/'+r.video)],['视频 ID',r.video],['发布日期',r.date],['作品类型','视频'],['内容类型',m.project==='融合漫剧'?'漫剧':'真人演绎']])}${recordGroup('参与任务信息 · 官方',[['平台名称',r.officialData?'抖音':'-'],['昵称',r.officialData?esc(r.officialData.account):'-'],['视频链接',r.officialData?videoLink(r.officialData.video,r.officialData.url):'-'],['视频 ID',r.officialData?r.officialData.video:'-']])}</article>`).join('')||'<p class="note">暂无已形成的回填记录。零条时的具体表现 [待确认]。</p>'}<p class="cell-sub">部分字段缺失的展示 [待确认]；无匹配官方内容显示「-」。仅关联或领取但未回填不计数。</p>`,'<button class="btn btn-ghost" data-close="modal">关闭</button>');}
function showVideo(id){const content=`<div class="video-placeholder">▶<br><b>示例任务视频</b><p>视频 ID ${esc(id)}</p><small>静态预览占位，实际内容 [待确认]</small></div>`;if(!$('#modal-overlay').hidden){let preview=$('#inline-video-preview');if(!preview){preview=document.createElement('section');preview.id='inline-video-preview';$('#modal-body').prepend(preview);}preview.innerHTML=content;preview.scrollIntoView({block:'nearest'});return;}openModal('视频内容 · 示例查看',content+`<p class="cell-sub">对应链接：https://www.douyin.com/video/${esc(id)}<br>Demo 不加载真实接口或外部视频。</p>`,'<button class="btn btn-ghost" data-close="modal">关闭</button>');}
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b||b.disabled)return;if(b.dataset.tab)setTab(b.dataset.tab);if(b.dataset.surface)setSurface(b.dataset.surface);if(b.dataset.screen){screen=b.dataset.screen;loadScene();}if(b.dataset.admin)setAdmin(b.dataset.admin);if(b.dataset.rule)rulePanel(b.dataset.rule);if(b.dataset.close){if(b.dataset.close==='modal')closeModal();else closeDrawer(b.dataset.close);}if(b.dataset.detail)showDetail(b.dataset.detail);if(b.dataset.claimDetail){const r=claims.find(r=>r.id===b.dataset.claimDetail);showDetail(r.mid,r.id);}if(b.dataset.edit)editManuscript(b.dataset.edit);if(b.dataset.delete)deleteManuscript(b.dataset.delete);if(b.dataset.count)showCounts(b.dataset.count);if(b.dataset.video)showVideo(b.dataset.video);if(b.hasAttribute('data-modal-save')&&modalSave)modalSave();});
$('#rules-open').onclick=()=>{if(!$('#rules-drawer').hidden){closeDrawer('rules');return;}rulePanel(activeTab==='admin'?'admin':'fe');openDrawer('rules');};
$('#rules-overlay').onclick=()=>closeDrawer('rules');$('#detail-overlay').onclick=()=>closeDrawer('detail');$('#modal-overlay').onclick=e=>{if(e.target===$('#modal-overlay')&&!modalDelete)closeModal();};
$('#reset-scene').onclick=loadScene;
$('#filter-form').onsubmit=e=>{e.preventDefault();filters={query:$('#filter-query').value.trim(),project:$('#filter-project').value,state:$('#filter-state').value,date:$('#filter-date').value};renderTable();};
$('#filter-reset').onclick=()=>{$('#filter-form').reset();toast('筛选条件已重置，点击查询刷新列表');};
$('#page-size').onchange=()=>toast('当前示例记录均已显示');
document.addEventListener('keydown',e=>{let root=!$('#modal-overlay').hidden?$('#modal-overlay .modal'):!$('#rules-drawer').hidden?$('#rules-drawer'):!$('#detail-drawer').hidden?$('#detail-drawer'):null;if(!root)return;if(e.key==='Escape'){e.preventDefault();if(!$('#modal-overlay').hidden)closeModal();else if(!$('#rules-drawer').hidden)closeDrawer('rules');else closeDrawer('detail');}if(e.key==='Tab'){const items=[...root.querySelectorAll('button:not(:disabled),a[href],input,select,[tabindex="0"]')].filter(el=>el.getClientRects().length);const first=items[0],last=items.at(-1);if(!first){e.preventDefault();return;}if(e.shiftKey&&(document.activeElement===first||document.activeElement===root)){e.preventDefault();last.focus();}else if(!e.shiftKey&&(document.activeElement===last||document.activeElement===root)){e.preventDefault();first.focus();}}});
window.addEventListener('message',e=>{if(e.origin!==location.origin||e.source!==$('#mockup').contentWindow)return;if(e.data?.type==='fr003-screen-changed'){const s=e.data.screen;if(sceneSets[surface].some(x=>x[0]===s)){screen=s;$('#scene-caption').textContent=sceneSets[surface].find(x=>x[0]===s)[2];$$('[data-screen]').forEach(b=>{b.classList.toggle('active',b.dataset.screen===s);b.setAttribute('aria-pressed',String(b.dataset.screen===s));});}}});
window.addEventListener('popstate',()=>setTab(new URLSearchParams(location.search).get('tab'),false));
new ResizeObserver(sizeDevice).observe($('#board-scroll'));
setSurface('mobile');setAdmin('manuscripts');setTab(new URLSearchParams(location.search).get('tab')||'fe',false);

// 手工定位 SVG：连线先于节点绘制，所有返回路径接回对应步骤的顶部。
const flowNodes = [
 ['supply',180,60,220,64,'前端','剪辑手：填写书籍与成片'],
 ['match',180,190,220,100,'判断','匹配同一星图任务？'],
 ['supplyMode',190,330,200,80,'判断','账号运营模式？'],
 ['supplyKeywords',440,330,220,64,'前端','关联关键词（支持多个）'],
 ['hasKeywords',440,480,220,100,'判断','至少关联一个关键词？'],
 ['audit',180,480,220,64,'后台','运营：审核稿件'],
 ['approved',180,610,220,100,'判断','审核通过？'],
 ['pool',180,760,220,64,'后台','进入可领取稿件池'],
 ['signup',960,60,240,64,'前端','创作者：复用开白报名'],
 ['qualification',960,190,240,130,'后台','复用现有人工审核|无违规、实名成年、已设提现|总粉≥1000、有效粉>500|提供资质截图'],
 ['qualified',970,390,220,100,'判断','账号审核通过？'],
 ['account',960,580,240,64,'前端','选择本人一个合格抖音号'],
 ['claim',670,880,240,64,'前端','领取稿件并锁定抖音号'],
 ['mode',680,1030,220,100,'判断','账号运营模式？'],
 ['keyword',1040,1048,220,64,'前端','每次选择一个关键词'],
 ['publish',670,1220,240,64,'前端','按任务要求发布视频'],
 ['fill',670,1360,240,80,'前端','填写视频链接与日期|关联抖音号只读'],
 ['parse',670,1510,240,64,'后台','点击确认回填后解析链接'],
 ['parsed',680,1650,220,100,'判断','链接解析成功？'],
 ['parseError',1040,1668,240,64,'异常','按既有系统处理|保留输入，不新增重试策略'],
 ['sameAccount',680,1840,220,100,'判断','报名抖音号一致？'],
 ['accountError',350,1858,240,64,'异常','视频链接与报名抖音号|不匹配；重填，不记违规'],
 ['sameVideo',680,2040,220,100,'判断','与官方视频 ID 一致？'],
 ['videoError',350,2058,240,64,'异常','提示重填，有疑问咨询客服|即时失败不记违规'],
 ['success',670,2240,240,80,'后台','有效回填形成分账绑定|每个已回填关键词一条记录'],
 ['income',670,2400,240,64,'复用','收益与分账沿用既有规则'],
 ['timeout',1230,2240,240,100,'异步','领取后24小时未回填|沿用既有违规、释放、停权'],
 ['official',1050,2400,240,80,'后台','后台逐条展示官方参与信息|未匹配显示「-」']
];
const flowPaths = [
 ['290,124 290,190',''],['290,290 290,330','是'],['180,240 100,240 100,35 290,35 290,60','否'],
 ['390,370 440,370','是'],['290,410 290,480','否'],['550,394 550,480',''],
 ['660,530 720,530 720,445 290,445 290,480','是'],['550,580 550,850 25,850 25,15 290,15 290,60','否：补充关键词'],
 ['290,544 290,610',''],['290,710 290,760','是'],['180,660 60,660 60,25 290,25 290,60','否'],
 ['1080,124 1080,190',''],['1080,320 1080,390',''],['1080,490 1080,580','是'],['1190,440 1400,440 1400,35 1080,35 1080,60','否：修改报名'],
 ['290,824 290,912 670,912',''],['1080,644 1080,820 790,820 790,880',''],
 ['790,944 790,1030',''],['900,1080 1040,1080','是'],['790,1130 790,1220','否'],['1150,1112 1150,1180 790,1180 790,1220',''],
 ['790,1284 790,1360',''],['790,1440 790,1510',''],['790,1574 790,1650',''],['790,1750 790,1840','是'],
 ['900,1700 1040,1700','否'],['1160,1668 1160,1320 790,1320 790,1360','返回填写'],
 ['680,1890 590,1890','否'],['470,1858 470,1330 790,1330 790,1360',''],['790,1940 790,2040','是'],
 ['680,2090 590,2090','否'],['470,2122 310,2122 310,1340 790,1340 790,1360',''],['790,2140 790,2240','是'],
 ['790,2320 790,2400',''],['910,2280 1170,2280 1170,2400',''],
 ['910,912 1450,912 1450,2190 1350,2190 1350,2240','24小时仍未回填',true]
];
const colors={'前端':['#eff6ff','#bfdbfe'],'后台':['#f0fdf4','#bbf7d0'],'判断':['#fffbeb','#fde68a'],'异常':['#fef2f2','#fecaca'],'异步':['#fff7ed','#fed7aa'],'复用':['#f1f5f9','#cbd5e1']};
$('#flow-chart').innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="1500" height="2540" viewBox="0 0 1500 2540" role="img" aria-labelledby="flow-title flow-description"><title id="flow-title">FR-003 代发上融合任务业务流程</title><desc id="flow-description">供稿匹配、运营审核通过后进入稿件池；创作者通过现有报名审核后选择账号领取；确认回填依次校验解析、账号和视频ID，成功才形成分账绑定。驳回返回起点；超时沿用既有处理。</desc><defs><marker id="fr003-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#94a3b8"/></marker></defs><g class="flow-edges" marker-end="url(#fr003-arrow)">${flowPaths.map(([p,,d])=>`<polyline points="${p}" ${d?'stroke-dasharray="6 5"':''}/>`).join('')}</g><g font-size="12" font-family="PingFang SC,Microsoft YaHei,sans-serif">${flowPaths.map(([p,label])=>{if(!label)return '';const pts=p.split(' ').slice(0,2).map(v=>v.split(',').map(Number));const vertical=pts[0][0]===pts[1][0];const x=(pts[0][0]+pts[1][0])/2+(vertical?16:0);const y=(pts[0][1]+pts[1][1])/2-(vertical?0:8);label=label.startsWith('否')?'否':label;return `<text text-anchor="middle" x="${x}" y="${y}" fill="${label.startsWith('否')?'#dc2626':label==='是'?'#16a34a':'#64748b'}">${label}</text>`;}).join('')}</g><g class="flow-nodes" font-family="PingFang SC,Microsoft YaHei,sans-serif">${flowNodes.map(([id,x,y,w,h,type,label])=>{const [fill,stroke]=colors[type];const lines=label.split('|');return `<g id="flow-${id}">${type==='判断'?`<polygon points="${x+w/2},${y} ${x+w},${y+h/2} ${x+w/2},${y+h} ${x},${y+h/2}"`:`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8"`} fill="${fill}" stroke="${stroke}"/><text x="${x+w/2}" y="${y+h/2-(lines.length-1)*10+5}" text-anchor="middle" font-size="13" fill="#334155">${lines.map((line,i)=>`<tspan x="${x+w/2}" dy="${i?20:0}">${esc(line)}</tspan>`).join('')}</text></g>`;}).join('')}</g></svg>`;





