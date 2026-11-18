/* FR-wen-005：仅在内存中运行的示例状态；不接接口，不保存到浏览器。 */
(function () {
  'use strict';
  if (window.parent !== window && window.parent.FR005) { window.FR005 = window.parent.FR005; return; }
  const H = 3600000;
  const stages = ['待审核','已撤销','已拒绝','制作中','稿件审核中','超时未交付','待领取','超时未领取','待回填','已回填','超时未回填'];
  const terminal = s => ['已撤销','已拒绝','超时未交付','超时未领取','已回填','超时未回填'].includes(s);
  const messages = {
    accept:'你的定向约稿申请已通过，剪辑手将为你制作稿件，请前往约稿页面查看进度。',
    reject:'你的定向约稿申请未通过，你可以前往约稿页面查看记录并重新申请。',
    upload:'剪辑手已上传你的定向稿件，正在等待后台审核。审核通过后，请及时领取；如有领取时限，请在截止前领取。可前往约稿页面查看进度。'
  };
  const editors = [{name:'小陈',id:'100099',projects:['番茄小说','知乎故事']},{name:'阿禾剪辑',id:'100102',projects:['红果短剧','番茄小说']},{name:'北川',id:'100128',projects:['红果短剧']}];
  const projects = ['番茄小说','知乎故事','红果短剧'];
  let now, records, config, notifications, sequence;
  const listeners = new Set();
  const makeManuscript = r => ({id:'M'+r.id.slice(1),title:r.book+' · 定向成片',book:r.book,bookId:r.bookId,bookUrl:r.bookUrl||'',keyword:'星河'+r.id.slice(1),project:r.project,mode:'任务协作',kind:'视频',material:r.material||'解说混剪',fills:0,directory:'成片.mp4',uploaded:now,status:'审核中'});
  function seed() {
    editors.forEach((e,i)=>Object.assign(e,{platforms:i===2?['右豹']:['右豹','定向约稿'],enabled:true,fee:'跟随平台',modes:['任务协作','账号运营'],taskShare:50,accountShare:50,audit:true,note:''}));
    now = Date.now(); config = {delivery:72,claim:48}; sequence=5200;
    records = stages.map((status,i) => {
      const r={id:'A'+(5100+i),user:'小林',userId:'200861',editor:'小陈',editorId:'100099',project:'番茄小说',book:['长安有故人','星河入梦','迟来的告白'][i%3],bookId:i%3===1?'':'BK'+(8200+i),bookUrl:'https://example.com/book/'+(8200+i),material:'解说混剪',rejectReason:status==='已拒绝'?'当前档期已满，暂时无法承接。':'',note:i%2?'希望延续原稿叙事风格。':'',created:now-(i+1)*H,status,delivery:72,claim:48,deliveryDue:now+70*H,claimDue:now+46*H,fillDue:now+22*H,received:['待回填','已回填','超时未回填'].includes(status),rejected:false,upload:null,available:status!=='稿件审核中'};
      if (['稿件审核中','待领取','超时未领取','待回填','已回填','超时未回填'].includes(status)) r.manuscript=makeManuscript(r);
      if(r.manuscript)r.manuscript.status=status==='稿件审核中'?'审核中':status==='超时未领取'?'已删除':'已通过';
      if(status==='已回填')r.manuscript.fills=1;
      return r;
    });
    for(let i=0;i<5;i++)records.push({...records[0],id:'A'+(5111+i),created:now-(i+12)*H,book:i?'长安有故人':'手填书籍示例',bookId:i?'BK8200':''});
    const noLimit={...records[3],id:'A5116',book:'不限时交付示例',delivery:0,claim:0,deliveryDue:null,claimDue:null};records.push(noLimit);
    const denied={...records[3],id:'A5117',book:'项目权限变化示例',permissionLost:true};records.push(denied);
    const wait={...records[3],id:'A5118',book:'跨截止上传示例',deliveryDue:now-H,upload:{started:now-H,progress:68}};records.push(wait);
    notifications=[{id:'N1',record:'A5103',text:messages.accept,time:now-H},{id:'N2',record:'A5104',text:messages.upload,time:now-H/2},{id:'N3',record:'A5102',text:messages.reject,time:now-2*H}];
  }
  const emit = () => listeners.forEach(fn=>fn());
  const get = id => records.find(r=>r.id===id);
  function cleanup(r){if(r.manuscript&&!r.received)r.manuscript.status='已删除';r.upload=null;}
  function expire() {
    records.forEach(r=>{
      if(r.keywordReservedUntil&&now>=r.keywordReservedUntil){r.keywordReservedUntil=null;}
      if(r.status==='制作中'&&r.delivery&&now>r.deliveryDue){
        if(!r.upload||now>=r.deliveryDue+2*H){r.status='超时未交付';cleanup(r);}
      } else if(r.status==='待领取'&&r.claim&&now>=r.claimDue){r.status='超时未领取';cleanup(r);}
      else if(r.status==='待回填'&&now>=r.fillDue){r.status='超时未回填';}
    });
  }
  function addNotification(r,type){notifications.unshift({id:'N'+sequence++,record:r.id,text:messages[type]+(type==='reject'?'拒绝原因：'+r.rejectReason:''),time:now});}
  const error = text => ({ok:false,error:text});
  function submit(form){
    if(!form.project||!form.book.trim()||!form.editorId)return error('请填写完整后再提交申请');
    const editor=editors.find(e=>e.id===form.editorId);
    if(editor&&(!editor.enabled||!editor.platforms.includes('定向约稿')))return error('该剪辑手未开启定向约稿权限，请重新选择剪辑手');
    if(!editor||!editor.projects.includes(form.project))return error('该剪辑手不支持当前项目稿件，请修改后重新提交');
    const r={id:'A'+sequence++,user:'小林',userId:'200861',editor:editor.name,editorId:editor.id,project:form.project,book:form.book.trim(),bookId:form.bookId.trim(),bookUrl:(form.bookUrl||'').trim(),material:form.material||'真人出镜',note:form.note.trim(),created:now,status:'待审核',delivery:config.delivery,claim:config.claim,received:false};
    records.unshift(r);emit();return {ok:true,record:r};
  }
  function act(id,action,payload={}){
    const r=get(id);if(!r)return error('记录无法读取，请返回重试');
    // 上传在 D+2 恰好成功有效：先检查这一成功事件，再统一处理到期。
    if(action==='uploadSuccess'&&r.status==='制作中'&&r.upload&&(!r.delivery||now<=r.deliveryDue+2*H)){
      const metadata=r.upload.metadata||{};
      r.manuscript ||= makeManuscript(r);r.manuscript.status='审核中';r.manuscript.uploaded=now;r.manuscript.mode=metadata.mode||r.manuscript.mode;r.manuscript.kind=metadata.kind||r.manuscript.kind;r.manuscript.material=metadata.material||r.manuscript.material;r.manuscript.title=metadata.title||r.manuscript.title;r.manuscript.directory=metadata.file||r.manuscript.directory;r.manuscript.publishTips=metadata.tips||'';r.manuscript.bookType=metadata.bookType||'';r.manuscript.editorReminder=metadata.reminder||'';r.manuscript.cover=metadata.cover||'';r.manuscript.platform='定向供稿';if(metadata.mode==='账号运营'&&metadata.keywords)r.manuscript.keyword=metadata.keywords;
      r.status='稿件审核中';r.upload=null;r.deliveryDue=null;r.available=false;addNotification(r,'upload');emit();return {ok:true};
    }
    expire();
    if(terminal(r.status))return error('当前申请为「'+r.status+'」，不能继续此操作');
    if(['accept','reject','revoke'].includes(action)){
      if(r.status!=='待审核')return error('申请状态已更新，接受后不可取消');
      if(action==='reject'&&!payload.reason?.trim())return error('请填写拒绝原因');
      r.status=action==='accept'?'制作中':action==='reject'?'已拒绝':'已撤销';
      if(action==='accept'){r.deliveryDue=r.delivery?now+r.delivery*H:null;addNotification(r,'accept');}
      if(action==='reject'){r.rejectReason=payload.reason.trim();addNotification(r,'reject');cleanup(r);}
    } else if(action==='uploadStart'){
      if(r.status!=='制作中'||r.upload)return error('当前不能发起新的上传');
      if(r.permissionLost)return error('请联系客服开启项目权限后再上传');
      if(r.delivery&&now>r.deliveryDue)return error('已过交付截止时间，不能新发起或重试上传');
      r.uploadError='';r.upload={started:now,progress:32,metadata:{...payload}};
    } else if(action==='uploadFail'||action==='uploadCancel'){
      if(r.status!=='制作中'||!r.upload)return error('当前没有进行中的上传');
      r.uploadError=action==='uploadFail'?'上传失败，尚未成功送审。':'本次上传已取消，尚未成功送审。';r.upload=null;if(r.delivery&&now>r.deliveryDue){r.status='超时未交付';cleanup(r);}
    } else if(action==='auditReject'){
      if(r.status!=='稿件审核中'||r.manuscript.status!=='审核中')return error('稿件已处理，请刷新');
      r.status='制作中';r.rejected=true;r.manuscript.status='已驳回';r.deliveryDue=r.delivery?now+r.delivery*H:null;
    } else if(action==='auditPass'){
      if(r.status!=='稿件审核中'||r.manuscript.status!=='审核中')return error('稿件已处理，请刷新');
      r.manuscript.status='已通过';r.available=true;r.status='待领取';r.claimDue=r.claim?now+r.claim*H:null;
    } else if(action==='reserveKeyword'){
      if(r.status!=='待领取'||!r.available)return error('当前不可领取');
      if(r.keywordReservedUntil)return error('请先补充关键词');
      r.keywordReservedUntil=now+H;
    } else if(action==='claim'){
      if(payload.userId&&payload.userId!==r.userId)return error('仅申请用户可领取该定向稿件');
      if(r.status!=='待领取'||!r.available||r.manuscript?.status!=='已通过')return error('当前暂不可领取，请查看后续进度');
      r.manuscript.keyword=payload.keyword||r.manuscript.keyword;r.keywordReservedUntil=null;
      r.received=true;r.status='待回填';r.fillDue=now+24*H;
    } else if(action==='fill'){
      if(r.status!=='待回填')return error('当前不可回填');
      if(!payload.url?.trim())return error('请填写发布链接');
      r.status='已回填';r.filledAt=now;r.manuscript.fills=1;r.publishUrl=payload.url.trim();
    } else return error('当前操作不可用');
    emit();return {ok:true};
  }
  function deadline(r){
    if(r.status==='待审核')return '等待剪辑手审核，不设响应期限';
    if(r.status==='制作中'){
      if(!r.delivery)return '交付时限：不限制';
      if(r.upload&&now>r.deliveryDue)return '上传处理中，最晚等待至本轮交付截止后2小时 · '+format(r.deliveryDue+2*H);
      return '交付截止 '+format(r.deliveryDue)+' · 剩余 '+remaining(r.deliveryDue);
    }
    if(r.status==='稿件审核中')return '稿件已上传，正在等待后台审核，暂不可领取';
    if(r.status==='待领取')return r.claim?'领取截止 '+format(r.claimDue)+' · 剩余 '+remaining(r.claimDue):'领取时限：不限制';
    if(r.status==='待回填')return '回填截止 '+format(r.fillDue)+' · 剩余 '+remaining(r.fillDue)+'（领取后24小时）';
    if(r.status==='超时未交付')return '当前申请已超时未交付，申请已自动关闭，不可再上传稿件。';
    return r.status==='超时未回填'?'沿用既有超时处理，已领取稿件保留':r.status==='超时未领取'?'未领定向稿件已失效并删除':r.status==='已回填'?'已完成回填，已领取稿件保留':'申请已结束，可重新申请';
  }
  function format(t){return t?new Date(t).toLocaleString('zh-CN',{hour12:false}).replaceAll('/','-'):'不限制';}
  function remaining(t){return Math.max(0,Math.floor((t-now)/H))+'小时'+Math.max(0,Math.floor((t-now)%H/60000))+'分';}
  seed();
  window.FR005={setEditor(id,values){const editor=editors.find(e=>e.id===id);if(!editor)return error('剪辑手不存在');if(!values.name?.trim())return error('请填写昵称');if(!values.modes?.length)return error('请至少选择一种代运营合作模式');if(!values.projects?.length)return error('请至少选择一个可上传项目');if(![values.taskShare,values.accountShare].every(x=>Number.isFinite(Number(x))&&Number(x)>=0&&Number(x)<=100))return error('分润比例请输入0—100之间的数值');Object.assign(editor,values,{name:values.name.trim(),platforms:values.platforms.filter(x=>['右豹','站外','企业号','定向约稿'].includes(x))});emit();return {ok:true}},stages,terminal,editors,projects,messages,H,get records(){return records},get config(){return config},get now(){return now},get notifications(){return notifications},get,submit,act,deadline,format,
    subscribe(fn){listeners.add(fn);return()=>listeners.delete(fn)},reset(){seed();emit()},
    advance(hours,completionId){now+=hours*H;if(completionId){const result=act(completionId,'uploadSuccess');expire();emit();return result;}expire();emit()},
    setConfig(delivery,claim){if(![delivery,claim].every(x=>/^\d+$/.test(String(x))&&Number(x)<=999))return error('请输入0—999之间的整数，0表示不限制');config={delivery:Number(delivery),claim:Number(claim)};emit();return {ok:true}},
    summary(){return [records.length,...['已回填','超时未交付','超时未领取','超时未回填'].map(s=>records.filter(r=>r.status===s).length)]}
  };
})();
