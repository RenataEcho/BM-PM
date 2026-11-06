(()=>{'use strict';const $=s=>document.querySelector(s),M=window.ClaimDemo,esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));let ruleReturn; let tab='fe',module='types',screen='detail',drawerReturn,modalReturn,modalAction,drawerAction;
const scenes=[['detail','稿件详情 · 有要求','稿件详情展示统一领取要求。'],['select','选择账号 · 混合列表','选择满足要求的账号领取。'],['empty','空账号 · 添加提示弹窗','直接展示免费领取后的添加账号提示。'],['none','全部不满足','账号不满足时不可选择，可添加账号。'],['direct','无要求 · 直接领取','沿用现有领取流程。'],['add','添加媒体账号','识别主页信息后保存。'],['fault-read','领取要求读取失败','展示错误与重试。'],['fault-parse','账号解析失败','检查平台与主页链接后重试。'],['fault-missing','解析缺少指标','缺少指标时不可保存。'],['fault-identity','解析缺少昵称','缺少身份信息时不可保存。'],['fault-zero','解析三项为 0','真实零值允许保存。'],['fault-low','解析未达要求','完整账号允许保存，领取时判断。'],['fault-duplicate','重复账号','保存时提示已存在。'],['fault-save','账号保存失败','保留识别结果，可重试。'],['fault-delete','账号删除失败','保留账号，可重试。'],['fault-claim','稿件领取失败','保留当前选择，可重试。'],['fault-invalid','关联账号失效','返回账号列表重新选择。']];
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
const rules={fe:'<h3>1 目标与入口</h3><p>沿用现有稿件详情，本 Demo 不展示作品广场。使用统一要求且存在启用条件时，点击领取先读取本人账号，无账号提示添加；已有账号在详情底部选择。</p><h3>2 上传</h3><p>第一步沿用项目与投向。第二步无规则隐藏配置并清除使用值；有规则每本书独立选择不限制或使用平台统一限制。同卡多条内容打包一个稿件。第三步只读，成功锁定、失败保留。</p><h3>3 账号与领取</h3><p>抖音、快手、小红书、视频号均参与。完整身份和三指标才可保存，真实0有效，低指标仍可添加。本人平台＋ID去重；删除二次确认，只移除可选项并保留历史。</p><p>满足项单选且不预选；未满足时统一提示「本账号未满足要求」。资格只在进入时判断，途中规则改变不重审；失败保留选择，关联失效返回重选。添加返回重新判断，不自动领取。</p><h3>4 数据口径</h3><p>数据记录于添加时，后续不更新。回填沿用原流程。</p><h3>5 业务流程</h3><p>见本页业务流程。</p>',admin:'<h3>1 素材类型</h3><p>列表保留类型、用途、状态、编辑和删除，增加领稿要求列。新增编辑用居中弹窗，删除二次确认。</p><h3>2 统一要求</h3><p>粉丝量、关注数、获赞数独立启用，新建全关。阈值非负，允许0和小数，≤/≥含等号，启用项取AND。不合法不能保存。保存影响后续新进入，不撤销历史。</p><h3>3 领取追溯</h3><p>领取记录详情采用右侧抽屉；本条回填数量打开居中弹窗，展示平台、昵称、ID与实际回填链接。无关联为「-」，零回填保留摘要；错误与空分开并可重试，删除账号仍保留历史身份。</p>'};
function openRules(){ruleReturn=document.activeElement;$('#rule-drawer').hidden=false;$('#rule-overlay').hidden=false;$('#rule-drawer').classList.add('open');$('#rule-overlay').classList.add('open');$('#workspace').inert=true;$('#rules-open').setAttribute('aria-expanded','true');ruleContent(tab==='admin'?'admin':'fe');$('#rule-drawer .drawer-close').focus();}function closeRules(){$('#rule-drawer').hidden=true;$('#rule-overlay').hidden=true;$('#workspace').inert=false;$('#rules-open').setAttribute('aria-expanded','false');ruleReturn?.focus();}function ruleContent(t){$('#rules-body').innerHTML=rules[t];document.querySelectorAll('[data-rule]').forEach(b=>b.classList.toggle('active',b.dataset.rule===t));}
function ruleSummary(rules){return ['粉丝数','关注数','获赞数'].map((name,i)=>rules[i]?.on?`${name}${rules[i].op}${rules[i].value}`:`${name}不限`).join('，');}
function renderAdmin(){
 const s=M.state;$('#admin-location').textContent=module==='types'?'基础配置 / 素材类型':'稿件管理 / 领取记录';document.querySelectorAll('[data-module]').forEach(b=>b.classList.toggle('active',b.dataset.module===module));
 $('#admin-content').innerHTML=module==='types'?`<h2>素材类型</h2><div class="toolbar"><button class="btn btn-primary" id="new-type">新增素材类型</button></div><div class="table-wrap"><table class="data-table"><thead><tr><th>素材类型</th><th>用途</th><th>领稿要求</th><th>状态</th><th>操作</th></tr></thead><tbody>${s.types.map(t=>`<tr><td>${esc(t.name)}</td><td>${esc(t.purpose||'国内代发')}</td><td>${esc(ruleSummary(t.rules))}</td><td><span class="tag tag-ok">启用</span></td><td><button class="link" data-type-edit="${t.id}">编辑</button><button class="link link-danger" data-type-delete="${t.id}">删除</button></td></tr>`).join('')}</tbody></table></div><div class="admin-scenarios"><button class="btn btn-ghost" data-admin-scene="save">Demo · 保存失败</button></div>`:
 `<nav class="module-tabs"><button disabled>稿件列表</button><button class="active">领取记录</button><button disabled>结算明细</button></nav><div class="claim-filters"><label>用户/稿件<input id="claim-filter" placeholder="用户/稿件"></label><label>回填状态<select id="claim-state"><option value="">全部</option><option>待回填</option><option>已回填</option><option>已超时释放</option></select></label><label>稿件类型<select id="claim-type"><option value="">全部</option>${s.types.map(t=>`<option>${esc(t.name)}</option>`).join('')}</select></label><label>项目名称<select id="claim-project"><option value="">全部</option><option>番茄小说</option><option>知乎故事</option></select></label><label>书籍名称/id<input id="claim-book" placeholder="书名/书号"></label><label>剪辑手<input id="claim-editor" placeholder="剪辑手"></label><label>关键词<input id="claim-keyword" placeholder="关键词"></label><label>回填信息<input id="claim-fill" placeholder="回填信息"></label><label>领取时间<input type="date" id="claim-start" aria-label="领取开始日期"><input type="date" id="claim-end" aria-label="领取结束日期"></label><button id="claim-query" class="btn btn-primary">查询</button><button id="claim-reset" class="btn btn-ghost">重置</button></div><div id="claims-table"></div><div class="admin-scenarios"><button class="btn btn-ghost" data-admin-scene="read">Demo · 回填信息读取失败</button><button class="btn btn-ghost" data-admin-scene="zero">Demo · 零回填</button><button class="btn btn-ghost" data-admin-scene="unlinked">Demo · 无需关联账号</button></div>`;
 if(module==='claims')renderClaims();
}
function claimMeta(r){return {uid:r.uid||'100004',project:r.project||'番茄小说',type:r.type||'短剧解说',bookId:r.bookId||M.books().find(b=>b.name===r.book)?.id||'-',editor:r.editor||'3595310',editorName:r.editorName||'阿文',keyword:r.keyword||'-',deduct:r.deduct||'零元',deductCount:r.deductCount||'零元',status:r.status||(r.fills.length?'已回填':'待回填'),time:r.time||'2026-11-04 10:30'};}
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
 const text=(x,y,lines)=>`<text x="${x}" y="${y-(lines.length-1)*8}" text-anchor="middle">${lines.map((t,i)=>`<tspan x="${x}" dy="${i?17:0}">${t}</tspan>`).join('')}</text>`;
 const box=(x,y,lines,kind='fe')=>{const colors={fe:['#eff6ff','#2563eb'],be:['#f0fdf4','#16a34a'],error:['#fef2f2','#dc2626'],skip:['#f1f5f9','#94a3b8'],async:['#fff7ed','#ea580c']}[kind];return `<g><rect x="${x}" y="${y}" width="220" height="60" rx="8" fill="${colors[0]}" stroke="${colors[1]}"/>${text(x+110,y+34,lines)}</g>`;};
 const diamond=(x,y,lines)=>`<g><polygon points="${x},${y-45} ${x+110},${y} ${x},${y+45} ${x-110},${y}" fill="#fffbeb" stroke="#d97706"/>${text(x,y+4,lines)}</g>`;
 const edges=[
 ['600,100 600,135'],['600,225 600,270','是',610,250],['490,180 320,180','否',390,167],['100,180 40,180 40,20 600,20 600,40'],
 ['600,330 600,370'],['600,430 600,465'],['600,555 600,600','是',610,580],['490,510 320,510','否',390,497],['210,540 210,690 600,690 600,720'],['600,660 600,720'],
 ['600,780 600,815'],['600,905 600,950','是',610,930],['490,860 320,860','否',390,847],['100,860 45,860 45,350 600,350 600,370'],
 ['600,1010 600,1050'],['600,1110 600,1145'],['600,1235 600,1285','是',610,1260],['490,1190 320,1190','否',390,1177],['100,1190 60,1190 60,1030 600,1030 600,1050'],
 ['600,1375 600,1425','是',610,1400],['490,1330 210,1330 210,1440','否',390,1317],['490,1470 320,1470','否',390,1457],['600,1515 600,1560','是',610,1540],
 ['210,1500 210,1540 400,1540 400,2010 600,2010 600,2025'],
 ['600,1620 600,1655'],['600,1745 600,1795','是',610,1770],['710,1700 1000,1700','否',830,1687],['600,1885 600,1930','是',610,1910],['710,1840 900,1840 900,1400 1000,1400','否',760,1827],['1220,1400 1280,1400 1280,1750 1110,1750 1110,1770'],
 ['1110,1730 1110,1770'],['1110,1830 1110,1865'],['1110,1955 1110,2000','是',1120,1980],['1220,1910 1330,1910 1330,1750 1110,1750 1110,1770','否',1240,1897],['1220,2030 1400,2030 1400,1530 600,1530 600,1560'],
 ['600,1990 600,2025'],['600,2115 600,2160','是',610,2140],['490,2070 320,2070','否',390,2057],['100,2070 60,2070 60,1910 600,1910 600,1930'],
 ['600,2220 600,2260'],['600,2320 600,2360'],
 ['710,1960 800,1960 800,2160 1000,2160','删除',810,2135,true],['1110,2190 1110,2225'],['1110,2315 1110,2360','是',1120,2340],['1000,2270 750,2270 750,1910 600,1910 600,1930','否',850,2257],['1110,2420 1110,2480 830,2480 830,1910 600,1910 600,1930']
 ];
 $('#flow-chart').innerHTML=`<svg width="1480" height="2540" viewBox="0 0 1480 2540" role="img" aria-labelledby="claim-flow-title claim-flow-desc"><title id="claim-flow-title">统一领取要求与领取账号闭环</title><desc id="claim-flow-desc">素材类型保存后，上传第二步按是否存在规则显示书籍配置，一卡打包一稿。详情领取有要求时先查账号，无账号提示添加，已有账号选择或确认删除；添加完整解析后返回判断。提交不重新审核指标，成功记录历史，原流程回填，后台按单次领取追溯。</desc><defs><marker id="wen004-flow-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8" fill="#94a3b8"/></marker></defs><g class="flow-edges">${edges.map(([p,l,x,y,dashed])=>`<polyline points="${p}" marker-end="url(#wen004-flow-arrow)" ${dashed?'stroke-dasharray="4 3"':''}/>`).join('')}</g><g class="flow-nodes">
 ${box(490,40,['居中编辑素材类型','三项规则独立设置'])}${diamond(600,180,['启用项填写合法？'])}${box(100,150,['错误保留草稿','修正后重新保存'],'error')}${box(490,270,['保存统一规则','影响后续新进入'],'be')}
 ${box(490,370,['上传第一步沿用','取得所选素材类型'])}${diamond(600,510,['类型存在启用规则？'])}${box(100,480,['隐藏领取配置','按不使用处理'],'skip')}${box(490,600,['第二步每书独立设置','默认不限制'])}${box(490,720,['第三步确认上传','每卡多条内容打包一稿'])}${diamond(600,860,['上传成功？'])}${box(100,830,['失败保留有效配置','返回原流程重试'],'error')}${box(490,950,['上传成功','锁定类型及使用选择'],'be')}
 ${box(490,1050,['稿件详情展示要求','用户点击领取'])}${diamond(600,1190,['规则读取成功？'])}${box(100,1160,['读取失败不能直领','详情原地重试'],'error')}${diamond(600,1330,['稿件使用统一要求？'])}${diamond(600,1470,['当前存在启用条件？'])}${box(100,1440,['无领取要求','免账号按原规则直领'],'skip')}${box(490,1560,['读取本人媒体账号','入场规则和指标快照'],'be')}${diamond(600,1700,['本人已有账号？'])}${diamond(600,1840,['存在合格账号？'])}
 ${box(1000,1370,['弹窗全部不满足','禁选并引导添加'])}${box(1000,1670,['提示添加媒体账号','空账号不先开选择列表'])}${box(1000,1770,['选择平台填写主页','识别身份及三项指标'],'async')}${diamond(1110,1910,['身份指标全部识别？'])}${box(1000,2000,['保存账号','返回选择重新判断'],'be')}
 ${box(490,1930,['底部弹窗选择账号','不合格项显示全部原因'])}${diamond(600,2070,['原领取校验成功？'])}${box(100,2040,['失败保留选择和判断','不追加指标规则重审'],'error')}${box(490,2160,['领取成功','保存本次历史关联'],'be')}${box(490,2260,['回填沿用原流程','不比对领取账号'])}${box(490,2360,['后台本条回填数量','历史身份及实际链接'],'be')}
 ${box(1000,2130,['选择弹窗点击删除','另弹二次确认'])}${diamond(1110,2270,['确认删除？'])}${box(1000,2360,['删除本人可选项','清选择且历史保留'],'be')}
 ${edges.filter(e=>e[1]).map(([p,l,x,y])=>`<text x="${x}" y="${y}" fill="${l==='是'?'#16a34a':l==='删除'?'#4a5568':'#dc2626'}">${l}</text>`).join('')}
 <text x="50" y="2520" fill="#4a5568">入场后规则变化不重判；删除重加为新记录；无关联为「-」；读取失败可重试；所有失败回到相应起点。</text></g></svg>`;
}

document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.id==='claim-reset'){renderAdmin();return;}if(b.dataset.adminScene){const kind=b.dataset.adminScene;if(kind==='save'){M.state.faults['admin-save']=true;editType(false,M.state.types[0].id);}else{M.state.faults['admin-read']=kind==='read';const r=M.state.claims.find(x=>kind==='zero'?x.fills.length===0:kind==='unlinked'?!x.account:true);if(r)showCounts(r.id);}return;}if(b.dataset.tab)switchTab(b.dataset.tab);if(b.dataset.screen)scene(b.dataset.screen);if(b.dataset.module){module=b.dataset.module;renderAdmin();}if(b.dataset.rule)ruleContent(b.dataset.rule);if(b.id==='rules-open')openRules();if(b.hasAttribute('data-rule-close'))closeRules();if(b.hasAttribute('data-close'))closeDrawer();if(b.hasAttribute('data-modal-close'))closeModal();if(b.id==='modal-save')modalAction?.();if(b.id==='save-rule')drawerAction?.();if(b.dataset.typeEdit)editType(false,b.dataset.typeEdit);if(b.id==='new-type')editType(true);if(b.dataset.typeDelete){const t=M.state.types.find(x=>x.id===b.dataset.typeDelete);modal('删除素材类型',`<p>确认删除“${esc(t.name)}”？</p><p>历史领取信息保留。</p>`,()=>{M.state.types=M.state.types.filter(x=>x.id!==t.id);closeModal();renderAdmin();toast('演示：已删除素材类型');});$('#modal-footer').innerHTML='<button class="btn btn-ghost" data-modal-close>取消</button><button class="btn btn-danger" id="modal-save">确认删除</button>';}if(b.id==='claim-query')renderClaims();if(b.dataset.count)showCounts(b.dataset.count);if(b.dataset.retryCount){const r=modalReturn;showCounts(b.dataset.retryCount,true);modalReturn=r;}if(b.dataset.record){const r=M.state.claims.find(x=>x.id===b.dataset.record);showDrawer(`领取详情 · ${r.id}`,`<p>用户：${esc(r.user)}</p><p>稿件：${esc(r.book)}</p><p>状态：${esc(claimMeta(r).status)}</p><p>回填数量：<button class="link" data-count="${r.id}">${r.fills.length}</button></p>`);}if(b.id==='reset-demo'){M.reset();$('#mobile').contentWindow.postMessage({type:'fr-wen-004-reset'},location.origin);scene('detail');toast('演示已重置');}});
document.addEventListener('change',e=>{if(e.target.dataset.enabled!==undefined){const i=e.target.dataset.enabled;$('#op-'+i).disabled=!e.target.checked;$('#value-'+i).disabled=!e.target.checked;}});
$('#rule-overlay').onclick=closeRules;$('#drawer-overlay').onclick=closeDrawer;$('#modal-overlay').onclick=e=>{if(e.target===$('#modal-overlay'))closeModal();};document.addEventListener('keydown',e=>{const root=!$('#modal-overlay').hidden?$('#modal-overlay .modal'):!$('#rule-drawer').hidden?$('#rule-drawer'):!$('#drawer').hidden?$('#drawer'):null;if(!root)return;if(e.key==='Escape'){e.preventDefault();if(!$('#modal-overlay').hidden)closeModal();else if(!$('#rule-drawer').hidden)closeRules();else closeDrawer();}if(e.key==='Tab'){const els=[...root.querySelectorAll('button:not(:disabled),input:not(:disabled),select:not(:disabled),a[href]')].filter(x=>x.getClientRects().length);if(e.shiftKey&&(document.activeElement===els[0]||document.activeElement===root)){e.preventDefault();els.at(-1)?.focus();}else if(!e.shiftKey&&(document.activeElement===els.at(-1)||document.activeElement===root)){e.preventDefault();els[0]?.focus();}}});window.addEventListener('message',e=>{if(e.origin!==location.origin||e.source!==$('#mobile').contentWindow)return;if(e.data.type==='fr-wen-004-ready')scene(screen);});renderFlow();switchTab(new URLSearchParams(location.search).get('tab'));scene('detail');
if(tab==='admin')renderAdmin();
})();
