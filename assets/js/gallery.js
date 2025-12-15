function getSlugFromPath() {
  var parts = location.pathname.split('/').filter(Boolean);
  var idx = parts.indexOf('blog');
  if (idx === -1) return '';
  var slug = parts[idx + 2] || '';
  return slug;
}

function renderGallery(rootId) {
  var slug = getSlugFromPath();
  var root = document.getElementById(rootId);
  if (!root) return;
  fetch('/blog/gallery.json').then(function(r){return r.ok?r.json():{};}).then(function(data){
    var list = (data && data[slug]) || [];
    if (!Array.isArray(list) || list.length === 0) return;
    var grid = document.createElement('div');
    grid.className = 'gallery-grid';
    list.forEach(function(item){
      var fig = document.createElement('figure');
      fig.className = 'panel';
      var img = document.createElement('img');
      img.loading = 'lazy';
      img.src = item.src;
      img.alt = item.alt || 'Gameplay screenshot';
      img.onerror = function(){ img.src = '/assets/images/narrow-one-banner.svg'; };
      var cap = document.createElement('figcaption');
      cap.textContent = item.caption || '';
      fig.appendChild(img);
      fig.appendChild(cap);
      grid.appendChild(fig);
    });
    root.appendChild(grid);
  }).catch(function(){});
}
