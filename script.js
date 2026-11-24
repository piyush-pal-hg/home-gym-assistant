// tabs
var tabs=document.getElementById('tabs');
tabs.addEventListener('click',function(e){var t=e.target.dataset.t;if(!t)return;
document.querySelectorAll('nav button').forEach(function(b){b.classList.toggle('on',b===e.target)});
document.querySelectorAll('section').forEach(function(s){s.classList.toggle('on',s.id===t)});window.scrollTo(0,0)});

// stick figures: each pose is a list of polylines [x1,y1,x2,y2,...] + head [cx,cy]
var P={
pushup:[{h:[22,24],l:[[28,30,100,52],[28,30,28,58]]},{h:[22,44],l:[[28,50,100,56],[28,50,40,54,28,58]]}],
pike:[{h:[34,44],l:[[38,50,62,14,92,58],[38,50,36,58]]},{h:[40,52],l:[[44,56,62,14,92,58],[44,56,34,58]]}],
plank:[{h:[20,36],l:[[28,42,98,54],[28,42,28,58,44,58]]},{h:[20,32],l:[[28,38,98,54],[28,38,28,58,44,58]]}],
bicycle:[{h:[34,26],l:[[40,32,62,52],[62,52,78,40,90,52],[62,52,84,56,100,58],[40,32,52,28]]},{h:[34,26],l:[[40,32,62,52],[62,52,84,56,100,58],[62,52,78,40,60,32],[40,32,52,28]]}],
legraise:[{h:[16,52],l:[[22,56,70,56],[70,56,108,56]]},{h:[16,52],l:[[22,56,70,56],[70,56,70,12]]}],
climber:[{h:[22,26],l:[[28,32,92,50],[28,32,28,58],[70,45,50,52,45,58]]},{h:[22,26],l:[[28,32,92,50],[28,32,28,58],[70,45,56,42,48,48]]}]
};
function fig(k){var s='<svg viewBox="0 0 120 66" role="img" aria-label="'+k+' animation">';
['a','b'].forEach(function(c,i){var p=P[k][i];s+='<g class="'+c+'"><circle cx="'+p.h[0]+'" cy="'+p.h[1]+'" r="6"/>';
p.l.forEach(function(l){s+='<polyline points="'+l.join(' ')+'"/>'});s+='</g>'});
return s+'<line x1="4" y1="62" x2="116" y2="62" stroke="currentColor" stroke-opacity=".25"/></svg>'}
var E=[
['pushup','Push-up','Chest, shoulders, triceps','3 × 10–20','Hands under shoulders, body in one straight line. Lower chest to a fist-height from the floor, push up. Don’t sag the hips.','push up proper form'],
['pike','Pike push-up','Broad shoulders','3 × 8–12','Hips high in an upside-down V. Bend elbows so the top of your head goes toward the floor between your hands, then press up.','pike push up form'],
['plank','Plank','Abs, core, shoulders','3 × 30–60 sec','Forearms on the floor, elbows under shoulders. Squeeze abs and glutes, keep the back flat, breathe slowly.','plank proper form'],
['bicycle','Bicycle crunch','Abs, obliques','3 × 20','Lie on your back, hands by your head. Bring opposite elbow to opposite knee while the other leg extends. Slow and controlled.','bicycle crunch form'],
['legraise','Leg raise','Lower abs','3 × 10–15','Lie flat, press lower back down. Lift straight legs up to 90°, lower slowly without touching the floor.','lying leg raise form'],
['climber','Mountain climber','Abs, fat burn','3 × 30 sec','From a high plank, drive knees toward the chest alternately at a steady fast pace. Keep hips low.','mountain climbers form']
];
function ld(d){d=d||new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
var day=ld(),S={days:{},body:[]},dbDoc=null,TOTAL=14;
try{var j0=JSON.parse(localStorage.getItem('hga'));if(j0&&j0.days)S=j0}catch(e){}
function sync(t){document.getElementById('sync').textContent=t}
function save(){try{localStorage.setItem('hga',JSON.stringify(S))}catch(e){}
if(dbDoc)dbDoc.set(S).then(function(){sync('Synced to your account')}).catch(function(){sync('Saved on this device only')})}
var g=document.getElementById('exgrid');
E.forEach(function(e){var d=document.createElement('div');d.className='card';
d.innerHTML='<div class="fig">'+fig(e[0])+'</div><h3>'+e[1]+'</h3><span class="tag">'+e[2]+'</span><span class="tag">'+e[3]+'</span><p class="mut">'+e[4]+'</p><a class="vid" target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query='+encodeURIComponent(e[5])+'">▶ Watch video</a>'+
'<label class="chk"><input type="checkbox" data-k="ex-'+e[0]+'"> Done today</label>';g.appendChild(d)});

var F=[
['Chin tuck','Pull your chin straight back (make a double chin), hold 5 sec. Fixes forward-head posture and sharpens the side profile.','10 reps'],
['Jaw jut','Push your lower jaw forward, feel the stretch under the chin, hold 5 sec, relax.','10 reps'],
['Tongue-up posture','Press the whole tongue against the roof of your mouth, lips closed, teeth lightly touching. Hold while sitting or commuting.','2 min, repeat daily'],
['Neck curl-up','Lie on your back, tuck chin, lift your head 2 cm, hold 10 sec. Strengthens the front neck muscles.','3 × 10 sec'],
['Ceiling kiss','Tilt head back, look at the ceiling, push lips up as if kissing it, hold 5 sec.','10 reps'],
['Cheek lift smile','Smile widely with lips closed, lift cheek muscles upward, hold 10 sec.','10 reps'],
['Fish face','Suck in cheeks and lips, hold 10 sec, then smile while keeping the pose.','3 × 10 sec'],
['Neck side stretch','Ear toward shoulder, hold 20 sec each side to release tension.','2 sides']
];
var fl=document.getElementById('facelist');
F.forEach(function(f,i){var l=document.createElement('label');l.className='chk';
l.innerHTML='<input type="checkbox" data-k="face-'+i+'"><span><b>'+f[0]+'</b> <span class="tag">'+f[2]+'</span><br><span class="mut">'+f[1]+'</span></span>';fl.appendChild(l)});

function paint(){document.querySelectorAll('input[data-k]').forEach(function(c){c.checked=(S.days[day]||[]).indexOf(c.dataset.k)>-1});render()}
function render(){var t=(S.days[day]||[]).length;document.getElementById('pt').textContent=Math.round(t/TOTAL*100)+'%';
var d=new Date(),n=0;if(!(S.days[ld(d)]||[]).length)d.setDate(d.getDate()-1);
while((S.days[ld(d)]||[]).length){n++;d.setDate(d.getDate()-1)}
document.getElementById('ps').textContent=n;
document.getElementById('pa').textContent=Object.keys(S.days).filter(function(k){return S.days[k].length}).length;
var b=document.getElementById('bars');b.textContent='';
for(var i=13;i>=0;i--){var x=new Date();x.setDate(x.getDate()-i);var c=(S.days[ld(x)]||[]).length,e=document.createElement('div');
e.style.height=Math.max(3,c/TOTAL*90)+'px';if(!c)e.className='z';e.title=ld(x)+': '+c;b.appendChild(e)}
var bl=document.getElementById('blog');bl.textContent='';
S.body.slice().sort(function(a,b){return a.d<b.d?1:-1}).slice(0,8).forEach(function(r){var l=document.createElement('div');l.className='bl';
var a=document.createElement('span'),z=document.createElement('span');a.textContent=r.d;z.textContent=(r.w?r.w+' kg':'')+(r.w&&r.c?' · ':'')+(r.c?r.c+' cm waist':'');l.appendChild(a);l.appendChild(z);bl.appendChild(l)})}
document.querySelectorAll('input[data-k]').forEach(function(c){c.addEventListener('change',function(){
var a=S.days[day]||[],i=a.indexOf(c.dataset.k);if(c.checked&&i<0)a.push(c.dataset.k);if(!c.checked&&i>-1)a.splice(i,1);S.days[day]=a;save();render()})});
document.getElementById('bs').addEventListener('click',function(){var w=parseFloat(document.getElementById('bw').value),c=parseFloat(document.getElementById('bc').value);
if(!(w>0)&&!(c>0))return;S.body=S.body.filter(function(r){return r.d!==day});S.body.push({d:day,w:w>0?w:null,c:c>0?c:null});
document.getElementById('bw').value='';document.getElementById('bc').value='';save();render()});
paint();
(async function(){try{if(!window.claude||!claude.use)return;var u=await claude.use('user'),db=await claude.use('db');if(!u||!db)return;
var id=await u.id();if(!id)return;var ref=db.collection('data/users/'+id).doc('progress'),snap=await ref.get();
if(snap.exists){var R=snap.data()||{};var rd=R.days||{};Object.keys(rd).forEach(function(k){var m=S.days[k]||[];(rd[k]||[]).forEach(function(v){if(m.indexOf(v)<0)m.push(v)});S.days[k]=m});
(R.body||[]).forEach(function(r){if(!S.body.some(function(q){return q.d===r.d}))S.body.push(r)})}
dbDoc=ref;save();paint()}catch(e){sync('Saved on this device only')}})();
