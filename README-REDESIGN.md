# Personal site / Markdown notebook

## Preview locally

From this folder run `python -m http.server 8000`, then open `http://localhost:8000`.
Do not double-click the HTML files: browsers block `fetch()` from `file://` URLs.

## Publish a new Obsidian note

1. Write your article in Obsidian using ordinary Markdown headings, links, lists, quotes, and images.
2. Copy the `.md` file into `posts/`, e.g. `posts/my-new-article.md`.
3. Add a new object to `posts/index.json` with a unique `slug`, `title`, `date` (`YYYY-MM-DD`), `category`, `summary`, and `file` (`posts/my-new-article.md`).
4. Push the files to GitHub Pages. The blog archive and article page update automatically.

Example manifest entry:

```json
{"slug":"my-new-article","title":"My New Article","date":"2026-11-11","category":"Reflection","summary":"A short description.","file":"posts/my-new-article.md"}
```

**Obsidian compatibility:** Standard Markdown works. Obsidian-specific `[[wikilinks]]`, embeds (`![[image.png]]`), and callouts are not converted automatically; use standard Markdown links and image paths (e.g. `![caption](images/photo.jpg)`) for public posts. Keep images in `posts/images/` and reference them relative to the website root in your Markdown as `![caption](posts/images/photo.jpg)`.

The Markdown renderer uses `marked` and `DOMPurify` from jsDelivr; the reader requires internet access for these scripts. This works on GitHub Pages. If you want a fully offline setup, vendor those libraries locally.

The civic engagement entry in the original archive has an empty body, so it is intentionally not presented as a complete article. The original page remains in `legacy-writing.html`.
