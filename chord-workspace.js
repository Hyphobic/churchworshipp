"use strict";
/* Worship Chords - locally saved per-recording chord charts (NOT Spotify transcription). */
(()=>{
const STORE='worship-chords-personal-charts-v1';
const $=id=>document.getElementById(id);
const html=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const TRACK_ID=key=>String(key||'');
const normalize=x=>String(x||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const saved=(()=>{try{const d=JSON.parse(localStorage.getItem(STORE)||'{}');return d&&typeof d==='object'&&!Array.isArray(d)?d:{}}catch(_){return {}}})();
let activeKey=null,step=0,mode='edit',viewData=null,displaySteps=0;
const notes=['C','C#','D','Eb','E','F','F#','G','Ab','A','Bb','B'];
const pc={'C':0,'B#':0,'C#':1,'Db':1,'D':2,'D#':3,'Eb':3,'E':4,'Fb':4,'F':5,'E#':5,'F#':6,'Gb':6,'G':7,'G#':8,'Ab':8,'A':9,'A#':10,'Bb':10,'B':11,'Cb':11};
const flats=['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B'];
function noteTranspose(root,n){const x=pc[root];if(x==null)return root;return (/[b]/.test(root)?flats:notes)[((x+n)%12+12)%12]}
function transposeChord(s,n){const m=String(s).match(/^([A-G](?:#|b)?)([^/\s]*)(?:\/([A-G](?:#|b)?))?$/);if(!m)return s;return noteTranspose(m[1],n)+m[2]+(m[3]?'/'+noteTranspose(m[3],n):'')}
function isChord(s){return /^[A-G](?:#|b)?(?:m|M|maj|min|dim|aug|sus|add|ø|°|[0-9]|#|b|\+|-)*(?:\/[A-G](?:#|b)?)?$/.test(s)}
function transposeLine(line,n){const parts=line.split(/(\[[^\]]+\])/);let result=parts.map(p=>{if(p[0]==='['&&p.endsWith(']')){let v=p.slice(1,-1).trim();return isChord(v)?'['+transposeChord(v,n)+']':p}return p}).join('');
// Only transpose chord-only lines or explicit section labels, never arbitrary lyric lines.
let section=result.match(/^(\s*(?:intro|verse|verso|chorus|coro|prechorus|puente|bridge|outro|vamp|final|interlude|instrumental|estrofa|reprise)\s*\d*\s*:\s*)(.*)$/i);
let head=section?section[1]:'';let tail=section?section[2]:result;
const chunks=tail.trim().split(/\s+/).filter(Boolean);
if(chunks.length&&chunks.every(x=>isChord(x)||x==='|'||x===':|'||x==='||'||x==='/'||x==='-')){
 tail=tail.replace(/\S+/g,token=>isChord(token)?transposeChord(token,n):token);
 return head+tail;
}
return result;
}
function transposed(text,n){return String(text||'').split('\n').map(line=>transposeLine(line,n)).join('\n')}
function paintLine(line){let escaped=html(line);if(/^\s*(?:\[(?:intro|verse|verso|chorus|coro|bridge|puente|outro|vamp|instrumental|final|reprise)[^\]]*\]|(?:intro|verse|verso|chorus|coro|bridge|puente|outro|vamp|instrumental|final|reprise)[^:]*:)\s*$/i.test(line))return '<span class="chart-section">'+escaped+'</span>';
 escaped=escaped.replace(/\[([A-G][#b]?[^\]\s]*)\]/g,(m,c)=>isChord(c)?`<span class="inline-chord">${html(c)}</span>`:m);
 const stripped=line.trim().split(/\s+/).filter(Boolean);if(stripped.length&&stripped.every(x=>isChord(x)||x==='|'||x==='-'))escaped='<span class="chord-run">'+escaped+'</span>';
 return escaped||'&nbsp;'}
function persist(){try{localStorage.setItem(STORE,JSON.stringify(saved));return true}catch(_){alert('Your browser storage is full. Export a backup to keep this chart.');return false}}
function track(){return tracks.find(t=>TRACK_ID(t.key)===activeKey)}
function show(){const t=track();if(!t)return;const data=saved[activeKey]||{};viewData=data;mode=data.body?'view':'edit';step=0;displaySteps=0;
 $('chartTitle').textContent=t.title;$('chartMeta').textContent=t.artist+' · '+t.album;
 $('chartRecord').textContent='Specific Spotify recording: '+t.spotify.split('/').pop();
 $('chartUrl').href=t.spotify;
 $('chartLabel').value=data.label||'';$('chartKey').value=data.key||'';$('chartCapo').value=data.capo||'0';$('chartBody').value=data.body||'';
 $('chartStatus').textContent=data.body?'Saved on this device · not verified from Spotify':'No chart saved for this recording yet.';
 setMode(mode);draw();$('chartDialog').hidden=false;document.body.classList.add('lock');}
function setMode(next){mode=next;$('chartEdit').hidden=mode==='edit';$('chartSave').hidden=mode!=='edit';$('chartForm').hidden=mode!=='edit';$('chartDisplay').hidden=mode==='edit';$('chartNew').hidden=mode==='edit';$('chartDelete').hidden=mode==='edit';$('chartTranspose').hidden=mode==='edit';}
function draw(){const data=saved[activeKey]||{};const body=transposed(data.body||'',displaySteps);$('chartPaper').innerHTML=body.split('\n').map(paintLine).join('\n');
 const mainKey=data.key?transposeChord(data.key,displaySteps):'Not set';$('chartShowingKey').textContent=mainKey;
 $('chartOffset').textContent=(displaySteps>0?'+':'')+displaySteps+' semitones';$('chartDisplay').classList.toggle('chart-empty',!body);
 $('chartStatus').textContent=data.body?('Your saved chart · '+(data.label||'personal arrangement')+' · capo '+(data.capo||'0')):'No chart stored';}
function chooseBorrow(){const t=track();if(!t)return;const matches=tracks.filter(v=>v.key!==t.key && saved[v.key]?.body && normalize(v.title)===normalize(t.title));const box=$('chartBorrow');box.replaceChildren();if(!matches.length){box.hidden=true;return}box.hidden=false;const txt=document.createElement('p');txt.textContent='Other album versions have your saved chord charts. Copy only if you verify the arrangement.';box.append(txt);for(const v of matches.slice(0,15)){const b=document.createElement('button');b.type='button';b.className='btn';b.textContent='Use '+v.artist+' — '+v.album;b.onclick=()=>{if(!confirm('This copies a different recording’s chord chart as a starting point. Verify key, chords and medley sections by ear. Continue?'))return;const src=saved[v.key];$('chartBody').value=src.body;$('chartKey').value=src.key||'';$('chartCapo').value=src.capo||'0';$('chartLabel').value='Draft from '+v.album;setMode('edit')};box.append(b)}}
function download(filename,contents){const url=URL.createObjectURL(new Blob([contents],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(url),500)}
function save(){const body=$('chartBody').value.trim();if(!body){$('chartStatus').textContent='Enter a chord chart before saving.';return}
 const data={body,label:$('chartLabel').value.trim().slice(0,100),key:$('chartKey').value.trim(),capo:$('chartCapo').value,updated:Date.now()};saved[activeKey]=data;if(!persist())return;displaySteps=0;setMode('view');draw();chooseBorrow();render();window.WorshipVerification?.count();}
function hide(){$('chartDialog').hidden=true;document.body.classList.remove('lock')}
const style=document.createElement('style');style.textContent=`
#chartDialog[hidden]{display:none!important}.chart-overlay{position:fixed;inset:0;z-index:300;background:rgba(9,10,12,.94);overflow:auto;padding:max(env(safe-area-inset-top),16px) 12px max(env(safe-area-inset-bottom),20px)}
.chart-panel{width:min(850px,100%);margin:0 auto;background:#201d1f;color:#f5e9dc;border:1px solid #63524b;border-radius:16px;padding:20px;box-shadow:0 6px 70px #0008}.chart-head{display:flex;align-items:flex-start;justify-content:space-between;gap:15px}.chart-head h2{margin:5px 0;font:700 27px Georgia,serif}.chart-meta{font-size:13px;color:#cdbca8;line-height:1.6}.chart-small{font-size:12px;color:#acaaa6;line-height:1.55}.chart-info{margin:12px 0;padding:10px 12px;border:1px solid #6a5843;background:#2b271f;border-radius:10px;font-size:12px;color:#e2c99f;line-height:1.6}.chart-field{display:flex;flex-direction:column;gap:5px;font-size:12px;color:#e6ccaa;flex:1}.chart-row{display:flex;gap:10px;margin:13px 0;flex-wrap:wrap}.chart-row .chart-field{min-width:110px}.chart-field input,.chart-field textarea,.chart-field select{background:#121718;color:#f9ead9;border:1px solid #5c564e;border-radius:8px;padding:10px;font:inherit;font-size:15px;min-height:43px}.chart-field textarea{min-height:245px;white-space:pre-wrap;resize:vertical;line-height:1.55;font-family:ui-monospace,monospace}.chart-actions{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}.chart-paper{white-space:pre-wrap;overflow-wrap:anywhere;background:#14191a;border:1px solid #4b514a;padding:17px;border-radius:12px;min-height:155px;color:#fff2e2;font:15px/1.8 ui-monospace,monospace;tab-size:4}.chart-section{font-weight:800;color:#ecd09d}.inline-chord,.chord-run{color:#f2c378;font-weight:800}.chart-keybar{display:flex;gap:9px;justify-content:space-between;align-items:center;flex-wrap:wrap;padding:8px 0}.chart-keybar span{font-size:12px}.chart-ctrl{display:flex;gap:8px;align-items:center}.chart-ctrl button{min-width:43px}.chart-borrow{margin:13px 0;padding:10px;background:#262726;border-radius:10px}.chart-borrow button{margin:5px}.chart-empty .chart-paper{color:#ccc}.chart-warning{color:#e6c18e;font-size:12px}.chart-footer{display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin:18px 0 0}.chart-footer a{color:#c7d7cd}.chart-panel h3{font-size:14px}
@media(max-width:500px){.chart-panel{padding:14px}.chart-overlay{padding:env(safe-area-inset-top) 7px env(safe-area-inset-bottom)}.chart-head h2{font-size:23px}.chart-paper{font-size:15px;padding:11px}.chart-field{flex-basis:100%}}
`;document.head.append(style);
document.body.insertAdjacentHTML('beforeend',`<div id="chartDialog" class="chart-overlay" role="dialog" aria-modal="true" aria-label="Personal guitar chords" hidden><section class="chart-panel"><div class="chart-head"><div><div class="eyebrow">My guitar chords · personal chart</div><h2 id="chartTitle"></h2><div id="chartMeta" class="chart-meta"></div><div id="chartRecord" class="chart-small"></div></div><button id="chartClose" class="btn" type="button">✕ Close</button></div><div class="chart-info">Spotify imports the recording, <strong>not its chords</strong>. Charts here are your saved arrangements; they are not automatically verified against the recording. Keep different album versions and medley sections separate.</div><div id="chartStatus" class="chart-small"></div>
<div id="chartForm"><div class="chart-row"><label class="chart-field">Arrangement name<input id="chartLabel" placeholder="Acoustic / church version"></label><label class="chart-field">Song key<input id="chartKey" placeholder="E or Am" maxlength="5"></label><label class="chart-field">Capo<select id="chartCapo">${Array.from({length:13},(_,i)=>`<option value="${i}">${i===0?'No capo':'Fret '+i}</option>`).join('')}</select></label></div><label class="chart-field">Chord chart / ChordPro notation<textarea id="chartBody" spellcheck="false" placeholder="Intro:\nG  D  Em  C\n\nVerse:\nG  D  Em  C\n\nChorus:\nC  G  D  Em\n\nOr paste ChordPro, like: [G]your [D]line"></textarea></label><p class="chart-small">You can paste your own chords, permitted ChordPro files, section progressions, and rehearsal notes. No automatic transcription is performed.</p><div id="chartBorrow" class="chart-borrow" hidden></div></div>
<div id="chartDisplay" hidden><div class="chart-keybar"><div>Key: <strong id="chartShowingKey"></strong> · <span id="chartOffset"></span></div><div class="chart-ctrl" id="chartTranspose"><button class="btn" type="button" id="chartDown">−</button><span>Transpose</span><button class="btn" type="button" id="chartUp">+</button></div></div><div class="chart-paper" id="chartPaper"></div><p class="chart-warning">Verify transposed chord spellings and voicings before performing.</p></div>
<div class="chart-actions"><button class="btn primary" id="chartSave" type="button">Save chord chart</button><button class="btn" id="chartEdit" type="button" hidden>Edit chart</button><button class="btn" id="chartNew" type="button" hidden>Save transposition as source</button><button class="btn" id="chartDelete" type="button" hidden>Delete chart</button></div><div class="chart-footer"><a id="chartUrl" target="_blank" rel="noopener noreferrer">Play Spotify recording ↗</a><a id="chartSearch" target="_blank" rel="noopener noreferrer">Search chords for this version ↗</a><button class="btn" id="chartBackup" type="button">Export my charts</button><label class="btn" for="chartImport">Import charts<input type="file" id="chartImport" accept=".json,application/json" hidden></label></div></section></div>`);
$('chartClose').addEventListener('click',hide);
$('chartDialog').addEventListener('click',e=>{if(e.target.id==='chartDialog')hide()});
$('chartSave').addEventListener('click',save);
$('chartEdit').addEventListener('click',()=>{setMode('edit');chooseBorrow()});
$('chartUp').addEventListener('click',()=>{displaySteps=Math.min(displaySteps+1,11);draw()});
$('chartDown').addEventListener('click',()=>{displaySteps=Math.max(displaySteps-1,-11);draw()});
$('chartNew').addEventListener('click',()=>{const d=saved[activeKey];if(!d)return;$('chartBody').value=transposed(d.body,displaySteps);$('chartKey').value=d.key?transposeChord(d.key,displaySteps):'';setMode('edit')});
$('chartDelete').addEventListener('click',()=>{if(!confirm('Delete your saved chart for this specific Spotify recording?'))return;delete saved[activeKey];persist();setMode('edit');$('chartBody').value='';$('chartKey').value='';render();$('chartStatus').textContent='Chart deleted.'});
$('chartBackup').addEventListener('click',()=>download('worship-chords-personal-charts.json',JSON.stringify({app:'Worship Chords',charts:saved,version:1},null,2)));
$('chartImport').addEventListener('change',async e=>{const f=e.target.files?.[0];if(!f)return;try{const d=JSON.parse(await f.text());if(d.app!=='Worship Chords'||typeof d.charts!=='object'||!d.charts)throw Error('Not a valid Worship Chords chart backup');let count=0;for(const [k,v] of Object.entries(d.charts)){if(typeof v?.body!=='string'||v.body.length>300000)continue;if(saved[k]?.body&&!confirm('Overwrite chart for recording '+k+'?'))continue;saved[k]={body:v.body,label:String(v.label||'').slice(0,100),key:String(v.key||'').slice(0,5),capo:String(v.capo||'0')};count++}persist();render();alert(count+' chord charts imported.');if(activeKey)show()}catch(err){alert('Import failed: '+err.message)}finally{e.target.value=''}});
$('chartSearch').addEventListener('click',()=>{});
function open(key){activeKey=TRACK_ID(key);const t=track();if(!t){alert('This specific Spotify recording was not found in your current library.');return};$('chartSearch').href='https://www.google.com/search?q='+encodeURIComponent(`"${t.title}" "${t.artist}" "${t.album}" guitarra acordes`);show();chooseBorrow()}
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('chartDialog').hidden){e.stopPropagation();hide()}});
function prefill(key,info){open(key);if(!track())return;setMode('edit');$('chartLabel').value=String(info.label||'Source draft').slice(0,100);$('chartBody').value=String(info.body||'');$('chartKey').value=String(info.key||'').slice(0,5);$('chartCapo').value='0';$('chartStatus').textContent='Draft copied from a published source. Check against this specific Spotify version and save if useful. Not verified.'}
window.WorshipCharts={open,prefill,has:key=>!!saved[TRACK_ID(key)]?.body,transpose:transposeChord,all:()=>saved};
render();
})();
