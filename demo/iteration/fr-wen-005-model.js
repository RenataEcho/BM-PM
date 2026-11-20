/* FR-wen-005：静态演示，状态仅在内存中保留。 */
(function(){
'use strict';
if(window.parent!==window&&window.parent.FR005){window.FR005=window.parent.FR005;return;}
const H=3600000,stages=['待审核','已撤销','已拒绝','制作中','稿件审核中','待领取','已领取稿件'];
const terminal=s=>['已撤销','已拒绝','已领取稿件'].includes(s);
const messages={accept:'你的定向约稿申请已通过，剪辑手将为你制作稿件。',ready:'你的定向稿件已审核通过，稿件待领取，请前往约稿记录免费领取。'};
const editors=[{name:'小陈',id:'100099',projects:['番茄小说','知乎故事']},{name:'阿禾剪辑',id:'100102',projects:['红果短剧','番茄小说']}],projects=['番茄小说','知乎故事','红果短剧'];
let now,records,claims,notifications,sequence;const listeners=new Set(),emit=()=>listeners.forEach(fn=>fn()),error=error=>({ok:false,error});
const get=id=>records.find(r=>r.id===id),getClaim=id=>claims.find(c=>c.id===id);
const makeManuscript=r=>({id:'M'+r.id.slice(1),title:r.book+' · 定向成片',book:r.book,bookId:r.bookId,bookUrl:r.bookUrl,keyword:r.keyword,project:r.project,mode:'任务协作',kind:'视频',material:'解说混剪',fills:0,directory:'成片.mp4',uploaded:now,status:'审核中',platform:'右豹'});
function newClaim(r,id,status){return {id,recordId:r.id,sourceId:r.sourceId,user:r.user,userId:r.userId,project:r.project,book:r.book,bookId:r.bookId,bookUrl:r.bookUrl,editor:r.editor,editorId:r.editorId,keyword:r.keyword,status,claimedAt:now,fillDue:now+24*H,userIncome:0,editorIncome:0};}
function seed(){
 now=Date.now();sequence=5200;notifications=[];editors.forEach(e=>Object.assign(e,{enabled:true,platforms:['右豹']}));
 claims=['已回填','已回填','待回填','超时未回填'].map((status,i)=>({id:'C'+(4000+i),user:'小林',userId:'200861',project:'番茄小说',book:i%2?'星河入梦':'长安有故人',bookId:'BK'+(8200+i%2),bookUrl:'https://example.com/book/'+(8200+i%2),editor:'小陈',editorId:'100099',keyword:i%2?'星河入梦':'长安故事',status,claimedAt:now-2*H,fillDue:now+(status==='超时未回填'?-1:22)*H,userIncome:status==='已回填'?186.8+i*60:0,editorIncome:status==='已回填'?80.06+i*25:0,filledAt:status==='已回填'?now-H:undefined}));
 const samples=[[5100,'待审核'],[5101,'已撤销'],[5102,'已拒绝'],[5103,'制作中'],[5104,'稿件审核中'],[5106,'待领取'],[5108,'待回填'],[5109,'已回填'],[5110,'超时未回填']];
 records=samples.map(([id,status],i)=>{const source=claims[i%2],r={...source,id:'A'+id,sourceId:source.id,status,created:now-(i+1)*H,note:'希望延续原稿叙事风格。',material:'解说混剪',received:['待回填','已回填','超时未回填'].includes(status),available:status!=='稿件审核中',rejectReason:status==='已拒绝'?'当前档期已满，暂时无法承接。':'',rejected:false,upload:null};delete r.filledAt;
 if(['稿件审核中','待领取','待回填','已回填','超时未回填'].includes(status)){r.manuscript=makeManuscript(r);r.manuscript.status=status==='稿件审核中'?'审核中':'已通过';}
 if(r.received){const c=newClaim(r,'C'+id,status);claims.push(c);r.claimId=c.id;if(status==='已回填'){c.filledAt=now-H;c.publishUrl='https://example.com/post/demo';r.manuscript.fills=1;}if(status==='超时未回填')c.fillDue=now-H;r.fillDue=c.fillDue;}
 if(r.received)r.status='已领取稿件';
 return r;});
 records.push({...records.find(r=>r.id==='A5103'),id:'A5117',permissionLost:true});
 notifications=[{id:'N1',record:'A5103',text:messages.accept,time:now-H},{id:'N2',record:'A5106',text:messages.ready,time:now-H/2}];
}
function expire(){claims.forEach(c=>{if(c.status==='待回填'&&now>=c.fillDue){c.status='超时未回填';}});}
function notify(r,type){notifications.unshift({id:'N'+sequence++,record:r.id,text:messages[type],time:now});}
function submit(form){
 const c=getClaim(form.sourceId);if(!c||c.userId!=='200861'||c.status!=='已回填')return error('仅可从本人已回填稿件发起约稿');
 const editor=editors.find(e=>e.id===c.editorId);if(!editor?.enabled||!editor.projects.includes(c.project))return error('原剪辑手暂不能承接当前项目，请稍后重试');
 const r={id:'A'+sequence++,sourceId:c.id,user:c.user,userId:c.userId,editor:c.editor,editorId:c.editorId,project:c.project,book:c.book,bookId:c.bookId,bookUrl:c.bookUrl,keyword:c.keyword,userIncome:c.userIncome,editorIncome:c.editorIncome,note:String(form.note||'').trim(),created:now,status:'待审核',received:false};records.unshift(r);emit();return {ok:true,record:r};
}
function act(id,action,payload={}){
 expire();const r=get(id);if(!r)return error('记录无法读取，请返回重试');
 if(action==='fill'){const c=getClaim(r.claimId);if(!c||c.status!=='待回填')return error('当前不可回填');if(!payload.url?.trim())return error('请填写发布链接');Object.assign(c,{status:'已回填',filledAt:now,publishUrl:payload.url.trim()});r.manuscript.fills=1;emit();return {ok:true};}
 if(terminal(r.status))return error('当前申请为「'+r.status+'」，不能继续此操作');
 if(['accept','reject','revoke'].includes(action)){
  if(r.status!=='待审核')return error('申请状态已更新，接受后不可取消');
  if(action==='reject'&&!payload.reason?.trim())return error('请填写拒绝原因');
  r.status=action==='accept'?'制作中':action==='reject'?'已拒绝':'已撤销';if(action==='accept')notify(r,'accept');if(action==='reject')r.rejectReason=payload.reason.trim();
 }else if(action==='uploadStart'){
  if(r.status!=='制作中'||r.upload)return error('当前不能发起新的上传');if(r.permissionLost)return error('请联系客服开启项目权限后再上传');r.uploadError='';r.upload={started:now,progress:32,metadata:{...payload}};
 }else if(action==='uploadSuccess'){
  if(r.status!=='制作中'||!r.upload)return error('当前没有进行中的上传');const metadata=r.upload.metadata;r.manuscript ||= makeManuscript(r);Object.assign(r.manuscript,{status:'审核中',uploaded:now,platform:'右豹',keyword:r.keyword,mode:metadata.mode||'任务协作',kind:metadata.kind||'视频',material:metadata.material||'解说混剪',title:metadata.title||r.manuscript.title,directory:metadata.file||'成片.mp4',publishTips:metadata.tips||'',bookType:metadata.bookType||'',editorReminder:metadata.reminder||'',cover:metadata.cover||''});r.status='稿件审核中';r.upload=null;r.available=false;
 }else if(['uploadFail','uploadCancel'].includes(action)){
  if(r.status!=='制作中'||!r.upload)return error('当前没有进行中的上传');r.upload=null;r.uploadError=action==='uploadFail'?'上传失败，可重试。':'本次上传已取消，可重试。';
 }else if(action==='auditReject'){
  if(r.status!=='稿件审核中'||r.manuscript?.status!=='审核中')return error('稿件已处理，请刷新');r.status='制作中';r.rejected=true;r.manuscript.status='已驳回';
 }else if(action==='auditPass'){
  if(r.status!=='稿件审核中'||r.manuscript?.status!=='审核中')return error('稿件已处理，请刷新');r.manuscript.status='已通过';r.available=true;r.status='待领取';notify(r,'ready');
 }else if(action==='claim'){
  if(payload.userId&&payload.userId!==r.userId)return error('仅申请用户可领取该定向稿件');
  if(r.received||r.status!=='待领取'||!r.available||r.manuscript?.status!=='已通过')return error('当前暂不可领取，请查看后续进度');
  r.manuscript.keyword=r.keyword;r.received=true;r.status='已领取稿件';r.receivedAt=now;const c=newClaim(r,'C'+sequence++,'待回填');r.claimId=c.id;claims.unshift(c);
 }else return error('当前操作不可用');emit();return {ok:true};
}
function deadline(r){return ({'待审核':'等待剪辑手审核','制作中':'剪辑手制作中，接受后不可取消','稿件审核中':'稿件已上传，正在等待后台审核，暂不可领取','待领取':'稿件已通过审核，可免费领取','已领取稿件':'稿件已领取，本次约稿已结束；发布回填请前往已领查看','已回填':'已完成回填','超时未回填':'沿用既有超时处理，已领取稿件保留'})[r.status]||(r.status==='待回填'?'回填截止 '+format(r.fillDue)+'（领取后24小时）':'申请已结束');}
function format(t){return t?new Date(t).toLocaleString('zh-CN',{hour12:false}).replaceAll('/','-'):'—';}
seed();window.FR005={stages,terminal,editors,projects,messages,H,get records(){return records},get claims(){return claims},get now(){return now},get notifications(){return notifications},get,getClaim,submit,act,deadline,format,subscribe(fn){listeners.add(fn);return()=>listeners.delete(fn)},reset(){seed();emit()},advance(hours){now+=hours*H;expire();emit()}};
})();
