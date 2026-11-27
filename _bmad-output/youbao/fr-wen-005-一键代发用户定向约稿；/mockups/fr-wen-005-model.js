/* FR-wen-005：静态演示，状态仅在内存中保留。 */
(function(){
'use strict';
if(window.parent!==window&&window.parent.FR005){window.FR005=window.parent.FR005;return;}
const H=3600000,stages=['待审核','已撤销','已拒绝','制作中','稿件审核中','待领取','已领取稿件'];
const terminal=s=>['已撤销','已拒绝','已领取稿件'].includes(s);
const messages={accept:'你的定向约稿申请已通过，剪辑手将为你制作稿件。',ready:'你的定向约稿稿件已审核通过，稿件待领取，请前往约稿记录领取。'};
const editors=[{name:'小陈',id:'100099',projects:['番茄小说','知乎故事']},{name:'阿禾剪辑',id:'100102',projects:['红果短剧','番茄小说']},{name:'苏晚',id:'100103',projects:['番茄小说']},{name:'陈予',id:'100104',projects:['番茄小说']}],projects=['番茄小说','知乎故事','红果短剧'];
const feeRules=Object.freeze({'周凯':Object.freeze({charge:'platform',share:'50%'}),'小陈':Object.freeze({charge:'platform',share:'50%'}),'苏晚':Object.freeze({charge:'custom',cost:30,share:'35%'}),'陈予':Object.freeze({charge:'custom',cost:50,share:'40%'})});
const countSkus=Object.freeze([Object.freeze({times:1,points:100}),Object.freeze({times:5,points:400})]);
let wallet,now,records,claims,notifications,sequence;const listeners=new Set(),emit=()=>listeners.forEach(fn=>fn()),error=error=>({ok:false,error});
const get=id=>records.find(r=>r.id===id),getClaim=id=>claims.find(c=>c.id===id);
const makeManuscript=r=>({id:'M'+r.id.slice(1),title:r.book+' · 定向成片',book:r.book,bookId:r.bookId,bookUrl:r.bookUrl,keyword:r.keyword,project:r.project,mode:'任务协作',kind:'视频',material:'解说混剪',fills:0,directory:'成片.mp4',uploaded:now,status:'审核中',platform:'右豹'});
const sameKeyword=(a,b)=>!!a&&!!b&&['userId','project','bookId','keyword'].every(k=>a[k]===b[k]);
const keywordIncome=(c,role='userIncome')=>claims.filter(x=>sameKeyword(x,c)).reduce((n,x)=>n+Number(x[role]||0),0);
const keywordFills=c=>claims.filter(x=>sameKeyword(x,c)).flatMap(x=>x.fills||[]);
const keywordRecords=id=>records.filter(r=>sameKeyword(r,getClaim(id))).sort((a,b)=>b.created-a.created);
function keywordManuscripts(id){const c=getClaim(id);if(!c)return [];return [{id:c.id,title:c.book+' · 原稿',kind:'视频',material:'解说混剪',received:true,due:c.downloadDue,sourceId:c.id},...keywordRecords(id).filter(r=>r.manuscript?.status==='已通过'&&(r.received||r.available)).map(r=>({id:r.id,title:r.manuscript.title,kind:r.manuscript.kind,material:r.manuscript.material,received:r.received,due:r.manuscript.downloadDue,sourceId:r.sourceId}))];}
function download(id){const c=getClaim(id),r=get(id),due=c?.downloadDue||r?.manuscript?.downloadDue;if(!c&&(!r?.received||r.manuscript?.status!=='已通过'))return error('请先领取稿件');if(!due||now>=due)return error('下载已失效');(c||r.manuscript).downloadedAt=now;emit();return {ok:true};}
function fillClaim(id,url){const c=getClaim(id);if(!c||!['待回填','已回填'].includes(c.status))return error('当前不可回填');if(!String(url||'').trim())return error('请填写发布链接');c.fills ||= [];c.fills.push({url:String(url).trim(),time:now});Object.assign(c,{status:'已回填',filledAt:now,publishUrl:String(url).trim()});emit();return {ok:true};}
function seed(){
 wallet={quotaLeft:1,points:80};now=Date.now();sequence=5200;notifications=[];editors.forEach(e=>Object.assign(e,{enabled:true,platforms:['右豹']}));
 claims=['已回填','已回填','待回填','超时未回填'].map((status,i)=>({id:'C'+(4000+i),user:'小林',userId:'200861',project:'番茄小说',book:i%2?'星河入梦':'长安有故人',bookId:'BK'+(8200+i%2),bookUrl:'https://example.com/book/'+(8200+i%2),editor:'小陈',editorId:'100099',keyword:i%2?'星河入梦':'长安故事',status,claimedAt:now-2*H,fillDue:now+(status==='超时未回填'?-1:22)*H,downloadDue:now+71*H,userIncome:status==='已回填'?186.8+i*60:0,editorIncome:status==='已回填'?80.06+i*25:0,filledAt:status==='已回填'?now-H:undefined}));
 claims.push({...claims[0],id:'C4004',book:'春日来信',bookId:'BK8202',bookUrl:'https://example.com/book/8202',keyword:'春日来信',claimedAt:now-5*H,downloadDue:now+71*H,userIncome:68.5,editorIncome:29.36});
 claims.push(...[['C4010','苏晚','100103','春日来信','BK8202','春日书单'],['C4011','陈予','100104','星河入梦','BK8201','星河书单']].map(([id,editor,editorId,book,bookId,keyword])=>({...claims[0],id,editor,editorId,book,bookId,keyword,bookUrl:'https://example.com/book/'+bookId})));
 claims.forEach(c=>{c.fills=c.status==='已回填'?[{url:'https://example.com/post/demo',time:c.filledAt}]:[];});
 const samples=[[5100,'待审核'],[5101,'已撤销'],[5102,'已拒绝'],[5103,'制作中'],[5104,'稿件审核中'],[5106,'待领取'],[5108,'待回填'],[5109,'已回填'],[5110,'超时未回填']];
 records=samples.map(([id,status],i)=>{const source=claims[i%2],r={...source,id:'A'+id,sourceId:source.id,status,created:now-(i+1)*H,note:'希望延续原稿叙事风格。',material:'解说混剪',received:['待回填','已回填','超时未回填'].includes(status),available:status!=='稿件审核中',rejectReason:status==='已拒绝'?'当前档期已满，暂时无法承接。':'',rejected:false,upload:null};delete r.filledAt;
 if(['稿件审核中','待领取','待回填','已回填','超时未回填'].includes(status)){r.manuscript=makeManuscript(r);r.manuscript.status=status==='稿件审核中'?'审核中':'已通过';}
 if(r.received){r.claimId=source.id;r.receivedAt=now-H;r.manuscript.downloadDue=id===5110?now-H:now+71*H;}
 if(r.received)r.status='已领取稿件';
 return r;});
 records.push({...records.find(r=>r.id==='A5103'),id:'A5117',permissionLost:true});
 [['A5120','C4010'],['A5121','C4011'],['A5122','C4011']].forEach(([id,sourceId])=>{const c=getClaim(sourceId),r={...c,id,sourceId,status:'待领取',created:now-H,note:'延续原稿风格制作下一篇成片。',received:false,available:true};r.manuscript=makeManuscript(r);r.manuscript.status='已通过';records.push(r);});
 notifications=[{id:'N1',record:'A5103',text:messages.accept,time:now-H},{id:'N2',record:'A5106',text:messages.ready,time:now-H/2},...['A5120','A5121','A5122'].map((id,i)=>({id:'N'+(i+3),record:id,text:messages.ready,time:now-H/3}))];
}
function expire(){claims.forEach(c=>{if(c.status==='待回填'&&now>=c.fillDue){c.status='超时未回填';}});}
function notify(r,type){notifications.unshift({id:'N'+sequence++,record:r.id,text:messages[type],time:now});}
function submit(form){
 const c=getClaim(form.sourceId);if(!c||c.userId!=='200861'||c.status!=='已回填')return error('仅可从本人已回填稿件发起约稿');
 const editor=editors.find(e=>e.id===c.editorId);if(!editor?.enabled||!editor.projects.includes(c.project))return error('原剪辑手暂不能承接当前项目，请稍后重试');
 const r={id:'A'+sequence++,sourceId:c.id,user:c.user,userId:c.userId,editor:c.editor,editorId:c.editorId,project:c.project,book:c.book,bookId:c.bookId,bookUrl:c.bookUrl,keyword:c.keyword,userIncome:c.userIncome,editorIncome:c.editorIncome,note:String(form.note||'').trim(),created:now,status:'待审核',received:false};records.unshift(r);emit();return {ok:true,record:r};
}
function claimQuote(id,userId='200861'){
 const r=get(id);if(!r)return error('记录无法读取，请返回重试');
 if(userId!==r.userId)return error('仅申请用户可领取该定向稿件');
 if(r.received||r.status!=='待领取'||!r.available||r.manuscript?.status!=='已通过')return error('当前暂不可领取，请查看后续进度');
 const rule=feeRules[r.editor]||{charge:'platform'};
 return {ok:true,charge:wallet.quotaLeft>=1?'quota':rule.charge,cost:wallet.quotaLeft>=1?1:rule.cost||0,points:wallet.points,quotaLeft:wallet.quotaLeft};
}
function exchange(index){const sku=countSkus[index];if(!sku)return error('兑换档位不可用');if(wallet.points<sku.points)return error('积分不足');wallet.points-=sku.points;wallet.quotaLeft+=sku.times;emit();return {ok:true};}
function act(id,action,payload={}){
 expire();const r=get(id);if(!r)return error('记录无法读取，请返回重试');
 if(action==='fill'){if(!r.received)return error('请先领取稿件');return fillClaim(r.sourceId,payload.url);}
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
  const quote=claimQuote(id,payload.userId||'200861');if(!quote.ok)return quote;
  if(quote.charge==='platform')return error('请先按平台档位兑换领取次数');
  if(quote.charge==='custom'&&wallet.points<quote.cost)return error('积分不足');
  if(quote.charge==='custom'&&payload.confirmed!==true)return error('请先确认配置积分价格');
  if(quote.charge==='quota')wallet.quotaLeft-=1;else wallet.points-=quote.cost;
  r.manuscript.keyword=r.keyword;r.received=true;r.status='已领取稿件';r.receivedAt=now;r.manuscript.downloadDue=now+72*H;r.claimId=r.sourceId;
 }else return error('当前操作不可用');emit();return {ok:true};
}
function deadline(r){return ({'待审核':'等待剪辑手审核','制作中':'剪辑手制作中，接受后不可取消','稿件审核中':'稿件已上传，正在等待后台审核，暂不可领取','待领取':'稿件已通过审核，按剪辑手现有收费方式领取','已领取稿件':'稿件已领取，本次约稿已结束；请在已领的当前关键词追加回填','已回填':'已完成回填','超时未回填':'沿用既有超时处理，已领取稿件保留'})[r.status]||(r.status==='待回填'?'回填截止 '+format(r.fillDue)+'（领取后24小时）':'申请已结束');}
function format(t){return t?new Date(t).toLocaleString('zh-CN',{hour12:false}).replaceAll('/','-'):'—';}
seed();window.FR005={feeRules,countSkus,get wallet(){return wallet},claimQuote,exchange,stages,terminal,editors,projects,messages,H,get records(){return records},get claims(){return claims},get now(){return now},get notifications(){return notifications},get,getClaim,sameKeyword,keywordIncome,keywordFills,keywordRecords,keywordManuscripts,download,fillClaim,submit,act,deadline,format,subscribe(fn){listeners.add(fn);return()=>listeners.delete(fn)},reset(){seed();emit()},advance(hours){now+=hours*H;expire();emit()}};
})();
