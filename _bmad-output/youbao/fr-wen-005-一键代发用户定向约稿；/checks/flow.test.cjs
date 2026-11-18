// 验证手写 SVG 的正交线、落边端点、节点穿线和孤立节点。
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict');
let svg='';const context={window:{},document:{querySelector:()=>({set innerHTML(value){svg=value}})}};
vm.runInNewContext(fs.readFileSync(path.resolve(__dirname,'../../../../demo/iteration/fr-wen-005-flow.js'),'utf8'),context);context.window.renderFR005Flow();
const shapes=[];
for(const m of svg.matchAll(/<rect x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)"/g)){const[x,y,w,h]=m.slice(1).map(Number);shapes.push({x:x+w/2,y:y+h/2,rx:w/2,ry:h/2,type:'rect',connected:false});}
for(const m of svg.matchAll(/<polygon points="([^"]+)"/g)){const a=m[1].split(' ').map(p=>p.split(',').map(Number));shapes.push({x:a[0][0],y:a[1][1],rx:a[1][0]-a[0][0],ry:a[2][1]-a[1][1],type:'diamond',connected:false});}
const atEdge=(p,s)=>{const dx=Math.abs(p[0]-s.x),dy=Math.abs(p[1]-s.y);return s.type==='diamond'?Math.abs(dx/s.rx+dy/s.ry-1)<.001:(Math.abs(dx-s.rx)<.1&&dy<=s.ry+.1)||(Math.abs(dy-s.ry)<.1&&dx<=s.rx+.1)};
let count=0;
for(const m of svg.matchAll(/<polyline points="([^"]+)"/g)){
 const pts=m[1].split(' ').map(p=>p.split(',').map(Number));count++;
 for(const p of [pts[0],pts.at(-1)]){const hit=shapes.filter(s=>atEdge(p,s));assert(hit.length,'悬空端点：'+p);hit.forEach(s=>s.connected=true)}
 for(let i=1;i<pts.length;i++){
  const[a,b]=[pts[i-1],pts[i]],horizontal=a[1]===b[1];assert(horizontal||a[0]===b[0],'禁止斜线：'+m[1]);
  for(const s of shapes){const d=Math.abs(horizontal?a[1]-s.y:a[0]-s.x),r=horizontal?s.ry:s.rx;if(d>=r-.1)continue;const extent=(horizontal?s.rx:s.ry)*(s.type==='rect'?1:1-d/r),center=horizontal?s.x:s.y,j=horizontal?0:1;assert(!(Math.max(Math.min(a[j],b[j]),center-extent)<Math.min(Math.max(a[j],b[j]),center+extent)-.1),'线穿节点：'+m[1]);}
 }
}
assert(shapes.every(s=>s.connected),'不允许孤立流程节点');
assert.equal((svg.match(/<marker /g)||[]).length,1);
assert(svg.indexOf('class="flow-edges"')<svg.indexOf('class="flow-nodes"'));
console.log(`通过：${shapes.length}个节点、${count}条连线全部正交、端点落边，无穿框或孤立节点。`);
