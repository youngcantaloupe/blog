(async function () {
  const list = document.querySelector('#archive-list');
  const search = document.querySelector('#archive-search');
  const count = document.querySelector('#archive-count');
  const empty = document.querySelector('#archive-empty');
  const buttons = [...document.querySelectorAll('[data-filter]')];
  let category = 'all';
  try {
    const response = await fetch('posts/index.json');
    if (!response.ok) throw Error('Could not load posts');
    const posts = await response.json();
    posts.sort((a,b) => b.date.localeCompare(a.date));
    function render() {
      const query = search.value.trim().toLowerCase();
      const matches = posts.filter(p => (category === 'all' || p.category.toLowerCase() === category) && [p.title,p.summary,p.category].join(' ').toLowerCase().includes(query));
      list.replaceChildren();
      matches.forEach(p => {
        const a = document.createElement('a'); a.className='entry'; a.href='post.html?slug='+encodeURIComponent(p.slug);
        const date = document.createElement('span'); date.className='meta'; date.textContent=p.date;
        const middle = document.createElement('span'); const h = document.createElement('h3'); h.textContent=p.title;
        const summary = document.createElement('p'); summary.textContent=p.summary; middle.append(h,summary);
        const cat = document.createElement('span'); cat.className='archive-category'; cat.textContent=p.category;
        const arrow = document.createElement('span'); arrow.setAttribute('aria-hidden','true'); arrow.textContent='↗';
        a.append(date,middle,cat,arrow); list.append(a);
      });
      count.textContent=String(matches.length).padStart(2,'0')+(matches.length===1?' ENTRY':' ENTRIES');
      empty.hidden=matches.length!==0;
    }
    buttons.forEach(button=>button.addEventListener('click',()=>{category=button.dataset.filter;buttons.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));render();}));
    search.addEventListener('input',render); render();
  } catch (error) {list.textContent='The notebook could not be loaded. Please use a local web server.';count.textContent='UNAVAILABLE';}
})();
