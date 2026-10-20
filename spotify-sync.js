"use strict";
/* Worship Chords — Spotify playlist one-way synchronization.
   The Spotify account is authorized using OAuth 2.0 Authorization Code + PKCE.
   No client secret, server, or playlist write scope is used. */
const PLAYLIST_ID='04mdYGTuFuyBxhz10i6p2C';
const CLIENT_KEY='worship-spotify-client-id-v1';
const AUTH_KEY='worship-spotify-pkce-auth-v1';
const AUTH_PENDING='worship-spotify-auth-pending-v1';
const SNAPSHOT_KEY='worship-spotify-playlist-cache-v1';
const SYNC_AT_KEY='worship-spotify-last-sync-v1';
const BASE_BY_ID=new Map();
const statusEl=document.getElementById('syncStatus');
const clientEl=document.getElementById('spotifyClientId');
const settingsEl=document.getElementById('spotifySetup');
const connectEl=document.getElementById('spotifyConnect');
const disconnectEl=document.getElementById('spotifyDisconnect');
const syncEl=document.getElementById('syncNow');
const redirectEl=document.getElementById('redirectUri');
const statusTimeEl=document.getElementById('syncTime');
const redirectURI=location.origin+location.pathname;
const trackId=x=>String((x&&x.spotify)||'').match(/\/(?:track|episode)\/([a-zA-Z0-9]+)/)?.[1]||'';
function stableKeys(list){const seen=new Map();return list.map(t=>{const id=trackId(t)||'local-'+String(t.n);const nth=(seen.get(id)||0)+1;seen.set(id,nth);return {...t,key:id+'#'+nth}})}
const originalKeys=stableKeys(baselineTracks);
for(const t of originalKeys){const id=trackId(t);if(!BASE_BY_ID.has(id))BASE_BY_ID.set(id,[]);BASE_BY_ID.get(id).push(t)}
function migrateFavoriteKeys(){let changed=false;favorites=new Set([...favorites].map(x=>{if(String(x).startsWith('legacy-')){const t=originalKeys[Number(x.slice(7))-1];if(t){changed=true;return t.key}}return x}));if(changed)persistFavorites()}
function cacheAndRender(data){if(!Array.isArray(data))return false;tracks=mergeLiveTracks(data);render();return true}
function mergeLiveTracks(items){const usage=new Map();let list=items.map((item,idx)=>{
  const id=item.id;const key=id+'#'+((usage.get(id)||0)+1);usage.set(id,(usage.get(id)||0)+1);
  const match=BASE_BY_ID.get(id)?.[(usage.get(id)||1)-1]||BASE_BY_ID.get(id)?.[0];
  const runtime={n:idx+1,title:item.title,artist:item.artist,album:item.album,length:item.length,spotify:item.spotify,key};
  if(match){for(const k of ['indexPage','medleyPage','lesson','family'])if(match[k]!=null)runtime[k]=match[k]}
  else runtime.imported=true;
  runtime.isMedley=!!(runtime.medleyPage||/\b(medley|mix|popurri|popurr[ií]|reprise)\b|\s\/\s/i.test(runtime.title));
  return runtime;
});
  const counts=new Map();for(const t of list){const k=norm(t.title).replace(/\ben vivo\b/g,'').trim();counts.set(k,(counts.get(k)||0)+1)}
  for(const t of list){const k=norm(t.title).replace(/\ben vivo\b/g,'').trim();if((counts.get(k)||0)>1&&!t.family)t.family=t.title}
  return list;
}
function showStatus(msg){statusEl.textContent=msg}
function localGet(k){try{return localStorage.getItem(k)}catch(_){return null}}
function localSet(k,v){try{localStorage.setItem(k,v)}catch(_){}}
function localRemove(k){try{localStorage.removeItem(k)}catch(_){}}
function readJSON(k){try{return JSON.parse(localGet(k)||'null')}catch(_){return null}}
function setConnectedUI(){const config=localGet(CLIENT_KEY);const auth=readJSON(AUTH_KEY);const linked=!!(config&&auth?.refresh_token);syncEl.disabled=!linked;disconnectEl.hidden=!auth;connectEl.textContent=linked?'Reconnect Spotify':'Connect Spotify';document.getElementById('setupLabel').textContent=linked?'Spotify settings / disconnect':'Set up Spotify auto-sync';const last=Number(localGet(SYNC_AT_KEY)||0);statusTimeEl.textContent=last?'Last synced '+new Date(last).toLocaleString():'Not synced yet';}
function parseClientId(x){return String(x||'').trim()}
function formatDuration(ms){let secs=Math.round((Number(ms)||0)/1000);return Math.floor(secs/60)+':'+String(secs%60).padStart(2,'0')}
function spotifyItem(row,idx){const item=row?.item||row?.track;const id=item?.id||item?.uri?.split(':').pop()||'unavailable-'+idx;const type=item?.type==='episode'?'episode':'track';return {id,title:item?.name||'Unavailable Spotify item',artist:(item?.artists||[]).map(a=>a.name).join(', ')||item?.show?.name||'Unavailable',album:item?.album?.name||item?.show?.name||'Spotify playlist',length:formatDuration(item?.duration_ms),spotify:item?.external_urls?.spotify||`https://open.spotify.com/${type}/${encodeURIComponent(id)}`}}
async function sha256verifier(v){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(v));return btoa(String.fromCharCode(...new Uint8Array(b))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')}
function randomString(byteCount=64){return Array.from(crypto.getRandomValues(new Uint8Array(byteCount)),b=>('0'+b.toString(16)).slice(-2)).join('')}
async function spotifyLogin(){const id=parseClientId(clientEl.value)||localGet(CLIENT_KEY);
  if(!id){showStatus('First paste your Spotify Developer Client ID.');settingsEl.open=true;clientEl.focus();return}
  if(location.protocol!=='https:'&&!['127.0.0.1','[::1]'].includes(location.hostname)){showStatus('Publish this app to an HTTPS site before connecting Spotify.');settingsEl.open=true;return}
  localSet(CLIENT_KEY,id);const state=randomString(16),verifier=randomString(64),challenge=await sha256verifier(verifier);
  localSet(AUTH_PENDING,JSON.stringify({state,verifier,redirectURI,created:Date.now()}));
  const q=new URLSearchParams({client_id:id,response_type:'code',redirect_uri:redirectURI,state,scope:'playlist-read-private',code_challenge_method:'S256',code_challenge:challenge});
  location.assign('https://accounts.spotify.com/authorize?'+q.toString());
}
async function spotifyToken(fields){const resp=await fetch('https://accounts.spotify.com/api/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(fields).toString()});let body={};try{body=await resp.json()}catch(_){/* ignore */}if(!resp.ok)throw new Error(body.error_description||body.error||'Spotify authorization failed ('+resp.status+')');return body}
function storeAuth(token,prior){localSet(AUTH_KEY,JSON.stringify({access_token:token.access_token,refresh_token:token.refresh_token||prior?.refresh_token,expires_at:Date.now()+((token.expires_in||3600)*1000),token_type:token.token_type||'Bearer'}));setConnectedUI()}
async function completeCallback(){const u=new URL(location.href);const code=u.searchParams.get('code'),state=u.searchParams.get('state'),err=u.searchParams.get('error');if(!code&&!err)return false;
  u.searchParams.delete('code');u.searchParams.delete('state');u.searchParams.delete('error');history.replaceState(null,'',u.pathname+u.search+u.hash);
  if(err){showStatus('Spotify connection denied: '+err);settingsEl.open=true;return true}
  const p=readJSON(AUTH_PENDING);
  if(!p||!p.verifier||state!==p.state||Date.now()-p.created>15*60*1000){showStatus('Login confirmation could not be matched. Retry in the same browser that opened Spotify.');settingsEl.open=true;return true}
  localRemove(AUTH_PENDING);
  try{const token=await spotifyToken({client_id:localGet(CLIENT_KEY),grant_type:'authorization_code',code,redirect_uri:p.redirectURI,code_verifier:p.verifier});storeAuth(token,null);showStatus('Spotify connected. Checking your playlist…');await syncPlaylist(true)}catch(e){showStatus('Spotify connection failed: '+e.message);settingsEl.open=true}
  return true;
}
async function getAccessToken(){let a=readJSON(AUTH_KEY);if(!a?.refresh_token)throw new Error('Connect Spotify to enable playlist sync.');if(a.access_token&&a.expires_at>Date.now()+60000)return a.access_token;
  try{const r=await spotifyToken({client_id:localGet(CLIENT_KEY),grant_type:'refresh_token',refresh_token:a.refresh_token});storeAuth(r,a);return r.access_token}catch(e){if(/invalid_grant/.test(e.message))localRemove(AUTH_KEY);setConnectedUI();throw e}}
let syncing=false;
async function syncPlaylist(manual=false){if(syncing)return;if(!readJSON(AUTH_KEY)?.refresh_token){if(manual)showStatus('Spotify is not connected yet. Open setup below.');return}
  if(!navigator.onLine){showStatus('Offline. Showing the last saved playlist.');return}
  syncing=true;syncEl.disabled=true;syncEl.textContent='↻ Syncing…';showStatus('Checking Spotify playlist…');
  try{const bearer=await getAccessToken(),rows=[];let page=0;while(true){const offset=page*50;const url=`https://api.spotify.com/v1/playlists/${PLAYLIST_ID}/items?limit=50&offset=${offset}`;
    const response=await fetch(url,{headers:{Authorization:`Bearer ${bearer}`}});
    if(!response.ok){let message=response.status===403?'Spotify denied playlist access. The app user may need to own or collaborate on this playlist.':response.status===429?'Spotify rate limit reached. Retry later.':`Spotify error ${response.status}`;
      if(response.status===401)message='Spotify authorization expired. Reconnect from settings.';throw new Error(message)}
    const data=await response.json();rows.push(...(data.items||[]));page++;
    if(!data.next||rows.length>=Number(data.total||Infinity)||page>80)break;
  }
  // An empty playlist is valid. A failed API request would have thrown above.
  const normalized=rows.map(spotifyItem);const previous=tracks.length;cacheAndRender(normalized);
  localSet(SNAPSHOT_KEY,JSON.stringify(normalized));localSet(SYNC_AT_KEY,String(Date.now()));setConnectedUI();
  const added=normalized.length-previous;showStatus(`Synced ${normalized.length} recordings${added>0?' · '+added+' added':added<0?' · '+Math.abs(added)+' removed':''}. Each version remains separate.`);
  }catch(e){showStatus('Sync failed: '+e.message+' Saved songs are still available.');}
  finally{syncing=false;syncEl.textContent='↻ Sync now';setConnectedUI()}
}
function start(){
  redirectEl.value=redirectURI;clientEl.value=localGet(CLIENT_KEY)||'';
  tracks=stableKeys(baselineTracks);migrateFavoriteKeys();
  const cached=readJSON(SNAPSHOT_KEY);if(Array.isArray(cached))cacheAndRender(cached);else render();setConnectedUI();
  document.getElementById('saveClient').addEventListener('click',()=>{const id=parseClientId(clientEl.value);if(!/^[a-f0-9]{32}$/i.test(id)){showStatus('A Spotify Client ID is 32 hexadecimal characters.');return}localSet(CLIENT_KEY,id);setConnectedUI();showStatus('Client ID saved. Add the Redirect URI in Spotify, then tap Connect Spotify.')});
  document.getElementById('copyRedirect').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(redirectURI);showStatus('Redirect URI copied.')}catch(_){redirectEl.select();showStatus('Select and copy this URI manually.')}});
  connectEl.addEventListener('click',spotifyLogin);
  disconnectEl.addEventListener('click',()=>{localRemove(AUTH_KEY);localRemove(AUTH_PENDING);setConnectedUI();showStatus('Spotify disconnected. Your saved songbook and Favorites remain.');settingsEl.open=true});
  syncEl.addEventListener('click',()=>syncPlaylist(true));
  completeCallback().then(didCallback=>{if(!didCallback&&readJSON(AUTH_KEY)?.refresh_token)syncPlaylist()});
  setInterval(()=>{if(document.visibilityState==='visible'&&Date.now()-Number(localGet(SYNC_AT_KEY)||0)>9*60*1000)syncPlaylist()},10*60*1000);
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&Date.now()-Number(localGet(SYNC_AT_KEY)||0)>60*1000)syncPlaylist()});
  window.addEventListener('online',()=>{if(Date.now()-Number(localGet(SYNC_AT_KEY)||0)>60*1000)syncPlaylist()});
}
start();
