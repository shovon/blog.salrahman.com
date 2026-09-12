# Source code for blog.salrahman.com

This is the source code for blog.salrahman.com.

Feel free to study the source code, but I still quite haven't figured out the licensing terms for this source code.

The site is built with [Astro](https://astro.build). Posts live in `src/posts`, and files prefixed with an underscore are treated as drafts.

That said, in the interest of studying the code, if you do encounter your language server and IDE complaining about `astro:content` missing type definitions, just know that it requires that you first run `npm run dev` (or `npx astro sync`), which generates a `.astro` folder, which is `.gitignored`, and thus won't be available on a first clone.
