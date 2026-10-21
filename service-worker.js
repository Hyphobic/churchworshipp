const CACHE_NAME='worship-chords-volume-1-1-1-refresh-20261020';
const ASSETS=['./','./index.html','./spotify-sync.js','./chain-builder.js','./chord-workspace.js','./verification.js','./verification.css','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/apple-touch-icon.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE_NAME).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 const url=new URL(event.request.url);if(url.origin!==self.location.origin)return;
 if(event.request.mode==='navigate'&&url.searchParams.has('code')){event.respondWith(fetch(event.request));return;}
 if(event.request.mode==='navigate'){event.respondWith(fetch(event.request).then(response=>{if(response.ok){let copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(event.request,copy))}return response}).catch(()=>caches.match(event.request).then(r=>r||caches.match('./index.html'))));return;}
 event.respondWith(fetch(event.request,{cache:'no-store'}).then(response=>{if(response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.put(event.request,copy)))}return response}).catch(()=>caches.match(event.request)));
});
