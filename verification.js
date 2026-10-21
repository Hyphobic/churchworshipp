"use strict";
/* Research evidence links are curated from public online chord pages.
 * Sources do NOT certify a specific album recording, modulation, or medley.
 * User approval is local per Spotify recording ID, never copied to sibling versions. */
(()=>{
const SOURCES=[{"title":"Entonces La Iglesia Se Alegrara en La Danza","artist":"Alabanzas Cristianas Ebenezer","url":"https://acordes.lacuerda.net/ebenezer/entonces_la_iglesia-2.shtml","site":"LaCuerda","key":"Em","preview":"Intro: Em Am B\nVerse: Em Am B\nChorus: Am D G (F# bass) Em B\nEnd: Am D G (F# bass) Em B Em","playlistIndex":2,"spotifyTrackId":"3YXYBATD78SlSo0OtB4LkR","sourceRecording":"Ebenezer · Todo Adorable (2013); playlist track is a distinct recording."},{"title":"Victoria","artist":"Abel Brito","url":"https://acordes.lacuerda.net/abel_brito/victoria.shtml","site":"LaCuerda","key":"G","preview":"Chorus: G13 C9 G13 C9 · G13 A9 D13\nEnding: G/D Em7 A13 D13 G13","playlistIndex":1,"spotifyTrackId":"7dfkOys2ycCJcqHHLbcKMt"},{"title":"Ven Espíritu Santo","artist":"Barak","url":"https://www.cifraclub.com/banda-barak/ven-espiritu-santo/","site":"Cifra Club","key":"Em","preview":"Intro: Em D C B\nVerse: Em D C B"},{"title":"Me Gozaré","artist":"Billy Bunster","url":"https://www.cifraclub.com/billy-bunster/me-gozare/","site":"Cifra Club","key":"Em","preview":"Verse: Em D C B7\nChorus: Em D C B7"},{"title":"Me Gozaré","artist":"Marcos Witt","url":"https://www.cifraclub.com/marcos-witt/me-gozare/","site":"Cifra Club","key":"Em","preview":"Intro: Em Am B7 Em\nVerse: Em Am B7 Em"},{"title":"Dulce Refugio","artist":"Danilo Montero","url":"https://www.cifraclub.com/danilo-montero/dulce-refugio/wgmphz.html","site":"Cifra Club","key":"C","preview":"Verse: C G/B F G/E\nChorus: F G C"},{"title":"Bueno es Alabar","artist":"Danilo Montero","url":"https://www.cifraclub.com/danilo-montero/bueno-es-alabar/","site":"Cifra Club","key":"G","preview":"Intro: G C D\nVerse: G C D"},{"title":"Cerca de Ti","artist":"Jesús Adrián Romero","url":"https://www.cifraclub.com/jesus-adrian-romero/cerca-de-ti/","site":"Cifra Club","key":"G","preview":"Verse: G Em7 Am7 Em D\nChorus: G D Am Em"},{"title":"Mi Jesús, Mi Amado","artist":"Jesús Adrián Romero","url":"https://www.cifraclub.com/jesus-adrian-romero/mi-jesus-mi-amado/","site":"Cifra Club","key":"F","preview":"Verse: F Dm Bb Gm7 C\nChorus: F C Gm Dm"},{"title":"A Sus Pies","artist":"Jesús Adrián Romero","url":"https://www.cifraclub.com/jesus-adrian-romero/a-sus-pies/","site":"Cifra Club","key":"Am","preview":"Verse: Am A/C# Dm G G/B C"},{"title":"Que Sería De Mi","artist":"Jesús Adrián Romero","url":"https://www.cifraclub.com/jesus-adrian-romero/que-seria-de-mi/","site":"Cifra Club","key":"G","preview":"Verse: G D C"},{"title":"Remolineando","artist":"Fernel Monroy","url":"https://www.cifraclub.com/fernel-monroy/remolineando/","site":"Cifra Club","key":"Am","preview":"Verse: Am G Am\nChorus: Am G Am"},{"title":"Remolineando","artist":"Miel San Marcos","url":"https://www.cifraclub.com/miel-san-marcos/remolineando/wpswzg.html","site":"Cifra Club","key":"Bm","preview":"Intro: Bm G A F#m\nVerse: Bm A Bm"},{"title":"A Dios Sea La Gloria","artist":"Ericson Alexander Molano","url":"https://www.cifraclub.com/ericson-alexander-molano/a-dios-sea-la-gloria/","site":"Cifra Club","key":"Bb","preview":"Verse: C Em7 Bb A4 A"},{"title":"Dios Manda Lluvia","artist":"Ericson Alexander Molano","url":"https://www.cifraclub.com/ericson-alexander-molano/dios-manda-lluvia/","site":"Cifra Club","key":"G","preview":"Verse: G Em C Am D G"},{"title":"Cuán Grande Es Dios","artist":"En Espíritu Y En Verdad","url":"https://www.cifraclub.com/en-espiritu-en-verdad/cuan-grande-es-dios/","site":"Cifra Club","key":"C","preview":"Verse: C G/B Am F G"},{"title":"Grande Y Fuerte","artist":"Miel San Marcos","url":"https://www.cifraclub.com/miel-san-marcos/grande-y-fuerte/","site":"Cifra Club","key":"Am","preview":"Intro: Am Fmaj7 Em7"},{"title":"Canto Danzo Salto","artist":"Miel San Marcos","url":"https://www.cifraclub.com/miel-san-marcos/santo-danzo-salto/","site":"Cifra Club","key":"Cm","preview":"Verse: Cm Ab Fm G"},{"title":"Cuando Pienso","artist":"Miel San Marcos","url":"https://www.cifraclub.com/miel-san-marcos/cuando-pienso/wswsmz.html","site":"Cifra Club","key":"Cm","preview":"Verse: Cm Bb Cm7"},{"title":"Los Muros Caerán","artist":"Miel San Marcos","url":"https://www.cifraclub.com/miel-san-marcos/los-muros-caeran/","site":"Cifra Club","key":"Cm","preview":"Intro: Cm Ab Bb"},{"title":"Preciosa Sangre","artist":"Marco Barrientos","url":"https://www.cifraclub.com/marco-barrientos/preciosa-sangre/","site":"Cifra Club","key":"A","preview":"Intro: Bm7 A F#m7 C#m7\nChorus: D A F#m7 E"},{"title":"Escucharte Hablar","artist":"Marcos Witt","url":"https://www.cifraclub.com/marcos-witt/escucharte-hablar/","site":"Cifra Club","key":"G","preview":"Intro: G D C D"},{"title":"Al Rey","artist":"Marcos Witt","url":"https://www.cifraclub.com/marcos-witt/al-rey/wsjshs.html","site":"Cifra Club","key":"Gm","preview":"Intro: Gm F Eb D"},{"title":"Grande Es el Señor","artist":"Marco Barrientos","url":"https://www.cifraclub.com/marco-barrientos/grande-es-el-senor/","site":"Cifra Club","key":"Em","preview":"Verse: Em Am B7"},{"title":"El Poderoso de Israel","artist":"Juan Carlos Alvarado","url":"https://www.cifraclub.com/juan-carlos-alvarado/el-poderoso-de-israel/","site":"Cifra Club","key":"Dm","preview":"Intro: Dm Bb Dm Bb A"},{"title":"Abre Mis Ojos","artist":"Danilo Montero","url":"https://acordesweb.com/cancion/danilo-montero/abre-mis-ojos","site":"AcordesWeb","key":"E","preview":"Verse: E B/D# E/A E"},{"title":"Con Mi Dios","artist":"Jesús Adrián Romero","url":"https://www.cifraclub.com/jesus-adrian-romero/con-mi-dios/","site":"Cifra Club","key":"Em","preview":"Verse: Em C D C D"},{"title":"Tú Estás Aquí","artist":"Jesús Adrián Romero","url":"https://chordify.net/es/chords/jesus-adrian-romero-songs/tu-estas-aqui-chords","site":"Chordify","key":"B","preview":"Main chords: C#m A E B"},{"title":"Cantaré al Señor Por Siempre","artist":"Marco Barrientos","url":"https://chordify.net/es/chords/marco-barrientos-songs/cantare-al-senor-por-siempre-chords","site":"Chordify","key":"Dm","preview":"Reported chords: Dm C A Bb"}];
const STORE='worship-chords-verification-v1';
const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const normalizedTitle=s=>norm(s).replace(/\b(en vivo|en directo|live)\b/g,'').replace(/\s+/g,' ').trim();
const reviewData=(()=>{try{const d=JSON.parse(localStorage.getItem(STORE)||'{}');return d&&typeof d==='object'&&!Array.isArray(d)?d:{}}catch(_){return {}}})();
let active=null,manualSearch=false;
const filters=$('vStatusFilter'),sorter=$('vSort');
function candidates(t){return SOURCES.filter(s=>(!s.playlistIndex||s.playlistIndex===t.n)&&(!s.spotifyTrackId||String(t.spotify||'').includes(s.spotifyTrackId))&&normalizedTitle(t.title)===normalizedTitle(s.title)&&norm(t.artist).includes(norm(s.artist)))}
function entry(t){return reviewData[t.key]||{}}
function getSource(t){const saved=entry(t);if(saved.url&&saved.declined!==true)return [{url:saved.url,site:saved.site||'Your submitted source',title:t.title,artist:t.artist,key:saved.key||'',preview:saved.preview||'',custom:true},...candidates(t)];if(saved.declined)return [];return candidates(t)}
function hasChart(t){return Boolean(window.WorshipCharts?.has(t.key)||t.lesson)}
function state(t){const r=entry(t);if(r.status==='verified')return'verified';if(r.status==='approved')return'approved';if(r.declined)return hasChart(t)?'review':'missing';if(getSource(t).length)return'found';if(hasChart(t))return'review';return'missing'}
function badge(t){const s=state(t);const found=getSource(t).length;
  return s==='verified'?'<span class="pill v-verified">✔ Recording verified by you</span>':s==='approved'?'<span class="pill v-reviewed">✓ Approved by you</span>':s==='found'?'<span class="pill v-source">↗ Chord source found · review</span>':s==='review'?'<span class="pill v-reviewed">◷ Chart needs review</span>':'<span class="pill v-missing">? Chords needed</span>'}

/* Source-backed memorization lesson, scoped to a single recording.
   Chord names/progressions are study excerpts; full source stays linked. */
const STUDY_SHEETS=[{
 n:1,title:"Victoria",artist:"Abel Brito",album:"Es Hora de Adorarle",key:"G (source reference)",level:"3 / 4",
 source:"https://acordes.lacuerda.net/abel_brito/victoria.shtml",
 sets:[
  ["INTRO / CHORUS","G13 · C9 · G13 · C9"],
  ["CHORUS CONTINUATION","G13 · A9 · D13"],
  ["PASSING CHORDS","Em7 · D#m7 · Dm7 · G9 · C · C#dim7"],
  ["RESOLUTION","G/D · Em7 · A13 · D13 · G13"]
 ],
 chords:["G13","C9","A9","D13","Em7","D#m7","Dm7","G9","C","C#dim7","G/D","A13"],
 notes:"Start with one downstroke per chord. Drill the repeated G13 to C9 movement first. Then isolate the descending Em7–D#m7–Dm7 changes and the final turnaround. The source contains additional section variations."
},{
 n:2,title:"Entonces La Iglesia Se Alegrara en La Danza",artist:"Alabanzas Cristianas Ebenezer",album:"Alabanza y Danza",key:"Em (source key)",level:"2 / 4",referenceNote:"LaCuerda transcribes Ebenezer’s Todo Adorable (2013) rendition. Your Spotify recording is Alabanzas Cristianas Ebenezer’s Alabanza y Danza release. Chords and transitions may differ.",
 source:"https://acordes.lacuerda.net/ebenezer/entonces_la_iglesia-2.shtml",
 sets:[
  ["INTRO","Em · Am · B"],
  ["VERSE / SECTION","Em · Am · B"],
  ["CHORUS","Am · D · G · (F# bass) · Em · B"],
  ["CHORUS RESOLUTION","Am · D · G · (F# bass) · Em · B · Em"],
  ["OPTIONAL PASSING RUN","E · F#m · G · G# (shown parenthetically in source; may be a melodic/bass transition)"]
 ],
 chords:["Em","Am","B","D","G","G/F#","E","F#m","G#"],
 notes:"Start with Em → Am → B until you can change without stopping. The chorus adds Am → D → G → Em → B. Practice the G to F# bass walk to Em slowly. The parentheses in the published chart describe passing movement; listen to your specific Spotify recording before treating every passing note as a full strummed chord. B and F#m use barre shapes."
}];
const STUDY_SHAPES={
 "G13":"3x345x","C9":"x32333","A9":"x02423","D13":"x54557",
 "Em7":"022030","D#m7":"x68676","Dm7":"xx0211","G9":"3x3201",
 "C":"x32010","C#dim7":"x4535x","G/D":"xx0003","A13":"x05422",
 "Em":"022000","Am":"x02210","B":"x24442","D":"xx0232","G":"320003","G/F#":"2x0003","E":"022100","F#m":"244222","G#":"466544"
};
function studySheet(t){return STUDY_SHEETS.find(v=>t&&t.n===v.n&&normalizedTitle(t.title)===normalizedTitle(v.title)&&norm(t.artist).includes(norm(v.artist)))}
let studyModal=null,studyReturnFocus=null;
function studyChordCard(name){
 const shape=STUDY_SHAPES[name];if(!shape)return '';
 const frets=shape.split('').map(x=>x==='x'?-1:Number(x));
 const sounding=frets.filter(x=>x>0);
 const first=Math.max(...sounding)>4?Math.min(...sounding):1;
 let drawing='';
 for(let i=0;i<6;i++)drawing+='<line x1="'+(24+i*28)+'" y1="34" x2="'+(24+i*28)+'" y2="138" stroke="#9aa9a2" stroke-width="1"/>';
 for(let i=0;i<5;i++)drawing+='<line x1="24" y1="'+(34+i*26)+'" x2="164" y2="'+(34+i*26)+'" stroke="#9aa9a2" stroke-width="'+(i===0&&first===1?'3':'1')+'"/>';
 for(let i=0;i<6;i++){
   let x=24+i*28,k=frets[i];
   if(k===-1)drawing+='<text x="'+x+'" y="24" font-size="17" text-anchor="middle" fill="#a55366">×</text>';
   else if(k===0)drawing+='<circle cx="'+x+'" cy="17" r="6" stroke="#51867e" fill="none" stroke-width="2"/>';
   else drawing+='<circle cx="'+x+'" cy="'+(34+(k-first+.5)*26)+'" r="9" fill="#874d61"/>';
 }
 if(first>1)drawing+='<text x="170" y="51" font-size="10" fill="#59716b">'+first+'fr</text>';
 return '<div class="study-chord"><strong>'+esc(name)+'</strong><svg role="img" aria-label="'+esc(name)+' guitar chord diagram" viewBox="0 0 188 157">'+drawing+'</svg><small>'+esc(shape)+'</small></div>';
}
function closeStudy(){if(!studyModal)return;studyModal.hidden=true;document.body.classList.remove('lock');if(studyReturnFocus&&studyReturnFocus.isConnected)studyReturnFocus.focus()}
function openStudy(t){
 const sheet=studySheet(t);if(!sheet)return;
 studyReturnFocus=document.activeElement;
 if(!studyModal){
  studyModal=document.createElement('div');
  studyModal.id='vStudyModal';studyModal.hidden=true;
  studyModal.setAttribute('role','dialog');studyModal.setAttribute('aria-modal','true');
  studyModal.setAttribute('aria-label','Guitar chord study sheet');
  document.body.append(studyModal);
  studyModal.addEventListener('click',e=>{if(e.target===studyModal)closeStudy()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!studyModal.hidden)closeStudy()});
 }
 const featured=sheet.chords.slice(0,5),other=sheet.chords.slice(5);
 const sections=sheet.sets.map(s=>'<div class="study-step"><span>'+esc(s[0])+'</span><strong>'+esc(s[1])+'</strong></div>').join('');
 studyModal.innerHTML='<div class="study-wrap"><div class="study-toolbar"><strong>Recording #'+String(sheet.n).padStart(3,'0')+' · Study sheet</strong><button type="button" id="studyExit">✕ Close</button></div>'+
 '<article class="study-page"><div class="study-eyebrow">SOURCE-BACKED GUITAR ARRANGEMENT</div>'+
 '<h2>'+esc(sheet.title)+'</h2><p class="study-artist">'+esc(sheet.artist)+'</p><p class="study-album">'+esc(sheet.album)+'</p>'+
 '<div class="study-meta"><span>PLAYLIST #'+String(sheet.n).padStart(3,'0')+'</span><span>REFERENCE KEY '+esc(sheet.key)+'</span><span>LEVEL '+esc(sheet.level)+'</span></div>'+
 '<p class="study-caution">Published chord chart, not verified against this exact Spotify recording. The chord fingerings below are playable suggested voicings. '+esc(sheet.referenceNote||'')+'</p>'+
 '<section class="study-section"><h3>PRACTICE THE CHORD CHANGES</h3>'+sections+'</section>'+
 '<section class="study-section"><h3>GUITAR CHORD SHAPES</h3><div class="study-grid">'+featured.map(studyChordCard).join('')+'</div>'+
 '<details class="study-more"><summary>Show '+other.length+' more chord diagrams</summary><div class="study-grid">'+other.map(studyChordCard).join('')+'</div></details></section>'+
 '<section class="study-section"><h3>PLAYING NOTES</h3><p class="study-notes">'+esc(sheet.notes)+'</p></section>'+
 '<div class="study-source"><strong>Published song-level chord reference</strong><p>Full original chart and section timing remain at LaCuerda. Album-specific changes need your approval.</p>'+
 '<a href="'+esc(sheet.source)+'" rel="noopener noreferrer" target="_blank">OPEN FULL CHORD CHART ↗</a>'+
 (t.spotify?'<p><a href="'+esc(t.spotify)+'" rel="noopener noreferrer" target="_blank">LISTEN TO THIS SPOTIFY RECORDING ↗</a></p>':'')+'</div>'+
 '<p class="study-caption">Suggested fingerings · X = mute · ○ = open · dots = fretted strings (low E to high e). Source found ≠ verified recording.</p></article></div>';
 studyModal.hidden=false;document.body.classList.add('lock');
 document.getElementById('studyExit').onclick=closeStudy;
 document.getElementById('studyExit').focus();
}

function cardAction(t){return `<button type="button" class="btn v-check" data-verification="${esc(t.key)}">${state(t)==='verified'?'✓ Verification details':getSource(t).length?'Review chord source':'Check chords / verify'}</button>`+(studySheet(t)?'<button type="button" class="btn study-launch" data-study-lesson="'+esc(t.key)+'">View guitar chords</button>':'')}
function matches(t){const f=filters?.value||'all';const s=state(t);return f==='all'||f==='review'&&['found','review'].includes(s)||f==='missing'&&s==='missing'||f==='found'&&getSource(t).length>0||f==='approved'&&s==='approved'||f==='verified'&&s==='verified'}
const ranks={found:0,review:1,missing:2,approved:3,verified:4};
function sort(a,b){let by=sorter?.value||'playlist';const compare=(x,y)=>String(x||'').localeCompare(String(y||''),'es',{sensitivity:'base'});
 if(by==='title')return compare(a.title,b.title)||a.n-b.n;
 if(by==='artist')return compare(a.artist,b.artist)||compare(a.title,b.title)||a.n-b.n;
 if(by==='review')return ranks[state(a)]-ranks[state(b)]||a.n-b.n;
 if(by==='missing')return (state(a)==='missing'?0:1)-(state(b)==='missing'?0:1)||a.n-b.n;
 if(by==='found')return (getSource(a).length?0:1)-(getSource(b).length?0:1)||a.n-b.n;
 if(by==='approved')return ((state(b)==='verified'?2:state(b)==='approved'?1:0)-(state(a)==='verified'?2:state(a)==='approved'?1:0))||a.n-b.n;
 return a.n-b.n;}
function count(){if(!$('vStats'))return;let summary={verified:0,approved:0,review:0,missing:0,found:0};for(const t of tracks){const s=state(t);if(s!=='found')summary[s]++;if(getSource(t).length)summary.found++;}
 $('vStats').innerHTML=`<div class="v-stat"><b>${summary.verified}</b><span>Recording verified</span></div><div class="v-stat"><b>${summary.approved}</b><span>Your approvals</span></div><div class="v-stat"><b>${summary.found}</b><span>Online sources</span></div><div class="v-stat"><b>${summary.missing}</b><span>No chart source</span></div>`;
}
function save(){try{localStorage.setItem(STORE,JSON.stringify(reviewData))}catch(_){alert('Your device storage is full. Export your review data.')}}
function change(t,props){reviewData[t.key]={...entry(t),...props,updated:Date.now()};save();render();draw();}
function selected(){return tracks.find(t=>t.key===active)}
function findUrl(provider,t){const query=`"${t.title}" "${t.artist}" acordes guitarra`;
 const site=provider==='cifra'?'site:cifraclub.com ':provider==='lacuerda'?'site:acordes.lacuerda.net ':provider==='chordify'?'site:chordify.net ':provider==='echords'?'site:e-chords.com ':'';
 return 'https://www.google.com/search?q='+encodeURIComponent(site+query)}
const dialog=document.createElement('div');dialog.id='vReviewModal';dialog.setAttribute('role','dialog');dialog.setAttribute('aria-modal','true');dialog.setAttribute('aria-label','Review chord sources');dialog.hidden=true;document.body.append(dialog);
function draw(){const t=selected();if(!t)return;const r=entry(t),src=getSource(t);const best=src[0],s=state(t);
 const urls=[['Entire web','all'],['Cifra Club','cifra'],['LaCuerda','lacuerda'],['Chordify','chordify'],['E-Chords','echords']];
 dialog.innerHTML=`<div class="v-modalpane"><div class="v-modalhead"><div><div class="eyebrow">Chord research · Recording #${t.n}</div><h2>${esc(t.title)}</h2><div class="small">${esc(t.artist)} · ${esc(t.album)} · ${esc(t.length)}</div></div><button class="btn" id="vClose">✕ Close</button></div>
 <div class="v-help"><strong>Verification rules</strong><br>✔ Online source found = a published chart matching the song/artist, NOT the exact Spotify performance.<br>✓ Approved by you = you chose this reference for your arrangement.<br>✔ Recording verified by you = you checked the complete key, chord changes and transitions against <strong>this exact recording</strong> (including every medley section).</div>
 <div class="v-row"><strong>Current status: ${esc(s==='verified'?'Recording verified by you':s==='approved'?'Approved by you':s==='found'?'Source found — check this version':s==='review'?'Saved chart — needs review':'No chord source yet')}</strong><a href="${esc(t.spotify)}" rel="noopener noreferrer" target="_blank" style="color:#b8e2d2;font-size:12px">▶ Play this exact Spotify recording ↗</a></div>
 <div class="v-row"><strong>Published chord sources</strong>
 ${src.length?src.map((v,i)=>`<div class="v-sourcecard"><a href="${esc(v.url)}" target="_blank" rel="noopener noreferrer">${esc(v.site)} ↗ ${esc(v.title)}</a><p>Published reference: ${esc(v.sourceRecording||v.artist)}. Recording/album match not independently confirmed. ${v.custom?'Your custom source.':''}</p>${v.preview?`<pre>${esc(v.preview)}</pre>`:''}${v.preview?`<button class="btn" data-draft="${i}">Import these starter chords as an editable draft</button>`:''}</div>`).join(''):'<p class="small">No matching published chord chart was confirmed in the initial research. Search other sources or add your own.</p>'}
 </div><div class="v-browselinks">${urls.map(([label,key])=>`<a href="${esc(findUrl(key,t))}" target="_blank" rel="noopener noreferrer">Search ${esc(label)} ↗</a>`).join('')}</div>
 <div class="v-divider"></div><div class="v-row"><strong>Found another chart?</strong><p class="small">Paste the direct chord-page URL, not a search results URL. It stays attached only to this Spotify recording.</p><input id="vManualUrl" class="v-input" type="url" placeholder="https://..." value="${esc(r.url||'')}"><button id="vSetUrl" class="btn" type="button" style="margin-top:8px">Save custom chord link</button></div>
 <div class="v-btnrow"><button type="button" class="btn" id="vPersonal">✎ Enter my own chords</button>${src.length?'<button type="button" class="btn" id="vReject">✕ Wrong version / reject source</button>':''}</div>
 <div class="v-divider"></div><div class="v-row"><strong>My review decision</strong><p class="small">Save an approval for this recording only. An approval is not a claim that anyone else verified the music.</p><textarea class="v-input" rows="2" id="vNotes" placeholder="Key change at 2:10; chorus from a different version…">${esc(r.notes||'')}</textarea></div>
 <div class="v-btnrow"><button type="button" id="vApprove" class="btn primary">✓ Approve as my reference</button><button type="button" id="vClear" class="btn">Reset my review</button></div>
 <label class="v-checkline"><input type="checkbox" id="vVerifiedBox"><span>I personally checked the chords, key, structure, and any modulations/medley segments against <strong>this exact Spotify recording</strong>. This chart is performance-ready.</span></label>
 <div class="v-btnrow"><button type="button" id="vConfirmVerified" class="btn" style="border-color:#588a65;color:#bdedc2">✔ Mark recording verified</button></div>
 <p class="v-warning" id="vFeedback" role="status">No recording is marked automatically verified based on a third-party chord website.</p>
 </div>`;
 $('vClose').onclick=close;
 $('vPersonal').onclick=()=>{close();window.WorshipCharts?.open(t.key)};
 $('vSetUrl').onclick=()=>{const raw=$('vManualUrl').value.trim();try{const u=new URL(raw);if(u.protocol!=='https:'||!u.hostname.includes('.'))throw Error();change(t,{url:u.href,site:u.hostname,declined:false,status:'',notes:$('vNotes').value});$('vFeedback').textContent='Custom source saved. Confirm exact recording before verifying.'}catch(_){$('vFeedback').textContent='Enter a complete HTTPS URL to the chord page.'}};
 if($('vReject'))$('vReject').onclick=()=>{change(t,{declined:true,status:'',notes:$('vNotes').value})};
 dialog.querySelectorAll('[data-draft]').forEach(btn=>btn.onclick=()=>{const v=src[Number(btn.dataset.draft)];close();window.WorshipCharts?.prefill(t.key,{body:v.preview+'\n\n[Review this against your Spotify recording before performing]',key:v.key,label:'Draft · '+v.site});});
 $('vApprove').onclick=()=>{if(!best&&!hasChart(t)){$('vFeedback').textContent='Please add a chart link or enter your chords before approving.';return;}change(t,{status:'approved',declined:false,notes:$('vNotes').value})};
 $('vConfirmVerified').onclick=()=>{if(!$('vVerifiedBox').checked){$('vFeedback').textContent='Check the confirmation box after you personally compare the exact recording.';return;}if(!best&&!hasChart(t)){$('vFeedback').textContent='Add a chart or direct chord source first.';return;}change(t,{status:'verified',declined:false,notes:$('vNotes').value,verifiedAt:Date.now()})};
 $('vClear').onclick=()=>{if(!confirm('Reset verification status for this recording? Your chord chart will remain saved.'))return;delete reviewData[t.key];save();render();draw()};
}
function open(key){active=key;const t=selected();if(!t)return;dialog.hidden=false;document.body.classList.add('lock');draw();$('vClose')?.focus()}
function close(){dialog.hidden=true;document.body.classList.remove('lock')}
$('songlist').addEventListener('click',event=>{const lesson=event.target.closest('[data-study-lesson]');if(lesson){const t=tracks.find(t=>t.key===lesson.dataset.studyLesson);if(t)openStudy(t);return}const btn=event.target.closest('[data-verification]');if(btn)open(btn.dataset.verification)});
filters.addEventListener('change',render);sorter.addEventListener('change',render);
$('vBackup').onclick=()=>{const content=JSON.stringify({app:'Worship Chords Verification',version:1,exportedAt:new Date().toISOString(),reviews:reviewData},null,2);const url=URL.createObjectURL(new Blob([content],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='worship-chords-verification-reviews.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)};
$('vImport').addEventListener('change',async e=>{const f=e.target.files?.[0];if(!f)return;try{const data=JSON.parse(await f.text());if(data.app!=='Worship Chords Verification'||data.version!==1||!data.reviews||typeof data.reviews!=='object'||Array.isArray(data.reviews))throw Error('Not a Worship Chords review backup');let n=0;for(const [k,v] of Object.entries(data.reviews)){if(!/^[a-zA-Z0-9_-]{8,80}#[0-9]{1,5}$/.test(k)||!v||typeof v!=='object')continue;const clean={status:['approved','verified'].includes(v.status)?v.status:'',declined:!!v.declined,url:String(v.url||'').slice(0,1200),site:String(v.site||'').slice(0,100),notes:String(v.notes||'').slice(0,4000),updated:Date.now()};if(clean.url&&!/^https:\/\//.test(clean.url))clean.url='';reviewData[k]=clean;n++;}save();render();alert(n+' review records imported. Your charts are stored in a separate backup.')}catch(err){alert('Import failed: '+err.message)}finally{e.target.value=''}});
dialog.addEventListener('click',e=>{if(e.target===dialog)close()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!dialog.hidden)close()});
window.WorshipVerification={badge,cardAction,matches,sort,count,state,candidates,open,reviewData};
// Display label for the Worship Chords 2.5 test release.
(function setDisplayVolume() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (/^\s*Volume\s+(?:0?2|1\.1(?:\.1)?|2\.5)\s*[·•]\s*Worship\s*$/i.test(node.nodeValue || "")) {
      node.nodeValue = node.nodeValue.replace(/Volume\s+(?:0?2|1\.1(?:\.1)?|2\.5)/i, "Volume 2.5");
      break;
    }
  }
})();
render();
})();
