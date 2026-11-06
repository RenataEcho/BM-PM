/* FR-wen-004：仅内存示例，刷新后复位。 */
(()=>{'use strict';
const fields=['粉丝量','关注数','获赞数'];
const copy=x=>JSON.parse(JSON.stringify(x));
const now=()=>new Date().toLocaleString('sv-SE');
const account=(record,platform,nickname,id,values)=>({record,platform,nickname,id,values,url:'https://'+({'抖音':'www.douyin.com','快手':'www.kuaishou.com','小红书':'www.xiaohongshu.com','视频号':'channels.weixin.qq.com'}[platform])+'/user/'+id,time:'2026-11-04 10:20:00'});
const samples=()=>[account('A1','抖音','小夏读书','xiaxia',[999,80,2000]),account('A2','小红书','夏日书单','summer1000',[1000,100,3000]),account('A3','快手','零起步','zero',[0,0,0]),account('A4','视频号','林间阅读','forest',[3200,60,9000])];
function create(){
 const accounts=samples(),historical=account('A0','抖音','历史书单','history888',[1500,30,5000]);
 const history=accounts.map(a=>({...copy(a),uid:'100004',user:'小夏',status:'正常',addedAt:a.time}));
 history.push({...historical,uid:'100004',user:'小夏',status:'已删除',addedAt:'2026-11-03 09:00:00'}, {...copy(accounts[1]),record:'OTHER1',uid:'100009',user:'林同学',status:'正常',addedAt:'2026-11-05 12:00:00'});
 const rules=[{on:true,op:'≥',value:1000},{on:false,op:'≤',value:0},{on:false,op:'≥',value:0}];
 return {fields,version:1,user:{uid:'100004',nickname:'小夏'},rules,accounts,accountHistory:history,deletedTypes:[],claims:[{id:'R1001',bookId:'B0901',book:'往期书单稿件',user:'小夏',uid:'100004',account:copy(historical),status:'已回填',keyword:'我是1000题词16',fills:[{url:'https://www.douyin.com/video/73400001',author:'另一个作品账号',account:'27',platform:'抖音',status:'已回填',source:'领取回填',keyword:'我是1000题词16',time:'2026-11-04 11:00'}]},{id:'R1002',bookId:'B0902',book:'往期无门槛稿件',user:'小夏',uid:'100004',account:null,status:'领取成功',fills:[]},{id:'R1003',bookId:'B1003',book:'星河入梦',user:'小夏',account:copy(accounts[1]),status:'已超时',refunded:true,fills:[]}],sequence:20,publishedBooks:[],upload:{step:1,typeId:'',books:[{name:'晚风来信',id:'B1001',use:false,files:[]},{name:'山海之间',id:'B1002',use:false,files:[]}],locked:false},types:[{id:'short',name:'短剧解说',purpose:'上传必选、feed素材筛选',rules},{id:'story',name:'故事推文',purpose:'上传必选、feed素材筛选',rules:fields.map(()=>({on:false,op:'≥',value:0}))}],faults:{}};
}
const api={state:create(),reset(){this.state=create();},copy,now,account,accountSamples:samples,
 books(){const defaults=[{id:'B1001',name:'晚风来信',typeId:'short',use:true},{id:'B1002',name:'山海之间',typeId:'short',use:false,legacy:true},{id:'B1003',name:'星河入梦',typeId:'short',use:true},{id:'B1004',name:'春山可望',typeId:'short',use:false},{id:'B1005',name:'此间少年',typeId:'short',use:true},{id:'B1006',name:'月光书简',typeId:'short',use:true}];return defaults.concat(this.state.publishedBooks.filter(b=>b.publishStatus!=='已驳回'));},
 summary(r){const a=r.filter(x=>x.on);return a.length?a.map(x=>`${fields[r.indexOf(x)]} ${x.op} ${x.value}`).join('；'):'当前不限制';},
 failures(a,r){return r.flatMap((x,i)=>x.on&&!(x.op==='≥'?a.values[i]>=Number(x.value):a.values[i]<=Number(x.value))?[`${fields[i]}：记录值 ${a.values[i]}，要求 ${x.op} ${x.value}`]:[]);},
 consume(name){if(this.state.faults[name]){delete this.state.faults[name];return true;}return false;},
 addAccount(a){if(this.state.accounts.some(x=>x.platform===a.platform&&x.id===a.id))return false;const saved=copy(a);this.state.accounts.push(saved);this.state.accountHistory.unshift({...copy(saved),uid:this.state.user.uid,user:this.state.user.nickname,status:'正常',addedAt:now()});return true;},
 deleteAccount(record){this.state.accounts=this.state.accounts.filter(a=>a.record!==record);const row=this.state.accountHistory.find(a=>a.record===record&&a.uid===this.state.user.uid);if(row)row.status='已删除';},
 demoAccounts(list){const active=this.state.accounts;const prepared=list.map(a=>{const current=active.find(x=>x.platform===a.platform&&x.id===a.id);if(current)return copy(current);const used=this.state.accountHistory.some(x=>x.record===a.record&&x.uid===this.state.user.uid);return {...copy(a),record:used?'A'+(++this.state.sequence):a.record};});const records=new Set(prepared.map(a=>a.record));this.state.accountHistory.forEach(a=>{if(a.uid===this.state.user.uid&&a.status==='正常'&&!records.has(a.record))a.status='已删除';});this.state.accounts=prepared;prepared.forEach(a=>{if(!this.state.accountHistory.some(x=>x.record===a.record&&x.uid===this.state.user.uid))this.state.accountHistory.push({...copy(a),uid:this.state.user.uid,user:this.state.user.nickname,status:'正常',addedAt:now()});});},
 deleteType(id){this.state.types=this.state.types.filter(t=>t.id!==id);if(!this.state.deletedTypes.includes(id))this.state.deletedTypes.push(id);this.state.version++;},
 startClaim(book,a,rules){this.state.claims.forEach(r=>{if(r.status==='占用中'&&Date.now()>=r.expiresAt)this.expire(r);});const conflict=this.state.claims.find(r=>r.bookId===book.id&&['占用中','待关联关键词'].includes(r.status));if(conflict)return {error:'该稿件已有进行中的领取，请继续补关键词或等待释放'};const r={id:'R'+(++this.state.sequence),book:book.name,bookId:book.id,uid:this.state.user.uid,user:this.state.user.nickname,typeId:book.typeId,account:a?copy(a):null,rules:copy(rules),status:'待关联关键词',time:now(),fills:[],keyword:'',entry:book.entry||'站内'};this.state.claims.unshift(r);return {record:r};},
 reserve(r){if(r.status==='待关联关键词'){r.status='占用中';r.expiresAt=Date.now()+3600000;}return r;},
 expire(r){if(r.status==='占用中'){r.status='已超时';r.refunded=true;r.released=true;}return r;},
 associate(r,keyword){if(r.status==='占用中'&&Date.now()>=r.expiresAt)this.expire(r);if(!['待关联关键词','占用中'].includes(r.status))return false;r.keyword=keyword;r.status='领取成功';return true;},
 canDownload(r){return !!r&&['领取成功','已回填'].includes(r.status);}
};window.ClaimDemo=api;
})();
