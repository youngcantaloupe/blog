// Markdown files remain the source of truth. The manifest provides archive metadata.
(async function () {
  const title = document.querySelector('#post-title');
  const content = document.querySelector('#post-content');
  const slug = new URLSearchParams(location.search).get('slug');
  try {
    const response = await fetch('posts/index.json');
    if (!response.ok) throw Error('Cannot load post index');
    const posts = await response.json();
    const post = posts.find(item => item.slug === slug);
    if (!post || !/^[a-z0-9-]+$/.test(slug)) throw Error('Article not found');
    const markdownResponse = await fetch(post.file);
    if (!markdownResponse.ok) throw Error('Cannot load article');
    const markdown = await markdownResponse.text();
    if (!window.marked || !window.DOMPurify) throw Error('Markdown renderer unavailable');
    title.textContent = post.title;
    document.title = post.title + ' | Porter Sampson';
    document.querySelector('#post-meta').textContent = post.category.toUpperCase() + ' / ' + new Date(post.date + 'T12:00:00').toLocaleDateString('en-US', {year:'numeric',month:'long',day:'numeric'}).toUpperCase();
    document.querySelector('#post-summary').textContent = post.summary;
    // Sanitize Markdown-generated HTML before inserting it into the page.
    content.innerHTML = DOMPurify.sanitize(marked.parse(markdown));
    content.querySelectorAll('a[href^="http"]').forEach(a => { a.target='_blank'; a.rel='noopener noreferrer'; });
  } catch (error) {
    title.textContent = 'Article unavailable';
    content.textContent = 'This article could not be loaded. Please return to the notebook, or run the site through a local web server.';
  }
})();
