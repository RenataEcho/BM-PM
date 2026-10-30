/* FR-wen-003：纯内存示例模型，不请求接口、不持久化。 */
(function (root) {
  'use strict';
  const variables = ['留言对象昵称', '团长昵称', '团长联系电话', '团长联系方式'];
  const clone = value => JSON.parse(JSON.stringify(value));
  const bj = value => new Intl.DateTimeFormat('sv-SE', {timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(new Date(value));
  const qr = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160"><rect width="160" height="160" fill="white"/><g fill="#252836"><path d="M12 12h42v42H12zm94 0h42v42h-42zM12 106h42v42H12z"/><path d="M64 12h14v14H64zm14 14h14v28H78zM64 64h14v14H64zm28 0h14v28H92zm28 0h28v14h-28zM64 92h14v42H64zm28 14h14v42H92zm28-14h14v14h-14zm0 28h28v14h-28zm14 14h14v14h-14zM12 64h14v14H12zm14 14h28v14H26z"/></g><g fill="white"><path d="M20 20h26v26H20zm94 0h26v26h-26zM20 114h26v26H20z"/></g><g fill="#252836"><path d="M26 26h14v14H26zm94 0h14v14h-14zM26 120h14v14H26z"/></g></svg>');
  class MessageDemo {
    constructor() { this.reset(); }
    reset() {
      this.leader = {id:'1008601',name:'团长小周',phone:'138 0013 8000',wechat:'youbao_zhou',qr};
      this.members = [
        {id:'3895034',name:'雪糕冷呀',relation:'间属成员',level:'V1',avatar:'🍦',joined:'2026.10.09 18:06:36'},
        {id:'3785217',name:'一脚踹飞28个良子',relation:'直属成员',level:'V2',avatar:'🦁',joined:'2026.07.31 20:13:40'},
        {id:'3725244',name:'用户7699649',relation:'直属团队长',level:'V1',avatar:'🐯',joined:'2026.07.04 08:20:29'},
        {id:'1895334',name:'越-威林测试号',relation:'间属团队长',level:'V2',avatar:'🐻',joined:'2026.06.21 13:32:10'}
      ];
      this.whitelist = [{id:this.leader.id,name:this.leader.name,enabled:true,opened:'2026-10-30 09:00:00',operator:'coco',updated:'2026-10-30 09:00:00',note:'运营开白'}];
      this.templates = [
        {id:'T001',name:'团队协作提醒',body:'{留言对象昵称}，你好！我是{团长昵称}。\n近期有新的推广任务，欢迎联系我了解。\n联系电话：{团长联系电话}\n{团长联系方式}',enabled:true,creator:'coco',created:'2026-10-30 09:10:00',updater:'coco',updated:'2026-10-30 09:10:00'},
        {id:'T002',name:'新成员欢迎',body:'欢迎你，{留言对象昵称}！\n我是{团长昵称}，很高兴与你一起成长。\n有任何问题都可以联系我。\n{团长联系方式}',enabled:true,creator:'coco',created:'2026-10-30 09:12:00',updater:'coco',updated:'2026-10-30 09:12:00'},
        {id:'T003',name:'活动提醒',body:'{留言对象昵称}，记得查看最新活动规则。\n你的团长：{团长昵称}',enabled:false,creator:'coco',created:'2026-10-30 09:15:00',updater:'coco',updated:'2026-10-30 09:15:00'}
      ];
      this.rules = [
        {key:'total',name:'每位团长每日发送总上限',enabled:true,value:100,unit:'条／日',scope:'同一团长全部对象',window:'北京时间自然日，每日 00:00 重置'},
        {key:'target',name:'每位团长对同一下级每日发送上限',enabled:true,value:3,unit:'条／日',scope:'同一团长 + 同一下级',window:'北京时间自然日，每日 00:00 重置'},
        {key:'interval',name:'两次成功发送的最小间隔',enabled:true,value:3,unit:'秒',scope:'同一团长，跨留言对象',window:'自最近一次成功发送计时，跨日连续'},
        {key:'repeat',name:'相同内容限制时长',enabled:true,value:24,unit:'小时',scope:'同一团长 + 同一下级 + 相同实际内容',window:'自最近一次相同内容成功发送滚动计算'}
      ];
      this.updated='2026-10-30 09:20:00'; this.records=[]; this.operations={}; this.pending={}; this.scenario='members'; this.recipientId='3785217';
      const template=this.templates[0], member=this.members[1];
      const content=this.content(template.id,member.id);
      const seedTime=Date.now()-86400000*2,failedTime=Date.now()-86400000;
      this.seedNotification={id:'N0001',target:member.id,title:'团长留言',...content,time:bj(seedTime),read:false};
      this.notifications=[clone(this.seedNotification)];
      this.records.push({id:'R0001',operation:'seed',leaderId:this.leader.id,leaderName:this.leader.name,targetId:member.id,targetName:member.name,relation:member.relation,templateId:template.id,templateName:template.name,templateBody:template.body,...content,status:'成功',time:bj(seedTime),reason:'',timestamp:seedTime});
      this.records.push({...clone(this.records[0]),...this.content(template.id,this.members[2].id),id:'R0002',operation:'seed-failure',targetId:this.members[2].id,targetName:this.members[2].name,relation:this.members[2].relation,status:'失败',time:bj(failedTime),reason:'站内通知生成失败',timestamp:failedTime});
    }
    get state() { return clone({leader:this.leader,members:this.members,whitelist:this.whitelist,templates:this.templates,rules:this.rules,records:this.records,notifications:this.notifications,updated:this.updated,scenario:this.scenario,recipientId:this.recipientId}); }
    apply(data) { ['leader','members','whitelist','templates','rules','records','notifications','updated','scenario','recipientId'].forEach(k=>{if(k in data)this[k]=clone(data[k]);}); }
    content(templateId,targetId) {
      const t=this.templates.find(x=>x.id===templateId), m=this.members.find(x=>x.id===targetId);
      if(!t || !m)return {text:'',image:'',fingerprint:''};
      const missing=this.scenario==='missing', contact=!missing&&this.leader.wechat;
      const map={'留言对象昵称':m.name||'','团长昵称':this.leader.name||'','团长联系电话':missing?'':this.leader.phone||'','团长联系方式':contact?'微信号：'+this.leader.wechat:''};
      const text=t.body.replace(/\{([^{}]+)\}/g,(_,v)=>map[v]||'');
      const image=t.body.includes('{团长联系方式}')&&contact?this.leader.qr:'';
      return {text,image,fingerprint:JSON.stringify([text,image])};
    }
    canMessage(member) { return !!this.whitelist.find(x=>x.id===this.leader.id&&x.enabled)&&member.relation.startsWith('直属')&&this.scenario!=='unlisted'; }
    preview(templateId,targetId) { return this.content(templateId,targetId); }
    limitError(targetId,content) {
      const now=Date.now(),day=bj(now).slice(0,10),successful=this.records.filter(x=>x.status==='成功'&&x.leaderId===this.leader.id);
      const today=successful.filter(x=>bj(x.timestamp).slice(0,10)===day),get=k=>this.rules.find(x=>x.key===k);
      if(get('total').enabled&&(today.length>=get('total').value||this.scenario==='limit-total'))return '今日留言次数已达上限，请明日再试';
      if(get('target').enabled&&(today.filter(x=>x.targetId===targetId).length>=get('target').value||this.scenario==='limit-target'))return '今日给该下级的留言次数已达上限，请明日再试';
      const last=successful.reduce((n,x)=>Math.max(n,x.timestamp),0),left=Math.ceil((last+get('interval').value*1000-now)/1000);
      if(get('interval').enabled&&(left>0||this.scenario==='limit-interval'))return '操作过于频繁，请在 '+(left>0?left:3)+' 秒后重试';
      const duplicate=successful.filter(x=>x.targetId===targetId&&x.fingerprint===content.fingerprint).sort((a,b)=>b.timestamp-a.timestamp)[0];
      if(get('repeat').enabled&&((duplicate&&now<duplicate.timestamp+get('repeat').value*3600000)||this.scenario==='limit-repeat'))return '已向该下级发送过相同内容，请在 '+bj(duplicate?duplicate.timestamp+get('repeat').value*3600000:now+86400000)+'（北京时间）后重试';
      return '';
    }
    send(request) {
      const {id,templateId,targetId,fingerprint}=request;
      if(this.operations[id])return clone(this.operations[id]);
      if(this.pending[id])return {status:'unknown',message:'正在核实发送结果，请勿重复发送'};
      const member=this.members.find(x=>x.id===targetId), template=this.templates.find(x=>x.id===templateId);
      const block=message=>({status:'blocked',message});
      if(this.scenario==='permission-changed'||this.scenario==='unlisted'||!this.whitelist.find(x=>x.id===this.leader.id&&x.enabled))return block('留言权限已关闭，暂时无法发送');
      if(!member||!member.relation.startsWith('直属')||this.scenario==='relation-changed')return block('该用户已不是你的直属下级，无法发送留言');
      if(!template||!template.enabled||this.scenario==='template-changed')return block('该话术已不可用，请重新选择');
      const content=this.content(templateId,targetId);
      if(this.scenario==='content-changed'){content.text+='\n请查看最新任务说明。';content.fingerprint=JSON.stringify([content.text,content.image]);}
      if(fingerprint!==content.fingerprint)return {status:'changed',message:'留言内容已更新，请重新确认',content};
      if(this.scenario==='offline')return block('当前网络不可用，请恢复网络后重试');
      const limit=this.limitError(targetId,content);if(limit)return block(limit);
      request={...request,snapshot:{template:clone(template),member:clone(member),leader:clone(this.leader)}};
      if(this.scenario==='unknown'){this.pending[id]={request:clone(request),content:clone(content)};return {status:'unknown',message:'正在核实发送结果，请勿重复发送'};}
      if(this.scenario==='failure'&&!request.retry) {
        this.record(request,content,'失败','站内通知生成失败');
        return {status:'failed',message:'留言发送失败，请重试'};
      }
      return this.complete(request,content);
    }
    record(request,content,status,reason) {
      const t=request.snapshot?.template||this.templates.find(x=>x.id===request.templateId),m=request.snapshot?.member||this.members.find(x=>x.id===request.targetId),leader=request.snapshot?.leader||this.leader;
      const previous=this.records.findIndex(x=>x.operation===request.id);
      const row={id:previous>=0?this.records[previous].id:'R'+String(this.records.length+1).padStart(4,'0'),operation:request.id,leaderId:leader.id,leaderName:leader.name,targetId:m.id,targetName:m.name,relation:m.relation,templateId:t.id,templateName:t.name,templateBody:t.body,...clone(content),status,time:bj(Date.now()),timestamp:Date.now(),reason};
      if(previous>=0)this.records[previous]=row;else this.records.unshift(row);
      return row;
    }
    complete(request,content) {
      if(this.operations[request.id])return clone(this.operations[request.id]);
      const row=this.record(request,content,'成功','');
      this.notifications.unshift({id:'N-'+request.id,target:request.targetId,title:'团长留言',text:content.text,image:content.image,time:row.time,read:false});
      delete this.pending[request.id]; this.recipientId=request.targetId;
      return this.operations[request.id]={status:'success',message:'留言已发送'};
    }
    query(id) {
      if(this.operations[id])return clone(this.operations[id]);
      const pending=this.pending[id];
      if(!pending)return {status:'unknown',message:'正在核实发送结果，请勿重复发送'};
      const limit=this.limitError(pending.request.targetId,pending.content);
      if(limit){this.record(pending.request,pending.content,'失败','提交后最终复核未通过：'+limit);delete this.pending[id];return {status:'failed',message:'留言发送失败，请重试'};}
      return this.complete(pending.request,pending.content);
    }
  }
  root.MessageDemo=MessageDemo; root.messageVariables=variables; root.messageBJ=bj;
})(typeof window!=='undefined'?window:globalThis);
