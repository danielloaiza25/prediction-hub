const C="hub-v1";
self.addEventListener("install",e=>self.skipWaiting());
self.addEventListener("activate",e=>e.waitUntil(clients.claim()));
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  e.respondWith(
    fetch(e.request).then(r=>{
      if(e.request.url.includes("/prediction-hub/")&&r.ok){const c=r.clone();caches.open(C).then(x=>x.put(e.request,c));}
      return r;
    }).catch(()=>caches.match(e.request))
  );
});
