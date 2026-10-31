var V='pv-v1',SHELL=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
var CDN=['cdnjs.cloudflare.com','www.gstatic.com','fonts.googleapis.com','fonts.gstatic.com'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(V).then(function(c){return c.addAll(SHELL)}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==V}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
function put(r,res){var c=res.clone();caches.open(V).then(function(x){x.put(r,c)});return res}
self.addEventListener('fetch',function(e){
  var r=e.request;if(r.method!=='GET')return;
  var u=new URL(r.url);
  if(u.origin===location.origin){
    if(r.mode==='navigate'){e.respondWith(fetch(r).then(function(res){return put('index.html',res)}).catch(function(){return caches.match('index.html')}));return}
    e.respondWith(caches.match(r).then(function(m){return m||fetch(r).then(function(res){return put(r,res)})}));
  }else if(CDN.indexOf(u.hostname)>-1){
    e.respondWith(caches.match(r).then(function(m){var f=fetch(r).then(function(res){return put(r,res)}).catch(function(){return m});return m||f}));
  }
});
