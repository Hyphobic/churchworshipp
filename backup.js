'use strict';
// Explicit allowlist: OAuth tokens and pending login credentials never leave this device.
const BACKUP_KEYS={
 'worship-chords-favorites-v1':'array',
 'worship-chords-chains-v1':'array',
 'worship-chords-personal-charts-v1':'object',
 'worship-chords-verification-v1':'object',
 'worship-spotify-playlist-cache-v1':'array',
 'worship-spotify-client-id-v1':'string'
};
function validateBackup(data){
 if(data?.app!=='Worship Chords Full Backup'||data.version!==1||!data.values||typeof data.values!=='object'||Array.isArray(data.values))throw Error('Choose a full Worship Chords backup. Older separate backups belong in the app’s corresponding Import buttons.');
 const result={};
 for(const [key,raw] of Object.entries(data.values)){
  if(!Object.hasOwn(BACKUP_KEYS,key))throw Error('Backup contains an unsupported setting.');
  if(typeof raw!=='string')throw Error('Invalid backup value.');
  const type=BACKUP_KEYS[key];
  if(type==='string'){if(!/^[a-zA-Z0-9]{1,100}$/.test(raw))throw Error('Invalid Spotify client ID.');}
  else{const value=JSON.parse(raw);if(type==='array'?!Array.isArray(value):!value||typeof value!=='object'||Array.isArray(value))throw Error('Invalid saved data structure.');}
  result[key]=raw;
 }
 if(!Object.keys(result).length)throw Error('No saved data in this backup.');
 return result;
}
function restoreBackup(storage,values){
 const old=Object.fromEntries(Object.keys(values).map(k=>[k,storage.getItem(k)]));
 try{for(const [k,v] of Object.entries(values))storage.setItem(k,v);}
 catch(error){for(const [k,v] of Object.entries(old)){if(v===null)storage.removeItem(k);else storage.setItem(k,v);}throw error;}
}
if(typeof document!=='undefined'){
 const status=document.getElementById('backupStatus');
 document.getElementById('backupExport').onclick=()=>{
  try{
   const values={};for(const key of Object.keys(BACKUP_KEYS)){const value=localStorage.getItem(key);if(value!==null)values[key]=value;}
   const data={app:'Worship Chords Full Backup',version:1,exportedAt:new Date().toISOString(),values};
   validateBackup(data);
   const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='worship-chords-backup-'+new Date().toISOString().slice(0,10)+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),30000);
   status.textContent='Backup downloaded. Keep it somewhere safe. Spotify login tokens are excluded.';
  }catch(e){status.textContent='Backup failed: '+e.message;}
 };
 document.getElementById('backupImport').onchange=async event=>{
  const file=event.target.files?.[0];if(!file)return;
  try{
   if(file.size>20000000)throw Error('Backup is too large.');
   const values=validateBackup(JSON.parse(await file.text()));
   if(!confirm('Replace the saved categories included in this backup? Export your current data first. Categories not in this file stay unchanged.'))return;
   restoreBackup(localStorage,values);status.textContent='Restored. Return to the app to load your data. Connect Spotify again if you changed website addresses.';
  }catch(e){status.textContent='Restore failed: '+e.message;}finally{event.target.value='';}
 };
}
