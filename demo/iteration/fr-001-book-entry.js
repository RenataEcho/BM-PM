/* FR-001：所有数据和交互仅在内存中。 */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const esc = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const groups = {
    byte: {label:'字节系', table:'yx_fanqie_book_lists', field:'书籍 ID', key:'id'},
    zhihu: {label:'知乎系', table:'novel_sections', field:'书籍链接', key:'link'},
    drama: {label:'海外短剧', table:'yx_story_task', field:'book_id', key:'id'},
    novel: {label:'海外小说', table:'yx_story_task', field:'book_id', key:'id'},
    other: {label:'其他项目', table:'无', field:'不校验', key:null}
  };
  const records = [
    ...Array.from({length:28}, (_,i) => ({group:'byte', name:i === 0 ? '山海来信' : `山海来信·第${i+1}部`, id:String(10001+i), type:'小说', link:`https://fanqie.example/book/${10001+i}`})),
    {group:'zhihu',name:'长夜有回声',id:'ZH2001',type:'故事',link:'https://zhihu.example/story/2001'},
    {group:'zhihu',name:'雨落之前',id:'ZH2002',type:'故事',link:'https://zhihu.example/story/2002'},
    {group:'drama',name:'重逢在黎明',id:'DR3001',type:'短剧',link:''},
    {group:'drama',name:'海岸之约',id:'DR3002',type:'短剧',link:''},
    {group:'novel',name:'星河之外',id:'NV4001',type:'小说',link:''},
    {group:'novel',name:'漫长归途',id:'NV4002',type:'小说',link:''}
  ];
  const scenes = {
    name:{label:'按书名搜索',desc:'更新书名，其他字段只补空',group:'byte',project:'番茄小说',values:{name:'山海'}},
    id:{label:'按 ID 搜索',desc:'更新 ID，保留已填书名',group:'byte',project:'番茄畅听',values:{name:'我的手填书名',id:'100'}},
    byte:{label:'字节系异常',desc:'书库不全，确认后可继续',group:'byte',project:'红果短剧APP',values:{name:'书库外的作品',id:'99999'}},
    zhihu:{label:'知乎系异常',desc:'链接不匹配，确认后可继续',group:'zhihu',project:'知乎故事',values:{name:'长夜有回声',id:'ZH2001',link:'https://zhihu.example/story/unknown'}},
    drama:{label:'海外短剧异常',desc:'只能关闭，修正后再下一步',group:'drama',project:'海外短剧',values:{name:'重逢在黎明',id:'DR0000'}},
    novel:{label:'海外小说异常',desc:'只能关闭，修正后再下一步',group:'novel',project:'海外小说',values:{name:'星河之外',id:'NV0000'}},
    other:{label:'其他项目',desc:'无书库，跳过书籍校验',group:'other',project:'其他项目',values:{name:'手动填写的书籍'}},
    fault:{label:'书库查询故障',desc:'系统异常，不伪装成填写错误',group:'novel',project:'海外小说',fault:true,values:{name:'星河之外',id:'NV4001'}},
    empty:{label:'检索无结果',desc:'不展示假数据行',group:'byte',project:'PikPak',values:{name:'不存在的示例书籍'}},
    matched:{label:'字节系正确匹配',desc:'点下一步直接进入第三步',group:'byte',project:'番茄小说',values:{name:'山海来信',id:'10001',type:'小说',link:'https://fanqie.example/book/10001'}},
    'zhihu-ok':{label:'知乎系正确匹配',desc:'链接完全一致，直接下一步',group:'zhihu',project:'盐言聚星拉活',values:{name:'长夜有回声',id:'ZH2001',type:'故事',link:'https://zhihu.example/story/2001'}},
    'drama-ok':{label:'海外短剧正确匹配',desc:'ID 为 DR3001，可直接下一步',group:'drama',project:'海外短剧',values:{name:'重逢在黎明',id:'DR3001',type:'短剧'}},
    'novel-ok':{label:'海外小说正确匹配',desc:'ID 为 NV4001，可直接下一步',group:'novel',project:'海外小说',values:{name:'星河之外',id:'NV4001',type:'小说'}}
  };
  const fieldNames = {name:'书籍名称',id:'书籍 ID',type:'书籍类型',link:'书籍链接'};
  function focusable(root) {
    return [...root.querySelectorAll('button,a[href],input,select,[tabindex="0"]')].filter(el => !el.disabled && !el.hidden && el.getClientRects().length);
  }
  function trap(event, root) {
    if (event.key !== 'Tab') return;
    const items = focusable(root);
    if (!items.length) {event.preventDefault(); root.focus(); return;}
    const first=items[0], last=items[items.length-1];
    if (event.shiftKey && (document.activeElement===first || !items.includes(document.activeElement))) {event.preventDefault();last.focus();}
    else if (!event.shiftKey && (document.activeElement===last || !items.includes(document.activeElement))) {event.preventDefault();first.focus();}
  }
  function summary(values) {
    return Object.entries(fieldNames).map(([key,label]) => `<dt>${label}</dt><dd>${esc(values[key] || '—')}</dd>`).join('');
  }
  if (document.body.dataset.page === 'workspace') workspace(); else mockup();

  function workspace() {
    if(new URLSearchParams(location.search).get('embed')==='1')document.body.classList.add('embedded');
    let currentTab='fe', currentScene='name', openDrawer=null, returnFocus=null;
    const frame=$('mockup');
    function tab(name) {
      currentTab=['fe','admin','flow'].includes(name) ? name : 'fe';
      document.querySelectorAll('.view').forEach(el => {el.hidden=el.id!==`view-${currentTab}`;});
      document.querySelectorAll('[data-tab]').forEach(el => {const active=el.dataset.tab===currentTab;el.classList.toggle('active',active);el.setAttribute('aria-current',active?'page':'false');});
      const url=new URL(location.href); url.searchParams.set('tab',currentTab);history.replaceState(null,'',url);
    }
    function scene(name, reset=false) {
      currentScene=scenes[name] ? name : 'name';
      document.querySelectorAll('[data-screen]').forEach(el => {const active=el.dataset.screen===currentScene;el.classList.toggle('active',active);el.setAttribute('aria-pressed',String(active));});
      $('scene-caption').textContent=scenes[currentScene].desc;
      if (reset || frame.contentWindow) frame.contentWindow.postMessage({type:'fr001-screen',screen:currentScene},location.origin);
    }
    $('scenes').innerHTML=Object.entries(scenes).map(([key,s])=>`<button class="btn btn-ghost scene-button" data-screen="${key}" aria-pressed="false"><b>${s.label}</b><small>${s.desc}</small></button>`).join('');
    document.querySelectorAll('[data-screen]').forEach(el=>el.addEventListener('click',()=>scene(el.dataset.screen)));
    frame.addEventListener('load',()=>scene(currentScene));
    $('scene-reset').addEventListener('click',()=>scene(currentScene,true));
    document.querySelectorAll('[data-tab]').forEach(el=>el.addEventListener('click',()=>tab(el.dataset.tab)));
    function ruleTab(name) {
      document.querySelectorAll('[data-rule]').forEach(el=>el.classList.toggle('active',el.dataset.rule===name));
      document.querySelectorAll('.rule-panel').forEach(el=>el.classList.toggle('active',el.id===`rule-${name}`));
    }
    function closeDrawer() {
      if (!openDrawer) return;
      $(openDrawer+'-drawer').hidden=true;$(openDrawer+'-drawer').classList.remove('open');
      $(openDrawer+'-overlay').hidden=true;$(openDrawer+'-overlay').classList.remove('open');
      $('workspace').inert=false;document.querySelector('.sidebar').inert=false;document.querySelector('.topnav').inert=false;
      $('rules-open').setAttribute('aria-expanded','false');openDrawer=null;
      if(returnFocus?.isConnected) returnFocus.focus();
    }
    function drawer(name) {
      if(openDrawer===name){closeDrawer();return;}
      if(openDrawer) closeDrawer();
      returnFocus=document.activeElement;openDrawer=name;
      const panel=$(name+'-drawer'), backdrop=$(name+'-overlay');
      panel.hidden=false;backdrop.hidden=false;panel.classList.add('open');backdrop.classList.add('open');
      $('workspace').inert=true;document.querySelector('.sidebar').inert=true;document.querySelector('.topnav').inert=true;
      if(name==='rules'){$('rules-open').setAttribute('aria-expanded','true');ruleTab(currentTab==='admin'?'admin':'fe');}
      panel.querySelector('button').focus();
    }
    $('rules-open').addEventListener('click',()=>drawer('rules'));
    for (const name of ['rules','detail']) $(name+'-overlay').addEventListener('click',closeDrawer);
    document.querySelectorAll('[data-close]').forEach(el=>el.addEventListener('click',closeDrawer));
    document.querySelectorAll('[data-rule]').forEach(el=>el.addEventListener('click',()=>ruleTab(el.dataset.rule)));
    document.addEventListener('keydown',event=>{if(!openDrawer)return;if(event.key==='Escape'){event.preventDefault();closeDrawer();}else trap(event,$(openDrawer+'-drawer'));});
    function renderRows() {
      const group=$('admin-group').value,keyword=$('admin-keyword').value.toLocaleLowerCase();
      const result=records.filter(r=>(group==='all'||r.group===group)&&[r.name,r.id,r.link].some(v=>v.toLocaleLowerCase().includes(keyword)));
      $('admin-count').textContent=`共 ${result.length} 条示例记录`;
      $('admin-rows').innerHTML=result.length?result.map(r=>`<tr><td>${groups[r.group].label}<br><code>${groups[r.group].table}</code></td><td>${esc(r.name)}</td><td class="mono">${r.id}</td><td>${r.type}</td><td>${esc(r.link||'—')}</td><td>${groups[r.group].field}</td><td><button class="link" data-detail="${r.group}:${r.id}">详情</button></td></tr>`).join(''):'<tr><td colspan="7">暂无结果</td></tr>';
      document.querySelectorAll('[data-detail]').forEach(el=>el.addEventListener('click',()=>{
        const record=records.find(r=>`${r.group}:${r.id}`===el.dataset.detail),g=groups[record.group];
        $('detail-content').innerHTML=`<span class="tag tag-ok">只读示例</span><h3 class="spec-subh">${esc(record.name)}</h3><dl class="drawer-meta"><dt>项目系</dt><dd>${g.label}</dd><dt>对照表</dt><dd>${g.table}</dd><dt>校验字段</dt><dd>${g.field}</dd>${summary(record)}</dl><p class="muted">仅展示同一记录；不提供编辑、删除或运营规则配置。海外链接为空时不补入。</p>`;
        drawer('detail');
      }));
    }
    $('admin-search').addEventListener('click',renderRows);$('admin-group').addEventListener('change',renderRows);
    $('admin-keyword').addEventListener('keydown',event=>{if(event.key==='Enter')renderRows();});
    $('admin-reset').addEventListener('click',()=>{$('admin-group').value='all';$('admin-keyword').value='';renderRows();});
    $('flow-chart').innerHTML=flowSvg();
    renderRows();scene('name');tab(new URLSearchParams(location.search).get('tab'));
  }

  function mockup() {
    let scene,modalOpen=false,searchToken=0,checkToken=0,activeKey=null,candidates=[],selected=-1,suppressFocus=false;
    const inputs=Object.fromEntries(Object.keys(fieldNames).map(key=>[key,$('book-'+key)]));
    const getValues=()=>Object.fromEntries(Object.entries(inputs).map(([key,input])=>[key,input.value]));
    let materials=[];
    const demoMaterial={name:'示例成片.mp4',size:1677722,path:'示例成片.mp4'};
    function renderMaterials(){
      $('material-count').textContent=materials.length?`已选择 ${materials.length} 个成片素材`:'尚未选择成片素材';
      $('material-list').innerHTML=materials.length?materials.map(file=>`<div class="material-item"><span class="tag tag-ok">成片素材</span><strong>${esc(file.name)}</strong><span class="muted">${esc(file.path)} · ${(file.size/1048576).toFixed(1)} MB</span></div>`).join(''):'<p class="muted">请选择文件夹或文件，添加要上传的成片。</p>';
      $('clear-materials').disabled=!materials.length;
    }
    function resetMaterials(){materials=[{...demoMaterial}];$('editor-note').value='';$('publish-note').value='';renderMaterials();}
    for(const [button,input] of [['choose-files','material-files'],['choose-folder','material-folder']]){
      $(button).addEventListener('click',()=>$(input).click());
      $(input).addEventListener('change',()=>{materials.push(...Array.from($(input).files,file=>({name:file.name,size:file.size,path:file.webkitRelativePath||file.name})));$(input).value='';renderMaterials();});
    }
    let materialReturnFocus=null;
    function closeMaterialConfirm(){ $('material-confirm').hidden=true;$('material-confirm').classList.remove('open');$('product').inert=false;materialReturnFocus?.focus(); }
    $('clear-materials').addEventListener('click',()=>{closeCandidates();materialReturnFocus=document.activeElement;$('product').inert=true;$('material-confirm').hidden=false;$('material-confirm').classList.add('open');$('material-cancel').focus();});
    $('material-cancel').addEventListener('click',closeMaterialConfirm);
    $('material-clear-confirm').addEventListener('click',()=>{materials=[];closeMaterialConfirm();renderMaterials();$('choose-files').focus();});
    $('material-confirm').addEventListener('click',e=>{if(e.target===$('material-confirm'))closeMaterialConfirm();});
    document.addEventListener('keydown',e=>{if($('material-confirm').hidden)return;if(e.key==='Escape'){e.preventDefault();closeMaterialConfirm();}else trap(e,$('material-confirm'));});

    function closeCandidates() {
      searchToken++;activeKey=null;candidates=[];selected=-1;
      for(const key of ['name','id']){$('candidates-'+key).hidden=true;$('candidates-'+key).replaceChildren();inputs[key].setAttribute('aria-expanded','false');inputs[key].removeAttribute('aria-activedescendant');$('loading-'+key).textContent='';}
    }
    function choose(index) {
      const candidate=candidates[index],triggerKey=activeKey,trigger=inputs[triggerKey];if(!candidate||!trigger)return;
      trigger.value=candidate[triggerKey];
      const filled=[];
      for(const key of Object.keys(fieldNames))if(key!==triggerKey&&inputs[key].value===''&&candidate[key]){inputs[key].value=candidate[key];filled.push(fieldNames[key]);}
      closeCandidates();suppressFocus=true;trigger.focus();suppressFocus=false;
      $('fill-status').textContent=`已更新${fieldNames[triggerKey]}${filled.length?'，补入'+filled.join('、'):''}；其他已填字段保持不变，仍可手动修改。`;
    }
    function markSelection() {
      const list=$('candidates-'+activeKey);
      list.querySelectorAll('[role="option"]').forEach((option,i)=>{option.setAttribute('aria-selected',String(i===selected));});
      if(selected>=0){inputs[activeKey].setAttribute('aria-activedescendant',`option-${activeKey}-${selected}`);list.children[selected].scrollIntoView({block:'nearest'});}
    }
    function search(key) {
      closeCandidates();if(!inputs[key].value || scene.group==='other')return;
      const token=++searchToken;activeKey=key;$('loading-'+key).textContent='正在查询…';
      setTimeout(()=>{
        if(token!==searchToken||document.activeElement!==inputs[key])return;
        $('loading-'+key).textContent='';
        if(scene.fault){$('loading-'+key).textContent='书库查询失败，请稍后再试。';return;}
        const query=inputs[key].value.toLocaleLowerCase();
        candidates=records.filter(r=>r.group===scene.group&&r[key].toLocaleLowerCase().includes(query)).slice(0,20);
        const list=$('candidates-'+key);list.hidden=false;inputs[key].setAttribute('aria-expanded','true');
        list.innerHTML=candidates.length?candidates.map((r,i)=>`<div class="candidate" id="option-${key}-${i}" role="option" aria-selected="false" data-index="${i}"><strong>${esc(r.name)}</strong><small>${esc(r.id)} · ${esc(r.type)}</small><small>${esc(r.link||'书籍链接：无')}</small></div>`).join(''):'<div class="candidate-empty" role="status">暂无结果</div>';
        list.querySelectorAll('[data-index]').forEach(el=>{el.addEventListener('pointerdown',e=>e.preventDefault());el.addEventListener('click',()=>choose(Number(el.dataset.index)));});
      },180);
    }
    for(const key of ['name','id']){
      inputs[key].addEventListener('input',()=>search(key));
      inputs[key].addEventListener('focus',()=>{if(!suppressFocus)search(key);});
      inputs[key].addEventListener('keydown',event=>{
        if(event.isComposing || event.keyCode===229)return;
        if(event.key==='Escape'){closeCandidates();event.stopPropagation();event.preventDefault();return;}
        if(activeKey===key&&!$('candidates-'+key).hidden){
          if(event.key==='ArrowDown'||event.key==='ArrowUp'){event.preventDefault();if(candidates.length){selected=selected<0?(event.key==='ArrowDown'?0:candidates.length-1):(selected+(event.key==='ArrowDown'?1:-1)+candidates.length)%candidates.length;markSelection();}}
          if(event.key==='Enter'){event.preventDefault();if(selected>=0)choose(selected);}
        }else if(event.key==='Enter'){event.preventDefault();search(key);}
      });
      inputs[key].addEventListener('blur',closeCandidates);
    }
    document.addEventListener('pointerdown',event=>{if(!event.target.closest('.search-field'))closeCandidates();});
    function closeModal(restore=true) {
      $('validation-overlay').classList.remove('open');$('validation-overlay').hidden=true;modalOpen=false;$('product').inert=false;
      if(restore)$('next').focus();
    }
    function openModal(kind) {
      closeCandidates();modalOpen=true;$('product').inert=true;
      const g=groups[scene.group],domestic=['byte','zhihu'].includes(scene.group);
      $('validation-title').textContent=kind==='fault'?'书库查询失败':`${g.label} · ${g.field}校验异常`;
      $('validation-message').textContent=kind==='fault'?'系统异常，暂时无法查询书库。已保留填写内容。':scene.group==='byte'?'书籍ID与书籍不匹配，确认要继续提交吗？':scene.group==='zhihu'?'书籍链接与书籍名称不匹配，确认要继续提交吗？':'书籍ID与书籍名称不匹配，请填写正确后再提交！';
      $('validation-message').style.color=kind==='fault'?'var(--text-primary)':domestic?'var(--warning)':'var(--danger)';
      $('validation-note').textContent=kind==='fault'?'查询失败不视为填写错误；已保留填写内容，关闭后留在第二步。':domestic?'书库可能不完整，可确认后继续。':'请修正书籍 ID 后重新点下一步。';
      $('validation-actions').replaceChildren();
      for(const label of kind==='fault'||!domestic?['关闭']:['取消','继续提交']){
        const button=document.createElement('button');button.type='button';button.className=`btn ${label==='继续提交'?'btn-primary':'btn-ghost'}`;button.textContent=label;
        button.addEventListener('click',()=>{closeModal(label!=='继续提交');if(label==='继续提交')goThird();});$('validation-actions').append(button);
      }
      $('validation-overlay').hidden=false;$('validation-overlay').classList.add('open');$('validation-actions').firstElementChild.focus();
    }
    $('validation-overlay').addEventListener('click',event=>{if(event.target===$('validation-overlay'))closeModal();});
    document.addEventListener('keydown',event=>{if(!modalOpen)return;if(event.key==='Escape'){event.preventDefault();closeModal();}else trap(event,$('validation-overlay').querySelector('.modal'));});
    function setBusy(busy) {
      $('book-form').querySelectorAll('input,select,button').forEach(el=>{el.disabled=busy;});$('next').textContent=busy?'校验中…':'下一步';
    }
    function goThird() {
      closeCandidates();$('form-step').hidden=true;$('submit-step').hidden=false;$('submit-summary').innerHTML=summary(getValues());$('submit-feedback').textContent='';$('material-summary').innerHTML=`<h2>待上传成片 · ${materials.length} 个</h2>`+$('material-list').innerHTML+`<p class="muted">发布技巧：${esc($('publish-note').value||'未填写')}</p>`;
      $('step-two').className='complete';$('step-two').removeAttribute('aria-current');$('step-three').className='active';$('step-three').setAttribute('aria-current','step');$('final-submit').focus();
    }
    function goSecond(restoreFocus=true) {
      $('form-step').hidden=false;$('submit-step').hidden=true;$('step-two').className='active';$('step-two').setAttribute('aria-current','step');$('step-three').className='';$('step-three').removeAttribute('aria-current');if(restoreFocus)$('next').focus();
    }
    $('book-form').addEventListener('submit',async event=>{
      event.preventDefault();if($('next').disabled)return;closeCandidates();const token=++checkToken,values=getValues(),group=groups[scene.group];
      if(!group.key){goThird();return;}
      setBusy(true);await new Promise(resolve=>setTimeout(resolve,280));if(token!==checkToken)return;setBusy(false);
      if(scene.fault){openModal('fault');return;}
      const comparedValue=values[group.key].trim();
      const matched=comparedValue!==''&&records.some(r=>r.group===scene.group&&r[group.key].trim()===comparedValue);
      if(matched)goThird();else openModal('mismatch');
    });
    $('back').addEventListener('click',()=>goSecond());
    $('final-submit').addEventListener('click',()=>{$('submit-feedback').textContent='模拟提交成功。本 FR 未在第三步再次校验或拦截。';});
    function loadScreen(name) {
      closeMaterialConfirm();scene=scenes[name]||scenes.name;checkToken++;closeCandidates();closeModal(false);setBusy(false);
      for(const key of Object.keys(inputs))inputs[key].value=scene.values[key]||'';
      resetMaterials();$('fill-status').textContent='';goSecond(false);
      $('project-label').textContent=`${scene.project} · ${groups[scene.group].label}`;
      $('check-hint').textContent=scene.group==='other'?'此项目不做书籍校验':`下一步校验：${groups[scene.group].field}`;
      $('form-hint').textContent=scene.group==='other'?'当前项目暂无书库，请手动填写书籍信息。':'支持按书籍名称或书籍 ID 模糊搜索';
      for(const key of ['name','id'])inputs[key].placeholder=scene.group==='other'?'请手动填写'+fieldNames[key]:'输入'+fieldNames[key]+'搜索';
    }
    window.addEventListener('message',event=>{if(event.origin!==location.origin||event.source!==window.parent||event.data?.type!=='fr001-screen')return;loadScreen(event.data.screen);});
    loadScreen(new URLSearchParams(location.search).get('screen')||'name');
  }

  function flowSvg() {
    return `<svg width="1500" height="1420" viewBox="0 0 1500 1420" role="img" aria-labelledby="flow-title flow-description" xmlns="http://www.w3.org/2000/svg">
      <title id="flow-title">FR-001 书籍填写与校验业务流程</title><desc id="flow-description">第二步书籍检索与补空后点下一步，无书库项目直接进第三步。有书库则查询，故障返回填写；匹配通过进入第三步。海外异常关闭后返回填写，国内异常确认可继续，取消返回填写。第三步不再次拦截。</desc>
      <defs><marker id="fr001-flow-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10Z" fill="#94a3b8"/></marker></defs>
      <g class="flow-edges" marker-end="url(#fr001-flow-arrow)">
        <polyline points="530,110 530,150"/><polyline points="530,230 530,270"/><polyline points="530,330 530,370"/>
        <polyline points="530,490 530,540"/><polyline points="650,430 1120,430"/>
        <polyline points="1340,430 1440,430 1440,1340 660,1340"/>
        <polyline points="530,600 530,640"/><polyline points="410,700 310,700"/>
        <polyline points="90,700 40,700 40,20 530,20 530,50"/>
        <polyline points="530,760 530,820"/><polyline points="530,940 530,1300"/>
        <polyline points="650,880 840,880"/><polyline points="960,940 960,1000"/>
        <polyline points="1080,880 1190,880 1190,1000"/>
        <polyline points="960,1060 960,1110 80,1110 80,30 500,30 500,50"/>
        <polyline points="1190,1060 1190,1140"/>
        <polyline points="1070,1200 1020,1200 1020,1320 660,1320"/>
        <polyline points="1190,1260 1190,1380 60,1380 60,40 470,40 470,50"/>
      </g>
      <g class="flow-edges"><text class="yes" x="542" y="518">是</text><text class="no" x="770" y="420">否</text><text class="no" x="340" y="690">否</text><text class="yes" x="542" y="790">是</text><text class="yes" x="542" y="1160">是 / 完全一致</text><text class="no" x="730" y="870">否</text><text class="yes" x="970" y="975">是</text><text class="no" x="1130" y="870">否</text><text class="yes" x="1040" y="1290">是</text><text class="no" x="1202" y="1330">否 / 取消</text><text x="105" y="1098">关闭后修改，再点下一步</text><text x="90" y="1370">取消后保留第二步填写</text><text x="50" y="380">关闭异常提示，保留填写</text></g>
      <g class="flow-nodes">
        <rect x="400" y="50" width="260" height="60" rx="7" fill="#dbeafe" stroke="#93c5fd"/><text x="530" y="76"><tspan x="530">第二步填写书籍信息</tspan><tspan x="530" dy="18" class="sub">项目沿用第一步选择</tspan></text>
        <rect x="400" y="150" width="260" height="80" rx="7" fill="#dbeafe" stroke="#93c5fd"/><text x="530" y="174"><tspan x="530">名称 / ID 模糊搜索</tspan><tspan x="530" dy="19">更新触发字段，其他只补空</tspan><tspan x="530" dy="17" class="sub">至多20条；选后仍可手改</tspan></text>
        <rect x="400" y="270" width="260" height="60" rx="7" fill="#dbeafe" stroke="#93c5fd"/><text x="530" y="305">点击第二步「下一步」</text>
        <polygon points="530,370 650,430 530,490 410,430" fill="#fef3c7" stroke="#fbbf24"/><text x="530" y="434">当前项目有书库？</text>
        <rect x="1120" y="400" width="220" height="60" rx="7" fill="#f1f5f9" stroke="#cbd5e1"/><text x="1230" y="426"><tspan x="1230">其他项目跳过</tspan><tspan x="1230" dy="18" class="sub">仍沿用原有其他校验</tspan></text>
        <rect x="400" y="540" width="260" height="60" rx="7" fill="#dcfce7" stroke="#86efac"/><text x="530" y="565"><tspan x="530">按项目系查询对应书库</tspan><tspan x="530" dy="18" class="sub">字节 / 海外比 ID；知乎比链接</tspan></text>
        <polygon points="530,640 650,700 530,760 410,700" fill="#fef3c7" stroke="#fbbf24"/><text x="530" y="704">书库查询成功？</text>
        <rect x="90" y="670" width="220" height="60" rx="7" fill="#ffedd5" stroke="#fdba74"/><text x="200" y="695"><tspan x="200">显示系统异常，非填写错误</tspan><tspan x="200" dy="18" class="sub">保留内容，关闭后回第二步</tspan></text>
        <polygon points="530,820 650,880 530,940 410,880" fill="#fef3c7" stroke="#fbbf24"/><text x="530" y="869"><tspan x="530">去首尾空格后完全一致？</tspan><tspan x="530" dy="16" class="sub">协议 / query / 尾斜杠 / 大小写不忽略</tspan><tspan x="530" dy="16" class="sub">空值 / 无记录未匹配 [待确认]</tspan></text>
        <polygon points="960,820 1080,880 960,940 840,880" fill="#fef3c7" stroke="#fbbf24"/><text x="960" y="884">属于海外项目系？</text>
        <rect x="850" y="1000" width="220" height="60" rx="7" fill="#fee2e2" stroke="#fca5a5"/><text x="960" y="1026"><tspan x="960">海外异常阻断</tspan><tspan x="960" dy="18">弹窗仅「关闭」</tspan></text>
        <rect x="1100" y="1000" width="220" height="60" rx="7" fill="#dbeafe" stroke="#93c5fd"/><text x="1210" y="1026"><tspan x="1210">字节 / 知乎异常确认</tspan><tspan x="1210" dy="18" class="sub">取消 / 继续提交</tspan></text>
        <polygon points="1190,1140 1310,1200 1190,1260 1070,1200" fill="#fef3c7" stroke="#fbbf24"/><text x="1190" y="1195"><tspan x="1190">点击「继续提交」？</tspan><tspan x="1190" dy="18" class="sub">不是第三步最终提交</tspan></text>
        <rect x="400" y="1300" width="260" height="60" rx="7" fill="#dbeafe" stroke="#93c5fd"/><text x="530" y="1325"><tspan x="530">第三步 · 最终提交</tspan><tspan x="530" dy="18" class="sub">本 FR 不再次拦截</tspan></text>
      </g></svg>`;
  }
})();
