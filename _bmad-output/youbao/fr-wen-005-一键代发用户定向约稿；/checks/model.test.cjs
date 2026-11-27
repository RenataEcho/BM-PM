const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict');
const window={};window.parent=window;vm.runInNewContext(fs.readFileSync(path.resolve(__dirname,'../../../../demo/iteration/fr-wen-005-model.js'),'utf8'),{window});const M=window.FR005;
let checks=0;function test(name,fn){M.reset();fn();console.log('通过：'+name);checks++;}
const submit=()=>M.submit({sourceId:'C4000',note:'延续原风格',project:'被篡改',book:'假书',keyword:'假词',editorId:'bad'}).record;
const ready=r=>{assert(M.act(r.id,'accept').ok);assert(M.act(r.id,'uploadStart',{title:'新成片',file:'test.mp4',keywords:'假词'}).ok);assert(M.act(r.id,'uploadSuccess').ok);assert(M.act(r.id,'auditPass').ok)};
test('仅本人已回填来源，提交继承字段不可篡改',()=>{assert(!M.submit({sourceId:'C4002'}).ok);assert(!M.submit({sourceId:'missing'}).ok);const r=submit(),c=M.getClaim('C4000');for(const k of ['project','book','bookId','bookUrl','keyword','editorId'])assert.equal(r[k],c[k]);assert.equal(r.note,'延续原风格')});
test('撤销与通过状态互斥，拒绝原因必填且不通知',()=>{const r=submit();assert(!M.act(r.id,'reject').ok);assert(M.act(r.id,'revoke').ok);assert(!M.act(r.id,'accept').ok);const n=M.notifications.length,r2=submit();assert(M.act(r2.id,'reject',{reason:'档期满'}).ok);assert.equal(M.notifications.length,n)});
test('无交付或领取失效；仅两个通知节点',()=>{const r=submit(),n=M.notifications.length;M.act(r.id,'accept');M.advance(10000);assert.equal(r.status,'制作中');M.act(r.id,'uploadStart');M.advance(10000);assert(M.act(r.id,'uploadSuccess').ok);assert.equal(M.notifications.length,n+1);assert.equal(r.manuscript.platform,'右豹');M.act(r.id,'auditPass');assert.equal(M.notifications.length,n+2);assert(!M.act(r.id,'auditPass').ok);M.advance(10000);assert.equal(r.status,'待领取');assert(!M.stages.includes('超时未交付'));assert(!M.stages.includes('超时未领取'));assert(!('config' in M))});
test('领取权限与幂等：扣1次、不新增记录、不重置原记录',()=>{
 const r=submit(),source=M.getClaim('C4000');source.publishUrl='old-url';ready(r);
 const count=M.claims.length,due=source.fillDue,fills=source.fills.length;
 assert(!M.act(r.id,'claim',{userId:'other'}).ok);assert.equal(M.wallet.quotaLeft,1);
 assert(M.act(r.id,'claim',{keyword:'假词',cost:0}).ok);assert.equal(M.wallet.quotaLeft,0);assert.equal(M.wallet.points,80);
 assert.equal(M.claims.length,count);assert.equal(r.claimId,source.id);assert.equal(r.status,'已领取稿件');assert.equal(r.manuscript.keyword,source.keyword);
 assert.equal(source.status,'已回填');assert.equal(source.publishUrl,'old-url');assert.equal(source.fillDue,due);assert.equal(source.fills.length,fills);
 assert(!M.act(r.id,'claim').ok);assert.equal(M.wallet.quotaLeft,0);assert.equal(M.claims.length,count);
 assert.equal(r.manuscript.downloadDue-M.now,72*M.H);
});
test('追加回填沿用原关键词，无新回填期限；下载72小时失效',()=>{
 const r=submit();ready(r);M.act(r.id,'claim');const source=M.getClaim('C4000'),count=M.claims.length,due=source.fillDue;
 assert(!M.act(r.id,'fill',{url:''}).ok);M.advance(25);assert(M.act(r.id,'fill',{url:'https://example.com/new'}).ok);
 assert.equal(source.publishUrl,'https://example.com/new');assert.equal(source.status,'已回填');assert.equal(r.status,'已领取稿件');assert.equal(source.fillDue,due);assert.equal(M.claims.length,count);
 assert(M.download(r.id).ok);M.advance(47);assert(!M.download(r.id).ok);
});
test('自定义收费有次数时仍优先扣1次，不扣积分',()=>{
 const r=M.get('A5106');r.editor='陈予';assert(M.act(r.id,'claim').ok);assert.equal(M.wallet.quotaLeft,0);assert.equal(M.wallet.points,80);
});
test('自定义30/50积分：先确认，不信任调用方价格，取消不扣',()=>{
 for(const [name,cost]of [['苏晚',30],['陈予',50]]){
  M.reset();M.wallet.quotaLeft=0;const r=M.get('A5106');r.editor=name;
  const q=M.claimQuote(r.id);assert.equal(q.cost,cost);assert.equal(q.charge,'custom');assert.equal(M.wallet.points,80);
  assert(!M.act(r.id,'claim',{cost:0}).ok);assert.equal(M.wallet.points,80);assert.equal(r.status,'待领取');
  assert(M.act(r.id,'claim',{confirmed:true,cost:1}).ok);assert.equal(M.wallet.points,80-cost);assert(!M.act(r.id,'claim',{confirmed:true}).ok);assert.equal(M.wallet.points,80-cost);
 }
});
test('平台计费：现有100/400积分兑换档位，兑换后再扣1次',()=>{
 M.wallet.quotaLeft=0;M.wallet.points=500;const r=M.get('A5106');assert.equal(M.claimQuote(r.id).charge,'platform');
 assert(!M.act(r.id,'claim',{confirmed:true,cost:0}).ok);assert.equal(M.wallet.points,500);
 assert(M.exchange(1).ok);assert.equal(M.wallet.points,100);assert.equal(M.wallet.quotaLeft,5);
 assert(M.act(r.id,'claim').ok);assert.equal(M.wallet.quotaLeft,4);assert.equal(M.wallet.points,100);
 assert(M.exchange(0).ok);assert.equal(M.wallet.points,0);assert.equal(M.wallet.quotaLeft,5);assert(!M.exchange(-1).ok);
});
test('积分不足、非本人、审核中、已领取均不扣减或改变申请',()=>{
 M.wallet.quotaLeft=0;M.wallet.points=10;const r=M.get('A5106');r.editor='苏晚';const before=JSON.stringify(r);
 assert(!M.act(r.id,'claim',{confirmed:true}).ok);assert.equal(M.wallet.points,10);assert.equal(JSON.stringify(r),before);
 assert(!M.exchange(0).ok);assert.equal(M.wallet.quotaLeft,0);assert.equal(M.wallet.points,10);
 M.wallet.quotaLeft=1;const snapshot=JSON.stringify(M.wallet);
 for(const id of ['A5104','A5108'])assert(!M.act(id,'claim',{confirmed:true}).ok);
 r.userId='other';assert(!M.act(r.id,'claim').ok);assert.equal(JSON.stringify(M.wallet),snapshot);
});
test('同一共享余额被广场消耗后，约稿按剩余次数与积分重新校验',()=>{
 const shared=M.wallet;shared.quotaLeft-=1;const r=M.get('A5106');assert(!M.act(r.id,'claim').ok);assert.equal(shared.points,80);
 shared.points+=100;assert(M.exchange(0).ok);assert(M.act(r.id,'claim').ok);assert.equal(shared.quotaLeft,0);assert.equal(shared.points,80);
 M.reset();assert.equal(M.wallet.quotaLeft,1);assert.equal(M.wallet.points,80);
});
test('上传取消失败可重试，驳回重送审同一ID及权限阻断',()=>{const r=submit();M.act(r.id,'accept');M.act(r.id,'uploadStart');assert(M.act(r.id,'uploadFail').ok);assert.equal(r.manuscript,undefined);M.act(r.id,'uploadStart');assert(M.act(r.id,'uploadCancel').ok);M.act(r.id,'uploadStart');M.act(r.id,'uploadSuccess');const id=r.manuscript.id;M.act(r.id,'auditReject');M.act(r.id,'uploadStart');M.act(r.id,'uploadSuccess');assert.equal(r.manuscript.id,id);assert(!M.act('A5117','uploadStart').ok)});
test('约稿状态集合与领取记录分离',()=>{for(const status of ['待回填','已回填','超时未回填'])assert(!M.stages.includes(status));assert(M.stages.includes('已领取稿件'));assert(M.records.every(r=>M.stages.includes(r.status)));assert(M.terminal('已领取稿件'));assert.equal(M.get('A5108').status,'已领取稿件');assert.equal(M.getClaim(M.get('A5108').claimId).status,'已回填')});
console.log(checks+'组业务测试通过');
