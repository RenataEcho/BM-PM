/* FR-wen-005 增量；宿主为冻结的一键代发 3.0 原型，沿用其原始 DOM/CSS。 */
(function () {
  'use strict';
  const M = window.FR005, originalDraw = window.draw, originalClaims = window.claims, originalShell = window.shell;
  let noticeTab='系统',noticeQuery='',noticesRead=false;
  let pendingClaim='',pcState='', selected = 'A5100', source = 'C4000', origin = 'claims', applyBack = 'claims', sort = 'default', requestFilter = 'all', downloadSource = '', note = '', custom = '', pcPane = 'dashboard', reject = '', dialog = '', uploadId = '';
  const e = window.esc, money = n => '¥' + Number(n || 0).toFixed(2);
  const b = (label, action, id = '', cls = 'btn-ghost') => `<button type="button" class="${cls}" data-fr="${action}" data-fr-id="${id}">${label}</button>`;
  const fields = r => [['申请编号',r.id],['申请时间',M.format(r.created)],['项目',r.project],['关键词',r.keyword],['书籍名称',r.book],['书籍ID',r.bookId||'未提供'],['书籍链接',r.bookUrl||'未提供'],['剪辑手',r.editor],['申请说明',r.note||'未填写']];
  const kv = rows => `<div class="pc-kv">${rows.map(([k,v])=>`<i>${k}</i><b>${e(v)}</b>`).join('')}</div>`;
  function sync() {
    M.claims.forEach((c,i) => {
      const id = 'fr-'+c.id; BOOK_META[c.book]={id:c.bookId||'未提供',link:c.bookUrl||'未提供',type:'小说'};
      if (!works.some(w=>w.id===id)) works.push({...works[0], id, title:c.book, book:c.book, bookId:c.bookId, bookLink:c.bookUrl, project:c.project, editor:c.editor, word:c.keyword, cover:works[i%6].cover, got:[true], clips:['定向成片'],kw:'platform'});
    });
    listRows=listRows.filter(r=>!r.fr005);M.records.filter(r=>r.manuscript).forEach(r=>{const m=r.manuscript;listRows.push({fr005:true,id:m.id,channel:'右豹',title:m.title,project:r.project,book:r.book,bookId:r.bookId,info:'1 成片',fileName:m.directory,tip:m.publishTips||'—',editor:r.editor,kind:m.kind,mat:m.material,occ:r.received?'占用中':'空闲',fileStatus:'正常',upload:'已上传',audit:m.status,time:M.format(m.uploaded),mode:m.mode,fills:[]});});
    claimRows = claimRows.filter(c=>!String(c.work).startsWith('fr-')).concat(M.claims.slice().sort((a,b)=>claimStatus==='已回填'&&sort!=='default'?(sort==='high'?M.keywordIncome(b)-M.keywordIncome(a):M.keywordIncome(a)-M.keywordIncome(b))||b.claimedAt-a.claimedAt:b.claimedAt-a.claimedAt).map(c=>({id:c.id,work:'fr-'+c.id,status:c.status==='待回填'?'未回填':c.status==='超时未回填'?'已超时':c.status,time:M.format(c.claimedAt),downloadedAt:c.downloadedAt||0,expireAt:c.downloadDue,pickedWord:c.keyword,fills:M.keywordFills(c).map(f=>({entry:'daifa',platform:'抖音',nick:c.user,link:f.url,time:M.format(f.time)})),backfillPrompted:true})));
  }
  window.shell = function(title,back,body,foot,tab,overlay) {
    return originalShell(title,back,body,foot,tab,(overlay||'')+(downloadSource?downloadSheet():'')+(pendingClaim?payOverlay({...findWork('fr-'+M.get(pendingClaim).sourceId),editor:M.get(pendingClaim).editor}):'')).replace(/<button type="button" data-go="earn"[^>]*>[\s\S]*?<\/button>/g,'');
  };
  window.claims = function() {
    sync();
    const doc = new DOMParser().parseFromString(originalClaims(),'text/html');
    doc.querySelectorAll('.c-card').forEach((card,i)=>{
      const c=M.getClaim(card.querySelector('[data-cid]')?.dataset.cid);const hasRequest=!!c&&M.keywordRecords(c.id).length>0;if(claimStatus==='已回填'&&requestFilter!=='all'&&(requestFilter==='requested')!==hasRequest){card.remove();return;}if(!c)return;card.dataset.frClaim=c.id;
      const files=M.keywordManuscripts(c.id);if(files.length===1&&M.now>=files[0].due){card.querySelector('[data-act="dl"]').disabled=true;card.querySelector('.c-dl').textContent='下载已失效';}
      if(c.status==='已回填') {
        card.classList.add('fr-income-card');
        card.insertAdjacentHTML('afterbegin',`<div class="fr-income">收益：￥${Number(M.keywordIncome(c)).toFixed(2)}</div>`);
        const hasRecords=M.keywordRecords(c.id).length>0;
        card.querySelector('.c-tools').insertAdjacentHTML('afterbegin',b(hasRecords?'约稿记录':'约稿',hasRecords?'source':'apply',c.id,''));
      }
    });
    if(claimStatus==='已回填'){
      doc.querySelector('.seg').insertAdjacentHTML('afterend',`<div class="fr-sort" role="group" aria-label="已回填筛选"><select id="fr-income-sort" aria-label="收益排序">${[['default','默认排序'],['high','收益高到低'],['low','收益低到高']].map(([v,t])=>`<option value="${v}" ${sort===v?'selected':''}>${t}</option>`).join('')}</select><select id="fr-request-filter" aria-label="约稿筛选">${[['all','全部'],['requested','已约稿'],['none','未约稿']].map(([v,t])=>`<option value="${v}" ${requestFilter===v?'selected':''}>${t}</option>`).join('')}</select></div>`);
      if(!doc.querySelector('.c-card')&&!doc.querySelector('.empty'))doc.querySelector('.fr-sort').insertAdjacentHTML('afterend','<div class="empty">暂无符合条件的已回填记录</div>');
    }
    return doc.body.innerHTML;
  };
  function downloadSheet(){const c=M.getClaim(downloadSource);return `<div class="kw-mask show" data-fr="downloads-close"></div><section class="kw-sheet show fr-download-sheet" role="dialog" aria-modal="true" aria-label="关键词稿件列表"><div class="kw-head"><h3>稿件列表</h3>${b('×','downloads-close','','x')}</div><p class="desc fr-sheet-note">关键词：${e(c.keyword)}</p><div class="kw-list">${M.keywordManuscripts(c.id).map(m=>{const expired=m.received&&M.now>=m.due;return `<article class="fr-file"><img src="${findWork('fr-'+m.sourceId).cover}" alt="${e(m.title)}缩览图"><div class="fr-file-info"><div class="fr-file-head"><b>${e(M.getClaim(m.sourceId).book)}</b><button class="btn-ghost fr-file-action" type="button" data-fr="${m.received?'download':'file-claim'}" data-fr-id="${m.id}" ${expired?'disabled':''}>${m.received?'下载':'领取稿件'}</button></div><p class="desc">${e(m.kind)} · ${e(m.material)}</p><p class="desc ${expired?'fr-expired':''}">${!m.received?'领取后可下载':expired?'下载已失效':'可下载至 '+M.format(m.due)}</p></div></article>`;}).join('')}</div><div class="kw-foot">${b('关闭','downloads-close','','btn-primary')}</div></section>`;}
  function record(r,full=false) {
    return `<article class="card fr-record"><div class="pc-drawer-top"><img src="${findWork('fr-'+r.sourceId).cover}" alt="书籍封面"><div><b>${e(r.book)}</b><span class="fr-record-status tag ${r.status==='已领取稿件'?'tag-ok':'tag-warn'}">${r.status}</span><p class="desc">${e(r.project)} · ${e(r.editor)}</p><p class="desc">${r.id} · ${M.format(r.created)}</p></div></div>${full?kv(fields(r)):''}<p class="desc">${e(M.deadline(r))}</p>${r.rejectReason?`<p class="desc">拒绝原因：${e(r.rejectReason)}</p>`:''}${r.rejected?'<p class="desc">稿件已驳回，剪辑手将修改原稿重新送审。</p>':''}<div class="foot-claim">${!full?b('约稿详情','detail',r.id):''}${r.status==='待审核'?b('撤销','revoke',r.id):''}${['待领取','已领取稿件'].includes(r.status)?b(r.status==='已领取稿件'?'前往下载':'查看稿件详情','manuscript',r.id,'btn-primary'):''}${['已撤销','已拒绝'].includes(r.status)?b('重新申请','apply',r.sourceId):''}</div></article>`;
  }
  function mobile() {
    let title='约稿记录',body='',foot='',back='claims',tab='';
    if(custom==='records') {const c=M.getClaim(source);body=`<div class="card"><b>${e(c.keyword)}</b><p class="desc">${e(c.project)} · ${e(c.book)}</p></div>`+M.keywordRecords(source).map(r=>record(r)).join('');foot=`<div class="foot">${b('继续约稿','apply',source,'btn-primary')}</div>`;}
    if(custom==='detail'){title='约稿申请详情';back=origin;body=record(M.get(selected),true);}
    if(custom==='apply') {back=applyBack;title='定向约稿';const c=M.getClaim(source);body=`<form id="fr-apply" class="card"><div class="pc-kv">${[['项目',c.project],['关键词',c.keyword],['书籍名称',c.book],['书籍ID',c.bookId||'未提供'],['书籍链接',c.bookUrl||'未提供'],['剪辑手',c.editor]].map(([k,v])=>`<i>${k}</i><input readonly value="${e(v)}">`).join('')}</div><label class="fr-note">申请说明（选填）<textarea name="note" placeholder="告诉剪辑手你的约稿想法">${e(note)}</textarea></label><p class="desc">信息继承当前已回填稿件，不可更换。待审核可撤销，接受后不可取消。</p><button class="btn-primary" type="submit">提交申请</button></form>`;}
    if(custom==='notifications'){title='消息通知';const notices=noticeTab==='系统'?M.notifications.filter(n=>('定向约稿进度'+n.text).includes(noticeQuery)):[];body=`<div class="fr-notifications"><div class="fr-message-tabs">${['系统','活动','钱包'].map(t=>`<button data-fr="notice-tab" data-fr-id="${t}" class="${noticeTab===t?'active':''}">${t}${t==='系统'&&!noticesRead?`<sup>${M.notifications.length}</sup>`:''}</button>`).join('')}</div><form class="fr-message-search" id="fr-notice-search"><input name="query" aria-label="搜索消息" placeholder="⌕ 搜索消息" value="${e(noticeQuery)}"><button type="submit">搜索</button></form>${notices.map(n=>`<article class="card"><h3>定向约稿进度</h3><p class="desc">${e(n.text)}</p><div class="fr-notice-meta">${b('前往查看','detail',n.record)}<time>${M.format(n.time).slice(5,16)}</time></div></article>`).join('')||'<div class="fr-message-empty">暂无消息</div>'}</div>`;}
    if(custom==='empty'){body='<div class="empty">暂无约稿记录<br>可从已领—已回填稿件发起约稿。</div>';tab='records';}
    if(custom==='loading'){body='<div class="empty">约稿记录加载中…</div>'+b('完成示例加载','records');tab='records';}
    if(custom==='error'){body='<div class="empty">记录读取失败，请重试</div>'+b('重试','records');tab='records';}
    if(custom==='manuscript') {
      const r=M.get(selected),w=findWork('fr-'+r.sourceId);currentId=w.id;title='稿件详情';back='detail';
      const directed={...w,title:r.manuscript.title,word:r.keyword,got:[r.received],book:r.book,editor:r.editor,keywordOut:true,kw:r.manuscript.mode==='任务协作'?'own':'platform',supplier:'30%',userRate:'70%',time:M.format(r.manuscript.uploaded)};
      body=detailHead(directed,publishTipsCard(directed)+`<div class="card">关键词：${e(r.keyword)}<p class="desc">仅申请用户可领取，沿用剪辑手现有收费配置，优先扣1次；无次数时自定义收费确认积分，平台计费先兑换次数。发布后在已领的当前关键词追加回填，不新增未回填记录。</p></div>`,previewMedia(directed));
      body=body.replaceAll('免费领取','领取稿件');
      body=body.replace(/^<div class="scroll">/,'').replace(/<\/div>$/,'');
      const expired=r.received&&M.now>=r.manuscript.downloadDue;
      body+=r.received?`<p class="desc">${expired?'下载已失效':'可下载至 '+M.format(r.manuscript.downloadDue)}</p>`:'';
      foot=`<div class="foot"><div class="foot-claim">${r.received?'':`<div class="quota-chip"><span>剩余次数</span><b>${M.wallet.quotaLeft}</b></div>`}${b(r.received?'下载稿件':'领取稿件',r.received?'download':'claim',r.id,'btn-primary').replace('<button ',expired?'<button disabled ':'<button ')}</div></div>`;
    }
    if(custom==='fill'){title='回填发布信息';const c=M.getClaim(source);body=`<form class="card" id="fr-fill"><h3>${e(c.book)}</h3><p class="desc">关键词：${e(c.keyword)} · 发布作品继续回填至当前关键词</p><label class="fr-note">发布链接<input type="url" name="url" required placeholder="填写已发布作品链接"></label><button class="btn-primary" type="submit">提交回填</button></form>`;}
    let html=shell(title,back,`<div class="scroll">${body||'<div class="empty">暂无符合条件的约稿记录</div>'}</div>`,foot,tab,'');if(custom==='notifications')html=html.replace('<div class="title">消息通知</div><span style="width:36px"></span>','<div class="title">消息通知</div><button class="fr-read-all" data-fr="notice-read">'+(noticesRead?'已读':'全部已读')+'</button>');return html;
  }
  const originalPlaza=window.plaza;window.plaza=function(){const saved=works;works=works.filter(w=>!w.id.startsWith('fr-'));try{return originalPlaza();}finally{works=saved;}};
  const originalEditor=window.editor;
  function pcTable() {
    return `<h1>定向约稿</h1><p class="desc">已回填稿件发起的约稿申请；收益为剪辑手在当前关键词的收益。</p><div class="table-scroll"><table class="list-table"><thead><tr>${['申请编号 / 用户','项目 / 书籍','关键词','已获取收益','状态','申请说明','操作'].map(t=>'<th>'+t+'</th>').join('')}</tr></thead><tbody>${M.records.filter(r=>r.editorId==='100099').map(r=>`<tr><td>${r.id}<div class="cell-sub">${e(r.user)}</div></td><td>${e(r.project)}<div class="cell-sub">${e(r.book)} / ${e(r.bookId)}</div></td><td>${e(r.keyword)}</td><td>${money(M.keywordIncome(M.getClaim(r.sourceId),'editorIncome'))}</td><td><span class="tag tag-warn">${r.status}</span></td><td>${e(r.note||'未填写')}</td><td>${b('详情','pc-detail',r.id,'link')}${r.status==='待审核'?b('通过','accept',r.id,'link')+b('拒绝','reject',r.id,'link'):r.status==='制作中'?b('上传供稿','upload',r.id,'link'):''}</td></tr>`).join('')}</tbody></table></div>`;
  }
  window.editor=function() {
    const doc=new DOMParser().parseFromString(originalEditor(),'text/html');
    doc.querySelector('.who').textContent='剪辑手 · 小陈';
    const main=doc.querySelector('main.main');
    const tabs=`<div class="channel-tab-bar">${b('上传 list','pc-native','',''+(pcPane==='dashboard'?'on':''))+b('定向约稿','pc-list','',''+(pcPane==='list'?'on':''))}</div>`;
    if(pcState)main.innerHTML=tabs+'<div class="empty">'+({empty:'暂无约稿申请',loading:'约稿申请加载中…',error:'读取失败，请重试'})[pcState]+(pcState==='empty'?'':b('重试','pc-list','','pc-btn'))+'</div>';else if(pcPane==='list') main.innerHTML=tabs+pcTable(); else {main.querySelector('.channel-tab-bar')?.remove();main.insertAdjacentHTML('afterbegin',tabs);}
    if(dialog){const r=M.get(selected);doc.querySelector('.pc-shell').insertAdjacentHTML('beforeend',`<div class="pc-drawer-mask" data-fr="close"></div><aside class="pc-drawer"><div class="pc-drawer-hd"><h2>${dialog==='reject'?'拒绝约稿':'约稿详情'}</h2>${b('×','close','','pc-drawer-x')}</div><div class="pc-drawer-bd">${kv(fields(r))}${dialog==='reject'?`<label class="fr-note">拒绝原因（必填）<textarea id="fr-reason">${e(reject)}</textarea></label><p id="fr-reject-error" class="desc"></p>`:''}</div><div class="pc-drawer-ft">${dialog==='reject'?b('确认拒绝','reject-ok',r.id,'pc-btn'):b('关闭','close','','pc-btn')}</div></aside>`);}
    return doc.body.innerHTML;
  };
  const nativeUpload=window.uploadModal;
  window.uploadModal=function(){
    let html=nativeUpload();if(!uploadId||!html)return html;html=html.replaceAll('用户领取时自选',e(M.get(uploadId).keyword)).replaceAll('用户自由关键词领取稿件','继承原稿关键词，不可更换').replaceAll('用户自由关键词领取稿件。','继承原稿关键词。').replaceAll('任务协作由用户自选关键词。帐号运营在书籍链接旁边选一个已通过关键词。','项目、书籍和关键词均继承原已回填稿件；仅向右豹定向供稿。').replaceAll('value="周凯"','value="'+e(M.get(uploadId).editor)+'"');
    const r=M.get(uploadId),doc=new DOMParser().parseFromString(html,'text/html');
    ['upProject','upBookId','upBookLink','upKeyword','upBookName','upMat'].forEach(id=>{const el=doc.getElementById(id);if(!el)return;const value={upMat:r.material||'解说混剪',upBookName:r.book,upProject:r.project,upBookId:r.bookId,upBookLink:r.bookUrl,upKeyword:r.keyword}[id];const input=doc.createElement('input');input.id=id;input.value=value||'未提供';input.setAttribute('value',input.value);input.readOnly=true;el.replaceWith(input);});
    doc.querySelector('.up-body')?.insertAdjacentHTML('afterbegin',`<p class="desc">右豹 · 定向用户 ${e(r.user)} · 原关键词 ${e(r.keyword)}${r.permissionLost?' · 请联系客服开启项目权限后再上传。':''}</p>`);
    const next=doc.getElementById('upNext');if(next){next.removeAttribute('id');next.dataset.fr='upload-next';next.disabled=!!r.permissionLost;}const publish=doc.getElementById('upPublish');if(publish){publish.removeAttribute('id');publish.dataset.fr='publish';publish.dataset.frId=r.id;publish.disabled=!!r.permissionLost;}
    if(r.upload){doc.querySelector('.up-body').innerHTML='<p class="desc">成片正在上传，成功后进入稿件审核。失败或取消不会生成供稿记录。</p>';doc.querySelector('.up-foot').innerHTML=b('取消上传','upload-cancel',r.id,'btn btn-ghost')+b('模拟失败','upload-fail',r.id,'btn btn-ghost')+b('完成上传','upload-done',r.id,'btn btn-primary');}else if(r.uploadError)doc.querySelector('.up-body').insertAdjacentHTML('beforeend','<p class="desc">'+e(r.uploadError)+'</p>');
    return doc.body.innerHTML;
  };
  function finishDirectedClaim(confirmed=false){
    const id=pendingClaim,result=M.act(id,'claim',{userId:'200861',confirmed});
    if(result.ok){pendingClaim='';chargeAsk=false;buyOpen=false;ptsShort=false;ptsBuy=false;draw();toast('领取成功，请在当前关键词追加回填');}
    else {draw();toast(result.error);}
    return result;
  }
  function requestDirectedClaim(id){
    const quote=M.claimQuote(id);if(!quote.ok)return toast(quote.error);
    pendingClaim=id;currentId='fr-'+M.get(id).sourceId;findWork(currentId).editor=M.get(id).editor;chargeAsk=false;buyOpen=false;ptsShort=false;ptsBuy=false;skuPick=0;
    if(quote.charge==='quota')return finishDirectedClaim();
    if(quote.charge==='platform')buyOpen=true;
    else if(quote.points<quote.cost){ptsShort=true;ptsShortKind='custom';}
    else chargeAsk=true;
    draw();
  }
  const sourceDownload=window.startDownload;
  window.startDownload=function(workId,deduct){if(!deduct&&String(workId).startsWith('fr-')){const result=M.download(workId.slice(3));if(!result.ok)return toast(result.error);}return sourceDownload(workId,deduct);};
  const baseBind=window.bind;
  window.bind=function(){
    baseBind();
    const search=document.getElementById('fr-notice-search');if(search)search.onsubmit=event=>{event.preventDefault();noticeQuery=new FormData(search).get('query').trim();draw();};
    if(String(currentId).startsWith('fr-')){const c=M.getClaim(currentId.slice(3)),button=document.getElementById('dyPublish');if(button&&c&&M.now>=c.downloadDue){button.disabled=true;button.textContent='下载已失效';}}
    if(!pendingClaim)return;
    const close=()=>{pendingClaim='';chargeAsk=false;buyOpen=false;ptsShort=false;ptsBuy=false;draw();};
    ['chargeCancel','chargeMask','buyClose','buyMask','ptsLater'].forEach(id=>{const el=document.getElementById(id);if(el)el.onclick=close;});
    const confirm=document.getElementById('chargeOk');if(confirm)confirm.onclick=()=>finishDirectedClaim(true);
    const exchange=document.getElementById('buyOk');if(exchange)exchange.onclick=()=>{
      const quote=M.claimQuote(pendingClaim);if(!quote.ok){close();return toast(quote.error);}
      const result=M.exchange(skuPick);if(!result.ok){ptsShort=true;ptsShortKind='';draw();return;}
      buyOpen=false;ptsShort=false;finishDirectedClaim();
    };
  };
  window.draw=function(){sync();if(custom&&view!=='editor'){document.body.classList.remove('pc');document.getElementById('app').innerHTML=mobile();bind();}else originalDraw();};
  function navigate(next){if(pendingClaim){pendingClaim='';chargeAsk=false;buyOpen=false;ptsShort=false;ptsBuy=false;}downloadSource='';custom=['claims','plaza','earn','editor'].includes(next)?'':next;view=next==='editor'?'editor':custom?'claims':next;draw();}
  function action(a,id){
    if(a==='notice-tab'){noticeTab=id;noticeQuery='';return draw();}
    if(a==='notice-read'){noticesRead=true;return draw();}
    if(a==='sort'){sort=id;draw();document.querySelector('.fr-sort .active')?.focus();return;}
    if(['records','notifications','empty','loading','error'].includes(a)){origin=a;return navigate(a);}
    if(a==='apply'){if(id&&!M.getClaim(id))return;applyBack=custom==='records'||custom==='detail'?'records':'claims';source=id||source;note='';return navigate('apply');}
    if(a==='source'){if(!M.getClaim(id))return;source=id;return navigate('records');}
    if(a==='detail'){selected=id;if(custom!=='records')source=M.get(id).sourceId;origin=custom||'claims';return navigate('detail');}
    if(a==='manuscript'){if(custom==='records')origin='records';selected=id;return navigate('manuscript');}
    if(a==='claim')return requestDirectedClaim(id);
    if(a==='download'){const result=M.download(id);draw();return toast(result.ok?'示例：稿件已保存到相册':result.error);}
    if(a==='downloads-close'){downloadSource='';draw();document.querySelector('[data-fr-claim="'+source+'"] [data-act="dl"]')?.focus();return;}
    if(a==='file-claim')return requestDirectedClaim(id);
    if(a==='revoke'){selected=id;dialog='revoke';return confirmMobile('撤销本次约稿申请？','待审核申请撤销后可重新申请。','revoke-ok',id);}
    if(a==='revoke-ok'){const result=M.act(id,'revoke');dialog='';draw();return toast(result.ok?'申请已撤销':result.error);}
    if(a==='pc-list'||a==='pc-native'){pcState='';pcPane=a==='pc-list'?'list':'dashboard';custom='';view='editor';return draw();}
    if(a==='pc-detail'||a==='reject'){selected=id;dialog=a==='reject'?'reject':'detail';reject='';return draw();}
    if(a==='accept'){const result=M.act(id,'accept');draw();return toast(result.ok?'已通过，进入制作中':result.error);}
    if(a==='reject-ok'){const reason=document.getElementById('fr-reason').value,result=M.act(id,'reject',{reason});if(!result.ok){document.getElementById('fr-reject-error').textContent=result.error;return;}dialog='';return draw();}
    if(a==='close'){dialog='';return draw();}
    if(a==='upload'){uploadId=id;const r=M.get(id);upProject=r.project;upBookName=r.book;upBookId=r.bookId;upBookLink=r.bookUrl;upKeyword=r.keyword;upMode='任务协作';upStep=1;upPicked=false;uploadOpen=true;listTab='右豹';return draw();}
    if(a==='upload-next'){['upKind','upRemind'].forEach(id=>{const el=document.getElementById(id);if(el)window[id]=el.value;});if(upStep===2&&!upPicked)return toast('请先选择成片');upStep=Math.min(3,upStep+1);return draw();}
    if(['upload-cancel','upload-fail','upload-done'].includes(a)){const result=M.act(id,{'upload-cancel':'uploadCancel','upload-fail':'uploadFail','upload-done':'uploadSuccess'}[a]);if(result.ok&&a==='upload-done'){uploadOpen=false;uploadId='';pcPane='list';}draw();return toast(result.ok?(a==='upload-done'?'上传成功，进入右豹稿件审核':'本次上传未生成供稿记录，可重试'):result.error);}
    if(a==='publish'){const r=M.get(id),metadata={title:r.book+' · 定向成片',mode:upMode,kind:upKind,material:r.material||'解说混剪',tips:upRemind,file:'定向成片.mp4'};let result=M.act(id,'uploadStart',metadata);if(result.ok)draw();return toast(result.ok?'已开始上传':result.error);}
  }
  function confirmMobile(title,text,a,id){const box=document.createElement('div');box.id='fr-confirm';box.innerHTML=`<div class="load-mask show" data-fr="cancel"></div><div class="backfill-pop" role="dialog" aria-modal="true"><h3>${title}</h3><p>${text}</p><div class="backfill-actions">${b('取消','cancel','','backfill-later')}${b('确认',a,id,'backfill-go')}</div></div>`;document.getElementById('app').append(box);box.querySelector('button').focus();}
  document.addEventListener('click',ev=>{
    const fr=ev.target.closest('[data-fr]');if(fr){ev.preventDefault();ev.stopImmediatePropagation();if(fr.dataset.fr==='cancel'){document.getElementById('fr-confirm')?.remove();dialog='';return;}action(fr.dataset.fr,fr.dataset.frId);return;}
    if(ev.target.closest('#upClose,#upMask'))uploadId='';if(ev.target.closest('#openUpload'))uploadId='';
    const go=ev.target.closest('[data-go]');if(go?.closest('[data-fr-claim]')){const c=M.getClaim(go.closest('[data-fr-claim]').dataset.frClaim);if(c?.recordId){ev.preventDefault();ev.stopImmediatePropagation();selected=c.recordId;origin='claims';navigate('manuscript');return;}}if(go&&custom){ev.preventDefault();ev.stopImmediatePropagation();navigate(go.dataset.go);return;}
    const act=ev.target.closest('[data-act]');if(act&&M.getClaim(act.dataset.cid)){
      if(act.dataset.act==='dl'){ev.preventDefault();ev.stopImmediatePropagation();source=act.dataset.cid;const items=M.keywordManuscripts(source);if(items.length===1){const result=M.download(items[0].id);draw();toast(result.ok?'示例：稿件已保存到相册':result.error);}else{downloadSource=source;draw();document.querySelector('.fr-download-sheet .x')?.focus();}}
      if(act.dataset.act==='fill'){ev.preventDefault();ev.stopImmediatePropagation();source=act.dataset.cid;const c=M.getClaim(source);if(c.status==='超时未回填')return toast('已超时，不能回填');navigate('fill');}
    }
  },true);
  document.addEventListener('change',ev=>{const id=ev.target.id;if(id==='fr-income-sort'||id==='fr-request-filter'){if(id==='fr-income-sort')sort=ev.target.value;else requestFilter=ev.target.value;draw();document.getElementById(id)?.focus();}});
  document.addEventListener('input',ev=>{if(ev.target.name==='note')note=ev.target.value;});
  document.addEventListener('submit',ev=>{
    if(ev.target.id==='fr-apply'){ev.preventDefault();const result=M.submit({sourceId:source,note});if(!result.ok)return toast(result.error);selected=result.record.id;navigate('records');toast('申请已提交，等待剪辑手审核');}
    if(ev.target.id==='fr-fill'){ev.preventDefault();const c=M.getClaim(source),url=ev.target.elements.url.value.trim();if(!url)return;const result=M.fillClaim(c.id,url);if(result.ok){claimStatus='已回填';navigate('claims');toast('回填成功，约稿申请终态不变');}else toast(result.error);}
  });
  document.addEventListener('keydown',ev=>{if(ev.key==='Tab'&&downloadSource){const buttons=[...document.querySelectorAll('.fr-download-sheet button:not(:disabled)')];if(ev.shiftKey&&document.activeElement===buttons[0]){ev.preventDefault();buttons.at(-1).focus();}else if(!ev.shiftKey&&document.activeElement===buttons.at(-1)){ev.preventDefault();buttons[0].focus();}}if(ev.key==='Escape'){if(downloadSource){action('downloads-close');return;}document.getElementById('fr-confirm')?.remove();if(dialog){dialog='';draw();}else if(uploadOpen){uploadOpen=false;draw();}}});
  window.addEventListener('message',ev=>{if(ev.source!==parent||ev.origin!==location.origin||ev.data?.type!=='fr-wen-005:screen')return;let s=ev.data.screen;if(ev.data.role==='pc'){pcState=['empty','loading','error'].includes(s)?s:'';pcPane=s==='dashboard'?'dashboard':'list';custom='';view='editor';if(['upload','permission','rejected'].includes(s)){const id=s==='permission'?'A5117':s==='rejected'?'A5104':'A5103';if(s==='rejected'&&M.get(id).status==='稿件审核中')M.act(id,'auditReject');action('upload',id);}else draw();return;}if(s==='apply')return action('apply','C4000');if(s==='claimed'){claimStatus='已回填';s='claims';}navigate(s);});
  M.subscribe(()=>{if(pendingClaim&&!M.get(pendingClaim)){pendingClaim='';chargeAsk=false;buyOpen=false;ptsShort=false;ptsBuy=false;}if(['detail','manuscript'].includes(custom)&&!M.get(selected)){custom='';view='claims';}draw();});sync();
  const start=q.get('screen');if(start==='claimed'||!start){claimStatus='已回填';navigate('claims');}else if(start==='editor'){view='editor';draw();}else navigate(start);
})();
