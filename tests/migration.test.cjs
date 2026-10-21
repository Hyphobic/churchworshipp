const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync('verification.js','utf8');
const context=vm.createContext({});
vm.runInContext(source.match(/const norm=.*?;\n/)[0]+source.match(/const normalizedTitle=.*?;\n/)[0]+source.match(/const SOURCES=.*?;\n/)[0]+source.match(/const STUDY_SHEETS=\[[\s\S]*?\n\}\];/)[0]+source.match(/function recordingId[^\n]+/)[0]+source.match(/function candidates[^\n]+/)[0]+source.match(/function studySheet[^\n]+/)[0],context);
for(const [id,n] of [['7dfkOys2ycCJcqHHLbcKMt',1],['3YXYBATD78SlSo0OtB4LkR',2]]){
 context.t={spotify:'https://open.spotify.com/track/'+id,n:87};
 assert.equal(vm.runInContext('studySheet(t).n',context),n);
 // Restrict generic candidates for this test; exact-ID entries must ignore position/title.
 assert.equal(vm.runInContext('candidates(t).length',context),1);
}
context.t={spotify:'https://open.spotify.com/track/anotherRecording',n:1,title:'Victoria',artist:'Abel Brito'};
assert.equal(vm.runInContext('studySheet(t)',context),undefined);
vm.runInContext(fs.readFileSync('backup.js','utf8'),context);
assert.throws(()=>vm.runInContext("validateBackup({app:'Worship Chords Full Backup',version:1,values:{'worship-spotify-pkce-auth-v1':'secret'}})",context));
assert.throws(()=>vm.runInContext("validateBackup({app:'Worship Chords Full Backup',version:1,values:{'worship-chords-favorites-v1':'{}'}})",context));
vm.runInContext("validateBackup({app:'Worship Chords Full Backup',version:1,values:{'worship-chords-favorites-v1':'[\"track#1\"]'}})",context);
const data=new Map([['a','old']]);let failed=false;context.storage={getItem:k=>data.get(k)??null,setItem:(k,v)=>{if(k==='b'&&!failed){failed=true;throw Error('quota')}data.set(k,v)},removeItem:k=>data.delete(k)};
assert.throws(()=>vm.runInContext("restoreBackup(storage,{a:'new',b:'new'})",context));assert.equal(data.get('a'),'old');assert.equal(data.has('b'),false);
const repoSources=JSON.parse(fs.readFileSync('source-candidates.json','utf8'));
for(const id of ['7dfkOys2ycCJcqHHLbcKMt','3YXYBATD78SlSo0OtB4LkR']){
 const inApp=vm.runInContext('SOURCES',context).find(s=>s.spotifyTrackId===id),inJson=repoSources.find(s=>s.spotifyTrackId===id);
 assert.deepEqual({...inApp.verification},{status:'verified',label:'Recording verified by you',date:'2026-10-21'});
 assert.deepEqual({...inApp.verification},inJson.verification);
}
assert.equal(vm.runInContext('SOURCES',context).filter(s=>s.verification).length,2);
console.log('Passed: stable lesson identity, wrong-recording exclusion, backup validation, token exclusion, rollback, repo verifications.');
