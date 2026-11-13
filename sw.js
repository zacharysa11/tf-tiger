/* TF Tiger A3 board: offline support.
   - App page + config: try the network first (so you always get the newest version when online),
     fall back to the saved copy instantly when offline or if the network takes over 2.5 s.
   - Firebase library + fonts: saved copy first (they never change).
   - Live data (Firestore) is never touched here; Firebase keeps its own offline copy and
     sends queued changes the moment the connection is back. */
const CACHE='tftiger-v5';
const SHELL=['./','index.html','config.js',
 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js',
 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js',
 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>Promise.all(SHELL.map(u=>c.add(new Request(u,{cache:'reload'})).catch(()=>{}))))
  .then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
function netFirst(req){return new Promise(res=>{let done=false;
  const t=setTimeout(()=>{caches.match(req,{ignoreSearch:true}).then(r=>{if(r&&!done){done=true;res(r)}})},2500);
  fetch(req).then(r=>{if(r&&r.ok){const cp=r.clone();caches.open(CACHE).then(c=>c.put(req.mode==='navigate'?'index.html':req,cp))}if(!done){done=true;clearTimeout(t);res(r)}})
   .catch(()=>{clearTimeout(t);caches.match(req.mode==='navigate'?'index.html':req,{ignoreSearch:true}).then(r=>{if(!done){done=true;res(r||Response.error())}})})})}
function cacheFirst(req){return caches.match(req).then(r=>r||fetch(req).then(n=>{if(n&&(n.ok||n.type==='opaque')){const cp=n.clone();caches.open(CACHE).then(c=>c.put(req,cp))}return n}))}
self.addEventListener('fetch',e=>{const req=e.request;if(req.method!=='GET')return;const u=new URL(req.url);
  if(/firestore\.googleapis\.com|googleapis\.com\/google\.firestore/.test(u.href))return;
  if(u.origin===location.origin){if(req.mode==='navigate'||/\/(index\.html|config\.js)?$/.test(u.pathname)||u.pathname.endsWith('config.js'))e.respondWith(netFirst(req));return}
  if(/gstatic\.com\/firebasejs|fonts\.(googleapis|gstatic)\.com/.test(u.href))e.respondWith(cacheFirst(req))});
