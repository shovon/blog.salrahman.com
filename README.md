# Source code for blog.salrahman.com

This is the source code for blog.salrahman.com.

Feel free to study the source code, but I still quite haven't figured out the licensing terms for this source code.

That said, in the interest of studying the code, if you do encounter your language server and IDE complaining about some `content-collections` missing type definitions, just know that it requires that you first start Next.js, which will have `withContentCollections` plugin generate a `.content-collections/generated` folder, which is `.gitignored`, and thus won't be available on a first clone.
